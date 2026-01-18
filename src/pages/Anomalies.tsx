import React, { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { AlertTriangle, CheckCircle, Clock, FileText, Play } from "lucide-react";
import { useSimulationStore } from "../store/simulation-store";

export default function Anomalies() {
  const { anomalies, setAnomalies } = useSimulationStore();
  const [selectedAnomaly, setSelectedAnomaly] = useState<string | null>(null);

  // Fetch anomalies from backend
  const fetchAnomalies = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/anomalies");
      const data = await res.json();
      setAnomalies(data);
    } catch (err) {
      console.log("Backend unreachable:", err);
    }
  };

  // Poll backend every 2 seconds
  useEffect(() => {
    fetchAnomalies();
    const interval = setInterval(fetchAnomalies, 2000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "status-critical";
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "status-warning";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getPlaybook = (type: string) => {
    const playbooks: Record<string, string[]> = {
      "Outlier Deviation": [
        "Validate sensor signal",
        "Check calibration",
        "Verify operational parameters",
        "Log anomaly and notify response team",
        "Continue monitoring for similar spikes"
      ],
    };

    return playbooks[type] || [
      "Investigate source",
      "Document and escalate if needed",
      "Apply remediation",
      "Monitor for recurrence"
    ];
  };

  const getRootCause = (type: string) => {
    if (type === "Outlier Deviation")
      return "Detected value outside statistical baseline. Possible malfunction or abnormal event";

    return "Further investigation required.";
  };

  const selectedAnomalyData = anomalies.find(a => a.id === selectedAnomaly);

  return (
    <div className="min-h-screen py-8">
      <div className="container space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Anomaly Management</h1>
          <p className="text-muted-foreground">Detection, analysis, and response playbooks</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Detected</span>
                <AlertTriangle className="h-4 w-4 text-chart-1" />
              </div>
              <div className="text-2xl font-bold">{anomalies.length}</div>
            </div>
          </Card>

          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Critical</span>
                <AlertTriangle className="h-4 w-4 text-destructive" />
              </div>
              <div className="text-2xl font-bold">
                {anomalies.filter(a => a.severity === "critical").length}
              </div>
            </div>
          </Card>

          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">High Priority</span>
                <Clock className="h-4 w-4 text-warning" />
              </div>
              <div className="text-2xl font-bold">
                {anomalies.filter(a => a.severity === "high").length}
              </div>
            </div>
          </Card>

          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Resolved</span>
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
              <div className="text-2xl font-bold">0</div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold">Recent Anomalies</h2>

            {anomalies.length === 0 ? (
              <Card className="glass p-8">
                <p className="text-center text-muted-foreground">
                  No anomalies detected. Run sensor simulation.
                </p>
              </Card>
            ) : (
              <div className="space-y-2">
                {anomalies.slice(-20).reverse().map((anomaly) => (
                  <Card
                    key={anomaly.id}
                    className={`glass cursor-pointer ${
                      selectedAnomaly === anomaly.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedAnomaly(anomaly.id)}
                  >
                    <div className="p-4 space-y-2">
                      <div className="flex items-start justify-between">
                        <Badge className={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(anomaly.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{anomaly.type}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-4">
            {selectedAnomalyData ? (
              <>
                <Card className="glass p-6">
                  <h2 className="text-2xl font-bold">{selectedAnomalyData.type}</h2>
                  <p className="text-muted-foreground mb-4">{selectedAnomalyData.value} reading</p>
                  <p className="text-sm">{getRootCause(selectedAnomalyData.type)}</p>
                </Card>

                {/* Playbook */}
                <Card className="glass p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" /> Response Playbook
                  </h3>

                  <ol className="space-y-3">
                    {getPlaybook(selectedAnomalyData.type).map((step, i) => (
                      <li key={i} className="flex gap-2">
                        <span>{i + 1}.</span> {step}
                      </li>
                    ))}
                  </ol>

                  <Button className="mt-6 gap-2">
                    <Play className="h-4 w-4" />
                    Execute Playbook
                  </Button>
                </Card>
              </>
            ) : (
              <Card className="glass p-12 text-center text-muted-foreground">
                <AlertTriangle className="h-16 w-16 mx-auto opacity-50 mb-4" />
                Select an anomaly to inspect
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
