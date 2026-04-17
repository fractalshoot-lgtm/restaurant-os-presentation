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

// Zoom markers auto-exit through the nearest frame edge (see ZoomMarker.tsx).
// Labels always live in the margin outside the phone, never covering screen content.
const SLIDES: Record<string, SlideCfg> = {
  dashboard: {
    screen: <DashboardScreen />,
    zooms: [
      { x: 120, y: 200, label: "Live progress ring" },
      { x: 330, y: 370, label: "Morning review" },
      { x: 80, y: 585, label: "Area breakdown" },
    ],
  },
  tareas: {
    screen: <TareasScreen />,
    zooms: [
      { x: 330, y: 245, label: "Status filter" },
      { x: 340, y: 380, label: "Done with photo" },
      { x: 340, y: 510, label: "Block + reschedule" },
    ],
  },
  semana: {
    screen: <SemanaScreen />,
    zooms: [
      { x: 80, y: 195, label: "Global search" },
      { x: 330, y: 405, label: "Today highlighted" },
      { x: 190, y: 800, label: "Rescheduled callouts" },
    ],
  },
  produccion: {
    screen: <ProduccionScreen />,
    zooms: [
      { x: 325, y: 270, label: "Yes / No toggle" },
      { x: 70, y: 240, label: "Area grouping" },
      { x: 220, y: 875, label: "One-tap submit" },
    ],
  },
  filtro: {
    screen: <FiltroScreen />,
    zooms: [
      { x: 90, y: 200, label: "Compliance count" },
      { x: 340, y: 340, label: "One-tap revert" },
      { x: 180, y: 420, label: "Photo + staff + time" },
    ],
  },
  workflows: {
    screen: <WorkflowsScreen />,
    zooms: [
      { x: 200, y: 270, label: "Illustrated flows" },
      { x: 170, y: 700, label: "Bot commands" },
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
