import classes from './ClassPage.module.css';

// a page for a singular class
function ClassPage(props) {
  return (
    <div className={classes.card}> 
      <h1 className={classes.classnum}>{props.classnumber}</h1>

      {props.children} 
    </div>
  );

}
export default ClassPage;
