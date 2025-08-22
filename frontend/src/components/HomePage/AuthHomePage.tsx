import axios from "axios";
import { useEffect, useState } from "react";
import MyInformation from "../../MyInformation";

export interface IAuthUserList {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  __v: number;
}

function AuthHomePage() {
  const [users, setUsers] = useState<IAuthUserList[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    async function fetchData() {
      axios
        .get("http://localhost:3000/users/list", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          const userList: IAuthUserList[] = response?.data?.users || [];
          setUsers(userList);
        })
        .catch((error) => {
          console.log("error => ", error);
          const errors = error?.response?.data?.message || "An error occurred";
          alert(errors);
        });
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-orange-600 mb-6 text-center">
          Authenticated Users
        </h1>
        {users?.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {users.map((user, index) => (
              <div key={index}>
                <MyInformation
                  id={user?._id}
                  name={user?.name}
                  email={user?.email}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default AuthHomePage;
