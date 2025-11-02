import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  gradientFrom?: string;
  gradientTo?: string;
  logoGradient?: string;
  center?: boolean;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  gradientFrom = "from-blue-50",
  gradientTo = "to-purple-50",
  logoGradient = "from-blue-600 to-purple-600",
  center = false,
}: AuthLayoutProps) {
  return (
    <div
      className={`${
        center ? "min-h-screen items-center" : "min-h-min items-start"
      } bg-gradient-to-br ${gradientFrom} via-white ${gradientTo} flex justify-center px-3 py-4`}
    >
      <div className="max-w-sm w-full">
        {/* Logo & Title */}
        <div className="text-center mb-4">
          <div
            className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br ${logoGradient} rounded-lg mb-2 shadow-sm`}
          >
            <span className="text-base font-bold text-white">DE</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900 mb-1">{title}</h1>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow p-4">{children}</div>

        {/* Back to Home */}
        <div className="text-center mt-3">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
