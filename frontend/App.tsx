import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, useEffect } from "react";
import "./App.css";
import NavBar from "./src/components/layout/NavBar";
import ProtectedRoute from "./src/components/auth/ProtectedRoute";
import Home from "./src/pages/Home";
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

          {/* Public Home - no protection needed */}
          <Route
            path="/"
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
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

function AuthBootstrap() {
  // Trigger refresh on mount (non-blocking)
  useEffect(() => {
    // call refresh but don't await here
    useAuthStore
      .getState()
      .refresh()
      .catch(() => {
        /* ignore */
      });
  }, []);

  return null;
}
