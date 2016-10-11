// Выгружаем номер из AIN
Template.addInvoice.helpers({

 val_search: function(){
   var val = Input_ain.find().fetch();

   var r_val = _.pluck(val, 'value_search');
   var real_val = r_val[0];

   // значение AIN запроса
   Session.set('norm', real_val);
   return real_val;
 }
});

// Получаем массив номеров из Look
Template.addInvoice.helpers({
  nlook: function(){
    // имеем массив номеров
    var val = Look.find().fetch();
    var r_val = _.pluck(val, 'ARL_BRA_ID');
    Session.set('to_brand', r_val);
    return r_val;
   }

});

// Получаем и выводим бренды
Template.addInvoice.helpers({

 brabra: function(){
   var session_tb = Session.get('to_brand');
   return Brands.find({BRA_ID: {$in: session_tb}});

 }
});
// Add_invoice_final
Template.addInvoice.helpers({
 final: function(){
  return Add_invoice_final.find();
 }
});

// вывод из main_base
Template.addInvoice.helpers({

 select: function(){

   // если есть значение то выводим из main_base, если нет то
   // butBrand как бренд и Session.get('norm') как num_brand

   var vall = Main_base.find({"num_brand": Session.get('norm')}).fetch();

   // num_brand из main_base
   var ain = Session.get('norm');
   var r_vall = _.pluck(vall, 'num_brand');
   var notHave = [{'brand' : Session.get('butBrand'), 'num_brand' : ain}];
   // проверяем наличие переменной
  if(r_vall == ain){
    toAdd = Main_base.find({"num_brand": Session.get('norm')});

  }else{
    toAdd = notHave;

  }
  return toAdd;

 }
});

// получаем выбранный бренд
Template.addInvoice.events({
 'click .butBrand': function (event){
   Session.set('butBrand', event.target.value);
 }
});


Template.addInvoice.helpers({
  groups: function(){
    return Groups.find();
  }
});



Template.addInvoice.helpers({
  // создаем сессию подгрупп
  subgroups: function(){
    var gr = Session.get('group_name');
    var subgro = Subgroups.find({'group': gr});
    return subgro;
  }
});


// создаем имена выбранных групп
Template.addInvoice.helpers({

  grp: function(){
    var gr = Session.get('group_name');
    return gr;
  }
});
// создаем имена выбранных подгрупп
Template.addInvoice.helpers({
  // создаем сессию подгрупп
  subgrp: function(){
    var sgr = Session.get('subgroup_name');
    return sgr;
  }
});
