import MainNavigation from '../components/layout/MainNavigation';
import './Feedback.css';


function FeedbackPage() {
  return (
    <div className="feedback">
      <div class="header">
        <MainNavigation />
      </div>

      <div className="page">
        <div className="title">LEAVE A REVIEW</div>

        <div className="textbox">
          <div className="border">
            <div className="dots">
              <div className="dot1"></div>
              <div className="dot2"></div>
              <div className="dot3"></div>
            </div>
          </div>

          <button className="submit">submit</button>

        </div>

        <div className="footer">we appreciate your feedback!</div>
      </div>

    </div>
  )
}

export default FeedbackPage;
