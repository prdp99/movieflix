import { useState } from "react";
import classes from "./index.module.css";
import { useNavigate } from "react-router-dom";
function GetEmail() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate("/signup", { state: email });
  }
  return (
    <div className={classes.get_started}>
      <h3 className={classes.email_title}>
        Ready to watch? Enter your email to create or restart your membership.
      </h3>

      <form onSubmit={handleSubmit} className={classes.input_email}>
        <div className={classes.input_container}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder=" "
            type="email"
            className="email-input"
            required
          />
          <label htmlFor="email" className={classes.floating_label}>
            Email address
          </label>
        </div>
        <button className={classes.get_started_button}>Get Started</button>
      </form>
    </div>
  );
}

export default GetEmail;
