"use strict";
var _a;
const e1 = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date(),
};
function add(a, b) {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = add("Hello", "Typescript");
result.split(" ");
const fetchedUserData = {
    id: "u1",
    name: "useer1",
    job: {
        title: "Developer",
        description: "TypeScript",
    },
};
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const userInput = "";
const storedData = userInput !== null && userInput !== void 0 ? userInput : "DEFAULT";
const storedDataOr = userInput || "DEFAULT";
console.log(storedData);
console.log(storedDataOr);
function printEmployeeInformation(emp) {
    console.log(emp.name);
    if ("privileges" in emp) {
        console.log("Privileges" + emp.privileges);
    }
    if ("startDate" in emp) {
        console.log("StartDate" + emp.startDate);
    }
}
printEmployeeInformation({ name: "Manu", startDate: new Date() });
class Car {
    drive() {
        console.log("運転中....");
    }
}
class Truck {
    drive() {
        console.log("トラックを運転中...");
    }
    loadCargo(amount) {
        console.log("荷物を載せています..." + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.type) {
        case "bird":
            speed = animal.flyingSpeed;
            break;
        case "horse":
            speed = animal.runningSpeed;
            break;
    }
    console.log(speed);
}
moveAnimal({ type: "bird", flyingSpeed: 10 });
// const userInputElement = <HTMLInputElement>document.getElementById("user-input")!;
const userInputElement = document.getElementById("user-input");
userInputElement.value = "こんにちは";
const errorBag = {
    email: "正しいメールアドレスではありません",
    username: "ユーザ名に記号を含めることはできません",
};
