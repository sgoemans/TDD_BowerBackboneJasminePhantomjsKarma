/**
 * Created by sgoemans on 21.09.2015.
 */
describe("App.Views.NoteView", function() {
    var self = this;
    var $fixture = $("<div id='note-view-fixture'></div>");
    var note1 = new App.Models.Note({ title: 'My first title', text: 'Some meaningless text'});
    var note2 = new App.Models.Note({ title: 'Second title', text: 'More crap to forget about'});

    var notes = new App.Collections.Notes();
    notes.add(note1);
    notes.add(note2);
    beforeEach(function() {
        $(document.body).append($('<div id="fixtures"></div>'));
        // Empty out and rebind the fixture for each run.
        $fixture.empty().appendTo($("#fixtures"));
        // New default model and view for each test.
        // Creation calls `render()`, so in tests we have an *already rendered* view.

        self.view = new App.Views.NoteView({
            el: '#fixtures',
            collection: notes
        });
        self.view.render();
    });
    afterEach(function () {
        //self.view.model.destroy();
    });
    it("can render more complicated markdown", function (done) {
        self.view.collection.once("add", function () {
            var $title = $("#pane-title"),
                $text = $("#pane-text");
            expect($title.text()).toEqual("My Title");
            expect($text.html()).toContain("My Heading</h2>");
            expect($text.html()).toContain("<ul>");
            expect($text.html()).toContain("<li>List item 2</li>");
            done();
        });
        self.view.collection.add(new App.Models.Note({
            title: "My Title",
            text: "## My Heading\n" + "* List item 1\n" + "* List item 2"
        }));
    });
});