import MainNavigation from '../components/layout/MainNavigation';
import './Home.css';
import { useNavigate } from "react-router-dom";


function HomePage() {
  const navigate = useNavigate(); 
  const handleClick = (buttonId) => {
    if (buttonId === 1) {
      navigate('/classes')
    }
  };



  return (
    <div className="home">
      <div className="header">
        <MainNavigation />
      </div>

      <div className="welcome">WELCOME TO</div>
      
      <div className="terminal">
        <div className="top">
          <div className="cs">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
          </div>
        </div>

        <div className="squirrelreview">
          <img id="logo-name" src="http://127.0.0.1:5000/uploads/squirrel-review-logo.png" alt=""></img>
        </div>

        <div className="text-line1">$ the best study tool to help you ace your </div>
        <div className="text-line2"> purdue cs exams </div>

        <div className="littlesquirrel">
          <img id="logo" src="http://127.0.0.1:5000/uploads/squirrel.png" alt=""></img>
        </div>

      </div>

      <div className="bottom">
        <button class="btn" onClick={() => handleClick(1)}>study</button>
      </div>


    </div>
  )
}

export default HomePage;