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
  chainNames: string;
}

export type Network = {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  network_id: number;
  chain_id: string;
  providers: string[];
  rpc_url: string;
  block_explorer: string;
  hub_sort_order?: number;
};