const STYLES = ["mighty", "precise", "swift", "tricky"];
const SKILLS = [
  "assurance",
  "display",
  "shot",
  "call",
  "grab",
  "strike",
  "craft",
  "hoard",
  "study",
  "cure",
  "search",
  "traversal",
];

const CONDITIONS = [
  { label: "Burned", name: "burned" },
  { label: "Caught", name: "caught" },
  { label: "Confused", name: "confused", min: 1 },
  { label: "Discordant", name: "discordant" },
  { label: "Expanded", name: "expanded" },
  { label: "Exposed", name: "exposed" },
  { label: "Fatigued", name: "fatigued", min: 1 },
  { label: "Frightened", name: "frightened", min: 1 },
  { label: "Invigorated", name: "invigorated", min: 1 },
  { label: "Hidden", name: "hidden" },
  { label: "Poisoned", name: "poisoned", min: 1 },
  { label: "Rehabilitating", name: "rehabilitating", min: 1, max: 6 },
  { label: "Rested", name: "rested", min: 1 },
  { label: "Stunned", name: "stunned", min: 1 },
  { label: "Wounded", name: "wounded", min: 1, max: 3 },
];
const CONDITIONS_REQUEST = CONDITIONS.flatMap((c) => [c.name, `${c.name}_level`]);

const MAX_FIELDS = ["hp", "tool_durability", "harmony"];
