let history = [];
const THRESHOLD = 3; // sensitivity

export function detect(sensorValue) {
  history.push(sensorValue);

  if (history.length < 10) {
    return { anomaly: false };
  }

  const avg = history.reduce((a, b) => a + b) / history.length;
  const stdev = Math.sqrt(
    history.map(v => (v - avg) ** 2).reduce((a, b) => a + b) / history.length
  );

  if (Math.abs(sensorValue - avg) > THRESHOLD * stdev) {
    return { anomaly: true, avg, stdev, value: sensorValue };
  }

  return { anomaly: false };
}
