import { Screen } from "../Screen";
import { Search } from "lucide-react";

const T = {
  card: "#FFFFFF",
  navy: "#0F172A",
  accent: "#22C55E",
  muted: "#64748B",
  sub: "#94A3B8",
  border: "#E2E8F0",
};

const AREA_ICONS: Record<string, string> = {
  "Cold Prep": "❄️",
  Desserts: "🍮",
  Marinations: "🫙",
  Proteins: "🍗",
  Salsas: "🌶️",
};

const DAYS = [
  { day: "Monday", date: "Apr 20", count: 28, done: 28, blocked: 0, status: "past" as const },
  { day: "Tuesday", date: "Apr 21", count: 24, done: 24, blocked: 0, status: "past" as const },
  { day: "Wednesday", date: "Apr 22", count: 31, done: 28, blocked: 3, status: "past" as const },
  { day: "Thursday", date: "Apr 23", count: 29, done: 18, blocked: 2, status: "today" as const },
  { day: "Friday", date: "Apr 24", count: 22, done: 0, blocked: 0, status: "plan" as const },
  { day: "Saturday", date: "Apr 25", count: 18, done: 0, blocked: 0, status: "plan" as const },
  { day: "Sunday", date: "Apr 26", count: 26, done: 0, blocked: 0, status: "plan" as const },
];

const TODAY_TASKS = [
  { name: "Barbacoa Marinated", area: "Proteins", time: 60 },
  { name: "Pickled Onions", area: "Cold Prep", time: 30 },
  { name: "Salsa Macha Oil", area: "Salsas", time: 10 },
];

function Badge({
  variant,
  children,
}: {
  variant: "today" | "plan";
  children: React.ReactNode;
}) {
  const style =
    variant === "today"
      ? { background: "#22C55E", color: "#fff" }
      : { background: "#F1F5F9", color: T.muted };
  return (
    <span
      style={{
        ...style,
        fontSize: 10,
        fontWeight: 700,
        padding: "3px 8px",
        borderRadius: 999,
        letterSpacing: 0.5,
      }}
    >
      {children}
    </span>
  );
}

export function SemanaScreen() {
  return (
    <Screen topPad={52}>
      {/* Header */}
      <div
        style={{
          background: T.card,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div style={{ fontSize: 24, color: T.navy, fontWeight: 400 }}>←</div>
        <div>
          <div style={{ color: T.navy, fontSize: 18, fontWeight: 700 }}>Full Week</div>
          <div style={{ color: T.muted, fontSize: 12 }}>Apr 20 — 26 · 178 tasks</div>
        </div>
      </div>

      <div style={{ padding: "14px 14px", flex: 1, overflow: "hidden" }}>
        {/* Search */}
        <div
          style={{
            background: T.card,
            border: `1px solid ${T.border}`,
            borderRadius: 14,
            padding: "12px 14px",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: T.muted,
              letterSpacing: 1,
              marginBottom: 8,
            }}
          >
            SEARCH BY TASK
          </div>
          <div
            style={{
              background: "#F1F5F9",
              borderRadius: 10,
              padding: "8px 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Search size={16} color={T.muted} />
            <span style={{ color: T.sub, fontSize: 13 }}>Search 198 tasks…</span>
          </div>
        </div>

        {/* Days */}
        {DAYS.map((d) => {
          const expanded = d.status === "today";
          return (
            <div
              key={d.day}
              style={{
                background: T.card,
                border: `1px solid ${d.status === "today" ? "#86EFAC" : T.border}`,
                borderRadius: 14,
                marginBottom: 8,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Badge variant={d.status === "today" ? "today" : "plan"}>
                    {d.status === "today" ? "TODAY" : "PLAN"}
                  </Badge>
                  <div>
                    <div style={{ color: T.navy, fontSize: 14, fontWeight: 700 }}>{d.day}</div>
                    <div style={{ color: T.muted, fontSize: 11 }}>
                      {d.date} · {d.count} tasks
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11 }}>
                  {d.done > 0 && <span style={{ color: "#22C55E", fontWeight: 600 }}>✅ {d.done}</span>}
                  {d.blocked > 0 && <span style={{ color: "#ef4444", fontWeight: 600 }}>❌ {d.blocked}</span>}
                  <span style={{ color: T.navy }}>{expanded ? "▲" : "▼"}</span>
                </div>
              </div>

              {expanded && (
                <div style={{ padding: "0 12px 12px" }}>
                  {TODAY_TASKS.map((t, i) => (
                    <div
                      key={i}
                      style={{
                        background: "#F1F5F9",
                        borderRadius: 10,
                        padding: "8px 10px",
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{AREA_ICONS[t.area] ?? "🍽️"}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: T.navy, fontSize: 12, fontWeight: 600 }}>{t.name}</div>
                        <div style={{ color: T.muted, fontSize: 10 }}>{t.area}</div>
                      </div>
                      <span style={{ color: T.sub, fontSize: 10 }}>⏱ {t.time}m</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Screen>
  );
}
