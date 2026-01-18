import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { FileText, Download, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Docs() {
  const docRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (docRef.current) {
      html2pdf()
        .set({
          margin: 10,
          filename: "SentinelMesh_Documentation.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(docRef.current)
        .save();
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-4xl space-y-8" ref={docRef}>
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Documentation</h1>
              <p className="text-muted-foreground">
                Complete technical specification and criteria alignment
              </p>
            </div>
            <Button className="gap-2" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>


        {/* Abstract */}
        <Card className="glass p-6 space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Abstract</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            SentinelMesh is an Autonomous Quantum-Safe Cyber Defense Fabric designed for legacy critical infrastructure.
            It addresses the urgent need for non-intrusive, real-time threat detection and response in operational technology (OT)
            environments where traditional security solutions fail. By combining passive network mirroring, federated machine learning,
            post-quantum cryptography (PQC), decentralized identity (DID), and blockchain-backed audit trails, SentinelMesh delivers
            millisecond detection and autonomous response without disrupting industrial operations.
          </p>
        </Card>

        {/* Introduction */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Introduction</h2>
          <Card className="glass p-6">
            <p className="text-muted-foreground leading-relaxed">
              Critical infrastructure—power grids, water treatment, manufacturing plants, and transportation systems—relies on legacy
              industrial control systems (ICS) and SCADA networks designed decades before modern cyber threats emerged. These environments
              face unique challenges: zero tolerance for downtime, inability to patch systems without operational impact, and protocols
              (Modbus/TCP, OPC UA, DNP3) lacking built-in security.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Traditional cybersecurity approaches fail in OT contexts due to their invasive nature, latency-inducing inspection,
              and assumption of regular updates. Meanwhile, nation-state actors and quantum computing advances threaten to render
              existing cryptographic defenses obsolete. SentinelMesh solves these problems through a revolutionary architecture that
              is non-intrusive, quantum-resistant, and autonomously adaptive.
            </p>
          </Card>
        </section>

        {/* Problem Statement */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Problem Statement</h2>
          <Card className="glass p-6 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">1</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Legacy Infrastructure Vulnerability</h4>
                  <p className="text-sm text-muted-foreground">
                    OT systems cannot be easily upgraded or patched without operational disruption. Many run on decades-old
                    protocols with no authentication or encryption.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">2</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Real-Time Response Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    Industrial processes require sub-second response times. Traditional security tools introduce unacceptable latency
                    and cannot match the speed of automated attacks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">3</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Quantum Threat Horizon</h4>
                  <p className="text-sm text-muted-foreground">
                    Current RSA/ECC cryptography will be broken by quantum computers. Critical infrastructure must prepare for
                    "harvest now, decrypt later" attacks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">4</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Data Privacy & Sovereignty</h4>
                  <p className="text-sm text-muted-foreground">
                    Organizations cannot share operational data due to regulations, competitive concerns, and national security.
                    Yet collaborative threat intelligence is essential.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">5</Badge>
                <div>
                  <h4 className="font-semibold mb-1">Audit & Compliance Challenges</h4>
                  <p className="text-sm text-muted-foreground">
                    Proving security posture to regulators requires immutable, tamper-proof logs. Traditional databases are
                    insufficient for compliance with evolving standards.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Proposed Solution */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Proposed Solution</h2>
          <Card className="glass p-6 space-y-6">
            {[
              {
                num: "1",
                title: "Non-Intrusive Passive Monitoring",
                content: "Network TAPs mirror industrial traffic to SentinelMesh without touching production systems. Zero latency impact, zero configuration changes to legacy equipment."
              },
              {
                num: "2",
                title: "Real-Time Anomaly Detection (< 50ms)",
                content: "Federated learning models trained on multi-site data detect signal manipulation, replay attacks, rogue commands, and protocol violations in milliseconds."
              },
              {
                num: "3",
                title: "Autonomous Response with Safety Guardrails",
                content: "Detected threats trigger immediate actions (isolation, rate-limiting, denylisting) with configurable safe-mode overrides to prevent false-positive disruptions."
              },
              {
                num: "4",
                title: "Digital Twin Predictive Analytics",
                content: "LSTM + Kalman filter models predict normal operational values. Deviations trigger alerts with confidence intervals and explainability."
              },
              {
                num: "5",
                title: "Federated Learning for Privacy-Preserving Collaboration",
                content: "Sites train locally on sensitive data; only model updates (gradients) are shared. Global model improves without exposing raw operations data."
              },
              {
                num: "6",
                title: "Post-Quantum Cryptography (ML-KEM, ML-DSA)",
                content: "PQC algorithms replace RSA/ECC for key exchange and signatures. Future-proof against quantum attacks while maintaining performance."
              },
              {
                num: "7",
                title: "Decentralized Identity (DID) & Zero Trust",
                content: "Every device/operator has a blockchain-anchored DID. Per-session policy checks (time, network, rate-limit) enforce zero-trust architecture."
              },
              {
                num: "8",
                title: "Blockchain-Backed Audit Trail",
                content: "All events logged to immutable ledger with cryptographic hashes. Regulators can independently verify security posture."
              },
              {
                num: "9",
                title: "IPFS Content-Addressed Storage",
                content: "Large artifacts (models, evidence) stored on IPFS with CID-based integrity. Distributed pinning ensures availability and tamper-resistance."
              }
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-4 p-4 bg-primary/5 rounded border border-primary/20">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {item.num}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.content}</p>
                </div>
              </div>
            ))}
          </Card>
        </section>

        {/* Implementation Phases */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Phased Implementation Plan</h2>
          <Card className="glass p-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge>Phase 1</Badge>
                  <span>Passive Monitoring & Baseline (Months 1-3)</span>
                </h4>
                <p className="text-sm text-muted-foreground ml-14">
                  Deploy network TAPs, capture traffic, establish normal baselines, train initial anomaly detection models.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge>Phase 2</Badge>
                  <span>Detection & Digital Twin (Months 4-6)</span>
                </h4>
                <p className="text-sm text-muted-foreground ml-14">
                  Enable real-time detection, build digital twin predictive models, deploy alert mechanisms.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge>Phase 3</Badge>
                  <span>Autonomous Response (Months 7-9)</span>
                </h4>
                <p className="text-sm text-muted-foreground ml-14">
                  Implement safe-mode automated responses, test isolation/rate-limiting, validate with red-team exercises.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge>Phase 4</Badge>
                  <span>PQC & Federation (Months 10-12)</span>
                </h4>
                <p className="text-sm text-muted-foreground ml-14">
                  Roll out PQC handshakes, establish federated learning network, integrate DID/Zero-Trust.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Badge>Phase 5</Badge>
                  <span>Audit & Compliance (Months 13-15)</span>
                </h4>
                <p className="text-sm text-muted-foreground ml-14">
                  Deploy blockchain logging, IPFS storage, conduct compliance audits, obtain certifications.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Expected Outcomes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Expected Outcomes</h2>
          <Card className="glass p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "< 50ms threat detection and response",
                "Zero operational latency impact",
                "99.9% system availability maintained",
                "< 1% false positive rate",
                "100% quantum-resistant communications",
                "Privacy-preserving collaborative learning",
                "Immutable compliance audit trail",
                "Scalable to thousands of sites"
              ].map((outcome, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{outcome}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Conclusion */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Conclusion</h2>
          <Card className="glass p-6">
            <p className="text-muted-foreground leading-relaxed">
              SentinelMesh represents a paradigm shift in critical infrastructure cybersecurity. By combining non-intrusive monitoring,
              millisecond AI detection, autonomous response, federated learning, post-quantum cryptography, and blockchain audit,
              it addresses the unique challenges of legacy OT environments while preparing for quantum threats and regulatory demands.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              This solution is production-ready, scalable, and designed for real-world deployment across energy, manufacturing,
              water, and transportation sectors. It delivers measurable security improvements without disrupting operations,
              making it the ideal choice for protecting the infrastructure our society depends on.
            </p>
          </Card>
        </section>

        {/* Criteria Fit */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Criteria Alignment</h2>
          <div className="flex justify-end mb-4">
            <Link to="/docs/criteria">
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                View Detailed Criteria Matrix
              </Button>
            </Link>
          </div>
          <Card className="glass p-6">
            <p className="text-muted-foreground text-sm mb-4">
              SentinelMesh meets all evaluation criteria through concrete features demonstrated in this platform.
              Visit the Criteria Fit page for a detailed mapping of each rubric item to specific implementation details.
            </p>
          </Card>
        </section>
      </div>
    </div>
  );
}
