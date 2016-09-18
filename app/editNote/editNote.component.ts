module Demo {

    export class EditNoteComponent {

        // bound by directive
        public noteId: number;
        //

        public note: INote;
        public editorOptions = [
            ["h1", "h2", "h3", "p", "quote"],
            ["bold", "italics", "underline", "ul", "ol"],
            ["justifyLeft", "justifyCenter", "justifyRight"]
        ];

        static $inject = ["NoteManager"];
        constructor(
            private noteManager: NoteManager) {
        }

        private $onInit() {
            this.loadNote();    
        }

        private loadNote(): void {
            this.noteManager.loadNote(this.noteId).then(
                (note: INote) => {
                    this.note = note;
                },
                (reason: any) => {
                    console.error("WTF");
                });
        }
    }

    DemoApp.component("editNote", {
        bindings: {
            noteId: "="
        },
        controller: EditNoteComponent,
        controllerAs: "controller",
        templateUrl: "wwwroot/views/components/editNote/editNote.html"
    });
}