import React from "react";
import { useState } from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Shield, Database, FileText, CheckCircle, Search } from "lucide-react";

interface BlockchainEvent {
  id: string;
  blockNumber: number;
  timestamp: number;
  eventType: string;
  hash: string;
  data: {
    anomalyId?: string;
    modelVersion?: string;
    action?: string;
  };
}

interface IPFSContent {
  cid: string;
  name: string;
  size: number;
  status: "pinned" | "retrieving" | "unavailable";
  hash: string;
}

export default function Audit() {
  const [cidSearch, setCidSearch] = useState("");
  const [searchResult, setSearchResult] = useState<IPFSContent | null>(null);

  const blockchainEvents: BlockchainEvent[] = [
    {
      id: "evt-001",
      blockNumber: 1847293,
      timestamp: Date.now() - 3600000,
      eventType: "Anomaly Detected",
      hash: "0x9f2a...e8c3",
      data: { anomalyId: "anomaly-abc123", action: "isolated" }
    },
    {
      id: "evt-002",
      blockNumber: 1847291,
      timestamp: Date.now() - 7200000,
      eventType: "Model Update",
      hash: "0x7d1b...f4a2",
      data: { modelVersion: "v2.4.1" }
    },
    {
      id: "evt-003",
      blockNumber: 1847289,
      timestamp: Date.now() - 10800000,
      eventType: "Response Executed",
      hash: "0x3c8e...b9d1",
      data: { anomalyId: "anomaly-def456", action: "rate-limited" }
    },
    {
      id: "evt-004",
      blockNumber: 1847287,
      timestamp: Date.now() - 14400000,
      eventType: "Federation Round",
      hash: "0x5a6f...c2e7",
      data: { modelVersion: "v2.4.0" }
    }
  ];

  const ipfsExamples: IPFSContent[] = [
    {
      cid: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
      name: "model-v2.4.1.bin",
      size: 45678912,
      status: "pinned",
      hash: "sha256:8f3b...d2c1"
    },
    {
      cid: "QmRv5MZWQFgX5wt4LQr7J3xm8kYPvQ2jWnPcXGdT9fBzNh",
      name: "anomaly-log-20250111.json",
      size: 234567,
      status: "pinned",
      hash: "sha256:1a7c...9e4f"
    },
    {
      cid: "QmT8ZfMYbC9xRv3JnX2Pw8kL4aFbQdHgN1mWcYvS5tEuZp",
      name: "response-evidence-001.bin",
      size: 891234,
      status: "pinned",
      hash: "sha256:6d9e...3f8a"
    }
  ];

  const handleCIDSearch = () => {
    if (cidSearch.trim()) {
      // Simulate IPFS retrieval
      const found = ipfsExamples.find(item => 
        item.cid.toLowerCase().includes(cidSearch.toLowerCase())
      );
      
      if (found) {
        setSearchResult(found);
      } else {
        setSearchResult({
          cid: cidSearch,
          name: "Unknown content",
          size: 0,
          status: "unavailable",
          hash: "Not found"
        });
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pinned": return "status-active";
      case "retrieving": return "status-warning";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Audit & Chain</h1>
          <p className="text-muted-foreground">Blockchain audit trail and IPFS content verification</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Events Logged</span>
                <Database className="h-4 w-4 text-chart-1" />
              </div>
              <div className="text-2xl font-bold">{blockchainEvents.length}</div>
            </div>
          </Card>

          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Latest Block</span>
                <Shield className="h-4 w-4 text-chart-2" />
              </div>
              <div className="text-2xl font-bold">
                {Math.max(...blockchainEvents.map(e => e.blockNumber))}
              </div>
            </div>
          </Card>

          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">IPFS Pins</span>
                <FileText className="h-4 w-4 text-chart-3" />
              </div>
              <div className="text-2xl font-bold">{ipfsExamples.length}</div>
            </div>
          </Card>

          <Card className="glass p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Integrity</span>
                <CheckCircle className="h-4 w-4 text-chart-4" />
              </div>
              <div className="text-2xl font-bold">100%</div>
            </div>
          </Card>
        </div>

        {/* Blockchain Events */}
        <Card className="glass">
          <div className="p-6 border-b border-border/40">
            <h3 className="font-semibold flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Blockchain Audit Trail
            </h3>
          </div>

          <div className="p-6 space-y-3">
            {blockchainEvents.map((event) => (
              <Card key={event.id} className="glass border-glass-border">
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <Badge variant="outline">Block {event.blockNumber}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <h4 className="font-semibold">{event.eventType}</h4>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-sm text-muted-foreground min-w-[80px]">Hash:</span>
                      <span className="text-sm font-mono">{event.hash}</span>
                    </div>

                    {Object.entries(event.data).map(([key, value]) => (
                      <div key={key} className="flex items-start gap-2">
                        <span className="text-sm text-muted-foreground min-w-[80px] capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <span className="text-sm font-mono">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* IPFS Explorer */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* CID Search */}
          <Card className="glass">
            <div className="p-6 border-b border-border/40">
              <h3 className="font-semibold flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                IPFS CID Lookup
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cid-search">Enter CID</Label>
                <div className="flex gap-2">
                  <Input
                    id="cid-search"
                    placeholder="QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
                    value={cidSearch}
                    onChange={(e) => setCidSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCIDSearch()}
                    className="font-mono text-sm"
                  />
                  <Button onClick={handleCIDSearch}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {searchResult && (
                <Card className="glass border-glass-border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Search Result</h4>
                    <Badge className={getStatusColor(searchResult.status)}>
                      {searchResult.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">CID:</span>
                      <div className="font-mono mt-1 break-all">{searchResult.cid}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <div className="font-medium mt-1">{searchResult.name}</div>
                    </div>
                    {searchResult.size > 0 && (
                      <div>
                        <span className="text-muted-foreground">Size:</span>
                        <div className="font-mono mt-1">{(searchResult.size / 1024 / 1024).toFixed(2)} MB</div>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Hash:</span>
                      <div className="font-mono mt-1">{searchResult.hash}</div>
                    </div>
                  </div>

                  {searchResult.status === "pinned" && (
                    <div className="pt-2 border-t border-border/40">
                      <div className="flex items-center gap-2 text-success text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>Content verified and available</span>
                      </div>
                    </div>
                  )}
                </Card>
              )}

              <div className="pt-4 border-t border-border/40">
                <h4 className="text-sm font-semibold mb-2">Try these CIDs:</h4>
                <div className="space-y-1">
                  {ipfsExamples.map((item) => (
                    <button
                      key={item.cid}
                      onClick={() => {
                        setCidSearch(item.cid);
                        setSearchResult(item);
                      }}
                      className="text-xs font-mono text-primary hover:underline block truncate w-full text-left"
                    >
                      {item.cid}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          {/* Pinned Content */}
          <Card className="glass">
            <div className="p-6 border-b border-border/40">
              <h3 className="font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Pinned Content
              </h3>
            </div>

            <div className="p-6 space-y-3">
              {ipfsExamples.map((item) => (
                <Card key={item.cid} className="glass border-glass-border p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{item.name}</h4>
                      <p className="text-xs font-mono text-muted-foreground truncate mt-1">
                        {item.cid}
                      </p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm pt-2 border-t border-border/40">
                    <span className="text-muted-foreground">
                      {(item.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.hash}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="glass p-6">
          <h3 className="font-semibold mb-4">Immutable Audit Architecture</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-primary/5 rounded border border-primary/20 space-y-2">
              <div className="font-semibold">Blockchain Logging</div>
              <p className="text-sm text-muted-foreground">
                All security events, anomalies, responses, and model updates are logged to an
                immutable blockchain. Each entry includes cryptographic hashes ensuring tamper-proof audit trails.
              </p>
            </div>

            <div className="p-4 bg-primary/5 rounded border border-primary/20 space-y-2">
              <div className="font-semibold">IPFS Storage</div>
              <p className="text-sm text-muted-foreground">
                Large artifacts (model files, evidence bundles) are stored on IPFS with content-addressed
                identifiers (CIDs). Integrity is verified through cryptographic hashing, and content
                remains available through distributed pinning.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
