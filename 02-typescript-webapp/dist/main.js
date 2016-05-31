define("models", ["require", "exports"], function (require, exports) {
    "use strict";
    var Employee = (function () {
        function Employee(id, firstName, lastName, department, age) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.department = department;
            this.age = age;
            this.id = id;
        }
        Object.defineProperty(Employee.prototype, "fullName", {
            get: function () {
                return this.firstName + " " + this.lastName;
            },
            enumerable: true,
            configurable: true
        });
        return Employee;
    }());
    exports.Employee = Employee;
});
define("components/employee-list", ["require", "exports", "app", "components/employee-detail"], function (require, exports, Core, employee_detail_1) {
    "use strict";
    var EmployeeList = (function () {
        function EmployeeList(emps) {
            this.employees = emps;
        }
        EmployeeList.prototype.unbind = function (unbindDone) {
            if (this.btnRefreshElement) {
                this.btnRefreshElement.off('click');
                this.btnRefreshElement = null;
            }
            if (this.employeeListItems) {
                this.employeeListItems.off('click');
                this.employeeListItems = null;
            }
            if (unbindDone)
                unbindDone();
        };
        EmployeeList.prototype.bind = function () {
            var _this = this;
            this.mainAppElement = $(this.renderHTML());
            this.btnRefreshElement = this.mainAppElement.find('#btnRefresh');
            this.btnRefreshElement.click(function (ev) {
                _this.unbind();
                _this.bind();
            });
            this.employeeListItems = this.mainAppElement.find('.employee-list-item');
            this.employeeListItems.click(function (evt) {
                var empId = $(evt.currentTarget).data('employee-id');
                var emp = _this.employees.filter(function (e) { return e.id == empId; }).pop();
                console.log("switching to " + emp.fullName);
                Core.MainApp.load(new employee_detail_1.EmployeeDetail(emp));
            });
            return this.mainAppElement;
        };
        EmployeeList.prototype.renderHTML = function () {
            var html = "\n            <h2 align=center>Employee Roster</h2>\n        ";
            var data = {};
            for (var _i = 0, _a = this.employees; _i < _a.length; _i++) {
                var emp = _a[_i];
                data[emp.department] = data[emp.department] || new Array();
                data[emp.department].push(emp);
            }
            for (var dept in data) {
                var itemsHtml = '';
                for (var _b = 0, _c = data[dept]; _b < _c.length; _b++) {
                    var emp = _c[_b];
                    itemsHtml += "\n                    <div class=\"list-group\">\n                        <a class=\"list-group-item employee-list-item\" data-employee-id=\"" + emp.id + "\">\n                            <h4 class=\"list-group-item-heading\">" + emp.fullName + "</h4>\n                            <p class=\"list-group-item-text\">Age: " + emp.age + "</p>\n                        </a>\n                    </div>";
                }
                html += "\n                <div class=\"panel panel-default\">\n                    <div class=\"panel-heading\">\n                        " + dept + " <label class=\"badge pull-right\">" + data[dept].length + "</label>\n                    </div>\n                    " + itemsHtml + "\n                </div>\n            ";
            }
            html += "<a class=\"btn btn-block btn-success\" id=\"btnRefresh\">Refresh</a>";
            return html;
        };
        return EmployeeList;
    }());
    exports.EmployeeList = EmployeeList;
});
define("components/employee-detail", ["require", "exports", "app", "components/employee-list"], function (require, exports, Core, employee_list_1) {
    "use strict";
    var EmployeeDetail = (function () {
        function EmployeeDetail(emp) {
            this.employee = emp;
            this.employeeForm = {};
        }
        EmployeeDetail.prototype.unbind = function (unbindDone) {
            this.appElement
                .find("*")
                .off('change')
                .off('click');
        };
        EmployeeDetail.prototype.bind = function () {
            var _this = this;
            this.appElement = $(this.renderHTML());
            this.employeeForm["firstName"] = this.appElement.find('input[data-bind="firstName"]');
            this.employeeForm["lastName"] = this.appElement.find('input[data-bind="lastName"]');
            this.employeeForm["age"] = this.appElement.find('input[data-bind="age"]');
            this.employeeForm["department"] = this.appElement.find('select[data-bind="department"]');
            this.employeeForm["back"] = this.appElement.find('.btn-back');
            this.employeeForm["*"] = this.appElement.find('input, select');
            this.employeeForm["*"].on('change', function (evt) {
                _this.updateMemory();
            });
            this.updateDOM();
            this.employeeForm["back"].click(function (e) {
                Core.MainApp.load(new employee_list_1.EmployeeList(Core.MainApp.Current.employees));
            });
            return this.appElement;
        };
        EmployeeDetail.prototype.updateDOM = function () {
            this.employeeForm["firstName"].val(this.employee.firstName);
            this.employeeForm["lastName"].val(this.employee.lastName);
            this.employeeForm["age"].val(this.employee.age);
            this.employeeForm["department"].val(this.employee.department);
        };
        EmployeeDetail.prototype.updateMemory = function () {
            this.employee.firstName = this.employeeForm["firstName"].val();
            this.employee.lastName = this.employeeForm["lastName"].val();
            this.employee.age = this.employeeForm["age"].val();
            this.employee.department = this.employeeForm["department"].val();
        };
        EmployeeDetail.prototype.renderHTML = function () {
            var html = "\n        <div class=\"employee-details\">\n            <h2>Employee Profile</h2>\n            <form class=\"form-horizontal\">\n                <div class=\"form-group\">\n                    <label class=\"col-lg-4\">First Name</label>\n                    <div class=\"col-lg-4\">\n                        <input class=\"form-control\" value=\"" + this.employee.firstName + "\" data-bind=\"firstName\"> \n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-lg-4\">Last Name</label>\n                    <div class=\"col-lg-4\">\n                        <input class=\"form-control\" value=\"" + this.employee.lastName + "\" data-bind=\"lastName\"> \n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-lg-4\">Age</label>\n                    <div class=\"col-lg-4\">\n                        <input class=\"form-control\" type=\"number\" value=\"" + this.employee.age + "\" data-bind=\"age\"> \n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-lg-4\">Age</label>\n                    <div class=\"col-lg-4\">\n                        <select class=\"form-control\" type=\"number\" data-bind=\"department\">\n                            <option value=\"Accounting\">Accounting</option>\n                            <option value=\"Finance\">Finance</option>\n                            <option value=\"Public Relations\">Public Relations</option>\n                            <option value=\"Marketing\">Marketing</option>\n                        </select> \n                    </div>\n                </div>\n            </form>\n            <button class=\"btn btn-block btn-back\">Back</button>\n        </div>\n        ";
            return html;
        };
        return EmployeeDetail;
    }());
    exports.EmployeeDetail = EmployeeDetail;
});
define("components/index", ["require", "exports", "components/employee-detail", "components/employee-list"], function (require, exports, employee_detail_2, employee_list_2) {
    "use strict";
    exports.EmployeeDetail = employee_detail_2.EmployeeDetail;
    exports.EmployeeList = employee_list_2.EmployeeList;
});
define("app", ["require", "exports", "models", "components/index"], function (require, exports, Models, Components) {
    "use strict";
    var MainApp = (function () {
        function MainApp() {
            if (MainApp._mainApp) {
                throw new Error("Main app already instantiated");
            }
            MainApp._mainApp = this;
            this.employees = new Array(new Models.Employee("1000", "John", "Doe", "Accounting", 37), new Models.Employee("1001", "Sally", "Langston", "Accounting", 17), new Models.Employee("1002", "Jim", "Beam", "Marketing", 61));
            this.mainAppElement = $('#main-app');
            MainApp.load(new Components.EmployeeList(this.employees));
        }
        Object.defineProperty(MainApp, "Current", {
            get: function () {
                return MainApp._mainApp;
            },
            enumerable: true,
            configurable: true
        });
        MainApp.load = function (app) {
            var _this = this;
            var launch = function () {
                _this.Current.currentApp = app;
                _this.Current.mainAppElement
                    .append(_this.Current.currentApp.bind())
                    .fadeIn(100);
            };
            if (this.Current.currentApp) {
                this.Current.currentApp.unbind();
                this.Current.mainAppElement
                    .fadeOut(100, function () {
                    _this.Current.mainAppElement.empty();
                    launch();
                });
            }
            else {
                launch();
            }
        };
        MainApp._mainApp = new MainApp();
        return MainApp;
    }());
    exports.MainApp = MainApp;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2RlbHMudHMiLCIuLi9zcmMvY29tcG9uZW50cy9lbXBsb3llZS1saXN0LnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvZW1wbG95ZWUtZGV0YWlsLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvaW5kZXgudHMiLCIuLi9zcmMvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBQUE7UUFPSSxrQkFBWSxFQUFVLEVBQUUsU0FBaUIsRUFBRSxRQUFnQixFQUFFLFVBQWtCLEVBQUUsR0FBVztZQUV4RixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztZQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNmLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLENBQUM7UUFFRCxzQkFBSSw4QkFBUTtpQkFBWjtnQkFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNoRCxDQUFDOzs7V0FBQTtRQUNMLGVBQUM7SUFBRCxDQUFDLEFBbkJELElBbUJDO0lBbkJZLGdCQUFRLFdBbUJwQixDQUFBOzs7O0lDZkQ7UUFNSSxzQkFBWSxJQUF1QjtZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtRQUN6QixDQUFDO1FBRUQsNkJBQU0sR0FBTixVQUFPLFVBQXFCO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDbEMsQ0FBQztZQUNE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O1FBQ0wsQ0FBQztRQTlEYyxnQkFBUSxHQUFhLElBQUksT0FBTyxFQUFFLENBQUM7UUErRHRELGNBQUM7SUFBRCxDQUFDLEFBaEVELElBZ0VDO0lBaEVZLGVBQU8sVUFnRW5CLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgRW1wbG95ZWUge1xyXG4gICAgcHVibGljIGZpcnN0TmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGxhc3ROYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgZGVwYXJ0bWVudDogc3RyaW5nO1xyXG4gICAgcHVibGljIGFnZTogbnVtYmVyO1xyXG4gICAgcHVibGljIGlkOiBzdHJpbmc7XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIGZpcnN0TmFtZTogc3RyaW5nLCBsYXN0TmFtZTogc3RyaW5nLCBkZXBhcnRtZW50OiBzdHJpbmcsIGFnZTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gY3JlYXRlIGVtcGxveWVlIGJhc2VkIG9mZiBzZWVkIGRhdGFcclxuICAgICAgICB0aGlzLmZpcnN0TmFtZSA9IGZpcnN0TmFtZTtcclxuICAgICAgICB0aGlzLmxhc3ROYW1lID0gbGFzdE5hbWU7XHJcbiAgICAgICAgdGhpcy5kZXBhcnRtZW50ID0gZGVwYXJ0bWVudDtcclxuICAgICAgICB0aGlzLmFnZSA9IGFnZTtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGdldCBmdWxsTmFtZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpcnN0TmFtZSArIFwiIFwiICsgdGhpcy5sYXN0TmFtZTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIEVtcGxveWVlc0J5RGVwYXJ0bWVudCB7XHJcbiAgICBbZGVwYXJ0bWVudDogc3RyaW5nXTogQXJyYXk8RW1wbG95ZWU+XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgQ29yZSBmcm9tIFwiLi4vYXBwXCJcclxuaW1wb3J0ICogYXMgTW9kZWxzIGZyb20gXCIuLi9tb2RlbHNcIlxyXG5pbXBvcnQge0VtcGxveWVlRGV0YWlsfSBmcm9tIFwiLi9lbXBsb3llZS1kZXRhaWxcIlxyXG5cclxuZXhwb3J0IGNsYXNzIEVtcGxveWVlTGlzdCBpbXBsZW1lbnRzIENvcmUuSUFwcGxpY2F0aW9uIHtcclxuICAgIHByaXZhdGUgZW1wbG95ZWVzIDogQXJyYXk8TW9kZWxzLkVtcGxveWVlPjtcclxuICAgIHByaXZhdGUgbWFpbkFwcEVsZW1lbnQgOiBKUXVlcnk7XHJcbiAgICBwcml2YXRlIGJ0blJlZnJlc2hFbGVtZW50IDogSlF1ZXJ5O1xyXG4gICAgcHJpdmF0ZSBlbXBsb3llZUxpc3RJdGVtcyA6IEpRdWVyeTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoZW1wczogTW9kZWxzLkVtcGxveWVlW10pIHtcclxuICAgICAgICB0aGlzLmVtcGxveWVlcyA9IGVtcHNcclxuICAgIH1cclxuICAgIFxyXG4gICAgdW5iaW5kKHVuYmluZERvbmU/OiBGdW5jdGlvbik6IHZvaWR7XHJcbiAgICAgICAgaWYgKHRoaXMuYnRuUmVmcmVzaEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5idG5SZWZyZXNoRWxlbWVudC5vZmYoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIHRoaXMuYnRuUmVmcmVzaEVsZW1lbnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5lbXBsb3llZUxpc3RJdGVtcykge1xyXG4gICAgICAgICAgICB0aGlzLmVtcGxveWVlTGlzdEl0ZW1zLm9mZignY2xpY2snKTtcclxuICAgICAgICAgICAgdGhpcy5lbXBsb3llZUxpc3RJdGVtcyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh1bmJpbmREb25lKSB1bmJpbmREb25lKCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGJpbmQoKTogSlF1ZXJ5e1xyXG4gICAgICAgIHRoaXMubWFpbkFwcEVsZW1lbnQgPSAkKHRoaXMucmVuZGVySFRNTCgpKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmJ0blJlZnJlc2hFbGVtZW50ID0gdGhpcy5tYWluQXBwRWxlbWVudC5maW5kKCcjYnRuUmVmcmVzaCcpO1xyXG4gICAgICAgIHRoaXMuYnRuUmVmcmVzaEVsZW1lbnQuY2xpY2soKGV2OiBNb3VzZUV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudW5iaW5kKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYmluZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZW1wbG95ZWVMaXN0SXRlbXMgPSB0aGlzLm1haW5BcHBFbGVtZW50LmZpbmQoJy5lbXBsb3llZS1saXN0LWl0ZW0nKTtcclxuICAgICAgICB0aGlzLmVtcGxveWVlTGlzdEl0ZW1zLmNsaWNrKChldnQpID0+IHtcclxuICAgICAgICAgICAgbGV0IGVtcElkID0gJChldnQuY3VycmVudFRhcmdldCkuZGF0YSgnZW1wbG95ZWUtaWQnKTtcclxuICAgICAgICAgICAgbGV0IGVtcCA9IHRoaXMuZW1wbG95ZWVzLmZpbHRlcigoZSkgPT4gZS5pZCA9PSBlbXBJZCkucG9wKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzd2l0Y2hpbmcgdG8gJHtlbXAuZnVsbE5hbWV9YCk7XHJcbiAgICAgICAgICAgIENvcmUuTWFpbkFwcC5sb2FkKG5ldyBFbXBsb3llZURldGFpbChlbXApKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBcclxuICAgICAgICByZXR1cm4gdGhpcy5tYWluQXBwRWxlbWVudDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICByZW5kZXJIVE1MKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8aDIgYWxpZ249Y2VudGVyPkVtcGxveWVlIFJvc3RlcjwvaDI+XHJcbiAgICAgICAgYDtcclxuICAgICAgICBcclxuICAgICAgICBsZXQgZGF0YTogTW9kZWxzLkVtcGxveWVlc0J5RGVwYXJ0bWVudCA9IHt9O1xyXG4gICAgICAgIFxyXG4gICAgICAgIGZvciAobGV0IGVtcCBvZiB0aGlzLmVtcGxveWVlcykge1xyXG4gICAgICAgICAgICBkYXRhW2VtcC5kZXBhcnRtZW50XSA9IGRhdGFbZW1wLmRlcGFydG1lbnRdIHx8IG5ldyBBcnJheTxNb2RlbHMuRW1wbG95ZWU+KCk7XHJcbiAgICAgICAgICAgIGRhdGFbZW1wLmRlcGFydG1lbnRdLnB1c2goZW1wKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZm9yIChsZXQgZGVwdCBpbiBkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtc0h0bWwgPSAnJztcclxuICAgICAgICAgICAgZm9yIChsZXQgZW1wIG9mIGRhdGFbZGVwdF0pIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1zSHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxpc3QtZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gZW1wbG95ZWUtbGlzdC1pdGVtXCIgZGF0YS1lbXBsb3llZS1pZD1cIiR7ZW1wLmlkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwibGlzdC1ncm91cC1pdGVtLWhlYWRpbmdcIj4ke2VtcC5mdWxsTmFtZX08L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0tdGV4dFwiPkFnZTogJHtlbXAuYWdlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicGFuZWwgcGFuZWwtZGVmYXVsdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGVwdH0gPGxhYmVsIGNsYXNzPVwiYmFkZ2UgcHVsbC1yaWdodFwiPiR7ZGF0YVtkZXB0XS5sZW5ndGh9PC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAke2l0ZW1zSHRtbH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuICAgICAgICBodG1sICs9IGA8YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLXN1Y2Nlc3NcIiBpZD1cImJ0blJlZnJlc2hcIj5SZWZyZXNoPC9hPmBcclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgKiBhcyBDb3JlIGZyb20gXCIuLi9hcHBcIlxyXG5pbXBvcnQgKiBhcyBNb2RlbHMgZnJvbSBcIi4uL21vZGVsc1wiXHJcbmltcG9ydCB7RW1wbG95ZWVMaXN0fSBmcm9tIFwiLi9lbXBsb3llZS1saXN0XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBFbXBsb3llZURldGFpbCBpbXBsZW1lbnRzIENvcmUuSUFwcGxpY2F0aW9uIHtcclxuICAgIHByaXZhdGUgZW1wbG95ZWUgOiBNb2RlbHMuRW1wbG95ZWU7XHJcbiAgICBwcml2YXRlIGFwcEVsZW1lbnQgOiBKUXVlcnk7XHJcbiAgICBwcml2YXRlIGVtcGxveWVlRm9ybSA6IHtbZmllbGQ6IHN0cmluZ106IEpRdWVyeX07XHJcbiAgICBwcml2YXRlIGlzQmluZGluZzogYm9vbGVhbjtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoZW1wOiBNb2RlbHMuRW1wbG95ZWUpIHtcclxuICAgICAgICB0aGlzLmVtcGxveWVlID0gZW1wO1xyXG4gICAgICAgIHRoaXMuZW1wbG95ZWVGb3JtID0ge307XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVuYmluZCh1bmJpbmREb25lPzogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFwcEVsZW1lbnRcclxuICAgICAgICAgICAgLmZpbmQoXCIqXCIpXHJcbiAgICAgICAgICAgIC5vZmYoJ2NoYW5nZScpXHJcbiAgICAgICAgICAgIC5vZmYoJ2NsaWNrJyk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGJpbmQoKTogSlF1ZXJ5e1xyXG4gICAgICAgIHRoaXMuYXBwRWxlbWVudCA9ICQodGhpcy5yZW5kZXJIVE1MKCkpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEFzc2lnbiBwb2ludGVycyB0byBmb3JtIGVsZW1lbnRzXHJcbiAgICAgICAgdGhpcy5lbXBsb3llZUZvcm1bXCJmaXJzdE5hbWVcIl0gPSB0aGlzLmFwcEVsZW1lbnQuZmluZCgnaW5wdXRbZGF0YS1iaW5kPVwiZmlyc3ROYW1lXCJdJylcclxuICAgICAgICB0aGlzLmVtcGxveWVlRm9ybVtcImxhc3ROYW1lXCJdID0gdGhpcy5hcHBFbGVtZW50LmZpbmQoJ2lucHV0W2RhdGEtYmluZD1cImxhc3ROYW1lXCJdJylcclxuICAgICAgICB0aGlzLmVtcGxveWVlRm9ybVtcImFnZVwiXSA9IHRoaXMuYXBwRWxlbWVudC5maW5kKCdpbnB1dFtkYXRhLWJpbmQ9XCJhZ2VcIl0nKVxyXG4gICAgICAgIHRoaXMuZW1wbG95ZWVGb3JtW1wiZGVwYXJ0bWVudFwiXSA9IHRoaXMuYXBwRWxlbWVudC5maW5kKCdzZWxlY3RbZGF0YS1iaW5kPVwiZGVwYXJ0bWVudFwiXScpXHJcbiAgICAgICAgdGhpcy5lbXBsb3llZUZvcm1bXCJiYWNrXCJdID0gdGhpcy5hcHBFbGVtZW50LmZpbmQoJy5idG4tYmFjaycpXHJcbiAgICAgICAgdGhpcy5lbXBsb3llZUZvcm1bXCIqXCJdID0gdGhpcy5hcHBFbGVtZW50LmZpbmQoJ2lucHV0LCBzZWxlY3QnKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIEJpbmQgZXZlbnQgaGFuZGxlcnMgdG8gYmluZCB0aGUgRE9NIC0+IE1lbW9yeSBjaGFuZ2VzXHJcbiAgICAgICAgdGhpcy5lbXBsb3llZUZvcm1bXCIqXCJdLm9uKCdjaGFuZ2UnLCAoZXZ0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWVtb3J5KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gTG9hZCB1cCB0aGUgRE9NIHZhbHVlc1xyXG4gICAgICAgIHRoaXMudXBkYXRlRE9NKCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5lbXBsb3llZUZvcm1bXCJiYWNrXCJdLmNsaWNrKChlKSA9PiB7XHJcbiAgICAgICAgICAgIENvcmUuTWFpbkFwcC5sb2FkKG5ldyBFbXBsb3llZUxpc3QoQ29yZS5NYWluQXBwLkN1cnJlbnQuZW1wbG95ZWVzKSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJldHVybiB0aGlzLmFwcEVsZW1lbnQ7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIHVwZGF0ZURPTSgpIHtcclxuICAgICAgICB0aGlzLmVtcGxveWVlRm9ybVtcImZpcnN0TmFtZVwiXS52YWwodGhpcy5lbXBsb3llZS5maXJzdE5hbWUpO1xyXG4gICAgICAgIHRoaXMuZW1wbG95ZWVGb3JtW1wibGFzdE5hbWVcIl0udmFsKHRoaXMuZW1wbG95ZWUubGFzdE5hbWUpO1xyXG4gICAgICAgIHRoaXMuZW1wbG95ZWVGb3JtW1wiYWdlXCJdLnZhbCh0aGlzLmVtcGxveWVlLmFnZSk7XHJcbiAgICAgICAgdGhpcy5lbXBsb3llZUZvcm1bXCJkZXBhcnRtZW50XCJdLnZhbCh0aGlzLmVtcGxveWVlLmRlcGFydG1lbnQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICB1cGRhdGVNZW1vcnkoKSB7XHJcbiAgICAgICAgdGhpcy5lbXBsb3llZS5maXJzdE5hbWUgPSB0aGlzLmVtcGxveWVlRm9ybVtcImZpcnN0TmFtZVwiXS52YWwoKTtcclxuICAgICAgICB0aGlzLmVtcGxveWVlLmxhc3ROYW1lID0gdGhpcy5lbXBsb3llZUZvcm1bXCJsYXN0TmFtZVwiXS52YWwoKTtcclxuICAgICAgICB0aGlzLmVtcGxveWVlLmFnZSA9IHRoaXMuZW1wbG95ZWVGb3JtW1wiYWdlXCJdLnZhbCgpO1xyXG4gICAgICAgIHRoaXMuZW1wbG95ZWUuZGVwYXJ0bWVudCA9IHRoaXMuZW1wbG95ZWVGb3JtW1wiZGVwYXJ0bWVudFwiXS52YWwoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbiAgICByZW5kZXJIVE1MKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlbXBsb3llZS1kZXRhaWxzXCI+XHJcbiAgICAgICAgICAgIDxoMj5FbXBsb3llZSBQcm9maWxlPC9oMj5cclxuICAgICAgICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtLWhvcml6b250YWxcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY29sLWxnLTRcIj5GaXJzdCBOYW1lPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdmFsdWU9XCIke3RoaXMuZW1wbG95ZWUuZmlyc3ROYW1lfVwiIGRhdGEtYmluZD1cImZpcnN0TmFtZVwiPiBcclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJjb2wtbGctNFwiPkxhc3QgTmFtZTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImZvcm0tY29udHJvbFwiIHZhbHVlPVwiJHt0aGlzLmVtcGxveWVlLmxhc3ROYW1lfVwiIGRhdGEtYmluZD1cImxhc3ROYW1lXCI+IFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzcz1cImNvbC1sZy00XCI+QWdlPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLWxnLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cIm51bWJlclwiIHZhbHVlPVwiJHt0aGlzLmVtcGxveWVlLmFnZX1cIiBkYXRhLWJpbmQ9XCJhZ2VcIj4gXHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiY29sLWxnLTRcIj5BZ2U8L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbGctNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgdHlwZT1cIm51bWJlclwiIGRhdGEtYmluZD1cImRlcGFydG1lbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJBY2NvdW50aW5nXCI+QWNjb3VudGluZzwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkZpbmFuY2VcIj5GaW5hbmNlPC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUHVibGljIFJlbGF0aW9uc1wiPlB1YmxpYyBSZWxhdGlvbnM8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNYXJrZXRpbmdcIj5NYXJrZXRpbmc8L29wdGlvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+IFxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWJhY2tcIj5CYWNrPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgIH1cclxufSIsImltcG9ydCB7RW1wbG95ZWVEZXRhaWx9IGZyb20gXCIuL2VtcGxveWVlLWRldGFpbFwiXHJcbmltcG9ydCB7RW1wbG95ZWVMaXN0fSBmcm9tIFwiLi9lbXBsb3llZS1saXN0XCJcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBFbXBsb3llZURldGFpbCxcclxuICAgIEVtcGxveWVlTGlzdFxyXG59IiwiaW1wb3J0ICogYXMgTW9kZWxzIGZyb20gXCIuL21vZGVsc1wiO1xyXG5pbXBvcnQgKiBhcyBDb21wb25lbnRzIGZyb20gXCIuL2NvbXBvbmVudHMvaW5kZXhcIjtcclxuXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBcHBsaWNhdGlvbiB7XHJcbiAgICBiaW5kKCk6IEpRdWVyeTtcclxuICAgIHVuYmluZCgpOiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWFpbkFwcCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfbWFpbkFwcCA6IE1haW5BcHAgPSBuZXcgTWFpbkFwcCgpO1xyXG4gICAgZW1wbG95ZWVzIDogQXJyYXk8TW9kZWxzLkVtcGxveWVlPjtcclxuICAgIGN1cnJlbnRBcHAgOiBJQXBwbGljYXRpb247XHJcbiAgICBtYWluQXBwRWxlbWVudCA6IEpRdWVyeTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgaWYgKE1haW5BcHAuX21haW5BcHApIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWFpbiBhcHAgYWxyZWFkeSBpbnN0YW50aWF0ZWRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIE1haW5BcHAuX21haW5BcHAgPSB0aGlzO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZW1wbG95ZWVzID0gbmV3IEFycmF5PE1vZGVscy5FbXBsb3llZT4oXHJcbiAgICAgICAgICAgIG5ldyBNb2RlbHMuRW1wbG95ZWUoXHJcbiAgICAgICAgICAgICAgICBcIjEwMDBcIixcclxuICAgICAgICAgICAgICAgIFwiSm9oblwiLFxyXG4gICAgICAgICAgICAgICAgXCJEb2VcIixcclxuICAgICAgICAgICAgICAgIFwiQWNjb3VudGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgMzdcclxuICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgbmV3IE1vZGVscy5FbXBsb3llZShcclxuICAgICAgICAgICAgICAgIFwiMTAwMVwiLFxyXG4gICAgICAgICAgICAgICAgXCJTYWxseVwiLFxyXG4gICAgICAgICAgICAgICAgXCJMYW5nc3RvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJBY2NvdW50aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAxN1xyXG4gICAgICAgICAgICApLFxyXG4gICAgICAgICAgICBuZXcgTW9kZWxzLkVtcGxveWVlKFxyXG4gICAgICAgICAgICAgICAgXCIxMDAyXCIsXHJcbiAgICAgICAgICAgICAgICBcIkppbVwiLFxyXG4gICAgICAgICAgICAgICAgXCJCZWFtXCIsXHJcbiAgICAgICAgICAgICAgICBcIk1hcmtldGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgNjFcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgdGhpcy5tYWluQXBwRWxlbWVudCA9ICQoJyNtYWluLWFwcCcpO1xyXG4gICAgICAgIE1haW5BcHAubG9hZChuZXcgQ29tcG9uZW50cy5FbXBsb3llZUxpc3QodGhpcy5lbXBsb3llZXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBDdXJyZW50KCk6IE1haW5BcHBcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gTWFpbkFwcC5fbWFpbkFwcDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgc3RhdGljIGxvYWQoYXBwOiBJQXBwbGljYXRpb24pIHtcclxuICAgICAgICBsZXQgbGF1bmNoID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLkN1cnJlbnQuY3VycmVudEFwcCA9IGFwcDtcclxuICAgICAgICAgICAgdGhpcy5DdXJyZW50Lm1haW5BcHBFbGVtZW50XHJcbiAgICAgICAgICAgICAgICAuYXBwZW5kKHRoaXMuQ3VycmVudC5jdXJyZW50QXBwLmJpbmQoKSlcclxuICAgICAgICAgICAgICAgIC5mYWRlSW4oMTAwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGlmICh0aGlzLkN1cnJlbnQuY3VycmVudEFwcCkge1xyXG4gICAgICAgICAgICB0aGlzLkN1cnJlbnQuY3VycmVudEFwcC51bmJpbmQoKTtcclxuICAgICAgICAgICAgdGhpcy5DdXJyZW50Lm1haW5BcHBFbGVtZW50XHJcbiAgICAgICAgICAgICAgICAuZmFkZU91dCgxMDAsICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5DdXJyZW50Lm1haW5BcHBFbGVtZW50LmVtcHR5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGF1bmNoKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGF1bmNoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==