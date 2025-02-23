import { useState, useEffect } from "react";
import classes from "./ClassPage.module.css";
import MainNavigation from "../layout/MainNavigation";
import Dropdown from "./Dropdown.js";

function ClassPage(props) {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [className, setClassName] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/questions") // Fetch questions from Flask
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setFilteredQuestions(data); // Initially show all questions
      })
      .catch(error => console.error("Error fetching questions:", error));
  }, []);

  // Function to filter questions based on selected criteria
  const handleFilter = () => {
    let filtered = questions.filter(q =>
      (className === "" || q.class_name === className) &&
        (topic === "" || q.topic === topic) &&
        (difficulty === "" || q.difficulty === difficulty)
    );
    setFilteredQuestions(filtered);
  };

  return (
    <div>
      <MainNavigation />


      {/* Question List */}
      <div className={classes.classcontainer}>
        <div className={classes.card}>
          <div className={classes.coursetitle}>
            <p>{props.classnumber} Questions</p>
          </div>
          {/* Dropdown Section */}
          <div className={classes.dropdownContainer}>
            <Dropdown
              label="Class Name"
              options={[...new Set(questions.map(q => q.class_name))]} // Unique values
              selected={className}
              onChange={setClassName}
            />
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
            <button className={classes.filterButton} onClick={handleFilter}>Filter</button>
          </div>
          {/* Question list */}
          <ul>
            {filteredQuestions.map(q => (
              <button key={q.id} className={classes.questionbutton}>
                <strong>{q.id}: {q.question_statement}</strong> <br />
                <span>Class: {q.class_name}</span> | 
                <span> Topic: {q.topic}</span> | 
                <span> Difficulty: {q.difficulty}</span>
              </button>
            ))}
          </ul>
        </div>

        {/* Progress Bar */}
        <div className={classes.colContainer}>
          <div className={classes.buffer}></div>
          <div className={classes.progressbar}>
            <h1>Progress</h1>
            <p>2/6 Correct</p>
            <p>1/6 Incorrect</p>
            <p>3/6 Unattempted</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassPage;
