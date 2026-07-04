import { useState } from "react";
import { useHRMS } from "@/lib/hrms/store";
import { Building2, Users, ShieldCheck, TrendingUp } from "lucide-react";

export function Login() {
  const { login, state } = useHRMS();
  const [email, setEmail] = useState("priya@adamas.hr");
  const [password, setPassword] = useState("admin123");
  const [err, setErr] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!login(email, password)) setErr("Invalid credentials. Try priya@adamas.hr / admin123");
  };

  const quickPick = (id: string) => {
    const emp = state.employees.find((x) => x.id === id);
    if (!emp) return;
    setEmail(emp.email);
    setPassword(emp.password);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left panel — brand */}
      <div className="relative hidden overflow-hidden bg-[color:var(--primary)] p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 60%, white 1px, transparent 1px)", backgroundSize: "44px 44px, 60px 60px" }} />
        <div className="relative flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 backdrop-blur">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <div className="text-sm opacity-80">Enterprise HR Suite</div>
            <div className="text-lg font-semibold">Odoo × Adamas HRMS</div>
          </div>
        </div>

        <div className="relative max-w-md">
          <h1 className="text-4xl font-bold leading-tight">Welcome to Adamas HR</h1>
          <p className="mt-3 text-white/85">
            Manage attendance, payroll, hiring and employee wellness — all in one place, tailored for Indian workplaces.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { icon: Users, label: "11 Employees" },
              { icon: ShieldCheck, label: "RBAC Secured" },
              { icon: TrendingUp, label: "Live Insights" },
            ].map((f) => (
              <div key={f.label} className="rounded-xl bg-white/10 p-3 backdrop-blur">
                <f.icon className="h-5 w-5" />
                <div className="mt-2 text-xs font-medium">{f.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative text-xs text-white/70">© 2026 Adamas HR • Made for India ₹</div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center bg-background p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--primary)] text-primary-foreground">
              <Building2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Odoo × Adamas</div>
              <div className="text-base font-semibold text-foreground">HR Management System</div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-foreground">Welcome back</h2>
          <p className="mt-1 text-sm text-muted-foreground">Log in to your Adamas dashboard to continue managing your team.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-medium text-foreground">Email Address</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[color:var(--input)] bg-background px-3 py-2.5 text-sm outline-none focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/20"
                placeholder="you@adamas.hr"
                required
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-foreground">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-[color:var(--input)] bg-background px-3 py-2.5 text-sm outline-none focus:border-[color:var(--primary)] focus:ring-2 focus:ring-[color:var(--primary)]/20"
                required
              />
            </label>

            {err && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {err}
              </div>
            )}

            <button
              type="submit"
              className="w-full rounded-lg bg-[color:var(--primary)] py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
            >
              Log In
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-[color:var(--border)] bg-[color:var(--primary-soft)]/40 p-4">
            <div className="text-xs font-semibold text-foreground">Quick demo accounts</div>
            <p className="text-[11px] text-muted-foreground">Admin password: admin123 • Employees: employee123</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {state.employees.slice(0, 4).map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => quickPick(e.id)}
                  className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-foreground shadow-sm ring-1 ring-[color:var(--border)] hover:bg-[color:var(--primary)] hover:text-primary-foreground"
                >
                  {e.name.split(" ")[0]} · {e.role}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}