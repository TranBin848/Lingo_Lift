import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuth.Store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import UserTable from "../components/admin/UserTable";

interface User {
  _id: string;
  username: string;
  email: string;
  displayName: string;
  role: "user" | "admin" | "teacher";
  createdAt: string;
}

export default function AdminUsersPage() {
  const { user, accessToken } = useAuthStore();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // Check if user is admin
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    if (user && user.role !== "admin") {
      toast.error("Bạn không có quyền truy cập trang này");
      navigate("/");
      return;
    }
  }, [user, accessToken, navigate]);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/all`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.success) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Không thể tải danh sách người dùng");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken && user?.role === "admin") {
      fetchUsers();
    }
  }, [accessToken, user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý tài khoản
          </h1>
          <p className="text-gray-600 mt-2">
            Quản lý người dùng và phân quyền
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Tổng số người dùng</p>
            <p className="text-3xl font-bold text-gray-900">{users.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Quản trị viên</p>
            <p className="text-3xl font-bold text-red-600">
              {users.filter((u) => u.role === "admin").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Giáo viên</p>
            <p className="text-3xl font-bold text-blue-600">
              {users.filter((u) => u.role === "teacher").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <p className="text-sm text-gray-600">Người dùng thường</p>
            <p className="text-3xl font-bold text-gray-600">
              {users.filter((u) => u.role === "user").length}
            </p>
          </div>
        </div>

        {/* Users Table */}
        <UserTable
          users={users}
          currentUserId={user?.id}
          accessToken={accessToken}
          onUsersChange={setUsers}
        />
      </div>
    </div>
  );
}
