import type { LucideIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  action?: React.ReactNode;
  metric?: {
    label: string;
    value: string | number;
  };
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  action,
  metric,
}: AdminPageHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-card via-card to-primary/5 p-6 shadow-sm sm:p-8">
      <div className="absolute -right-16 -top-20 size-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Icon className="size-6" />
          </div>
          <div>
            <Badge variant="secondary" className="mb-3 rounded-full px-3 py-1 text-xs">
              {eyebrow}
            </Badge>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 lg:shrink-0">
          {metric ? (
            <div className="rounded-2xl border bg-background/80 px-5 py-3">
              <p className="text-xs font-medium text-muted-foreground">{metric.label}</p>
              <p className="mt-1 text-2xl font-bold">{metric.value}</p>
            </div>
          ) : null}
          {action}
        </div>
      </div>
    </div>
  );
}
