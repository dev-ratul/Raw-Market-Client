import { Link } from "react-router";
import { ShieldAlert } from "lucide-react";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="text-red-500 mb-4">
        <ShieldAlert size={64} />
      </div>
      <h1 className="text-5xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        Sorry, you don't have permission to access this page. If you believe this is an error, please contact the administrator.
      </p>
      <Link
        to="/"
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded shadow transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Forbidden;
