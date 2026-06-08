import { useState } from "react";
import { QRContentForm } from "./components/QRContentForm";
import { QRPreview } from "./components/QRPreview";
import type { QRConfig } from "./types/qr.types";
import { FaGithub } from "react-icons/fa";
import { ScanQrCode } from "lucide-react";

const defaultConfig: QRConfig = {
  contentType: "url",
  data: "",
  email: "",
  emailSubject: "",
  emailBody: "",
  wifiSsid: "",
  wifiPassword: "",
  wifiEncryption: "WPA",
  size: 250,
  margin: 10,
  dotColor: "#111827",
  backgroundColor: "#ffffff",
  cornerSquareColor: "#06b6d4",
  cornerDotColor: "#111827",
  dotStyle: "rounded",
  cornerSquareStyle: "extra-rounded",
  cornerDotStyle: "dot",
  logo: null,
};

export default function App() {
  const [config, setConfig] = useState<QRConfig>(defaultConfig);

  return (
    <main className="min-h-screen overflow-x-hidden bg-zinc-950 px-4 py-5 text-white lg:px-10 lg:py-8">
      <div className="mx-auto items-start w-full max-w-[860px]">
        <header className="mb-7 hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur lg:block">
          <div className="mt-3 flex items-end justify-between gap-6">
            <div>
              <h1 className="flex gap-2 font-['Plus_Jakarta_Sans'] text-5xl font-bold tracking-tight">
              <ScanQrCode size={50} /> QR Studio</h1>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Créez, personnalisez et exportez de beaux QR Codes directement
                depuis votre navigateur.
              </p>
            </div>

            <a
              href="https://github.com/zayvenlabs/qrcode-studio"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-zinc-400 transition hover:border-cyan-300 hover:text-cyan-200"
            >
             <FaGithub size={18} /> Dépôt GitHub
            </a>
          </div>
        </header>

        <div className="grid w-full items-start gap-5 lg:grid-cols-[420px_420px]">
          <QRContentForm config={config} setConfig={setConfig} />
          <QRPreview config={config} />
        </div>
      </div>
    </main>
  );
}