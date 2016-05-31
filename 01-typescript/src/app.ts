module Sample {
    
    export class MainApp {
        private employees : Array<Sample.Models.Employee>;
        private mainAppElement : HTMLElement;
        private btnRefreshElement : HTMLElement;
        
        constructor() {
            this.employees = new Array<Sample.Models.Employee>(
                new Sample.Models.Employee(
                    "John",
                    "Doe",
                    "Accounting",
                    37
                ),
                new Sample.Models.Employee(
                    "Sally",
                    "Langston",
                    "Accounting",
                    17
                ),
                new Sample.Models.Employee(
                    "Jim",
                    "Beam",
                    "Marketing",
                    61
                )
            );
            
            this.render();
            this.btnRefreshElement.addEventListener('click', (ev: MouseEvent) => {
                this.render();
            });
        }
            
        render() {
            this.mainAppElement.innerHTML = this.renderHTML();
        }
        
        renderHTML() : string {
            let html = '<a class="btn btn-block btn-success" id="btnRefresh">Refresh</a>';
            
            let data: System.Collections.Dictionary<Sample.Models.Employee[]> = {};
            
            for (let emp of this.employees) {
                data[emp.department] = data[emp.department] || new Array<Sample.Models.Employee>();
                data[emp.department].push(emp);
            }
            
            for (let dept in data) {
                let itemsHtml = '';
                for (let emp of data[dept]) {
                    itemsHtml += `
                        <div class="list-group">
                            <a class="list-group-item">
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
            return html;
        }
    }


    window.onload = () => {
        new Sample.MainApp()
    }
    
}