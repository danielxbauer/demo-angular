module Demo {
    export class HomeController {

        public test = 1;

        static $inject = [];
        constructor() {
        }
    }

    DemoApp.controller("HomeController", HomeController);
}