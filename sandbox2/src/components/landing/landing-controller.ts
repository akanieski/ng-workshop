export class LandingCtrl {
    static $inject: string[] = ['$scope', 'adalAuthenticationService']
    
    constructor(private scope: ng.IScope, private adal: adal.AdalAuthenticationService) {
        
    }
    
    logout() {
        this.adal.logOut()
    }
    
    login() {
        this.adal.login()
    }
    
}
