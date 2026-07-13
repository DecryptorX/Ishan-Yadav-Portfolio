"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DebugAuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#09090b", color: "#00ff88", fontFamily: "monospace" }}>
        Loading session...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#09090b", color: "#ff5f56", fontFamily: "monospace" }}>
        Not authenticated. <a href="/login" style={{ color: "#00ff88", marginLeft: 8 }}>Sign in</a>
      </div>
    );
  }

  const user = session.user as any;

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#09090b", padding: "2rem" }}>
      <div style={{
        background: "rgba(17,17,17,0.9)",
        border: "1px solid rgba(0,255,136,0.2)",
        borderRadius: "1.5rem",
        padding: "2.5rem 2rem",
        maxWidth: "520px",
        width: "100%",
        fontFamily: "monospace",
      }}>
        <div style={{ color: "#ff5f56", fontSize: "0.7rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
          ⚠ Temporary Debug Page — Remove After Use
        </div>

        <h1 style={{ color: "#f1f5f9", fontSize: "1.4rem", fontWeight: 800, marginBottom: "2rem", letterSpacing: "-0.03em" }}>
          LinkedIn Auth Debug
        </h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <Field label="Provider Account ID" value={user.id || "N/A"} />
          <Field label="Profile Sub" value={user.profileSub || "N/A"} />
          <Field label="Name" value={user.name || "N/A"} />
          <Field label="Email" value={user.email || "N/A"} />
        </div>

        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: "2rem",
            width: "100%",
            padding: "0.7rem",
            borderRadius: "0.5rem",
            background: "rgba(0,255,136,0.08)",
            border: "1px solid rgba(0,255,136,0.2)",
            color: "#00ff88",
            fontWeight: 700,
            fontSize: "0.85rem",
            cursor: "pointer",
            fontFamily: "monospace",
          }}
        >
          → Continue to Homepage
        </button>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ color: "rgba(148,163,184,0.6)", fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.3rem" }}>
        {label}
      </div>
      <div style={{
        color: "#00ff88",
        fontSize: "1rem",
        fontWeight: 600,
        padding: "0.5rem 0.75rem",
        background: "rgba(0,255,136,0.04)",
        border: "1px solid rgba(0,255,136,0.1)",
        borderRadius: "0.4rem",
        wordBreak: "break-all",
        userSelect: "all",
        cursor: "text",
      }}>
        {value}
      </div>
    </div>
  );
}
