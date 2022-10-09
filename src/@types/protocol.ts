export type Protocol = {
  name: EnumProtocolName;
  symbol: ProtocolSymbol;
};

export type ProtocolSymbol = "qidao" | "aave" | "aura" | "beethovenx" | "saddle" | "onx" | "ribbon";

export enum EnumProtocolName {
  qidao = "QiDAO",
  aave = "Aave",
  aura = "Aura",
  beethovenx = "Beethovenx",
  saddle = "Saddle",
  onx = "OnX",
  ribbon = "Ribbon",
  wall = "Proposals Wall"
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
];
