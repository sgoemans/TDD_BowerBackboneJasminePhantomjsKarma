/**
 * Created by sgoemans on 21.09.2015.
 */
App.Views.NoteView = Backbone.View.extend({
    initialize: function () {
        this.collection.on("reset", this.render, this);
    },
    render: function () {
        var tmpl = _.template('<div id=pane-title><%=title%></div><div id=pane-text><%=text%></div><br>');
        this.collection.each(function (model) {

            this.$el.append(tmpl(model.toJSON()));

            console.log("+++" + this.el);
         }, this); // 'This' is important because otherwise the callback would have the wrong context
        return this; // enable chained calls
    }
});

