import type { QRConfig } from "../types/qr.types";

export function buildQRData(config: QRConfig): string {
  if (config.contentType === "url") {
    const value = config.data.trim();

    if (!value) {
      return "https://zayven.fr";
    }

    if (
      value.startsWith("http://") ||
      value.startsWith("https://")
    ) {
      return value;
    }

    return `https://${value}`;
  }

  if (config.contentType === "email") {
    const email = config.email.trim();

    if (!email) {
      return "https://zayven.fr";
    }

    // Format reconnu par la majorité des scanners QR
    return `MATMSG:TO:${email};SUB:;BODY:;;`;
  }

  if (config.contentType === "wifi") {
    const ssid = config.wifiSsid.trim();
    const password = config.wifiPassword.trim();

    if (!ssid) {
      return "https://zayven.fr";
    }

    return `WIFI:T:${config.wifiEncryption};S:${ssid};P:${password};;`;
  }

  if (config.contentType === "text") {
    return config.data.trim() || "Votre texte";
  }

  return "https://zayven.fr";
}