import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // get role from URL
  const role = searchParams.get("role") || "talent";

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMP: after successful login
   navigate(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">
        
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Login as <span className="font-semibold capitalize">{role}</span>
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to={`/register?role=${role}`}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
