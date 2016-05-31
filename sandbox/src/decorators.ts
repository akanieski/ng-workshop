
    function log(type: string | number, message: string){
        return function(target: Object, propertyKey: string) {
            console.log(`[${type}] ${message}`);
        }
    }
    
    class Tester {
        
        @log("INFO", "Payroll posting initiated")
        printPayrollChecks() {
            alert("Checks Printed")
        }
    }
    
    var t = new Tester();
    
    t.printPayrollChecks();