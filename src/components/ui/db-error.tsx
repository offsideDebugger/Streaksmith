import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type DbErrorProps = {
  title?: string;
  message: string;
};

export function DbError({
  title = "Database connection failed",
  message,
}: DbErrorProps) {
  return (
    <Card className="border-[color:var(--warning)]/40">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Prisma could not reach PostgreSQL. This is usually not a missing client
          — check your connection and schema.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-[color:var(--text-2)]">
        <p className="rounded-lg bg-[color:var(--surface-2)] p-3 font-mono text-xs">
          {message}
        </p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Confirm <code className="text-[color:var(--text-1)]">DATABASE_URL</code> is set in <code className="text-[color:var(--text-1)]">.env</code></li>
          <li>Run <code className="text-[color:var(--text-1)]">bun run db:setup</code> to generate the client and sync the schema</li>
          <li>Restart the dev server: <code className="text-[color:var(--text-1)]">bun dev</code></li>
        </ol>
      </CardContent>
    </Card>
  );
}
