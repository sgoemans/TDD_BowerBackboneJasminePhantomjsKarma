/**
 * Created by sgoemans on 21.09.2015.
 */
describe('App.Collections.Notes', function() {
    beforeEach(function () {
        this.notes = new App.Collections.Notes();
        this.notes.localStorage._clear();
    });
    afterEach(function () {
        this.notes = null;
    });
    // We enclose the tests from the previous example in its own test suite
    describe("instantiation", function () {
        it("has correct instanceof and zero length values", function () {
            expect(this.notes instanceof App.Collections.Notes).toBeTruthy();
            expect(this.notes.length).toEqual(0);
        });
        it('should be emtpy on fetch', function (done) {
            var self = this;
            this.notes.once("reset", function () {
                expect(self.notes.length).toEqual(0);
                done();
            });
            this.notes.fetch({ reset: true });
        });
    });
    // ... so we can rely on the beforeEach from the upper level suite
    describe("when adding a note the collection", function () {
        beforeEach(function () {
            this.notes.create({
                title: "Test note #1",
                text: "A newly created note model."
            });
        });
        afterEach(function () {
            // Wipe internal data and reset collection.
            this.notes.reset();
        });
        it('has a single note', function(done) {
            var self = this;
            this.notes.once('reset', function() {
                // Like an array, a Collection maintains a length property, counting the number of models it contains.
                expect(self.notes.length).toEqual(1);
                var note = self.notes.at(0);
                expect(note).toBeDefined();
                expect(note.get('title')).toEqual('Test note #1');
                expect(note.get('text')).toContain('newly created');
                done();
            });
            this.notes.fetch({ reset: true });
        });
        it('can remove a note', function(done) {
            var self = this;
            this.notes.once('remove', function() {
                expect(self.notes.length).toEqual(0);
                done();
            });
            var note = this.notes.shift();
            expect(note).toBeDefined();
        });
    });
})