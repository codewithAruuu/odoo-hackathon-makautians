import { useState } from "react";
import { HRMSProvider, useHRMS } from "@/lib/hrms/store";
import { Login } from "./Login";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { Dashboard } from "./views/Dashboard";
import { Employees } from "./views/Employees";
import { Attendance } from "./views/Attendance";
import { Leave } from "./views/Leave";
import { Payroll } from "./views/Payroll";
import { ReimbursementView } from "./views/Reimbursement";
import { Hiring } from "./views/Hiring";
import { Profile } from "./views/Profile";

export type ViewKey =
  | "dashboard" | "employees" | "attendance" | "leave"
  | "payroll" | "reimbursement" | "hiring" | "profile";

function Shell() {
  const { currentUser, ready } = useHRMS();
  const [view, setView] = useState<ViewKey>("dashboard");
  const [query, setQuery] = useState("");

  if (!ready) {
    return <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">Loading Adamas HRMS…</div>;
  }

  if (!currentUser) return <Login />;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar view={view} setView={setView} />
      <div className="flex-1 min-w-0">
        <TopBar query={query} setQuery={setQuery} />
        <main className="p-6">
          {view === "dashboard" && <Dashboard />}
          {view === "employees" && <Employees query={query} />}
          {view === "attendance" && <Attendance />}
          {view === "leave" && <Leave />}
          {view === "payroll" && <Payroll />}
          {view === "reimbursement" && <ReimbursementView />}
          {view === "hiring" && currentUser.role === "admin" && <Hiring />}
          {view === "profile" && <Profile />}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HRMSProvider>
      <Shell />
    </HRMSProvider>
  );
}
