import classes from './ClassPage.module.css';

function ClassPage(props) {
  return (
    <div className={classes.card}> {props.children} </div>
  );

}
export default ClassPage;
