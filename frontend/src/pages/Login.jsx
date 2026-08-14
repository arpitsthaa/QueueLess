import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("LOGIN BUTTON CLICKED");
    console.log("Username:", username);

    setLoading(true);
    setError("");

    try {
      console.log("Sending request to Django...");

      const response = await fetch(
        "http://127.0.0.1:8000/api/login/",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      console.log("Response received:", response.status);

      const data = await response.json();

      console.log("Django response:", data);

      if (!response.ok) {
        setError(
          data.non_field_errors?.[0] ||
          data.detail ||
          "Login failed."
        );

        return;
      }

      // Save authentication token
      localStorage.setItem("token", data.token);

      console.log("TOKEN SAVED");

      // Go to patient dashboard
      window.location.href = "/patient";

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError("Could not connect to Django server.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">

      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <a
            href="/"
            className="text-2xl font-bold text-[#1D3557]"
          >
            QueueFlow
          </a>

          <a
            href="/"
            className="text-sm text-gray-600"
          >
            Back to Home
          </a>

        </div>
      </nav>


      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-6">

        <div className="w-full max-w-md">

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold text-[#1D3557]">
              Welcome Back
            </h1>

            <p className="text-gray-600 mt-2">
              Login to your QueueFlow account
            </p>

          </div>


          <div className="bg-white border rounded-xl shadow-sm p-8">

            <form onSubmit={handleSubmit}>

              {/* Username */}
              <div className="mb-5">

                <label className="block text-sm font-medium text-[#1D3557] mb-2">
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#1D3557]"
                />

              </div>


              {/* Password */}
              <div className="mb-5">

                <label className="block text-sm font-medium text-[#1D3557] mb-2">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-[#1D3557]"
                />

              </div>


              {/* Error */}
              {error && (
                <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}


              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1D3557] text-white py-3 rounded-lg font-medium hover:bg-[#B51B17] disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>

            </form>


            <p className="text-center text-sm text-gray-600 mt-6">

              Don't have an account?{" "}

              <a
                href="/register"
                className="font-medium text-[#B51B17] hover:underline"
              >
                Register
              </a>

            </p>

          </div>

        </div>

      </main>

    </div>
  );
}