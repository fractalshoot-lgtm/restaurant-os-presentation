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

const SLIDES: Record<string, SlideCfg> = {
  dashboard: {
    screen: <DashboardScreen />,
    zooms: [
      { x: 120, y: 195, label: "Live progress ring", side: "right" },
      { x: 310, y: 360, label: "Morning review summary", side: "left" },
      { x: 90, y: 580, label: "Area-by-area view", side: "right" },
    ],
  },
  tareas: {
    screen: <TareasScreen />,
    zooms: [
      { x: 330, y: 240, label: "2-tap status filter", side: "left" },
      { x: 340, y: 350, label: "Done with photo", side: "left" },
      { x: 340, y: 500, label: "Block + reschedule", side: "left" },
    ],
  },
  semana: {
    screen: <SemanaScreen />,
    zooms: [
      { x: 80, y: 175, label: "Global search", side: "right" },
      { x: 300, y: 390, label: "Today highlighted", side: "left" },
      { x: 200, y: 800, label: "Rescheduled callouts", side: "right" },
    ],
  },
  produccion: {
    screen: <ProduccionScreen />,
    zooms: [
      { x: 310, y: 230, label: "Yes / No toggle", side: "left" },
      { x: 60, y: 400, label: "Area grouping", side: "right" },
      { x: 220, y: 865, label: "One-tap submit", side: "right" },
    ],
  },
  filtro: {
    screen: <FiltroScreen />,
    zooms: [
      { x: 80, y: 190, label: "Compliance count", side: "right" },
      { x: 340, y: 330, label: "One-tap revert", side: "left" },
      { x: 180, y: 420, label: "Photo + staff + time", side: "right" },
    ],
  },
  workflows: {
    screen: <WorkflowsScreen />,
    zooms: [
      { x: 200, y: 260, label: "Illustrated flows", side: "right" },
      { x: 170, y: 700, label: "Bot commands reference", side: "right" },
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
      <section className="py-28 md:py-36 px-6 md:px-10">
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
