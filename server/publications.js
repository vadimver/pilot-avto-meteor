Meteor.publish("input_ain", function () {
      return Input_ain.find();
    });

Meteor.publish("look", function (result_n) {
return Look.find({"ARL_SEARCH_NUMBER": result_n});
      });

Meteor.publish("brands", function () {
return Brands.find();
      });

Meteor.publish("main_base", function () {
return Main_base.find();
            });

Meteor.publish("add_invoice_final", function () {
return Add_invoice_final.find();
            });


Meteor.publish("basket", function () {
        return Basket.find();
});

Meteor.publish("input_invoice", function () {
        return Input_invoice.find();
});

Meteor.publish("add_invoice", function () {
        return Add_invoice.find();
});

Meteor.publish("groups", function () {
        return Groups.find();
});

Meteor.publish("subgroups", function () {
        return Subgroups.find();
});

Meteor.publish("reserv", function () {
        return Reserv.find();
});

Meteor.publish("check", function () {
        return Check.find();
});
