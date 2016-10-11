Meteor.methods({
  removeAll: function() {
    Add_invoice_final.remove({});
  }
});


Meteor.methods({
  removeAllBasket: function() {
    Basket.remove({});
  }
});
