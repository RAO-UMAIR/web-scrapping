import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password").toString(),
    };
    try {
      const res = await fetch("http://127.0.0.1:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        // toast.success("You are Logged in Successfully");
        localStorage.setItem("token", result.token);
        navigate("/");
      } else {
        // toast.error("You are not allowed to Login");
      }
    } catch (err) {
      // toast.error("Login Failed");
      console.error(err);
    }
  };
  return (
    <div className=" flex justify-center h-screen  pt-10">
      <div className="h-screen w-fit ">
        <form
          className="bg-white shadow-xl px-8 py-6 sm:p-6 md:p-8 lg:px-8 lg:py-12 rounded-3xl"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-green-600 font-bold text-2xl sm:text-2xl  md:text-3xl lg:text-4xl mb-3 sm:mb-4 md:mb-5 lg:mb-8 ">
            LOGIN
          </h1>
          <div>
            <label className="block text-lg sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2 md:mb-2 lg:mb-3 text-gray-800">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              className="px-3 py-1 md:px-4 md:py-1 lg:py-3 lg:w-[320px] border rounded-lg outline-none border-green-400 focus:ring-1 focus:border-green-500"
            />
          </div>
          <div className="mt-3 mb-4 sm:mt-3 sm:mb-4 md:mt-4 md:mb-6 lg:mt-6 lg:mb-8">
            <label className="block text-lg md:text-xl lg:text-2xl mb-1 text-gray-800">
              Password
            </label>
            <input
              type="text"
              placeholder="Enter your password"
              name="password"
              className="px-3 py-1 md:px-4 md:py-1 lg:py-3 lg:w-[320px] border rounded-lg outline-none border-green-400 focus:ring-1 focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="lg:w-[320px]  bg-green-600 text-white py-1 sm:py-1 sm:text-[16px] md:py-2 lg:text-xl rounded-lg hover:bg-green-700 transition cursor-pointer"
          >
            Login
          </button>
          <h1 className="mt-3 sm:mt-4  md:mt-4 lg:mt-5 lg:text-lg">
            New User?
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-700 ml-2 font-semibold"
            >
              Register
            </Link>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Login;
