"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Department = /** @class */ (function () {
    function Department(id, name) {
        this.id = id;
        this.name = name;
        //   private readonly id: string;
        //   name: string;
        this.employees = [];
        // this.id = id;
        // this.name = name;
    }
    Department.createEmployee = function (name) {
        return { name: name };
    };
    Department.prototype.addEmployee = function (employee) {
        this.employees.push(employee);
    };
    Department.prototype.printEmployeeInformation = function () {
        console.log(this.employees.length);
        console.log(this.employees);
    };
    Department.fiscalYear = 2022;
    return Department;
}());
var ITDepartment = /** @class */ (function (_super) {
    __extends(ITDepartment, _super);
    function ITDepartment(id, admins) {
        var _this = _super.call(this, id, "IT") || this;
        _this.admins = admins;
        return _this;
    }
    ITDepartment.prototype.describe = function () {
        console.log("IT部門 - ID: " + this.id);
    };
    return ITDepartment;
}(Department));
var AccountingDepartment = /** @class */ (function (_super) {
    __extends(AccountingDepartment, _super);
    function AccountingDepartment(id, reports) {
        var _this = _super.call(this, id, "Accounting") || this;
        _this.reports = reports;
        _this.lastReport = reports[0];
        return _this;
    }
    Object.defineProperty(AccountingDepartment.prototype, "mostRecentReport", {
        get: function () {
            if (this.lastReport) {
                return this.lastReport;
            }
            throw new Error("レポートが見つかりません。");
        },
        set: function (value) {
            if (!value) {
                throw new Error("正しい値を設定してください。");
            }
            this.addReport(value);
        },
        enumerable: false,
        configurable: true
    });
    AccountingDepartment.getInstance = function () {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    };
    AccountingDepartment.prototype.describe = function () {
        console.log("会計部門・ID: " + this.id);
    };
    AccountingDepartment.prototype.addReport = function (text) {
        this.reports.push(text);
        this.lastReport = text;
    };
    AccountingDepartment.prototype.printReports = function () {
        console.log(this.reports);
    };
    AccountingDepartment.prototype.addEmployee = function (name) {
        if (name === "Max") {
            return;
        }
        this.employees.push(name);
    };
    return AccountingDepartment;
}(Department));
var employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);
var it = new ITDepartment("d1", ["Max"]);
it.addEmployee("Max");
it.addEmployee("Manu");
//privateでないプロパティにはクラスの外からアクセスできてしまう
// accounting.employees[2] = "Annna";
it.describe();
it.printEmployeeInformation();
// const accountingCopy = { name: "Dummy", describe: accounting.describe };
// accountingCopy.describe();
// const accounting = new AccountingDepartment("d2", []);
var accounting = AccountingDepartment.getInstance();
var accounting2 = AccountingDepartment.getInstance();
console.log(accounting, accounting2);
//console.log(accounting.mostRecentReport);
accounting.mostRecentReport = "通期会計レポート";
accounting.addReport("Something");
console.log(accounting.mostRecentReport);
// accounting.printReports();
accounting.addEmployee("Max");
accounting.addEmployee("Manu");
// accounting.printEmployeeInformation();
accounting.describe();
