module Demo {
    export class NoteManager {
        static $inject = ["$q"];
        constructor(
            private $q: ng.IQService) {
        }

        /* Normally you would inject the $http service and
         * call a rest api backend like so:
         * 
         * return this.$http.get("/notes");
         *
         * we fake the async responses with the QServices.
         */

        private notes: INote[] = [
            { id: 1, title: "note 1", text: "note 1 text" },
            { id: 2, title: "note 2", text: "note 2 text" },
            { id: 3, title: "note 3", text: "note 3 text" },
            { id: 4, title: "note 4", text: "note 4 text" },
            { id: 5, title: "note 5", text: "note 5 text" }
        ];

        public loadNotes(): ng.IPromise<INote[]> {
            var defer = this.$q.defer();
            defer.resolve(this.notes);
            return defer.promise;
        }
        public loadNote(noteId: number): ng.IPromise<INote> {
            var defer = this.$q.defer();

            var note = this.notes.filter(m => m.id == noteId)[0];

            if (note) {
                defer.resolve(note);
            }
            else {
                defer.reject("NotFound");
            }

            return defer.promise;
        }    

        public createNote(note: INote): ng.IPromise<INote> {
            var defer = this.$q.defer();

            // Normally the note object is sent to the server which
            // saves it to the database causing the id to be set.
            // But we just simulate it here:

            note.id = Math.floor((Math.random() * 10000) + 1);
            this.notes.push(note);            
            defer.resolve(note);

            return defer.promise;
        }
    }

    DemoApp.service("NoteManager", NoteManager);
}