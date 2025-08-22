import { useContext } from "react";
import AuthHomePage from "../components/HomePage/AuthHomePage";
import { AuthContext, type IAuthContext } from "../App";

function HomePage() {
  const { isAuth } = useContext<IAuthContext>(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-10">
      {isAuth ? (
        <AuthHomePage />
      ) : (
        <div className="text-center bg-white shadow-xl rounded-3xl p-12 max-w-2xl w-full">
          <h1 className="text-4xl font-extrabold text-orange-600 mb-6">
            Welcome to QuizMaster
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Test your knowledge and challenge yourself with exciting quizzes!
          </p>
          <p className="text-gray-600 mb-8">
            Login or register to start attempting quizzes and track your
            progress.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/login"
              className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold shadow hover:bg-orange-700 transition"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold shadow hover:bg-gray-300 transition"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
