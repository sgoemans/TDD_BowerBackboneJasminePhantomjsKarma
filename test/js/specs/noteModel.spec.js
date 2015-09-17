/**
 * Created by sgoemans on 17.09.2015.
 */
describe("noteModel ", function () {
    beforeEach(function() {
        this.model = new App.Models.Note();
    });
    it("should be defined", function () {
        expect(App.Models.Note).toBeDefined();
    });
    it("should have appropriate default values", function () {
        expect(this.model.get('title')).toEqual('');
        expect(this.model.get('text')).toEqual('*Edit your note*');
        expect(this.model.get('createdAt') instanceof Date).toBeTruthy();
    });
    it("can trigger a change event", function (done) {
        var self = this;
// Event that is triggered by changing the model's title
        this.model.once("change:title", function () {
            expect(self.model.get('title')).toEqual("My Title");
            done();
        });
// Make our note trigger a change event
        this.model.set({ title: "My Title" });
    });
});