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

  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
    existingUser: "",
  });

  const { login } = useAuth();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = async () => {
    let valid = true;
    const newErrors = {
      userName: "",
      email: "",
      password: "",
      existingUser: "",
    };

    if (!formState.userName || formState.userName.trim() === "") {
      newErrors.userName = "Username is required.";
      valid = false;
    }

    if (!formState.email) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }

    if (!formState.password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (!passwordRegex.test(formState.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, include an uppercase, lowercase, number, and special character.";
      valid = false;
    }

    if (
      formState.userName === "existingUser" ||
      formState.email === "existing@example.com"
    ) {
      newErrors.existingUser = "Username or email already exists.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) {
      return; // Prevent form submission if there are validation errors
    }

    try {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify(formState),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Registration failed");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="ml-2 text-center text-2xl font-bold  text-gray-900  tracking-tight leading-9">
        Register Your Account
      </h1>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={register}>
          <div>
            <label className="block text-sm font-medium leading-6  text-gray-900">
              User Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="userName"
                value={formState.userName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
              {errors.userName && (
                <p className="text-red-600">{errors.userName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6  text-gray-900">
              Email Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium leading-6  text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                required
              />
              {errors.password && (
                <p className="text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          {errors.existingUser && (
            <p className="text-red-600">{errors.existingUser}</p>
          )}

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>

          <div className="text-sm">
            <a
              href="/Login"
              className="font-semibold text-indigo-600 hover:text-indigo-500 pl-[225px]"
            >
              have an account?Log In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
