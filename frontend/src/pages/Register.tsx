import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import SocialLoginButtons from "../components/auth/SocialLoginButtons";
import LoadingSpinner from "../components/auth/LoadingSpinner";
import { Input } from "../components/ui/input";
import PasswordInput from "../components/auth/PasswordInput";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../stores/useAuth.Store";
import { z } from "zod";
export default function Register() {
  // Toggle to show/hide social login buttons temporarily
  const SHOW_SOCIAL_LOGIN = false;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signUp, loading } = useAuthStore();

  // Zod schema for register form validation
  const registerSchema = z
    .object({
      firstName: z.string().min(1, "Vui lòng nhập họ"),
      lastName: z.string().min(1, "Vui lòng nhập tên"),
      username: z.string().min(2, "Tên đăng nhập phải có ít nhất 2 ký tự"),
      email: z.string().email("Email không hợp lệ"),
      password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
      confirmPassword: z
        .string()
        .min(6, "Xác nhận mật khẩu phải có ít nhất 6 ký tự"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Mật khẩu xác nhận không khớp",
      path: ["confirmPassword"],
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate with Zod
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      // Convert Zod errors into our errors state shape
      const fieldErrors = result.error.flatten().fieldErrors;
      const newErrors: Record<string, string> = {};
      for (const key of Object.keys(fieldErrors)) {
        const v = (fieldErrors as Record<string, (string | undefined)[]>)[key];
        if (v && v.length > 0) {
          newErrors[key] = v[0] as string;
        }
      }
      setErrors(newErrors);
      return;
    }

    try {
      // Call the auth store signUp. This will show toasts and manage loading state.
      await signUp(
        formData.username,
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName
      );
      // On success navigate to login
      navigate("/login");
    } catch (error) {
      // signUp already toasted the error; you can map server errors to fields here if needed
      console.error("Register error (handled in store):", error);
    }
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
      <form
        onSubmit={handleSubmit}
        className="space-y-3 max-w-sm mx-auto w-full text-sm"
      >
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="firstName"
              className="text-sm font-medium text-gray-700"
            >
              Họ
            </label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Nguyễn"
              className="mt-1"
            />
            {errors.firstName && (
              <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Tên
            </label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Văn A"
              className="mt-1"
            />
            {errors.lastName && (
              <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700"
          >
            Tên đăng nhập
          </label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
            className="mt-1"
          />
          {errors.username && (
            <p className="text-xs text-red-600 mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="mt-1"
            required
          />
        </div>

        <div className="space-y-2">
          <div>
            <PasswordInput
              id="password"
              name="password"
              label="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </div>

          <div>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              label="Xác nhận mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </div>
        </div>

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
        <Button
          type="submit"
          className="w-full py-2 text-sm"
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner text="Đang tạo tài khoản..." />
          ) : (
            "Đăng ký"
          )}
        </Button>
      </form>

      {SHOW_SOCIAL_LOGIN && <SocialLoginButtons />}

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
