import type { RefObject } from "react";
import QRCodeStyling from "qr-code-styling";
import { Download } from "lucide-react";

interface Props {
  qrCode: RefObject<QRCodeStyling | null>;
  transparentBackground: boolean;
}

export function ExportButtons({ qrCode, transparentBackground }: Props) {
  const download = (extension: "png" | "jpeg" | "svg") => {
    qrCode.current?.download({
      name: "qr-studio-code",
      extension,
    });
  };

  const extensions = transparentBackground
  ? (["png", "svg"] as const)
  : (["png", "jpeg", "svg"] as const);

return (
  <div
    className={
      transparentBackground
        ? "mt-5 grid grid-cols-2 gap-3"
        : "mt-5 grid grid-cols-3 gap-3"
    }
  >
    {extensions.map((extension) => (
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