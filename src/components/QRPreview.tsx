import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import type { QRConfig } from "../types/qr.types";
import { ExportButtons } from "./ExportButtons";
import { buildQRData } from "../utils/buildQRData";

interface Props {
  config: QRConfig;
  transparentBackground: boolean;
  setTransparentBackground: React.Dispatch<React.SetStateAction<boolean>>;
}

export function QRPreview({
  config,
  transparentBackground,
  setTransparentBackground,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
  const options = {
    width: config.size,
    height: config.size,
    data: buildQRData(config),
    margin: config.margin,
    image: config.logo ?? undefined,
    qrOptions: {
      errorCorrectionLevel: "H" as const,
    },
    dotsOptions: {
      color: config.dotColor,
      type: config.dotStyle,
    },
    backgroundOptions: {
      color: transparentBackground
        ? "rgba(255,255,255,0)"
        : config.backgroundColor,
    },
    cornersSquareOptions: {
      color: config.cornerSquareColor,
      type: config.cornerSquareStyle,
    },
    cornersDotOptions: {
      color: config.cornerDotColor,
      type: config.cornerDotStyle,
    },
    imageOptions: {
      crossOrigin: "anonymous" as const,
      margin: 8,
      imageSize: 0.35,
      hideBackgroundDots: true,
    },
  };

  if (!qrCodeRef.current) {
    qrCodeRef.current = new QRCodeStyling(options);

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      qrCodeRef.current.append(containerRef.current);
    }
  } else {
    qrCodeRef.current.update(options);
  }
}, [config, transparentBackground]);

return (
  <aside className="w-full min-w-0 rounded-3xl self-start border border-white/10 bg-white/[0.04] p-4 backdrop-blur lg:sticky lg:top-8 lg:p-5">
    <div>
      <h2 className="text-lg font-semibold text-white">Aperçu</h2>
    </div>

    <div
  className="mt-6 flex w-full justify-center overflow-hidden rounded-3xl border p-4 lg:p-6 transition-all"
  style={{
  backgroundColor: transparentBackground
    ? "transparent"
    : config.backgroundColor,
  borderColor: transparentBackground
    ? "rgba(255,255,255,0.12)"
    : config.backgroundColor,
}}
>
  <div className="max-w-full overflow-hidden" ref={containerRef} />
</div>

  <label className="mt-4 flex cursor-pointer items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-300">
    <input
      type="checkbox"
      checked={transparentBackground}
      onChange={(e) => setTransparentBackground(e.target.checked)}
      className="h-4 w-4 accent-cyan-400"
    />
    Fond transparent
  </label>

        <p className="my-4 text-center text-sm text-slate-300 hidden md:block">Choisissez le format à télécharger</p>

    <ExportButtons
  qrCode={qrCodeRef}
  transparentBackground={transparentBackground}
/>
  </aside>
);
}