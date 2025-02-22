import React, { useState } from "react";
import classes from "./QuestionPage.module.css"; // Ensure you import the CSS file

import TerminalComponent2 from '../TerminalComponent2.js'
import TerminalComponent from '../TerminalComponent.js'


function QuestionAnswerPage(props) {
  const [showAnswer, setShowAnswer] = React.useState(false);

  return (
    <div className={classes.pagecontainer}>
      {/*question*/}
      <div className={classes.lefthalf}>
        <h2>{props.question}</h2>
        <button onClick={() => setShowAnswer(!showAnswer)}>Show Answer</button>
        {showAnswer && <p className={classes.answer}>{props.answer}</p>}
      </div>
      {/*terminal*/}
      <div className={classes.righthalf}>
        <h2>
          Terminal goes here
        </h2>
        <TerminalComponent/>
     </div>
    </div>
  );
}

export default QuestionAnswerPage;
