import { AppShell } from "@/components/layout/app-shell";
import { requireUser } from "@/lib/auth/require-user";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default async function AppLayout({ children }: AppLayoutProps) {
  const user = await requireUser();

  return <AppShell user={user}>{children}</AppShell>;
}
