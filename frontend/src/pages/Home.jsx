import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1D3557]">

      {/* Navbar */}
      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            QueueFlow
          </h1>

          <div className="hidden md:flex gap-8 text-sm">
            <a href="#how" className="hover:text-[#B51B17]">
              How It Works
            </a>

            <a href="#features" className="hover:text-[#B51B17]">
              Features
            </a>

            <a href="#about" className="hover:text-[#B51B17]">
              About
            </a>
          </div>

          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 border border-[#1D3557] rounded-lg text-sm"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-[#1D3557] text-white rounded-lg text-sm"
            >
              Register
            </Link>
          </div>

        </div>
      </nav>


      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Healthcare Management,
              <span className="text-[#B51B17]">
                {" "}Simplified
              </span>
            </h2>

            <p className="mt-6 text-gray-600 leading-7">
              QueueFlow helps patients avoid long queues at hospitals.
              Get your token online and track your position without
              waiting at the hospital from the early morning.
            </p>

            <div className="mt-8 flex gap-4">

              <a
                href="/register"
                className="bg-[#1D3557] text-white px-6 py-3 rounded-lg"
              >
                Get Started
              </a>

              <a
                href="#how"
                className="border border-[#1D3557] px-6 py-3 rounded-lg"
              >
                Learn More
              </a>

            </div>

          </div>


          {/* Simple Queue Card */}
          <div className="bg-white rounded-xl shadow-sm border p-8">

            <p className="text-sm text-gray-500">
              General Medicine
            </p>

            <h3 className="text-2xl font-semibold mt-2">
              Current Queue
            </h3>

            <div className="bg-[#F8F9FA] rounded-lg p-6 mt-6 text-center">

              <p className="text-gray-500 text-sm">
                Now Serving
              </p>

              <p className="text-6xl font-bold mt-2 text-[#1D3557]">
                12
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Please wait for your turn
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* How It Works */}
      <section
        id="how"
        className="bg-white py-16"
      >

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-10">

            <h2 className="text-3xl font-bold">
              How It Works
            </h2>

            <p className="text-gray-600 mt-2">
              Simple and convenient for patients and hospitals.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-6">

            <Step
              number="01"
              title="Register"
              description="Create your account and enter your basic information."
            />

            <Step
              number="02"
              title="Get Your Token"
              description="Select a hospital and department to get your queue token."
            />

            <Step
              number="03"
              title="Track Your Queue"
              description="Check the current token and know when your turn is near."
            />

          </div>

        </div>

      </section>


      {/* Features */}
      <section
        id="features"
        className="max-w-6xl mx-auto px-6 py-16"
      >

        <div className="text-center mb-10">

          <h2 className="text-3xl font-bold">
            Key Features
          </h2>

        </div>


        <div className="grid md:grid-cols-3 gap-6">

          <Feature
            title="Digital Queue"
            description="Get your hospital token without standing in a long queue."
          />

          <Feature
            title="Live Queue Status"
            description="See which token is currently being served."
          />

          <Feature
            title="Easy Management"
            description="Doctors and hospital staff can manage patients easily."
          />

        </div>

      </section>


      {/* CTA */}
      <section
        id="about"
        className="bg-[#1D3557] text-white py-16"
      >

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-3xl font-bold">
            Skip the Long Queue
          </h2>

          <p className="mt-4 text-gray-200">
            Get your hospital token online and spend less time waiting.
          </p>

          <a
            href="/register"
            className="inline-block mt-6 bg-[#B51B17] px-6 py-3 rounded-lg"
          >
            Register Now
          </a>

        </div>

      </section>


      {/* Footer */}
      <footer className="bg-[#F8F9FA] border-t">

        <div className="max-w-6xl mx-auto px-6 py-6 text-center">

          <p className="font-semibold">
            QueueFlow
          </p>

          <p className="text-sm text-gray-500 mt-2">
            © 2026 QueueFlow. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}


/* Step Component */

function Step({ number, title, description }) {
  return (
    <div className="bg-[#F8F9FA] p-6 rounded-xl border">

      <span className="text-[#B51B17] font-bold">
        {number}
      </span>

      <h3 className="text-xl font-semibold mt-3">
        {title}
      </h3>

      <p className="text-gray-600 mt-2">
        {description}
      </p>

    </div>
  );
}


/* Feature Component */

function Feature({ title, description }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">

      <div className="w-10 h-10 bg-[#E8EEF7] rounded-lg mb-4" />

      <h3 className="text-lg font-semibold">
        {title}
      </h3>

      <p className="text-gray-600 mt-2 text-sm leading-6">
        {description}
      </p>

    </div>
  );
}