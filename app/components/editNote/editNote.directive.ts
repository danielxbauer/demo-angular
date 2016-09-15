module Demo {
    export class EditNoteDirective implements ng.IDirective {
        public scope = {
            note: "="
        };
        public bindToController = true;

        public controller = "EditNoteController";
        public controllerAs = "controller";
        public templateUrl = "wwwroot/views/components/editNote/editNote.html";

        public static create(): EditNoteDirective {
            return new EditNoteDirective();
        }
    }

    DemoApp.directive("editNote", EditNoteDirective.create);
}