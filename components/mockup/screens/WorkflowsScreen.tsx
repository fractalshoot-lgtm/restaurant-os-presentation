import { Screen } from "../Screen";
import { BottomNav } from "./DashboardScreen";

const T = {
  card: "#FFFFFF",
  navy: "#0F172A",
  accent: "#22C55E",
  muted: "#64748B",
  sub: "#94A3B8",
  border: "#E2E8F0",
};

const guides = [
  { icon: "🌅", title: "Generator Flow", desc: "Each morning at midnight, tasks are created automatically.", open: true },
  { icon: "📅", title: "Weekly Planning", desc: "Every Monday, next week populates itself.", open: false },
  { icon: "🤖", title: "Telegram Bot", desc: "Ask /reporte, /produccion, /criticas, /semanal.", open: true },
  { icon: "✅", title: "Approval Flow", desc: "Blocked tasks notify all managers for approve/reject.", open: false },
];

const commands = [
  { cmd: "/reporte", label: "Today's compliance" },
  { cmd: "/produccion", label: "Production review report" },
  { cmd: "/criticas", label: "Only critical tasks" },
  { cmd: "/semanal", label: "Week analysis" },
];

export function WorkflowsScreen() {
  return (
    <Screen>
      <div style={{ padding: "8px 18px 12px" }}>
        <div style={{ color: T.sub, fontSize: 12, letterSpacing: 1, fontWeight: 600 }}>
          ONBOARDING
        </div>
        <div style={{ color: T.navy, fontSize: 26, fontWeight: 700, marginTop: 2 }}>
          User Guide
        </div>
      </div>

      <div style={{ padding: "0 14px", flex: 1, overflowY: "hidden" }}>
        {guides.map((g, i) => (
          <div
            key={i}
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 14,
              padding: "12px 14px",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 18 }}>{g.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{g.title}</div>
              </div>
              <div style={{ color: T.muted, fontSize: 14 }}>{g.open ? "⌄" : "›"}</div>
            </div>
            {g.open && (
              <div style={{ fontSize: 12, color: T.muted, marginTop: 8, lineHeight: 1.4 }}>
                {g.desc}
              </div>
            )}
          </div>
        ))}

        <div
          style={{
            marginTop: 6,
            padding: "12px 14px",
            background: T.navy,
            borderRadius: 14,
            color: "#fff",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, opacity: 0.6 }}>
            BOT COMMANDS
          </div>
          {commands.map((c) => (
            <div
              key={c.cmd}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                fontSize: 12,
              }}
            >
              <code style={{ color: "#22C55E", fontWeight: 600 }}>{c.cmd}</code>
              <span style={{ color: "#94A3B8" }}>{c.label}</span>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="more" />
    </Screen>
  );
}
