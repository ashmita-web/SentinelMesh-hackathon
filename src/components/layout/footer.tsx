import * as React from "react";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-auto">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">SentinelMesh</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Autonomous Quantum-Safe Cyber Defense for Critical Infrastructure
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/demo" className="text-muted-foreground hover:text-primary transition-smooth">
                  Demo Console
                </Link>
              </li>
              <li>
                <Link to="/twin" className="text-muted-foreground hover:text-primary transition-smooth">
                  Digital Twin
                </Link>
              </li>
              <li>
                <Link to="/federation" className="text-muted-foreground hover:text-primary transition-smooth">
                  Federated Learning
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Security</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/trust" className="text-muted-foreground hover:text-primary transition-smooth">
                  Trust & Identity
                </Link>
              </li>
              <li>
                <Link to="/audit" className="text-muted-foreground hover:text-primary transition-smooth">
                  Audit & Chain
                </Link>
              </li>
              <li>
                <Link to="/anomalies" className="text-muted-foreground hover:text-primary transition-smooth">
                  Anomalies
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/docs" className="text-muted-foreground hover:text-primary transition-smooth">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-smooth">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 SentinelMesh. Built for quantum-safe future.
          </p>
        </div>
      </div>
    </footer>
  );
}
