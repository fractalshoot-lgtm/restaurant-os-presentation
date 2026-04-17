import { Screen } from "../Screen";
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  RotateCw,
  ChevronRight,
  ListChecks,
  Home,
  GitBranch,
} from "lucide-react";

const T = {
  bg: "#F8FAFC",
  card: "#FFFFFF",
  navy: "#0F172A",
  accent: "#22C55E",
  text: "#0F172A",
  textMuted: "#64748B",
  textLight: "#FFFFFF",
  border: "#E2E8F0",
  shadow: "0 2px 14px rgba(0,0,0,0.06)",
  shadowMd: "0 4px 24px rgba(0,0,0,0.14)",
};

function colorPct(pct: number) {
  if (pct >= 80) return "#4ade80";
  if (pct >= 50) return "#f59e0b";
  return "#ef4444";
}

function RingProgress({ pct }: { pct: number }) {
  const size = 64;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const off = circ - (pct / 100) * circ;
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 18,
        padding: "14px 12px",
        boxShadow: T.shadow,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", width: size, height: size, marginBottom: 8 }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.border} strokeWidth={stroke} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={colorPct(pct)}
            strokeWidth={stroke}
            strokeDasharray={circ}
            strokeDashoffset={off}
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: T.text,
            fontSize: 13,
            fontWeight: 800,
          }}
        >
          {pct}%
        </div>
      </div>
      <div style={{ color: T.textMuted, fontSize: 13 }}>Progress</div>
    </div>
  );
}

function StatCard({
  Icon,
  color,
  title,
  value,
}: {
  Icon: typeof ClipboardList;
  color: string;
  title: string;
  value: number | string;
}) {
  return (
    <div
      style={{
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 18,
        padding: "14px 12px",
        boxShadow: T.shadow,
      }}
    >
      <Icon size={20} color={color} style={{ marginBottom: 8 }} />
      <div
        style={{
          color: T.text,
          fontSize: 28,
          fontWeight: 800,
          lineHeight: 1,
          marginBottom: 4,
        }}
      >
        {value}
      </div>
      <div style={{ color: T.textMuted, fontSize: 13 }}>{title}</div>
    </div>
  );
}

function AreaRow({ name, done, total, blocked = 0 }: { name: string; done: number; total: number; blocked?: number }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ color: T.text, fontSize: 14 }}>{name}</span>
        <span style={{ color: T.textMuted, fontSize: 13 }}>
          {done}/{total}
          {blocked > 0 && (
            <span style={{ color: "#ef4444", marginLeft: 8 }}>❌ {blocked}</span>
          )}
        </span>
      </div>
      <div
        style={{
          background: "rgba(0,0,0,0.07)",
          borderRadius: 6,
          overflow: "hidden",
          height: 6,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: colorPct(pct),
            borderRadius: 6,
          }}
        />
      </div>
    </div>
  );
}

export function DashboardScreen() {
  return (
    <Screen topPad={52}>
      {/* Header */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <h1 style={{ color: T.text, margin: 0, fontSize: 26, fontWeight: 700 }}>Dashboard</h1>
            <div style={{ color: T.textMuted, fontSize: 13, marginTop: 2 }}>Thursday, April 23</div>
          </div>
          <div
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              color: T.text,
              borderRadius: 20,
              padding: "8px 14px",
              boxShadow: T.shadow,
              display: "flex",
              alignItems: "center",
            }}
          >
            <RotateCw size={16} />
          </div>
        </div>
      </div>

      {/* Day selector */}
      <div style={{ padding: "8px 20px 18px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span style={{ color: T.navy, fontSize: 15, fontWeight: 700 }}>Full Week</span>
          <div
            style={{
              background: T.navy,
              display: "flex",
              alignItems: "center",
              gap: 4,
              color: "#ffffff",
              fontSize: 15,
              fontWeight: 700,
              padding: "6px 14px",
              borderRadius: 20,
            }}
          >
            View all <ChevronRight size={14} />
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => {
            const today = i === 3;
            return (
              <div key={d} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <span style={{ color: T.textMuted, fontSize: 11 }}>{d}</span>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: today ? T.navy : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: today ? T.textLight : T.text,
                    fontWeight: today ? 700 : 400,
                    fontSize: 14,
                  }}
                >
                  {20 + i}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "0 14px" }}>
        {/* Production Review — dark navy card */}
        <div
          style={{
            background: T.navy,
            borderRadius: 20,
            padding: "20px 22px",
            marginBottom: 14,
            boxShadow: T.shadowMd,
          }}
        >
          <div style={{ color: "#ffffff", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
            Production Review
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 13,
              lineHeight: 1.35,
              marginBottom: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <CheckCircle2 size={15} color="#4ade80" />
            Today&apos;s review is complete
          </div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              border: "1px solid rgba(255,255,255,0.3)",
              color: T.textLight,
              borderRadius: 20,
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            View report
            <ChevronRight size={13} />
          </div>
        </div>

        {/* 2x2 stat grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          <StatCard Icon={ClipboardList} color="#60a5fa" title="Today's Tasks" value={31} />
          <RingProgress pct={74} />
          <StatCard Icon={CheckCircle2} color="#4ade80" title="Done" value={23} />
          <StatCard Icon={XCircle} color="#ef4444" title="Blocked" value={2} />
        </div>

        {/* By area */}
        <div
          style={{
            background: T.card,
            borderRadius: 20,
            padding: "16px 18px",
            marginBottom: 16,
            boxShadow: T.shadow,
            border: `1px solid ${T.border}`,
          }}
        >
          <h2
            style={{
              color: T.textMuted,
              margin: "0 0 14px",
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.2,
            }}
          >
            By area
          </h2>
          <AreaRow name="Cold Prep" done={8} total={10} />
          <AreaRow name="Proteins" done={6} total={7} />
          <AreaRow name="Salsas" done={3} total={5} blocked={1} />
        </div>
      </div>

      <BottomNav active="home" />
    </Screen>
  );
}

export function BottomNav({ active }: { active: "tasks" | "home" | "workflows" }) {
  const items = [
    { key: "tasks", label: "Tasks", Icon: ListChecks, isCentral: false },
    { key: "home", label: "Home", Icon: Home, isCentral: true },
    { key: "workflows", label: "Workflows", Icon: GitBranch, isCentral: false },
  ] as const;

  return (
    <div
      style={{
        marginTop: "auto",
        background: "#0F172A",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        zIndex: 200,
        height: 68,
        overflow: "visible",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      {items.map((p) => {
        const isActive = p.key === active;
        if (p.isCentral) {
          return (
            <div
              key={p.key}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                overflow: "visible",
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#22C55E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(34,197,94,0.45)",
                  position: "absolute",
                  bottom: 6,
                  border: "3px solid #0F172A",
                }}
              >
                <p.Icon size={24} color="#1b2537" />
              </div>
            </div>
          );
        }
        return (
          <div
            key={p.key}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "4px 0 6px",
            }}
          >
            <p.Icon size={22} color={isActive ? "#ffffff" : "rgba(255,255,255,0.4)"} />
            <span
              style={{
                fontSize: 11,
                color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)",
                fontWeight: isActive ? 600 : 400,
              }}
            >
              {p.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
