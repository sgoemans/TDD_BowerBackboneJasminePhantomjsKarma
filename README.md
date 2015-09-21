An introduction to TDD style in a Backbone application project
==================

Building a Backbone application from grounds up using TDD
....with Jasmine !

####Introduction
This page will introduce you to common project layouts and best practice when developing an application from grounds up.
In this example, we'll use the Test Driven Development approach, which basically enforces you to write tests first
before coding the corresponding app modules. The workflow described in this wiki article can be applied to all your
Backbone applications. For the TDD approach we'll use Jasmine as our unit testing framework. Therefore, our project
implementation steps look like this:
#####1) Create a project layout directory structure
#####2) Define the required Javascript libraries/frameworks and put them in a bower.json config file.
#####3) Create a basic testrunner html file for running your unit tests
#####4) Write your first test against the project's namespace and watch them fail.
#####5) Define the project's namespace in your first app file and make your tests pass.
#####6) Write your first Backbone model test and watch them fail.
#####7) Write your Backbone model file and see your tests succeed.
#####8) Do the same with collections
#####9) Our first Backbone view tests
#####10) The Backbone view needs a template
#####11) Migrate the project for running under Karma

You may have noticed that the steps above don't tell you much about the actual application we have in mind. That's
because we initially focus on the Backbone boilerplate code and development patterns, as well as the common/best practice
of Jasmine unit testing. All of this does not depend much on the application's business logic. Nevertheless, the first
details on the "Notes" example application which we cover in this article can be found in chapter 6.

####Prerequisites
Install nodejs from http://nodejs.org/

Install bower globally (`npm install -g bower`)

####Tutorial
#####1) Create a project layout directory structure
```TDDexampleProject
|---app
    |---js
        |---models
        |---collections
        |---views
|---test
    |---js
        |---specs
```
#####2) Package management with Bower: Create the config file `bower.json`

Bowers main configuration file is called bower.json. Make sure you put the bower.json file in the project's root folder
as in the example project layout above. The two most important attributes in bower.json are dependencies and
devDependencies. As long as you are in the development process, you probably need both dependencies and devDependencies
resolved. This means, if you do a "bower install", bower will copy the corresponding Git repositories into the
bower-components folder which is created if it doesn't already exist in your project folder. If you want Bower to use
another directory to store the dependant javascript libraries to, just create a .bowerrc file and specify a directory.
If your final module will be used by another development team, make sure you put all testing and other non-app libraries
or frameworks into the devDependencies section. The modules listed in there will not be installed when you enter the
bower install command with the -p or --production parameter. Examples:

```bower install -p  // will install only the modules listed under dependendies```

```bower install  // will install all modules listed under both dependencies and devDependencies```

Note: The ignore property in the bower.json file does not ignore files when you do a bower install. Installing bower
components with "bower install" will unanonymously copy the whole Git repository of this component. The ignore property
comes into play if you commit your code to Git. This is the time when your ignore settings are evaluated.

#####3) Create a basic testrunner html file for running your unit tests

In a Single Page Application (SPA) you usually have only one html file which is called index.html. This file loads all
your Javascript and CSS files for running your application. It does not contain any unit testing modules like Jasmine,
Sinon, Karma, PhantomJS and so on. Since testing happens independantly from running your application, a seperate .html
file is necessary which specifies not only your application modules but also your testing frameworks and test (spec)
files. In our example, we put this html file into the test subdirectory of our project and call it test.html.

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Backbone Testing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <!-- Distribution libraries -->
    <!-- Application modules - your javascript app files to be included
    here-->
    <!-- DevDependencies for testing -->
    <link rel="shortcut icon" type="image/png" href="../bower_components/jasmine/images/jasmine_favicon.png">
    <link rel="stylesheet" href="../bower_components/jasmine/lib/jasmine-core/jasmine.css"/>
    <script src="../bower_components/jasmine/lib/jasmine-core/jasmine.js"></script>
    <script src="../bower_components/jasmine/lib/jasmine-core/jasmine-html.js"></script>
    <script src="../bower_components/jasmine/lib/jasmine-core/boot.js"></script>
    <!-- Spec files - javascript test files to be added here-->
    <script src="js/spec/namespace.spec.js"></script>
</head>
<body>
</body>
</html>
```

#####4) Write your first test against the project's namespace and watch them fail
This simple test makes sure that you defined your javascript namespace in the global namespace. The namespace we want to use in this tutorial is "App" for our Backbone classes and "app" for object instancies. In case any other javascript module/library that we use employs variables with the same name, the following code will merge our namespace with it, hopefully not breaking anything in the foreign module's functionality. In most cases, these two variables are for our exclusive use, so they are undefined at the beginning. As you can see, we already reserve
sub-namespaces for our Backbone components; 
* Model
* Collection
* View
* Router

```
describe("Namespace ", function () {
  it("should include 'App' object", function () {
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
```

The only spec file you currently need in your test.html file is `<script src="js/spec/namespace.spec.js"></script>`. If
you open the test.html file in your browser (in Webstorm, look at the test.html file and hover your mouse pointer over
the upper right corner of the editor window. The browser icons will appear and you click on your preferred browser). The
output should look like the image in `screenshots/jasmine1.PNG`.

#####5) Define the project's namespace in your first app file and make your tests pass
Now its a good time to make the namespace specs pass. To accomplish this, we just need to create a javascript file which
initializes the namespace variables. Then we include this file in the &lt;script> tags of our test.html file and repeat
the tests. First we write our namespace module called namepsace.js and put it in our project folder app/js.

```
var App = App || {};
App.Views || (App.Views = {});
App.Models || (App.Models = {});
App.Collections || (App.Collections = {});
App.Routers || (App.Routers = {});
App.Config || (App.Config = {});
App.Templates || (App.Templates = {});
var app = app || {};
```

See how the namespace.js file has to be included in test.html:

```
<!DOCTYPE html>
<html>
<head lang="en">
<meta charset="UTF-8">
<title>Backbone Testing</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
<!-- Distribution libraries -->
<!-- Application modules - your javascript app files to be included here-->
<script src="../app/js/namespace.js"></script>
<!-- DevDependencies for testing -->
<link rel="shortcut icon" type="image/png" href="../bower_components/jasmine/images/jasmine_favicon.png">
<link rel="stylesheet" href="../bower_components/jasmine/lib/jasmine-core/jasmine.css" />
<script src="../bower_components/jasmine/lib/jasmine-core/jasmine.js"></script>
<script src="../bower_components/jasmine/lib/jasmine-core/jasmine-html.js"></script>
<script type="text/javascript" src="../bower_components/jasmine/lib/jasmine-core/boot.js"></script>
<!-- Spec files - javascript test files to be added here-->
<script src="js/specs/namespace.spec.js"></script>
</head>
<body>
</body>
</html>
```

As you can see above, we run our first tests against the namespace.js file:
`<script src="../app/js/namespace.js"></script>`

#####6) Write your first Backbone model tests and watch them fail
Its always a good idea to think about what your application modules are all about before you start wiriting code. For the
notes application which we have in mind here, we want to create, edit and delete notes. In addition, we want to store and
retrieve/display the notes details. The most basic functionality of a notes application would be to store the notes title,
its detailed text, a creation date, and a priority. This already sounds like a good data model for our notes application.
Having this data model in mind, what could we test of a Backbone representation of this data model? First of all, the
most basic test is verifying that the model instance is defined and that its defaults have been set properly. We create
the model's instance in the `beforeEach()` method of the test which is run before every single test using `it()`.
Usually, its a good idea to delete or destroy the objects instance after each test, but we omitt this for now.

```
describe("App.Models.Note", function () {
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
});
```

This was quite simple. Let's think about a more complex test scenario. Backbone relies on asynchronous execution of many
of its functions. A simple change of a model's attribute can already trigger an event that your application can respond
to. To test this capability, see the following test:

```
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
```

This is definitely a more advanced techniques. To put it simple, we create an asynchronous test by calling the function
`this.mode.once()` (similar to `this.model.on()`). The callback that is specified in its arguments will be called as soon
as the Backbone model detects a change in one of its attributes. If we specify a particular attribute, like we did in the
example above, the trigger only fires when this attribute is changed.  

Note: Jasmine allows an argument in the `it()` function argument. If present, this argument is set by Jasmine to a
callback function which signals the end of the test's execution. Even if the `it()` block's code processing reaches the
end in line 10, the test is only considered to have finished when the `done()` function in line 6 has been called. But
this only happens if an asychronous call of the callback function argument in the `this.model.once()` method occured. We
need to update our test runner html file in order for this test to run. To get the namespace test out of the way, we
comment it out. Then the new test is included in line 31 which we name `noteModel.spec.js`. Since this is our first test
which makes use of Backbone, we need to include Backbone and its dependent `jquery` and `underscore` libraries.

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Backbone Testing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <!-- Distribution libraries -->
    <script src="../bower_components/jquery/dist/jquery.min.js"></script>
    <script src="../bower_components/underscore/underscore.js"></script>
    <script src="../bower_components/backbone/backbone.js"></script>
    <!-- Application modules - your javascript app files to be included here-->
    <script src="../app/js/namespace.js"></script>
    <script src="../app/models/noteModel.js"></script>
    <!-- DevDependencies for testing -->
    <link rel="shortcut icon" type="image/png" href="../bower_components/jasmine/images/jasmine_favicon.png">
    <link rel="stylesheet" href="../bower_components/jasmine/lib/jasmine-core/jasmine.css" />
    <script src="../bower_components/jasmine/lib/jasmine-core/jasmine.js"></script>
    <script src="../bower_components/jasmine/lib/jasmine-core/jasmine-html.js"></script>
    <script type="text/javascript" src="../bower_components/jasmine/lib/jasmine-core/boot.js"></script>
    <!-- Spec files - javascript test files to be added here-->
    <!-- <script src="js/specs/namespace.spec.js"></script> -->
    <script src="js/specs/noteModel.spec.js"></script>
</head>
<body>
</body>
</html>
```

When we run the tests, we will get quite a few errors, not just test failing errors, but also program errors because of
undefined objects which we tried to use without being defined.

####7) Write your Backbone model file and see your tests succeed
According to the test failures, we need to define our model with default values. According to our model test spec, the
`title` attribute must exist but be an empty string. The `text` attribute is tested against the value '*Edit your note*',
so this must be its default value. The `createdAt` attribute obviously must hold a value of type date. In summary, our
model looks like this:

`App.Models.Note = Backbone.Model.extend({   
  defaults: {   
      title: '',   
      text: '*Edit your note*',   
       createdAt: new Date()   
  }  
});`

Just add the line `<script src="../app/js/note.js"></script>` under your Application modules section of your test.html 
file and you are done. When running the tests again, you should see the Jasmine output like in `screenshots/jasmine3.PNG`.

TDD doesn't mean you are not allowed to add tests later, after you've already created the module for testing. It would be better
to think of all required tests beforehand, though. Sometimes, like in the preceding case, it might be necessary to create
a minimum of app code in order to have an object to write test against.
To complete our Backbone model tests, we now add another test which checks whether the validate method kicks in if we
try to set an invalid value. The name of the backbone trigger is "invalid" (see line 4 in the codeblock below):

`
it("throws an error if text is empty", function (done) {
  var self = this;
  // Event that is triggered by changing the text's value to empty
  this.model.on("invalid", function (model, error) {
    expect(error).toEqual('Text must not be empty');
    done();
  });
  // Make our note model trigger a change event
  this.model.set({ text: "" }, { validate:true });
});
`
What's left to do is to include the validate function to our model. The validate method is passed the model attributes,
as well as the options from set or save. You have to figure out yourself which value caused the validation failure.
In older Backbone versions the model's set method invoked validate automatically. But since later revisions of Backbone
the validation is disabled by default. In order to enable it when you want to set a value, just add the object literal
validate:true as a parameter to the set call. Please note that the validate method will trigger an "invalid" event if the
method returns a value. See how the note.js file looks like after we added the validate method.

```
App.Models.Note = Backbone.Model.extend({
  defaults: {
    title: '',
    text: '*Edit your note*',
    createdAt: new Date()
  },
  validate: function(attr, options) {
    if(attr.text == '' ) {
      return 'Text must not be empty';
    }
  }
});
```

#####8) Do the same with collections
A typical set of collection tests should verify that:
* Collection objects can be created with or without initializing them with model objects
* Model objects can be added and removed from a collection
* Events are triggered on container and model changes
* Data is appropriately synchronized with the backend
Let us begin with a simple collection creation test. For simplicity sake, we do not employ a full blown data server
(REST) here, but rely on a simple WebStorage addin for Backbone, called ´Backbone.LocalStorage´. The specrunner test.html
now looks like this:

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Backbone Testing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
    <!-- Distribution libraries -->
    <script src="../bower_components/jquery/dist/jquery.min.js"></script>
    <script src="../bower_components/underscore/underscore.js"></script>
    <script src="../bower_components/backbone/backbone.js"></script>
    <script src="../bower_components/backbone.localStorage/backbone.localStorage.js"></script>
    <!-- Application modules - your javascript app files to be included here-->
    <script src="../app/js/namespace.js"></script>
    <script src="../app/js/models/noteModel.js"></script>
    <!-- <script src="../app/js/collections/noteCollection.js"></script> -->
    <!-- DevDependencies for testing -->
    <link rel="shortcut icon" type="image/png" href="../bower_components/jasmine/images/jasmine_favicon.png">
    <link rel="stylesheet" href="../bower_components/jasmine/lib/jasmine-core/jasmine.css" />
    <script src="../bower_components/jasmine/lib/jasmine-core/jasmine.js"></script>
    <script src="../bower_components/jasmine/lib/jasmine-core/jasmine-html.js"></script>
    <script type="text/javascript" src="../bower_components/jasmine/lib/jasmine-core/boot.js"></script>
    <!-- Spec files - javascript test files to be added here-->
    <!-- <script src="js/specs/namespace.spec.js"></script> -->
    <script src="js/specs/noteModel.spec.js"></script>
    <script src="js/specs/noteCollection.spec.js"></script>
</head>
<body>
</body>
</html>
```

As you can see, we added the Backbone.LocalStorage library. Backbone collections have a fetch method that retrieves
models from the server or, in this case, local storage.
The noteCollection.js to be tested is commented out for now. A simple backbone collection spec file looks like this: 

```
describe('App.Collections.Notes', function() {
  beforeEach(function () {
    // Create a reference for all internal suites/specs.
    this.notes = new App.Collections.Notes();
    // Use internal method to clear out existing data.
    this.notes.localStorage._clear();
  });
  afterEach(function () {
    // Remove the reference.
    this.notes = null;
  });
  it("has correct instanceof and zero length values", function () {
    expect(this.notes instanceof App.Collections.Notes).toBeTruthy();
    expect(this.notes.length).toEqual(0);
  });
  it('should be emtpy on fetch', function (done) {
    var self = this;
    this.notes.once("reset", function () {
      expect(self.notes.length).toEqual(0);
      // Async code has completed. Signal test is done.
      done();
    });
    // Fetches data from localStorage
    this.notes.fetch({ reset: true });
  });
});
```

In the example above we only test against the instantiation of the collection. Of course we want to create new models in the
collection and check whether we can see and make use of it. Please note that we will nest the next test suite within the
one from the above example. This enables us to make use not only of the `beforeEach()` method in this particular test
suite, but also of the `beforeEach()` in the upper level test suite.

```
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
```

When running the above spec file, we'll get a lot of errors because of missing objects like App.Collections.Notes
or App.Models.Note object. We'll start implementing our noteCollection.js module. We need to include a reference
to the localstorage library in it:

```
App.Collections.Notes = Backbone.Collection.extend({
    model: App.Models.Note,
    localStorage: new Backbone.LocalStorage("my-identifier")
});
```

In fact, this is already sufficient for our tests to pass. Just comment out the noteCollection.js script entry from our
specrunner and that's it. The test output should look like in `/screenshots/jasmine6.PNG`.