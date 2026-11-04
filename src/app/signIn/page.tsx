"use client";

import { signIn } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmitSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Signing in...");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Invalid email or password!", { id: toastId });
        setLoading(false);
        return;
      }

      if (data) {
        toast.success("Signed in successfully!", { id: toastId });
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : " Sign-In failed!";
      toast.error(errorMessage, { id: toastId });
      setGoogleLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    const toastId = toast.loading("Connecting to Google...");

    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    }catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Google sign-UP failed!";
      toast.error(errorMessage, { id: toastId });
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-white py-12 px-4 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-md transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          Sign In to Cat Harry
        </h2>

        <form className="space-y-4" onSubmit={handleSubmitSignIn}>
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
              <Link
                href="#"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              required
              className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition duration-200 disabled:opacity-50 cursor-pointer shadow-sm shadow-blue-500/20"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || googleLoading}
            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{googleLoading ? "Redirecting..." : "Sign In with Google"}</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
          Dont have an account?{" "}
          <Link href="/signUp" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;