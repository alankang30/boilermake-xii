import MainNavigation from '../components/layout/MainNavigation';
import './Classes.css';

function ClassesPage() {
  return (
    <div className="classpage">
      <div class="header">
        <MainNavigation />
      </div>

      
      <div className="courses">
        <p>COURSES</p>
      </div>

      <div className="boxes">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
      </div>
    </div>



  )
}

export default ClassesPage;
