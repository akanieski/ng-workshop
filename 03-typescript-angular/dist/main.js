var SampleApp;
(function (SampleApp) {
    angular.module("SampleApp", []);
})(SampleApp || (SampleApp = {}));
var SampleApp;
(function (SampleApp) {
    var Components;
    (function (Components) {
        var Navbar;
        (function (Navbar) {
            var NavbarController = (function () {
                function NavbarController($scope) {
                }
                NavbarController.$inject = ['$scope'];
                return NavbarController;
            }());
            angular.module("SampleApp").directive("navBar", function () {
                return {
                    restrict: "E",
                    templateUrl: "src/components/navbar/navbar.component.html",
                    controller: NavbarController
                };
            });
        })(Navbar = Components.Navbar || (Components.Navbar = {}));
    })(Components = SampleApp.Components || (SampleApp.Components = {}));
})(SampleApp || (SampleApp = {}));
var SampleApp;
(function (SampleApp) {
    var Components;
    (function (Components) {
        var Roster;
        (function (Roster) {
            var RosterController = (function () {
                function RosterController($http) {
                    this.$http = $http;
                }
                RosterController.$inject = ['$http'];
                return RosterController;
            }());
            Roster.RosterController = RosterController;
            angular.module("SampleApp").controller("RosterController", RosterController);
        })(Roster = Components.Roster || (Components.Roster = {}));
    })(Components = SampleApp.Components || (SampleApp.Components = {}));
})(SampleApp || (SampleApp = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiLCIuLi9zcmMvY29tcG9uZW50cy9uYXZiYXIvbmF2YmFyLmRpcmVjdGl2ZS50cyIsIi4uL3NyYy9jb21wb25lbnRzL3Jvc3Rlci9yb3N0ZXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxJQUFPLFNBQVMsQ0FJZjtBQUpELFdBQU8sU0FBUyxFQUFDLENBQUM7SUFFZCxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUVuQyxDQUFDLEVBSk0sU0FBUyxLQUFULFNBQVMsUUFJZjtBQ05ELElBQU8sU0FBUyxDQWdCZjtBQWhCRCxXQUFPLFNBQVM7SUFBQyxJQUFBLFVBQVUsQ0FnQjFCO0lBaEJnQixXQUFBLFVBQVU7UUFBQyxJQUFBLE1BQU0sQ0FnQmpDO1FBaEIyQixXQUFBLE1BQU0sRUFBQyxDQUFDO1lBQ2hDO2dCQUdJLDBCQUFZLE1BQWlCO2dCQUU3QixDQUFDO2dCQUpNLHdCQUFPLEdBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFLMUMsdUJBQUM7WUFBRCxDQUFDLEFBTkQsSUFNQztZQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTtnQkFDNUMsTUFBTSxDQUFDO29CQUNILFFBQVEsRUFBRSxHQUFHO29CQUNiLFdBQVcsRUFBRSw2Q0FBNkM7b0JBQzFELFVBQVUsRUFBRSxnQkFBZ0I7aUJBQy9CLENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsRUFoQjJCLE1BQU0sR0FBTixpQkFBTSxLQUFOLGlCQUFNLFFBZ0JqQztJQUFELENBQUMsRUFoQmdCLFVBQVUsR0FBVixvQkFBVSxLQUFWLG9CQUFVLFFBZ0IxQjtBQUFELENBQUMsRUFoQk0sU0FBUyxLQUFULFNBQVMsUUFnQmY7QUNoQkQsSUFBTyxTQUFTLENBVWY7QUFWRCxXQUFPLFNBQVM7SUFBQyxJQUFBLFVBQVUsQ0FVMUI7SUFWZ0IsV0FBQSxVQUFVO1FBQUMsSUFBQSxNQUFNLENBVWpDO1FBVjJCLFdBQUEsTUFBTSxFQUFDLENBQUM7WUFDaEM7Z0JBR0ksMEJBQW9CLEtBQXNCO29CQUF0QixVQUFLLEdBQUwsS0FBSyxDQUFpQjtnQkFFMUMsQ0FBQztnQkFKTSx3QkFBTyxHQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBS3pDLHVCQUFDO1lBQUQsQ0FBQyxBQU5ELElBTUM7WUFOWSx1QkFBZ0IsbUJBTTVCLENBQUE7WUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pGLENBQUMsRUFWMkIsTUFBTSxHQUFOLGlCQUFNLEtBQU4saUJBQU0sUUFVakM7SUFBRCxDQUFDLEVBVmdCLFVBQVUsR0FBVixvQkFBVSxLQUFWLG9CQUFVLFFBVTFCO0FBQUQsQ0FBQyxFQVZNLFNBQVMsS0FBVCxTQUFTLFFBVWYiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuXHJcbm1vZHVsZSBTYW1wbGVBcHAge1xyXG4gICAgXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcIlNhbXBsZUFwcFwiLCBbXSlcclxuICAgIFxyXG59IiwibW9kdWxlIFNhbXBsZUFwcC5Db21wb25lbnRzLk5hdmJhciB7XHJcbiAgICBjbGFzcyBOYXZiYXJDb250cm9sbGVyIHtcclxuICAgICAgICBzdGF0aWMgJGluamVjdDogc3RyaW5nW10gPSBbJyRzY29wZSddO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKCRzY29wZTogbmcuSVNjb3BlKSB7XHJcbiAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJTYW1wbGVBcHBcIikuZGlyZWN0aXZlKFwibmF2QmFyXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiBcIkVcIixcclxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwic3JjL2NvbXBvbmVudHMvbmF2YmFyL25hdmJhci5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiBOYXZiYXJDb250cm9sbGVyXHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG59IiwibW9kdWxlIFNhbXBsZUFwcC5Db21wb25lbnRzLlJvc3RlciB7XHJcbiAgICBleHBvcnQgY2xhc3MgUm9zdGVyQ29udHJvbGxlciB7XHJcbiAgICAgICAgc3RhdGljICRpbmplY3Q6IHN0cmluZ1tdID0gWyckaHR0cCddO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgJGh0dHA6IG5nLklIdHRwU2VydmljZSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiU2FtcGxlQXBwXCIpLmNvbnRyb2xsZXIoXCJSb3N0ZXJDb250cm9sbGVyXCIsIFJvc3RlckNvbnRyb2xsZXIpO1xyXG59Il19