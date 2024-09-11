import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../hooks/useAuth";
import { useTranslation } from 'react-i18next'; // Importing the translation hook

export default function LoginPage() {
  const { t } = useTranslation(); // Initialize the translation hook
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const { login } = useAuth();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate(); // Invoke useNavigate

  function handleForm(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true); // Indicate loading status

    try {
      await login(state.email, state.password);
      setError("");
      console.log(t("login_page.login_successful"));
      setLoginSuccess(true);

      // Introduce a delay before redirecting for post-login actions
      setTimeout(() => {
        navigate("/"); // Example redirect after successful login
        setIsLoading(false); // Reset loading status after the delay
      }, 2000); // 2000 ms delay = 2 seconds
    } catch (err) {
      console.error(err);
      setError(err.message);
      setIsLoading(false); // Ensure to reset loading state in case of error
    }
  }

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-base-300 p-5">
        <div className="card w-full max-w-md glass shadow-xl">
          <div className="card-body">
            <h1 className="text-4xl font-bold text-center mb-6">{t("login_page.login")}</h1>

            {error ? (
              <div className="alert alert-error mb-4">
                <span>{t("login_page.error")}{error}</span>
              </div>
            ) : (
              loginSuccess && (
                <div className="alert alert-success mb-4">
                  <span>{t("login_page.login_successful")}</span>
                </div>
              )
            )}
            <form onSubmit={handleLogin}>
              {/* Email Section */}
              <div className="form-control mb-8 relative">
                <div className="icon-wrapper absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-6 h-6 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder={t("login_page.enter_email")}
                  className="input input-bordered w-full pl-10 text-lg"
                  onChange={handleForm}
                  required
                />
              </div>

              {/* Password Section */}
              <div className="form-control mb-8 relative">
                <div className="icon-wrapper absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-6 h-6 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder={t("login_page.enter_password")}
                  className="input input-bordered w-full pl-10 text-lg"
                  onChange={handleForm}
                  required
                />
              </div>

              <div className="form-control mt-8">
                <button
                  type="submit"
                  className="btn btn-neutral text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    t("login_page.login")
                  )}
                </button>
              </div>

              <p className="mt-4">
                {t("login_page.no_account_yet")}{" "}
                <Link to="/signup" className="link link-info">
                  {t("login_page.sign_up")}
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
