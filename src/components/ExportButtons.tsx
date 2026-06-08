import type { RefObject } from "react";
import QRCodeStyling from "qr-code-styling";
import { Download } from "lucide-react";

interface Props {
  qrCode: RefObject<QRCodeStyling | null>;
}

export function ExportButtons({ qrCode }: Props) {
  const download = (extension: "png" | "jpeg" | "svg") => {
    qrCode.current?.download({
      name: "qr-studio-code",
      extension,
    });
  };

  return (
    <div className="mt-5 grid grid-cols-3 gap-3">
      {(["png", "jpeg", "svg"] as const).map((extension) => (
        <button
          key={extension}
          type="button"
          onClick={() => download(extension)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-200 hover:text-black"
        >
          <Download size={16} />
          {extension.toUpperCase()}
        </button>
      ))}
    </div>
  );
}