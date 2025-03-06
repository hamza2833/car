import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { loginUser, logout } from "../../store/slices/authSlice";
import FuelImage from "../../images/car/image.png";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { authData, isLoading, error } = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData));
    navigate("/calendar");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="flex h-screen w-full bg-white dark:bg-graydark flex-col md:flex-row">
      {/* Left Panel */}
      <div className="w-full md:max-w-md px-6 md:px-10 py-12 bg-white dark:bg-boxdark shadow-lg flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {authData ? "Welcome Back!" : "Log in to ChargiZ"}
        </h1>

        {authData ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-bodydark mb-6">
              You are logged in.
            </p>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <p className="text-gray-600 dark:text-bodydark mb-6">
              Log in with your company’s details. Contact your employer for login details.
            </p>
            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100 dark:bg-form-input dark:border-form-strokedark focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100 dark:bg-form-input dark:border-form-strokedark focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-lg text-white focus:outline-none focus:ring-2 ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-blue-600 focus:ring-blue-500"
                }`}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
              <div className="text-right">
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-bodydark">
                Is your company not using ChargiZ yet?
                <a href="#" className="text-primary font-medium hover:underline ml-1">
                  Get started
                </a>
              </p>
            </div>
          </>
        )}
      </div>

      {/* Right Panel with Background Image */}
      <div className="hidden md:block w-full bg-cover bg-center" style={{ backgroundImage: `url(${FuelImage})` }} />
    </div>
  );
};

export default Login;
