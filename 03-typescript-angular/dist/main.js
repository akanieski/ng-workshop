define("components/navbar/navbar.component", ["require", "exports"], function (require, exports) {
    "use strict";
    var NavbarController = (function () {
        function NavbarController($scope) {
            this.value = "test";
            this.value = "Testing";
        }
        NavbarController.$inject = ['$scope'];
        return NavbarController;
    }());
    exports.NavbarController = NavbarController;
    var NavbarComponent = (function () {
        function NavbarComponent() {
            this.bindings = {};
            this.controller = NavbarController;
            this.templateUrl = "src/components/navbar/navbar.component.html";
            this.controllerAs = "vm";
        }
        return NavbarComponent;
    }());
    exports.NavbarComponent = NavbarComponent;
});
define("models", ["require", "exports"], function (require, exports) {
    "use strict";
    var Employee = (function () {
        function Employee() {
        }
        return Employee;
    }());
    exports.Employee = Employee;
});
define("services/employee.service", ["require", "exports"], function (require, exports) {
    "use strict";
    var EmployeeService = (function () {
        function EmployeeService(http, Q, config) {
            this.http = http;
            this.Q = Q;
            this.config = config;
        }
        EmployeeService.prototype.getEmployees = function () {
            var _this = this;
            return this.Q(function (resolve, reject) {
                _this.http
                    .get(_this.config.apiBaseUrl + "/api/employees")
                    .then(function (resp) {
                    resolve(resp.data.data);
                })
                    .catch(function (resp) {
                    reject(resp);
                });
            });
        };
        EmployeeService.prototype.getEmployee = function (employeeId) {
            var _this = this;
            return this.Q(function (resolve, reject) {
                _this.http
                    .get(_this.config.apiBaseUrl + "/api/employee/" + employeeId)
                    .then(function (resp) {
                    resolve(resp.data.data);
                })
                    .catch(function (resp) {
                    reject(resp);
                });
            });
        };
        EmployeeService.$inject = ['$http', '$q', 'config'];
        return EmployeeService;
    }());
    exports.EmployeeService = EmployeeService;
});
define("components/roster/roster.controller", ["require", "exports"], function (require, exports) {
    "use strict";
    var RosterController = (function () {
        function RosterController(employeeService) {
            var _this = this;
            this.employeeService = employeeService;
            this.employeeService
                .getEmployees()
                .then(function (employees) {
                _this.employees = employees;
            });
        }
        RosterController.$inject = ['EmployeeService'];
        return RosterController;
    }());
    exports.RosterController = RosterController;
});
define("components/profile/profile.controller", ["require", "exports"], function (require, exports) {
    "use strict";
    var ProfileController = (function () {
        function ProfileController(employeeService, routeParams) {
            var _this = this;
            this.employeeService = employeeService;
            this.routeParams = routeParams;
            this.employeeService
                .getEmployee(this.routeParams.employeeId)
                .then(function (employee) {
                _this.employee = employee;
            });
        }
        ProfileController.$inject = ['EmployeeService', '$routeParams'];
        return ProfileController;
    }());
    exports.ProfileController = ProfileController;
});
define("app", ["require", "exports", "components/navbar/navbar.component", "components/roster/roster.controller", "components/profile/profile.controller", "services/employee.service"], function (require, exports, navbar_component_1, roster_controller_1, profile_controller_1, employee_service_1) {
    "use strict";
    var SampleApp = (function () {
        function SampleApp(appSelector) {
            angular
                .module("SampleApp", ['ngRoute'])
                .constant("config", { apiBaseUrl: "http://127.0.0.1:5002" })
                .service("EmployeeService", employee_service_1.EmployeeService)
                .controller("RosterController", roster_controller_1.RosterController)
                .controller("ProfileController", profile_controller_1.ProfileController)
                .component("navBar", new navbar_component_1.NavbarComponent())
                .config(['$routeProvider', function ($routeProvider) {
                    $routeProvider
                        .when("/dashboard", {
                        templateUrl: "src/components/roster/roster.page.html",
                        controller: "RosterController",
                        controllerAs: "vm"
                    })
                        .when("/employees/:employeeId", {
                        templateUrl: "src/components/profile/profile.page.html",
                        controller: "ProfileController",
                        controllerAs: "vm"
                    })
                        .otherwise("/dashboard");
                }]);
            angular.bootstrap(appSelector, ['SampleApp']);
        }
        return SampleApp;
    }());
    exports.SampleApp = SampleApp;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb21wb25lbnRzL25hdmJhci9uYXZiYXIuY29tcG9uZW50LnRzIiwiLi4vc3JjL21vZGVscy50cyIsIi4uL3NyYy9zZXJ2aWNlcy9lbXBsb3llZS5zZXJ2aWNlLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvcm9zdGVyL3Jvc3Rlci5jb250cm9sbGVyLnRzIiwiLi4vc3JjL2NvbXBvbmVudHMvcHJvZmlsZS9wcm9maWxlLmNvbnRyb2xsZXIudHMiLCIuLi9zcmMvYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0lBQUE7UUFLSSwwQkFBWSxNQUFpQjtZQUY3QixVQUFLLEdBQVcsTUFBTSxDQUFBO1lBR2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQzNCLENBQUM7UUFOTSx3QkFBTyxHQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFRMUMsdUJBQUM7SUFBRCxDQUFDLEFBVEQsSUFTQztJQVRZLHdCQUFnQixtQkFTNUIsQ0FBQTtJQUVEO1FBTUk7WUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBRWYsQ0FBQTtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLENBQUE7WUFDbEMsSUFBSSxDQUFDLFdBQVcsR0FBRyw2Q0FBNkMsQ0FBQTtZQUNoRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQTtRQUU1QixDQUFDO1FBRUwsc0JBQUM7SUFBRCxDQUFDLEFBaEJELElBZ0JDO0lBaEJZLHVCQUFlLGtCQWdCM0IsQ0FBQTs7OztJQzNCRDtRQUFBO1FBS0EsQ0FBQztRQUFELGVBQUM7SUFBRCxDQUFDLEFBTEQsSUFLQztJQUxZLGdCQUFRLFdBS3BCLENBQUE7Ozs7SUNHRDtRQUlJLHlCQUFvQixJQUFxQixFQUNyQixDQUFlLEVBQ2YsTUFBZTtZQUZmLFNBQUksR0FBSixJQUFJLENBQWlCO1lBQ3JCLE1BQUMsR0FBRCxDQUFDLENBQWM7WUFDZixXQUFNLEdBQU4sTUFBTSxDQUFTO1FBQUksQ0FBQztRQUV4QyxzQ0FBWSxHQUFaO1lBQUEsaUJBV0M7WUFWRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFDLE9BQW1ELEVBQUUsTUFBTTtnQkFDdEUsS0FBSSxDQUFDLElBQUk7cUJBQ0osR0FBRyxDQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxtQkFBZ0IsQ0FBQztxQkFDOUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtvQkFDUCxPQUFPLENBQXFDLElBQUksQ0FBQyxJQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7Z0JBQ2hFLENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsVUFBQyxJQUFJO29CQUNSLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDaEIsQ0FBQyxDQUFDLENBQUE7WUFDVixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUM7UUFFRCxxQ0FBVyxHQUFYLFVBQVksVUFBa0I7WUFBOUIsaUJBV0M7WUFWRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxVQUFDLE9BQTRDLEVBQUUsTUFBTTtnQkFDL0QsS0FBSSxDQUFDLElBQUk7cUJBQ0osR0FBRyxDQUFJLEtBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxzQkFBaUIsVUFBWSxDQUFDO3FCQUMzRCxJQUFJLENBQUMsVUFBQyxJQUFJO29CQUNQLE9BQU8sQ0FBOEIsSUFBSSxDQUFDLElBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDekQsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxVQUFDLElBQUk7b0JBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNoQixDQUFDLENBQUMsQ0FBQTtZQUNWLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQTlCTSx1QkFBTyxHQUFhLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQTtRQStCeEQsc0JBQUM7SUFBRCxDQUFDLEFBakNELElBaUNDO0lBakNZLHVCQUFlLGtCQWlDM0IsQ0FBQTs7OztJQ3RDRDtRQUtJLDBCQUFvQixlQUFpQztZQUx6RCxpQkFZQztZQVB1QixvQkFBZSxHQUFmLGVBQWUsQ0FBa0I7WUFDakQsSUFBSSxDQUFDLGVBQWU7aUJBQ2YsWUFBWSxFQUFFO2lCQUNkLElBQUksQ0FBQyxVQUFDLFNBQVM7Z0JBQ1osS0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDL0IsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBVk0sd0JBQU8sR0FBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFXbkQsdUJBQUM7SUFBRCxDQUFDLEFBWkQsSUFZQztJQVpZLHdCQUFnQixtQkFZNUIsQ0FBQTs7OztJQ1JEO1FBS0ksMkJBQW9CLGVBQWlDLEVBQ2pDLFdBQXlCO1lBTmpELGlCQWFDO1lBUnVCLG9CQUFlLEdBQWYsZUFBZSxDQUFrQjtZQUNqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYztZQUN6QyxJQUFJLENBQUMsZUFBZTtpQkFDZixXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7aUJBQ3hDLElBQUksQ0FBQyxVQUFDLFFBQVE7Z0JBQ1gsS0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDO1FBWE0seUJBQU8sR0FBYSxDQUFDLGlCQUFpQixFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBWW5FLHdCQUFDO0lBQUQsQ0FBQyxBQWJELElBYUM7SUFiWSx5QkFBaUIsb0JBYTdCLENBQUE7Ozs7SUNmRDtRQUVJLG1CQUFZLFdBQW1CO1lBQzNCLE9BQU87aUJBQ0YsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUNoQyxRQUFRLENBQUMsUUFBUSxFQUFXLEVBQUUsVUFBVSxFQUFFLHVCQUF1QixFQUFFLENBQUM7aUJBQ3BFLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxrQ0FBZSxDQUFDO2lCQUMzQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsb0NBQWdCLENBQUM7aUJBQ2hELFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxzQ0FBaUIsQ0FBQztpQkFDbEQsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLGtDQUFlLEVBQUUsQ0FBQztpQkFFMUMsTUFBTSxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsVUFBUyxjQUFjO29CQUM5QyxjQUFjO3lCQUNULElBQUksQ0FBQyxZQUFZLEVBQUU7d0JBQ2hCLFdBQVcsRUFBRSx3Q0FBd0M7d0JBQ3JELFVBQVUsRUFBRSxrQkFBa0I7d0JBQzlCLFlBQVksRUFBRSxJQUFJO3FCQUNyQixDQUFDO3lCQUNELElBQUksQ0FBQyx3QkFBd0IsRUFBRTt3QkFDNUIsV0FBVyxFQUFFLDBDQUEwQzt3QkFDdkQsVUFBVSxFQUFFLG1CQUFtQjt3QkFDL0IsWUFBWSxFQUFFLElBQUk7cUJBQ3JCLENBQUM7eUJBQ0QsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBRVAsT0FBTyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFTCxnQkFBQztJQUFELENBQUMsQUE3QkQsSUE2QkM7SUE3QlksaUJBQVMsWUE2QnJCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgTmF2YmFyQ29udHJvbGxlciB7XHJcbiAgICBzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyRzY29wZSddO1xyXG4gICAgXHJcbiAgICB2YWx1ZTogc3RyaW5nID0gXCJ0ZXN0XCJcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoJHNjb3BlOiBuZy5JU2NvcGUpIHtcclxuICAgICAgICB0aGlzLnZhbHVlID0gXCJUZXN0aW5nXCI7XHJcbiAgICB9XHJcbiAgICBcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5hdmJhckNvbXBvbmVudCBpbXBsZW1lbnRzIG5nLklDb21wb25lbnRPcHRpb25zIHtcclxuICAgIHB1YmxpYyBiaW5kaW5nczogYW55O1xyXG4gICAgcHVibGljIGNvbnRyb2xsZXI6IGFueTtcclxuICAgIHB1YmxpYyB0ZW1wbGF0ZVVybDogc3RyaW5nO1xyXG4gICAgcHVibGljIGNvbnRyb2xsZXJBczogc3RyaW5nO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmJpbmRpbmdzID0ge1xyXG4gICAgICAgICAgICAvKiBBZGQgc2NvcGUgYmluZGluZ3MgaGVyZSAqL1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBOYXZiYXJDb250cm9sbGVyXHJcbiAgICAgICAgdGhpcy50ZW1wbGF0ZVVybCA9IFwic3JjL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5jb21wb25lbnQuaHRtbFwiXHJcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSBcInZtXCJcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyBFbXBsb3llZSB7XHJcbiAgICBlbXBsb3llZUlkOiBzdHJpbmc7XHJcbiAgICBmaXJzdE5hbWU6IHN0cmluZztcclxuICAgIGxhc3ROYW1lOiBzdHJpbmc7XHJcbiAgICBkZXBhcnRtZW50OiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgKiBhcyBNb2RlbHMgZnJvbSBcIi4uL21vZGVsc1wiXHJcbmltcG9ydCB7SUNvbmZpZywgSVJlc3BvbnNlfSBmcm9tIFwiLi4vYXBwXCJcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUVtcGxveWVlU2VydmljZSB7XHJcbiAgICBnZXRFbXBsb3llZXMoKTogbmcuSVByb21pc2U8QXJyYXk8TW9kZWxzLkVtcGxveWVlPj4gO1xyXG4gICAgZ2V0RW1wbG95ZWUoZW1wbG95ZWVJZDogc3RyaW5nKTogbmcuSVByb21pc2U8TW9kZWxzLkVtcGxveWVlPiA7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBFbXBsb3llZVNlcnZpY2UgaW1wbGVtZW50cyBJRW1wbG95ZWVTZXJ2aWNlIHtcclxuICAgIFxyXG4gICAgc3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckaHR0cCcsICckcScsICdjb25maWcnXVxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGh0dHA6IG5nLklIdHRwU2VydmljZSwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIFE6IG5nLklRU2VydmljZSwgXHJcbiAgICAgICAgICAgICAgICBwcml2YXRlIGNvbmZpZzogSUNvbmZpZykgeyB9XHJcbiAgICBcclxuICAgIGdldEVtcGxveWVlcygpOiBuZy5JUHJvbWlzZTxBcnJheTxNb2RlbHMuRW1wbG95ZWU+PiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUSgocmVzb2x2ZTogbmcuSVFSZXNvbHZlUmVqZWN0PEFycmF5PE1vZGVscy5FbXBsb3llZT4+LCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5odHRwXHJcbiAgICAgICAgICAgICAgICAuZ2V0KGAke3RoaXMuY29uZmlnLmFwaUJhc2VVcmx9L2FwaS9lbXBsb3llZXNgKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxBcnJheTxNb2RlbHMuRW1wbG95ZWU+Pig8SVJlc3BvbnNlPnJlc3AuZGF0YSkuZGF0YSlcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzcClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuICAgIFxyXG4gICAgZ2V0RW1wbG95ZWUoZW1wbG95ZWVJZDogc3RyaW5nKTogbmcuSVByb21pc2U8TW9kZWxzLkVtcGxveWVlPiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuUSgocmVzb2x2ZTogbmcuSVFSZXNvbHZlUmVqZWN0PE1vZGVscy5FbXBsb3llZT4sIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmh0dHBcclxuICAgICAgICAgICAgICAgIC5nZXQoYCR7dGhpcy5jb25maWcuYXBpQmFzZVVybH0vYXBpL2VtcGxveWVlLyR7ZW1wbG95ZWVJZH1gKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKDxNb2RlbHMuRW1wbG95ZWU+KDxJUmVzcG9uc2U+cmVzcC5kYXRhKS5kYXRhKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZXNwKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtJRW1wbG95ZWVTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvZW1wbG95ZWUuc2VydmljZVwiXHJcbmltcG9ydCB7RW1wbG95ZWV9IGZyb20gXCIuLi8uLi9tb2RlbHNcIlxyXG5cclxuZXhwb3J0IGNsYXNzIFJvc3RlckNvbnRyb2xsZXIge1xyXG4gICAgc3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWydFbXBsb3llZVNlcnZpY2UnXTtcclxuICAgIFxyXG4gICAgcHJpdmF0ZSBlbXBsb3llZXM6IEVtcGxveWVlW107XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgZW1wbG95ZWVTZXJ2aWNlOiBJRW1wbG95ZWVTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5lbXBsb3llZVNlcnZpY2VcclxuICAgICAgICAgICAgLmdldEVtcGxveWVlcygpXHJcbiAgICAgICAgICAgIC50aGVuKChlbXBsb3llZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW1wbG95ZWVzID0gZW1wbG95ZWVzO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7SUVtcGxveWVlU2VydmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2VtcGxveWVlLnNlcnZpY2VcIlxyXG5pbXBvcnQge0VtcGxveWVlfSBmcm9tIFwiLi4vLi4vbW9kZWxzXCJcclxuXHJcbmludGVyZmFjZSBJUm91dGVQYXJhbXMgZXh0ZW5kcyBuZy5yb3V0ZS5JUm91dGVQYXJhbXNTZXJ2aWNlIHtcclxuICAgIGVtcGxveWVlSWQ6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByb2ZpbGVDb250cm9sbGVyIHtcclxuICAgIHN0YXRpYyAkaW5qZWN0OiBzdHJpbmdbXSA9IFsnRW1wbG95ZWVTZXJ2aWNlJywgJyRyb3V0ZVBhcmFtcyddO1xyXG4gICAgXHJcbiAgICBwcml2YXRlIGVtcGxveWVlOiBFbXBsb3llZTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbXBsb3llZVNlcnZpY2U6IElFbXBsb3llZVNlcnZpY2UsIFxyXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZVBhcmFtczogSVJvdXRlUGFyYW1zKSB7XHJcbiAgICAgICAgdGhpcy5lbXBsb3llZVNlcnZpY2VcclxuICAgICAgICAgICAgLmdldEVtcGxveWVlKHRoaXMucm91dGVQYXJhbXMuZW1wbG95ZWVJZClcclxuICAgICAgICAgICAgLnRoZW4oKGVtcGxveWVlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVtcGxveWVlID0gZW1wbG95ZWU7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtOYXZiYXJDb21wb25lbnR9IGZyb20gXCIuL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5jb21wb25lbnRcIlxyXG5pbXBvcnQge1Jvc3RlckNvbnRyb2xsZXJ9IGZyb20gXCIuL2NvbXBvbmVudHMvcm9zdGVyL3Jvc3Rlci5jb250cm9sbGVyXCJcclxuaW1wb3J0IHtQcm9maWxlQ29udHJvbGxlcn0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9maWxlL3Byb2ZpbGUuY29udHJvbGxlclwiXHJcbmltcG9ydCB7RW1wbG95ZWVTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9lbXBsb3llZS5zZXJ2aWNlXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBTYW1wbGVBcHAge1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihhcHBTZWxlY3Rvcjogc3RyaW5nKSB7XHJcbiAgICAgICAgYW5ndWxhclxyXG4gICAgICAgICAgICAubW9kdWxlKFwiU2FtcGxlQXBwXCIsIFsnbmdSb3V0ZSddKVxyXG4gICAgICAgICAgICAuY29uc3RhbnQoXCJjb25maWdcIiwgPElDb25maWc+eyBhcGlCYXNlVXJsOiBcImh0dHA6Ly8xMjcuMC4wLjE6NTAwMlwiIH0pXHJcbiAgICAgICAgICAgIC5zZXJ2aWNlKFwiRW1wbG95ZWVTZXJ2aWNlXCIsIEVtcGxveWVlU2VydmljZSlcclxuICAgICAgICAgICAgLmNvbnRyb2xsZXIoXCJSb3N0ZXJDb250cm9sbGVyXCIsIFJvc3RlckNvbnRyb2xsZXIpXHJcbiAgICAgICAgICAgIC5jb250cm9sbGVyKFwiUHJvZmlsZUNvbnRyb2xsZXJcIiwgUHJvZmlsZUNvbnRyb2xsZXIpXHJcbiAgICAgICAgICAgIC5jb21wb25lbnQoXCJuYXZCYXJcIiwgbmV3IE5hdmJhckNvbXBvbmVudCgpKVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLmNvbmZpZyhbJyRyb3V0ZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpIHtcclxuICAgICAgICAgICAgICAgICRyb3V0ZVByb3ZpZGVyXHJcbiAgICAgICAgICAgICAgICAgICAgLndoZW4oXCIvZGFzaGJvYXJkXCIsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwic3JjL2NvbXBvbmVudHMvcm9zdGVyL3Jvc3Rlci5wYWdlLmh0bWxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogXCJSb3N0ZXJDb250cm9sbGVyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogXCJ2bVwiXHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAud2hlbihcIi9lbXBsb3llZXMvOmVtcGxveWVlSWRcIiwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCJzcmMvY29tcG9uZW50cy9wcm9maWxlL3Byb2ZpbGUucGFnZS5odG1sXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6IFwiUHJvZmlsZUNvbnRyb2xsZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiBcInZtXCJcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIC5vdGhlcndpc2UoXCIvZGFzaGJvYXJkXCIpO1xyXG4gICAgICAgICAgICB9XSlcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgYW5ndWxhci5ib290c3RyYXAoYXBwU2VsZWN0b3IsIFsnU2FtcGxlQXBwJ10pO1xyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmZpZyB7XHJcbiAgICBhcGlCYXNlVXJsOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlc3BvbnNlIHtcclxuICAgIGRhdGE6IGFueTtcclxuICAgIHN1Y2Nlc3M6IGJvb2xlYW47XHJcbn0iXX0=