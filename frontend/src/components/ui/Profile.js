
import React from "react";
import classes from "./Profile.module.css";

function ProfileComponent({ name, image, description }) {
  return (
    <div className={classes.profilecard}>
      <img src={image} alt={`${name}'s profile`} className={classes.profileimage} />
      <div className={classes.profileinfo}>
        <h3 className={classes.profilename}>{name}</h3>
        <p className={classes.profiledescription}>{description}</p>
      </div>
    </div>
  );
}

export default ProfileComponent;
