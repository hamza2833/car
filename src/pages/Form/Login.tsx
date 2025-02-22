import { useState } from "react";

import FuelImage from '../../images/car/login.jpg'
const Login = () => {
  return (
      <div className="flex h-screen w-full bg-white dark:bg-graydark flex-col md:flex-row">
        {/* Left Panel */}
        <div className="w-full md:max-w-md px-6 md:px-10 py-12 bg-white dark:bg-boxdark shadow-lg flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Log in to EEVEE Business
          </h1>
          <p className="text-gray-600 dark:text-bodydark mb-6">
            Log in with your company’s details. Contact your employer for login details.
          </p>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="Fleet@eeveemobili"
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100 dark:bg-form-input dark:border-form-strokedark focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mt-1 border rounded-lg bg-gray-100 dark:bg-form-input dark:border-form-strokedark focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log in
            </button>
            <div className="text-right">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-gray-600 dark:text-bodydark">
              Is your company not using EEVEE yet?
              <a href="#" className="text-primary font-medium hover:underline ml-1">
                Get started
              </a>
            </p>
          </div>
        </div>

        {/* Right Panel with Background Image */}
        <div className="hidden md:block w-full  bg-cover bg-center" style={{ backgroundImage: `url(${FuelImage})` }}>
          {/* <img src={FuelImage} /> */}
        </div>
      </div>
  );
};

export default Login;