module Sample.Models {
    export class Employee {
        public firstName: string;
        public lastName: string;
        public department: string;
        public age: number;
        
        constructor(firstName: string, lastName: string, department: string, age: number) {
            // create employee based off seed data
            this.firstName = firstName;
            this.lastName = lastName;
            this.department = department;
            this.age = age; 
        }
        
        get fullName(): string {
            return this.firstName + " " + this.lastName;
        }
    }
    export interface EmployeesByDepartment {
        [department: string]: Array<Sample.Models.Employee>
    }
}

module System.Collections {
    export interface Dictionary<T> {
        [Key: string]: T;
    }
}