import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../../../utils/toasts";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleLogout = async () => {
    console.log("Logout clicked");
    try {
      const response = await fetch("/server/api/user/logout", {
        method: "POST",
      });
      if (response.ok) {
        notifySuccess("logged out successfuly");
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
      notifyError("faild to logged out");
    }
    // Implement logout logic
  };

  return (
    <nav className="bg-[#F0B100] px-3 py-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-slate-600 text-xl font-bold">
          Yoga class assignment
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        <ul
          className={`md:flex md:space-x-6 absolute md:relative md:bg-transparent bg-[#F0B100] z-10 w-full md:w-auto left-0 md:flex-row flex-col text-slate-600 font-semibold md:items-center p-4 md:p-0 transition-all duration-300 ease-in-out ${
            isOpen ? "top-16" : "top-[-300px]"
          } md:top-auto`}
        >
          <li>
            <Link
              to="/"
              className="block md:hover:bg-transparent md:hover:underline text-center"
            >
              home
            </Link>
          </li>
          <li>
            <Link
              to="/enroll"
              className="block md:hover:bg-transparent md:hover:underline text-center"
            >
              Enroll now
            </Link>
          </li>
          <li>
            <Link
              to="/enroll"
              className="block md:hover:bg-transparent md:hover:underline text-center"
            >
              your payments
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="block md:hover:bg-transparent md:hover:underline text-center"
            >
              Profile
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="block text-slate-600 cursor-pointer rounded md:rounded-full md:hover:underline w-full text-center"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
