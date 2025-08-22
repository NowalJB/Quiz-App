import React, { useState } from "react";
import type { IAttempQuestionForm } from "../../pages/QuestionSet/AttemptQuizPage";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import axios from "axios";

export interface IAttemptQuizFinalData {
  questionSet: string;
  responses: {
    questionId: string;
    selectedChoicesIds: string[];
  }[];
}

function AttemptQuizForm({
  questionSet,
}: {
  questionSet: IAttempQuestionForm;
}) {
  const [result, setResult] = useState(null);
  const defaultValues: IAttempQuestionForm = { ...questionSet };
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const onSubmitHandler = (data: IAttempQuestionForm) => {
    const accessToken = localStorage.getItem("accessToken");

    const finalData: IAttemptQuizFinalData = {
      questionSet: data?._id,
      responses: data?.questions?.map((question) => ({
        questionId: question?._id,
        selectedChoicesIds: question?.choices
          ?.filter((choice) => choice?.selected)
          ?.map((ch) => ch?._id),
      })),
    };

    axios
      .post("http://localhost:3000/api/questions/answer/attempt", finalData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => {
        alert("Answer Set Updated Successfully");
        setResult(res.data.data);
      })
      .catch(() => {});
  };

  if (result) {
    return (
      <div className="text-center bg-white p-6 rounded-xl shadow-md">
        <p className="text-lg font-semibold text-gray-700">
          Your Score is{" "}
          <span className="text-orange-600">{result?.score || 0}</span> out of{" "}
          {result?.total || 0} questions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Quiz Title
            </label>
            <input
              {...methods.register("title")}
              placeholder="Enter Title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              readOnly
            />
          </div>

          <CreateQuestions />

          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-orange-700 transition"
          >
            Submit Answer
          </button>
        </form>
      </FormProvider>
    </div>
  );
}

function CreateQuestions() {
  const { control } = useFormContext<IAttempQuestionForm>();
  const { fields } = useFieldArray({ control, name: "questions" });

  return (
    <div className="space-y-6">
      {fields?.map((field, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3"
        >
          <p className="font-medium text-gray-800">{field?.questionText}</p>
          <CreateChoices questionIndex={index} />
        </div>
      ))}
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<IAttempQuestionForm>();
  const { fields } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  return (
    <div className="pl-4 space-y-2">
      {fields?.map((field, index) => (
        <label
          key={index}
          className="flex items-center gap-3 bg-white p-2 rounded-lg border border-gray-200 hover:bg-orange-50 transition"
        >
          <input
            type="checkbox"
            {...register(
              `questions.${questionIndex}.choices.${index}.selected`
            )}
            className="w-5 h-5 accent-orange-600"
          />
          <span className="text-gray-700">{field?.text}</span>
        </label>
      ))}
    </div>
  );
}

export default AttemptQuizForm;
