import axios from "axios";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";

export interface QuestionSetForm {
  title: string;
  questions: {
    questionText: string;
    choices: { text: string; label: string; correctAnswer: boolean }[];
  }[];
}

function CreateQuestionSetForm() {
  const defaultValues: QuestionSetForm = {
    title: "",
    questions: [
      {
        questionText: "",
        choices: [],
      },
    ],
  };

  const methods = useForm({ defaultValues });
  const { watch, register, handleSubmit } = methods;

  const onSubmitHandler = (data: QuestionSetForm) => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post("http://localhost:3000/api/admin/questionset/create", data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        alert("Question Set Created Successfully");
      })
      .catch(() => {});
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Create Question Set
        </h1>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Enter Title
              </label>
              <input
                {...register("title")}
                placeholder="Enter Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
              />
            </div>

            <CreateQuestions />

            <button
              type="submit"
              className="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg shadow hover:bg-orange-700 transition"
            >
              Create Question Set
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

function CreateQuestions() {
  const { register, control } = useFormContext<QuestionSetForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Questions</h2>
      {fields?.map((field, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-4 space-y-3"
        >
          <div className="flex justify-between items-center">
            <input
              {...register(`questions.${index}.questionText`)}
              placeholder="Enter Question"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>

          <CreateChoices questionIndex={index} />

          <button
            type="button"
            onClick={() => append({ choices: [], questionText: "" })}
            className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
          >
            Add Question
          </button>
        </div>
      ))}
    </div>
  );
}

function CreateChoices({ questionIndex }: { questionIndex: number }) {
  const { register, control } = useFormContext<QuestionSetForm>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${questionIndex}.choices`,
  });

  return (
    <div className="space-y-3 mt-2">
      <h3 className="text-gray-700 font-medium">Choices</h3>
      {fields?.map((field, index) => (
        <div key={index} className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register(
              `questions.${questionIndex}.choices.${index}.correctAnswer`
            )}
            className="w-5 h-5 accent-orange-600"
          />
          <input
            {...register(`questions.${questionIndex}.choices.${index}.text`)}
            placeholder="Enter Choice"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Remove Choice
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            label: fields?.length.toString(),
            text: "",
            correctAnswer: false,
          })
        }
        className="px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
      >
        Add Choice
      </button>
    </div>
  );
}

export default CreateQuestionSetForm;
