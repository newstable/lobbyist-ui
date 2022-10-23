export type Protocol = {
  name: EnumProtocolName;
  symbol: ProtocolSymbol;
};

export type ProtocolSymbol = "qidao" | "aave" | "aurafinance" | "beets" | "saddlefinance" | "onx-finance" | "gauge.rbn" | "vesqdao";

export enum EnumProtocolName {
  qidao = "QiDAO",
  aave = "Aave",
  aurafinance = "Aura",
  beets = "Beethovenx",
  saddlefinance = "Saddle",
  onx = "OnX",
  ribbon = "Ribbon",
  proposal = "Proposals",
  protocols = "Protocols",
  analytics = "Analytics",
  vesqdao = "VESQ",
}

export enum EnumProtocolSymbolName {
  qidao = "Qi",
  aave = "Aave",
}

export const ProtocolsList: Protocol[] = [
  { name: EnumProtocolName.qidao, symbol: "qidao" },
  { name: EnumProtocolName.aave, symbol: "aave" },
  { name: EnumProtocolName.aurafinance, symbol: "aurafinance" },
  { name: EnumProtocolName.beets, symbol: "beets" },
  { name: EnumProtocolName.saddlefinance, symbol: "saddlefinance" },
  { name: EnumProtocolName.onx, symbol: "onx-finance" },
  { name: EnumProtocolName.ribbon, symbol: "gauge.rbn" },
  { name: EnumProtocolName.vesqdao, symbol: "vesqdao" },
];
