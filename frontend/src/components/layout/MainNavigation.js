//import { useContext } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

//import FavoritesContext from '../../store/favorites-context.js';

function MainNavigation() {
  // const favoritesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>
          Squirrel Review
        </div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/classes'>Classes</Link>
          </li>
          <li>
            <Link to='/about'>About </Link>
          </li>
          <li>
            <Link to='/feedback'>Feedback</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
