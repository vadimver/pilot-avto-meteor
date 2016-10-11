Template.invoice.events({
 'click .delinvoice': function (){
   Add_invoice.remove(this._id);
 }
});

Template.sale.events({
 'click .delsale': function (){
   Input_invoice.remove(this._id);
 }
});
