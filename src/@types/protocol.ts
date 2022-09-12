export type Protocol = {
  name: EnumProtocolName;
  symbol: ProtocolSymbol;
};

export type ProtocolSymbol = "qidao" | "aave";

export enum EnumProtocolName {
  qidao = "QiDAO",
  aave = "Aave",
  vesq = "Vesq",
  // convex = "Convex",
}

export enum EnumProtocolSymbolName {
  qidao = "Qi",
  aave = "Aave",
}

export const ProtocolsList: Protocol[] = [
  { name: EnumProtocolName.qidao, symbol: "qidao" },
  { name: EnumProtocolName.aave, symbol: "aave" },
];
