module Demo {
    export class DetailController {

        public note: INote;

        static $inject = ["id", "NoteManager"];
        constructor(
            noteId: number,
            private noteManager: NoteManager) {

            this.loadNote(noteId);
        }

        private loadNote(id: number): void {
            this.noteManager.loadNote(id).then(
                (note: INote) => {
                    this.note = note;
                },
                (reason: any) => {
                    console.error("WTF");
                });
        }
    }

    DemoApp.controller("DetailController", DetailController);
}