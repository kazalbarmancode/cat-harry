import Link from "next/link";

const SignInPage = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-lime-400">Sign In to Your Account</h2>

        <form  className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" required className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-lime-400" placeholder="user@example.com" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" name="password" required className="w-full p-2.5 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-lime-400" placeholder="••••••••" />
            <div className="text-right mt-1">
              <a href="#" className="text-xs text-gray-400 hover:text-lime-400">Forgot Password?</a>
            </div>
          </div>

          <button type="submit" className="w-full bg-lime-400 text-gray-900 font-semibold py-2.5 rounded hover:bg-lime-300 transition duration-200">
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <button className="w-full bg-white text-gray-800 font-medium py-2.5 rounded hover:bg-gray-100 transition duration-200 flex items-center justify-center gap-2">
            <span>Login with Google</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          Dont have an account? <Link href="/signUp" className="text-lime-400 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
    );
};

export default SignInPage;