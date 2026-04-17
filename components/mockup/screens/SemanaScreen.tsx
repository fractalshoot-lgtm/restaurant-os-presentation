import { Screen } from "../Screen";
import { weekDays } from "@/lib/demo-data";
import { BottomNav } from "./DashboardScreen";

const T = {
  card: "#FFFFFF",
  navy: "#0F172A",
  accent: "#22C55E",
  muted: "#64748B",
  sub: "#94A3B8",
  border: "#E2E8F0",
};

export function SemanaScreen() {
  return (
    <Screen>
      <div style={{ padding: "8px 18px 12px" }}>
        <div style={{ color: T.sub, fontSize: 12, letterSpacing: 1, fontWeight: 600 }}>
          WEEK · APR 20 — 26
        </div>
        <div style={{ color: T.navy, fontSize: 26, fontWeight: 700, marginTop: 2 }}>Week</div>
        {/* Search bar */}
        <div
          style={{
            marginTop: 12,
            padding: "10px 14px",
            background: T.card,
            borderRadius: 12,
            border: `1px solid ${T.border}`,
            fontSize: 13,
            color: T.sub,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          🔍 <span>Search 198 tasks…</span>
        </div>
      </div>

      <div style={{ padding: "0 14px", flex: 1 }}>
        {weekDays.map((d) => {
          const isToday = d.today;
          return (
            <div
              key={d.day}
              style={{
                background: isToday ? "#F0FDF4" : T.card,
                border: `1px solid ${isToday ? "#86EFAC" : T.border}`,
                borderRadius: 14,
                padding: "12px 14px",
                marginBottom: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: isToday ? "#16A34A" : T.navy,
                  }}
                >
                  {d.day} {isToday && " · Today"}
                </div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{d.date}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    padding: "4px 10px",
                    background: isToday ? "#22C55E" : "#F1F5F9",
                    color: isToday ? "#fff" : T.muted,
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: 999,
                  }}
                >
                  {d.count} tasks
                </div>
                <div style={{ color: T.sub, fontSize: 16 }}>›</div>
              </div>
            </div>
          );
        })}

        <div
          style={{
            marginTop: 6,
            padding: "10px 14px",
            background: "#FEF3C7",
            border: "1px solid #FDE68A",
            borderRadius: 12,
            fontSize: 12,
            color: "#92400E",
          }}
        >
          📅 3 tasks rescheduled to next week
        </div>
      </div>

      <BottomNav active="week" />
    </Screen>
  );
}
