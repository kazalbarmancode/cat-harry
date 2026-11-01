import Link from "next/link";
const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-lime-400">
          Create an Account
        </h2>

        {
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded mb-4 text-sm"></div>
        }

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-lime-400"
              placeholder="Your Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-lime-400"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo URL</label>
            <input
              type="url"
              name="photoURL"
              className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-lime-400"
              placeholder="https://example.com/photo.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-lime-400"
              placeholder="••••••••"
            />
            <p className="text-xs text-gray-400 mt-1">
              Must have Uppercase, Lowercase & min 6 characters.
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-lime-400 text-gray-900 font-semibold py-2.5 rounded hover:bg-lime-300 transition duration-200"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <button className="w-full bg-white text-gray-800 font-medium py-2.5 rounded hover:bg-gray-100 transition duration-200 flex items-center justify-center gap-2">
            <span>Register with Google</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/signIn" className="text-lime-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
