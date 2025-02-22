//import { useContext } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

//import FavoritesContext from '../../store/favorites-context.js';

function MainNavigation() {
  // const favoritesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>

      <Link to='/'>
        {/*text: squirrel review*/}
        <div className={classes.squirrelreview}>
          <p>squirrel review</p>
        </div>
      </Link>

      <Link to="/classes">
        <div className={classes.courses}>
          <p>courses</p>
        </div>
      </Link>

      <Link to="/about">
        <div className={classes.about}>
          <p>about</p>
        </div>
      </Link>

      <Link to="/feedback">
        <div className={classes.feedback}>
          <p>feedback</p>
        </div>
      </Link>

    </header>
  );
}

export default MainNavigation;

