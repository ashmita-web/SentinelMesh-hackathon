import React from "react";
import { useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Network, Play, TrendingUp, Database, Shield } from "lucide-react";

interface FederatedNode {
  id: string;
  name: string;
  location: string;
  status: "active" | "training" | "idle";
  weight: number;
  dataPoints: number;
  lastUpdate: number;
}

export default function Federation() {
  const [isTraining, setIsTraining] = useState(false);
  const [round, setRound] = useState(0);

  const nodes: FederatedNode[] = [
    { id: "node-01", name: "Plant A", location: "US-East", status: "active", weight: 0.28, dataPoints: 145000, lastUpdate: Date.now() },
    { id: "node-02", name: "Plant B", location: "EU-West", status: "active", weight: 0.22, dataPoints: 98000, lastUpdate: Date.now() },
    { id: "node-03", name: "Plant C", location: "Asia-Pacific", status: "active", weight: 0.31, dataPoints: 167000, lastUpdate: Date.now() },
    { id: "node-04", name: "Plant D", location: "US-West", status: "idle", weight: 0.19, dataPoints: 82000, lastUpdate: Date.now() }
  ];

  const runFederationRound = () => {
    setIsTraining(true);
    setTimeout(() => {
      setRound(r => r + 1);
      setIsTraining(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "status-active";
      case "training": return "bg-chart-2 text-white";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Federated Learning</h1>
            <p className="text-muted-foreground">Privacy-preserving distributed model training</p>
          </div>
          
          <Button
            onClick={runFederationRound}
            disabled={isTraining}
            size="lg"
            className="gap-2"
          >
            {isTraining ? (
              <>
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Training Round {round + 1}...
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                Run Training Round
              </>
            )}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Nodes</span>
                <Network className="h-4 w-4 text-chart-1" />
              </div>
              <div className="text-2xl font-bold">
                {nodes.filter(n => n.status === "active").length}
              </div>
            </div>
          </Card>

          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Training Rounds</span>
                <TrendingUp className="h-4 w-4 text-chart-2" />
              </div>
              <div className="text-2xl font-bold">{round}</div>
            </div>
          </Card>

          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Data Points</span>
                <Database className="h-4 w-4 text-chart-3" />
              </div>
              <div className="text-2xl font-bold">
                {(nodes.reduce((acc, n) => acc + n.dataPoints, 0) / 1000).toFixed(0)}k
              </div>
            </div>
          </Card>

          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Privacy Level</span>
                <Shield className="h-4 w-4 text-chart-4" />
              </div>
              <div className="text-2xl font-bold">100%</div>
            </div>
          </Card>
        </div>

        {/* Node Map */}
        <Card className="glass">
          <div className="p-6 border-b border-border/40">
            <h3 className="font-semibold flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              Federated Network Topology
            </h3>
          </div>
          
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {nodes.map((node) => (
                <Card key={node.id} className="glass border-glass-border">
                  <div className="p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{node.name}</h4>
                        <p className="text-sm text-muted-foreground">{node.location}</p>
                      </div>
                      <Badge className={getStatusColor(node.status)}>
                        {node.status.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Contribution Weight</span>
                        <span className="font-semibold">{(node.weight * 100).toFixed(0)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                          style={{ width: `${node.weight * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border/40">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Data Points</div>
                        <div className="text-sm font-semibold">{node.dataPoints.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">Last Update</div>
                        <div className="text-sm font-semibold">
                          {new Date(node.lastUpdate).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>

        {/* Training Timeline */}
        <Card className="glass">
          <div className="p-6 border-b border-border/40">
            <h3 className="font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Training Progress
            </h3>
          </div>
          
          <div className="p-6 space-y-4">
            {round === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No training rounds completed yet. Click "Run Training Round" to start.</p>
              </div>
            ) : (
              <>
                {Array.from({ length: Math.min(round, 5) }, (_, i) => round - i).map((r) => (
                  <div key={r} className="flex items-center gap-4 p-4 bg-muted/30 rounded border border-border/40">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {r}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Training Round {r}</span>
                        <Badge className="status-active">COMPLETED</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Accuracy Delta:</span>
                          <span className="ml-2 font-semibold text-success">
                            +{(Math.random() * 2 + 0.5).toFixed(2)}%
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Loss Reduction:</span>
                          <span className="ml-2 font-semibold text-success">
                            -{(Math.random() * 0.5 + 0.1).toFixed(3)}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Participants:</span>
                          <span className="ml-2 font-semibold">{nodes.filter(n => n.status === "active").length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </Card>

        {/* How It Works */}
        <Card className="glass p-6">
          <h3 className="font-semibold mb-4">How Federated Learning Preserves Privacy</h3>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-primary/5 rounded border border-primary/20">
                <div className="font-semibold mb-2">1. Local Training</div>
                <p className="text-sm text-muted-foreground">
                  Each node trains on its local data without sharing raw information
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded border border-primary/20">
                <div className="font-semibold mb-2">2. Model Aggregation</div>
                <p className="text-sm text-muted-foreground">
                  Only model updates (gradients) are shared and aggregated centrally
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded border border-primary/20">
                <div className="font-semibold mb-2">3. Global Distribution</div>
                <p className="text-sm text-muted-foreground">
                  Improved global model is distributed back to all participating nodes
                </p>
              </div>
            </div>

            <div className="p-4 bg-success/10 rounded border border-success/20">
              <p className="text-sm">
                <strong>Privacy Guarantee:</strong> Raw operational data never leaves each facility.
                Only encrypted model parameters are exchanged, ensuring compliance with data sovereignty
                requirements while enabling collaborative threat detection improvements.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
