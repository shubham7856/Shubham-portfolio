export default function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.18em] text-faint mb-6">
      <span className="text-accent">{index}</span> / {label}
    </p>
  );
}
