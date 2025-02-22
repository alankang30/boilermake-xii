import { useState } from "react";

const AddQuestionForm = () => {
    const [formData, setFormData] = useState({
        question_statement: "",
        class_name: "",
        answer: "",
        topic: "",
        difficulty: "Medium",
        image: null
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });


        try {
            // this gets data from flask backend under /api/questions 
            const response = await fetch("http://127.0.0.1:5000/api/questions", {
                method: "POST",
                body: data
            });

            const result = await response.json();
            if (response.ok) {
                setMessage("Question added successfully!");
                setFormData({
                    question_statement: "",
                    class_name: "",
                    answer: "",
                    topic: "",
                    difficulty: "Medium",
                    image: null
                });
            } else {
                setMessage("Error: " + result.error);
            }
        } catch (error) {
            setMessage("Failed to submit question.");
        }
    };

    return (
        <div>
            <h2>Add a New Question</h2>
            <form onSubmit={handleSubmit}>
                <label>Question:</label>
                <input type="text" name="question_statement" value={formData.question_statement} onChange={handleChange} required /><br />

                <label>Class:</label>
                <input type="text" name="class_name" value={formData.class_name} onChange={handleChange} required /><br />

                <label>Answer:</label>
                <input type="text" name="answer" value={formData.answer} onChange={handleChange} required /><br />

                <label>Topic:</label>
                <input type="text" name="topic" value={formData.topic} onChange={handleChange} required /><br />

                <label>Difficulty:</label>
                <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select><br />

                <label>Upload Image:</label>
                <input type="file" name="image" onChange={handleFileChange} /><br />

                <button type="submit">Submit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddQuestionForm;
