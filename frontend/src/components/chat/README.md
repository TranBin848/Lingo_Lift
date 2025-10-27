# 💬 Floating AI Chatbox

## Tính năng

- **Floating button** ở góc dưới phải màn hình
- Hoạt động trên **tất cả các trang** (trừ Login/Register)
- Design giống **Dialogflow/Intercom**
- Streaming responses từ Gemini AI
- Typing indicator với animation
- Responsive design

## Components

### 1. FloatingChatButton.tsx

- Nút tròn floating với icon chat
- Badge "AI" có animation pulse
- Click để mở/đóng chatbox

### 2. ChatWindow.tsx

- Popup window 380x600px
- Header với avatar AI và status online
- Messages scrollable
- Chat input với Enter to send
- Typing indicator khi AI đang trả lời

## Cách hoạt động

1. **FloatingChatButton** được mount trong `App.tsx` cho tất cả main routes
2. Khi click button → `ChatWindow` xuất hiện với slide-in animation
3. User gửi message → streaming response từ backend `/api/ai/chat/stream`
4. Typing dots hiển thị trong khi AI đang trả lời
5. Click X trên header để đóng chatbox

## Styling

- Tailwind CSS với custom animations
- Gradient blue-purple theme
- Shadow và hover effects
- Smooth transitions

## Future improvements

- [ ] Lưu chat history vào localStorage
- [ ] Sound notification
- [ ] Minimize button (minimize to taskbar-like)
- [ ] Multi-language support
- [ ] Quick reply suggestions
