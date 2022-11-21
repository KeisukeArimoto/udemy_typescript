function Logger(logString: string) {
  console.log("Loggerファクトリ");
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log("Templateファクトリ");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log("テンプレートを表示");
        const hookEelement = document.getElementById(hookId);
        if (hookEelement) {
          hookEelement.innerHTML = template;
          hookEelement.querySelector("h1")!.textContent = this.name;
        }
      }
    };
  };
}

@Logger("ログ出力中")
@WithTemplate("<h1>Personオブジェクト</h1>", "app")
class Person {
  name = "Max";

  constructor() {
    console.log("Personオブジェクトを作成中...");
  }
}

const person = new Person();
console.log(person);

// ----

function Log(target: any, propertyName: string | Symbol) {
  console.log("Propertyデコレーター");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descripter: PropertyDescriptor) {
  console.log("Accessorデコレーター");
  console.log(target);
  console.log(name);
  console.log(descripter);
}

function Log3(
  target: any,
  name: string | Symbol,
  descripter: PropertyDescriptor
) {
  console.log("Methodデコレーター");
  console.log(target);
  console.log(name);
  console.log(descripter);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameterデコレーター");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("不正な価格です - 0以下は設定できません");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book", 100);
const p2 = new Product("Book2", 200);

function Autobind(_: any, _2: string, descripter: PropertyDescriptor) {
  const originalMethod = descripter.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "クリックしました！";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener("click", p.showMessage);

// ----

interface ValidateConfig {
  [prop: string]: {
    [validatableProp: string]: string[];
  };
}

const registerdValidators: ValidateConfig = {};

function Required(target: any, propertyName: string) {
  registerdValidators[target.constructor.name] = {
    ...registerdValidators[target.constructor.name],
    [propertyName]: ["required"],
  };
}

function PositiveNumber(target: any, propertyName: string) {
  registerdValidators[target.constructor.name] = {
    ...registerdValidators[target.constructor.name],
    [propertyName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registerdValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    console.log(prop);
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert("正しく入力してください！");
    return;
  }

  console.log(createdCourse);
});
