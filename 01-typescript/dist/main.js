var Sample;
(function (Sample) {
    var MainApp = (function () {
        function MainApp() {
            var _this = this;
            this.employees = new Array(new Sample.Models.Employee("John", "Doe", "Accounting", 37), new Sample.Models.Employee("Sally", "Langston", "Accounting", 17), new Sample.Models.Employee("Jim", "Beam", "Marketing", 61));
            this.render();
            this.btnRefreshElement.addEventListener('click', function (ev) {
                _this.render();
            });
        }
        MainApp.prototype.render = function () {
            this.mainAppElement.innerHTML = this.renderHTML();
        };
        MainApp.prototype.renderHTML = function () {
            var html = '<a class="btn btn-block btn-success" id="btnRefresh">Refresh</a>';
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
                    itemsHtml += "\n                        <div class=\"list-group\">\n                            <a class=\"list-group-item\">\n                                <h4 class=\"list-group-item-heading\">" + emp.fullName + "</h4>\n                                <p class=\"list-group-item-text\">Age: " + emp.age + "</p>\n                            </a>\n                        </div>";
                }
                html += "\n                    <div class=\"panel panel-default\">\n                        <div class=\"panel-heading\">\n                            " + dept + " <label class=\"badge pull-right\">" + data[dept].length + "</label>\n                        </div>\n                        " + itemsHtml + "\n                    </div>\n                ";
            }
            return html;
        };
        return MainApp;
    }());
    Sample.MainApp = MainApp;
    window.onload = function () {
        new Sample.MainApp();
    };
})(Sample || (Sample = {}));
var Sample;
(function (Sample) {
    var Models;
    (function (Models) {
        var Employee = (function () {
            function Employee(firstName, lastName, department, age) {
                this.firstName = firstName;
                this.lastName = lastName;
                this.department = department;
                this.age = age;
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
        Models.Employee = Employee;
    })(Models = Sample.Models || (Sample.Models = {}));
})(Sample || (Sample = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudHMiLCIuLi9zcmMvZW1wbG95ZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBTyxNQUFNLENBOEVaO0FBOUVELFdBQU8sTUFBTSxFQUFDLENBQUM7SUFFWDtRQUtJO1lBTEosaUJBcUVDO1lBL0RPLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxLQUFLLENBQ3RCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQ3RCLE1BQU0sRUFDTixLQUFLLEVBQ0wsWUFBWSxFQUNaLEVBQUUsQ0FDTCxFQUNELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQ3RCLE9BQU8sRUFDUCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEVBQUUsQ0FDTCxFQUNELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQ3RCLEtBQUssRUFDTCxNQUFNLEVBQ04sV0FBVyxFQUNYLEVBQUUsQ0FDTCxDQUNKLENBQUM7WUFFRixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUMsRUFBYztnQkFDNUQsS0FBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUVELHdCQUFNLEdBQU47WUFDSSxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDdEQsQ0FBQztRQUVELDRCQUFVLEdBQVY7WUFDSSxJQUFJLElBQUksR0FBRyxrRUFBa0UsQ0FBQztZQUU5RSxJQUFJLElBQUksR0FBNEQsRUFBRSxDQUFDO1lBRXZFLEdBQUcsQ0FBQyxDQUFZLFVBQWMsRUFBZCxLQUFBLElBQUksQ0FBQyxTQUFTLEVBQWQsY0FBYyxFQUFkLElBQWMsQ0FBQztnQkFBMUIsSUFBSSxHQUFHLFNBQUE7Z0JBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksS0FBSyxFQUEwQixDQUFDO2dCQUNuRixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQztZQUVELEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztnQkFDbkIsR0FBRyxDQUFDLENBQVksVUFBVSxFQUFWLEtBQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFWLGNBQVUsRUFBVixJQUFVLENBQUM7b0JBQXRCLElBQUksR0FBRyxTQUFBO29CQUNSLFNBQVMsSUFBSSw0TEFHcUMsR0FBRyxDQUFDLFFBQVEsc0ZBQ1gsR0FBRyxDQUFDLEdBQUcsMkVBRS9DLENBQUM7aUJBQ2Y7Z0JBQ0QsSUFBSSxJQUFJLG1KQUdNLElBQUksMkNBQW9DLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLDBFQUU3RCxTQUFTLG1EQUVsQixDQUFDO1lBQ04sQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNMLGNBQUM7SUFBRCxDQUFDLEFBckVELElBcUVDO0lBckVZLGNBQU8sVUFxRW5CLENBQUE7SUFHRCxNQUFNLENBQUMsTUFBTSxHQUFHO1FBQ1osSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDeEIsQ0FBQyxDQUFBO0FBRUwsQ0FBQyxFQTlFTSxNQUFNLEtBQU4sTUFBTSxRQThFWjtBQzlFRCxJQUFPLE1BQU0sQ0FzQlo7QUF0QkQsV0FBTyxNQUFNO0lBQUMsSUFBQSxNQUFNLENBc0JuQjtJQXRCYSxXQUFBLE1BQU0sRUFBQyxDQUFDO1FBQ2xCO1lBTUksa0JBQVksU0FBaUIsRUFBRSxRQUFnQixFQUFFLFVBQWtCLEVBQUUsR0FBVztnQkFFNUUsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2dCQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFDbkIsQ0FBQztZQUVELHNCQUFJLDhCQUFRO3FCQUFaO29CQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNoRCxDQUFDOzs7ZUFBQTtZQUNMLGVBQUM7UUFBRCxDQUFDLEFBakJELElBaUJDO1FBakJZLGVBQVEsV0FpQnBCLENBQUE7SUFJTCxDQUFDLEVBdEJhLE1BQU0sR0FBTixhQUFNLEtBQU4sYUFBTSxRQXNCbkI7QUFBRCxDQUFDLEVBdEJNLE1BQU0sS0FBTixNQUFNLFFBc0JaO0FBTUEiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUgU2FtcGxlIHtcclxuICAgIFxyXG4gICAgZXhwb3J0IGNsYXNzIE1haW5BcHAge1xyXG4gICAgICAgIHByaXZhdGUgZW1wbG95ZWVzIDogQXJyYXk8U2FtcGxlLk1vZGVscy5FbXBsb3llZT47XHJcbiAgICAgICAgcHJpdmF0ZSBtYWluQXBwRWxlbWVudCA6IEhUTUxFbGVtZW50O1xyXG4gICAgICAgIHByaXZhdGUgYnRuUmVmcmVzaEVsZW1lbnQgOiBIVE1MRWxlbWVudDtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICAgICAgdGhpcy5lbXBsb3llZXMgPSBuZXcgQXJyYXk8U2FtcGxlLk1vZGVscy5FbXBsb3llZT4oXHJcbiAgICAgICAgICAgICAgICBuZXcgU2FtcGxlLk1vZGVscy5FbXBsb3llZShcclxuICAgICAgICAgICAgICAgICAgICBcIkpvaG5cIixcclxuICAgICAgICAgICAgICAgICAgICBcIkRvZVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQWNjb3VudGluZ1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIDM3XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgbmV3IFNhbXBsZS5Nb2RlbHMuRW1wbG95ZWUoXHJcbiAgICAgICAgICAgICAgICAgICAgXCJTYWxseVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiTGFuZ3N0b25cIixcclxuICAgICAgICAgICAgICAgICAgICBcIkFjY291bnRpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICAxN1xyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIG5ldyBTYW1wbGUuTW9kZWxzLkVtcGxveWVlKFxyXG4gICAgICAgICAgICAgICAgICAgIFwiSmltXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJCZWFtXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJNYXJrZXRpbmdcIixcclxuICAgICAgICAgICAgICAgICAgICA2MVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgdGhpcy5idG5SZWZyZXNoRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldjogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgICAgIHRoaXMubWFpbkFwcEVsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5yZW5kZXJIVE1MKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJlbmRlckhUTUwoKSA6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIGxldCBodG1sID0gJzxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tc3VjY2Vzc1wiIGlkPVwiYnRuUmVmcmVzaFwiPlJlZnJlc2g8L2E+JztcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGxldCBkYXRhOiBTeXN0ZW0uQ29sbGVjdGlvbnMuRGljdGlvbmFyeTxTYW1wbGUuTW9kZWxzLkVtcGxveWVlW10+ID0ge307XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBmb3IgKGxldCBlbXAgb2YgdGhpcy5lbXBsb3llZXMpIHtcclxuICAgICAgICAgICAgICAgIGRhdGFbZW1wLmRlcGFydG1lbnRdID0gZGF0YVtlbXAuZGVwYXJ0bWVudF0gfHwgbmV3IEFycmF5PFNhbXBsZS5Nb2RlbHMuRW1wbG95ZWU+KCk7XHJcbiAgICAgICAgICAgICAgICBkYXRhW2VtcC5kZXBhcnRtZW50XS5wdXNoKGVtcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAobGV0IGRlcHQgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zSHRtbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZW1wIG9mIGRhdGFbZGVwdF0pIHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtc0h0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0taGVhZGluZ1wiPiR7ZW1wLmZ1bGxOYW1lfTwvaDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0tdGV4dFwiPkFnZTogJHtlbXAuYWdlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbCBwYW5lbC1kZWZhdWx0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwYW5lbC1oZWFkaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2RlcHR9IDxsYWJlbCBjbGFzcz1cImJhZGdlIHB1bGwtcmlnaHRcIj4ke2RhdGFbZGVwdF0ubGVuZ3RofTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2l0ZW1zSHRtbH1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICB3aW5kb3cub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICAgIG5ldyBTYW1wbGUuTWFpbkFwcCgpXHJcbiAgICB9XHJcbiAgICBcclxufSIsIm1vZHVsZSBTYW1wbGUuTW9kZWxzIHtcclxuICAgIGV4cG9ydCBjbGFzcyBFbXBsb3llZSB7XHJcbiAgICAgICAgcHVibGljIGZpcnN0TmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBsYXN0TmFtZTogc3RyaW5nO1xyXG4gICAgICAgIHB1YmxpYyBkZXBhcnRtZW50OiBzdHJpbmc7XHJcbiAgICAgICAgcHVibGljIGFnZTogbnVtYmVyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0cnVjdG9yKGZpcnN0TmFtZTogc3RyaW5nLCBsYXN0TmFtZTogc3RyaW5nLCBkZXBhcnRtZW50OiBzdHJpbmcsIGFnZTogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBlbXBsb3llZSBiYXNlZCBvZmYgc2VlZCBkYXRhXHJcbiAgICAgICAgICAgIHRoaXMuZmlyc3ROYW1lID0gZmlyc3ROYW1lO1xyXG4gICAgICAgICAgICB0aGlzLmxhc3ROYW1lID0gbGFzdE5hbWU7XHJcbiAgICAgICAgICAgIHRoaXMuZGVwYXJ0bWVudCA9IGRlcGFydG1lbnQ7XHJcbiAgICAgICAgICAgIHRoaXMuYWdlID0gYWdlOyBcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgZ2V0IGZ1bGxOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpcnN0TmFtZSArIFwiIFwiICsgdGhpcy5sYXN0TmFtZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIEVtcGxveWVlc0J5RGVwYXJ0bWVudCB7XHJcbiAgICAgICAgW2RlcGFydG1lbnQ6IHN0cmluZ106IEFycmF5PFNhbXBsZS5Nb2RlbHMuRW1wbG95ZWU+XHJcbiAgICB9XHJcbn1cclxuXHJcbm1vZHVsZSBTeXN0ZW0uQ29sbGVjdGlvbnMge1xyXG4gICAgZXhwb3J0IGludGVyZmFjZSBEaWN0aW9uYXJ5PFQ+IHtcclxuICAgICAgICBbS2V5OiBzdHJpbmddOiBUO1xyXG4gICAgfVxyXG59Il19