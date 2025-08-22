import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AttemptQuizForm from "../../components/QuestionSet/AttemptQuizForm";

export interface IAttempQuestionForm {
  _id: string;
  title: string;
  questions: IQuestion[];
  createdBy: string;
  __v: number;
}

export interface IQuestion {
  questionText: string;
  choices: IChoice[];
  _id: string;
}

export interface IChoice {
  label: string;
  text: string;
  _id: string;
  selected?: boolean;
}

function AttemptQuizPage() {
  const { id } = useParams();

  const [questionSets, setQuestionSet] = useState<IAttempQuestionForm | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const Navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken || !id) {
      setIsLoading(false);
      return;
    }

    async function fetchData() {
      axios
        .get(`http://localhost:3000/api/questions/set/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setQuestionSet(response?.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }

    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!questionSets) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">No quiz found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          {questionSets.title}
        </h1>
        <AttemptQuizForm questionSet={questionSets} />
      </div>
    </div>
  );
}

export default AttemptQuizPage;
