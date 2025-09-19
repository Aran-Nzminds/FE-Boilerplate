import { useMsal } from "@azure/msal-react";
import { useAuth } from "@hooks/use-auth";
import { handleApiError } from "@utils/axios/error-handler";
import { useNavigate } from "react-router-dom";

import { loginRequest } from "../config/auth-config";

function Login() {
  const { instance, accounts } = useMsal();
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);

      if (response && response.accessToken) {
        login(response.accessToken);
        navigate("/");
      }
    }
    catch (e) {
      handleApiError(e);
    }
  };

  return (
    <div className="flex w-full h-full justify-center items-center bg-gray-100">
      <div className="w-1/2 h-1/2 rounded-none bg-white p-10 shadow-xl">
        <div className="mb-6 flex justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="Microsoft Logo"
            className="h-10"
          />
        </div>

        {/* Heading */}
        <h1 className="mb-8 text-center text-2xl font-semibold text-gray-600">
          {isAuthenticated && accounts.length > 0
            ? `Welcome, ${accounts[0].username}`
            : "Sign in to Continue"}
        </h1>

        {/* Buttons */}
        {accounts.length > 0 && isAuthenticated
          ? (
              <button
                onClick={logout}
                className="w-full rounded-lg bg-red-500 px-4 py-3 font-medium text-white shadow-md transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Logout
              </button>
            )
          : (
              <button
                onClick={handleLogin}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <img
                  src="https://img.icons8.com/color/48/microsoft.png"
                  alt="Microsoft"
                  className="h-5 w-5"
                />
                <span>Sign in with Microsoft</span>
              </button>
            )}

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          By signing in, you agree to our
          {" "}
          <a href="#" className="text-blue-600 hover:underline">
            Terms
          </a>
          {" "}
          and
          {" "}
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default Login;
