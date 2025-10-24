# Daily English - Backend API

Backend API cho ứng dụng học tiếng Anh Daily English, xây dựng với Node.js, Express, TypeScript và MongoDB.

## 🚀 Công nghệ sử dụng

- **Node.js** + **Express** - Web framework
- **TypeScript** - Type safety
- **MongoDB** + **Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📁 Cấu trúc thư mục

```
backend/
├── src/
│   ├── config/           # Database & app configuration
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Helper functions
│   └── server.ts         # Entry point
├── .env                  # Environment variables
├── package.json
└── tsconfig.json
```

## ⚙️ Setup

### 1. Cài đặt dependencies

```bash
cd backend
npm install
```

### 2. Cấu hình môi trường

Copy file `.env.example` thành `.env`:

```bash
cp .env.example .env
```

Cập nhật các biến môi trường trong `.env`:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dailyenglish
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### 3. Khởi động MongoDB

Đảm bảo MongoDB đang chạy trên máy:

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

### 4. Chạy server

**Development mode (với hot reload):**

```bash
npm run dev
```

**Production build:**

```bash
npm run build
npm start
```

## 📡 API Endpoints

### Authentication (`/api/auth`)

- `POST /auth/register` - Đăng ký user mới
- `POST /auth/login` - Đăng nhập
- `GET /auth/me` - Lấy thông tin user hiện tại (cần token)
- `POST /auth/logout` - Đăng xuất

### Lessons (`/api/lessons`)

- `GET /lessons` - Lấy tất cả lessons grouped by skill
- `GET /lessons/:skill` - Lấy lessons theo skill (listening/speaking/reading/writing)
- `GET /lessons/detail/:id` - Lấy chi tiết 1 lesson
- `POST /lessons/:id/complete` - Submit kết quả hoàn thành lesson

## 🔐 Authentication

API sử dụng JWT token. Sau khi login, client cần gửi token trong header:

```
Authorization: Bearer <token>
```

## 📝 Models

### User

- name, email, password
- avatar (optional)
- timestamps

### Lesson

- skill: listening | speaking | reading | writing
- title, prompt, content, passage
- options, answerIndex (for reading)
- keywords (for writing)
- level: beginner | intermediate | advanced

### Progress

- userId, lessonId
- completed, score
- completedAt

## 🛠️ Scripts

```bash
npm run dev      # Run development server with hot reload
npm run build    # Build TypeScript to JavaScript
npm start        # Run production server
npm run lint     # Run ESLint
```

## 📦 Dependencies

```json
{
  "express": "Web framework",
  "mongoose": "MongoDB ODM",
  "jsonwebtoken": "JWT authentication",
  "bcryptjs": "Password hashing",
  "cors": "CORS middleware",
  "dotenv": "Environment variables"
}
```

## 🔄 Development Workflow

1. Tạo/sửa models trong `src/models/`
2. Tạo routes trong `src/routes/`
3. Tạo controllers trong `src/controllers/` (nếu cần)
4. Thêm middleware trong `src/middleware/` (nếu cần)
5. Test API với Postman/Thunder Client
6. Commit changes

## 🚧 Todo

- [ ] Thêm validation với express-validator
- [ ] Implement rate limiting
- [ ] Add API documentation (Swagger)
- [ ] Add unit tests
- [ ] Add seed data scripts

---

Made with ❤️ for Daily English learners
