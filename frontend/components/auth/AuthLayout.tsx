import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  gradientFrom?: string;
  gradientTo?: string;
  logoGradient?: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  gradientFrom = "from-blue-50",
  gradientTo = "to-purple-50",
  logoGradient = "from-blue-600 to-purple-600",
}: AuthLayoutProps) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradientFrom} via-white ${gradientTo} flex items-center justify-center px-4 py-12`}
    >
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${logoGradient} rounded-2xl mb-4 shadow-lg`}
          >
            <span className="text-2xl font-bold text-white">DE</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">{children}</div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
