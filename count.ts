import * as S from "./string/mod.ts";
import * as N from "./number/mod.ts";
import * as G from "./geo/mod.ts";
import * as H from "./http/mod.ts";

function countMethods(obj: object): number {
  return Object.values(obj).filter(
    (v) => typeof v === "function" && !/^class\s/.test(Function.prototype.toString.call(v)),
  ).length;
}

const StringUtils = countMethods(S) + 1;
const NumberUtils = countMethods(N);
const HttpUtils = countMethods(H);
const GeoUtils = countMethods(G);

console.log("For the 'Serving x+ functions' string on every package:");
console.log("StringUtils:", StringUtils);
console.log("NumberUtils:", NumberUtils);
console.log("HttpUtils  :", HttpUtils);
console.log("GeoUtils   :", GeoUtils);
