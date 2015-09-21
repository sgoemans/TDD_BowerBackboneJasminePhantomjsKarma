/**
 * Created by sgoemans on 21.09.2015.
 */
App.Collections.Notes = Backbone.Collection.extend({
    model: App.Models.Note,
    localStorage: new Backbone.LocalStorage("my-identifier")
});