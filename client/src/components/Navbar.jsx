import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 z-50 bg-white/20 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <h1 className="text-2xl font-extrabold text-white">
          TalentConnect
        </h1>

        <div className="flex gap-6 items-center">
          <Link
            to="/login"
            className="text-white hover:text-gray-200 font-medium"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-white text-indigo-700 px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
