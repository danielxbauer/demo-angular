module Demo {
    export class HomeController {

        public notes: string[] = ["note 1", "note 2", "note 3"];

        static $inject = [];
        constructor() {
        }
    }

    DemoApp.controller("HomeController", HomeController);
}