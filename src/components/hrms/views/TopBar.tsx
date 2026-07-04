import { Search, Bell, Settings } from "lucide-react";
import { useHRMS } from "@/lib/hrms/store";

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

export function TopBar({ query, setQuery }: { query: string; setQuery: (v: string) => void }) {
  const { currentUser, state, switchAccount } = useHRMS();
  if (!currentUser) return null;
  return (
    <div className="sticky top-0 z-30 flex flex-col gap-3 border-b border-[color:var(--border)] bg-background/80 px-6 py-4 backdrop-blur md:flex-row md:items-center md:gap-6">
      <div>
        <div className="text-xs text-muted-foreground">Hello {currentUser.name.split(" ")[0]},</div>
        <div className="text-xl font-semibold text-foreground">{greeting()}</div>
      </div>

      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search employees, requests, payslips…"
          className="w-full rounded-full border border-[color:var(--border)] bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-[color:var(--primary)]"
        />
      </div>

      <div className="flex items-center gap-3">
        <button className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--border)] bg-white text-muted-foreground hover:text-foreground">
          <Settings className="h-4 w-4" />
        </button>
        <button className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--border)] bg-white text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
        </button>

        <select
          value={currentUser.id}
          onChange={(e) => switchAccount(e.target.value)}
          title="Switch account (debug)"
          className="hidden rounded-full border border-[color:var(--border)] bg-white px-3 py-1.5 text-xs md:block"
        >
          {state.employees.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name} · {e.role}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white p-1 pr-3">
          <img src={currentUser.photo} alt="" className="h-8 w-8 rounded-full bg-muted object-cover" />
          <div className="text-right leading-tight">
            <div className="text-xs font-semibold text-foreground">{currentUser.name}</div>
            <div className="text-[10px] uppercase text-muted-foreground">{currentUser.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}