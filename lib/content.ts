export const profile = {
  name: "Shubham Sinha",
  title: "Associate QA Engineer",
  company: "Atimi Software",
  location: "Bengaluru, India",
  email: "shubhamsinha9431@gmail.com",
  github: "https://github.com/shubham7856",
  linkedin: "https://www.linkedin.com/in/shubham-sinha2001/",
};

export const testRun = [
  { suite: "easy-drugs", check: "120+ automated test cases in Java, Selenium and TestNG" },
  { suite: "atimi-web", check: "173 executions across 8 browser and device projects" },
  { suite: "atimi-web", check: "WCAG 2.1 AA scanned on every story" },
  { suite: "dminer", check: "10,708 company records verified" },
  { suite: "dminer", check: "465 projects reconciled across 4 sources" },
  { suite: "tooling", check: "544 competitor feature rows consolidated" },
];

export const evidence = [
  { value: "10,708", label: "company records verified, 2,460 bad rows flagged" },
  { value: "173", label: "Playwright executions across 8 browser and device projects" },
  { value: "17", label: "epics in a test plan I own end to end" },
  { value: "120+", label: "automated test cases on a pharmacy e-commerce platform" },
];

export type Project = {
  name: string;
  context: string;
  summary: string;
  outcomes: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "Easy Drugs",
    context: "Canadian pharmaceutical e-commerce platform",
    summary:
      "Built and extended the Java and Selenium suite across product listings, prescription workflows, checkout and account management, backed by API and database checks behind every UI flow.",
    outcomes: [
      "120+ automated test cases in Java, Selenium and TestNG",
      "Framework refactored into a Page Object Model, cutting maintenance overhead by 65%",
      "REST Assured modules validating request and response payloads",
      "SQL checks asserting database state behind each UI flow",
    ],
    stack: ["Java", "Selenium", "TestNG", "REST Assured", "SQL"],
  },
  {
    name: "Atimi Website Rebuild",
    context: "QA owner for a ground-up corporate website rebuild",
    summary:
      "Wrote the v1.0 Test Plan across functional, accessibility, performance, security and SEO, then built the TypeScript and Playwright framework ahead of the new build and proved it against the live site.",
    outcomes: [
      "Test Plan spans 17 epics with a 70% automation coverage target",
      "173 executions across 8 browser and device projects",
      "45-path baseline inventory gates the migration, every URL must return 200",
      "Surfaced two real WCAG defects including a Level A keyboard trap",
    ],
    stack: ["TypeScript", "Playwright", "axe-core", "WCAG 2.1 AA"],
  },
  {
    name: "Dminer Data Quality",
    context: "Python tooling for a client's internal data platform",
    summary:
      "Automated verification and reconciliation of a company, contact and project dataset extracted from mail archives, plus a Selenium tool that resolves contacts against public profiles.",
    outcomes: [
      "10,708 company records verified, 2,460 bad rows identified (23%)",
      "All 76 rows later deleted upstream were already in the flagged set",
      "465 projects reconciled across four conflicting sources",
      "Persistent Chrome profile for headless contact lookup",
    ],
    stack: ["Python", "Selenium", "SQLite", "pandas", "pytest"],
  },
  {
    name: "AI-Assisted QA Tooling",
    context: "Custom Claude Code skills in daily use",
    summary:
      "Skills that turn repeat QA work into a single command: competitor app capture and comparison, static analysis of shipped Android binaries, report triage, and branded document round-trips.",
    outcomes: [
      "Teardown pipeline consolidating 544 feature rows across 13 apps",
      "APK kit reporting SDKs, vendors and architecture from shipped binaries",
      "TestNG and Extent results turned into a failure breakdown",
      "Markdown to Word round-trip in stdlib Python, verified on 4 documents",
    ],
    stack: ["Claude Code", "Python", "MCP", "Ollama"],
  },
];

export const skills = [
  { group: "Languages", items: ["Java", "TypeScript", "Python", "SQL", "Bash"] },
  {
    group: "Test automation",
    items: ["Selenium", "Appium", "Playwright", "TestNG", "REST Assured", "pytest", "axe-core"],
  },
  { group: "AI tooling", items: ["Claude Code", "Custom skills", "MCP", "Ollama"] },
  {
    group: "CI/CD and tools",
    items: ["GitHub Actions", "Azure Pipelines", "Jenkins", "Git", "Maven", "Jira"],
  },
];

export const learning = [
  { step: "Now", topic: "Linux and Bash", active: true },
  { step: "Next", topic: "Docker", active: false },
  { step: "Then", topic: "CI/CD with tests", active: false },
  { step: "Later", topic: "Kubernetes and Terraform", active: false },
];
