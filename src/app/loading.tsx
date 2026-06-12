export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div
        className="w-8 h-8 border-2 rounded-full animate-spin"
        style={{ borderColor: "#534344", borderTopColor: "#C6A972" }}
      />
      <p
        className="text-[13px] tracking-[0.1em]"
        style={{ fontFamily: "var(--font-inter)", color: "#d9c1c2" }}
      >
        Loading...
      </p>
    </div>
  );
}
