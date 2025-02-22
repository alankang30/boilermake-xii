import classes from './ClassPage.module.css';
import MainNavigation from '../layout/MainNavigation';

// a page for a singular class
function ClassPage(props) {
  return (
    <div className={classes.card}> 
      <div class="header">
            <MainNavigation />
      </div>

      <h1 className={classes.classnum}>{props.classnumber}</h1>

      {props.children} 
    </div>
  );

}
export default ClassPage;
