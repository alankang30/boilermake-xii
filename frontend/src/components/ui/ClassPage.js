import { useState, useEffect } from "react";
import classes from "./ClassPage.module.css";
import { useNavigate } from "react-router-dom";  // Import React Router navigation
import MainNavigation from "../layout/MainNavigation";
import Dropdown from "./Dropdown.js";
import SearchBox from "../ui/SearchBox.js"

function ClassPage(props) {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [className, setClassName] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();  // Initialize navigation

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/questions") // Fetch questions from Flask
      .then(response => response.json())
      .then(data => {
        // Filter to include only CS240 questions from the start
        const cs240Questions = data.filter(q => q.class_name === "CS240");
        setQuestions(cs240Questions);
        setFilteredQuestions(cs240Questions); // Initially show all CS240 questions
      })
      .catch(error => console.error("Error fetching questions:", error));
  }, []);


  const handleSearch = (query) => {
    // const response = await fetch("http://127.0.0.1:5000/search", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ query }),  // Send query as JSON
    // });

    // const data = await response.json();
    // console.log(data);  // Handle response from Flask
    setSearchQuery(query); 

    // Clear the input field after sending the request
  };  

  // Function to filter questions based on selected criteria

  const handleFilter = async () => {
    let filtered = questions.filter(q =>
      (topic === "" || q.topic === topic) &&
      (difficulty === "" || q.difficulty === difficulty)
    );
  
    try {
      const response = await fetch("http://127.0.0.1:5000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchQuery, filtered }),  // Send query as JSON
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch filtered questions");
      }
  
      const data = await response.json();
      setFilteredQuestions(data);  // Update filtered questions
      console.log("Filtered questions received:", data);
    } catch (error) {
      console.error("Error sending filter request:", error);
    }
  };

  useEffect(() => {
    const fetchFilteredQuestions = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/search");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setFilteredQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }

      setSearchQuery("")
    };
  
    fetchFilteredQuestions();
  }, []);  // Runs once when the component mounts

const buttonHandler = (question) => {
    navigate("/question", { state: { question } });  // Navigate & pass question
  };

  return (
    <div>
      <MainNavigation />
      {/* Question List */}
      <div className={classes.classcontainer}>
        <div className={classes.card}>
          <div className={classes.coursetitle}>
            <p>{props.classnumber} QUESTIONS</p>
          </div>
          {/* Dropdown Section */}
          <div className={classes.dropdownContainer}>
            <Dropdown
              label="Topic"
              options={[...new Set(questions.map(q => q.topic))]}
              selected={topic}
              onChange={setTopic}
            />
            <Dropdown
              label="Difficulty"
              options={[...new Set(questions.map(q => q.difficulty))]}
              selected={difficulty}
              onChange={setDifficulty}
            />
            {/*Search box component*/}
            <SearchBox  onSearch={handleSearch}/>
            <button className={classes.filterButton} onClick={handleFilter}>Filter</button>
          </div>
          {/* Question list */}
          <ul>
            {filteredQuestions.map(q => (
              <button key={q.id} className={classes.questionbutton} onClick={() => buttonHandler(q)}>
                <strong>{q.id}: {q.question_statement}</strong> <br />
                <span>Class: {q.class_name}</span> | 
                <span> Topic: {q.topic}</span> | 
                <span> Difficulty: {q.difficulty}</span>
              </button>
            ))}
          </ul>
        </div>

        {/* Progress Bar */}
        {/* <div className={classes.colContainer}>
          <div className={classes.buffer}></div>
          <div className={classes.progressbar}>
            <h1>Progress</h1>
            <p>2/6 Correct</p>
            <p>1/6 Incorrect</p>
            <p>3/6 Unattempted</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default ClassPage;
