import { useRef, useState } from "react";
import classes from "./faq.module.css";

function Collapsible(props) {
  const [isShown, setShown] = useState(false);
  const parentRef = useRef();
  return (
    <>
      <div
        className={
          isShown ? `${classes.question} ${classes.show}` : classes.question
        }
        onClick={() => setShown(!isShown)}
      >
        <p>{props.question}</p>
      </div>

      <div
        className={classes.faq_answer}
        ref={parentRef}
        style={
          isShown
            ? {
                height: parentRef.current.scrollHeight + "px",
              }
            : {
                height: "0px",
              }
        }
      >
        <div className={classes.content}>{props.children}</div>
      </div>
    </>
  );
}

export default Collapsible;
