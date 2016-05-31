import * as Models from "./models";
import * as Components from "./components/index";


export interface IApplication {
    bind(): JQuery;
    unbind(): void;
}

export class MainApp {
    private static _mainApp : MainApp = new MainApp();
    employees : Array<Models.Employee>;
    currentApp : IApplication;
    mainAppElement : JQuery;
    
    constructor() {
        if (MainApp._mainApp) {
            throw new Error("Main app already instantiated");
        }
        
        MainApp._mainApp = this;
        
        this.employees = new Array<Models.Employee>(
            new Models.Employee(
                "1000",
                "John",
                "Doe",
                "Accounting",
                37
            ),
            new Models.Employee(
                "1001",
                "Sally",
                "Langston",
                "Accounting",
                17
            ),
            new Models.Employee(
                "1002",
                "Jim",
                "Beam",
                "Marketing",
                61
            )
        );
        this.mainAppElement = $('#main-app');
        MainApp.load(new Components.EmployeeList(this.employees));
    }

    public static get Current(): MainApp
    {
        return MainApp._mainApp;
    }
    
    static load(app: IApplication) {
        let launch = () => {
            this.Current.currentApp = app;
            this.Current.mainAppElement
                .append(this.Current.currentApp.bind())
                .fadeIn(100);
        };
        if (this.Current.currentApp) {
            this.Current.currentApp.unbind();
            this.Current.mainAppElement
                .fadeOut(100, ()=>{
                    this.Current.mainAppElement.empty();
                    launch();
                });
            
        } else {
            launch();
        }
    }
}
