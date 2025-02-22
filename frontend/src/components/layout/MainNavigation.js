//import { useContext } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';

//import FavoritesContext from '../../store/favorites-context.js';

function MainNavigation() {
  // const favoritesCtx = useContext(FavoritesContext);

  return (
    <header className={classes.header}>

      {/* <Link to='/'>
        <div className="shape text squirrel-r-c63b1dd72dd6">
          <div className="text-node-html" id="html-text-node-fdba266e-932a-802f-8005-c63b1dd72dd6" data-x="271" data-y="270">
            <div className="root rich-text root-0" style={{ display: "flex", whiteSpace: "break-spaces", alignItems: "flex-start" }} xmlns="http://www.w3.org/1999/xhtml">
              <div className="paragraph-set root-0-paragraph-set-0">
                <p className="paragraph root-0-paragraph-set-0-paragraph-0" dir="ltr">
                  <span className="text-node root-0-paragraph-set-0-paragraph-0-text-0"
                    style={{
                      color: "rgba(38, 58, 56, 1)", textTransform: "none", lineBreak: "auto", overflowWrap: "initial", whiteSpace: "pre", fontSize: "18px",
                      textRendering: "geometricPrecision", caretColor: "rgba(38, 58, 56, 1)", textDecoration: "none", "--font-id": "gfont-chivo-mono",
                      "--fills": '[["^ ", "~:fill-color", "#263a38", "~:fill-opacity", 1]]', letterSpacing: "0px", fontFamily: "Chivo Mono", fontStyle: "normal",
                      fontWeight: 400
                    }}
                  >
                    squirrel review
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link> */}

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

      {/* <Link to="/classes">
        <div className="shape text courses-c63e55b77d74">
          <div className="text-node-html" id="html-text-node-fdba266e-932a-802f-8005-c63e55b77d74" data-x="1516" data-y="270">
            <div className="root rich-text root-0" style={{ display: "flex", whiteSpace: "break-spaces", alignItems: "flex-start" }} xmlns="http://www.w3.org/1999/xhtml">
              <div className="paragraph-set root-0-paragraph-set-0">
                <p className="paragraph root-0-paragraph-set-0-paragraph-0" dir="ltr">
                  <span className="text-node root-0-paragraph-set-0-paragraph-0-text-0"
                    style={{
                      color: "rgba(38, 58, 56, 1)", textTransform: "none", lineBreak: "auto", overflowWrap: "initial", whiteSpace: "pre", fontSize: "18px",
                      textRendering: "geometricPrecision", caretColor: "rgba(38, 58, 56, 1)", textDecoration: "none", "--font-id": "gfont-chivo-mono",
                      "--fills": '[["^ ", "~:fill-color", "#263a38", "~:fill-opacity", 1]]', letterSpacing: "0px", fontFamily: "Chivo Mono", fontStyle: "normal",
                      fontWeight: 400
                    }}
                  >
                    courses
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link> */}

      {/*text: about*/}
      {/* <Link to="/about">
        <div className="shape text about-c63e26240e6e">
          <div className="text-node-html" id="html-text-node-fdba266e-932a-802f-8005-c63e26240e6e" data-x="1286" data-y="270">
            <div className="root rich-text root-0" style={{ display: "flex", whiteSpace: "break-spaces", alignItems: "flex-start" }} xmlns="http://www.w3.org/1999/xhtml">
              <div className="paragraph-set root-0-paragraph-set-0">
                <p className="paragraph root-0-paragraph-set-0-paragraph-0" dir="ltr">
                  <span className="text-node root-0-paragraph-set-0-paragraph-0-text-0"
                    style={{
                      color: "rgba(38, 58, 56, 1)", textTransform: "none", lineBreak: "auto", overflowWrap: "initial", whiteSpace: "pre", fontSize: "18px",
                      textRendering: "geometricPrecision", caretColor: "rgba(38, 58, 56, 1)", textDecoration: "none", "--font-id": "gfont-chivo-mono",
                      "--fills": '[["^ ", "~:fill-color", "#263a38", "~:fill-opacity", 1]]', letterSpacing: "0px", fontFamily: "Chivo Mono", fontStyle: "normal",
                      fontWeight: 400
                    }}
                  >
                    about
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link> */}

      {/* <Link to="/feedback">
        <div className="shape text feedback-c63e30185bf2">
          <div className="text-node-html" id="html-text-node-fdba266e-932a-802f-8005-c63e30185bf2" data-x="1388" data-y="270">
            <div className="root rich-text root-0" style={{ display: "flex", whiteSpace: "break-spaces", alignItems: "flex-start" }} xmlns="http://www.w3.org/1999/xhtml">
              <div className="paragraph-set root-0-paragraph-set-0">
                <p className="paragraph root-0-paragraph-set-0-paragraph-0" dir="ltr">
                  <span className="text-node root-0-paragraph-set-0-paragraph-0-text-0"
                    style={{
                      color: "rgba(38, 58, 56, 1)", textTransform: "none", lineBreak: "auto", overflowWrap: "initial", whiteSpace: "pre", fontSize: "18px",
                      textRendering: "geometricPrecision", caretColor: "rgba(38, 58, 56, 1)", textDecoration: "none", "--font-id": "gfont-chivo-mono",
                      "--fills": '[["^ ", "~:fill-color", "#263a38", "~:fill-opacity", 1]]', letterSpacing: "0px", fontFamily: "Chivo Mono", fontStyle: "normal",
                      fontWeight: 400
                    }}
                  >
                    feedback
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link> */}


    </header>
  );
}

export default MainNavigation;

