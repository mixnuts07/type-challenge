// プリミティブ ... イミュータブル不変　boolean, number, string, undefined, null, symbol(一意で不変), bigint
const numeric_number = 100_000_100; // 1億
console.log(typeof numeric_number); // number
// オブジェクト ... ミュータブル可変

// readonly, const ... オブジェクトを不変にする
const obj = { a: 1 };
obj.a = 2;
console.log(obj); // { a: 2 }

// テンプレートリテラル ... `${}`

console.log(typeof null); // object

// undefinedは「値が代入されていないため、値がない」
// nullは「代入すべき値が存在しないため、値がない」

// Symbol
const s1 = Symbol("foo");
const s2 = Symbol("foo");
console.log(s1 === s1); // true
