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
        credentials: "include",
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
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6  text-gray-900">
              Email Adress
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="email"
                value={formState.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
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
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
          <div className="text-sm ">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500 pl-[225px]"
            >
              have an account:Log In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
