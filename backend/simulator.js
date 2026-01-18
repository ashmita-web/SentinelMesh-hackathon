import fetch from "node-fetch";

setInterval(async () => {
  const value = Math.random() > 0.95 ? Math.random() * 300 : Math.random() * 100;

  await fetch("http://localhost:5000/api/sensor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sensorId: "TEMP-001", value })
  });

}, 1000);
