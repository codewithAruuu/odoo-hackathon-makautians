import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { HRMSState, Employee } from "./types";
import { createSeed } from "./seed";

const KEY = "hrms-state-v1";

function load(): HRMSState {
  if (typeof window === "undefined") return createSeed();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const seed = createSeed();
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as HRMSState;
  } catch {
    return createSeed();
  }
}

interface Ctx {
  state: HRMSState;
  ready: boolean;
  setState: (updater: (s: HRMSState) => HRMSState) => void;
  currentUser: Employee | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  switchAccount: (id: string) => void;
  logActivity: (message: string, actorId?: string) => void;
  resetSeed: () => void;
}

const HRMSCtx = createContext<Ctx | null>(null);

export function HRMSProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<HRMSState>(() => createSeed());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStateRaw(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {}
  }, [state, ready]);

  const setState = (updater: (s: HRMSState) => HRMSState) => setStateRaw((s) => updater(s));

  const currentUser = useMemo(
    () => state.employees.find((e) => e.id === state.sessionId) ?? null,
    [state.employees, state.sessionId],
  );

  const login = (email: string, password: string) => {
    const user = state.employees.find(
      (e) => e.email.toLowerCase() === email.toLowerCase() && e.password === password,
    );
    if (!user) return false;
    setState((s) => ({ ...s, sessionId: user.id }));
    return true;
  };

  const logout = () => setState((s) => ({ ...s, sessionId: null }));

  const switchAccount = (id: string) => setState((s) => ({ ...s, sessionId: id }));

  const logActivity = (message: string, actorId?: string) =>
    setState((s) => ({
      ...s,
      activity: [
        { id: Math.random().toString(36).slice(2), message, actorId, at: new Date().toISOString() },
        ...s.activity,
      ].slice(0, 40),
    }));

  const resetSeed = () => {
    const s = createSeed();
    setStateRaw(s);
  };

  return (
    <HRMSCtx.Provider value={{ state, ready, setState, currentUser, login, logout, switchAccount, logActivity, resetSeed }}>
      {children}
    </HRMSCtx.Provider>
  );
}

export function useHRMS() {
  const ctx = useContext(HRMSCtx);
  if (!ctx) throw new Error("useHRMS must be inside HRMSProvider");
  return ctx;
}