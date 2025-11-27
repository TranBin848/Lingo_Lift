import { useAuthStore } from "../stores/useAuth.Store";
import { Button } from "../components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
// import { Badge } from "../components/ui/badge";

type Course = {
  id: string;
  title: string;
  lessons: number;
  progress: number;
};

const demoCourses: Course[] = [
  {
    id: "c1",
    title: "IELTS Writing - Latest Real Tests",
    lessons: 4,
    progress: 12,
  },
  { id: "c2", title: "IELTS Speaking Forecast", lessons: 46, progress: 34 },
  { id: "c3", title: "IELTS Handbook 20", lessons: 4, progress: 0 },
];

export default function UserPage() {
  const { user } = useAuthStore();
  const userName = user?.displayName ?? user?.username ?? "Trần Bin";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-[240px_1fr_320px] gap-6">
          {/* Left program + nav panel */}
          <aside className="space-y-4">
            <div className="mb-2">
              <label className="text-sm text-muted-foreground">
                Chương trình bạn chọn
              </label>
              <div className="mt-2">
                <select className="w-full rounded-md border px-3 py-2 bg-white">
                  <option>IELTS</option>
                  <option>General English</option>
                </select>
              </div>
            </div>

            <nav className="flex flex-col gap-2 bg-white p-3 rounded-lg shadow-sm">
              <Button variant="ghost" className="justify-start text-sm">
                🏠 Tổng quan
              </Button>
              <Button variant="ghost" className="justify-start text-sm">
                🗺️ Study plan
              </Button>
              <Button variant="ghost" className="justify-start text-sm">
                📚 My courses
              </Button>
              <Button variant="ghost" className="justify-start text-sm">
                📝 Test Practice
              </Button>
              <Button variant="ghost" className="justify-start text-sm">
                👤 Learning Profile
              </Button>
            </nav>
          </aside>

          {/* Center content */}
          <main>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                    {userName.charAt(0)}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">Xin chào, {userName}</h1>
                    <p className="text-sm text-muted-foreground">
                      Cùng Prep tiến bộ mỗi ngày nào!
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <Button variant="default">Xem giới thiệu</Button>
              </div>
            </div>

            <div className="mt-6 grid gap-6">
              {/* Study Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Study Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Bạn chưa sở hữu khóa học nào. Cùng Prep khám phá lộ trình
                      học phù hợp với bạn nhé!
                    </p>
                    <div className="mt-3">
                      <Button variant="default">Khám phá ngay</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* My courses */}
              <Card>
                <CardHeader>
                  <CardTitle>Khoá học của tôi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      Bạn chưa sở hữu khóa học nào cho chương trình này. Hãy để
                      Prep giúp bạn lựa chọn khóa học phù hợp với trình độ và
                      mục tiêu của bạn nhé!
                    </p>
                    <div className="mt-3">
                      <Button variant="default">Chọn khóa học →</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Test Practice cards (carousel-like) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">Test Practice</h3>
                  <a className="text-sm text-muted-foreground">Xem tất cả</a>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                  {demoCourses.map((c) => (
                    <div key={c.id} className="min-w-[180px]">
                      <div className="bg-white rounded-lg shadow p-3">
                        <div className="h-36 bg-gradient-to-b from-blue-400 to-blue-600 rounded-md mb-3 flex items-end p-3 text-white font-semibold">
                          {c.title}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {c.lessons} Đề
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            {c.progress}%
                          </div>
                          <Button variant="ghost" size="sm">
                            {c.progress > 0 ? "Tiếp tục" : "Bắt đầu"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* Right learning profile */}
          <aside>
            <Card>
              <CardHeader>
                <CardTitle>Learning Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Your IELTS Level
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm">Entry</div>
                        <div className="text-sm">Predicted</div>
                        <div className="text-sm">Target</div>
                      </div>
                      <div className="mt-3 h-24 bg-slate-50 rounded-md flex items-center justify-center text-muted-foreground">
                        (chart)
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold mb-2">
                      Learning summary
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>
                        ⏱️ Tổng thời lượng:{" "}
                        <span className="float-right text-foreground">
                          0 min
                        </span>
                      </li>
                      <li>
                        🏆 Tổng số cúp đã đạt:{" "}
                        <span className="float-right text-foreground">0</span>
                      </li>
                      <li>
                        🧾 Tổng số bài test:{" "}
                        <span className="float-right text-foreground">0</span>
                      </li>
                      <li>
                        📚 Tổng số bài học:{" "}
                        <span className="float-right text-foreground">0</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex-1 text-sm text-muted-foreground">
                  Học tập là một kho báu sẽ theo chủ nhân đến mọi nơi
                </div>
                <div className="pl-3">🤖</div>
              </CardFooter>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
