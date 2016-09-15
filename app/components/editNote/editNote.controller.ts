module Demo {
    export class EditNoteController {

        // bound by directive
        public note: INote;
        //

        static $inject = [];
        constructor() {
        }
    }

    DemoApp.controller("EditNoteController", EditNoteController);
}