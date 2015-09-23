/**
 * Created by sgoemans on 22.09.2015.
 */
var note1 = new App.Models.Note({ title: 'My first title', text: 'Some meaningless text'});
var note2 = new App.Models.Note({ title: 'Second title', text: 'More crap to forget about'});

var notes = new App.Collections.Notes();
notes.add(note1);
notes.add(note2);

var x = $('#fixtures');
console.log();
var noteView = new App.Views.NoteView({ el: x, collection: notes });
noteView.render();