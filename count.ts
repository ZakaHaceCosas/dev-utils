import * as S from "./string/mod.ts";
import { NumberUtils } from "./number/mod.ts";
import { GeoUtils } from "./geo/mod.ts";
import { HttpUtils } from "./http/mod.ts";

function countMethods(obj: object): number {
  return Object.values(obj).filter(
    (v) => typeof v === "function" && !/^class\s/.test(Function.prototype.toString.call(v)),
  ).length;
}

const StringUtils = countMethods(S);

console.log("For the 'Serving x+ functions' string on every package:");
console.log("StringUtils:", StringUtils);
console.log("NumberUtils:", Object.keys(NumberUtils).length);
console.log("GeoUtils   :", Object.keys(GeoUtils).length);
console.log("HttpUtils  :", Object.keys(HttpUtils).length);
