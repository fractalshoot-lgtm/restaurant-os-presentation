import { Screen } from "../Screen";
import { AREA_ICONS } from "@/lib/tokens";
import { BottomNav } from "./DashboardScreen";

const T = {
  card: "#FFFFFF",
  navy: "#0F172A",
  accent: "#22C55E",
  muted: "#64748B",
  sub: "#94A3B8",
  border: "#E2E8F0",
  critical: "#EF4444",
};

const doneTasks = [
  { name: "Barbacoa Marinated", area: "Proteins", by: "Aniris", at: "08:42" },
  { name: "Pickled Onions", area: "Cold Prep", by: "Chef", at: "09:15" },
  { name: "Pico de Gallo", area: "Salsas", by: "C", at: "10:03" },
  { name: "Roasted Garlic Oil", area: "Marinations", by: "Aniris", at: "10:45" },
  { name: "Empanadas", area: "Cold Prep", by: "Chef", at: "11:12" },
];

export function FiltroScreen() {
  return (
    <Screen>
      <div style={{ padding: "8px 18px 12px" }}>
        <div style={{ color: T.sub, fontSize: 12, letterSpacing: 1, fontWeight: 600 }}>
          TODAY · APR 23
        </div>
        <div style={{ color: T.navy, fontSize: 26, fontWeight: 700, marginTop: 2 }}>
          Done today
        </div>
        <div style={{ fontSize: 13, color: T.muted, marginTop: 4 }}>
          <strong style={{ color: T.accent }}>18</strong> completed · tap to revert
        </div>
      </div>

      <div style={{ padding: "0 14px", flex: 1 }}>
        {doneTasks.map((t, i) => (
          <div
            key={i}
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderRadius: 14,
              padding: "12px 14px",
              marginBottom: 8,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "#DCFCE7",
                color: "#16A34A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              ✓
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: T.navy,
                  textDecoration: "line-through",
                  opacity: 0.7,
                }}
              >
                {t.name}
              </div>
              <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>
                {AREA_ICONS[t.area]} {t.area} · {t.by} · {t.at} · 📸
              </div>
            </div>
            <div
              style={{
                padding: "5px 9px",
                fontSize: 11,
                fontWeight: 600,
                color: T.muted,
                border: `1px solid ${T.border}`,
                borderRadius: 8,
                flexShrink: 0,
              }}
            >
              ↩ Revert
            </div>
          </div>
        ))}
      </div>

      <BottomNav active="tasks" />
    </Screen>
  );
}
