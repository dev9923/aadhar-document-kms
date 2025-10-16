"use client";

export function StepIndicator({
  currentIndex,
  total,
}: {
  currentIndex: number;
  total: number;
}) {
  const pct =
    total > 0
      ? Math.min(100, Math.max(0, ((currentIndex + 1) / total) * 100))
      : 0;

  return (
    <div className="w-full space-y-2 text-center">
      <div className="text-sm font-medium text-muted-foreground">
        Step {currentIndex + 1} of {total}
      </div>
      <div className="mx-auto h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-300 ease-in-out bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
