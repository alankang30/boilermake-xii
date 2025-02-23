import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TerminalContextProvider } from "react-terminal";
import classes from "./QuestionPage.module.css"; // Ensure you import the CSS file

import Terminal from '../Terminal.js'


function QuestionAnswerPage(props) {
  const [showAnswer, setShowAnswer] = React.useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { question } = location.state || {};  // Get question from router state

  if (!question) {
    return <p>Error: No question data found.</p>;  // Handle missing data
  }

  return (
    <div className={classes.pagecontainer}>
      {/*question*/}
      <div className={classes.lefthalf}>

        <h1>{question.class_name}: Problem {question.id}</h1>
        <p>Topic: {question.topic}</p>
        <p>Difficulty: {question.difficulty}</p>
        <h2>{question.question_statement}</h2>
        {/* conditionally render image if it exists */}
        {question.image !== "filename" && (
          <img 
            src={`http://127.0.0.1:5000/uploads/${question.image}`} 
            alt="Question" 
            style={{ width: "200px", height: "auto" }} 
          />
        )}
        <button onClick={() => setShowAnswer(!showAnswer)}>Show Answer</button>
        {showAnswer && <p className={classes.answer}>{question.answer}</p>}
        <button className={classes.backButton} onClick={() => navigate(-1)}>
          ← Back
        </button>

      </div>
      {/*terminal*/}
      <div className={classes.righthalf}>
        {/*<TerminalComponent/>*/}
        <TerminalContextProvider>
          <Terminal/>
        </TerminalContextProvider>
      </div>
    </div>
  );
}

export default QuestionAnswerPage;
