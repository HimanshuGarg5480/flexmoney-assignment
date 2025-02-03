import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../redux/features/user/userSlice.js";

const LoginSignupForm = ({ page }) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    age: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    console.log("hi");
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (page === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/server/api/user/${page}`, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify content type
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setLoading(false);
        const data = await response.json();
        dispatch(setUser(data));
        navigate("/");
      }
      if (response.error) throw new Error(response.message);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };
  return (
    <form className="bg-[#132a0f] rounded-lg py-4 px-4 h-fit flex flex-col">
      <div className="text-[1.4rem] font-bold leading-[2rem] tracking-[-2%] text-dark-100 dark:text-grey-50 lg:text-[2.25rem] lg:leading-[2rem]">
        <div>Hey! 👋</div>
        <div>
          Welcome to <span className="text-[#8fde8c]">Yoga Club</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2 w-[90%] mx-auto">
        {page == "signup" && (
          <div>
            <div className="w-full">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                id="email"
                className="rounded-md bg-[#394f38] border border-[#334155] leading-10 pl-2 w-full"
                placeholder="Enter your email address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="name" className="block ">
                name
              </label>
              <input
                id="name"
                className="rounded-md bg-[#394f38] border border-[#334155] leading-10 pl-2 w-full"
                placeholder="Enter your name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="age" className="block ">
                age
              </label>
              <input
                id="age"
                className="rounded-md bg-[#394f38] border border-[#334155] leading-10 pl-2 w-full"
                placeholder="Enter your age"
                type="number"
                min={18}
                max={65}
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block ">
                phone
              </label>
              <input
                id="phone"
                className="rounded-md bg-[#394f38] border border-[#334155] leading-10 pl-2 w-full"
                placeholder="Enter your phone number"
                type="number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block ">
                Password
              </label>
              <input
                id="password"
                className="rounded-md bg-[#394f38] border border-[#334155] leading-10 pl-2 w-full"
                placeholder="Enter the password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block ">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                className="rounded-md bg-[#394f38] border border-[#334155] leading-10 pl-2 w-full"
                placeholder="Re-enter the password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}

        {page == "login" && (
          <div>
            <div className="w-full">
              <label htmlFor="email" className="block">
                Email
              </label>
              <input
                id="email"
                className="rounded-md bg-[#394f38] border border-[#334155] leading-10 pl-2 w-full"
                placeholder="Enter your email address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="password" className="block ">
                Password
              </label>
              <input
                id="password"
                className="rounded-md bg-[#394f38] border border-[#334155] leading-10 pl-2 w-full"
                placeholder="Enter the password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 py-2 rounded-md mt-2 flex justify-center gap-3"
          onClick={handleSubmit}
        >
          {loading && (
            <div className="inset-0 flex items-center justify-center ml-2">
              <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin"></div>
            </div>
          )}
          {page === "login" ? "Login" : "Sign Up"}
        </button>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
      )}

      <div className="text-center mt-1">
        {page == "login"
          ? "Do not have an Account ?"
          : "Already have an Account ?"}
        <Link to={`/${page == "login" ? "signup" : "login"}`}>
          <span className="text-blue-500">
            &nbsp;{page == "login" ? "signup" : "login"}
          </span>
        </Link>
      </div>
    </form>
  );
};

export default LoginSignupForm;
