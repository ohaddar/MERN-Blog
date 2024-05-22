import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "./AuthContext";

interface RegisterFormState {
  userName: string;
  email: string;
  password: string;
}
const RegisterPage: React.FC = () => {
  const [formState, setFormState] = useState<RegisterFormState>({
    userName: "",
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify(formState),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token);
      } else {
        alert(data.message);
      }
    } catch (error) {
      // Handle errors here
      alert("Registration failed");
      console.error("Registration error:", error);
    }
  };

  return (
    <form className="Register" onSubmit={register}>
      <h1>Register</h1>
      <input
        type="text"
        name="userName"
        placeholder="userName"
        value={formState.userName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        value={formState.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formState.password}
        onChange={handleChange}
      />

      <button type="submit">Register</button>
      <a href="http://">have an account:Log In</a>
    </form>
  );
};

export default RegisterPage;
