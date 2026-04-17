import { Screen } from "../Screen";
import { produccionTasks } from "@/lib/demo-data";
import { AREA_ICONS } from "@/lib/tokens";

const T = {
  card: "#FFFFFF",
  navy: "#0F172A",
  accent: "#22C55E",
  muted: "#64748B",
  sub: "#94A3B8",
  border: "#E2E8F0",
  bg: "#F8FAFC",
};

export function ProduccionScreen() {
  const decisions: Record<string, boolean | undefined> = {
    p1: true,
    p2: true,
    p3: false,
    p4: true,
    p5: true,
  };

  return (
    <Screen>
      {/* Header */}
      <div
        style={{
          padding: "10px 16px",
          background: T.card,
          borderBottom: `1px solid ${T.border}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ fontSize: 22, color: T.navy }}>←</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: T.navy, fontSize: 15, fontWeight: 700 }}>
            Production Review
          </div>
          <div style={{ color: T.muted, fontSize: 12 }}>
            Daily tasks — before starting shift
          </div>
        </div>
      </div>

      {/* Area heading */}
      <div style={{ padding: "14px 14px 8px" }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            color: T.navy,
            textTransform: "uppercase",
            letterSpacing: 1.2,
            paddingLeft: 2,
          }}
        >
          ❄️ COLD PREP
        </div>
      </div>

      {/* Task cards with Yes/No */}
      <div style={{ padding: "0 14px", flex: 1 }}>
        {produccionTasks.map((t) => {
          const decision = decisions[t.id];
          const borderColor =
            decision === true ? "#22C55E" : decision === false ? T.border : "#F59E0B";
          return (
            <div
              key={t.id}
              style={{
                background: T.card,
                border: `1px solid ${T.border}`,
                borderLeft: `3px solid ${borderColor}`,
                borderRadius: 14,
                padding: "12px 14px",
                marginBottom: 8,
                opacity: decision === false ? 0.6 : 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.navy }}>{t.name}</div>
                  <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
                    ⏱ {t.time} min {t.tools && `· ${t.tools.slice(0, 28)}…`}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <div
                    style={{
                      padding: "5px 10px",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 600,
                      background: decision === true ? "#22C55E" : "#DCFCE7",
                      color: decision === true ? "#fff" : "#16A34A",
                    }}
                  >
                    ✓ Yes
                  </div>
                  <div
                    style={{
                      padding: "5px 10px",
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 600,
                      background: decision === false ? "#E2E8F0" : "#F8FAFC",
                      color: decision === false ? T.navy : T.muted,
                    }}
                  >
                    ✗ No
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Submit */}
      <div
        style={{
          background: T.card,
          borderTop: `1px solid ${T.border}`,
          padding: "14px 16px 20px",
          boxShadow: "0 -4px 24px rgba(0,0,0,0.05)",
        }}
      >
        <div
          style={{
            padding: "10px 14px",
            marginBottom: 10,
            background: T.bg,
            border: `1px solid ${T.border}`,
            borderRadius: 12,
            fontSize: 13,
            color: T.sub,
          }}
        >
          Your name…
        </div>
        <div
          style={{
            padding: "14px",
            background: T.accent,
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            borderRadius: 14,
            textAlign: "center",
          }}
        >
          Submit review (4 required · 1 not required)
        </div>
      </div>
    </Screen>
  );
}
