import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    "Sản phẩm": [
      { name: "Bài test đầu vào AI", href: "/placement-test" },
      { name: "Luyện Speaking", href: "#" },
      { name: "Chấm bài Writing", href: "#" },
      { name: "Lộ trình học tập", href: "#roadmap" },
      { name: "Theo dõi tiến độ", href: "#" },
    ],
    "Tài nguyên": [
      { name: "Mẹo thi IELTS", href: "#" },
      { name: "Hướng dẫn học tập", href: "#" },
      { name: "Bài mẫu Writing", href: "#" },
      { name: "Chủ đề Speaking", href: "#" },
      { name: "Tính điểm Band", href: "#" },
    ],
    "Về chúng tôi": [
      { name: "Giới thiệu", href: "#" },
      { name: "Tuyển dụng", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Đối tác", href: "#" },
    ],
    "Hỗ trợ": [
      { name: "Trung tâm trợ giúp", href: "#" },
      { name: "Liên hệ", href: "#" },
      { name: "Câu hỏi thường gặp", href: "#" },
      { name: "Chính sách bảo mật", href: "#" },
      { name: "Điều khoản sử dụng", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">LingoLift</span>
              </Link>

              <p className="text-gray-400 mb-6 leading-relaxed">
                Đồng hành cùng thí sinh IELTS với công nghệ AI tiên tiến, 
                feedback cá nhân hóa và chiến lược học tập đã được chứng minh 
                hiệu quả để đạt mục tiêu band điểm.
              </p>

              {/* Contact info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span>support@lingolift.ai</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-indigo-400" />
                  <span>+84 (0) 123 456 789</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>TP. Hồ Chí Minh, Việt Nam</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-12 border-t border-gray-800"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-white font-semibold mb-2">
                Đăng ký nhận tin
              </h4>
              <p className="text-gray-400 text-sm">
                Nhận mẹo IELTS, tài liệu học tập và ưu đãi độc quyền qua email.
              </p>
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                className="flex-1 lg:w-64 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 whitespace-nowrap">
                Đăng ký
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} LingoLift. Bảo lưu mọi quyền.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-indigo-600 hover:text-white transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
