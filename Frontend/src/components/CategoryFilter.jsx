import { useEffect, useState } from "react";

const ALL = [
  { key: "clubs", label: "Clubs" },
  { key: "events", label: "Events" },
  { key: "academics", label: "Academics" },
];

export default function CategoryFilter({ value = [], onChange }) {
  const [selected, setSelected] = useState(new Set(value));

  useEffect(() => {
    setSelected(new Set(value));
  }, [value]);

  const toggle = (key) => {
    const next = new Set(selected);
    next.has(key) ? next.delete(key) : next.add(key);
    setSelected(next);
    onChange?.(Array.from(next));
  };

  const reset = () => {
    setSelected(new Set());
    onChange?.([]);
  };

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
      {ALL.map(c => (
        <label key={c.key} style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={selected.has(c.key)}
            onChange={() => toggle(c.key)}
          />
          {c.label}
        </label>
      ))}
      <button type="button" onClick={reset} style={{ padding: "4px 10px" }}>
        Reset
      </button>
    </div>
  );
}
