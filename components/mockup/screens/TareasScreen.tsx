import { Screen } from "../Screen";
import { todayTasks } from "@/lib/demo-data";
import { AREA_ICONS } from "@/lib/tokens";
import { BottomNav } from "./DashboardScreen";

const T = {
  bg: "#F8FAFC",
  card: "#FFFFFF",
  navy: "#0F172A",
  accent: "#22C55E",
  muted: "#64748B",
  sub: "#94A3B8",
  border: "#E2E8F0",
  critical: "#EF4444",
};

const PRIORITY_COLOR: Record<string, string> = {
  Critical: "#EF4444",
  Production: "#F0883E",
  Extra: "#64748B",
};

export function TareasScreen() {
  return (
    <Screen>
      <div style={{ padding: "8px 18px 12px" }}>
        <div style={{ color: T.sub, fontSize: 12, letterSpacing: 1, fontWeight: 600 }}>
          TODAY · APR 23
        </div>
        <div style={{ color: T.navy, fontSize: 26, fontWeight: 700, marginTop: 2 }}>Tasks</div>
        <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
          {["All 12", "Done 6", "Pending 4", "Blocked 2"].map((t, i) => (
            <div
              key={i}
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "5px 10px",
                borderRadius: 999,
                background: i === 0 ? T.navy : T.card,
                color: i === 0 ? "#fff" : T.muted,
                border: i === 0 ? "none" : `1px solid ${T.border}`,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "0 14px", flex: 1, overflowY: "hidden" }}>
        {todayTasks.map((t) => {
          const isDone = t.status === "done";
          const isBlocked = t.status === "blocked";
          return (
            <div
              key={t.id}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `3px solid ${PRIORITY_COLOR[t.priority]}`,
                borderRadius: 14,
                padding: "12px 14px",
                marginBottom: 8,
                opacity: isDone ? 0.7 : 1,
                boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: T.navy,
                      textDecoration: isDone ? "line-through" : "none",
                    }}
                  >
                    {t.name}
                  </div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>
                    {AREA_ICONS[t.area]} {t.area} · ⏱ {t.time} min
                  </div>
                  {isDone && (
                    <div style={{ fontSize: 11, color: T.accent, marginTop: 5, fontWeight: 600 }}>
                      ✓ {t.submitted_by} · 09:15 · 📸
                    </div>
                  )}
                  {isBlocked && (
                    <div
                      style={{
                        fontSize: 11,
                        color: T.critical,
                        marginTop: 5,
                        fontWeight: 600,
                      }}
                    >
                      🚫 Blocked · reschedule Apr 24
                    </div>
                  )}
                </div>
                {!isDone && !isBlocked && (
                  <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                    <div
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: T.accent,
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      ✓ Done
                    </div>
                    <div
                      style={{
                        padding: "6px 10px",
                        borderRadius: 8,
                        background: "#FEE2E2",
                        color: T.critical,
                        fontSize: 12,
                        fontWeight: 600,
                      }}
                    >
                      🚫
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <BottomNav active="tasks" />
    </Screen>
  );
}
