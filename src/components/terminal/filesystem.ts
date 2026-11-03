import { experience, facts, profile, projects, skillGroups } from "@/data/portfolio";

/**
 * A tiny read-only virtual filesystem generated from the portfolio data, so the
 * terminal always reflects the same content as the page.
 */

export type FileNode = { type: "file"; content: string; mode: string; mtime: string };
export type DirNode = { type: "dir"; children: Record<string, FsNode>; mtime: string };
export type FsNode = FileNode | DirNode;

const slug = (text: string) =>
  text
    .toLowerCase()
    .replace(/sdn\.? bhd\.?/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const file = (content: string, mtime: string, mode = "-rw-r--r--"): FileNode => ({
  type: "file",
  content: content.trimEnd() + "\n",
  mode,
  mtime,
});
const dir = (children: Record<string, FsNode>, mtime: string): DirNode => ({ type: "dir", children, mtime });

const readme = `# aiman@portfolio

Welcome! This terminal is a working mini-shell for my portfolio.

Try:
  ls -la            list everything here (including hidden files)
  cd projects       move into the projects folder
  cat about.md      read a file
  open contact      jump to a section of the website
  help              show every command`;

const about = `# ${profile.name}
${profile.role} — ${profile.location}, ${profile.country}

${profile.tagline}

${facts.map((f) => `- ${f.label}: ${f.value}`).join("\n")}`;

const contact = `email     ${profile.email}
phone     ${profile.phone}
linkedin  ${profile.linkedin}
github    ${profile.github}
location  ${profile.location}, ${profile.country}`;

const skills = JSON.stringify(Object.fromEntries(skillGroups.map((g) => [g.label.toLowerCase(), g.items])), null, 2);

const projectFiles = Object.fromEntries(
  projects.map((p) => [
    `${slug(p.title)}.md`,
    file(
      `# ${p.title}${p.status ? ` (${p.status.toLowerCase()})` : ""}

${p.description}

stack: ${p.stack.join(", ")}`,
      "Oct 14 2025"
    ),
  ])
);

const experienceFiles = Object.fromEntries(
  experience.map((job, i) => [
    `${String(experience.length - i).padStart(2, "0")}-${slug(job.company)}.md`,
    file(
      `# ${job.title} @ ${job.company}
${job.period} · ${job.location}

${job.bullets.map((b) => `- ${b}`).join("\n")}

stack: ${job.stack.join(", ")}`,
      job.current ? "Nov  1 2025" : "Dec 31 2025"
    ),
  ])
);

const secret = `You found the hidden file.

If you read this far, we'd probably work well together.
Say hi: ${profile.email}`;

const zshrc = `export EDITOR="code"
alias gs="git status"
alias ship="git push && echo 'shipped 🚀'"
# coffee-driven development
`;

export const filesystem: DirNode = dir(
  {
    "README.md": file(readme, "Nov  3 2025"),
    "about.md": file(about, "Nov  3 2025"),
    "contact.txt": file(contact, "Nov  3 2025"),
    "skills.json": file(skills, "Oct 28 2025"),
    projects: dir(projectFiles, "Oct 14 2025"),
    experience: dir(experienceFiles, "Nov  1 2025"),
    ".secret": file(secret, "Jan  1 2025", "-rw-------"),
    ".zshrc": file(zshrc, "Mar  3 2025"),
  },
  "Nov  3 2025"
);

/** Resolve a user-typed path against the current directory. Home (`~`) is the root. */
export function resolvePath(cwd: string[], input: string): string[] | null {
  const parts = input.startsWith("~") || input.startsWith("/") ? [] : [...cwd];
  for (const segment of input.replace(/^~\/?|^\/+/, "").split("/")) {
    if (!segment || segment === ".") continue;
    if (segment === "..") parts.pop();
    else parts.push(segment);
  }
  return getNode(parts) ? parts : null;
}

export function getNode(path: string[]): FsNode | null {
  let node: FsNode = filesystem;
  for (const segment of path) {
    if (node.type !== "dir" || !(segment in node.children)) return null;
    node = node.children[segment];
  }
  return node;
}

export const displayPath = (path: string[]) => (path.length ? `~/${path.join("/")}` : "~");

export const nodeSize = (node: FsNode) =>
  node.type === "file" ? new TextEncoder().encode(node.content).length : 64 + Object.keys(node.children).length * 32;
