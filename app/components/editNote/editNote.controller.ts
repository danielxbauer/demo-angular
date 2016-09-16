module Demo {
    export class EditNoteController {

        // bound by directive
        public note: INote;
        //

        public editorOptions = [
            ["h1", "h2", "h3", "p", "quote"],
            ["bold", "italics", "underline", "ul", "ol"],
            ["justifyLeft", "justifyCenter", "justifyRight"]
        ];

        static $inject = [];
        constructor() {
        }
    }

    DemoApp.controller("EditNoteController", EditNoteController);
}