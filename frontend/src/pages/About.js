import MainNavigation from '../components/layout/MainNavigation';
import './About.css';
import { useNavigate } from "react-router-dom";


function AboutPage() {
  const navigate = useNavigate(); 
  const handleClick = (buttonId) => {
    if (buttonId === 1) {
      window.location.href = 'https://www.linkedin.com/in/nina-gruteser';
    }
    else if (buttonId === 2) {
      window.location.href = 'https://www.linkedin.com/in/alankang/';
    }
    else {
      window.location.href = 'https://www.linkedin.com/in/priyanka-soe/';
    }

  };


  return (
    <div className="about">
      <div className="header">
        <MainNavigation />
      </div>


      <div className="section1">
        <div className="leftcolumn">
          <div className="aboutus">ABOUT US</div>
          <div className="subtext">
            We're a small team of Purdue CS students who created Squirrel Review as an all-in-one resource for our CS courses. 
            We hope it helps you as much as it helped us!
          </div>
        </div>
      </div>



      <div className="section2">
        <div className="circles">
          <div className="c1"></div>
          <div className="c2"></div>
          <div className="c3"></div>
          <div className="c4"></div>
        </div>
      </div>

      <div className="box">
        <div className="top">
          <div className="top-buttons">
            <div className="circle1"></div>
            <div className="circle2"></div>
            <div className="circle3"></div>
          </div>

          <div className="description">
            text here
          </div>
        </div>

      </div>



      <div className="section3">
        <div className="team">MEET THE TEAM</div>

        <div className="info">
          <div className="nina">
            <div className="p1"></div>
            <div className="n1">Nina Gruteser</div>
            <div className="b1">coolest person</div>
            <button className="connect1" onClick={() => handleClick(1)}>connect</button>
          </div>

          <div className="alan">
            <div className="p2"></div>
            <div className="n2">Alan Kang</div>
            <div className="b2">not so cool person</div>
            <button className="connect2" onClick={() => handleClick(2)}>connect</button>
          </div>

          <div className="pri">
            <div className="p3"></div>
            <div className="n3">Priyanka Soe</div>
            <div className="b3">cool person</div>
            <button className="connect3" onClick={() => handleClick(3)}>connect</button>
          </div>


        </div>
      </div>



    </div>
  )
}

export default AboutPage;
