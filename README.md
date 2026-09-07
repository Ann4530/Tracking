# 28-Day Personal Sprint Tracker

A powerful personal operating system for executing an intensive 28-day sprint with 6 parallel workstreams, **draggable daily schedules**, and **AI-powered optimization**.

## 🚀 Tính năng chính

✅ **6 workstreams song song**: Software Engineering, AI, IELTS, App Launch, Personal Channel, Job Pipeline  
✅ **Bảng thời gian cụ thể (Schedule View)**: Xem lịch từng ngày với thời gian bắt đầu/kết thúc  
✅ **Drag-and-drop sắp xếp**: Di chuyển task để optimize thứ tự theo năng lượng  
✅ **Gemini AI Assistant**: Đề xuất tối ưu kế hoạch (cần API key)  
✅ **28 ngày × 7 nhóm**: 196 task được seeded riêng biệt  
✅ **Tracking thực tế**: Logged minutes, actual outcomes, evidence notes  
✅ **Động tính**: Tự động tính điểm số, trạng thái, tiến độ  
✅ **Lưu trữ cục bộ**: localStorage persistence (không cần backend)  

---

## 📋 Các View chính

### 1. **Dashboard** (Tổng quan)
- SPRINT PROGRESS: % hoàn thành toàn bộ sprint
- TODAY'S SCORE: Điểm hôm nay (0–100)
- 6 North Star Goals (SE/AI/IELTS/APP/CHANNEL/JOB)
- Quick links đến các view khác

### 2. **Today** (Công việc hôm nay)
- 7 task hôm nay (6 track + 1 Daily Review)
- Log actual minutes + evidence
- Quick input form

### 3. **Schedule** ⭐ (MỚI - Thời gian biểu cụ thể)
- Bảng thời gian chi tiết: TIME | TASK | PRIORITY | DURATION | ✓
- Thời gian bắt đầu/kết thúc cụ thể (VD: 06:30—08:40)
- **AI Suggestions** (nếu setup Gemini API key):
  - DURATION: Cảnh báo task quá dài
  - OVERLOAD: Tổng thời gian vượt quá công suất
  - PRIORITY: P0 task nên vào buổi sáng
- **Drag-and-drop**: Kéo task để sắp xếp lại thứ tự
- Navigation: ‹ › để chuyển ngày
- Controls: 🤖 AI Optimize | ↻ Reset schedule
- Total duration: Tính tổng giờ các task
- Tips: Hướng dẫn sử dụng drag-and-drop

### 4. **Calendar** (Lịch 28 ngày)
- Grid calendar hiển thị 28 ngày
- Mỗi ngày có thanh progress 6 track
- Click ngày để xem chi tiết (chuyển sang Today view)
- Roadmap: Liệt kê tất cả 28 ngày với topic

### 5. **Workstream Pages** (SE / AI / IELTS / App / Channel / Jobs)
- KPI Outcome (Actual vs Target)
- Progress % (ON TRACK / AHEAD / AT RISK / BEHIND)
- Input Pace Chart (28 cột = 28 ngày)
- Edit outcomes real-time
- All 28 Records table

### 6. **Analytics**
- Outcome progress tổng hợp
- App Users / Channel Subs / Job Interviews KPIs
- Daily score trend (28 ngày)
- Funnel health (Job pipeline)

### 7. **Reviews**
- Weekly review form (tuần hiện tại)
- Daily review log (tất cả 28 ngày)

### 8. **Settings** ⭐ (MỚI)
- Sprint window (start date → end date)
- Daily schedule (wake/sleep time, work block duration)
- Live outcome inputs
- Targets & scoring (điều chỉnh được)
- **Gemini AI Assistant** (MỚI):
  - Nhập API key
  - Lưu để dùng AI Optimize trên Schedule view

---

## 🎯 Hướng dẫn sử dụng

### Cách 1: Chạy locally với Python

```bash
cd /path/to/Tracking
python3 -m http.server 4173
```

Mở browser: `http://localhost:4173`

Dừng: `Ctrl + C`

### Cách 2: Với Node.js

```bash
npx serve -l 4173
```

### Cách 3: Deploy online

- **Vercel**: `vercel deploy`
- **Netlify**: Drag & drop folder hoặc `netlify deploy`
- **GitHub Pages**: Enable từ repository settings

---

## 📖 Sử dụng từng tính năng

### Schedule View (Thời gian biểu) - MỚI

**Để vào**: Click **⏱ Schedule** trên sidebar

**Các thành phần**:

1. **Navigation**:
   - ‹ › buttons: Chuyển qua các ngày
   - Hiển thị ngày hiện tại

2. **Schedule Table**:
   - TIME: Thời gian bắt đầu—kết thúc (VD: 06:30—08:40)
   - TASK: Tên task + OUTPUT
   - PRIORITY: P0 / P1 / P2
   - DURATION: Phút
   - ✓: Checkbox đánh dấu hoàn thành

3. **AI Suggestions** (nếu API key được set):
   - Automatic analysis nếu schedule có vấn đề
   - 3 loại suggestion: DURATION, OVERLOAD, PRIORITY
   - Bấm **🤖 AI Optimize** để refresh

4. **Drag-and-drop**:
   - Kéo task để reorder
   - Thời gian tự động tính lại
   - Bấm 💾 để lưu (tự động)

5. **Reset**:
   - Bấm ↻ Reset schedule để quay về thứ tự mặc định

6. **Shortcuts**:
   - Tick task để đánh dấu hoàn thành
   - Xem tổng giờ ("Total time on tasks")

**Tips**:
- P0 tasks vào buổi sáng (năng lượng tốt nhất)
- Long tasks nên split với breaks
- Mỗi ngày ~12h work time (06:30—23:30 với 30min breaks)

---

### AI Optimize (Tối ưu kế hoạch với Gemini)

**Cần setup trước**:

1. Lấy Gemini API key từ [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Vào **Settings** → **Gemini AI Assistant**
3. Paste API key vào **GEMINI API KEY** field
4. Bấm **Save Gemini key**

**Sử dụng**:

1. Mở Schedule view cho ngày bất kỳ
2. Bấm **🤖 AI Optimize** button
3. AI sẽ:
   - Analyze schedule hiện tại
   - Suggest cải thiện (reorder, split tasks, etc.)
   - Hiển thị trong "AI Suggestions" section

**Ví dụ output**:
```
DURATION: Task "... is 240 minutes - consider breaking into smaller chunks"
  Solution: Split into multiple 90-minute blocks
  
OVERLOAD: Total duration (22h 5m) exceeds available time
  Solution: Remove or defer non-critical tasks
```

---

### Các tính năng khác

**Today View**:
- Tick checkbox để đánh dấu task hoàn thành
- Nhập "Actual min" để log thời gian thực tế
- Thêm "Evidence / note" (link output, notes, etc.)
- Điền Daily Review (energy, focus, win, change)

**Settings**:
- Chỉnh wake/sleep time → tự động tính giờ ngủ
- Adjust work block duration (default 90min)
- Update targets + scoring weights
- Gemini API key setup

**Calendar**:
- Click một ngày để view chi tiết
- Xem progress 6 track per day
- Roadmap: Liệt kê tất cả topic 28 ngày

---

## 💾 Lưu trữ dữ liệu

Tất cả dữ liệu lưu trong **localStorage** của browser:

```javascript
{
  start: "2026-09-07",
  selectedDay: 1,
  completed: { "1-se": true, "1-ai": false, ... },
  minutes: { "1-se": 120, "1-ai": 90, ... },
  evidence: { "1-se": "https://...", ... },
  schedule: { 
    1: [ { id: "1-se", title: "...", startTime: "06:30", ... }, ... ],
    2: [ ... ],
    ...
  },
  users: 18, subs: 146, interviews: 0, ... (outcomes)
  reviews: { daily: {}, weekly: {} },
  settings: { wake: "06:30", sleep: "23:30", ... },
  targets: { se: 60, ai: 60, ... },
  weights: { se: 15, ai: 15, ... },
  ieltsBands: { listening: 0, ... },
  geminiKey: "AIzaSy..." // NEVER commit this!
}
```

**Export dữ liệu**:
```javascript
// Console (F12):
copy(JSON.stringify(JSON.parse(localStorage.getItem('sprint28')), null, 2))
// Paste vào file .json để backup
```

**Import dữ liệu**:
```javascript
// Console:
localStorage.setItem('sprint28', JSON.stringify({...data...}))
// Reload trang
```

**Xóa tất cả**:
```javascript
localStorage.clear()
// ⚠️ Cảnh báo: Mất hết dữ liệu!
```

---

## ⚙️ Công thức & Quy tắc

### Điểm số hàng ngày (Daily Score)

```
Score = Weighted sum of 6 tracks + Review bonus (5 points)

SE:       15 points  (logged min / 60h)
AI:       15 points  (logged min / 60h)
IELTS:    25 points  (logged min / 112h)
APP:      15 points  (users / 100)
CHANNEL:  15 points  (subs / 1000)
JOB:      10 points  (interviews / 2)
REVIEW:    5 points  (if energy+focus filled)

Max: 100 points
```

### Trạng thái (Status)

- **AHEAD**: Tiến độ ≥ expected + 10%
- **ON TRACK**: Tiến độ ≥ expected - 10%
- **AT RISK**: Tiến độ ≥ expected - 25%
- **BEHIND**: < expected - 25%

### Thời gian biểu tự động

- **Wake time**: 06:30 (có thể chỉnh)
- **Work block**: 90 phút mặc định
- **Break**: 30 phút giữa các task
- **Sleep time**: 23:30 (7h ngủ)
- **Tổng**: ~12h work time/day

### Priority mapping

```
Day 1 & 22–28:  P0 (highest priority)
Day 2–6:        P1 (medium)
Day 7–21:       P2 (lower)
```

---

## 🐛 Troubleshooting

### Dữ liệu bị mất
- localStorage chỉ lưu trong 1 browser/device
- **Giải pháp**: Export dữ liệu thường xuyên (xem mục "Lưu trữ dữ liệu")

### Schedule không hiển thị thời gian
- Kiểm tra Settings: Wake time, Sleep time
- Default: 06:30 → 23:30
- Bấm "Reset schedule" để regenerate

### AI Optimize không hoạt động
- API key chưa set → Vào Settings, add key
- API key không hợp lệ → Check Google AI Studio
- Rate limiting → Đợi vài phút, thử lại
- Network error → Check internet connection

### Không thể drag-and-drop
- Chắc chắn bạn đang ở Schedule view
- Drag từ task row (không phải header)
- Thả vào task row khác để reorder

### Scores không update
- Kiểm tra có tick task không
- Kiểm tra có log minutes không
- Bấm Save review để buộc update

---

## 📱 Responsive

- **Desktop**: Full sidebar + content (tối ưu)
- **Tablet**: Sidebar ẩn/icon-only
- **Mobile**: Vertical layout, bottom tab bar (planned)

---

## 🔐 Bảo mật

⚠️ **Gemini API Key**:
- NEVER commit `.git` 
- Chỉ lưu trong localStorage (client-side, browser only)
- Nếu leak: Invalidate key từ Google AI Studio

**Recommendations**:
- Use environment variables nếu deploy (future enhancement)
- Rotate keys định kỳ
- Monitor API usage trên Google Cloud Console

---

## 📞 Support & Debugging

**Mở DevTools** (F12):

```javascript
// Xem dữ liệu:
JSON.parse(localStorage.getItem('sprint28'))

// Xem schedule ngày 1:
JSON.parse(localStorage.getItem('sprint28')).schedule[1]

// Reset:
localStorage.clear()
// Reload trang
```

**Check console** cho errors:
- Mở DevTools → Console tab
- Tìm red errors
- Screenshot + report

---

## 📦 Files

```
Tracking/
├── index.html              (DOM structure)
├── app.js                  (Main logic + rendering + events)
├── schedule-engine.js      (Schedule generation + time calculation)
├── gemini-ai.js            (Gemini API integration)
├── styles.css              (Dark theme + responsive)
└── README.md               (Documentation)
```

---

## 🚀 Tiếp theo (Future)

- [ ] Mobile app version
- [ ] Supabase integration (cloud sync)
- [ ] Team collaboration features
- [ ] Weekly review automation
- [ ] Multiple sprint management
- [ ] Export PDF reports
- [ ] Dark/Light theme toggle

---

**Tạo ngày**: 2026-09-06  
**Phiên bản**: 2.0 (Schedule + AI)  
**Co-authored by**: Copilot

