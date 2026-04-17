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

const SECTIONS = [
  {
    emoji: "🌅",
    title: "Daily task generator",
    tag: "Auto",
    tagColor: "#DCFCE7",
    tagText: "#16A34A",
    open: true,
    body:
      "Each morning at midnight, the day's tasks are created automatically from the templates. No manual setup. Your team opens the app and sees today's list.",
  },
  {
    emoji: "📅",
    title: "Weekly planning",
    tag: "Auto",
    tagColor: "#DCFCE7",
    tagText: "#16A34A",
    open: false,
  },
  {
    emoji: "🤖",
    title: "Telegram bot",
    tag: "On demand",
    tagColor: "#DBEAFE",
    tagText: "#1D4ED8",
    open: true,
    body:
      "Ask for reports, check critical tasks, approve rescheduled items — all from Telegram without opening the app.",
  },
  {
    emoji: "✅",
    title: "Approval flow",
    open: false,
  },
];

const COMMANDS = [
  { cmd: "/reporte", label: "Today's compliance" },
  { cmd: "/produccion", label: "Morning review" },
  { cmd: "/criticas", label: "Critical tasks only" },
  { cmd: "/semanal", label: "Week analysis" },
];

export function WorkflowsScreen() {
  return (
    <Screen topPad={52}>
      {/* Header */}
      <div
        style={{
          background: T.card,
          padding: "20px 20px 14px",
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <h1 style={{ color: T.navy, fontSize: 22, margin: 0, fontWeight: 700 }}>User Guide</h1>
        <p style={{ color: T.muted, fontSize: 12, margin: "2px 0 0" }}>
          How RestaurantOS works — tap each section to expand
        </p>
      </div>

      <div style={{ padding: "14px 14px", flex: 1, overflow: "hidden" }}>
        {/* Intro banner */}
        <div
          style={{
            background: "#F0FDF4",
            border: "1px solid #86EFAC",
            borderRadius: 14,
            padding: "12px 14px",
            marginBottom: 12,
          }}
        >
          <div style={{ color: "#16A34A", fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
            🌮 What is RestaurantOS?
          </div>
          <div style={{ color: "#166534", fontSize: 12, lineHeight: 1.45 }}>
            One system for prep tasks, reviews and approvals — across a{" "}
            <span
              style={{
                background: "#DBEAFE",
                color: "#1D4ED8",
                padding: "1px 5px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              📱 web app
            </span>{" "}
            and a{" "}
            <span
              style={{
                background: "#EDE9FE",
                color: "#6D28D9",
                padding: "1px 5px",
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
              }}
            >
              🤖 bot
            </span>
            .
          </div>
        </div>

        {/* Accordion sections */}
        {SECTIONS.map((s, i) => (
          <div
            key={i}
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 14,
              marginBottom: 8,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "12px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
                <span style={{ fontSize: 18 }}>{s.emoji}</span>
                <span style={{ color: T.navy, fontSize: 13, fontWeight: 700 }}>{s.title}</span>
                {s.tag && (
                  <span
                    style={{
                      background: s.tagColor,
                      color: s.tagText,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "2px 7px",
                      borderRadius: 10,
                    }}
                  >
                    {s.tag}
                  </span>
                )}
              </div>
              <span style={{ color: s.open ? T.accent : T.muted, fontSize: 14 }}>
                {s.open ? "▲" : "▼"}
              </span>
            </div>
            {s.open && s.body && (
              <div
                style={{
                  padding: "0 14px 14px",
                  borderTop: `1px solid ${T.border}`,
                }}
              >
                <div
                  style={{
                    color: T.muted,
                    fontSize: 12,
                    lineHeight: 1.45,
                    marginTop: 12,
                  }}
                >
                  {s.body}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Bot commands block */}
        <div
          style={{
            marginTop: 8,
            padding: "14px 16px",
            background: T.navy,
            borderRadius: 14,
            color: "#fff",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              opacity: 0.5,
              marginBottom: 6,
            }}
          >
            BOT COMMANDS
          </div>
          {COMMANDS.map((c) => (
            <div
              key={c.cmd}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "7px 0",
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

      <BottomNav active="workflows" />
    </Screen>
  );
}
