declare module "unorm" {
  export function nfc(str: string): string;
  export function nfd(str: string): string;
  export function nfkc(str: string): string;
  export function nfkd(str: string): string;
}
