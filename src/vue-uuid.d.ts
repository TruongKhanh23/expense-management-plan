declare module "vue-uuid" {
  export function uuid(): string;
  export namespace uuid {
    function v1(): string;
    function v4(): string;
  }
}
