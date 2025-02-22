import MainNavigation from '../components/layout/MainNavigation';
import './Classes.css';
import { useNavigate } from "react-router-dom";

function ClassesPage() {
  const navigate = useNavigate(); 
  const handleClick = (buttonId) => {
    if (buttonId == 1) {
      navigate('/classes/cs240')
    }
    else if (buttonId == 2) {
      navigate('/classes/cs250')
    }
    else {
      navigate('/classes/cs251')
    }
  };


  return (
    <div className="classpage">
      <div class="header">
        <MainNavigation />
      </div>

      
      <div className="courses">
        <p>COURSES</p>
      </div>

      <div className="boxes">
        <button className="rect1" onClick={() => handleClick(1)}></button>
        <button className="rect2" onClick={() => handleClick(2)}></button>
        <button className="rect3" onClick={() => handleClick(3)}></button>
      </div>
    </div>



  )
}

export default ClassesPage;
