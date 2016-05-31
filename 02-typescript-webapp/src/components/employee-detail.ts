import * as Core from "../app"
import * as Models from "../models"
import {EmployeeList} from "./employee-list"

export class EmployeeDetail implements Core.IApplication {
    private employee : Models.Employee;
    private appElement : JQuery;
    private employeeForm : {[field: string]: JQuery};
    private isBinding: boolean;
    
    constructor(emp: Models.Employee) {
        this.employee = emp;
        this.employeeForm = {};
    }
    
    unbind(unbindDone?: Function): void {
        this.appElement
            .find("*")
            .off('change')
            .off('click');
    }
    
    bind(): JQuery{
        this.appElement = $(this.renderHTML());
        
        // Assign pointers to form elements
        this.employeeForm["firstName"] = this.appElement.find('input[data-bind="firstName"]')
        this.employeeForm["lastName"] = this.appElement.find('input[data-bind="lastName"]')
        this.employeeForm["age"] = this.appElement.find('input[data-bind="age"]')
        this.employeeForm["department"] = this.appElement.find('select[data-bind="department"]')
        this.employeeForm["back"] = this.appElement.find('.btn-back')
        this.employeeForm["*"] = this.appElement.find('input, select')
        
        // Bind event handlers to bind the DOM -> Memory changes
        this.employeeForm["*"].on('change', (evt) => {
            this.updateMemory();
        });
        
        // Load up the DOM values
        this.updateDOM();
        
        this.employeeForm["back"].click((e) => {
            Core.MainApp.load(new EmployeeList(Core.MainApp.Current.employees))
        })
        
        return this.appElement;
    }
    
    updateDOM() {
        this.employeeForm["firstName"].val(this.employee.firstName);
        this.employeeForm["lastName"].val(this.employee.lastName);
        this.employeeForm["age"].val(this.employee.age);
        this.employeeForm["department"].val(this.employee.department);
    }
    
    updateMemory() {
        this.employee.firstName = this.employeeForm["firstName"].val();
        this.employee.lastName = this.employeeForm["lastName"].val();
        this.employee.age = this.employeeForm["age"].val();
        this.employee.department = this.employeeForm["department"].val();
    }
    
    
    renderHTML() : string {
        let html = `
        <div class="employee-details">
            <h2>Employee Profile</h2>
            <form class="form-horizontal">
                <div class="form-group">
                    <label class="col-lg-4">First Name</label>
                    <div class="col-lg-4">
                        <input class="form-control" value="${this.employee.firstName}" data-bind="firstName"> 
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-4">Last Name</label>
                    <div class="col-lg-4">
                        <input class="form-control" value="${this.employee.lastName}" data-bind="lastName"> 
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-4">Age</label>
                    <div class="col-lg-4">
                        <input class="form-control" type="number" value="${this.employee.age}" data-bind="age"> 
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-4">Age</label>
                    <div class="col-lg-4">
                        <select class="form-control" type="number" data-bind="department">
                            <option value="Accounting">Accounting</option>
                            <option value="Finance">Finance</option>
                            <option value="Public Relations">Public Relations</option>
                            <option value="Marketing">Marketing</option>
                        </select> 
                    </div>
                </div>
            </form>
            <button class="btn btn-block btn-back">Back</button>
        </div>
        `;
        return html;
    }
}