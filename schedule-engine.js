// Schedule engine: Generate, persist, and manage daily task schedule
// Generates a detailed timetable with start/end times for each task

const ScheduleEngine = {
  // Generate initial schedule for a day
  generateDaySchedule(dayNumber, tasks, settings = {}) {
    const wake = settings.wake || "06:30";
    const workBlock = parseInt(settings.workBlock || "90");
    const breakDuration = parseInt(settings.break || "30");
    
    const [wakeHour, wakeMin] = wake.split(":").map(Number);
    let currentTime = wakeHour * 60 + wakeMin; // in minutes from midnight
    
    const schedule = [];
    let taskOrder = tasks.map(t => ({ ...t, id: `${dayNumber}-${t.track}` }));
    
    // Priority sort: P0 > P1 > P2
    const priorityValue = { P0: 3, P1: 2, P2: 1 };
    taskOrder.sort((a, b) => priorityValue[b.priority] - priorityValue[a.priority]);
    
    for (const task of taskOrder) {
      const duration = task.minutes || 60;
      const startTime = this.minutesToTime(currentTime);
      const endTime = this.minutesToTime(currentTime + duration);
      
      schedule.push({
        id: task.id,
        track: task.track,
        title: task.title,
        output: task.output,
        priority: task.priority,
        minutes: duration,
        startTime,
        endTime,
        completed: false,
        actualMin: 0,
        evidence: ""
      });
      
      currentTime += duration + breakDuration;
    }
    
    return schedule;
  },

  // Convert minutes from midnight to HH:MM format
  minutesToTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
  },

  // Parse HH:MM to minutes from midnight
  timeToMinutes(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);
    return h * 60 + m;
  },

  // Move task within a day's schedule
  moveTask(schedule, fromIndex, toIndex) {
    const newSchedule = [...schedule];
    const [task] = newSchedule.splice(fromIndex, 1);
    newSchedule.splice(toIndex, 0, task);
    
    // Recalculate times
    return this.recalculateTimes(newSchedule);
  },

  // Recalculate all task times after reordering
  recalculateTimes(schedule, settings = {}) {
    const wake = settings.wake || "06:30";
    const breakDuration = parseInt(settings.break || "30");
    
    const [wakeHour, wakeMin] = wake.split(":").map(Number);
    let currentTime = wakeHour * 60 + wakeMin;
    
    return schedule.map(task => {
      const startTime = this.minutesToTime(currentTime);
      const endTime = this.minutesToTime(currentTime + task.minutes);
      const updated = { ...task, startTime, endTime };
      currentTime += task.minutes + breakDuration;
      return updated;
    });
  },

  // Check for time conflicts
  hasConflicts(schedule) {
    for (let i = 0; i < schedule.length - 1; i++) {
      const current = schedule[i];
      const next = schedule[i + 1];
      const currentEnd = this.timeToMinutes(current.endTime);
      const nextStart = this.timeToMinutes(next.startTime);
      if (currentEnd > nextStart) return true;
    }
    return false;
  },

  // Get total duration of a schedule
  getTotalDuration(schedule) {
    if (!schedule.length) return 0;
    const lastTask = schedule[schedule.length - 1];
    const lastEnd = this.timeToMinutes(lastTask.endTime);
    return lastEnd;
  },

  // Suggest optimizations using priority and context
  suggestOptimization(schedule, dayNumber) {
    const suggestions = [];
    
    // Check if high-priority tasks are early in the day
    const p0Tasks = schedule.filter(t => t.priority === "P0");
    if (p0Tasks.length > 0) {
      const firstP0Index = schedule.findIndex(t => t.priority === "P0");
      if (firstP0Index > 2) {
        suggestions.push({
          type: "REORDER",
          message: `P0 task "${p0Tasks[0].title}" should be earlier (currently at position ${firstP0Index + 1})`,
          recommendation: "Move P0 tasks to morning slots (first 3 positions)"
        });
      }
    }
    
    // Check if any task is too long
    const longTasks = schedule.filter(t => t.minutes > 180);
    if (longTasks.length > 0) {
      suggestions.push({
        type: "DURATION",
        message: `Task "${longTasks[0].title}" is ${longTasks[0].minutes} minutes - consider breaking it into smaller chunks`,
        recommendation: "Split into multiple 90-minute blocks"
      });
    }
    
    // Check if schedule fits in work day (7-23:30)
    const totalMinutes = this.getTotalDuration(schedule);
    const maxWorkMinutes = 17 * 60 + 30; // 7:00 to 23:30
    if (totalMinutes > maxWorkMinutes) {
      suggestions.push({
        type: "OVERLOAD",
        message: `Total duration (${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m) exceeds available time`,
        recommendation: "Remove or defer non-critical tasks"
      });
    }
    
    return suggestions;
  }
};

// Export for use in app.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = ScheduleEngine;
}
