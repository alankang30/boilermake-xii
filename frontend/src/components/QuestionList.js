import { useState, useEffect } from "react";

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

    return (
        <div>
            <h2>Questions List</h2>
            <ul>
                {questions.map((q) => (
                    <li key={q.id}>
                        <strong>{q.question_statement}</strong> (Class: {q.class_name}, Topic: {q.topic}, Difficulty: {q.difficulty}, Image: {q.image})
            <img 
              src={`http://127.0.0.1:5000/uploads/${q.image}`} 
              alt="Question" 
              style={{ width: "200px", height: "auto" }} 
            />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionsList;
