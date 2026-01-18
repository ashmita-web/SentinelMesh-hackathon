import type { TrafficFrame, Anomaly, AutoResponse } from "@/store/simulation-store";

const SENSOR_ADDRESSES = [
  "0x0001", "0x0002", "0x0003", "0x0004", "0x0005",
  "0x0100", "0x0101", "0x0102", "0x0200", "0x0201"
];

const PROTOCOLS: Array<"Modbus/TCP" | "OPC UA"> = ["Modbus/TCP", "OPC UA"];

const FUNCTIONS = [
  "Read Holding Registers",
  "Write Single Register",
  "Read Input Registers",
  "Write Multiple Registers",
  "Read Variables",
  "Write Values"
];

const ANOMALY_TYPES = [
  "Signal Manipulation",
  "Replay Attack",
  "Rogue Write Command",
  "Unauthorized Access",
  "Protocol Violation",
  "Rate Limit Exceeded"
];

const MITRE_TAGS = [
  "T0830 - Man in the Middle",
  "T0835 - Manipulate I/O",
  "T0836 - Modify Parameter",
  "T0855 - Unauthorized Command",
  "T0878 - Alarm Suppression",
  "T0885 - Commonly Used Port"
];

export class MockEngine {
  private intervalId: NodeJS.Timeout | null = null;
  private attackMode: string | null = null;
  private frameCounter = 0;

  generateTrafficFrame(): TrafficFrame {
    const protocol = PROTOCOLS[Math.floor(Math.random() * PROTOCOLS.length)];
    const baseValue = 50 + Math.random() * 50;
    
    // Add anomaly if in attack mode
    const value = this.attackMode 
      ? baseValue * (Math.random() > 0.7 ? 1.5 : 0.5)
      : baseValue + (Math.random() - 0.5) * 5;

    return {
      id: `frame-${this.frameCounter++}-${Date.now()}`,
      timestamp: Date.now(),
      protocol,
      function: FUNCTIONS[Math.floor(Math.random() * FUNCTIONS.length)],
      address: SENSOR_ADDRESSES[Math.floor(Math.random() * SENSOR_ADDRESSES.length)],
      value: parseFloat(value.toFixed(2)),
      unit: Math.random() > 0.5 ? "PSI" : "°C"
    };
  }

  generateAnomaly(): Anomaly | null {
    // Generate anomaly only 20% of the time or 80% during attack
    const shouldGenerate = this.attackMode 
      ? Math.random() > 0.2 
      : Math.random() > 0.8;
    
    if (!shouldGenerate) return null;

    const severity: Array<"low" | "medium" | "high" | "critical"> = 
      this.attackMode ? ["high", "critical"] : ["low", "medium", "high"];
    
    const type = this.attackMode || ANOMALY_TYPES[Math.floor(Math.random() * ANOMALY_TYPES.length)];
    
    return {
      id: `anomaly-${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      severity: severity[Math.floor(Math.random() * severity.length)],
      type,
      description: `Detected ${type} on industrial network`,
      mitreTag: MITRE_TAGS[Math.floor(Math.random() * MITRE_TAGS.length)],
      affectedSensors: SENSOR_ADDRESSES.slice(0, Math.floor(Math.random() * 3) + 1),
      timeToDetect: Math.floor(Math.random() * 50) + 10 // 10-60ms
    };
  }

  generateAutoResponse(anomaly: Anomaly): AutoResponse {
    const actions: Array<"isolate" | "rate-limit" | "denylist" | "alert-only"> = 
      anomaly.severity === "critical" || anomaly.severity === "high"
        ? ["isolate", "rate-limit", "denylist"]
        : ["rate-limit", "alert-only"];

    return {
      id: `response-${Date.now()}`,
      timestamp: Date.now(),
      anomalyId: anomaly.id,
      action: actions[Math.floor(Math.random() * actions.length)],
      status: "pending",
      timeToMitigate: Math.floor(Math.random() * 30) + 5, // 5-35ms
      safeMode: false
    };
  }

  setAttackMode(type: string | null) {
    this.attackMode = type;
  }

  start(
    onFrame: (frame: TrafficFrame) => void,
    onAnomaly: (anomaly: Anomaly) => void,
    onResponse: (response: AutoResponse) => void
  ) {
    this.stop(); // Clear any existing interval
    
    this.intervalId = setInterval(() => {
      // Generate traffic frame
      const frame = this.generateTrafficFrame();
      onFrame(frame);

      // Possibly generate anomaly
      const anomaly = this.generateAnomaly();
      if (anomaly) {
        onAnomaly(anomaly);
        
        // Generate auto-response
        const response = this.generateAutoResponse(anomaly);
        onResponse(response);
      }
    }, 1000); // Generate every second
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.attackMode = null;
  }
}

export const mockEngine = new MockEngine();
