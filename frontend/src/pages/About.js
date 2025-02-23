import MainNavigation from '../components/layout/MainNavigation';
import './About.css';

function AboutPage() {
  return (
    <div className="about">
      <div className="header">
        <MainNavigation />
      </div>


      <div className="section1">
        <div className="leftcolumn">
          <div className="aboutus">ABOUT US</div>
          <div className="subtext">get to know us...</div>
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

          <div className="description">some text here</div>
        </div>

      </div>



      <div className="section3">
      <div className="team">MEET THE TEAM</div>
      </div>



    </div>
  )
}

export default AboutPage;
