import React, { useState, ChangeEvent, FormEvent } from "react";
import { useAuth } from "./AuthContext";

interface LoginFormState {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    loginError: "",
  });

  const { login } = useAuth();

  // Email regex: ensures valid format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password regex: Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "", loginError: "" };

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

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate the form before submitting
    const isValid = validateForm();
    if (!isValid) return;

    try {
      const response = await fetch("http://localhost:4000/Login", {
        method: "POST",
        body: JSON.stringify(formState),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          loginError: data.message || "Invalid credentials",
        }));
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        loginError: "An error occurred. Please try again.",
      }));
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <h1 className="ml-2 text-center text-2xl font-bold  text-gray-900  tracking-tight leading-9">
        Login to your account
      </h1>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium leading-6  text-gray-900">
              Email Address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <p className="text-red-600">{errors.email}</p>}
            </div>
          </div>

          <div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password}</p>
                )}
              </div>
            </div>
          </div>

          {errors.loginError && (
            <p className="text-red-600">{errors.loginError}</p>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a
                href="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Don't Have An Account? Register
              </a>
            </div>
            <div className="text-sm">
              <a
                href="/"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Forgot Password?
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
