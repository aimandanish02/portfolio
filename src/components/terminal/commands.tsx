import type { ReactNode } from "react";
import { experience, profile, projects, stats, techStack } from "@/data/portfolio";
import { displayPath, filesystem, getNode, nodeSize, resolvePath, type DirNode } from "./filesystem";

export interface ShellContext {
  cwd: string[];
  setCwd: (path: string[]) => void;
  history: string[];
  clear: () => void;
  openSection: (id: string) => void;
  exit: () => void;
}

type Command = {
  description: string;
  usage?: string;
  /** Hidden commands work but are left out of `help` (easter eggs). */
  hidden?: boolean;
  run: (args: string[], ctx: ShellContext) => ReactNode;
};

export const sections: Record<string, string> = {
  home: "hero",
  setup: "workstation",
  about: "about",
  skills: "skills",
  experience: "experience",
  projects: "projects",
  contact: "contact",
};

const Err = ({ children }: { children: ReactNode }) => <span className="text-rose-400">{children}</span>;
const Dim = ({ children }: { children: ReactNode }) => <span className="text-white/45">{children}</span>;

function entryName(name: string, isDir: boolean) {
  return isDir ? <span className="font-semibold text-sky-400">{name}/</span> : <span className="text-white/85">{name}</span>;
}

/** Light syntax colouring for `cat`: markdown headings, list bullets, JSON keys. */
function highlight(content: string): ReactNode {
  return content.split("\n").map((line, i) => {
    let node: ReactNode = line || " ";
    if (line.startsWith("# ")) node = <span className="font-bold text-amber-300">{line}</span>;
    else if (line.startsWith("- ")) node = <><span className="text-pink-400">-</span>{line.slice(1)}</>;
    else if (/^\s*"[^"]+":/.test(line)) {
      const [, key, rest] = line.match(/^(\s*"[^"]+")(:.*)$/) ?? [];
      node = <><span className="text-purple-400">{key}</span><span className="text-emerald-300">{rest}</span></>;
    } else if (/^(stack|email|phone|linkedin|github|location):?\s/.test(line)) {
      const [, key, rest] = line.match(/^(\S+)(.*)$/) ?? [];
      node = <><span className="text-purple-400">{key}</span>{rest}</>;
    }
    return <div key={i}>{node}</div>;
  });
}

const parseFlags = (args: string[]) => ({
  flags: args.filter((a) => a.startsWith("-")).join(""),
  rest: args.filter((a) => !a.startsWith("-")),
});

export const commands: Record<string, Command> = {
  help: {
    description: "list available commands",
    run: () => (
      <div className="space-y-1">
        <div className="grid grid-cols-[11rem_1fr] gap-x-4">
          {Object.entries(commands)
            .filter(([, c]) => !c.hidden)
            .map(([name, c]) => (
              <div key={name} className="contents">
                <span className="text-emerald-300">{c.usage ?? name}</span>
                <Dim>{c.description}</Dim>
              </div>
            ))}
        </div>
        <Dim>Tip: Tab autocompletes, ↑/↓ browses history, Ctrl+L clears.</Dim>
      </div>
    ),
  },
  ls: {
    description: "list files (-l long, -a hidden)",
    usage: "ls [-la] [dir]",
    run: (args, { cwd }) => {
      const { flags, rest } = parseFlags(args);
      const target = rest[0] ? resolvePath(cwd, rest[0]) : cwd;
      if (!target) return <Err>ls: {rest[0]}: No such file or directory</Err>;
      const node = getNode(target)!;
      if (node.type === "file") return entryName(rest[0], false);

      const showHidden = flags.includes("a");
      const names = Object.keys(node.children)
        .filter((n) => showHidden || !n.startsWith("."))
        .sort((a, b) => a.replace(/^\./, "").localeCompare(b.replace(/^\./, "")));

      if (!flags.includes("l")) {
        return (
          <div className="flex flex-wrap gap-x-6">
            {showHidden ? <>{entryName(".", true)}{entryName("..", true)}</> : null}
            {names.map((n) => (
              <span key={n}>{entryName(n, node.children[n].type === "dir")}</span>
            ))}
          </div>
        );
      }

      const rows: [string, DirNode | (typeof node.children)[string]][] = names.map((n) => [n, node.children[n]]);
      if (showHidden) rows.unshift([".", node], ["..", getNode(target.slice(0, -1)) ?? filesystem]);
      return (
        <div>
          <Dim>total {rows.length * 8}</Dim>
          {rows.map(([name, child]) => (
            <div key={name} className="whitespace-pre">
              <Dim>
                {child.type === "dir" ? "drwxr-xr-x" : child.mode} {child.type === "dir" ? Object.keys(child.children).length + 2 : 1}{" "}
                aiman staff {String(nodeSize(child)).padStart(5)} {child.mtime}{" "}
              </Dim>
              {entryName(name, child.type === "dir" && name !== "." && name !== "..")}
            </div>
          ))}
        </div>
      );
    },
  },
  cd: {
    description: "change directory",
    usage: "cd <dir>",
    run: (args, { cwd, setCwd }) => {
      const input = args[0] ?? "~";
      const target = resolvePath(cwd, input);
      if (!target) return <Err>cd: no such file or directory: {input}</Err>;
      if (getNode(target)!.type !== "dir") return <Err>cd: not a directory: {input}</Err>;
      setCwd(target);
      return null;
    },
  },
  pwd: {
    description: "print working directory",
    run: (_, { cwd }) => `/home/aiman${cwd.length ? "/" + cwd.join("/") : ""}`,
  },
  cat: {
    description: "print a file",
    usage: "cat <file>",
    run: (args, { cwd }) => {
      if (!args[0]) return <Err>cat: missing file operand — try `cat about.md`</Err>;
      return args.map((arg) => {
        const target = resolvePath(cwd, arg);
        if (!target) return <Err key={arg}>cat: {arg}: No such file or directory</Err>;
        const node = getNode(target)!;
        if (node.type === "dir") return <Err key={arg}>cat: {arg}: Is a directory</Err>;
        return <div key={arg}>{highlight(node.content)}</div>;
      });
    },
  },
  tree: {
    description: "show the folder structure",
    run: (_, { cwd }) => {
      const lines: ReactNode[] = [];
      const walk = (node: DirNode, prefix: string) => {
        const names = Object.keys(node.children).filter((n) => !n.startsWith("."));
        names.forEach((name, i) => {
          const child = node.children[name];
          const last = i === names.length - 1;
          lines.push(
            <div key={prefix + name} className="whitespace-pre">
              <Dim>{prefix + (last ? "└── " : "├── ")}</Dim>
              {entryName(name, child.type === "dir")}
            </div>
          );
          if (child.type === "dir") walk(child, prefix + (last ? "    " : "│   "));
        });
      };
      walk(getNode(cwd) as DirNode, "");
      return (
        <div>
          <span className="text-sky-400">{displayPath(cwd)}</span>
          {lines}
        </div>
      );
    },
  },
  whoami: {
    description: "who is this guy?",
    run: () => (
      <div>
        <div className="text-[28px] font-bold leading-tight text-white">{profile.name}</div>
        <div className="text-sky-300">{profile.role} · {profile.location}</div>
        <div className="mt-1 text-white/65">{profile.tagline}</div>
      </div>
    ),
  },
  neofetch: {
    description: "system info, portfolio edition",
    run: () => (
      <div className="flex gap-6">
        <pre className="bg-gradient-to-b from-sky-400 to-purple-500 bg-clip-text font-bold leading-tight text-transparent">
{`   ___   ___
  / _ | / _ \\
 / __ |/ // /
/_/ |_/____(_)`}
        </pre>
        <div>
          <div><span className="font-bold text-sky-400">aiman</span>@<span className="font-bold text-sky-400">portfolio</span></div>
          <Dim>-----------------</Dim>
          {[
            ["Role", profile.role],
            ["Location", `${profile.location}, MY`],
            ["Experience", `${experience.length} roles since 2022`],
            ["Projects", `${projects.length} built`],
            ["Stack", `${techStack.length} technologies`],
            ["Awards", `${stats.find((s) => s.label === "Dean's List")?.value ?? 2}× Dean's List`],
            ["Shell", "portfolio-zsh 1.0"],
          ].map(([k, v]) => (
            <div key={k}><span className="text-purple-400">{k}</span>: {v}</div>
          ))}
          <div className="mt-1 flex gap-1">
            {["bg-sky-400", "bg-purple-500", "bg-cyan-400", "bg-pink-400", "bg-amber-400", "bg-emerald-400"].map((c) => (
              <span key={c} className={`inline-block h-3 w-5 ${c}`} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  open: {
    description: "scroll the site to a section",
    usage: "open <section>",
    run: (args, { openSection }) => {
      const key = args[0]?.toLowerCase();
      if (!key || !(key in sections)) {
        return (
          <span>
            <Err>open: unknown section{key ? ` "${key}"` : ""}.</Err> <Dim>Try one of:</Dim>{" "}
            <span className="text-emerald-300">{Object.keys(sections).join("  ")}</span>
          </span>
        );
      }
      openSection(sections[key]);
      return <Dim>→ opening #{key}…</Dim>;
    },
  },
  contact: {
    description: "how to reach me",
    run: (_, ctx) => commands.cat.run(["~/contact.txt"], ctx),
  },
  history: {
    description: "show command history",
    run: (_, { history }) =>
      history.map((h, i) => (
        <div key={i} className="whitespace-pre">
          <Dim>{String(i + 1).padStart(4)}  </Dim>
          {h}
        </div>
      )),
  },
  echo: { description: "print text", usage: "echo <text>", run: (args) => args.join(" ") },
  date: { description: "print the date", run: () => new Date().toString() },
  clear: {
    description: "clear the screen",
    run: (_, { clear }) => {
      clear();
      return null;
    },
  },
  exit: {
    description: "leave the terminal",
    run: (_, { exit }) => {
      exit();
      return <Dim>logout — thanks for stopping by.</Dim>;
    },
  },

  // Easter eggs
  sudo: { description: "", hidden: true, run: () => <Err>aiman is not in the sudoers file. This incident will be reported. 🙃</Err> },
  rm: { description: "", hidden: true, run: () => <Err>rm: nice try — this portfolio is read-only.</Err> },
  vim: { description: "", hidden: true, run: () => <Dim>You&apos;re safe here. No one gets stuck in vim on my watch. (:q)</Dim> },
  hire: {
    description: "",
    hidden: true,
    run: (_, { openSection }) => {
      openSection("contact");
      return <span className="text-emerald-300">Great choice. Opening contact… 🎉</span>;
    },
  },
};
commands.ll = { ...commands.ls, hidden: true, run: (args, ctx) => commands.ls.run(["-la", ...args], ctx) };
commands.nano = commands.vim;
commands["hire-me"] = commands.hire;

/** Suggestions shown as clickable chips under the terminal. */
export const suggestedCommands = ["help", "ls -la", "cd projects", "cat about.md", "neofetch", "open contact"];

/** Tab completion for the command name, or the last path argument. */
export function complete(input: string, cwd: string[]): { value: string; options: string[] } {
  const tokens = input.split(" ");
  if (tokens.length === 1) {
    const options = Object.keys(commands).filter((c) => !commands[c].hidden && c.startsWith(tokens[0]));
    return { value: options.length === 1 ? options[0] + " " : input, options };
  }

  const last = tokens[tokens.length - 1];
  if (tokens[0] === "open") {
    const options = Object.keys(sections).filter((s) => s.startsWith(last));
    return { value: options.length === 1 ? [...tokens.slice(0, -1), options[0]].join(" ") : input, options };
  }

  const slash = last.lastIndexOf("/");
  const base = slash >= 0 ? last.slice(0, slash + 1) : "";
  const partial = last.slice(slash + 1);
  const dirPath = base ? resolvePath(cwd, base) : cwd;
  const node = dirPath && getNode(dirPath);
  if (!node || node.type !== "dir") return { value: input, options: [] };

  const options = Object.keys(node.children)
    .filter((n) => n.startsWith(partial) && (partial.startsWith(".") || !n.startsWith(".")))
    .map((n) => n + (node.children[n].type === "dir" ? "/" : ""));
  const value = options.length === 1 ? [...tokens.slice(0, -1), base + options[0]].join(" ") : input;
  return { value, options };
}
