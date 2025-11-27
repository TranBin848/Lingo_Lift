import { useState, useEffect } from "react";
import { useAuthStore } from "../stores/useAuth.Store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { updateProfile, changePassword } from "../api/user";

interface ProfileForm {
  displayName: string;
  email: string;
  dateOfBirth: string;
  phone?: string;
  bio?: string;
}

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const { user, accessToken } = useAuthStore();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"account" | "password" | "family">(
    "account"
  );

  const [profileForm, setProfileForm] = useState<ProfileForm>({
    displayName: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    bio: "",
  });

  const [passwordForm, setPasswordForm] = useState<ChangePasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check authentication
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
  }, [accessToken, navigate]);

  // Load user data
  useEffect(() => {
    if (user) {
      setProfileForm({
        displayName: user.displayName || "",
        email: user.email || "",
        dateOfBirth: (user as any).dateOfBirth || "",
        phone: (user as any).phone || "",
        bio: (user as any).bio || "",
      });
    }
  }, [user]);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updateProfile({
        displayName: profileForm.displayName,
        dateOfBirth: profileForm.dateOfBirth,
        phone: profileForm.phone,
        bio: profileForm.bio,
      });

      if (response.success) {
        toast.success("Cập nhật thông tin thành công!");
        setIsEditingProfile(false);
        // Update user in store if needed
        // You might want to refetch user data or update the store
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi cập nhật thông tin");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);

    try {
      const response = await changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (response.success) {
        toast.success("Đổi mật khẩu thành công!");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      console.error("Error changing password:", error);
      toast.error(error.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "U"
    );
  };

  if (!user) {
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
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex gap-4 justify-center">
          {/* Sidebar */}
          <div className="w-56 bg-white shadow-md rounded-lg">
            <div className="p-4">
              {/* Profile Header */}
              <div className="text-center mb-3 flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-xl">
                    {getInitials(user.displayName || user.username)}
                  </span>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1 w-full">
                <button
                  className={`w-full flex items-center px-2 py-2 text-sm text-left rounded-md transition-colors ${
                    activeTab === "account"
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("account")}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Tài khoản
                </button>

                <button
                  className={`w-full flex items-center px-2 py-2 text-sm text-left rounded-md transition-colors ${
                    activeTab === "family"
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("family")}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Quản lý gia đình
                </button>

                <button
                  className={`w-full flex items-center px-2 py-2 text-sm text-left rounded-md transition-colors ${
                    activeTab === "password"
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveTab("password")}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Mật khẩu
                </button>

                <button className="w-full flex items-center px-2 py-2 text-sm text-left rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Quản lý thiết bị
                </button>

                <button className="w-full flex items-center px-2 py-2 text-sm text-left rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Mã kích hoạt
                </button>

                <button className="w-full flex items-center px-2 py-2 text-sm text-left rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  Lịch sử đơn hàng
                </button>
              </nav>

              {/* Delete Account Button */}
              <div className="mt-4 pt-2 border-t border-gray-200 w-full">
                <button className="w-full flex items-center px-2 py-2 text-sm text-left rounded-md text-red-600 hover:bg-red-50 transition-colors">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Xóa tài khoản
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-xl">
            <Card className="shadow-md border-0">
              <CardContent className="p-5">
                {activeTab === "account" ? (
                  // Account Information Tab
                  <div>
                    <div className="text-center mb-5">
                      <div className="mb-3">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">
                          Thông tin tài khoản
                        </h2>
                        <p className="text-sm text-gray-500">
                          Cập nhật thông tin cá nhân của bạn
                        </p>
                      </div>
                      {!isEditingProfile && (
                        <Button
                          onClick={() => setIsEditingProfile(true)}
                          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                          Chỉnh sửa thông tin
                        </Button>
                      )}
                    </div>

                    <form onSubmit={handleProfileSubmit} className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">
                          Thông tin cơ bản
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Họ và tên *
                            </label>
                            <input
                              type="text"
                              value={profileForm.displayName}
                              onChange={(e) =>
                                setProfileForm((prev) => ({
                                  ...prev,
                                  displayName: e.target.value,
                                }))
                              }
                              disabled={!isEditingProfile}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 transition-all"
                              placeholder="Trần Bin"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Email *
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                value={profileForm.email}
                                disabled
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-100 text-gray-500"
                                placeholder="tranbin848@gmail.com"
                              />
                              <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">
                          Thông tin liên hệ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Ngày sinh *
                            </label>
                            <input
                              type="text"
                              value={profileForm.dateOfBirth || "03/11/2005"}
                              onChange={(e) =>
                                setProfileForm((prev) => ({
                                  ...prev,
                                  dateOfBirth: e.target.value,
                                }))
                              }
                              disabled={!isEditingProfile}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                              placeholder="dd/mm/yyyy"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Số điện thoại
                            </label>
                            <div className="flex">
                              <select
                                className="px-2 py-2 border border-gray-200 rounded-l-lg bg-gray-50 text-gray-600 border-r-0 text-xs font-medium"
                                disabled={!isEditingProfile}
                              >
                                <option>+84</option>
                              </select>
                              <input
                                type="tel"
                                value={profileForm.phone || "865804276"}
                                onChange={(e) =>
                                  setProfileForm((prev) => ({
                                    ...prev,
                                    phone: e.target.value,
                                  }))
                                }
                                disabled={!isEditingProfile}
                                className="flex-1 px-3 py-2 border border-gray-200 rounded-r-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all"
                                placeholder="865804276"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">
                          Thông tin địa chỉ
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Quốc gia *
                            </label>
                            <select
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 transition-all"
                              disabled={!isEditingProfile}
                            >
                              <option>Việt Nam</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Tỉnh thành
                            </label>
                            <select
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 transition-all"
                              disabled={!isEditingProfile}
                            >
                              <option>Chọn tỉnh thành</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Nghề nghiệp
                          </label>
                          <select
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500 transition-all"
                            disabled={!isEditingProfile}
                          >
                            <option>Chọn nghề nghiệp</option>
                          </select>
                        </div>
                      </div>

                      {isEditingProfile && (
                        <div className="flex justify-center space-x-3 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsEditingProfile(false);
                              // Reset form
                              if (user) {
                                setProfileForm({
                                  displayName: user.displayName || "",
                                  email: user.email || "",
                                  dateOfBirth: (user as any).dateOfBirth || "",
                                  phone: (user as any).phone || "",
                                  bio: (user as any).bio || "",
                                });
                              }
                            }}
                            className="px-4 py-2 text-sm font-semibold rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-all"
                          >
                            Hủy bỏ
                          </Button>
                          <Button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                          >
                            {loading ? "Đang lưu..." : "Lưu thay đổi"}
                          </Button>
                        </div>
                      )}
                    </form>
                  </div>
                ) : activeTab === "family" ? (
                  // Family Management Tab (Placeholder)
                  <div className="text-center py-8">
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-3">
                        👥
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Quản lý gia đình
                      </h2>
                      <p className="text-sm text-gray-500 max-w-md mx-auto">
                        Tính năng này đang được phát triển để mang đến trải
                        nghiệm tốt nhất cho gia đình bạn
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 max-w-lg mx-auto">
                      <p className="text-purple-700 font-semibold mb-1 text-sm">
                        Sắp ra mắt!
                      </p>
                      <p className="text-purple-600 text-xs">
                        Chúng tôi đang hoàn thiện tính năng quản lý tài khoản
                        gia đình
                      </p>
                    </div>
                  </div>
                ) : (
                  // Change Password Tab
                  <div>
                    <div className="text-center mb-5">
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        Đổi mật khẩu
                      </h2>
                      <p className="text-sm text-gray-500">
                        Cập nhật mật khẩu để bảo mật tài khoản của bạn
                      </p>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-100">
                        <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">
                          Thay đổi mật khẩu
                        </h3>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Mật khẩu hiện tại *
                            </label>
                            <input
                              type="password"
                              value={passwordForm.currentPassword}
                              onChange={(e) =>
                                setPasswordForm((prev) => ({
                                  ...prev,
                                  currentPassword: e.target.value,
                                }))
                              }
                              required
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Nhập mật khẩu hiện tại"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Mật khẩu mới *
                            </label>
                            <input
                              type="password"
                              value={passwordForm.newPassword}
                              onChange={(e) =>
                                setPasswordForm((prev) => ({
                                  ...prev,
                                  newPassword: e.target.value,
                                }))
                              }
                              required
                              minLength={6}
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                              Xác nhận mật khẩu mới *
                            </label>
                            <input
                              type="password"
                              value={passwordForm.confirmPassword}
                              onChange={(e) =>
                                setPasswordForm((prev) => ({
                                  ...prev,
                                  confirmPassword: e.target.value,
                                }))
                              }
                              required
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                              placeholder="Nhập lại mật khẩu mới"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-center pt-4">
                        <Button
                          type="submit"
                          disabled={loading}
                          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                          {loading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
