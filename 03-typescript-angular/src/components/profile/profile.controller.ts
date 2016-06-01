import {IEmployeeService} from "../../services/employee.service"
import {Employee} from "../../models"

interface IRouteParams extends ng.route.IRouteParamsService {
    employeeId: string;
}

export class ProfileController {
    static $inject: string[] = ['EmployeeService', '$routeParams'];
    
    private employee: Employee;
    
    constructor(private employeeService: IEmployeeService, 
                private routeParams: IRouteParams) {
        this.employeeService
            .getEmployee(this.routeParams.employeeId)
            .then((employee) => {
                this.employee = employee;
            })
    }
}
