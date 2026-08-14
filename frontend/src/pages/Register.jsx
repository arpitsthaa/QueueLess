import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">

      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <a
            href="/"
            className="text-2xl font-bold text-[#1D3557]"
          >
            QueueFlow
          </a>

          <a
            href="/login"
            className="text-sm text-gray-600 hover:text-[#B51B17]"
          >
            Login
          </a>

        </div>
      </nav>


      {/* Register */}
      <main className="flex justify-center px-6 py-10">

        <div className="w-full max-w-md">

          <div className="text-center mb-7">

            <h1 className="text-3xl font-bold text-[#1D3557]">
              Create Account
            </h1>

            <p className="text-gray-600 mt-2">
              Register to use QueueFlow
            </p>

          </div>


          <div className="bg-white border rounded-xl shadow-sm p-8">

            <form onSubmit={handleSubmit}>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:border-[#1D3557]"
                />
              </div>


              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Username
                </label>

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  required
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:border-[#1D3557]"
                />
              </div>


              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:border-[#1D3557]"
                />
              </div>


              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="98XXXXXXXX"
                  required
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:border-[#1D3557]"
                />
              </div>


              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:border-[#1D3557]"
                />
              </div>


              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full px-4 py-3 border rounded-lg outline-none focus:border-[#1D3557]"
                />
              </div>


              <button
                type="submit"
                className="w-full bg-[#1D3557] text-white py-3 rounded-lg font-medium hover:bg-[#B51B17] transition"
              >
                Create Account
              </button>

            </form>


            <p className="text-center text-sm text-gray-600 mt-6">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#B51B17] font-medium hover:underline"
              >
                Login
              </a>
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}