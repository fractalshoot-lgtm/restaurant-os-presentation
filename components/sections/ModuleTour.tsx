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

// Coords in the 430x932 design space, calibrated against the rebuilt mockups
// (topPad=52 content start y=66; see real RestaurantOS pages for inspiration).
const SLIDES: Record<string, SlideCfg> = {
  dashboard: {
    screen: <DashboardScreen />,
    zooms: [
      { x: 215, y: 267, label: "Production Review card" },
      { x: 300, y: 354, label: "Live progress ring" },
      { x: 90, y: 531, label: "By area breakdown" },
    ],
  },
  tareas: {
    screen: <TareasScreen />,
    zooms: [
      { x: 365, y: 108, label: "Daily compliance %" },
      { x: 370, y: 420, label: "Two-tap action" },
      { x: 150, y: 630, label: "Block + reschedule" },
    ],
  },
  semana: {
    screen: <SemanaScreen />,
    zooms: [
      { x: 180, y: 168, label: "Search 198 tasks" },
      { x: 80, y: 355, label: "Today card expanded" },
      { x: 215, y: 235, label: "Week at a glance" },
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
      { x: 365, y: 98, label: "Completed count" },
      { x: 365, y: 200, label: "One-tap revert" },
      { x: 180, y: 195, label: "Staff + time log" },
    ],
  },
  workflows: {
    screen: <WorkflowsScreen />,
    zooms: [
      { x: 215, y: 190, label: "Illustrated flows" },
      { x: 215, y: 560, label: "Bot command reference" },
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
