import { StringUtils } from "./string/mod.ts";
import { NumberUtils } from "./number/mod.ts";
import { GeoUtils } from "./geo/mod.ts";
import { HttpUtils } from "./http/mod.ts";

console.log("For the 'Serving x+ functions' string on every package:");
console.log("StringUtils:", Object.keys(StringUtils).length);
console.log("NumberUtils:", Object.keys(NumberUtils).length);
console.log("GeoUtils   :", Object.keys(GeoUtils).length);
console.log("HttpUtils  :", Object.keys(HttpUtils).length);
