"use client";

import { modules } from "@/lib/content";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ModuleSlide, Zoom } from "./ModuleSlide";
import { DashboardScreen } from "@/components/mockup/screens/DashboardScreen";
import { TareasScreen } from "@/components/mockup/screens/TareasScreen";
import { SemanaScreen } from "@/components/mockup/screens/SemanaScreen";
import { ProduccionScreen } from "@/components/mockup/screens/ProduccionScreen";
import { FiltroScreen } from "@/components/mockup/screens/FiltroScreen";
import { WorkflowsScreen } from "@/components/mockup/screens/WorkflowsScreen";
import { ReactNode } from "react";

type SlideCfg = {
  screen: ReactNode;
  zooms: Zoom[];
};

// Coords in the 430x932 design space. Each zoom traces the target card/button:
// { x, y } = top-left, { w, h } = size, radius = border radius.
const SLIDES: Record<string, SlideCfg> = {
  dashboard: {
    screen: <DashboardScreen />,
    zooms: [
      // Dark navy Production Review card
      { x: 14, y: 226, w: 402, h: 130, radius: 20, label: "Production Review card" },
      // Progress ring stat (top-right of 2x2 grid)
      { x: 220, y: 372, w: 196, h: 112, radius: 18, label: "Live progress ring" },
      // By area card (bottom card)
      { x: 14, y: 600, w: 402, h: 176, radius: 20, label: "By area breakdown" },
    ],
  },
  tareas: {
    screen: <TareasScreen />,
    zooms: [
      // Compliance badge top-right of header
      { x: 348, y: 66, w: 60, h: 52, radius: 12, label: "Daily compliance %" },
      // Action button on pending task (right-side 48x48 square button, 3rd row)
      { x: 362, y: 326, w: 48, h: 48, radius: 12, label: "Two-tap action" },
      // Blocked task card (5th row, taller due to reason + reschedule line)
      { x: 14, y: 510, w: 402, h: 110, radius: 14, label: "Block + reschedule" },
    ],
  },
  semana: {
    screen: <SemanaScreen />,
    zooms: [
      // Search card
      { x: 14, y: 132, w: 402, h: 68, radius: 14, label: "Search 198 tasks" },
      // Today (Thursday) expanded card
      { x: 14, y: 416, w: 402, h: 198, radius: 14, label: "Today card expanded" },
      // Full Week header block
      { x: 14, y: 58, w: 402, h: 60, radius: 0, label: "Week at a glance" },
    ],
  },
  produccion: {
    screen: <ProduccionScreen />,
    zooms: [
      // Yes/No toggles on first task card
      { x: 306, y: 158, w: 104, h: 30, radius: 8, label: "Yes / No toggle" },
      // Cold Prep area heading
      { x: 14, y: 114, w: 160, h: 28, radius: 8, label: "Area grouping" },
      // Submit button footer
      { x: 14, y: 860, w: 402, h: 48, radius: 14, label: "One-tap submit" },
    ],
  },
  filtro: {
    screen: <FiltroScreen />,
    zooms: [
      // "18" count badge top-right
      { x: 354, y: 68, w: 48, h: 28, radius: 20, label: "Completed count" },
      // Revert pill on first card
      { x: 320, y: 152, w: 84, h: 32, radius: 20, label: "One-tap revert" },
      // Task card body (first card, left side with name + area + staff)
      { x: 14, y: 132, w: 300, h: 80, radius: 14, label: "Staff + time log" },
    ],
  },
  workflows: {
    screen: <WorkflowsScreen />,
    zooms: [
      // First expanded accordion section (Daily task generator)
      { x: 14, y: 216, w: 402, h: 132, radius: 14, label: "Illustrated flows" },
      // Bot commands dark block at bottom
      { x: 14, y: 576, w: 402, h: 180, radius: 14, label: "Bot command reference" },
    ],
  },
};

export function ModuleTour() {
  return (
    <div
      className="relative"
      style={{
        background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 50%, #F8FAFC 100%)",
      }}
    >
      <section className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionTitle
            eyebrow="The app"
            title="Six modules. One shift."
            sub="Every screen your team opens during service. Scroll through the full flow."
            center
          />
        </div>
      </section>

      {modules.map((m, i) => {
        const cfg = SLIDES[m.key];
        return (
          <ModuleSlide
            key={m.key}
            index={i + 1}
            eyebrow={m.title}
            headline={m.headline}
            bullets={m.bullets}
            screen={cfg.screen}
            zooms={cfg.zooms}
            flip={i % 2 === 1}
          />
        );
      })}
    </div>
  );
}
