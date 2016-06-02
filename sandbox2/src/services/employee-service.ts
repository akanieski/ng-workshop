import {Employee} from "../models"
import {IConfig} from "../app"

export interface IEmployeeService {
    getEmployees(): ng.IPromise<Employee[]>
    getEmployee(employeeId: string): ng.IPromise<Employee>
}
export class EmployeeService implements IEmployeeService {
    static $inject: string[] = ['$http', '$q', 'config']
    
    constructor(private http: ng.IHttpService, 
                private q: ng.IQService, 
                private config: IConfig) { }
    
    getEmployees(): ng.IPromise<Employee[]> {
        return this.q((resolve, reject) => {
            this.http
                .get<Employee[]>(`${this.config.baseUrl}/api/employees`)
                .then((resp) => {
                    resolve(resp.data)
                })
        })
    }
    
    getEmployee(employeeId: string): ng.IPromise<Employee> {
        return this.q((resolve, reject) => {
            this.http
                .get<Employee>(`${this.config.baseUrl}/api/employee/${employeeId}`)
                .then((resp) => {
                    resolve(resp.data)
                })
        })
    }
}