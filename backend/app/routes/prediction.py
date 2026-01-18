from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from catboost import CatBoostRegressor

app = FastAPI()

# Load trained model
model = CatBoostRegressor()
model.load_model("catboost_ics_model.cbm")

# Pydantic model for incoming sensor data
class SensorData(BaseModel):
    temperature: float
    pressure: float
    flow_rate: float
    vibration: float
    voltage: float
    current: float
    humidity: float
    setpoint: int
    output_valve: float
    system_load: float

@app.post("/predict")
def predict(data: SensorData):
    df = pd.DataFrame([data.dict()])
    predicted_pressure = model.predict(df)
    
    # Compare predicted_pressure with actual sensor pressure to detect anomaly
    anomaly_detected = abs(data.pressure - predicted_pressure[0]) > 5  # threshold
    anomaly = {
        "id": str(uuid.uuid4()),
        "type": "Pressure Anomaly",
        "severity": "critical" if anomaly_detected else "low",
        "description": "Predicted vs actual pressure deviation",
        "timestamp": datetime.now().isoformat(),
        "timeToDetect": 50,  # example
        "mitreTag": "TA0001",
        "affectedSensors": ["pressure_sensor_1"]
    } if anomaly_detected else None

    return {"predicted_pressure": float(predicted_pressure[0]), "anomaly": anomaly}
