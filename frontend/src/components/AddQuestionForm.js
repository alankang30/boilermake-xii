import { useState } from "react";
import classes from "./AddQuestionForm.module.css";


const AddQuestionForm = () => {
  const [formData, setFormData] = useState({
    questionstatement: "",
    classname: "",
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
    console.log(formData);
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      // Only append the topic field if it's not empty
      if (key !== "topic" || formData[key].trim() !== "aitopic") {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://127.0.0.1:5000/api/questions", {
        method: "POST",
        body: data
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Question added successfully!");
        setFormData({
          questionstatement: "",
          classname: "",
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
      <div className={classes.formcontainer}>
        <h2 className={classes.title}>Add a New Question</h2>
        <form onSubmit={handleSubmit} className={classes.form}>
          <label className={classes.label}>Question:</label>
          <input type="text" name="questionstatement" value={formData.questionstatement} onChange={handleChange} required className={classes.input} />

          <label className={classes.label}>Class:</label>
          <input type="text" name="classname" value={formData.classname} onChange={handleChange} required className={classes.input} />

          <label className={classes.label}>Answer:</label>
          <input type="text" name="answer" value={formData.answer} onChange={handleChange} required className={classes.input} />

          <label className={classes.label}>Topic:</label>
          <input type="text" name="topic" value={formData.topic} onChange={handleChange} required className={classes.input} />

          <label className={classes.label}>Difficulty:</label>
          <select name="difficulty" value={formData.difficulty} onChange={handleChange} className={classes.select}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <label className={classes.label}>Upload Image:</label>
          <input type="file" name="image" onChange={handleFileChange} className={classes.fileinput} />

          <button type="submit" className={classes.button}>Submit</button>
        </form>
        {message && <p className={classes.message}>{message}</p>}
      </div>

    </div>
  );
};

export default AddQuestionForm;

