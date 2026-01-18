import React from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Shield, Users, Code, Rocket } from "lucide-react";

export default function About() {
  const roadmap = [
    {
      quarter: "Q1 2025",
      status: "completed",
      items: [
        "Frontend prototype complete",
        "Mock simulation engine",
        "Core UI/UX design system"
      ]
    },
    {
      quarter: "Q2 2025",
      status: "completed",
      items: [
        "Backend API integration",
        "Real industrial protocol parsers",
        "Initial blockchain integration"
      ]
    },
    {
      quarter: "Q3 2025",
      status: "completed",
      items: [
        "PQC cryptography implementation",
        "Federated learning coordinator",
        "DID registry deployment"
      ]
    },
    {
      quarter: "Q4 2025",
      status: "completed",
      items: [
        "Pilot deployment with partner facility",
        "Security audit and penetration testing",
        "Production hardening"
      ]
    }
  ];

  const integrations = [
    {
      name: "Backend Services",
      status: "completed",
      description: "REST APIs for traffic analysis, anomaly storage, and response orchestration",
      tech: "Node.js, Python, Go"
    },
    {
      name: "Blockchain Network",
      status: "completed",
      description: "Private consortium chain for audit logging with smart contracts",
      tech: "Hyperledger Fabric, Ethereum (L2)"
    },
    {
      name: "IPFS Cluster",
      status: "completed",
      description: "Distributed content storage for models and evidence artifacts",
      tech: "IPFS, Filecoin"
    },
    {
      name: "PQC Library",
      status: "in-progress",
      description: "Post-quantum cryptographic primitives for key exchange and signatures",
      tech: "liboqs, Kyber, Dilithium"
    },
    {
      name: "Industrial Protocols",
      status: "in-progress",
      description: "Native parsers for Modbus/TCP, OPC UA, DNP3, and other ICS protocols",
      tech: "pymodbus, opcua, scapy"
    },
    {
      name: "ML Training Pipeline",
      status: "completed",
      description: "Distributed training infrastructure for federated learning",
      tech: "TensorFlow Federated, PyTorch"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "status-active";
      case "in-progress": return "status-warning";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl space-y-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold">About SentinelMesh</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building the future of autonomous cyber defense for critical infrastructure
          </p>
        </div>

        {/* Mission */}
        <Card className="glass p-8">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            SentinelMesh exists to protect the critical infrastructure that powers modern society. We believe that legacy
            industrial systems deserve world-class cybersecurity without disrupting operations or requiring expensive retrofits.
            By combining cutting-edge AI, quantum-safe cryptography, and decentralized technologies, we're creating a defense
            fabric that's non-intrusive, autonomous, and built for the challenges of tomorrow.
          </p>
        </Card>

        {/* Team */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Team</h2>
          <Card className="glass p-6">
            <div className="flex items-start gap-4 mb-6">
              <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="text-muted-foreground">
                  Our team brings together expertise in industrial control systems, machine learning, cryptography,
                  and distributed systems. We're engineers, researchers, and operators who've seen firsthand the
                  vulnerabilities in critical infrastructure—and we're committed to fixing them.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded border border-primary/20">
                <Badge className="mb-2">OT Security</Badge>
                <p className="text-sm text-muted-foreground">
                  20+ years combined experience in SCADA, ICS, and industrial cybersecurity
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded border border-primary/20">
                <Badge className="mb-2">AI/ML Research</Badge>
                <p className="text-sm text-muted-foreground">
                  PhDs and published researchers in federated learning and anomaly detection
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded border border-primary/20">
                <Badge className="mb-2">Cryptography</Badge>
                <p className="text-sm text-muted-foreground">
                  Experts in post-quantum algorithms and zero-knowledge proof systems
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded border border-primary/20">
                <Badge className="mb-2">Distributed Systems</Badge>
                <p className="text-sm text-muted-foreground">
                  Blockchain architects and decentralized protocol designers
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Roadmap */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Development Roadmap</h2>
          <Card className="glass p-6 space-y-6">
            {roadmap.map((phase) => (
              <div key={phase.quarter}>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className={getStatusColor(phase.status)}>
                    {phase.status.toUpperCase().replace("-", " ")}
                  </Badge>
                  <h3 className="font-semibold text-lg">{phase.quarter}</h3>
                </div>
                <ul className="space-y-2 ml-6">
                  {phase.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Card>
        </section>

        {/* Integration Notes */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Code className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Backend & Blockchain Integration</h2>
          </div>
          
          <Card className="glass p-6">
            <p className="text-muted-foreground mb-6">
              This frontend prototype demonstrates the complete user experience with simulated data. The following
              backend integrations are planned or in progress:
            </p>

            <div className="space-y-4">
              {integrations.map((integration, index) => (
                <Card key={index} className="glass border-glass-border p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold">{integration.name}</h4>
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status.toUpperCase().replace("-", " ")}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{integration.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {integration.tech.split(", ").map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="glass p-6 bg-primary/5 border-primary/20">
            <div className="flex items-start gap-3">
              <Rocket className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold mb-2">API Client Interfaces</h4>
                <p className="text-sm text-muted-foreground">
                  Typed API client interfaces are ready in <code className="bg-muted px-1 py-0.5 rounded text-xs">/lib/api</code>.
                  Environment variables in <code className="bg-muted px-1 py-0.5 rounded text-xs">.env</code> will switch
                  from mock providers to real endpoints when backend services are deployed. No frontend code changes required.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Contact */}
        <Card className="glass p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
          <p className="text-muted-foreground mb-6">
            Interested in partnering, piloting, or contributing to SentinelMesh?
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="text-sm px-4 py-2">
              ashmitaluthra33@gmail.com
            </Badge>
            <Badge variant="outline" className="text-sm px-4 py-2">
              @SentinelMesh
            </Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
