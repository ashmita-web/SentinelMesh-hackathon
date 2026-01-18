import { create } from "zustand";




export interface TrafficFrame {
  id: string;
  timestamp: number;
  protocol: "Modbus/TCP" | "OPC UA";
  function: string;
  address: string;
  value: number;
  unit: string;
}

export interface Anomaly {
  id: string;
  timestamp: number;
  severity: "low" | "medium" | "high" | "critical";
  type: string;
  description: string;
  mitreTag: string;
  affectedSensors: string[];
  timeToDetect: number;
  value: number;
}

export interface AutoResponse {
  id: string;
  timestamp: number;
  anomalyId: string;
  action: "isolate" | "rate-limit" | "denylist" | "alert-only";
  status: "pending" | "active" | "completed";
  timeToMitigate: number;
  safeMode: boolean;
}

export interface SimulationKPIs {
  avgTimeToDetect: number;
  avgTimeToMitigate: number;
  falsePositiveRate: number;
  systemAvailability: number;
}

interface SimulationState {
  isRunning: boolean;
  safeMode: boolean;
  trafficFrames: TrafficFrame[];
  anomalies: Anomaly[];
  responses: AutoResponse[];
  kpis: SimulationKPIs;
  startSimulation: () => void;
  stopSimulation: () => void;
  toggleSafeMode: () => void;
  injectAttack: (type: string) => void;
  addTrafficFrame: (frame: TrafficFrame) => void;
  addAnomaly: (anomaly: Anomaly) => void;
  addResponse: (response: AutoResponse) => void;
  updateKPIs: (kpis: Partial<SimulationKPIs>) => void;
  setAnomalies: (data: Anomaly[]) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  isRunning: false,
  safeMode: true,
  trafficFrames: [],
  anomalies: [],
  responses: [],
  kpis: {
    avgTimeToDetect: 0,
    avgTimeToMitigate: 0,
    falsePositiveRate: 0,
    systemAvailability: 100,
  },
  setAnomalies: (data: Anomaly[]) => set({ anomalies: data }), 
  startSimulation: () => set({ isRunning: true }),
  stopSimulation: () => set({ isRunning: false }),
  toggleSafeMode: () => set((state) => ({ safeMode: !state.safeMode })),
  injectAttack: (type: string) => {
    // Attack injection logic will be handled by mock engine
    console.log("Injecting attack:", type);
  },
  addTrafficFrame: (frame) =>
    set((state) => ({
      trafficFrames: [...state.trafficFrames.slice(-99), frame],
    })),
  addAnomaly: (anomaly) =>
    set((state) => ({
      anomalies: [...state.anomalies, anomaly],
    })),
  addResponse: (response) =>
    set((state) => ({
      responses: [...state.responses, response],
    })),
  updateKPIs: (kpis) =>
    set((state) => ({
      kpis: { ...state.kpis, ...kpis },
    })),
}));
