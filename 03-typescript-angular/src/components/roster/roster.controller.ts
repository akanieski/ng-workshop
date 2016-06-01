import {IEmployeeService} from "../../services/employee.service"
import {Employee} from "../../models"

export class RosterController {
    static $inject: string[] = ['EmployeeService'];
    
    private employees: Employee[];
    
    constructor(private employeeService: IEmployeeService) {
        this.employeeService
            .getEmployees()
            .then((employees) => {
                this.employees = employees;
            })
    }
}
