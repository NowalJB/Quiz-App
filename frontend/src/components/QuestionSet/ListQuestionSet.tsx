import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface IListQuestionSet {
  _id: string;
  title: string;
  questionCount: number;
}

function ListQuestionSet() {
  const [questionSets, setQuestionSet] = useState<IListQuestionSet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      axios
        .get("http://localhost:3000/api/questions/set/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setQuestionSet(response?.data?.questionSet);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (questionSets.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">No question sets found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          My Question Sets
        </h2>

        <ul className="space-y-4">
          {questionSets.map((question) => {
            const TakeQuizHandler = () => {
              Navigate(`/questionset/${question._id}/attempt`);
            };
            return (
              <li
                key={question._id}
                className="flex items-center justify-between border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <p className="text-gray-700">
                  <strong>{question.title}</strong> — {question.questionCount}{" "}
                  questions
                </p>
                <button
                  onClick={TakeQuizHandler}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition"
                >
                  Take Quiz
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ListQuestionSet;
