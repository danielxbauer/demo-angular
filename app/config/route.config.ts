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

            $stateProvider.state("detail", {
                url: "/note/:id",
                controller: "DetailController",
                controllerAs: "controller",
                templateUrl: "/wwwroot/views/detail/detail.html",
                resolve:{
                    id: ($stateParams) => $stateParams.id
                }
            });
            
            $urlRouterProvider.otherwise("/");
            $locationProvider.html5Mode({ enabled: true, requireBase: true });
        }
    }

    DemoApp.config(RouteConfig);
}