function AboutUsPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-10">
      <div className="max-w-3xl bg-white shadow-lg rounded-2xl p-10 text-center">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-6">
          About QuizMaster
        </h1>
        <p className="text-gray-700 leading-relaxed mb-4">
          QuizMaster is your go-to platform for testing your knowledge across
          various topics.
        </p>
        <p className="text-gray-600 leading-relaxed">
          Challenge yourself, compete with others, and track your progress as
          you attempt fun and engaging quizzes. Whether you are a student,
          professional, or just love learning, QuizMaster makes it enjoyable to
          expand your knowledge.
        </p>
      </div>
    </div>
  );
}

export default AboutUsPage;
