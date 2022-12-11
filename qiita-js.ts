// Object

// Spread(...)
const rect = { type: "rectangle", width: 50, height: 50 };
const rectClone = { ...rect };
console.log(rectClone); // Shallow Copy

const rectDeepClone = JSON.parse(JSON.stringify(rectClone)); // DeepClone

// 残余引数 .. 配列
const type = { type: "rectangle" };
const coords = { x: 20, y: 10 };
const size = { width: 50, height: 20 };

function mergedObjects(...objects) {
  return { ...objects };
}

console.log(mergedObjects(type, coords, size));
// {
//     '0': { type: 'rectangle' },
//     '1': { x: 20, y: 10 },
//     '2': { width: 50, height: 20 }
//  }

// 分割代入
let { x, a: y, z = 0 } = { a: 1, x: 10 };
console.log(x, y, z); // 10 1 0

// for-of, for-in
const numFor = [1, 2, 3];
for (const n of numFor) {
  console.log(n);
}

for (const [index, word] of numFor.entries()) {
  console.log(index, word);
}

// switch
const food = "a";
switch (food) {
  case "q":
  case "w":
  case "e":
    console.log("くだもの");
    break;
  case "a":
  case "b":
  case "c":
    console.log("炭水化物");
    break;
  case "d":
  case "e":
  case "f":
    console.log("野菜");
    break;
  default:
    console.log("未知の食べ物");
    break;
}

let caseSwitch = 1;
switch (x) {
  case 1: {
    const sameName = "A";
    break;
  }
  case 2: {
    const sameName = "B";
    break;
  }
}

// Exception
try {
  throw new Error("Something Wrong");
} catch (e) {
  console.log(e.message);
} finally {
  console.log("End");
}

// Optional Parameter
const helloFunc = (person?: string) => {
  if (typeof person !== undefined) {
    console.log(person);
  }
};

// rest parameter
function restFunc(tmp, ...arg: number[]) {
  console.log(tmp);
  console.log(arg);
}
restFunc(1, 2, 3);

// 分割代入引数
function fooDap({ a, b: anotherName }: { a: number; b: number }) {
  console.log(a, anotherName);
}
fooDap({ a: 1, b: 2 });

// Object
class Person {
  name: string;
  constructor(personName: string) {
    this.name = personName;
  }
  greet(name: string): string {
    return `Hello${name}`;
  }
}
const alice = new Person("Alice");

interface Human {
  think(): void;
}
class Developer implements Human {
  think(): void {
    console.log("hum..");
  }
}

// API

// Map<K,V> .. キーと値のペアを取り扱う
const map = new Map<string, number>();
map.set("a", 1);
console.log(map.get("a")); // 1

// 型の再利用
type Obj = { a: string; b: string; c: string };
type Keys = keyof Obj; // 'a' | 'b' | 'c'
// keyOf は Mapped Typesとよく使われる
type SystemSupportLanguage = "en" | "fr" | "it" | "es";
type Butterfly = {
  readonly [key in SystemSupportLanguage]: string;
};
const butterflies: Butterfly = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};

type PersonReq = {
  surname: string;
  middleName?: string;
  givenName: string;
};
// Required<T>
type RequiredPerson = Required<PersonReq>;
// ReadOnly<T>
type ReadOnlyPerson = Readonly<Person>;
// Partial<T>
type partialPerson = Partial<Person>;
// Record<Keys, Type>
type StringNumber = Record<string, number>;
const value: StringNumber = { a: 1, b: 2, c: 3 };
// Pick<T,Keys>
type PickUser = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};
type PickedUser = Pick<PickUser, "surname" | "middleName" | "givenName">;
// type PickedUser = {
//   surname: string;
//   middleName?: string;
//   givenName: string;
// };

// Omit<T,Keys>
type OmitOptional =
  | "age"
  | "address"
  | "nationality"
  | "createdAt"
  | "updatedAt";
type OmitUser = Omit<PickUser, OmitOptional>;
// type OmitUser = {
//   surname: string;
//   middleName?: string;
//   givenName: string;
// };

// Exclude<T,U>..T=Union

// Extract<T,U>
// ExcludeとExtractは背反

// Tips
const profile = {
  name: "suin",
  twitter: "suin",
  github: "suin",
  country: "JP",
  prefecture: "東京都",
  city: "千代田区",
  address: "丸の内2-4-1",
  building: "丸ビル",
  zipcode: "100-6390",
};
// 上の9つプロパティを持つオブジェクトから、下の6つのプロパティだけを抽出したオブジェクトを得たい
const address = {
  country: "JP",
  prefecture: "東京都",
  city: "千代田区",
  address: "丸の内2-4-1",
  building: "丸ビル",
  zipcode: "100-6390",
};
const sns = (({ twitter, github }) => ({ twitter, github }))(profile);
