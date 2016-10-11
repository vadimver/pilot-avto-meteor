Meteor.subscribe('input_ain');
Meteor.subscribe('brands');
Meteor.subscribe('add_invoice_final');
Meteor.autorun(function() {
        Meteor.subscribe('look', Session.get('norm'));
});

Meteor.subscribe('main_base');
Meteor.subscribe('basket');
Meteor.subscribe('input_invoice');
Meteor.subscribe('add_invoice');
Meteor.subscribe('groups');
Meteor.subscribe('subgroups');
Meteor.subscribe('reserv');
Meteor.subscribe('check');
