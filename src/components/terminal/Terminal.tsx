"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { commands, complete, suggestedCommands, type ShellContext } from "./commands";
import { displayPath } from "./filesystem";

type Line = { id: number; node: ReactNode };

const Prompt = ({ cwd, children }: { cwd: string[]; children?: ReactNode }) => (
  <span className="whitespace-pre-wrap break-all">
    <span className="text-emerald-400">➜</span> <span className="text-sky-400">{displayPath(cwd)}</span>{" "}
    <span className="text-white/90">{children}</span>
  </span>
);

const welcome = (
  <div className="space-y-2 pb-1">
    <div className="text-white/40">portfolio-zsh 1.0 — ttys001</div>
    {commands.whoami.run([], {} as ShellContext)}
    <div className="text-white/60">
      Welcome to my interactive terminal. Type <span className="text-emerald-300">help</span> to see every command, or
      click a suggestion below.
    </div>
  </div>
);

/** Shell state, shared between the on-laptop view and the fullscreen view so they show one session. */
export function useTerminal({ onNavigate }: { onNavigate?: () => void } = {}) {
  const nextId = useRef(1);
  const [lines, setLines] = useState<Line[]>([{ id: 0, node: welcome }]);
  const [cwd, setCwd] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);

  const push = useCallback((node: ReactNode) => setLines((prev) => [...prev, { id: nextId.current++, node }]), []);
  const clear = useCallback(() => setLines([]), []);

  const run = useCallback(
    (raw: string) => {
      const input = raw.trim();
      push(<Prompt cwd={cwd}>{raw}</Prompt>);
      if (!input) return;

      const nextHistory = [...history, input];
      setHistory(nextHistory);

      const [name, ...args] = input.split(/\s+/);
      const command = commands[name.toLowerCase()];
      if (!command) {
        push(
          <span>
            <span className="text-rose-400">zsh: command not found: {name}</span>
            <span className="text-white/45"> — type </span>
            <span className="text-emerald-300">help</span>
            <span className="text-white/45"> for a list of commands.</span>
          </span>
        );
        return;
      }

      const ctx: ShellContext = {
        cwd,
        setCwd,
        history: nextHistory,
        clear,
        exit: () => onNavigate?.(),
        openSection: (id) => {
          onNavigate?.();
          // Let the fullscreen view unmount before scrolling.
          setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
        },
      };
      const output = command.run(args, ctx);
      if (output !== null && output !== undefined && name !== "clear") push(output);
    },
    [cwd, history, push, clear, onNavigate]
  );

  return { lines, cwd, history, run, clear, push };
}

export type TerminalSession = ReturnType<typeof useTerminal>;

interface TerminalViewProps {
  session: TerminalSession;
  variant?: "screen" | "fullscreen";
  onExpand?: () => void;
  onClose?: () => void;
  className?: string;
}

export function TerminalView({ session, variant = "screen", onExpand, onClose, className }: TerminalViewProps) {
  const { lines, cwd, history, run, clear, push } = session;
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Keep the newest output in view (scroll the panel only — never the page).
  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (variant === "fullscreen") inputRef.current?.focus({ preventScroll: true });
  }, [variant]);

  const submit = (value: string) => {
    run(value);
    setInput("");
    setHistoryIndex(null);
    inputRef.current?.focus({ preventScroll: true });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(input);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const { value, options } = complete(input, cwd);
      if (options.length > 1) {
        push(<Prompt cwd={cwd}>{input}</Prompt>);
        push(<div className="flex flex-wrap gap-x-6 text-white/70">{options.map((o) => <span key={o}>{o}</span>)}</div>);
      }
      setInput(value);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setInput(history[index]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const index = historyIndex + 1;
      setHistoryIndex(index >= history.length ? null : index);
      setInput(index >= history.length ? "" : history[index]);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      clear();
    } else if (e.key === "c" && e.ctrlKey && !window.getSelection()?.toString()) {
      e.preventDefault();
      push(<Prompt cwd={cwd}>{input}^C</Prompt>);
      setInput("");
    } else if (e.key === "Escape" && onClose) {
      onClose();
    }
  };

  return (
    <div
      className={cn(
        "flex h-full w-full flex-col overflow-hidden bg-[#05060f] font-mono text-[15px] leading-relaxed text-white",
        className
      )}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-white/10 bg-white/[0.05] px-5 py-3">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate text-[13px] tracking-wide text-white/45">aiman@portfolio — zsh — {displayPath(cwd)}</span>
        <span className="ml-auto flex items-center gap-3">
          <span className="hidden items-center gap-2 text-[13px] text-emerald-300 sm:flex">
            <span className="size-2 rounded-full bg-emerald-400" />
            open to work
          </span>
          {onExpand ? (
            <button
              type="button"
              onClick={onExpand}
              aria-label="Open terminal fullscreen"
              className="flex size-8 items-center justify-center rounded-md text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Maximize2 className="size-4" />
            </button>
          ) : null}
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close terminal"
              className="flex size-8 items-center justify-center rounded-md text-white/55 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </span>
      </div>

      <div
        ref={bodyRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        onClick={() => {
          if (!window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
        }}
        className="no-scrollbar min-h-0 flex-1 cursor-text space-y-1.5 overflow-y-auto px-6 py-4"
      >
        {lines.map((line) => (
          <div key={line.id}>{line.node}</div>
        ))}
        <label className="flex items-center">
          <span className="sr-only">Terminal command</span>
          <Prompt cwd={cwd} />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            enterKeyHint="go"
            placeholder={lines.length <= 1 ? "type help and press Enter" : undefined}
            className="ml-2 min-w-0 flex-1 bg-transparent text-white caret-sky-400 outline-none placeholder:text-white/25 focus-visible:outline-none"
          />
        </label>
      </div>

      <div className="flex shrink-0 items-center gap-2 overflow-x-auto border-t border-white/10 bg-white/[0.03] px-5 py-2.5 no-scrollbar">
        <span className="shrink-0 text-[13px] text-white/40">try:</span>
        {suggestedCommands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => submit(cmd)}
            className="shrink-0 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[13px] text-emerald-300 transition-colors hover:border-emerald-400/40 hover:bg-emerald-400/10"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}
