Template.print.helpers({
  // дата
  date: function(){
    var realdate = new Date();
    var newDate = realdate.toLocaleDateString();
    return newDate;
   }

});

Template.print.helpers({
  // рандом накладной
  rand: function(){
    var rand = Math.random() * (100000 - 10000) + 10000;
    rand = Math.round(rand);

    return rand;
   }

});



// Вывод данных

Template.print.helpers({
  check: function(){

    var checkBase = Check.find().fetch();
    var value = _.pluck(checkBase, 'value');



    var base = Input_invoice.find({'randId': +value});

    return base;

  }
});

Template.print.helpers({
  allMoney: function(){

    var checkBase = Check.find().fetch();
    var value = _.pluck(checkBase, 'value');



    var base = Input_invoice.find({'randId': +value}).fetch();
    var allcost = _.pluck(base, 'realCol');

    var sum = 0;
    for(var i = 0; i < allcost.length; i++){
        sum += allcost[i];
        }

    return sum;

  }
});
