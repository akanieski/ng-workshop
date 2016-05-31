module SampleApp.Components.Roster {
    export class RosterController {
        static $inject: string[] = ['$http'];
        
        constructor(private $http: ng.IHttpService) {
            
        }
    }
    
    angular.module("SampleApp").controller("RosterController", RosterController);
}