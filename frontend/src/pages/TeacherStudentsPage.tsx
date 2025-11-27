import { useEffect, useState } from "react";
import { useAuthStore } from "../stores/useAuth.Store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";

interface Student {
  _id: string;
  username: string;
  email: string;
  displayName: string;
  createdAt: string;
  learningStats: {
    totalStudyTime: number; // minutes
    totalTests: number;
    totalLessons: number;
    averageScore: number;
    currentLevel: string;
    streak: number; // days
  };
  progress: {
    listening: number;
    speaking: number;
    reading: number;
    writing: number;
  };
}

// Mock data for demonstration
const mockStudents: Student[] = [
  {
    _id: "1",
    username: "student1",
    email: "student1@example.com",
    displayName: "Nguyễn Văn A",
    createdAt: "2024-01-15",
    learningStats: {
      totalStudyTime: 1250, // 20h 50min
      totalTests: 15,
      totalLessons: 32,
      averageScore: 8.5,
      currentLevel: "Intermediate",
      streak: 7,
    },
    progress: {
      listening: 75,
      speaking: 60,
      reading: 85,
      writing: 70,
    },
  },
  {
    _id: "2",
    username: "student2",
    email: "student2@example.com",
    displayName: "Trần Thị B",
    createdAt: "2024-02-20",
    learningStats: {
      totalStudyTime: 890, // 14h 50min
      totalTests: 12,
      totalLessons: 28,
      averageScore: 7.8,
      currentLevel: "Pre-Intermediate",
      streak: 3,
    },
    progress: {
      listening: 65,
      speaking: 55,
      reading: 70,
      writing: 60,
    },
  },
  {
    _id: "3",
    username: "student3",
    email: "student3@example.com",
    displayName: "Lê Văn C",
    createdAt: "2024-03-10",
    learningStats: {
      totalStudyTime: 2100, // 35h
      totalTests: 22,
      totalLessons: 45,
      averageScore: 9.2,
      currentLevel: "Upper-Intermediate",
      streak: 12,
    },
    progress: {
      listening: 90,
      speaking: 85,
      reading: 95,
      writing: 80,
    },
  },
];

const formatStudyTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

const getProgressColor = (percentage: number) => {
  if (percentage >= 80) return "bg-green-500";
  if (percentage >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-gray-100 text-gray-800";
    case "Pre-Intermediate":
      return "bg-blue-100 text-blue-800";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "Upper-Intermediate":
      return "bg-orange-100 text-orange-800";
    case "Advanced":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function TeacherStudentsPage() {
  const { user, accessToken } = useAuthStore();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Check if user is teacher
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    if (user && user.role !== "teacher") {
      toast.error("Bạn không có quyền truy cập trang này");
      navigate("/");
      return;
    }
  }, [user, accessToken, navigate]);

  // Load students data (using mock data for now)
  useEffect(() => {
    const loadStudents = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setStudents(mockStudents);
      } catch (error) {
        console.error("Error loading students:", error);
        toast.error("Không thể tải danh sách học sinh");
      } finally {
        setLoading(false);
      }
    };

    if (accessToken && user?.role === "teacher") {
      loadStudents();
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
            Theo dõi tiến trình học sinh
          </h1>
          <p className="text-gray-600 mt-2">
            Quản lý và theo dõi tiến bộ học tập của học sinh
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {students.length}
              </div>
              <p className="text-sm text-gray-600">Tổng số học sinh</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {Math.round(
                  (students.reduce(
                    (acc, s) => acc + s.learningStats.averageScore,
                    0
                  ) /
                    students.length) *
                    10
                ) / 10}
              </div>
              <p className="text-sm text-gray-600">Điểm trung bình</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(
                  students.reduce(
                    (acc, s) => acc + s.learningStats.totalStudyTime,
                    0
                  ) / 60
                )}
                h
              </div>
              <p className="text-sm text-gray-600">Tổng thời gian học</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">
                {students.filter((s) => s.learningStats.streak >= 7).length}
              </div>
              <p className="text-sm text-gray-600">
                Học sinh có streak ≥7 ngày
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Students List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Danh sách học sinh</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {students.map((student) => (
                    <div
                      key={student._id}
                      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedStudent?._id === student._id
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : ""
                      }`}
                      onClick={() => setSelectedStudent(student)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                            {student.displayName.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {student.displayName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {student.email}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getLevelColor(
                              student.learningStats.currentLevel
                            )}`}
                          >
                            {student.learningStats.currentLevel}
                          </span>
                          <div className="text-sm text-gray-500 mt-1">
                            Streak: {student.learningStats.streak} ngày 🔥
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 grid grid-cols-4 gap-2">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Listening</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(
                                student.progress.listening
                              )}`}
                              style={{
                                width: `${student.progress.listening}%`,
                              }}
                            ></div>
                          </div>
                          <div className="text-xs font-medium">
                            {student.progress.listening}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Speaking</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(
                                student.progress.speaking
                              )}`}
                              style={{ width: `${student.progress.speaking}%` }}
                            ></div>
                          </div>
                          <div className="text-xs font-medium">
                            {student.progress.speaking}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Reading</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(
                                student.progress.reading
                              )}`}
                              style={{ width: `${student.progress.reading}%` }}
                            ></div>
                          </div>
                          <div className="text-xs font-medium">
                            {student.progress.reading}%
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Writing</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className={`h-2 rounded-full ${getProgressColor(
                                student.progress.writing
                              )}`}
                              style={{ width: `${student.progress.writing}%` }}
                            ></div>
                          </div>
                          <div className="text-xs font-medium">
                            {student.progress.writing}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Student Detail */}
          <div>
            {selectedStudent ? (
              <Card>
                <CardHeader>
                  <CardTitle>Chi tiết học sinh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl mx-auto">
                      {selectedStudent.displayName.charAt(0)}
                    </div>
                    <h3 className="font-bold text-lg mt-2">
                      {selectedStudent.displayName}
                    </h3>
                    <p className="text-gray-500">{selectedStudent.email}</p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${getLevelColor(
                        selectedStudent.learningStats.currentLevel
                      )}`}
                    >
                      {selectedStudent.learningStats.currentLevel}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-3">Thống kê học tập</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            ⏱️ Thời gian học:
                          </span>
                          <span className="font-medium">
                            {formatStudyTime(
                              selectedStudent.learningStats.totalStudyTime
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            🏆 Điểm trung bình:
                          </span>
                          <span className="font-medium">
                            {selectedStudent.learningStats.averageScore}/10
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            🧾 Số bài test:
                          </span>
                          <span className="font-medium">
                            {selectedStudent.learningStats.totalTests}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            📚 Số bài học:
                          </span>
                          <span className="font-medium">
                            {selectedStudent.learningStats.totalLessons}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">
                            🔥 Streak hiện tại:
                          </span>
                          <span className="font-medium">
                            {selectedStudent.learningStats.streak} ngày
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Tiến độ 4 kỹ năng</h4>
                      <div className="space-y-3">
                        {Object.entries(selectedStudent.progress).map(
                          ([skill, progress]) => (
                            <div key={skill}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="capitalize">
                                  {skill === "listening"
                                    ? "Nghe"
                                    : skill === "speaking"
                                    ? "Nói"
                                    : skill === "reading"
                                    ? "Đọc"
                                    : "Viết"}
                                </span>
                                <span>{progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${getProgressColor(
                                    progress
                                  )}`}
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full" variant="outline">
                      Xem chi tiết báo cáo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-gray-400 text-lg mb-2">👥</div>
                  <p className="text-gray-500">
                    Chọn một học sinh để xem chi tiết
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
