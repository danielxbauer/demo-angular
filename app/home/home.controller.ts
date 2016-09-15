module Demo {
    export class HomeController {

        public notes: INote[] = [];

        static $inject = ["NoteManager", "$state"];
        constructor(
            private noteManager: NoteManager,
            private $state: ng.ui.IStateService) {

            this.loadNotes();
        }

        private loadNotes(): void {
            this.noteManager.loadNotes().then(
                (notes: INote[]) => {
                    this.notes = notes;
                },
                (reason: any) => {
                    console.error(reason);
                });
        }

        private openNote(id: number): void {
            this.$state.go("detail", { id: id });
        }
    }

    DemoApp.controller("HomeController", HomeController);
}