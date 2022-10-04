export interface MenuLink {
  icon: string;
  text: string;
  href: string;
  chain?: number;
  disabled?: boolean;
  separator?: boolean;
  out?: boolean;
}
