import { type } from "os";

interface chainChild {
  icon: any,
  text: string,
  href: string,
  chain: number
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