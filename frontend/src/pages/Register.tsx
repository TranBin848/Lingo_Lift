import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormInput from "../components/auth/FormInput";
import PasswordInput from "../components/auth/PasswordInput";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import LoadingSpinner from "../components/auth/LoadingSpinner";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.name.length < 2) {
      newErrors.name = "Tên phải có ít nhất 2 ký tự";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Register data:", formData);
      setIsLoading(false);
      navigate("/login");
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  return (
    <AuthLayout
      title="Bắt đầu học tiếng Anh"
      subtitle="Tạo tài khoản miễn phí ngay hôm nay"
      gradientFrom="from-purple-50"
      gradientTo="to-pink-50"
      logoGradient="from-purple-600 to-pink-600"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="name"
          name="name"
          type="text"
          label="Họ và tên"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nguyễn Văn A"
          error={errors.name}
          required
          focusColor="focus:ring-purple-500"
        />

        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          required
          focusColor="focus:ring-purple-500"
        />

        <PasswordInput
          id="password"
          name="password"
          label="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          focusColor="focus:ring-purple-500"
        />

        <PasswordInput
          id="confirmPassword"
          name="confirmPassword"
          label="Xác nhận mật khẩu"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
          focusColor="focus:ring-purple-500"
        />

        {/* Terms & Conditions */}
        <label className="flex items-start">
          <input
            type="checkbox"
            required
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
          />
          <span className="ml-2 text-sm text-gray-600">
            Tôi đồng ý với{" "}
            <Link
              to="/terms"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link
              to="/privacy"
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Chính sách bảo mật
            </Link>
          </span>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <LoadingSpinner text="Đang tạo tài khoản..." />
          ) : (
            "Đăng ký"
          )}
        </button>
      </form>

      <SocialLoginButtons />

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Đã có tài khoản?{" "}
        <Link
          to="/login"
          className="text-purple-600 hover:text-purple-700 font-medium"
        >
          Đăng nhập
        </Link>
      </p>
    </AuthLayout>
  );
}
