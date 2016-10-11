// получаем значение в массиве BASKET
Template.main.events({
 'click .addbasket': function (event){

   var idtovar = event.target.value;

   Session.set('idtovar', idtovar);
   Session.set('idtovarres', 'zero');
 }
});
// получаем значение в массиве RESERV
Template.main.events({
 'click .addreserv': function (event){

   var idtovar = event.target.value;

   Session.set('idtovarres', idtovar);
   Session.set('idtovar', 'zero');
 }
});

// Задаем количество товара в корзине
Template.main.events({
  'submit .mainForm': function (event){

     var idtovar = Session.get('idtovar');
     var idtovarres = Session.get('idtovarres');


     var id = event.target.id;
     var name = event.target.name_detail;
     var brand = event.target.brand;
     var numBrand = event.target.num_brand;
     var col = event.target.col;
     var cost = event.target.cost_ua_mark;



     if(idtovar != 'zero'){
       if(idtovar == 0){
         Basket.insert({
           "id": id.value,
           "name": name.value,
           "brand": brand.value,
           "numBrand":numBrand.value,
           "col": col.value,
           "cost": cost.value
          });
       }else{
       Basket.insert({
         "id": id[idtovar].value,
         "name": name[idtovar].value,
         "brand": brand[idtovar].value,
         "numBrand":numBrand[idtovar].value,
         "col": col[idtovar].value,
         "cost": cost[idtovar].value
        });
       }
         alert('Товар добавлен в корзину');

     }else if(idtovarres != 'zero'){
       if(idtovarres == 0){
         Reserv.insert({
           "id": id.value,
           "name": name.value,
           "brand": brand.value,
           "numBrand":numBrand.value,
           "col": col.value,
           "cost": cost.value
          });

          Main_base.update({_id: id.value},        //update данных
          {$inc: {'exist': -col.value}});
          alert('Товар добавлен в резерв');
       }else{
       Reserv.insert({
         "_id": id[idtovarres].value,
         "name": name[idtovarres].value,
         "brand": brand[idtovarres].value,
         "numBrand":numBrand[idtovarres].value,
         "col": col[idtovarres].value,
         "cost": cost[idtovarres].value
        });



        Main_base.update({_id: id[idtovarres].value},        //update данных
        {$inc: {'exist': -col[idtovarres].value}});
        alert('Товар добавлен в резерв');
        }




      }
     return false;
     }
});



// удалить main_base
Template.main.events({
 'click .delmain': function (){
   Main_base.remove(this._id);
 }
});

// удалить main_base
Template.editMain.events({
 'click .delmain': function (){
   Main_base.remove(this._id);
 }
});
//  удалить баскет
Template.basket.events({
 'click .deletebas': function (){
  Basket.remove(this._id);
 }
});
