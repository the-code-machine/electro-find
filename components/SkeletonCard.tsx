export function SkeletonCard() {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-card">
      {/* Image skeleton */}
      <div className="h-[120px] w-[120px] flex-shrink-0 rounded-xl bg-shimmer" />
      {/* Content skeleton */}
      <div className="flex flex-1 flex-col gap-3 pt-1">
        <div className="h-3 w-20 rounded bg-shimmer" />
        <div className="h-4 w-full rounded bg-shimmer" />
        <div className="h-4 w-3/4 rounded bg-shimmer" />
        <div className="mt-auto flex items-center justify-between">
          <div className="h-6 w-24 rounded bg-shimmer" />
          <div className="h-8 w-20 rounded-xl bg-shimmer" />
        </div>
      </div>
    </div>
  );
}
