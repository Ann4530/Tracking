// Gemini AI integration: Get AI suggestions for schedule optimization
// Uses Gemini API to suggest plan changes and schedule improvements

const GeminiAI = {
  apiKey: "",
  
  // Initialize with API key
  init(key) {
    this.apiKey = key;
    return this;
  },

  // Check if API key is set
  isConfigured() {
    return this.apiKey && this.apiKey.length > 0;
  },

  // Call Gemini API
  async callGemini(prompt) {
    if (!this.isConfigured()) {
      return { error: "API key not configured. Please add Gemini API key in Settings." };
    }

    try {
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + this.apiKey, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024
          }
        })
      });

      if (!response.ok) {
        const err = await response.json();
        return { error: `Gemini API error: ${err.error?.message || "Unknown error"}` };
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
      return { success: true, text };
    } catch (e) {
      return { error: `Network error: ${e.message}` };
    }
  },

  // Suggest schedule improvements
  async suggestScheduleOptimization(day, dayNumber, schedule) {
    const taskList = schedule.map((t, i) => 
      `${i + 1}. ${t.startTime}-${t.endTime}: ${t.title} (${t.priority}) [${t.minutes}min]`
    ).join("\n");

    const prompt = `Analyze this daily sprint schedule for Day ${dayNumber} and suggest optimizations.

Schedule:
${taskList}

Constraints:
- P0 tasks must be done first (morning)
- Each task should not exceed 3 hours
- Total work time should be 8-10 hours/day
- Include 30min breaks between tasks

Provide 2-3 specific, actionable suggestions to improve this schedule. Format as:
1. [ISSUE]: Problem
   Solution: How to fix it
   Benefit: Why this matters`;

    return this.callGemini(prompt);
  },

  // Suggest plan changes if behind
  async suggestPlanAdjustment(sprint, dayNumber) {
    const tracks = sprint.tracks || {};
    const data = sprint.saved || {};
    
    const status = [];
    Object.entries(tracks).forEach(([key, track]) => {
      const progress = sprint.trackProgress?.(key) || 0;
      const target = track.target;
      const unit = track.unit;
      status.push(`${track.short}: ${(progress * 100).toFixed(0)}% (target: ${target} ${unit})`);
    });

    const prompt = `Sprint Day ${dayNumber}/28 Status Review:

Current progress:
${status.join("\n")}

Daily pace calculation:
- Expected progress for Day ${dayNumber}: ${(dayNumber / 28 * 100).toFixed(0)}%

Questions for AI:
1. Which track is most at risk?
2. What specific actions to take TODAY to get back on track?
3. Should we adjust the sprint plan (targets, priorities)?
4. Any resource/time blockers I should remove?

Provide concise, actionable advice with specific tasks or pivots.`;

    return this.callGemini(prompt);
  },

  // Get AI help for a specific task
  async getTaskHelp(task, dayNumber) {
    const prompt = `Task: "${task.title}"
Output: ${task.output}
Time allocated: ${task.minutes} minutes
Priority: ${task.priority}
Day: ${dayNumber}/28

I need help executing this task. Please provide:
1. Quick breakdown of steps (in the time allocated)
2. Common pitfalls to avoid
3. How to verify the output is complete
4. What evidence/notes to save

Keep it practical and time-aware.`;

    return this.callGemini(prompt);
  },

  // Regenerate daily schedule with AI suggestions
  async optimizeSchedule(dayNumber, tasks, settings = {}) {
    const taskList = tasks.map(t => 
      `- ${t.title} (${t.priority}, ${t.minutes}min, output: ${t.output})`
    ).join("\n");

    const wake = settings.wake || "06:30";
    const sleep = settings.sleep || "23:30";
    const prompt = `Optimize this daily schedule for productivity and energy management.

Day: ${dayNumber}/28
Work hours: ${wake} to ${sleep}
Tasks to fit:
${taskList}

Provide a reordered schedule with:
1. Start time for each task (in HH:MM format)
2. Reason for this order
3. Suggested break times
4. Energy management (high-focus work early, creative work afternoon)

Format output as:
HH:MM Task Name (Priority)
[Reason]: ...`;

    return this.callGemini(prompt);
  },

  // Weekly review summary
  async getWeeklyReview(weekNumber, dayScores, trackProgress) {
    const scores = dayScores.slice((weekNumber - 1) * 7, weekNumber * 7);
    const avgScore = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    
    const tracks = Object.entries(trackProgress || {})
      .map(([name, progress]) => `${name.toUpperCase()}: ${(progress * 100).toFixed(0)}%`)
      .join("\n");

    const prompt = `Week ${weekNumber} Sprint Review:

Daily scores: ${scores.join(", ")} (avg: ${avgScore})
Track progress:
${tracks}

Provide a weekly review summary with:
1. What's working well (be specific)
2. What needs adjustment (identify patterns)
3. Priority for next week (top 3 focuses)
4. Do we need to pivot on any goals?`;

    return this.callGemini(prompt);
  }
};

// Export for use in app.js
if (typeof module !== "undefined" && module.exports) {
  module.exports = GeminiAI;
}
