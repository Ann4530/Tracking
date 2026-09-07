# 🚀 SETUP & LAUNCH GUIDE

## What's New (v2.0 - Schedule + AI)

✅ **Schedule View** (⏱ button)
- Bảng thời gian cụ thể: TIME | TASK | PRIORITY | DURATION | ✓
- Hiển thị thời gian bắt đầu/kết thúc từng task (VD: 06:30—08:40)
- **Drag-and-drop** để sắp xếp lại thứ tự task
- Navigation giữa các ngày (‹ › buttons)

✅ **Gemini AI Integration** (🤖 AI Optimize button)
- Cần setup API key 1 lần trong Settings
- Click 🤖 AI Optimize để get suggestions
- Auto-detect: quá dài task, overload, priority issues

✅ **CSS cho Schedule Table**
- Màu sắc priority badges (P0 red, P1 blue, P2 green)
- Dark theme consistent với app
- Responsive layout

---

## 🚀 Chạy Ứng dụng

### Lần đầu tiên

```bash
cd /home/ann/Projects/Tracking
python3 -m http.server 4173
```

Mở browser: **http://localhost:4173**

### Dừng server
```bash
# Ctrl + C
```

---

## 📋 Setup Gemini AI (Optional nhưng Recommended)

### Bước 1: Lấy API Key
1. Mở https://aistudio.google.com/app/apikey
2. Click "Create API Key"
3. Copy key (bắt đầu với `AIzaSy...`)

### Bước 2: Setup trong app
1. Vào **Settings** (gear icon ⚙)
2. Kéo xuống → **Gemini AI Assistant**
3. Paste API key vào field (password)
4. Click **Save Gemini key**

### Bước 3: Sử dụng
1. Mở **Schedule** view (⏱)
2. Click **🤖 AI Optimize** button
3. Xem suggestions (💡 AI Suggestions section)

---

## 📖 Quick Start Workflow

### Sáng (Bắt đầu ngày)
```
1. Mở app → Dashboard
2. Click ⏱ Schedule
3. Xem lịch ngày hôm nay (06:30—22:05)
4. (Optional) Click 🤖 AI Optimize để get suggestions
5. (Optional) Drag task để adjust order
6. Click Today (Open today button) để bắt đầu
```

### Trong ngày (Logging)
```
1. Ở Today view (◷)
2. Mỗi khi hoàn thành task:
   - Tick checkbox ☑
   - Nhập "Actual min" (phút thực tế)
   - Thêm "Evidence / note" (link, notes)
3. Điều này auto-save vào localStorage
```

### Cuối ngày (Review)
```
1. Ở Today view (◷)
2. Kéo xuống → Daily Review section
3. Điền:
   - ENERGY: 1-10
   - FOCUS: 1-10
   - BIGGEST WIN: Ghi lại thành tích
   - WHAT SHOULD CHANGE TOMORROW?: Note improvements
4. Click Save review
5. Score tự động update (max 100)
```

### Cuối tuần (Weekly Review)
```
1. Mở Reviews (✦)
2. Tự động show tuần hiện tại
3. Xem weekly score avg
4. Điền:
   - WHAT IS WORKING?: Ghi điều đang tốt
   - WHICH GOAL IS BEHIND?: Identify risks
   - WHAT WILL CHANGE NEXT WEEK?: Actions
5. Click Save week review
```

---

## 🎯 Các Views chính

| View | Button | Chức năng | Dữ liệu |
|------|--------|----------|--------|
| **Dashboard** | ▦ | Tổng quan sprint | Overall %, Score hôm nay, Goals |
| **Today** | ◷ | Công việc hôm nay | 7 tasks + logging + daily review |
| **Schedule** ⭐ | ⏱ | Bảng thời gian + AI | Timeline + suggestions + drag-drop |
| **Calendar** | ▣ | 28 ngày lịch | Progress per day + grid view |
| **SE/AI/IELTS/App/Channel/Job** | Track icons | Workstream detail | KPI + progress + 28 records |
| **Analytics** | ◒ | Tổng hợp | Trends + KPIs + funnel |
| **Reviews** | ✦ | Đánh giá | Weekly + daily log |
| **Settings** | ⚙ | Cấu hình | Schedule + targets + Gemini key |

---

## 🔧 Settings - Những gì có thể tùy chỉnh

| Setting | Default | Ý nghĩa |
|---------|---------|---------|
| START DATE | 2026-09-07 | Ngày bắt đầu sprint |
| WAKE TIME | 06:30 | Giờ dậy |
| SLEEP TIME | 23:30 | Giờ ngủ |
| WORK BLOCK | 90 min | Thời lượng task (tối đa) |
| BREAK | 30 min | Giữa các task |
| SE/AI/IELTS TARGET | 60/60/112 hrs | Target hours |
| APP/CHANNEL/JOB TARGET | 100/1000/2 | Target outcomes |
| SE/AI/IELTS WEIGHT | 15/15/25 | Scoring weight |
| APP/CHANNEL/JOB WEIGHT | 15/15/10 | Scoring weight |
| GEMINI API KEY | (empty) | AI optimization |

---

## 📊 Scoring Formula

### Daily Score (0–100)

```
Score = (SE_score × 15 + AI_score × 15 + IELTS_score × 25 + 
         APP_score × 15 + CHANNEL_score × 15 + JOB_score × 10) / 100 + Review_bonus

SE/AI/IELTS: logged minutes / target hours * 100
APP/CHANNEL/JOB: actual outcome / target * 100
Review bonus: (energy + focus) / 20 * 5 (if filled)

Max: 100 points
```

### Status Levels

```
AHEAD:    ≥ expected + 10%
ON TRACK: ≥ expected - 10%
AT RISK:  ≥ expected - 25%
BEHIND:   < expected - 25%
```

---

## 💾 Dữ liệu & Backup

### Dữ liệu lưu ở đâu
- **localStorage** của browser (client-side only)
- Lưu tên: `sprint28`
- Tự động save mỗi khi:
  - Tick task
  - Log minutes
  - Add note
  - Save review
  - Change settings

### Export dữ liệu (Backup)

```javascript
// F12 → Console → Paste:

// Full data
copy(JSON.stringify(JSON.parse(localStorage.getItem('sprint28')), null, 2))
// Ctrl+V vào file .json để save

// Chỉ schedule
copy(JSON.stringify(JSON.parse(localStorage.getItem('sprint28')).schedule, null, 2))

// Chỉ reviews
copy(JSON.stringify(JSON.parse(localStorage.getItem('sprint28')).reviews, null, 2))
```

### Import dữ liệu (Restore)

```javascript
// F12 → Console → Paste (sau khi sửa {data}):

const data = {...paste your JSON here...}
localStorage.setItem('sprint28', JSON.stringify(data))
// Reload trang (F5)
```

### Reset all

```javascript
// ⚠️ Cảnh báo: Mất tất cả dữ liệu!
localStorage.clear()
// Reload trang
```

---

## 🐛 Troubleshooting

### Trang không load
- F12 → Console → Có error không?
- Kiểm tra port 4173 không bị dùng
- Thử port khác: `python3 -m http.server 5000`

### Schedule không hiển thị thời gian
- Settings → Check WAKE TIME, SLEEP TIME
- Default: 06:30 → 23:30
- Schedule → Click ↻ Reset schedule

### AI Optimize không work
- Settings → Paste Gemini API key
- Check key hợp lệ: https://aistudio.google.com/app/apikey
- F12 → Console → Xem error
- Có thể hết quota → Check https://console.cloud.google.com

### Drag-and-drop bị lag
- Refresh trang (F5)
- Kiểm tra browser support (Chrome/Firefox recommended)
- Không drop vào header, chỉ drop vào task row

### Điểm số không tăng
- Kiểm tra có tick task không ☑
- Kiểm tra có log minutes không
- Phải bấm "Save review" mới count

### Dữ liệu mất
- Xóa browser cache → mất hết
- **Giải pháp**: Export dữ liệu thường xuyên (2-3 lần/tuần)
- Backup .json file

---

## 🌐 Deploy Online

### Vercel (Recommended)

```bash
# Nếu đã push GitHub:
vercel deploy

# Hoặc drag-and-drop folder
# → vercel.com → connect repo
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy

# Hoặc drag-and-drop folder
# → netlify.com
```

### GitHub Pages

```bash
# 1. Push lên GitHub
git add .
git commit -m "Deploy"
git push

# 2. GitHub → Settings → Pages
# 3. Source = main branch
# 4. URL: https://Ann4530.github.io/Tracking
```

---

## 🔐 Security Notes

⚠️ **Gemini API Key**:
- Lưu trong localStorage (client-side)
- NEVER commit `.git` (update .gitignore)
- Nếu leak: Invalidate từ Google Cloud Console
- Use environment variables nếu deploy production

```bash
# .gitignore (add if deploying)
.env
.env.local
```

---

## 📁 Files Explained

```
/Tracking/
├── index.html           (55 lines) - DOM structure
├── app.js               (249 lines) - Main logic + rendering
├── schedule-engine.js   (151 lines) - Schedule generation + time calc
├── gemini-ai.js         (186 lines) - Gemini API integration
├── styles.css           (19KB) - Dark theme + responsive
├── README.md            (392 lines) - Full documentation
├── FEATURES.md          (258 lines) - Quick reference
└── SETUP.md             (this file) - Getting started
```

---

## ✅ Checklist - Trước khi bắt đầu

- [ ] Python 3 installed: `python3 --version`
- [ ] cd vào folder: `cd /home/ann/Projects/Tracking`
- [ ] Start server: `python3 -m http.server 4173`
- [ ] Open browser: `http://localhost:4173`
- [ ] Xem Dashboard
- [ ] Xem Today view
- [ ] Click ⏱ Schedule view (NEW!)
- [ ] (Optional) Setup Gemini key tại Settings

---

## 🎓 Learning Resources

- **Schedule View**: Xem mục "Schedule View" trong README.md
- **AI Integration**: Xem mục "Gemini AI Assistant" trong FEATURES.md
- **Full API**: Xem "API Methods" section trong FEATURES.md
- **Troubleshooting**: Xem mục "Troubleshooting" trong README.md

---

## 📞 Support

**Problem?** 

1. F12 → Console → Check errors
2. README.md → Troubleshooting section
3. FEATURES.md → Workflow examples
4. localStorage → Xem dữ liệu:
   ```javascript
   JSON.parse(localStorage.getItem('sprint28'))
   ```

---

## 🚀 Next Steps

1. **Ngay bây giờ**: Start server, mở app
2. **Sắp tới**: Setup Gemini API key nếu muốn AI help
3. **Mỗi ngày**: Log vào Today view → Log work → Save review
4. **Cuối tuần**: Check weekly review, adjust targets

---

**Happy sprinting! 🎯**

Version: 2.0 (Schedule + AI + Drag-and-drop)  
Created: 2026-09-07  
Last updated: 2026-09-07
