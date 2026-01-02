import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import "./App.css";
import NavBar from "./src/components/layout/NavBar";
import ProtectedRoute from "./src/components/auth/ProtectedRoute";
import Home from "./src/pages/Home";
import LandingPage from "./src/pages/LandingPage";
import Listening from "./src/pages/skills/Listening";
import Speaking from "./src/pages/skills/Speaking";
import Reading from "./src/pages/skills/Reading";
import Writing from "./src/pages/skills/Writing";
import Login from "./src/pages/Login";
import Register from "./src/pages/Register";
import UserPage from "./src/pages/UserPage";
import PlacementTest from "./src/pages/PlacementTest";
import PlacementTestsPage from "./src/pages/placement/PlacementTestsPage";
import AdminUsersPage from "./src/pages/AdminUsersPage";
import TeacherStudentsPage from "./src/pages/TeacherStudentsPage";
import ProfilePage from "./src/pages/ProfilePage";
import WritingTestPage from "./src/pages/WritingTestPage";
import PlacementTestHistoryPage from "./src/pages/PlacementTestHistoryPage";
import LearningPathPage from "./src/pages/LearningPathPage";
import LearningPathPageV2 from "./src/pages/LearningPathPageV2";
import { PlacementTestPage } from "./src/components/placement-test";
import WritingPracticePage from "./src/pages/WritingPracticePage";
import { AuthProvider } from "./src/context/AuthContext";
import FloatingChatButton from "./src/components/chat/FloatingChatButton";
import { Toaster } from "sonner";
import { useAuthStore } from "./src/stores/useAuth.Store";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="bottom-left" richColors />
        {/* Attempt to refresh auth on app start so NavBar renders correctly */}
        <AuthBootstrap />
        <Routes>
          {/* Auth Routes - No NavBar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Landing Page - Public */}
          <Route
            path="/"
            element={
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    Đang tải...
                  </div>
                }
              >
                <LandingPage />
              </Suspense>
            }
          />

          {/* Dashboard - Public */}
          <Route
            path="/dashboard"
            element={
              <div className="min-h-screen bg-gray-50">
                <NavBar />
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      Đang tải...
                    </div>
                  }
                >
                  <Home />
                </Suspense>
                <FloatingChatButton />
              </div>
            }
          />

          {/* Protected routes - require auth */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/admin/users"
              element={
                <div className="min-h-screen bg-gray-50">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <AdminUsersPage />
                  </Suspense>
                </div>
              }
            />
            <Route
              path="/placement-tests"
              element={
                <div className="min-h-screen bg-gray-50">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <PlacementTestsPage />
                  </Suspense>
                  <FloatingChatButton />
                </div>
              }
            />
            <Route
              path="/placement-test-history"
              element={
                <div className="min-h-screen">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <PlacementTestHistoryPage />
                  </Suspense>
                </div>
              }
            />
            <Route
              path="/learning-path"
              element={
                <div className="min-h-screen">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <LearningPathPage />
                  </Suspense>
                  <FloatingChatButton />
                </div>
              }
            />
            <Route
              path="/mycourse"
              element={
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      Đang tải...
                    </div>
                  }
                >
                  <LearningPathPageV2 />
                </Suspense>
              }
            />
            <Route
              path="/placement-test"
              element={
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      Đang tải...
                    </div>
                  }
                >
                  <PlacementTestPage />
                </Suspense>
              }
            />
            <Route
              path="/placement"
              element={
                <div className="min-h-screen bg-gray-50">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <PlacementTest />
                  </Suspense>
                  <FloatingChatButton />
                </div>
              }
            />
            <Route
              path="/placement-test/:id"
              element={
                <div className="min-h-screen">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <WritingTestPage />
                  </Suspense>
                </div>
              }
            />
            <Route
              path="/admin/placement-test/edit/:id"
              element={
                <div className="min-h-screen bg-gray-50">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <PlacementTestsPage />
                  </Suspense>
                  <FloatingChatButton />
                </div>
              }
            />
            <Route
              path="/admin/placement-test/create"
              element={
                <div className="min-h-screen bg-gray-50">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <PlacementTestsPage />
                  </Suspense>
                  <FloatingChatButton />
                </div>
              }
            />
            <Route
              path="/user/dashboard"
              element={
                <div className="min-h-screen bg-gray-50">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <UserPage />
                  </Suspense>
                  <FloatingChatButton />
                </div>
              }
            />
            <Route
              path="/teacher/students"
              element={
                <div className="min-h-screen bg-gray-50">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <TeacherStudentsPage />
                  </Suspense>
                  <FloatingChatButton />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <div className="min-h-screen bg-gray-50">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <ProfilePage />
                  </Suspense>
                  <FloatingChatButton />
                </div>
              }
            />
            <Route
              path="/listening"
              element={
                <div className="min-h-screen bg-gray-50">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <Listening />
                  </Suspense>
                  <FloatingChatButton />
                </div>
              }
            />
            <Route
              path="/speaking"
              element={
                <div className="min-h-screen bg-gray-50">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <Speaking />
                  </Suspense>
                  <FloatingChatButton />
                </div>
              }
            />
            <Route
              path="/reading"
              element={
                <div className="min-h-screen bg-gray-50">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <Reading />
                  </Suspense>
                  <FloatingChatButton />
                </div>
              }
            />
            <Route
              path="/writing"
              element={
                <div className="min-h-screen bg-gray-50">
                  <NavBar />
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center min-h-screen">
                        Đang tải...
                      </div>
                    }
                  >
                    <Writing />
                  </Suspense>
                  <FloatingChatButton />
                </div>
              }
            />
            <Route
              path="/writing/practice"
              element={
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      Đang tải...
                    </div>
                  }
                >
                  <WritingPracticePage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function AuthBootstrap() {
  // Kiểm tra token và chỉ refresh nếu cần thiết
  useEffect(() => {
    const { accessToken, user } = useAuthStore.getState();

    // Nếu đã có token trong localStorage, không cần refresh ngay
    // Chỉ refresh khi token sắp hết hạn (xử lý bởi interceptor)
    if (accessToken && !user) {
      // Nếu có token nhưng chưa có user info, thử fetch user
      // TODO: Implement fetchMe khi có API
    }
  }, []);

  return null;
}
