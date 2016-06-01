import {Employee} from "./models"
import {IEmployeeService} from "./employee-service"

export interface IMainCtrlScope {
    test: string
    anotherTest: number
}

export class MainCtrl {
    static $inject: string[] = ['$scope', '$http', 'EmployeeService']
    private value: string
    private employees: Employee[]
    
    constructor(private scope: IMainCtrlScope, 
                private http: ng.IHttpService,
                private employeeSvc: IEmployeeService) {
        this.value = "Hello World from TS"
        
        this.employeeSvc
            .getEmployees()
            .then((data) => {
                this.employees = data
            })
        
    }

    greet() {
        alert(this.value)
    }
    
}