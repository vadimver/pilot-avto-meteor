
//--------------------------

Template.invoice.events({
  'click .seeInvoice': function (event){
  var valueid = event.target.value;
  Session.set('valueid', valueid);

  }
});

Template.invoice.helpers({

  invo: function(){
    var but = Session.get('valueid');
    return Add_invoice.find({"idinput": but});
   }

});
Template.invoice.helpers({
        rand: function(){
            var date_select = Session.get('dateInvoice');
            // получаем дату нужную

            // получаем все данные из базы по дате
            var val = Add_invoice.find({'date': date_select}).fetch();

            // создаем массив накладных
            var randId = _.pluck(val, 'idinput');
            // получаем уникальные значения накладных
            var randUniq = _.uniq(randId);

            // получаем данные из базы - подходящие под randUniq
            var invoice = Add_invoice.find({'idinput': {$in : randUniq}});
      return invoice;
      }
});


Template.invoice.events({
  'submit .selectDate': function(event){
    var nameGroup1 = event.target.oneDate.value;

    var final_date = nameGroup1[3] + nameGroup1[4] + nameGroup1[5] + nameGroup1[0] + nameGroup1[1] + nameGroup1[2] + nameGroup1[6] + nameGroup1[7] + nameGroup1[8] + nameGroup1[9];

    var ng1 = final_date.replace(/\//gi, ".");

    Session.set('dateInvoice', ng1);

    return false;
  }
})


Template.invoice.rendered=function() {
	$('#my-datepicker').datepicker();
}
