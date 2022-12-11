// TypeScriptで気をつけること。
// 実行時エラーとコンパイルエラーは別！！

// プリミティブ ... イミュータブル不変　boolean, number, string, undefined, null, symbol(一意で不変), bigint
let numeric_number = 100_000_100; // 1億
console.log(typeof numeric_number); // number
// オブジェクト ... ミュータブル可変

// readonly, const ... オブジェクトを不変にする
let obj = { a: 1 };
obj.a = 2;
console.log(obj); // { a: 2 }

// テンプレートリテラル ... `${}`

console.log(typeof null); // object

// undefinedは「値が代入されていないため、値がない」
// nullは「代入すべき値が存在しないため、値がない」

// Symbol
let s1 = Symbol("foo");
let s2 = Symbol("foo");
console.log(s1 === s1); // true

// リテラル literal type ... プリミティブ型の特定の値のみ許容
let litNum: 123 = 123;
let litStr: "foo" = "foo"; // 'foo'以外はエラー

// readonly .. プロパティの代入不可。 const .. 変数の代入不可
let objReadOnly: {
  readonly foo: number;
  bar: string;
};
objReadOnly = { foo: 1, bar: "1" };
objReadOnly.bar = "2";

// Object Property
let size: { width?: number };
size = {}; // OK

// Index Signature === Record<K,T>
let IsObj: {
  [K: string]: number;
};
IsObj = { a: 1, b: 2 };
IsObj.c = 3;
IsObj["d"] = 4;

let IsRcObj: Record<string, number>;

// 配列

// 読み取り専用の配列
const nums: readonly number[] = [1, 2, 3];
const numsArray: ReadonlyArray<number> = [1, 2, 3];

const readonlyNumber: readonly number[] = [1, 2, 3];
const writableNUmber: number[] = readonlyNumber as number[];

// Tuple
async function takes3Seconds(): Promise<number> {
  return 3;
}
async function takes5Seconds(): Promise<string> {
  return "5";
}
export const tuple: [number, string] = await Promise.all([
  takes3Seconds(),
  takes5Seconds(),
]);

// Union
type List = (string | number)[];
// 判別可能なユニオン型（タグ付きユニオン、直和型）
type UPloadStatus = InProgress | Success | Failure;
type InProgress = { type: "InProgress"; progress: number };
type Success = { type: "Success" };
type Failure = { type: "Failure"; error: "Error" };

function printStatus(status: UPloadStatus) {
  if (status.type === "InProgress") {
    console.log(`Success: Progress ... ${status.progress}`);
  } else if (status.type === "Failure") {
    console.log(`Failure.. ${status.error}`);
  } else {
    console.log("Invalid Status");
  }
}

// InterSection Type (&で型結合)
type TwoDimensionalPoint = {
  x: number;
  y: number;
};
type Z = {
  z: number;
};
type ThreeDimensionalPoint = {
  x: 0;
  y: 0;
  z: 0;
};
// Required, Partialで必須プロパティをわかりやすくするのに使える
type Mandatory = Required<{
  id: string;
  active: number;
  balance: number;
  surname: string;
}>;
type Optional = Partial<{
  index: number;
  photo: string;
  age: number;
  company: string;
}>;
type Parameter = Mandatory & Optional;

// Type Alias
// プリミティブ型
type Str = string;
// リテラル型
type OK = 200;
// 配列型
type Numbers = number[];
// オブジェクト型
type UserObject = { id: number; name: string };
// ユニオン型
type NumberOrNull = number | null;
// 関数型
type CallbackFunction = (value: string) => boolean;

// Type Assertion .. 型推論を上書き
// 型アサーションを使う前に、型ガード・ユーザ定義方ガードで解決できるか検討する。
const value: string | number = "This Is A String";
const strLength: number = (value as string).length;

// as const .. オブジェクトリテラルの末尾に記述すると、プロパティがreadonlyで指定したものと同等になる
const pikachu = {
  name: "pikachu",
  no: 25,
  height: 0.4,
  weight: 0.4,
} as const;
// Error !!代入不可 pikachu.name= 'change'

// definite assignment assertion(確実な代入の表明)
let num!: number;
console.log(num * 2);
// 非NULLアサーション
console.log(num! * 2);

// never .. 値を持たない
// 何も代入できない。never型のみ代入できる。

// 何にでも代入できる
const nev = 1 as never;
const aNev: string = nev;
const bNev: string[] = nev;
// neverはswitchの網羅性チェックで使える
type Extension = "js" | "ts" | "json";
class ExhaustiveError extends Error {
  constructor(value: never, message = `Unsupported type: ${value}`) {
    super(message);
  }
}
function printLang(ext: Extension): void {
  switch (ext) {
    case "js":
      console.log("JS");
      break;
    case "ts":
      console.log("TS");
      break;
    default:
      throw new ExhaustiveError(ext);
  }
}

// 制御フロー分析
function showMonth(month: string | number) {
  if (typeof month === "string") {
    console.log(month.padStart(2, "0"));
    return;
  }
  console.log(month.toFixed());
}
// 型ガード
// if(typeof foo === 'string')
function getMonth(date: string | Date) {
  if (date instanceof Date) {
    console.log(date.getMonth() + 1);
  }
}

interface Wizard {
  castMagic(): void;
}
interface SwordMan {
  slashSword(): void;
}

function attack(player: Wizard | SwordMan) {
  if ("castMagic" in player) {
    player.castMagic();
  } else {
    player.slashSword();
  }
}

// 型ガード関数
function isWizard(player: Player): player is Wizard {
  return "castMagic" in player;
}

function attack2(player: Wizard | SwordMan) {
  if (isWizard(player)) {
    player.castMagic();
  } else {
    player.slashSword();
  }
}
attack2("slashSword");

function getMonth2(date: string | Date) {
  const isDate = date instanceof Date;
  if (isDate) {
    console.log(date.getMonth() + 1);
  }
}
