import express from "express";
import cors from "cors";
import { detect } from "./detection/anomalyEngine.js";

const app = express();
app.use(cors());
app.use(express.json());

let anomalies = [];

app.post("/api/sensor", (req, res) => {
  const { sensorId, value } = req.body;

  const result = detect(value);

  if (result.anomaly) {
    const anomalyEvent = {
      id: Date.now().toString(),
      sensorId,
      value,
      timestamp: Date.now(),
      severity: "high",
      type: "Outlier Deviation",
      description: `Sensor value ${value} deviated from normal range.`,
      affectedSensors: [sensorId]
    };

    anomalies.push(anomalyEvent);
    return res.json({ detected: true, anomaly: anomalyEvent });
  }

  res.json({ detected: false });
});

app.get("/api/anomalies", (req, res) => {
  res.json(anomalies);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
