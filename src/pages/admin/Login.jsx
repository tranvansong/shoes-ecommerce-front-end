import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ErrorIcon from '@mui/icons-material/Error';
import CircularProgress from '@mui/material/CircularProgress';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const loginError = await login(email, password);
    setLoading(false);
    if (loginError) {
      setError(loginError);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center my-6">
      <div className="w-1/2 bg-white p-8 rounded-lg">
        <h1 className="text-2xl font-bold">Login Admin</h1>
        <h3 className="text-lg mt-3">Enter your email and password to login</h3>
        {error && 
          <div className="bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-base flex items-center">
            <ErrorIcon style={{ color: "red" }} />
            <span className="text-red-800 ml-2">{error}</span>
          </div>
        }
        <form className="w-full mt-10" onSubmit={handleLogin}>
          <div>
            <div className="mt-5">
              <label className="text-base font-bold">
                Email address <span className="text-orange">*</span>
              </label>
              <input
                className="w-full border rounded-md p-4 mt-2 text-base outline-none"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="mt-6">
              <label className="text-base font-bold">
                Password <span className="text-orange">*</span>
              </label>
              <input
                className="w-full border rounded-md p-4 mt-2 text-base outline-none"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            <div className="flex justify-between items-center mt-5 text-base">
              <div>
                <p className="text-bluelight">Forgot password</p>
              </div>
            </div>
            <button
              className="w-full text-white text-base font-bold p-4 rounded-lg mt-10 bg-bluelight text-center"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress style={{color: "white"}} /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
