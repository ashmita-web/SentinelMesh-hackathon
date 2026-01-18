import React from "react";
import { useState } from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Shield, CheckCircle, XCircle, AlertCircle, Key, FileText } from "lucide-react";

interface DIDDocument {
  id: string;
  name: string;
  did: string;
  publicKey: string;
  authMethods: string[];
  status: "verified" | "pending" | "revoked";
  created: number;
}

interface SessionCheck {
  id: string;
  user: string;
  timestamp: number;
  policies: Array<{
    name: string;
    passed: boolean;
    reason: string;
  }>;
  overallStatus: "pass" | "fail";
}

export default function Trust() {
  const [selectedDID, setSelectedDID] = useState<string | null>(null);
  const [sessionChecks, setSessionChecks] = useState<SessionCheck[]>([]);

  const didRegistry: DIDDocument[] = [
    {
      id: "did-01",
      name: "Control System A",
      did: "did:sentinel:Qm...abc123",
      publicKey: "0x742d...35Bc",
      authMethods: ["ML-DSA-65", "Ed25519"],
      status: "verified",
      created: Date.now() - 86400000 * 7
    },
    {
      id: "did-02",
      name: "Operator Workstation",
      did: "did:sentinel:Qm...def456",
      publicKey: "0x8a9f...72Cd",
      authMethods: ["ML-DSA-87", "ECDSA"],
      status: "verified",
      created: Date.now() - 86400000 * 3
    },
    {
      id: "did-03",
      name: "Remote SCADA Gateway",
      did: "did:sentinel:Qm...ghi789",
      publicKey: "0x1c2e...94De",
      authMethods: ["ML-DSA-65"],
      status: "pending",
      created: Date.now() - 86400000
    }
  ];

  const runSessionCheck = () => {
    const policies = [
      { name: "Valid DID", passed: true, reason: "DID verified against registry" },
      { name: "PQC Signature", passed: true, reason: "ML-DSA signature valid" },
      { name: "Time-based Access", passed: true, reason: "Within allowed hours" },
      { name: "Network Segment", passed: Math.random() > 0.3, reason: Math.random() > 0.3 ? "Authorized subnet" : "Request from unauthorized segment" },
      { name: "Rate Limit", passed: true, reason: "Within request threshold" }
    ];

    const newCheck: SessionCheck = {
      id: `check-${Date.now()}`,
      user: "operator-001",
      timestamp: Date.now(),
      policies,
      overallStatus: policies.every(p => p.passed) ? "pass" : "fail"
    };

    setSessionChecks([newCheck, ...sessionChecks.slice(0, 9)]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "status-active";
      case "pending": return "status-warning";
      case "revoked": return "status-critical";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const selectedDIDData = didRegistry.find(d => d.id === selectedDID);

  return (
    <div className="min-h-screen py-8">
      <div className="container space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Trust & Identity</h1>
          <p className="text-muted-foreground">Decentralized identity and zero-trust session management</p>
        </div>

        {/* DID Registry */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">DID Registry</h2>
              <Badge variant="outline">{didRegistry.length} DIDs</Badge>
            </div>

            <div className="space-y-2">
              {didRegistry.map((did) => (
                <Card
                  key={did.id}
                  className={`glass cursor-pointer transition-smooth hover:scale-[1.02] ${
                    selectedDID === did.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedDID(did.id)}
                >
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold">{did.name}</h4>
                        <p className="text-xs font-mono text-muted-foreground mt-1">
                          {did.did}
                        </p>
                      </div>
                      <Badge className={getStatusColor(did.status)}>
                        {did.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* DID Details */}
          <div className="lg:col-span-2 space-y-4">
            {selectedDIDData ? (
              <Card className="glass">
                <div className="p-6 border-b border-border/40">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">{selectedDIDData.name}</h2>
                      <p className="text-sm text-muted-foreground">
                        Created {new Date(selectedDIDData.created).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(selectedDIDData.status)}>
                      {selectedDIDData.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* DID */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">Decentralized Identifier (DID)</h3>
                    </div>
                    <div className="p-3 bg-muted/30 rounded border border-border/40 font-mono text-sm break-all">
                      {selectedDIDData.did}
                    </div>
                  </div>

                  {/* Public Key */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">Public Key</h3>
                    </div>
                    <div className="p-3 bg-muted/30 rounded border border-border/40 font-mono text-sm break-all">
                      {selectedDIDData.publicKey}
                    </div>
                  </div>

                  {/* Authentication Methods */}
                  <div>
                    <h3 className="font-semibold mb-3">Verification Methods</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDIDData.authMethods.map((method) => (
                        <Badge key={method} variant="outline" className="font-mono">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* DID Document */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold">DID Document</h3>
                    </div>
                    <div className="p-4 bg-muted/30 rounded border border-border/40">
                      <pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
{`{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "${selectedDIDData.did}",
  "verificationMethod": [{
    "id": "${selectedDIDData.did}#keys-1",
    "type": "ML-DSA-65-2019",
    "controller": "${selectedDIDData.did}",
    "publicKeyHex": "${selectedDIDData.publicKey}"
  }],
  "authentication": ["${selectedDIDData.did}#keys-1"],
  "assertionMethod": ["${selectedDIDData.did}#keys-1"]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="glass p-12">
                <div className="text-center text-muted-foreground">
                  <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Select a DID to view details and verification methods</p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Zero-Trust Session Checks */}
        <Card className="glass">
          <div className="p-6 border-b border-border/40">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Zero-Trust Session Verification
              </h3>
              <Button onClick={runSessionCheck} className="gap-2">
                <Shield className="h-4 w-4" />
                Run Session Check
              </Button>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {sessionChecks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No session checks performed yet. Click "Run Session Check" to evaluate policies.</p>
              </div>
            ) : (
              sessionChecks.map((check) => (
                <Card key={check.id} className="glass border-glass-border">
                  <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">User: {check.user}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(check.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <Badge className={check.overallStatus === "pass" ? "status-active" : "status-critical"}>
                        {check.overallStatus === "pass" ? "ACCESS GRANTED" : "ACCESS DENIED"}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      {check.policies.map((policy, index) => (
                        <div
                          key={index}
                          className={`flex items-start gap-3 p-3 rounded border ${
                            policy.passed
                              ? "bg-success/10 border-success/20"
                              : "bg-destructive/10 border-destructive/20"
                          }`}
                        >
                          {policy.passed ? (
                            <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-medium">{policy.name}</div>
                            <div className="text-sm text-muted-foreground">{policy.reason}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </Card>

        {/* How It Works */}
        <Card className="glass p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            Zero-Trust Architecture
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/5 rounded border border-primary/20 space-y-2">
              <div className="font-semibold">Decentralized Identity (DID)</div>
              <p className="text-sm text-muted-foreground">
                Each device and operator has a cryptographic identity anchored on-chain.
                No central authority controls authentication—verification is distributed and tamper-proof.
              </p>
            </div>

            <div className="p-4 bg-primary/5 rounded border border-primary/20 space-y-2">
              <div className="font-semibold">Policy-Based Access Control</div>
              <p className="text-sm text-muted-foreground">
                Every request is evaluated against multiple policies: time-based access, network segment,
                rate limiting, and cryptographic signatures. All checks must pass for access to be granted.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
