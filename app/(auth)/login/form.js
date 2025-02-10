"use client";
const Form = () => {
  const submitAction = async (formData) => {
    console.log(formData.get("userId"));
    console.log("Submitted Data:", Object.fromEntries(formData));
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-blue-500">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Login
          </h2>
          <form action={submitAction} className="space-y-6">
            {/* <!-- User ID --> */}
            <div>
              <label
                htmlFor="userId"
                className="block text-sm font-medium text-gray-700"
              >
                User ID
              </label>
              <input
                type="text"
                id="userId"
                name="userId"
                placeholder="Enter your User ID"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black"
              />
            </div>

            {/* <!-- Password --> */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your Password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 text-black"
              />
            </div>

            {/* <!-- Remember Me & Forgot Password --> */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <div>
                <a
                  href="#"
                  className="text-sm text-teal-600 hover:text-teal-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* <!-- Login Button --> */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Login
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?
                <a
                  href="#"
                  className="font-medium text-teal-600 hover:text-teal-500"
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Form;
