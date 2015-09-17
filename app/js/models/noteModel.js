/**
 * Created by sgoemans on 17.09.2015.
 */
App.Models.Note = Backbone.Model.extend({
    defaults: {
        title: '',
        text: '*Edit your note*',
        createdAt: new Date()
    }
});
