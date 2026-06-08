import type {
  CornerDotStyle,
  CornerSquareStyle,
  DotStyle,
  QRConfig,
} from "../types/qr.types";

import { HexColorPicker } from "react-colorful";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
interface Props {
  config: QRConfig;
  setConfig: React.Dispatch<React.SetStateAction<QRConfig>>;
}

const dotStyles: DotStyle[] = [
  "square",
  "dots",
  "rounded",
  "classy",
  "classy-rounded",
  "extra-rounded",
];

const cornerSquareStyles: CornerSquareStyle[] = [
  "square",
  "dot",
  "extra-rounded",
];

const cornerDotStyles: CornerDotStyle[] = ["square", "dot"];

export function QRStylePanel({ config, setConfig }: Props) {
  const handleLogoUpload = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setConfig((prev) => ({
        ...prev,
        logo: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-white">Style</h2>
      <p className="mt-1 text-sm text-zinc-400">
        Personnalisez le style de votre QR Code.
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <ColorInput
          label="Couleur des modules"
          value={config.dotColor}
          onChange={(value) =>
            setConfig((prev) => ({ ...prev, dotColor: value }))
          }
        />

        <ColorInput
          label="Couleur de fond"
          value={config.backgroundColor}
          onChange={(value) =>
            setConfig((prev) => ({ ...prev, backgroundColor: value }))
          }
        />

        <ColorInput
          label="Couleur des repères"
          value={config.cornerSquareColor}
          onChange={(value) =>
            setConfig((prev) => ({ ...prev, cornerSquareColor: value }))
          }
        />

        <ColorInput
          label="Centre des repères"
          value={config.cornerDotColor}
          onChange={(value) =>
            setConfig((prev) => ({ ...prev, cornerDotColor: value }))
          }
        />
      </div>

      <div className="mt-5 grid gap-4">
        <SelectInput
          label="Modules"
          value={config.dotStyle}
          options={dotStyles}
          onChange={(value) =>
            setConfig((prev) => ({ ...prev, dotStyle: value as DotStyle }))
          }
        />

        <SelectInput
          label="Repères"
          value={config.cornerSquareStyle}
          options={cornerSquareStyles}
          onChange={(value) =>
            setConfig((prev) => ({
              ...prev,
              cornerSquareStyle: value as CornerSquareStyle,
            }))
          }
        />

        <SelectInput
          label="Centre des repères"
          value={config.cornerDotStyle}
          options={cornerDotStyles}
          onChange={(value) =>
            setConfig((prev) => ({
              ...prev,
              cornerDotStyle: value as CornerDotStyle,
            }))
          }
        />
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <RangeInput
          label="Taille"
          value={config.size}
          min={220}
          max={420}
          onChange={(value) =>
            setConfig((prev) => ({ ...prev, size: value }))
          }
        />

        <RangeInput
          label="Marge"
          value={config.margin}
          min={0}
          max={30}
          onChange={(value) =>
            setConfig((prev) => ({ ...prev, margin: value }))
          }
        />
      </div>

      <div className="mt-5">
        <label className="text-sm font-medium text-zinc-300">Logo</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleLogoUpload(e.target.files?.[0] ?? null)}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-zinc-300 file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-black"
        />

        {config.logo && (
          <button
            type="button"
            onClick={() => setConfig((prev) => ({ ...prev, logo: null }))}
            className="mt-3 text-sm text-red-300 hover:text-red-200"
          >
            Remove logo
          </button>
        )}
      </div>
    </div>
  );
}

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const modal = open
    ? createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-[28px] border border-white/10 bg-zinc-950 p-5 shadow-2xl shadow-black/50"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-300/70">
                  Couleur
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {label}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
              >
                Fermer
              </button>
            </div>

            <HexColorPicker color={value} onChange={onChange} className="!w-full" />

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-3">
              <div
                className="h-11 w-11 shrink-0 rounded-xl border border-white/15"
                style={{ backgroundColor: value }}
              />

              <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-base font-semibold uppercase text-white outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-4 w-full rounded-2xl bg-cyan-400 py-3 font-semibold text-black transition hover:bg-cyan-300"
            >
              Appliquer
            </button>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <label className="grid gap-2">
        <span className="text-sm font-medium text-zinc-300">{label}</span>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 p-3 text-left transition hover:border-cyan-300/50"
        >
          <div
            className="h-10 w-10 rounded-lg border border-white/10"
            style={{ backgroundColor: value }}
          />

          <span className="text-white">{value}</span>
        </button>
      </label>

      {modal}
    </>
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-300">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-2xl border border-white/10 bg-black/30 p-3 text-sm text-white outline-none focus:border-cyan-400"
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-zinc-950">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function RangeInput({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-zinc-300">
        {label}: {value}px
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}