const timeManagementTips = [
  "Set clear goals.",
  "Prioritize tasks.",
  "Use a planner.",
  "Break tasks down.",
  "Establish a routine.",
  "Limit distractions.",
  "Use timers.",
  "Review progress regularly.",
  "Stay flexible.",
  "Reflect weekly.",
  "Batch similar tasks.",
  "Plan tomorrow today.",
  "Set deadlines.",
  "Use time blocking.",
  "Avoid multitasking.",
  "Eliminate time-wasters.",
  "Schedule breaks.",
  "Learn to say no.",
  "Use reminders.",
  "Track your time.",
  "Limit meetings.",
  "Stay organized.",
  "Create a daily to-do list.",
  "Set specific time limits.",
  "Visualize your tasks.",
  "Stay accountable.",
  "Reward yourself for progress.",
  "Declutter your workspace.",
  "Use apps for tracking.",
  "Stay healthy (exercise, sleep).",
  "Reflect on time spent weekly.",
];

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getTip() {
  const ll = timeManagementTips.length;
  const a = getRandomInt(1, ll - 1);
  return timeManagementTips[a];
}
