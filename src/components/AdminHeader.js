import React from "react";
import { removeUser } from "../utils/store/userSlice";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { adminAuth } from "../utils/firebase";

const AdminHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    await signOut(adminAuth);
    dispatch(removeUser());
    navigate("/admin-login");
  };

  return (
    <header className="bg-[#1f1f1f] px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold text-red-500">Admin Dashboard</h1>
      <div className="flex items-center gap-4">
        <p className="text-gray-300 text-sm hidden sm:block">
          {user?.displayName || "Admin"}
        </p>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
