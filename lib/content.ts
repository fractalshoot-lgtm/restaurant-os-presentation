export const hero = {
  eyebrow: "RESTAURANTOS",
  title: ["Every prep task.", "Every shift.", "Automated."],
  sub: "Replace WhatsApp chaos, paper lists, and Sunday planning sessions with one system that runs on your team's phones.",
  cta: "See how it works",
};

export const problem = {
  title: "The kitchen before RestaurantOS",
  intro: "Every prep shift starts the same way.",
  points: [
    {
      icon: "💬",
      title: "Lost in WhatsApp",
      body: "Task lists buried under 200 messages. Who's doing what? Ask the chef. Again.",
    },
    {
      icon: "🧾",
      title: "Paper lists",
      body: "Yesterday's list is in the trash. Today's is smudged. No record of what got done.",
    },
    {
      icon: "🧠",
      title: "Planning from memory",
      body: "The sous-chef assigns the week every Sunday. Miss a day? Miss a prep.",
    },
  ],
};

export const solution = {
  title: "One system. One source of truth.",
  sub: "A PWA your team opens like a website. A Telegram bot that answers questions. Everything synced in real time.",
  nodes: [
    { label: "PWA", sub: "Installs on any phone in 5 seconds" },
    { label: "Database", sub: "One authoritative record of every task" },
    { label: "Automation", sub: "Schedules tasks, approvals, notifications" },
    { label: "Telegram", sub: "Reports and approvals without opening the app" },
  ],
};

export const modules = [
  {
    key: "dashboard",
    title: "Dashboard",
    headline: "See the shift at a glance",
    bullets: [
      "Progress ring shows % of today's prep done — no spreadsheet required",
      "Area breakdown: Cold Prep, Proteins, Salsas — see where the bottleneck is",
      "Production Review card surfaces this morning's decisions",
    ],
  },
  {
    key: "tareas",
    title: "Daily Tasks",
    headline: "Complete a task in two taps",
    bullets: [
      "Mark done with a photo — every prep has a visual receipt",
      "Blocked a task? Propose a new date, manager approves from Telegram",
      "Quantity field when it matters (portions, pans, batches)",
    ],
  },
  {
    key: "semana",
    title: "Week View",
    headline: "Plan the week, not the day",
    bullets: [
      "Expand any day to see the full load before it happens",
      "Search across 200+ prep tasks by name or area in milliseconds",
      "Rescheduled tasks tagged automatically — no manual tracking",
    ],
  },
  {
    key: "produccion",
    title: "Production Review",
    headline: "Decide the day's prep before the shift starts",
    bullets: [
      "Yes/No per Everyday task — 30 seconds from open to submit",
      "Comments capture why a prep is skipped today",
      "Undo button reverses the whole review if something changes",
    ],
  },
  {
    key: "filtro",
    title: "Filtered Views",
    headline: "Audit what got done, what didn't",
    bullets: [
      "Done filter with photos and timestamps — a permanent record",
      "Blocked filter with the staff member who flagged it and why",
      "Revert to pending in one tap if something was closed by mistake",
    ],
  },
  {
    key: "workflows",
    title: "User Guide",
    headline: "New hire? Onboarded in 5 minutes",
    bullets: [
      "Collapsible walkthrough of every flow, illustrated from the app itself",
      "Every bot command listed with an example",
      "No training document to maintain — it's part of the app",
    ],
  },
] as const;

export const bot = {
  title: "Your GM, in Telegram",
  sub: "The bot doesn't replace your team — it answers the questions that interrupt them.",
  features: [
    "Compliance reports on demand — day, night, week",
    "Natural-language queries (\"which critical tasks are still pending?\")",
    "Blocked tasks notify all managers with Approve / Reject inline",
    "Photo confirmations searchable by task and date",
  ],
};

export const benefits = {
  title: "The business case",
  sub: "What changes when prep runs through RestaurantOS.",
  stats: [
    { value: "45", unit: "min", label: "saved per shift", sub: "No more meetings to assign tasks" },
    { value: "100", unit: "%", label: "task visibility", sub: "Every prep tracked, timestamped, photographed" },
    { value: "5", unit: "min", label: "onboarding", sub: "New staff learn the system on their phone" },
    { value: "1", unit: "tap", label: "to reschedule", sub: "Manager approves from Telegram" },
    { value: "Auto", unit: "", label: "weekly planning", sub: "Every Monday, the week populates itself" },
    { value: "$0", unit: "", label: "platform cost", sub: "Vercel + Supabase + n8n free tiers" },
  ],
  narrative: [
    {
      title: "Workload distribution",
      body: "Tasks balance themselves across areas — Cold Prep, Proteins, Salsas — based on templates the chef sets once.",
    },
    {
      title: "Organization",
      body: "One list, one status, one truth. No contradicting messages across WhatsApp, voice notes, and paper.",
    },
    {
      title: "Traceability",
      body: "Every completed task carries a photo and a timestamp. Quality reviews stop being a memory exercise.",
    },
    {
      title: "Accountability",
      body: "Every task is named to the staff member who closed it. Nobody does someone else's work silently.",
    },
  ],
};

export const cta = {
  title: "Ready to roll it out?",
  sub: "RestaurantOS is live in one kitchen. Ready to scale.",
  button: "Approve rollout",
  footer: "Built by Joan — 2026",
};
