module Demo {
    export class RouteConfig {
        static $inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
        constructor($stateProvider: ng.ui.IStateProvider, $locationProvider: ng.ILocationProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

            $stateProvider.state("home", {
                url: "/",
                controller: "HomeController",
                controllerAs: "controller",
                templateUrl: "/wwwroot/views/home/home.html"
            });
            
            $urlRouterProvider.otherwise("/");
            $locationProvider.html5Mode({ enabled: true, requireBase: true });
        }
    }

    DemoApp.config(RouteConfig);
}