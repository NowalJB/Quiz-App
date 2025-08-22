function MyInformation({
  id,
  name,
  email,
}: {
  id: string;
  name: string;
  email?: string;
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-4 max-w-md mx-auto border border-gray-200">
      <p className="text-gray-700">
        <span className="font-medium text-orange-600">ID:</span> {id}
      </p>
      <p className="text-gray-700">
        <span className="font-medium text-orange-600">Name:</span> {name}
      </p>
      <p className="text-gray-700">
        <span className="font-medium text-orange-600">Email:</span>{" "}
        {email || "No Email Found"}
      </p>
    </div>
  );
}

export default MyInformation;
