export enum Department {
    Accounting,
    Marketing,
    Facilities
}
export class Employee {
    employeeId: string;
    firstName: string;
    lastName: string;
    age: number;
    department: Department;
}