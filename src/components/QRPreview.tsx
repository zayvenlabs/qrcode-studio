import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";
import type { QRConfig } from "../types/qr.types";
import { ExportButtons } from "./ExportButtons";
import { buildQRData } from "../utils/buildQRData";

interface Props {
  config: QRConfig;
}

export function QRPreview({ config }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    qrCodeRef.current = new QRCodeStyling({
      width: config.size,
      height: config.size,
      data: buildQRData(config),
      margin: config.margin,
      image: config.logo ?? undefined,
      qrOptions: {
        errorCorrectionLevel: "H",
      },
      dotsOptions: {
        color: config.dotColor,
        type: config.dotStyle,
      },
      backgroundOptions: {
        color: config.backgroundColor,
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
        crossOrigin: "anonymous",
        margin: 8,
        imageSize: 0.35,
        hideBackgroundDots: true,
      },
    });

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      qrCodeRef.current.append(containerRef.current);
    }
  }, []);

  useEffect(() => {
    qrCodeRef.current?.update({
      width: config.size,
      height: config.size,
      data: buildQRData(config),
      margin: config.margin,
      image: config.logo ?? undefined,
      dotsOptions: {
        color: config.dotColor,
        type: config.dotStyle,
      },
      backgroundOptions: {
        color: config.backgroundColor,
      },
      cornersSquareOptions: {
        color: config.cornerSquareColor,
        type: config.cornerSquareStyle,
      },
      cornersDotOptions: {
        color: config.cornerDotColor,
        type: config.cornerDotStyle,
      },
    });
  }, [config]);

return (
  <aside className="w-full min-w-0 rounded-3xl self-start border border-white/10 bg-white/[0.04] p-4 backdrop-blur lg:sticky lg:top-8 lg:p-5">
    <div>
      <h2 className="text-lg font-semibold text-white">Aperçu</h2>
    </div>

    <div
  className="mt-6 flex w-full justify-center overflow-hidden rounded-3xl border p-4 lg:p-6 transition-all"
  style={{
    backgroundColor: config.backgroundColor,
    borderColor: config.backgroundColor,
  }}
>
  <div className="max-w-full overflow-hidden" ref={containerRef} />
</div>
        <p className="my-4 text-center text-sm text-slate-300 hidden md:block">Choisissez le format à télécharger</p>

    <ExportButtons qrCode={qrCodeRef} />
  </aside>
);
}