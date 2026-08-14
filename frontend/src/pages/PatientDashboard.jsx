import { useState } from "react";

export default function PatientDashboard() {
  const [hospital, setHospital] = useState("");
  const [department, setDepartment] = useState("");
  const [doctor, setDoctor] = useState("");

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Temporary patient ID
  // Later we will get this from the logged-in user
  const patientId = 1;

  const handleGetToken = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/queues/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            patient: Number(patientId),
            hospital: Number(hospital),
            department: Number(department),
            doctor: Number(doctor),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data);

        setError(
          data.detail ||
          data.non_field_errors?.[0] ||
          "Unable to get token."
        );

        return;
      }

      console.log("Token created:", data);

      setToken(data);

    } catch (error) {
      console.error(error);

      setError(
        "Could not connect to the Django server."
      );

    } finally {
      setLoading(false);
    }
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
            className="text-sm text-[#B51B17]"
          >
            Logout
          </a>

        </div>
      </nav>


      {/* Dashboard */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-[#1D3557]">
          Patient Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Get your hospital token and track your queue.
        </p>


        <div className="grid md:grid-cols-2 gap-6 mt-8">


          {/* Get Token */}
          <div className="bg-white border rounded-xl p-6">

            <h2 className="text-xl font-semibold text-[#1D3557]">
              Get Your Token
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-6">
              Select where you want to receive treatment.
            </p>


            <form onSubmit={handleGetToken}>

              {/* Hospital */}
              <label className="block text-sm font-medium mb-2">
                Hospital
              </label>

              <select
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                required
                className="w-full border rounded-lg px-4 py-3 mb-5"
              >
                <option value="">
                  Select Hospital
                </option>

                <option value="1">
                  Government Hospital
                </option>

                <option value="2">
                  Central Hospital
                </option>
              </select>


              {/* Department */}
              <label className="block text-sm font-medium mb-2">
                Department
              </label>

              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full border rounded-lg px-4 py-3 mb-5"
              >
                <option value="">
                  Select Department
                </option>

                <option value="1">
                  General Medicine
                </option>

                <option value="2">
                  Cardiology
                </option>

                <option value="3">
                  Orthopedics
                </option>
              </select>


              {/* Doctor */}
              <label className="block text-sm font-medium mb-2">
                Doctor
              </label>

              <select
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
                required
                className="w-full border rounded-lg px-4 py-3 mb-6"
              >
                <option value="">
                  Select Doctor
                </option>

                <option value="1">
                  Dr. Sharma
                </option>

                <option value="2">
                  Dr. Thapa
                </option>

                <option value="3">
                  Dr. Gurung
                </option>
              </select>


              {/* Error */}
              {error && (
                <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}


              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#1D3557] text-white py-3 rounded-lg hover:bg-[#B51B17] disabled:opacity-50"
              >
                {loading ? "Getting Token..." : "Get Token"}
              </button>

            </form>

          </div>


          {/* Queue */}
          <div className="bg-white border rounded-xl p-6">

            <h2 className="text-xl font-semibold text-[#1D3557]">
              Your Queue
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Your current queue status.
            </p>


            {!token ? (

              <div className="bg-[#F8F9FA] rounded-xl mt-6 p-8 text-center">

                <p className="text-sm text-gray-500">
                  Your Token
                </p>

                <p className="text-6xl font-bold text-[#1D3557] mt-2">
                  —
                </p>

                <p className="text-sm text-gray-500 mt-3">
                  You don't have an active token.
                </p>

              </div>

            ) : (

              <div className="mt-6">

                {/* Token */}
                <div className="bg-[#F8F9FA] rounded-xl p-8 text-center">

                  <p className="text-sm text-gray-500">
                    Your Token Number
                  </p>

                  <p className="text-6xl font-bold text-[#1D3557] mt-2">
                    {token.token_number}
                  </p>

                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-blue-100 text-[#1D3557] text-sm">
                    {token.status}
                  </span>

                </div>


                {/* Information */}
                <div className="mt-5 space-y-3">

                  <div className="flex justify-between border-b pb-3">

                    <span className="text-gray-500">
                      Hospital
                    </span>

                    <span className="font-medium">
                      ID: {token.hospital}
                    </span>

                  </div>


                  <div className="flex justify-between border-b pb-3">

                    <span className="text-gray-500">
                      Department
                    </span>

                    <span className="font-medium">
                      ID: {token.department}
                    </span>

                  </div>


                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Doctor
                    </span>

                    <span className="font-medium">
                      ID: {token.doctor}
                    </span>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}