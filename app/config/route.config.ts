module Demo {
    export class RouteConfig {
        static $inject = ["$stateProvider", "$locationProvider", "$urlRouterProvider"];
        constructor($stateProvider: ng.ui.IStateProvider, $locationProvider: ng.ILocationProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

            $stateProvider.state("home", {
                url: "/",
                template: "<home></home>"
            });

            $stateProvider.state("detail", {
                url: "/note/:id",
                template: '<edit-note note-id="$resolve.id"></edit-note>',
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