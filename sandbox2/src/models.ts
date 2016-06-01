export enum Department {
    Accounting,
    Marketing,
    Facilities
}
export class Employee {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    department: Department;
}