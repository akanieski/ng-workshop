export class Employee {
    public firstName: string;
    public lastName: string;
    public department: string;
    public age: number;
    public id: string;
    
    constructor(id: string, firstName: string, lastName: string, department: string, age: number) {
        // create employee based off seed data
        this.firstName = firstName;
        this.lastName = lastName;
        this.department = department;
        this.age = age;
        this.id = id;
    }
    
    get fullName(): string {
        return this.firstName + " " + this.lastName;
    }
}
export interface EmployeesByDepartment {
    [department: string]: Array<Employee>
}
