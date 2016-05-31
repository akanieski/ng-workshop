import * as Core from "../app"
import * as Models from "../models"
import {EmployeeDetail} from "./employee-detail"

export class EmployeeList implements Core.IApplication {
    private employees : Array<Models.Employee>;
    private mainAppElement : JQuery;
    private btnRefreshElement : JQuery;
    private employeeListItems : JQuery;
    
    constructor(emps: Models.Employee[]) {
        this.employees = emps
    }
    
    unbind(unbindDone?: Function): void{
        if (this.btnRefreshElement) {
            this.btnRefreshElement.off('click');
            this.btnRefreshElement = null;
        }
        if (this.employeeListItems) {
            this.employeeListItems.off('click');
            this.employeeListItems = null;
        }
        if (unbindDone) unbindDone();
    }
    
    bind(): JQuery{
        this.mainAppElement = $(this.renderHTML());
        
        this.btnRefreshElement = this.mainAppElement.find('#btnRefresh');
        this.btnRefreshElement.click((ev: MouseEvent) => {
            this.unbind();
            this.bind();
        });
        
        this.employeeListItems = this.mainAppElement.find('.employee-list-item');
        this.employeeListItems.click((evt) => {
            let empId = $(evt.currentTarget).data('employee-id');
            let emp = this.employees.filter((e) => e.id == empId).pop();
            console.log(`switching to ${emp.fullName}`);
            Core.MainApp.load(new EmployeeDetail(emp));
        });
        
        return this.mainAppElement;
    }
    
    
    renderHTML() : string {
        let html = `
            <h2 align=center>Employee Roster</h2>
        `;
        
        let data: Models.EmployeesByDepartment = {};
        
        for (let emp of this.employees) {
            data[emp.department] = data[emp.department] || new Array<Models.Employee>();
            data[emp.department].push(emp);
        }
        
        for (let dept in data) {
            let itemsHtml = '';
            for (let emp of data[dept]) {
                itemsHtml += `
                    <div class="list-group">
                        <a class="list-group-item employee-list-item" data-employee-id="${emp.id}">
                            <h4 class="list-group-item-heading">${emp.fullName}</h4>
                            <p class="list-group-item-text">Age: ${emp.age}</p>
                        </a>
                    </div>`;
            }
            html += `
                <div class="panel panel-default">
                    <div class="panel-heading">
                        ${dept} <label class="badge pull-right">${data[dept].length}</label>
                    </div>
                    ${itemsHtml}
                </div>
            `;
        }
        html += `<a class="btn btn-block btn-success" id="btnRefresh">Refresh</a>`
        return html;
    }
}
