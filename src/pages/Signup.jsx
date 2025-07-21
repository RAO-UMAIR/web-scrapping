import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const res = await fetch("http://127.0.0.1:8000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        // toast.success("Signup Successful");
        localStorage.setItem("token", result.token);
        navigate("/");
      } else {
        // toast.error("Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      // toast.error("An error occurred during signup");
    }
  };

  return (
    <div className="flex justify-center ">
      <div className=" sm:w-1/2 w-fit  flex justify-center pt-10">
        <div className="w-64 md:w-[320px] lg:w-[400px] shadow-2xl bg-white px-4 py-8 sm:px-6 sm:py-10 md:px-8 rounded-3xl">
          <form onSubmit={handleSubmit}>
            <h1 className="text-blue-800 font-semibold text-center text-2xl sm:text-3xl mb-4 sm:mb-6">
              Signup
            </h1>
            <label className="font-semibold text-lg md:text-xl">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full mt-1 mb-3 sm:mt-1 sm:mb-3 px-1 py-1 sm:px-2 sm:py-1 lg:py-2   outline-none border-2 border-blue-400 focus:border-blue-600 rounded-lg"
            />

            <label className="font-semibold text-lg md:text-xl">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              className="w-full mt-1 mb-3 sm:mt-1 sm:mb-3 px-1 py-1 sm:px-2 sm:py-1 lg:py-2 outline-none border-2 border-blue-400 focus:border-blue-600 rounded-lg"
            />

            <label className="font-semibold text-lg md:text-xl">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              className="w-full mt-1 mb-3 sm:mt-1 sm:mb-3 px-1 py-1 sm:px-2 sm:py-1 lg:py-2 outline-none border-2 border-blue-400 focus:border-blue-600 rounded-lg"
            />

            <button
              type="submit"
              className="w-full sm:mt-3 bg-blue-600 text-white  py-1 sm:py-1 lg:py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
            <h1 className="mt-1 sm:mt-2 text-sm lg:text-lg">
              Already have an account?
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-700 ml-2 font-semibold"
              >
                Login
              </Link>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
