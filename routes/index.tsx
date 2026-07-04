import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import App from "@/components/hrms/App";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <ClientOnly fallback={<div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">Loading Adamas HRMS…</div>}>
      <App />
    </ClientOnly>
  );
}
