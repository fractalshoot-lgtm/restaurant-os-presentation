import { Screen } from "../Screen";
import { BottomNav } from "./DashboardScreen";

const AREA_ICONS: Record<string, string> = {
  "Cold Prep": "❄️",
  Desserts: "🍮",
  Marinations: "🫙",
  Orders: "📋",
  Portions: "⚖️",
  Proteins: "🍗",
  Pulls: "🥩",
  Salsas: "🌶️",
  Soups: "🥣",
};

const PRIORITY_COLOR: Record<string, string> = {
  Critical: "#ef4444",
  Production: "#f0883e",
  Extra: "#64748b",
};

type Task = {
  id: string;
  name: string;
  area: keyof typeof AREA_ICONS;
  time: number;
  priority: "Critical" | "Production" | "Extra";
  status: "pending" | "done" | "blocked";
  by?: string;
  qty?: string;
  reason?: string;
  reschedule?: string;
};

const TASKS: Task[] = [
  { id: "1", name: "Barbacoa Marinated", area: "Proteins", time: 60, priority: "Critical", status: "done", by: "Aniris", qty: "8 kg" },
  { id: "2", name: "Pickled Onions", area: "Cold Prep", time: 30, priority: "Production", status: "done", by: "Chef", qty: "2 bins" },
  { id: "3", name: "Salsa Macha Oil", area: "Salsas", time: 10, priority: "Critical", status: "pending" },
  { id: "4", name: "Churros", area: "Desserts", time: 30, priority: "Extra", status: "pending" },
  { id: "5", name: "Fish for taco Portions", area: "Portions", time: 45, priority: "Critical", status: "blocked", reason: "delayed supplier", reschedule: "Apr 24" },
];

export function TareasScreen() {
  const total = TASKS.length;
  const done = TASKS.filter((t) => t.status === "done").length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const badgeBg = pct >= 80 ? "#DCFCE7" : pct >= 50 ? "#FEF9C3" : "#FEE2E2";
  const badgeColor = pct >= 80 ? "#22c55e" : pct >= 50 ? "#f59e0b" : "#ef4444";
  const barColor = badgeColor;

  return (
    <Screen topPad={52}>
      {/* Header */}
      <header
        style={{
          background: "#FFFFFF",
          padding: "20px 16px 16px",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ color: "#0F172A", margin: 0, fontSize: 22, fontWeight: 800 }}>Shift Tasks</h1>
            <p style={{ color: "#64748B", fontSize: 13, margin: "2px 0 0" }}>Thursday, April 23</p>
          </div>
          <div
            style={{
              background: badgeBg,
              borderRadius: 12,
              padding: "6px 14px",
              textAlign: "center",
              minWidth: 56,
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: badgeColor }}>{pct}%</div>
            <div style={{ fontSize: 11, color: "#94A3B8" }}>
              {done}/{total}
            </div>
          </div>
        </div>
        <div
          style={{
            background: "#F1F5F9",
            borderRadius: 10,
            overflow: "hidden",
            height: 6,
            marginTop: 12,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${pct}%`,
              background: barColor,
              borderRadius: 10,
            }}
          />
        </div>
      </header>

      {/* Task list */}
      <main style={{ padding: "12px 14px", flex: 1 }}>
        {TASKS.map((t) => {
          const done = t.status === "done";
          const blocked = t.status === "blocked";
          const color = PRIORITY_COLOR[t.priority];
          const icon = AREA_ICONS[t.area] ?? "🍽️";
          const cardBg = done ? "#F0FDF4" : blocked ? "#FEF2F2" : "#FFFFFF";
          const btnBg = done ? "#86EFAC" : blocked ? "#FCA5A5" : color;
          const btnColor = done || blocked ? "#6B7280" : "#fff";

          return (
            <div
              key={t.id}
              style={{
                background: cardBg,
                border: "1px solid #E2E8F0",
                borderRadius: 14,
                padding: "12px 14px",
                marginBottom: 10,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                opacity: done || blocked ? 0.85 : 1,
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              }}
            >
              {/* Left: priority badge + area icon */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    background: done ? "#22c55e" : color,
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 0.4,
                    padding: "2px 7px",
                    borderRadius: 20,
                  }}
                >
                  {t.priority}
                </span>
                <span style={{ fontSize: 22, lineHeight: 1 }}>{icon}</span>
              </div>

              {/* Center */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    color: "#0F172A",
                    fontSize: 14,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {t.name}
                </div>
                <div style={{ color: "#64748B", fontSize: 12, marginTop: 2 }}>{t.area}</div>
                <div style={{ color: "#94A3B8", fontSize: 11, marginTop: 2 }}>⏱ {t.time} min</div>
                {done && t.by && (
                  <div style={{ color: "#22c55e", fontSize: 11, marginTop: 4, fontWeight: 600 }}>
                    ✓ {t.by}
                    {t.qty ? ` · ${t.qty}` : ""}
                  </div>
                )}
                {blocked && (
                  <div style={{ color: "#e74c3c", fontSize: 11, marginTop: 4, fontWeight: 600 }}>
                    ✗ {t.reason} · 📅 {t.reschedule}
                  </div>
                )}
              </div>

              {/* Right action button */}
              <div
                style={{
                  background: btnBg,
                  color: btnColor,
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {done ? "✓" : blocked ? "✗" : "→"}
              </div>
            </div>
          );
        })}
      </main>

      <BottomNav active="tasks" />
    </Screen>
  );
}
