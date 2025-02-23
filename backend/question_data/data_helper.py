import csv

def parse_questions(file_path):
    """Parses a text file with multi-line questions and answers."""
    with open(file_path, "r", encoding="utf-8") as file:
        lines = [line.strip() for line in file if line.strip()]  # Remove empty lines

    qa_pairs = []
    question_lines = []
    answer_lines = []
    collecting_answer = False  # Flag to indicate answer collection


    all_lines = [] 


    for i in range (0, len(lines)):

        line = lines[i]
        if "[Solution]" in line: 
            collecting_answer = True; 
            answer_lines.clear() 
            continue 
        
        if "[Question]" in line: 
            qa_pairs.append({"question": "\n".join(question_lines), "answer": "\n".join(answer_lines)})
            collecting_answer = False
            all_lines.append("\n".join(question_lines + answer_lines))  # Store question-answer as string
            question_lines.clear()
            continue

        if not collecting_answer: 
            question_lines.append(line) 
        
        if collecting_answer:
            answer_lines.append(line)


    # Save the last Q&A pair
    if question_lines and answer_lines:
        all_lines.append("\n".join(question_lines + answer_lines))  # Store question-answer as string

    return qa_pairs, all_lines


# Example usage
file_path = "CS240-1.txt"
data, question_data = parse_questions(file_path)
print(data)


# # Print results


# # Writing to CSV
# with open("output.csv", "w", newline="") as file:
#     # Get fieldnames from the first dictionary
#     fieldnames = data[0].keys()
    
#     writer = csv.DictWriter(file, fieldnames=fieldnames)
    
#     # Write headers
#     writer.writeheader()
    
#     # Write data rows
#     writer.writerows(data)

# print("CSV file created successfully.")
