"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/navigation";
import AxiosInstance from "../../components/AxiosInstance";
import { GoogleLogin } from "@react-oauth/google";



export default function Register() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = async (response: { credential: any }) => {
    try {
      // Send the Google token along with the user's information to the backend
        const res = await AxiosInstance.post("/google-login/", {
        token: response.credential, 
      });
     
      const first_name_google_client = res.data.first_name;
      const last_name_google_client = res.data.last_name;
      const google_email = res.data.email
      const google_full_name = `${first_name_google_client} ${last_name_google_client}`;
      // Assuming the backend sends user info, save the auth tokens
      localStorage.setItem("authToken", res.data.access);
      localStorage.setItem("refreshToken", res.data.refresh);

      // Redirect user to the home page
      login(google_email, '', google_full_name)
      router.push("/");
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Send registration request to the backend
      const response = await AxiosInstance.post("/register/", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });

      // If registration is successful, log the user in automatically
      if (response.data.token) {
        // Store the token in localStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("refreshToken", response.data.refresh);
        
        const fullName = `${firstName} ${lastName}`;
        await login(email, password, fullName);
        router.push("/");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID}>
      <div className="min-h-screen flex flex-col">
        <header className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-500 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
            <div className="text-center">
              <div className="flex justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-removebg-preview-2-Uo72XXQC0ngSlfSM7Bl3ipiWWztm26.png"
                  alt="GeoSafe Hub Logo"
                  width={80}
                  height={80}
                  className="rounded-xl"
                />
              </div>
              <h2 className="mt-6 text-3xl font-bold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Join GeoSafe Hub to access personalized safety information
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Continue with Email
              </button>

              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={(error: any) => console.log(error)}
              />

              <button
                type="button"
                className="w-full flex items-center justify-center gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                </svg>
                Continue with Apple
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or register with email
                </span>
              </div>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="last-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Must be at least 8 characters with 1 uppercase, 1 number,
                    and 1 special character
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </button>
              </div>
            </form>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </GoogleOAuthProvider>
  );
}
