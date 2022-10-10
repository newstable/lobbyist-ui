import { type } from "os";
import { NumericKeys } from "react-hook-form/dist/types/path/common";

interface chainChild {
  icon: any,
  text: string,
  href: string,
  chain: number
}
interface chains {
  name: string;
  id: number;
}

export interface MenuLink {
  icon: any;
  text: string;
  href: string;
  chain?: number;
  type?: string;
  childtype?: boolean;
  separator?: boolean;
  child?: chainChild[]
}

export interface Protocols {
  protocol: string;
  text: string;
  href: string;
  chains: chains[];
  icon: string;
  multiChain: boolean;
}