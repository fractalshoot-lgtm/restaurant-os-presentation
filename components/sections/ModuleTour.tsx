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

// Coords are in the 430x932 iPhone design space.
// Screen content begins at y=70 (14 bezel inset + 56 status padding).
// Calibrated from each screen component's pixel layout.
const SLIDES: Record<string, SlideCfg> = {
  dashboard: {
    screen: <DashboardScreen />,
    zooms: [
      { x: 119, y: 230, label: "Live progress ring" },
      { x: 215, y: 376, label: "Morning review" },
      { x: 90, y: 482, label: "Area breakdown" },
    ],
  },
  tareas: {
    screen: <TareasScreen />,
    zooms: [
      { x: 85, y: 148, label: "Status filter" },
      { x: 165, y: 228, label: "Done with photo" },
      { x: 140, y: 523, label: "Block + reschedule" },
    ],
  },
  semana: {
    screen: <SemanaScreen />,
    zooms: [
      { x: 215, y: 158, label: "Global search" },
      { x: 130, y: 405, label: "Today highlighted" },
      { x: 200, y: 655, label: "Rescheduled callouts" },
    ],
  },
  produccion: {
    screen: <ProduccionScreen />,
    zooms: [
      { x: 340, y: 170, label: "Yes / No toggle" },
      { x: 70, y: 139, label: "Area grouping" },
      { x: 215, y: 875, label: "One-tap submit" },
    ],
  },
  filtro: {
    screen: <FiltroScreen />,
    zooms: [
      { x: 100, y: 138, label: "Compliance count" },
      { x: 360, y: 184, label: "One-tap revert" },
      { x: 170, y: 194, label: "Photo + staff + time" },
    ],
  },
  workflows: {
    screen: <WorkflowsScreen />,
    zooms: [
      { x: 215, y: 170, label: "Illustrated flows" },
      { x: 215, y: 450, label: "Bot commands" },
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
