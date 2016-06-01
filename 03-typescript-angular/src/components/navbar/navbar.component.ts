export class NavbarController {
    static $inject: string[] = ['$scope'];
    
    value: string = "test"
    
    constructor($scope: ng.IScope) {
        this.value = "Testing";
    }
    
}

export class NavbarComponent implements ng.IComponentOptions {
    public bindings: any;
    public controller: any;
    public templateUrl: string;
    public controllerAs: string;
    
    constructor() {
        this.bindings = {
            /* Add scope bindings here */
        }
        this.controller = NavbarController
        this.templateUrl = "src/components/navbar/navbar.component.html"
        this.controllerAs = "vm"
        
    }
    
}
