import { Screen } from "../Screen";

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
  Marinations: "🫙",
  Proteins: "🍗",
  Salsas: "🌶️",
};

const PRIORITY_COLOR: Record<string, string> = {
  Critical: "#ef4444",
  Production: "#f0883e",
  Extra: "#64748b",
};

const DONE_TASKS = [
  { name: "Barbacoa Marinated", area: "Proteins", by: "Aniris", at: "08:42", priority: "Critical" },
  { name: "Pickled Onions", area: "Cold Prep", by: "Chef", at: "09:15", priority: "Production" },
  { name: "Pico de Gallo", area: "Salsas", by: "C", at: "10:03", priority: "Critical" },
  { name: "Roasted Garlic Oil", area: "Marinations", by: "Aniris", at: "10:45", priority: "Critical" },
  { name: "Empanadas", area: "Cold Prep", by: "Chef", at: "11:12", priority: "Production" },
];

export function FiltroScreen() {
  return (
    <Screen topPad={52}>
      {/* Header */}
      <div
        style={{
          background: T.card,
          padding: "20px 20px 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div style={{ fontSize: 24, color: T.navy, fontWeight: 400 }}>←</div>
        <h1 style={{ color: T.navy, fontSize: 18, margin: 0, flex: 1, fontWeight: 700 }}>
          ✅ Completed today
        </h1>
        <div
          style={{
            background: "#DCFCE7",
            color: "#22C55E",
            fontSize: 13,
            fontWeight: 700,
            padding: "4px 10px",
            borderRadius: 20,
          }}
        >
          18
        </div>
      </div>

      <div style={{ padding: "14px 14px", flex: 1 }}>
        {DONE_TASKS.map((t, i) => (
          <div
            key={i}
            style={{
              background: T.card,
              border: `1px solid ${T.border}`,
              borderLeft: `4px solid ${PRIORITY_COLOR[t.priority]}`,
              borderRadius: 14,
              padding: "12px 14px",
              marginBottom: 10,
              display: "flex",
              alignItems: "flex-start",
              gap: 10,
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <span style={{ fontSize: 20, marginTop: 2 }}>{AREA_ICONS[t.area] ?? "🍽️"}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: T.navy,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {t.name}
              </div>
              <div style={{ color: T.muted, fontSize: 12, marginTop: 2 }}>{t.area}</div>
              <div style={{ color: T.muted, fontSize: 11, marginTop: 2 }}>
                By <strong style={{ color: T.navy }}>{t.by}</strong> · {t.at}
              </div>
            </div>
            <div
              style={{
                padding: "6px 12px",
                background: "#F1F5F9",
                border: `1px solid ${T.border}`,
                borderRadius: 20,
                fontSize: 13,
                color: T.muted,
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              ↩ Revert
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}
