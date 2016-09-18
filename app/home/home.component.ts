module Demo {
    
    export class HomeComponent {

        public isLoading: boolean = false;
        public notes: INote[] = [];

        static $inject = ["NoteManager", "$state"];
        constructor(
            private noteManager: NoteManager,
            private $state: ng.ui.IStateService) {
        }

        public $onInit() {
            this.loadNotes();
        }

        private loadNotes(): void {
            this.isLoading = true;
            this.noteManager.loadNotes().then(
                (notes: INote[]) => {
                    this.notes = notes;
                },
                (reason: any) => {
                    console.error(reason);
                }).finally(
                () => {
                    this.isLoading = false;
                });
        }

        public openNote(id: number): void {
            this.$state.go("detail", { id: id });
        }

        public createNote(): void {
            var note: INote = {
                id: 0,
                text: "",
                title: "New Note"
            };

            this.noteManager.createNote(note).then(
                (note: INote) => {
                    this.openNote(note.id);
                },
                (reason: any) => {
                    console.error(reason);
                });
        }
    }

    DemoApp.component("home", {
        controller: HomeComponent,
        controllerAs: "controller",
        templateUrl: "wwwroot/views/home/home.html"
    });
}