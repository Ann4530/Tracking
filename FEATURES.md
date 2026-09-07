# Quick Reference - Tính năng mới

## Schedule View (⏱) - Bảng thời gian cụ thể

### Cách vào
- Click **⏱ Schedule** trên sidebar
- Hoặc mở bất kỳ ngày nào

### Chức năng chính

| Chức năng | Cách dùng |
|-----------|----------|
| **Xem lịch** | Bảng hiển thị 7 task với time, priority, duration |
| **Chuyển ngày** | Click ‹ › buttons hoặc ngày hiện tại |
| **Kéo sắp xếp** | Drag task row để reorder (P0 vào buổi sáng) |
| **Log task** | Tick checkbox ✓ để đánh dấu hoàn thành |
| **AI Optimize** | Click 🤖 AI Optimize (cần Gemini API key) |
| **Reset** | Click ↻ Reset để quay về thứ tự mặc định |
| **Tính tổng** | Tự động tính "Total time on tasks" |

### Cấu trúc bảng

```
TIME             TASK                          PRIORITY  DURATION  ✓
06:30—08:40      Phân biệt Linux kernel...    P0        130min    ☐
09:10—11:20      Giải thích ML loop...        P0        130min    ☐
11:50—15:50      Hoàn thành diagnostic...     P0        240min    ☐
16:20—17:50      Audit app...                 P0        90min     ☐
18:20—19:35      Xác định niche...            P0        75min     ☐
20:05—21:05      Audit CV...                  P0        60min     ☐
21:35—22:05      Đánh giá ngày (Review)       P1        30min     ☐
```

---

## Gemini AI Assistant - Tối ưu kế hoạch

### Setup (lần đầu)

1. Lấy API key: https://aistudio.google.com/app/apikey
2. Vào **Settings** → Kéo xuống → **Gemini AI Assistant**
3. Paste API key vào field
4. Click **Save Gemini key**

### Sử dụng AI Optimize

1. Mở Schedule view (⏱)
2. Click **🤖 AI Optimize** button
3. Đợi 2-5 giây
4. Xem suggestions trong "💡 AI Suggestions" section

### Loại suggestions

| Type | Ý nghĩa | Giải pháp |
|------|---------|----------|
| DURATION | Task quá dài (>3h) | Split thành nhiều 90-min blocks |
| OVERLOAD | Tổng time > 12h/day | Remove hoặc defer non-critical tasks |
| PRIORITY | P0 task không vào buổi sáng | Move P0 tasks lên top 3 |

---

## Drag-and-Drop - Sắp xếp task

### Cách dùng

1. Mở Schedule view (⏱)
2. Hover vào task row
3. Click và kéo (drag) task
4. Thả (drop) vào vị trí mới
5. Thời gian tự động tính lại
6. Dữ liệu tự động lưu

### Tip
- Drag từ **task row** (không phải header)
- P0 tasks → top (morning)
- Long tasks → sau breaks
- Total time tự update

---

## Settings - Gemini API Key

### Vị trí
**Settings** → Kéo xuống → **Gemini AI Assistant**

### Fields
- **GEMINI API KEY**: Paste API key (password field)
- Button: **Save Gemini key**

### Cảnh báo
⚠️ **NEVER** commit API key vào Git!
- Key lưu trong localStorage (client-side only)
- Nếu leak: invalidate từ Google Cloud Console
- Monitor usage: https://console.cloud.google.com

---

## Workflow: Optimize Schedule + Execute

### Sáng (06:00)
1. Mở **Today** view
2. Xem 7 tasks hôm nay
3. Nếu muốn optimize → **Schedule** view
4. Click 🤖 AI Optimize
5. Xem suggestions
6. Drag task để adjust order
7. Bấm Reset nếu cần

### Trong ngày
1. Xem **Schedule** table
2. Theo timeline: 06:30 → 22:05
3. Tick task khi hoàn thành ✓
4. Log actual minutes nếu cần

### Cuối ngày
1. Mở **Today** view
2. Điền Daily Review:
   - Energy: 1-10
   - Focus: 1-10
   - Biggest win
   - What should change tomorrow?
3. Click **Save review**
4. Score tự động update

### Hàng tuần
1. Mở **Reviews** view
2. Chọn tuần (auto = current)
3. Xem weekly score avg
4. Điền: What's working? Behind? Change?
5. Click **Save week review**

---

## Troubleshooting - Vấn đề thường gặp

### "AI Optimize" không hoạt động

**Nguyên nhân**:
- API key chưa set
- API key invalid
- Hết API quota
- Network error

**Giải pháp**:
```
1. Settings → Kiểm tra API key đã set chưa
2. Google AI Studio → Check key valid
3. Cloud Console → Check quota/usage
4. F12 Console → Xem error message
```

### Schedule time bị lệch

**Nguyên nhân**: Wake/sleep time sai

**Giải pháp**:
```
Settings → Daily schedule
- WAKE TIME: 06:30 (default)
- SLEEP TIME: 23:30 (default)
→ Save configuration
→ Schedule → Reset schedule
```

### Drag-drop không work

**Nguyên nhân**: Browser tidak support hoặc lỗi

**Giải pháp**:
```
1. Refresh trang (F5)
2. Đảm bảo ở Schedule view
3. Drag từ task row (không header)
4. Check console (F12) có error
```

### Data mất sau restart browser

**Nguyên nhân**: localStorage cleared

**Giải pháp**:
```
1. Export data thường xuyên (F12 Console):
   copy(JSON.stringify(JSON.parse(localStorage.getItem('sprint28')), null, 2))
2. Backup file .json
3. Nếu mất: Import từ backup
   localStorage.setItem('sprint28', JSON.stringify({...}))
```

---

## Keyboard Shortcuts (tương lai)

Hiện tại chưa có shortcuts, nhưng có thể add sau:
- `G` → Go to schedule
- `R` → Daily review
- `→` / `←` → Next / Prev day
- `S` → Save (tất cả auto-save)

---

## API Methods (Developer Reference)

### ScheduleEngine

```javascript
// Generate schedule for day 1
const schedule = ScheduleEngine.generateDaySchedule(
  1,                          // day number
  dayData(1).tasks,           // tasks array
  saved.settings              // settings (wake, sleep, breaks)
);

// Move task from index 0 to index 5
const newSchedule = ScheduleEngine.moveTask(schedule, 0, 5);

// Get suggestions
const suggestions = ScheduleEngine.suggestOptimization(schedule, 1);

// Recalculate times after reorder
const recalc = ScheduleEngine.recalculateTimes(schedule, saved.settings);

// Check conflicts
if (ScheduleEngine.hasConflicts(schedule)) { ... }

// Get total duration
const minutes = ScheduleEngine.getTotalDuration(schedule);
```

### GeminiAI

```javascript
// Init
GeminiAI.init(apiKey);

// Check if configured
if (GeminiAI.isConfigured()) { ... }

// Call API
const result = await GeminiAI.callGemini("Your prompt");
if (result.error) console.error(result.error);
else console.log(result.text);

// Suggest optimization
const sugg = await GeminiAI.suggestScheduleOptimization(daySchedule, dayNum);

// Get plan adjustment advice
const plan = await GeminiAI.suggestPlanAdjustment(sprint, dayNum);

// Weekly review
const week = await GeminiAI.getWeeklyReview(weekNum, scores, progress);
```

---

**Last updated**: 2026-09-07  
**Version**: 2.0  
**Features**: Schedule + AI + Drag-and-drop
