import React from "react";
import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Activity, TrendingUp, AlertCircle, Info } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

interface SensorData {
  id: string;
  name: string;
  value: number;
  predicted: number;
  unit: string;
  status: "normal" | "warning" | "critical";
  confidence: number;
}

export default function DigitalTwin() {
  const [perturbation, setPerturbation] = useState(false);
  
  const sensorData: SensorData[] = [
    {
      id: "temp-01",
      name: "Temperature Reactor A",
      value: perturbation ? 385.4 : 342.8,
      predicted: 340.2,
      unit: "°C",
      status: perturbation ? "critical" : "normal",
      confidence: 0.94
    },
    {
      id: "press-01",
      name: "Pressure Line B",
      value: perturbation ? 152.1 : 145.6,
      predicted: 145.8,
      unit: "PSI",
      status: perturbation ? "warning" : "normal",
      confidence: 0.91
    },
    {
      id: "flow-01",
      name: "Flow Rate Coolant",
      value: 87.3,
      predicted: 88.1,
      unit: "GPM",
      status: "normal",
      confidence: 0.96
    },
    {
      id: "vibr-01",
      name: "Vibration Motor C",
      value: perturbation ? 8.7 : 2.3,
      predicted: 2.1,
      unit: "mm/s",
      status: perturbation ? "critical" : "normal",
      confidence: 0.89
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "status-critical";
      case "warning": return "status-warning";
      default: return "status-active";
    }
  };

  const getDrift = (actual: number, predicted: number) => {
    const drift = ((actual - predicted) / predicted * 100);
    return drift.toFixed(1);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Digital Twin</h1>
            <p className="text-muted-foreground">Real-time process schematic with predictive analytics</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="perturbation"
                checked={perturbation}
                onCheckedChange={setPerturbation}
              />
              <Label htmlFor="perturbation" className="cursor-pointer">
                Apply Perturbation
              </Label>
            </div>
          </div>
        </div>

        {/* Process Overview */}
        <Card className="glass p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Process Schematic
          </h3>
          
          <div className="relative h-64 bg-muted/20 rounded-lg border border-border/40 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Activity className="h-16 w-16 text-primary mx-auto animate-pulse-slow" />
              <p className="text-sm text-muted-foreground">Industrial Process Flow Visualization</p>
              <p className="text-xs text-muted-foreground">(Interactive schematic in production)</p>
            </div>
          </div>
        </Card>

        {/* Sensor Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {sensorData.map((sensor) => {
            const drift = parseFloat(getDrift(sensor.value, sensor.predicted));
            const isDrifting = Math.abs(drift) > 5;

            return (
              <Card key={sensor.id} className="glass">
                <div className="p-4 border-b border-border/40">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold">{sensor.name}</h3>
                      <p className="text-xs text-muted-foreground">ID: {sensor.id}</p>
                    </div>
                    <Badge className={getStatusColor(sensor.status)}>
                      {sensor.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 space-y-4">
                  {/* Current Value */}
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Actual Value</span>
                      <span className="text-3xl font-bold">
                        {sensor.value} <span className="text-lg text-muted-foreground">{sensor.unit}</span>
                      </span>
                    </div>
                  </div>

                  {/* Predicted Value */}
                  <div className="p-3 bg-muted/30 rounded border border-border/40">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Predicted Value</span>
                      <span className="text-lg font-semibold">
                        {sensor.predicted} {sensor.unit}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Confidence: {(sensor.confidence * 100).toFixed(0)}%</span>
                      <div className="flex items-center gap-1">
                        {isDrifting ? (
                          <>
                            <AlertCircle className="h-3 w-3 text-warning" />
                            <span className="text-warning font-medium">Drift: {drift}%</span>
                          </>
                        ) : (
                          <>
                            <TrendingUp className="h-3 w-3 text-success" />
                            <span className="text-success">Drift: {drift}%</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Prediction Interval */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Prediction Interval (95%)</span>
                    </div>
                    <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-chart-3 via-chart-2 to-chart-1" />
                      <div 
                        className="absolute top-0 bottom-0 w-1 bg-foreground"
                        style={{ left: `${((sensor.value - sensor.predicted + 20) / 40) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{(sensor.predicted * 0.9).toFixed(1)}</span>
                      <span>{(sensor.predicted * 1.1).toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Alert Threshold */}
                  {sensor.status !== "normal" && (
                    <div className="flex items-start gap-2 p-3 bg-warning/10 rounded border border-warning/20">
                      <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                      <div className="flex-1 text-xs">
                        <p className="font-medium text-warning">Threshold Crossed</p>
                        <p className="text-muted-foreground mt-1">
                          Value exceeds predicted range. Model suggests potential anomaly or equipment degradation.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Model Explanation */}
        <Card className="glass p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Info className="h-5 w-5 text-primary" />
            Model Explanation
          </h3>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/30 rounded border border-border/40">
                <div className="text-sm text-muted-foreground mb-1">Algorithm</div>
                <div className="font-semibold">LSTM + Kalman Filter</div>
              </div>
              <div className="p-4 bg-muted/30 rounded border border-border/40">
                <div className="text-sm text-muted-foreground mb-1">Training Window</div>
                <div className="font-semibold">30 days rolling</div>
              </div>
              <div className="p-4 bg-muted/30 rounded border border-border/40">
                <div className="text-sm text-muted-foreground mb-1">Update Frequency</div>
                <div className="font-semibold">Real-time</div>
              </div>
            </div>

            <div className="p-4 bg-primary/5 rounded border border-primary/20">
              <p className="text-sm">
                <strong>How it works:</strong> The digital twin uses LSTM neural networks trained on historical sensor data
                to predict expected values. Kalman filtering smooths predictions and provides confidence intervals.
                When actual values deviate significantly from predictions, alerts are triggered for operator review.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
