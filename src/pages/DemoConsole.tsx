import React from "react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useSimulationStore } from "../store/simulation-store";
import { mockEngine } from "../lib/mock-engine";
import { Play, Square, Shield, AlertTriangle, Zap, Activity, Lock as LockIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";

export default function DemoConsole() {
  const {
    isRunning,
    safeMode,
    trafficFrames,
    anomalies,
    responses,
    kpis,
    startSimulation,
    stopSimulation,
    toggleSafeMode,
    addTrafficFrame,
    addAnomaly,
    addResponse,
    updateKPIs,
  } = useSimulationStore();

  const [attackType, setAttackType] = useState<string>("none");

  useEffect(() => {
    if (isRunning) {
      mockEngine.start(
        (frame) => addTrafficFrame(frame),
        (anomaly) => {
          addAnomaly(anomaly);
          // Update KPIs
          updateKPIs({
            avgTimeToDetect: (kpis.avgTimeToDetect * 0.9 + anomaly.timeToDetect * 0.1),
          });
        },
        (response) => {
          addResponse(response);
          updateKPIs({
            avgTimeToMitigate: (kpis.avgTimeToMitigate * 0.9 + response.timeToMitigate * 0.1),
          });
        }
      );
    } else {
      mockEngine.stop();
    }

    return () => mockEngine.stop();
  }, [isRunning]);

  const handleInjectAttack = (type: string) => {
    setAttackType(type);
    mockEngine.setAttackMode(type);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "status-critical";
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "status-warning";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Demo Console</h1>
            <p className="text-muted-foreground">Real-time simulation of autonomous cyber defense</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="safe-mode"
                checked={safeMode}
                onCheckedChange={toggleSafeMode}
              />
              <Label htmlFor="safe-mode" className="cursor-pointer">
                Safe Mode
              </Label>
            </div>
            
            <Button
              onClick={isRunning ? stopSimulation : startSimulation}
              size="lg"
              variant={isRunning ? "destructive" : "default"}
              className="gap-2"
            >
              {isRunning ? (
                <>
                  <Square className="h-5 w-5" />
                  Stop Simulation
                </>
              ) : (
                <>
                  <Play className="h-5 w-5" />
                  Start Simulation
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Controls */}
        <Card className="glass p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <Label className="mb-2 block">Inject Attack Scenario</Label>
              <Select value={attackType} onValueChange={handleInjectAttack}>
                <SelectTrigger className="w-full sm:w-[280px]">
                  <SelectValue placeholder="Select attack type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="Signal Manipulation">Signal Manipulation</SelectItem>
                  <SelectItem value="Replay Attack">Replay Attack</SelectItem>
                  <SelectItem value="Rogue Write Command">Rogue Write Command</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${isRunning ? 'bg-success animate-pulse' : 'bg-muted'}`} />
                <span className="text-sm text-muted-foreground">
                  {isRunning ? "Running" : "Stopped"}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Time to Detect</span>
                <Zap className="h-4 w-4 text-chart-1" />
              </div>
              <div className="text-2xl font-bold">{kpis.avgTimeToDetect.toFixed(1)}ms</div>
            </div>
          </Card>

          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Time to Mitigate</span>
                <Shield className="h-4 w-4 text-chart-2" />
              </div>
              <div className="text-2xl font-bold">{kpis.avgTimeToMitigate.toFixed(1)}ms</div>
            </div>
          </Card>

          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">False Positive Rate</span>
                <AlertTriangle className="h-4 w-4 text-chart-4" />
              </div>
              <div className="text-2xl font-bold">{kpis.falsePositiveRate.toFixed(2)}%</div>
            </div>
          </Card>

          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Availability</span>
                <Activity className="h-4 w-4 text-chart-3" />
              </div>
              <div className="text-2xl font-bold">{kpis.systemAvailability.toFixed(1)}%</div>
            </div>
          </Card>
        </div>

        {/* Main Panels */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Traffic Stream */}
          <Card className="glass">
            <div className="p-4 border-b border-border/40">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Mirrored Traffic Stream
              </h3>
            </div>
            <div className="p-4 h-[400px] overflow-y-auto space-y-2">
              {trafficFrames.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Start simulation to see traffic frames
                </p>
              ) : (
                trafficFrames.slice(-20).reverse().map((frame) => (
                  <div key={frame.id} className="text-xs font-mono p-2 bg-muted/30 rounded border border-border/40">
                    <div className="flex items-center justify-between mb-1">
                      <Badge variant="outline" className="text-xs">{frame.protocol}</Badge>
                      <span className="text-muted-foreground">{new Date(frame.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>Function: {frame.function}</div>
                      <div>Address: {frame.address}</div>
                      <div>Value: {frame.value} {frame.unit}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Anomaly Timeline */}
          <Card className="glass">
            <div className="p-4 border-b border-border/40">
              <h3 className="font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Anomaly Timeline
              </h3>
            </div>
            <div className="p-4 h-[400px] overflow-y-auto space-y-2">
              {anomalies.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No anomalies detected
                </p>
              ) : (
                anomalies.slice(-20).reverse().map((anomaly) => (
                  <div key={anomaly.id} className="p-3 bg-muted/30 rounded border border-border/40 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={getSeverityColor(anomaly.severity)}>
                            {anomaly.severity.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(anomaly.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm font-medium">{anomaly.type}</p>
                        <p className="text-xs text-muted-foreground mt-1">{anomaly.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <Badge variant="outline">{anomaly.mitreTag}</Badge>
                      <span className="text-muted-foreground">Detected in {anomaly.timeToDetect}ms</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Auto-Response Status */}
        <Card className="glass">
          <div className="p-4 border-b border-border/40">
            <h3 className="font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-success" />
              Auto-Response Status
              {safeMode && (
                <Badge variant="outline" className="ml-2">Safe Mode Active</Badge>
              )}
            </h3>
          </div>
          <div className="p-4">
            {responses.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No responses executed yet
              </p>
            ) : (
              <div className="space-y-2">
                {responses.slice(-10).reverse().map((response) => (
                  <div key={response.id} className="flex items-center justify-between p-3 bg-muted/30 rounded border border-border/40">
                    <div className="flex items-center gap-4">
                      <Badge className="status-active">{response.action.toUpperCase()}</Badge>
                      <span className="text-sm">{new Date(response.timestamp).toLocaleTimeString()}</span>
                      <span className="text-sm text-muted-foreground">
                        Response time: {response.timeToMitigate}ms
                      </span>
                    </div>
                    <Badge variant="outline">{response.status}</Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* PQC Status */}
        <Card className="glass p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <LockIcon className="h-5 w-5 text-primary" />
            Post-Quantum Cryptography Status
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-success/10 rounded border border-success/20">
              <span className="text-sm font-medium">PQC Handshake (ML-KEM/Kyber)</span>
              <Badge className="status-active">OK</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/10 rounded border border-success/20">
              <span className="text-sm font-medium">Signature (ML-DSA)</span>
              <Badge className="status-active">OK</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
