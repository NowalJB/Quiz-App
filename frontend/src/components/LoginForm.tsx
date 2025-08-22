import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext, type IAuthContext } from "../App";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { isAuth, setAuthState } = useContext<IAuthContext>(AuthContext);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = {
      email,
      password,
    };

    axios
      .post("http://localhost:3000/users/login", finalData)
      .then((response) => {
        const token = response.data.accessToken;
        localStorage.setItem("accessToken", token);
        window.location.href = "/";
      })
      .catch((error) => {
        console.log("error => ", error);
        const errors = error?.response?.data?.message || "An error occurred";
        alert(errors);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-orange-600 mb-2">
          Login Form
        </h1>
        <p className="text-gray-600 text-center mb-6">Login to Continue</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              name="search_email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              name="search_password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-orange-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
