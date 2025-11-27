import { useState } from "react";
import { toast } from "sonner";
import api from "../../lib/axios";
import { RoleCombobox } from "./RoleCombobox";

interface User {
  _id: string;
  username: string;
  email: string;
  displayName: string;
  role: "user" | "admin" | "teacher";
  createdAt: string;
}

interface UserTableProps {
  users: User[];
  currentUserId?: string;
  accessToken: string | null;
  onUsersChange: (users: User[]) => void;
}

export default function UserTable({
  users,
  currentUserId,
  accessToken,
  onUsersChange,
}: UserTableProps) {
  const [updating, setUpdating] = useState<string | null>(null);
  const [editingRoles, setEditingRoles] = useState<Record<string, string>>({});

  const handleRoleSelectChange = (userId: string, newRole: string) => {
    setEditingRoles((prev) => ({
      ...prev,
      [userId]: newRole,
    }));
  };

  const handleUpdateRole = async (userId: string) => {
    const newRole = editingRoles[userId];
    if (!newRole) {
      toast.error("Please select a role");
      return;
    }

    try {
      setUpdating(userId);
      const response = await api.patch(`/users/${userId}/role`, {
        role: newRole,
      });

      if (response.data.success) {
        toast.success(`Cập nhật role thành ${newRole} thành công`);
        // Update local state
        const updatedUsers = users.map((u) =>
          u._id === userId
            ? { ...u, role: newRole as "user" | "admin" | "teacher" }
            : u
        );
        onUsersChange(updatedUsers);
        // Clear editing state for this user
        setEditingRoles((prev) => {
          const newState = { ...prev };
          delete newState[userId];
          return newState;
        });
      }
    } catch (error: unknown) {
      console.error("Error updating role:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update user role";
      toast.error(errorMessage);
    } finally {
      setUpdating(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      return;
    }

    try {
      const response = await api.delete(`/users/${userId}`);

      if (response.data.success) {
        toast.success("Xóa tài khoản thành công");
        onUsersChange(users.filter((u) => u._id !== userId));
      }
    } catch (error: unknown) {
      console.error("Error deleting user:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to delete user";
      toast.error(errorMessage);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-300";
      case "teacher":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return "👑";
      case "teacher":
        return "👨‍🏫";
      default:
        return "👤";
    }
  };

  const hasRoleChanged = (userId: string, currentRole: string) => {
    return editingRoles[userId] && editingRoles[userId] !== currentRole;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[220px]">
                Người dùng
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[250px]">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[130px]">
                Vai trò
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[140px]">
                Ngày tham gia
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((u) => {
              const isCurrentUser = u._id === currentUserId;
              const isAdminUser = u.role === "admin";
              const roleChanged = hasRoleChanged(u._id, u.role);
              const canEditRole = !isCurrentUser && !isAdminUser;

              return (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {u.displayName}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs text-blue-600 font-semibold">
                              (Bạn)
                            </span>
                          )}
                          {isAdminUser && !isCurrentUser && (
                            <span className="ml-2 text-xs text-red-600 font-semibold">
                              (Admin)
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          @{u.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{u.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold border ${getRoleBadgeColor(
                        u.role
                      )}`}
                    >
                      {getRoleIcon(u.role)} {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium">
                    <div className="flex items-center gap-2 justify-end">
                      {/* Role Combobox */}
                      <RoleCombobox
                        value={editingRoles[u._id] ?? u.role}
                        onChange={(newRole) =>
                          handleRoleSelectChange(u._id, newRole)
                        }
                        disabled={updating === u._id || !canEditRole}
                      />

                      {/* Update Button - Always visible */}
                      <button
                        onClick={() => handleUpdateRole(u._id)}
                        disabled={
                          updating === u._id || !canEditRole || !roleChanged
                        }
                        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors w-[90px] ${
                          roleChanged && canEditRole
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {updating === u._id ? "Đang lưu..." : "Cập nhật"}
                      </button>

                      {/* Delete Button - Always visible */}
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        disabled={!canEditRole}
                        className="px-3 py-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-[70px]"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
