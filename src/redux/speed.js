
const SPEED_TO_MILLIS = [600, 500, 400, 300, 200, 150, 100, 80, 60, 40, 30];

export function convertScoreToSpeed(score) {
  return Math.min(Math.floor(score / 5), SPEED_TO_MILLIS.length - 1);
}

export function convertScoreToInterval(score) {
  const speed = convertScoreToSpeed(score);
  return SPEED_TO_MILLIS[speed];
}
