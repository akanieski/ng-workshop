import * as Models from "../models"
import {IConfig, IResponse} from "../app"

export interface IEmployeeService {
    getEmployees(): ng.IPromise<Array<Models.Employee>> ;
    getEmployee(employeeId: string): ng.IPromise<Models.Employee> ;
}

export class EmployeeService implements IEmployeeService {
    
    static $inject: string[] = ['$http', '$q', 'config']
    
    constructor(private http: ng.IHttpService, 
                private Q: ng.IQService, 
                private config: IConfig) { }
    
    getEmployees(): ng.IPromise<Array<Models.Employee>> {
        return this.Q((resolve: ng.IQResolveReject<Array<Models.Employee>>, reject) => {
            this.http
                .get(`${this.config.apiBaseUrl}/api/employees`)
                .then((resp) => {
                    resolve(<Array<Models.Employee>>(<IResponse>resp.data).data)
                })
                .catch((resp) => {
                    reject(resp)
                })
        })
    }
    
    getEmployee(employeeId: string): ng.IPromise<Models.Employee> {
        return this.Q((resolve: ng.IQResolveReject<Models.Employee>, reject) => {
            this.http
                .get(`${this.config.apiBaseUrl}/api/employee/${employeeId}`)
                .then((resp) => {
                    resolve(<Models.Employee>(<IResponse>resp.data).data)
                })
                .catch((resp) => {
                    reject(resp)
                })
        })
    }
}