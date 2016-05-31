module SampleApp.Components.Navbar {
    class NavbarController {
        static $inject: string[] = ['$scope'];
        
        constructor($scope: ng.IScope) {
   
        }
    }
    
    angular.module("SampleApp").directive("navBar", function() {
        return {
            restrict: "E",
            templateUrl: "src/components/navbar/navbar.component.html",
            controller: NavbarController
        };
    });
}