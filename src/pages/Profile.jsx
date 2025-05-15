import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Home";
import classes from "./Profile.module.css";
import profile from "/images/profile.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Profile() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  let navigate = useNavigate();
  let data = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (!isLoggedIn) {
    //   navigate("/");
    // }
    if (data == undefined) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <>
      <main className={classes.main}>
        <h2></h2>
        {/* <h2>This is your name: {user.name}</h2>
        <h2>This is your email: {user.email}</h2> */}
        <h2 className={classes.pimage}>
          Profile
          <img src={profile} />
          {/* <button className={classes.button}>Change</button> */}
        </h2>
        <div className={classes.pemail}>
          <h2>{!isLoggedIn ? <div>guest@mail.com</div> : data.email}</h2>
          {/* <button className={classes.button}>Change</button> */}
        </div>
      </main>
    </>
  );
}

export default Profile;
