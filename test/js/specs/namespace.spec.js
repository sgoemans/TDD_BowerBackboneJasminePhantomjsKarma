/**
 * Created by sgoemans on 16.09.2015.
 */
describe("Namespace ", function () {
    it("should include the 'App' objects", function () {
        expect(App).toBeDefined();
        expect(App.Views).toBeDefined();
        expect(App.Models).toBeDefined();
        expect(App.Collections).toBeDefined();
        expect(App.Routers).toBeDefined();
    });
    it("should include the 'app' object", function() {
        expect(app).toBeDefined();
    })
});