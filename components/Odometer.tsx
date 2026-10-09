// Digits are strips of 0-9; ScrollFx rolls each strip from 0 to its digit. Without JS the final value shows.
export default function Odometer({ value }: { value: string }) {
  return (
    <span className="inline-flex leading-none tabular-nums" aria-label={value} role="text">
      {[...value].map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="odo-digit" aria-hidden="true">
            <span className="odo-strip" data-digit={ch} style={{ transform: `translateY(-${Number(ch) * 10}%)` }}>
              {"0123456789".split("").map((d) => (
                <span key={d}>{d}</span>
              ))}
            </span>
          </span>
        ) : (
          <span key={i} aria-hidden="true">
            {ch}
          </span>
        ),
      )}
    </span>
  );
}
