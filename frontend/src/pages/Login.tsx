import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import PasswordInput from "../components/auth/PasswordInput";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import LoadingSpinner from "../components/auth/LoadingSpinner";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login data:", formData);
      setIsLoading(false);
      navigate("/");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthLayout
      title="Chào mừng trở lại!"
      subtitle="Đăng nhập để tiếp tục học tiếng Anh"
      gradientFrom="from-blue-50"
      gradientTo="to-purple-50"
      logoGradient="from-blue-600 to-purple-600"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
          focusColor="focus:ring-blue-500"
        />

        <PasswordInput
          id="password"
          name="password"
          label="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required
          focusColor="focus:ring-blue-500"
        />

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">
              Ghi nhớ đăng nhập
            </span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Quên mật khẩu?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <LoadingSpinner text="Đang đăng nhập..." />
          ) : (
            "Đăng nhập"
          )}
        </button>
      </form>

      <SocialLoginButtons />

      {/* Register Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Chưa có tài khoản?{" "}
        <Link
          to="/register"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Đăng ký ngay
        </Link>
      </p>
    </AuthLayout>
  );
}
