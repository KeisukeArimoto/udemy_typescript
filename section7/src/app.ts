const names: Array<string> = [];

const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "値がありません";
  if (element.length > 0) {
    descriptionText = "値は" + element.length + "個です。";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(["Sports", "Cooking"]));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

extractAndConvert({ name: "Max" }, "name");

class DataStrage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItem() {
    return [...this.data];
  }
}

const textStrage = new DataStrage<string>();
textStrage.addItem("Data1");
textStrage.addItem("Data2");
textStrage.removeItem("Data1");
console.log(textStrage.getItem());

const numberStrage = new DataStrage<number>();

// const objStrage = new DataStrage<object>();
// const obj = { name: "Max" };
// objStrage.addItem(obj);
// objStrage.addItem({ name: "Manu" });

// objStrage.removeItem(obj);
// console.log(objStrage.getItem());

interface CourceGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourceGoal {
  let courseGoal: Partial<CourceGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourceGoal;
}

const names2: Readonly<string[]> = ["Max", "Anna"];
// names2.pop("Manu");
