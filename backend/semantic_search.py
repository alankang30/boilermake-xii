import re

import spacy
from spacy import displacy

import gensim 
from gensim import corpora 
from gensim.similarities import MatrixSimilarity

import operator 
import string 

# activate spacy 
nlp = spacy.load("en_core_web_sm")

# define puncuations and stop words for data processing 
punctuations = string.punctuation
stop_words = spacy.lang.en.stop_words.STOP_WORDS

def tokenize_sentence(sentence):
    ''' Extracts tokens from sentence '''
    sentence = re.sub('\'','',sentence)

    sentence = re.sub('\w*\d\w*','',sentence)

    sentence = re.sub(' +',' ',sentence)

    sentence = re.sub(r'\n: \'\'.*','',sentence)
    sentence = re.sub(r'\n!.*','',sentence)
    sentence = re.sub(r'^:\'\'.*','',sentence)
    
    sentence = re.sub(r'\n',' ',sentence)
    
    sentence = re.sub(r'[^\w\s]',' ',sentence)
    
    sent_tokens = nlp(sentence)
    
    sent_tokens = [word.lemma_.lower().strip() if word.lemma_ != "-PRON-" else word.lower_ for word in sent_tokens]
    
    sent_tokens = [word for word in sent_tokens if word not in stop_words and word not in punctuations and len(word) > 2]

    return sent_tokens

# performs a semantic search based on a query
# data is the dictionary from the database 

def semantic_search(keywords, data):


    # queries will be based on this 
    questions = [d["question_statement"] +" "+ d["answer"] +" "+ d["topic"]  for d in data]

    print(questions)

    # this will be an array of tokens for each question in the database 
    tokens = [ [] for i in range(len(questions)) ]

    # process data and create tokens 
    for i in range(len(questions)): 
        for des_sent in questions[i].split("."):         
            tokens[i].extend(tokenize_sentence(des_sent))

    dictionary = corpora.Dictionary(tokens)
    print("tokens")
    print(tokens)

    corpus = [dictionary.doc2bow(desc) for desc in tokens]
    word_frequencies = [[(dictionary[id], frequency) for id, frequency in line] for line in corpus[0:3]]

    des_tfidf_model = gensim.models.TfidfModel(corpus, id2word=dictionary)
    des_lsi_model = gensim.models.LsiModel(des_tfidf_model[corpus], id2word=dictionary, num_topics=50)

    gensim.corpora.MmCorpus.serialize('des_tfidf_model_mm', des_tfidf_model[corpus])
    gensim.corpora.MmCorpus.serialize('des_lsi_model_mm',des_lsi_model[des_tfidf_model[corpus]])

    des_tfidf_corpus = gensim.corpora.MmCorpus('des_tfidf_model_mm')
    des_lsi_corpus = gensim.corpora.MmCorpus('des_lsi_model_mm')

    des_index = MatrixSimilarity(des_lsi_corpus, num_features = des_lsi_corpus.num_terms)

    query_bow = dictionary.doc2bow(tokenize_sentence(keywords))


    if query_bow and len(keywords.split()) >= 1: 
        print("advanced search happening")
        query_tfidf = des_tfidf_model[query_bow]
        query_lsi = des_lsi_model[query_tfidf]

        des_index.num_best = len(des_index)

        des_list = des_index[query_lsi]
        refined_des_list = [] 

        for i in range(len(des_list)): 
            if des_list[i][1] > pow(10, -9):
                refined_des_list.append(des_list[i])

        refined_des_list.sort(key=operator.itemgetter(1), reverse=True)

        ids = [ des[0] for des in refined_des_list]

        search_results = [] 

        return ids; 
    return []


entries = [
    {'id': 1, 'question_statement': 'this is a question?', 'answer': 'this is the answer to the question', 'class_name': '251', 'topic': 'graphs', 'difficulty': 'Medium', 'image': 'filename'}, 
    {'id': 2, 'question_statement': 'another question? ', 'answer': 'this is the answer to the question', 'class_name': '250', 'topic': 'os', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 3, 'question_statement': 'what is a tree', 'answer': 'jfklfjskljfkdls', 'class_name': '46', 'topic': 'trees', 'difficulty': 'Hard', 'image': 'filename'},
    {'id': 4, 'question_statement': 'this is a question?', 'answer': 'an answer', 'class_name': '242', 'topic': 'graphs', 'difficulty': 'Easy', 'image': 'IMG_5324.PNG'},
    {'id': 5, 'question_statement': 'Whats 1 + 1', 'answer': '2', 'class_name': 'CS240', 'topic': 'mathematic', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 6, 'question_statement': 'question', 'answer': 'ansa', 'class_name': 'class', 'topic': 'topi', 'difficulty': 'Hard', 'image': 'Screenshot 2025-01-30 at 7.18.30\u202fPM.png'},
    {'id': 7, 'question_statement': 'whats up ', 'answer': '5', 'class_name': 'CS240', 'topic': 'memory', 'difficulty': 'Easy', 'image': 'filename'},
    {'id': 8, 'question_statement': 'Look at this image?', 'answer': 'it is a pretty image.', 'class_name': 'CS240', 'topic': 'squirrel pics', 'difficulty': 'Hard', 'image': 'Screenshot 2025-02-22 at 11.04.49\u202fPM.png'},
    {'id': 9, 'question_statement': 'What is a binary tree?', 'answer': 'A tree where each node has at most two children.', 'class_name': '251', 'topic': 'trees', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 10, 'question_statement': 'Define a deadlock.', 'answer': 'A situation where a set of processes are blocked waiting for resources.', 'class_name': '250', 'topic': 'os', 'difficulty': 'Hard', 'image': 'filename'},
    {'id': 11, 'question_statement': 'What is Dijkstra’s algorithm used for?', 'answer': 'Finding the shortest path in a graph.', 'class_name': '251', 'topic': 'graphs', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 12, 'question_statement': 'What is the purpose of paging in OS?', 'answer': 'Paging allows memory management by dividing memory into fixed-size pages.', 'class_name': '250', 'topic': 'os', 'difficulty': 'Hard', 'image': 'filename'},
    {'id': 13, 'question_statement': 'Explain an AVL tree.', 'answer': 'A self-balancing binary search tree.', 'class_name': '46', 'topic': 'trees', 'difficulty': 'Hard', 'image': 'filename'},
    {'id': 14, 'question_statement': 'What is a semaphore?', 'answer': 'A variable used to control access to a shared resource.', 'class_name': '250', 'topic': 'os', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 15, 'question_statement': 'What is preemptive scheduling?', 'answer': 'A CPU scheduling technique that interrupts a process to assign CPU to another.', 'class_name': '250', 'topic': 'os', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 16, 'question_statement': 'Explain DFS.', 'answer': 'Depth-first search explores as far as possible along each branch before backtracking.', 'class_name': '251', 'topic': 'graphs', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 17, 'question_statement': 'Explain BFS.', 'answer': 'Breadth-first search explores all neighbors before moving to the next level.', 'class_name': '251', 'topic': 'graphs', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 18, 'question_statement': 'What is a mutex?', 'answer': 'A mutual exclusion object that prevents concurrent access.', 'class_name': '250', 'topic': 'os', 'difficulty': 'Hard', 'image': 'filename'},
    {'id': 19, 'question_statement': 'What is the complexity of quicksort?', 'answer': 'O(n log n) on average.', 'class_name': '251', 'topic': 'sorting', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 20, 'question_statement': 'What is a red-black tree?', 'answer': 'A balanced binary search tree.', 'class_name': '46', 'topic': 'trees', 'difficulty': 'Hard', 'image': 'filename'},
    {'id': 21, 'question_statement': 'What is dynamic programming?', 'answer': 'A technique to solve complex problems by breaking them into overlapping subproblems.', 'class_name': '251', 'topic': 'algorithms', 'difficulty': 'Hard', 'image': 'filename'},
    {'id': 22, 'question_statement': 'What is an NP-complete problem?', 'answer': 'A problem for which a solution can be verified in polynomial time.', 'class_name': '251', 'topic': 'complexity', 'difficulty': 'Hard', 'image': 'filename'},
    {'id': 23, 'question_statement': 'What is a critical section?', 'answer': 'A segment of code that accesses shared resources.', 'class_name': '250', 'topic': 'os', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 24, 'question_statement': 'What is a trie?', 'answer': 'A tree-like data structure used for storing strings efficiently.', 'class_name': '46', 'topic': 'trees', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 25, 'question_statement': 'What is a B-tree?', 'answer': 'A self-balancing search tree optimized for disk storage.', 'class_name': '46', 'topic': 'trees', 'difficulty': 'Hard', 'image': 'filename'},
    {'id': 26, 'question_statement': 'What is an adjacency matrix?', 'answer': 'A way to represent a graph using a 2D array.', 'class_name': '251', 'topic': 'graphs', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 27, 'question_statement': 'Explain an adjacency list.', 'answer': 'A way to represent a graph using a list of lists.', 'class_name': '251', 'topic': 'graphs', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 28, 'question_statement': 'What is the difference between stack and queue?', 'answer': 'Stack follows LIFO, queue follows FIFO.', 'class_name': '251', 'topic': 'data structures', 'difficulty': 'Easy', 'image': 'filename'},
    {'id': 29, 'question_statement': 'What is a hash function?', 'answer': 'A function that maps input data to a fixed-size value.', 'class_name': '251', 'topic': 'hashing', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 30, 'question_statement': 'What is a priority queue?', 'answer': 'A queue where elements are dequeued based on priority.', 'class_name': '251', 'topic': 'data structures', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 31, 'question_statement': 'What is memoization?', 'answer': 'A technique to store results of expensive function calls.', 'class_name': '251', 'topic': 'algorithms', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 32, 'question_statement': 'What is tail recursion?', 'answer': 'A recursion where the recursive call is the last statement.', 'class_name': '251', 'topic': 'recursion', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 33, 'question_statement': 'What is a circular linked list?', 'answer': 'A linked list where the last node points to the first.', 'class_name': '251', 'topic': 'data structures', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 34, 'question_statement': 'What is the time complexity of merge sort?', 'answer': 'O(n log n).', 'class_name': '251', 'topic': 'sorting', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 35, 'question_statement': 'What is pipelining in CPUs?', 'answer': 'A technique that allows overlapping instruction execution.', 'class_name': '250', 'topic': 'os', 'difficulty': 'Hard', 'image': 'filename'},
    {'id': 36, 'question_statement': 'What is virtual memory?', 'answer': 'A memory management technique using disk storage as RAM.', 'class_name': '250', 'topic': 'os', 'difficulty': 'Hard', 'image': 'filename'},
    {'id': 37, 'question_statement': 'Explain hash collision.', 'answer': 'A situation where two inputs map to the same hash value.', 'class_name': '251', 'topic': 'hashing', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 38, 'question_statement': 'What is a spanning tree?', 'answer': 'A subgraph that includes all vertices with the minimum number of edges.', 'class_name': '251', 'topic': 'graphs', 'difficulty': 'Medium', 'image': 'filename'},
    {'id': 39, 'question_statement': 'What is Prim’s algorithm?', 'answer': 'An algorithm for finding the minimum spanning tree.', 'class_name': '251', 'topic': 'graphs', 'difficulty': 'Hard', 'image': 'filename'},
    {'id': 40, 'question_statement': 'What is the Banker’s algorithm?', 'answer': 'A deadlock avoidance algorithm.', 'class_name': '250', 'topic': 'os', 'difficulty': 'Hard', 'image': 'filename'}
]

# ids = semantic_search("priority queue", entries); 
# print(ids)


