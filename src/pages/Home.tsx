import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Shield, Zap, Lock, Activity, Brain, Network } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Activity,
      title: "Non-intrusive Passive Monitoring",
      description: "Mirror industrial traffic without disrupting operations. Zero latency impact on critical systems."
    },
    {
      icon: Zap,
      title: "Autonomous Millisecond Response",
      description: "AI-driven detection and response in <50ms. Automatic threat mitigation with safety guardrails."
    },
    {
      icon: Lock,
      title: "Verifiable & Quantum-Safe",
      description: "PQC-enabled with ML-KEM (Kyber) and ML-DSA. Blockchain-backed audit trail for compliance."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Mirror Traffic",
      description: "Passive monitoring captures Modbus/TCP and OPC UA communications"
    },
    {
      number: "02",
      title: "Detect Anomalies",
      description: "ML models identify threats in real-time with <50ms latency"
    },
    {
      number: "03",
      title: "Autonomous Response",
      description: "Automated isolation, rate-limiting, or alerting based on severity"
    },
    {
      number: "04",
      title: "Verify & Audit",
      description: "Cryptographic proof and blockchain logging ensure accountability"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32 cyber-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 neon-glow">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Quantum-Safe Cyber Defense</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Autonomous Protection for
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Legacy Critical Infrastructure
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Non-intrusive monitoring, millisecond detection, and autonomous response—powered by federated learning and quantum-resistant cryptography.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/demo">
                <Button size="lg" className="gap-2 neon-glow text-lg h-12 px-8">
                  <Zap className="h-5 w-5" />
                  Run Live Demo
                </Button>
              </Link>
              <Link to="/docs">
                <Button size="lg" variant="outline" className="gap-2 text-lg h-12 px-8">
                  <Shield className="h-5 w-5" />
                  View Documentation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass p-8 transition-smooth hover:scale-[1.02] hover:shadow-lg border-glass-border"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Four-stage defense fabric integrating passive monitoring, AI detection, autonomous response, and cryptographic verification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                <div className="space-y-4">
                  <div className="text-6xl font-bold text-primary/20">{step.number}</div>
                  <h3 className="text-xl font-bold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Architecture</h2>
            <p className="text-muted-foreground text-lg">
              Modular, scalable design built for zero-trust environments
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass p-6 space-y-4">
              <Network className="h-10 w-10 text-chart-1" />
              <h3 className="text-lg font-bold">Mirror Layer</h3>
              <p className="text-sm text-muted-foreground">
                Non-intrusive traffic capture via network TAPs. Supports Modbus/TCP, OPC UA, and DNP3.
              </p>
            </Card>

            <Card className="glass p-6 space-y-4">
              <Brain className="h-10 w-10 text-chart-2" />
              <h3 className="text-lg font-bold">AI Detection</h3>
              <p className="text-sm text-muted-foreground">
                Federated learning models detect anomalies without sharing raw data. Privacy-preserving and scalable.
              </p>
            </Card>

            <Card className="glass p-6 space-y-4">
              <Shield className="h-10 w-10 text-chart-3" />
              <h3 className="text-lg font-bold">Quantum-Safe Identity</h3>
              <p className="text-sm text-muted-foreground">
                PQC handshakes (ML-KEM), DID-based identity, and blockchain audit ensure future-proof security.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden cyber-grid">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/95 to-background" />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Protect Your Critical Infrastructure?
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the full demo with real-time simulations, anomaly detection, and autonomous response.
            </p>
            <Link to="/demo">
              <Button size="lg" className="gap-2 neon-glow text-lg h-12 px-8">
                <Zap className="h-5 w-5" />
                Launch Demo Console
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
