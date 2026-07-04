import { Building2, LayoutDashboard, Users, Clock, CalendarDays, Wallet, Receipt, Briefcase, UserCircle2, LogOut } from "lucide-react";
import type { ViewKey } from "./App";
import { useHRMS } from "@/lib/hrms/store";

const items: Array<{ key: ViewKey; label: string; icon: any; adminOnly?: boolean }> = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "employees", label: "Employees", icon: Users },
  { key: "attendance", label: "Attendance", icon: Clock },
  { key: "leave", label: "Leave Management", icon: CalendarDays },
  { key: "payroll", label: "Payroll & Payslips", icon: Wallet },
  { key: "reimbursement", label: "Reimbursement", icon: Receipt },
  { key: "hiring", label: "Staff Hiring", icon: Briefcase, adminOnly: true },
  { key: "profile", label: "My Profile", icon: UserCircle2 },
];

export function Sidebar({ view, setView }: { view: ViewKey; setView: (v: ViewKey) => void }) {
  const { currentUser, logout } = useHRMS();
  const isAdmin = currentUser?.role === "admin";

  return (
    <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-[color:var(--sidebar-border)] bg-[color:var(--sidebar)] px-4 py-6">
      <div className="flex items-center gap-2.5 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--primary)] text-primary-foreground">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wide text-muted-foreground">Odoo × Adamas</div>
          <div className="text-sm font-semibold text-sidebar-foreground">HRMS</div>
        </div>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {items
          .filter((i) => !i.adminOnly || isAdmin)
          .map((i) => {
            const active = view === i.key;
            return (
              <button
                key={i.key}
                onClick={() => setView(i.key)}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[color:var(--primary)] text-primary-foreground shadow-sm"
                    : "text-sidebar-foreground hover:bg-[color:var(--sidebar-accent)] hover:text-[color:var(--sidebar-accent-foreground)]"
                }`}
              >
                <i.icon className="h-4 w-4" />
                <span>{i.label}</span>
              </button>
            );
          })}
      </nav>

      <button
        onClick={logout}
        className="mt-auto flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-[color:var(--sidebar-accent)]"
      >
        <LogOut className="h-4 w-4" /> Log out
      </button>
    </aside>
  );
}