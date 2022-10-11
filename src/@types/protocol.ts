export type Protocol = {
  name: EnumProtocolName;
  symbol: ProtocolSymbol;
};

export type ProtocolSymbol = "qidao" | "aave" | "aura" | "beethovenx" | "saddle" | "onx" | "ribbon" | "vesq";

export enum EnumProtocolName {
  qidao = "QiDAO",
  aave = "Aave",
  aura = "Aura",
  beethovenx = "Beethovenx",
  saddle = "Saddle",
  onx = "OnX",
  ribbon = "Ribbon",
  proposal = "Proposals",
  protocols = "Protocols",
  analytics = "Analytics",
  vesq = "VESQ",
}

export enum EnumProtocolSymbolName {
  qidao = "Qi",
  aave = "Aave",
}

export const ProtocolsList: Protocol[] = [
  { name: EnumProtocolName.qidao, symbol: "qidao" },
  { name: EnumProtocolName.aave, symbol: "aave" },
  { name: EnumProtocolName.aura, symbol: "aura" },
  { name: EnumProtocolName.beethovenx, symbol: "beethovenx" },
  { name: EnumProtocolName.saddle, symbol: "saddle" },
  { name: EnumProtocolName.onx, symbol: "onx" },
  { name: EnumProtocolName.ribbon, symbol: "ribbon" },
  { name: EnumProtocolName.vesq, symbol: "vesq" },
];
