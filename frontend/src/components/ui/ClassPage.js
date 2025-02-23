import classes from './ClassPage.module.css'; 
import MainNavigation from '../layout/MainNavigation';

// a page for a singular class
function ClassPage(props) {
  return (
    <div>
      <MainNavigation />
      <div class={classes.classcontainer}> 
        {/*question list*/}
        <div className={classes.card}>
          <div className={classes.coursetitle}>
            <p>{props.classnumber} Questions</p>
          </div>
          {props.children} 
        </div>
        {/*progressbar*/}
        <div className={classes.colContainer}>
          <div className={classes.buffer}>
          </div>
          <div className={classes.progressbar}>
            <h1>
              progress
            </h1>
            <p>2/6 Correct</p>
            <p>1/6 Incorrect</p>
            <p>3/6 Unattempted</p>
          </div>
        </div>
      </div>
    </div>
  );

}
export default ClassPage;
