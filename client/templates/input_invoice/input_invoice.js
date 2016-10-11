

Template.sale.events({
  'click .seeInvoice': function (event){
  var valueid = event.target.value;
  Session.set('valueid', valueid);
  Check.update({_id: 1},        //update данных
   {$set: {value: valueid}});
   return false;
  }
});

/*/ значение для синей кнопки check
Template.sale.helpers({
  check: function(){
    var val = Session.get('valueid');
    alert(val);
    return val;
  }
});
*/
Template.sale.helpers({

  iinvo: function(){
    var but = Session.get('valueid');
    but = +but;
    return Input_invoice.find({"randId": but});
   }

});
Template.sale.helpers({
        // выводим по дате накладные
    rand: function(){
        var date_select = Session.get('date');

        // получаем все данные из базы
        var val = Input_invoice.find({'date': date_select}).fetch();

        // создаем массив
        var randId = _.pluck(val, 'randId');
        // получаем уникальные значения
        var randUniq = _.uniq(randId);
        //var randLen = randUniq.length;
  return randUniq;
  }
});

Template.sale.helpers({
  datego: function(){
    var but = Session.get('valueid');
    but = +but;
    var val = Input_invoice.find({"randId": but}).fetch();

    var arrayNames = _.pluck(val, 'date');
    arrayNames = _.first(arrayNames);
    return arrayNames;
  }

})



Template.sale.events({
  'submit .selectDate': function(event){
    var nameGroup1 = event.target.oneDate.value;

    var final_date = nameGroup1[3] + nameGroup1[4] + nameGroup1[5] + nameGroup1[0] + nameGroup1[1] + nameGroup1[2] + nameGroup1[6] + nameGroup1[7] + nameGroup1[8] + nameGroup1[9];

    var ng1 = final_date.replace(/\//gi, ".");

    Session.set('date', ng1);

    return false;
  }
})


Template.sale.rendered=function() {
	$('#my-datepicker').datepicker();
}
