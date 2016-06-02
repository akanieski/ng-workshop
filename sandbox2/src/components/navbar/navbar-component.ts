export class NavbarController {
    static $inject: string[] = ['$scope', 'adalAuthenticationService']
    
    menu: [string, string][]
    
    header: string
    
    constructor(private scope: ng.IScope, private adal: adal.AdalAuthenticationService) {
        this.header = "Employee Roster"
        this.menu = [
            ["Home", "/employees"],
        ]
    }
    
    logout() {
        this.adal.logOut()
    }
    
    login() {
        this.adal.login()
    }
    
}

export class NavbarComponent implements ng.IComponentOptions {
    public bindings: any
    public controller: any
    public templateUrl: string
    public controllerAs: string
    
    constructor() {
        this.bindings = {
            /* Add scope bindings here */
            
        }
        this.controller = NavbarController
        this.templateUrl = "src/components/navbar/navbar-component.html"
        this.controllerAs = "vm"
        
    }
    
}
