# 🎓 Lingo Lift - AI-Powered IELTS Writing Practice Platform

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.14-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> An intelligent web application for IELTS Writing practice featuring AI-powered automatic essay grading with detailed feedback on all 4 IELTS assessment criteria.

![Lingo Lift Banner](https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=Lingo+Lift+-+IELTS+Writing+Assistant)

## ✨ Features

### 📝 **IELTS Writing Practice**
- **Task 1**: Academic charts, graphs, tables, processes, and letters
- **Task 2**: Opinion essays, discussion essays, problem-solution essays
- Real-time word counter and timer
- Auto-save draft functionality
- Dark mode support

### 🤖 **AI-Powered Grading**
- Automatic essay evaluation using **Claude Sonnet 4.5**
- Detailed feedback on 4 IELTS criteria:
  - ✅ Task Achievement / Task Response
  - ✅ Coherence & Cohesion
  - ✅ Lexical Resource
  - ✅ Grammatical Range & Accuracy
- Estimated IELTS band score (0-9)
- Personalized improvement recommendations

### 🎯 **Smart Topic Selection**
- 100+ authentic IELTS topics
- Multiple difficulty levels (Easy, Medium, Hard)
- Topic recommendations based on user level
- Random topic generator for quick practice
- Filter by category, task type, and difficulty

### 📊 **Progress Tracking**
- Essay history with status tracking (Draft, Submitted, Graded)
- Performance analytics and band score trends
- Time spent tracking
- Topic completion statistics

### 🎨 **Modern UI/UX**
- Responsive design (mobile, tablet, desktop)
- Smooth animations with Framer Motion
- Beautiful gradient themes
- Intuitive navigation
- Accessible components

## 🏗️ Tech Stack

### **Frontend**
- **Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7
- **Styling**: TailwindCSS 4.1.14
- **UI Components**: Radix UI, Lucide Icons
- **Animations**: Framer Motion 12.23
- **State Management**: Zustand 5.0.8
- **Routing**: React Router DOM 7.9.4
- **HTTP Client**: Axios 1.12.2
- **Validation**: Zod 4.1.12
- **Notifications**: Sonner 2.0.7

### **Backend**
- Node.js + Express + TypeScript
- MongoDB with Mongoose
- JWT Authentication
- RESTful API
- AI Integration (Claude Sonnet 4.5)

## 📁 Project Structure

```
Lingo_Lift/
├── frontend/
│   ├── src/
│   │   ├── api/              # API client & endpoints
│   │   │   ├── client.ts     # Axios instance with interceptors
│   │   │   ├── auth.ts       # Authentication API
│   │   │   └── lessons.ts    # Lessons API
│   │   │
│   │   ├── components/       # React components
│   │   │   ├── essays/       # Essay editor & feedback
│   │   │   ├── writing/      # Writing practice UI
│   │   │   ├── auth/         # Login & register forms
│   │   │   ├── common/       # Shared components
│   │   │   └── ui/           # Shadcn UI components
│   │   │
│   │   ├── pages/            # Page components
│   │   │   ├── Task1Page.tsx
│   │   │   ├── Task2Page.tsx
│   │   │   ├── Task1WritingPage.tsx
│   │   │   └── ...
│   │   │
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── useTask1Topics.ts
│   │   │   ├── useTask2Topics.ts
│   │   │   ├── useTask1Essays.ts
│   │   │   └── useTask2Essays.ts
│   │   │
│   │   ├── services/         # Business logic & API calls
│   │   │   ├── task1Topic.service.ts
│   │   │   ├── task2Topic.service.ts
│   │   │   ├── task1Essay.service.ts
│   │   │   └── task2Essay.service.ts
│   │   │
│   │   ├── types/            # TypeScript type definitions
│   │   │   ├── task1-topic.ts
│   │   │   ├── task2-topic.ts
│   │   │   ├── task1-essay.ts
│   │   │   └── task2-essay.ts
│   │   │
│   │   ├── context/          # React Context providers
│   │   │   ├── AuthContext.tsx
│   │   │   └── useAuth.ts
│   │   │
│   │   ├── stores/           # Zustand state stores
│   │   ├── constants/        # App constants
│   │   ├── lib/              # Utilities
│   │   └── routes/           # Route configuration
│   │
│   ├── public/               # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
└── backend/                  # Backend API server
    ├── src/
    │   ├── config/           # Database & env config
    │   ├── models/           # MongoDB schemas
    │   ├── routes/           # API routes
    │   ├── middleware/       # Auth & error handling
    │   ├── controllers/      # Request handlers
    │   └── server.ts         # Express app entry
    │
    ├── .env                  # Environment variables
    └── package.json
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** >= 18.x
- **npm** or **pnpm** or **yarn**
- **MongoDB** (local or cloud instance)

### Installation

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/lingo-lift.git
cd lingo-lift
```

#### 2. Install frontend dependencies
```bash
cd frontend
npm install
```

#### 3. Install backend dependencies
```bash
cd ../backend
npm install
```

#### 4. Configure environment variables

**Frontend** (`frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend** (`backend/.env`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/lingolift
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
ANTHROPIC_API_KEY=your_claude_api_key_here
NODE_ENV=development
```

### Running the Application

#### Development Mode

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
# Frontend runs at http://localhost:5173
```

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
# Backend runs at http://localhost:5000
```

#### Production Build

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

**Backend:**
```bash
cd backend
npm run build
npm start
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### Task 1 Topics
- `GET /api/task1-topics` - Get all Task 1 topics
- `GET /api/task1-topics/:id` - Get topic detail
- `GET /api/task1-topics/recommended` - Get recommended topics
- `GET /api/task1-topics/random` - Get random topic

### Task 1 Essays
- `POST /api/task1-essays` - Submit new essay
- `GET /api/task1-essays` - Get user's essays
- `GET /api/task1-essays/:id` - Get essay detail
- `GET /api/task1-essays/by-topic/:topicId` - Get essays by topic

### Task 2 Topics
- `GET /api/task2-topics` - Get all Task 2 topics
- `GET /api/task2-topics/:id` - Get topic detail
- `GET /api/task2-topics/recommended` - Get recommended topics
- `GET /api/task2-topics/random` - Get random topic

### Task 2 Essays
- `POST /api/task2-essays` - Submit new essay
- `GET /api/task2-essays` - Get user's essays
- `GET /api/task2-essays/:id` - Get essay detail
- `GET /api/task2-essays/by-topic/:topicId` - Get essays by topic

## 🎯 Key Features Implementation

### Essay Editor
The essay editor component provides a full-screen writing environment with:
- Real-time word count validation
- Timer with pause/resume functionality
- Topic information display with images (for Task 1)
- Auto-save drafts
- Submit for AI grading
- Display detailed feedback after grading

**Usage Example:**
```tsx
import { Task1EssayEditor } from '@/components/essays/EssayEditor';

function WritingPage() {
  return (
    <Task1EssayEditor
      topic={selectedTopic}
      onClose={() => navigate(-1)}
      onSaveDraft={(content, wordCount, timeSpent) => {
        // Handle draft save
      }}
      onSubmit={(content, wordCount, timeSpent) => {
        // Handle essay submission
      }}
    />
  );
}
```

### AI Feedback Panel
Displays comprehensive feedback with:
- Overall band score (0-9)
- Individual criterion scores
- Strengths and areas for improvement
- Personalized recommendations
- Grading metadata (AI model, processing time)

### Custom Hooks
Smart React hooks for data fetching and state management:

```typescript
// Get Task 1 topics with filters
const { data: topics, loading, error, refetch } = useTask1Topics({
  taskType: 'Academic',
  category: 'Education',
  difficulty: 'Medium'
});

// Submit Task 1 essay
const { mutate: createEssay, isLoading } = useCreateTask1Essay();
createEssay({
  task1TopicId: 123,
  essayText: content,
  wordCount: 180,
  timeTaken: 1200
});
```

## 🎨 UI Components

Built with **Radix UI** primitives and styled with **TailwindCSS**:

- ✅ Button with variants
- ✅ Card with gradient borders
- ✅ Dialog/Modal
- ✅ Popover
- ✅ Command Menu (Search)
- ✅ Badge
- ✅ Toast notifications
- ✅ Form inputs

## 🔐 Authentication Flow

1. User registers/logs in
2. Backend issues JWT access token
3. Frontend stores token in memory (Zustand)
4. Axios interceptor attaches token to requests
5. Protected routes require valid token
6. Auto-logout on 401 Unauthorized

## 📊 State Management

**Zustand** stores for global state:
- `useAuthStore` - User authentication state
- Form state managed locally with React hooks
- Server state cached with custom hooks

## 🌙 Dark Mode

Automatic dark mode support using:
- TailwindCSS dark mode utilities
- CSS variables for dynamic theming
- Persistent theme preference

## 🧪 Testing

```bash
# Run frontend tests
cd frontend
npm run test

# Run backend tests
cd backend
npm run test
```

## 📈 Performance Optimizations

- ⚡ Vite for instant HMR
- 🎯 Code splitting with React.lazy
- 📦 Optimized bundle size
- 🖼️ Image lazy loading
- 🔄 Request debouncing
- 💾 Response caching

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- IELTS official assessment criteria
- Claude AI by Anthropic
- React and TypeScript communities
- Radix UI & TailwindCSS teams

## 📞 Support

For support, email support@lingolift.com or join our Discord community.

## 🗺️ Roadmap

- [ ] Speaking practice module
- [ ] Reading comprehension tests
- [ ] Listening exercises
- [ ] Vocabulary builder
- [ ] Grammar checker integration
- [ ] Mobile app (React Native)
- [ ] Teacher dashboard
- [ ] Group study rooms
- [ ] Gamification features

---

<div align="center">

**[Website](https://lingolift.com)** • **[Documentation](https://docs.lingolift.com)** • **[Discord](https://discord.gg/lingolift)** • **[Twitter](https://twitter.com/lingolift)**

Made with ❤️ for IELTS learners worldwide

</div>
