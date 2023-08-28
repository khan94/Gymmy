import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import Input from "../Common/Input/Input";
import Button from "../Common/Button/Button";
import axios from "redaxios";
import { Link, useNavigate } from "react-router-dom";
import { AVAILABLE_ROUTES } from "src/fixtures/routerConfig";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = useCallback(async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_CORE_API}/api/users`,
        {
          name,
          email,
          password,
        }
      );
      navigate("/workout-list");
    } catch (err) {
      setErrorMessage(
        err.response.data?.message || "Server error, please try again."
      );
      console.error("Error ocurred when trying to get workouts list: ", err);
    }
  }, [email, password]);

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 p-10">
      <FontAwesomeIcon
        icon={faDumbbell}
        className="h-10 w-10 p-2 rounded-lg bg-sky-700"
      />
      {errorMessage && (
        <div className="p-2 w-full text-center rounded-sm bg-red-400/10 text-red-500">
          {errorMessage}
        </div>
      )}
      <Input
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        placeholder="Name"
      />
      <Input
        value={email}
        onChange={({ target: { value } }) => setEmail(value)}
        placeholder="Email *"
      />
      <Input
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
        placeholder="Password *"
      />
      <Button onClick={() => handleSignUp()}>SIGN UP</Button>
      <div>
        Already have an account?{" "}
        <Link className="text-white underline" to={AVAILABLE_ROUTES.LOGIN}>
          Sign in
        </Link>
        .
      </div>
    </div>
  );
};

export default Register;
