import { AREA_ICONS } from "./tokens";

export type Priority = "Critical" | "Production" | "Extra";

export type DemoTask = {
  id: string;
  name: string;
  area: keyof typeof AREA_ICONS;
  time: number;
  priority: Priority;
  tools?: string;
  status?: "pending" | "done" | "blocked";
  submitted_by?: string;
};

export const todayTasks: DemoTask[] = [
  { id: "t1", name: "Barbacoa Marinated", area: "Proteins", time: 60, priority: "Critical", status: "done", submitted_by: "Aniris" },
  { id: "t2", name: "Pickled Onions", area: "Cold Prep", time: 30, priority: "Production", status: "done", submitted_by: "Chef" },
  { id: "t3", name: "Salsa Macha Oil", area: "Salsas", time: 10, priority: "Critical", status: "pending" },
  { id: "t4", name: "Churros", area: "Desserts", time: 30, priority: "Extra", status: "pending" },
  { id: "t5", name: "Fish for taco Portions", area: "Portions", time: 45, priority: "Critical", status: "blocked" },
];

export const produccionTasks: DemoTask[] = [
  { id: "p1", name: "Green Cabbage", area: "Cold Prep", time: 20, priority: "Production", tools: "Robot Coupe, 3mm blade" },
  { id: "p2", name: "Pickled Onions", area: "Cold Prep", time: 30, priority: "Production", tools: "Robot Coupe" },
  { id: "p3", name: "Caramelized Onions", area: "Cold Prep", time: 10, priority: "Production" },
  { id: "p4", name: "Roasted Garlic Oil", area: "Marinations", time: 15, priority: "Critical" },
  { id: "p5", name: "Open check list", area: "Cleaning", time: 20, priority: "Critical" },
];

export const weekDays = [
  { day: "Monday", date: "Apr 20", count: 28 },
  { day: "Tuesday", date: "Apr 21", count: 24 },
  { day: "Wednesday", date: "Apr 22", count: 31 },
  { day: "Thursday", date: "Apr 23", count: 29, today: true },
  { day: "Friday", date: "Apr 24", count: 22 },
  { day: "Saturday", date: "Apr 25", count: 18 },
  { day: "Sunday", date: "Apr 26", count: 26 },
];

export const areaSummary = [
  { area: "Cold Prep", done: 8, total: 10 },
  { area: "Proteins", done: 6, total: 7 },
  { area: "Salsas", done: 3, total: 5 },
  { area: "Marinations", done: 4, total: 4 },
  { area: "Portions", done: 2, total: 4 },
];

export const botTranscript = [
  {
    from: "user" as const,
    text: "/reporte",
  },
  {
    from: "bot" as const,
    text: `📊 *Today's compliance — Apr 17*\n\n✅ *Done (18)*\n• Barbacoa Marinated · Aniris · 08:42\n• Pickled Onions · Chef · 09:15\n• Pico de Gallo · C · 10:03\n\n🚫 *Blocked (2)*\n• Fish for taco Portions — "delayed supplier"\n• Roasted corn — "oven out"\n\n🔍 *Production review*\n23 required · 2 skipped with comments`,
  },
  {
    from: "user" as const,
    text: "which critical tasks are still pending?",
  },
  {
    from: "bot" as const,
    text: "3 critical tasks pending:\n\n• Salsa Macha Oil — Salsas · 10 min\n• Roasted Garlic — Marinations · 5 min\n• Cooked Shrimp — Proteins · 30 min\n\nNone have been blocked.",
  },
  {
    from: "alert" as const,
    text: `🚫 *Task blocked*\n\n*Fish for taco Portions* was blocked by *Aniris*.\n\nReason: "delayed supplier"\nProposed date: *Apr 18*`,
    buttons: ["✅ Approve", "❌ Reject"],
  },
];
