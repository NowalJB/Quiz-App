import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function ProfilePage() {
  const defaultValues = {
    name: "",
    bio: "",
    email: "",
    skills: "React,Node",
    config: {
      mode: "view",
    },
  };

  const methods = useForm({ defaultValues });
  const { watch, reset, setValue, register } = methods;

  useEffect(() => {
    const fetchProfile = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      try {
        const response = await axios.get(
          "http://localhost:3000/users/profile/me",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        const profileData = response.data.user;
        reset({
          ...profileData,
          config: { mode: "view" },
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        alert("Failed to fetch profile data.");
      }
    };

    fetchProfile();
  }, [reset]);

  const data = watch();

  const OnClickEdit = () => setValue("config.mode", "edit");
  const GoBackButton = () => setValue("config.mode", "view");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-orange-600">Profile Page</h1>
          {data?.config?.mode === "view" && (
            <button
              onClick={OnClickEdit}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* View Mode */}
        {data?.config?.mode === "view" && (
          <div className="space-y-3 text-gray-700">
            <p>
              <span className="font-medium">Name:</span> {data?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {data?.email}
            </p>
            <p>
              <span className="font-medium">Bio:</span> {data?.bio}
            </p>
            <p>
              <span className="font-medium">Skills:</span> {data?.skills}
            </p>
          </div>
        )}

        {/* Edit Mode */}
        {data?.config?.mode === "edit" && (
          <div className="space-y-4">
            <input
              {...register("name")}
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <textarea
              {...register("bio")}
              placeholder="Bio"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            <input
              {...register("skills")}
              placeholder="Skills"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />

            <div className="flex gap-4">
              <button
                onClick={GoBackButton}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
              >
                Go Back
              </button>
              <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition">
                Update
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
