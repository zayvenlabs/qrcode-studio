export type DotStyle =
  | "square"
  | "dots"
  | "rounded"
  | "classy"
  | "classy-rounded"
  | "extra-rounded";

export type CornerSquareStyle = "square" | "dot" | "extra-rounded";

export type CornerDotStyle = "square" | "dot";

export type QRContentType = "url" | "text" | "email" | "wifi";

export interface QRConfig {
  contentType: QRContentType;
  data: string;
  email: string;
  emailSubject: string;
  emailBody: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: "WPA" | "WEP" | "nopass";
  size: number;
  margin: number;
  dotColor: string;
  backgroundColor: string;
  cornerSquareColor: string;
  cornerDotColor: string;
  dotStyle: any;
  cornerSquareStyle: any;
  cornerDotStyle: any;
  logo: string | null;
}

