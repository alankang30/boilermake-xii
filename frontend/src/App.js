import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.js'
import { useEffect, useState } from "react";

import HomePage from './pages/Home.js'
import ClassesPage from './pages/Classes.js'
import AboutPage from './pages/About.js'
import FeedbackPage from './pages/Feedback.js'

function App() {

  // the following code does an api call to the flask
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/hello")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error(err));
  }, []);
  // the above code does an api call to the flask

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/feedback' element={<FeedbackPage/>}/>
        <Route path='/classes' element={<ClassesPage/>}/>
        <Route path='/classes/cs240' element={<ClassesPage/>}/>
      </Routes>
    </Layout>
  );
}

export default App;


