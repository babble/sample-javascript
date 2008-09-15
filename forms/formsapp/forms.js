core.modules.djang10.forms.forms();

// This creates a new subclass of forms.Form, defining an event form.
// The python / Django equivalent would look like:
/*
    class EventForm(forms.Form):
        title = forms.CharField(max_length=30)
        description = forms.CharField(widget=forms.Textarea, max_length=100)
        date = forms.SplitDateTimeField(help_text='Enter the date in the first box, and the time in the second.')
        URL = forms.URLField(required=False, verify_exists=True)
        file_upload = forms.FileField(required=False)
        all_day = forms.BooleanField(required=False)
*/
// We can immediately see some differences (besides the fact that one is
// javascript and one is python) between Django forms and djang10 forms:
//
// In djang10 fields must be instantiated with the new keyword, and are
// located in the fields object, not forms itself.
//
// djang10 fields take a single parameter which is an object, allowing
// emulation of python's keyword arguments.
//
// Inheritance works differently - we must call the Form constructor:
//      forms.Form.apply(this, arguments);
//  and also set the prototype chain correctly:
//      EventForm.prototype.__proto__ = forms.Form.prototype;
// This is a bit clunkier than Django's `class EventForm(forms.Form)`, and the
// syntax might be simplified in the future.
EventForm = function() {
    this.title = new fields.CharField({max_length: 30});
    this.description = new fields.CharField({widget: widgets.Textarea, max_length: 100});
    this.date = new fields.SplitDateTimeField({help_text: 'Enter the date in the first box, and the time in the second.'});
    this.URL = new fields.URLField({required: false, verify_exists: true});
    this.file_upload = new fields.FileField({required: false});
    this.all_day = new fields.BooleanField({required: false});
    
    forms.Form.apply(this, arguments);
};
EventForm.prototype.__proto__ = forms.Form.prototype;

// A simple form for UserForm and MusicianForm to inherit from.
PersonForm = function() {
    this.first_name = new fields.RegexField({regex: /^[a-zA-Z\s'.]+$/, error_message: 'Name can only contain normal characters'});
    this.last_name = new fields.RegexField({regex: /^[a-zA-Z\s'.]+$/, error_message: 'Name can only contain normal characters'});
    this.birthdate = new fields.DateField();
    
    forms.Form.apply(this, arguments);
};
PersonForm.prototype.__proto__ = forms.Form.prototype;

// A form to represent a user. Inherits from PersonForm. Again, note the use
// of JavaScript style inheritance here instead of the syntax we would use in
// Django / python.
//
// Another thing to note is that the fields declared in the
// subclass will be created BEFORE those of the base class. So the order of
// fields is not what you'd expect, or what you get in Django. This might be
// changed in the future, but for now see MusicianForm below for a workaround.
UserForm = function() {
    this.email = new fields.EmailField();
    this.password = new fields.CharField({widget: widgets.PasswordInput});
    this.password2 = new fields.CharField({widget: widgets.PasswordInput, label: 'Another password'});
    // Add a clean() function that will be called after the fields have all been validated
    var that = this;
    this.clean = function() {
        if (that.cleaned_data['password'] && that.cleaned_data['password2'] && that.cleaned_data['password'] !== that.cleaned_data['password2']) {
            throw new util.ValidationError('Please make sure your passwords match.');
        }
        return that.cleaned_data
    };
    
    PersonForm.apply(this, arguments);
};
UserForm.prototype.__proto__ = PersonForm.prototype;

// A form to represent a musician. Also inherits from PersonForm.
//
// Here we get around the fact that inheritance messes up field ordering by
// calling PersonForm as soon as the constructor is entered. This sets up the
// fields like first_name and last_name that all PersonForm's have. Next we
// add the new fields specific to MusicianForm. Finally we call the base Form
// constructor. This is the strange step, but it is necessary in order to
// recognize the other fields that have been added to MusicianForm.
MusicianForm = function() {
    PersonForm.apply(this, arguments);
    this.instrument = new fields.ChoiceField({'choices': {'G': 'Guitar', 'B': 'Bass', 'D': 'Drums'}});
    forms.Form.apply(this, arguments);
};
MusicianForm.prototype.__proto__ = PersonForm.prototype;

// Demonstrates the use of IntegerField and DecimalField.
//
// We also use a prefix when rendering this form - check out views.js
TransactionForm = function() {
    this.product_ID = new fields.CharField({max_length: 30});
    this.price_per_unit = new fields.DecimalField({min_value: 0, max_value: 1000, decimal_places: 2});
    this.number_of_units = new fields.IntegerField({min_value: 1, max_value: 10000});
    forms.Form.apply(this, arguments);
};
TransactionForm.prototype.__proto__ = forms.Form.prototype;