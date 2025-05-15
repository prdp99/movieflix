import Card from "../components/Card";
import { useLocation } from "react-router-dom";

function SignUp() {
  let location = useLocation();
  return (
    <>
      <Card
        name="Sign up"
        text="Already have an account?"
        isSignUp={true}
        email={location.state}
      />
    </>
  );
}

export default SignUp;
