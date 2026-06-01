import { useState } from 'react';

export default function AdminLoginScreen({
  setIsLoggedIn,
}) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] =
    useState('');

  // LOGIN ADMIN

  const handleLogin = async () => {

    setError('');

    if (!username || !password) {

      setError('Please enter username and password');

      return;

    }

    try {

      setLoading(true);

      const response = await fetch(
        'http://192.168.1.26:5000/api/admin/login',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      setLoading(false);

      if (response.ok) {

        setSuccessMessage('Login Successful 🔥');

        // DIRECT LOGIN
        setIsLoggedIn(true);

      } else {

        setError(data.message || 'Login Failed');

      }

    } catch (error) {

      console.log(error);

      setLoading(false);

      setError('Network request failed');

    }

  };

  return (

    <div className="bg-[#F5F7FA] min-h-screen flex items-center justify-center px-4 relative">

      {/* SUCCESS POPUP */}

      {successMessage && (

        <div className="absolute top-5 right-5 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl z-50">

          <p className="font-semibold text-sm sm:text-base">
            {successMessage}
          </p>

        </div>

      )}

      <div className="bg-white w-full max-w-[420px] rounded-3xl shadow-xl p-6 sm:p-10">

        {/* Heading */}

        <h1 className="text-3xl sm:text-5xl font-extrabold text-center mb-3 text-gray-900">
          KS MART ADMIN
        </h1>

        <p className="text-center text-gray-500 mb-8 text-sm sm:text-base">
          Login To Continue
        </p>

        {/* Error */}

        {error && (

          <div className="bg-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">

            {error}

          </div>

        )}

        {/* Username */}

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full h-14 border border-gray-300 rounded-2xl px-4 mb-4 outline-none focus:border-cyan-500"
        />

        {/* Password */}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full h-14 border border-gray-300 rounded-2xl px-4 mb-5 outline-none focus:border-cyan-500"
        />

        {/* Login Button */}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full h-14 bg-cyan-500 hover:bg-cyan-600 transition-all duration-300 text-white rounded-2xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >

          {loading ? 'Loading...' : 'Login'}

        </button>

      </div>

    </div>

  );
}