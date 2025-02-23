import { useState, useEffect } from "react";

import classes from './QuestionList.module.css'

const QuestionsList = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/questions")  // Fetch data from Flask
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);  // Empty dependency array ensures it runs once when component mounts

  console.log(questions)

  if (loading) return <p>Loading...</p>;
  //
  //return (
  //  <div>
  //    <h2>Questions List</h2>
  //    <ul>
  //      {questions.map((q) => (
  //        <li key={q.id}>
  //          <strong>{q.question_statement}</strong> (Class: {q.class_name}, Topic: {q.topic}, Difficulty: {q.difficulty}, Image: {q.image})
  //          <img 
  //            src={`http://127.0.0.1:5000/uploads/${q.image}`} 
  //            alt="Question" 
  //            style={{ width: "200px", height: "auto" }} 
  //          />
  //        </li>
  //      ))}
  //    </ul>
  //  </div>
  //);
  return (
    <div className={classes.questionscontainer}>
      {/*<h2>Questions List</h2>*/}
      <div className={classes.questionslist}>
        {questions.map((q) => (
          <button key={q.id} className={classes.questionbutton}>
            <strong>{q.id}: {q.question_statement}</strong> <br />
            <span>Class: {q.class_name}</span> | 
            <span> Topic: {q.topic}</span> | 
            <span> Difficulty: {q.difficulty}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;
