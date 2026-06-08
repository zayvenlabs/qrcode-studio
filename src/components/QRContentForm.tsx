import { useEffect, useState } from "react";
import { QRStylePanel } from "./QRStylePanel";
import type { QRConfig, QRContentType } from "../types/qr.types";
import {
  ChevronDown,
  SlidersHorizontal,
  Link,
  Type,
  Mail,
  Wifi,
} from "lucide-react";

interface Props {
  config: QRConfig;
  setConfig: React.Dispatch<React.SetStateAction<QRConfig>>;
}

const contentTypes: {
  label: string;
  value: QRContentType;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}[] = [
  {
    label: "Lien",
    value: "url",
    icon: Link,
  },
  {
    label: "Texte",
    value: "text",
    icon: Type,
  },
  {
    label: "Mail",
    value: "email",
    icon: Mail,
  },
  {
    label: "WiFi",
    value: "wifi",
    icon: Wifi,
  },
];

export function QRContentForm({ config, setConfig }: Props) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    const updateOpenState = () => {
      setAdvancedOpen(media.matches);
    };

    updateOpenState();
    media.addEventListener("change", updateOpenState);

    return () => media.removeEventListener("change", updateOpenState);
  }, []);

  const handleContentTypeChange = (contentType: QRContentType) => {
    setConfig((prev) => ({
      ...prev,
      contentType,
      data: contentType === "url" ? "" : "",
      email: "",
      emailSubject: "",
      emailBody: "",
      wifiSsid: "",
      wifiPassword: "",
    }));
  };

  return (
    <section className="w-full min-w-0 rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur lg:p-5">
      <h2 className="text-lg font-semibold text-white">Contenu</h2>

      <p className="mt-1 text-sm text-zinc-400">
        Choisissez le type de QR Code à générer.
      </p>

      <div className="mt-4 flex flex-wrap gap-2 md:gap-4">
        {contentTypes.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => handleContentTypeChange(item.value)}
            className={
  config.contentType === item.value
    ? "inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-2 md:px-3 py-2 text-sm font-medium text-white"
    : "inline-flex items-center gap-2 rounded-xl border border-white/10 px-2 md:px-3 py-2 text-sm text-zinc-300 transition hover:border-cyan-300 hover:text-white"
}
          >
            <>
  <item.icon size={16} />
  {item.label}
</>

          </button>
        ))}
      </div>

      {config.contentType === "url" && (
        <div className="mt-4">
          <input
            type="text"
            value={config.data}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, data: e.target.value }))
            }
            placeholder="liendusite.com"
            className="mt-1 h-12 w-full min-w-0 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400"
          />
        </div>
      )}

      {config.contentType === "text" && (
        <div className="mt-4">
          <input
            type="text"
            value={config.data}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, data: e.target.value }))
            }
            placeholder="Saisissez votre texte"
            className="mt-2 h-12 w-full min-w-0 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400"
          />
        </div>
      )}

      {config.contentType === "email" && (
        <div className="mt-4">
          <input
            type="email"
            value={config.email}
            onChange={(e) =>
              setConfig((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="votreadresse@mail.fr"
            className="mt-2 h-12 w-full min-w-0 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400"
          />
        </div>
      )}

      {config.contentType === "wifi" && (
        <div className="mt-4 grid gap-3">
          <div>
            <label className="text-xs font-medium text-zinc-400">
              Nom du réseau WiFi
            </label>
            <input
              type="text"
              value={config.wifiSsid}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, wifiSsid: e.target.value }))
              }
              placeholder="Freebox_78B969"
              className="mt-2 h-12 w-full min-w-0 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-400">
              Mot de passe
            </label>
            <input
              type="password"
              value={config.wifiPassword}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  wifiPassword: e.target.value,
                }))
              }
              placeholder="Mot de passe WiFi"
              className="mt-2 h-12 w-full min-w-0 rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-400">
              Sécurité
            </label>
            <select
              value={config.wifiEncryption}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  wifiEncryption: e.target.value as QRConfig["wifiEncryption"],
                }))
              }
              className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-sm text-white outline-none transition focus:border-cyan-400"
            >
              <option value="WPA" className="bg-zinc-950">
                WPA/WPA2
              </option>
              <option value="WEP" className="bg-zinc-950">
                WEP
              </option>
              <option value="nopass" className="bg-zinc-950">
                Aucun mot de passe
              </option>
            </select>
          </div>
        </div>
      )}

      <div className="mt-2 rounded-2xl border border-white/10 bg-black/20">
        <button
          type="button"
          onClick={() => setAdvancedOpen((prev) => !prev)}
          className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
              <SlidersHorizontal size={18} />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white">
                Paramètres avancés
              </h3>
              <p className="truncate text-xs text-zinc-400">
                Couleurs, formes, taille, marge et logo.
              </p>
            </div>
          </div>

          <span
            className={`text-lg text-zinc-400 transition ${
              advancedOpen ? "rotate-180" : ""
            }`}
          >
            <ChevronDown />
          </span>
        </button>

        {advancedOpen && (
          <div className="border-t border-white/10 p-4">
            <QRStylePanel config={config} setConfig={setConfig} />
          </div>
        )}
      </div>
    </section>
  );
}