import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface ProfileFieldProps {
  label: string;
  value?: string | null;
  icon?: ReactNode;
  emptyText?: string;
  className?: string;
}

export default function ProfileField({
  label,
  value,
  icon,
  emptyText = 'Not Added',
  className,
}: ProfileFieldProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-sm',
        className,
      )}
    >
      {/* Label */}
      <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>

      {/* Value */}
      <div className="break-words text-base font-semibold text-foreground">
        {value ? (
          value
        ) : (
          <span className="italic font-normal text-muted-foreground">{emptyText}</span>
        )}
      </div>
    </div>
  );
}
