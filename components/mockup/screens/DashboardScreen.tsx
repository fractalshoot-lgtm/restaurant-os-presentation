import { Screen } from "../Screen";
import { areaSummary } from "@/lib/demo-data";

const T = {
  bg: "#F8FAFC",
  card: "#FFFFFF",
  navy: "#0F172A",
  accent: "#22C55E",
  muted: "#64748B",
  sub: "#94A3B8",
  border: "#E2E8F0",
};

function ProgressRing({ value }: { value: number }) {
  const radius = 52;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={130} height={130} viewBox="0 0 130 130">
      <circle cx={65} cy={65} r={radius} fill="none" stroke="#E2E8F0" strokeWidth={10} />
      <circle
        cx={65}
        cy={65}
        r={radius}
        fill="none"
        stroke="#22C55E"
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 65 65)"
      />
      <text
        x={65}
        y={68}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#0F172A"
        fontSize={28}
        fontWeight={700}
      >
        {value}%
      </text>
      <text
        x={65}
        y={90}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#64748B"
        fontSize={11}
        fontWeight={500}
      >
        done today
      </text>
    </svg>
  );
}

export function DashboardScreen() {
  return (
    <Screen>
      {/* Header */}
      <div style={{ padding: "8px 18px 16px" }}>
        <div style={{ color: T.sub, fontSize: 12, letterSpacing: 1, fontWeight: 600 }}>
          THURSDAY · APR 23
        </div>
        <div style={{ color: T.navy, fontSize: 26, fontWeight: 700, marginTop: 2 }}>
          Dashboard
        </div>
      </div>

      {/* Progress hero */}
      <div
        style={{
          margin: "0 18px 16px",
          padding: 22,
          background: T.card,
          borderRadius: 20,
          border: `1px solid ${T.border}`,
          boxShadow: "0 2px 14px rgba(0,0,0,0.04)",
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <ProgressRing value={74} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, color: T.muted }}>Progress</div>
          <div style={{ fontSize: 15, color: T.navy, fontWeight: 600, marginTop: 2 }}>
            23 of 31 tasks
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                background: "#DCFCE7",
                color: "#16A34A",
                padding: "3px 8px",
                borderRadius: 999,
              }}
            >
              18 done
            </span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                background: "#FEE2E2",
                color: "#DC2626",
                padding: "3px 8px",
                borderRadius: 999,
              }}
            >
              2 blocked
            </span>
          </div>
        </div>
      </div>

      {/* Production Review card */}
      <div
        style={{
          margin: "0 18px 16px",
          padding: "16px 18px",
          background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
          borderRadius: 18,
          color: "#FFFFFF",
          boxShadow: "0 4px 16px rgba(34,197,94,0.3)",
        }}
      >
        <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.85, letterSpacing: 0.5 }}>
          MORNING REVIEW
        </div>
        <div style={{ fontSize: 18, fontWeight: 700, marginTop: 3 }}>Production Review</div>
        <div style={{ fontSize: 12, marginTop: 4, opacity: 0.9 }}>
          23 required · 2 skipped · by Chef · 08:12
        </div>
      </div>

      {/* Area breakdown */}
      <div style={{ padding: "0 18px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: T.navy,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            marginBottom: 10,
          }}
        >
          BY AREA
        </div>
        {areaSummary.map((a) => {
          const pct = Math.round((a.done / a.total) * 100);
          return (
            <div
              key={a.area}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderRadius: 12,
                padding: "10px 14px",
                marginBottom: 8,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{a.area}</div>
                <div style={{ fontSize: 12, color: T.muted }}>
                  {a.done}/{a.total}
                </div>
              </div>
              <div
                style={{
                  marginTop: 6,
                  height: 5,
                  background: "#F1F5F9",
                  borderRadius: 999,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: T.accent,
                    borderRadius: 999,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom nav */}
      <BottomNav active="home" />
    </Screen>
  );
}

export function BottomNav({ active }: { active: "home" | "tasks" | "week" | "more" }) {
  const items = [
    { key: "home", label: "Home", icon: "🏠" },
    { key: "tasks", label: "Tasks", icon: "☰" },
    { key: "week", label: "Week", icon: "📅" },
    { key: "more", label: "More", icon: "•••" },
  ];
  return (
    <div
      style={{
        marginTop: "auto",
        background: "#FFFFFF",
        borderTop: `1px solid ${T.border}`,
        padding: "10px 0 18px",
        display: "flex",
        justifyContent: "space-around",
      }}
    >
      {items.map((i) => (
        <div
          key={i.key}
          style={{
            textAlign: "center",
            fontSize: 10,
            fontWeight: 600,
            color: i.key === active ? T.accent : T.sub,
            letterSpacing: 0.3,
          }}
        >
          <div style={{ fontSize: 18, marginBottom: 2 }}>{i.icon}</div>
          {i.label}
        </div>
      ))}
    </div>
  );
}
