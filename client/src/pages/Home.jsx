import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white flex flex-col justify-center items-center px-6">
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-center">
          TalentConnect
        </h1>

        <p className="max-w-2xl text-center text-lg md:text-xl opacity-90 mb-10">
          Discover talent. Showcase skills. Connect directly with industry
          professionals — no agents, no bias.
        </p>

        <div className="flex gap-6 flex-wrap justify-center">
          <Link
            to="/register?role=talent"
            className="bg-white text-indigo-700 px-8 py-4 rounded-full font-semibold shadow-xl hover:scale-105 transition"
          >
            Join as Talent
          </Link>

          <Link
            to="/register?role=producer"
            className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-700 transition"
          >
            Join as Producer
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
