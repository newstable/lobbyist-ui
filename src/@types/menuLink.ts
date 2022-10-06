import { type } from "os";

interface chainChild {
  icon: string,
  text: string,
  href: string,
  chain: number
}

export interface MenuLink {
  icon: string;
  text: string;
  href: string;
  chain?: number;
  type?: string;
  childtype?: boolean;
  separator?: boolean;
  child?: chainChild[]
}