Template.basket.events({
 'submit .addToInput': function (event){

   var bas_name = event.target.bas_name;
   var bas_brand = event.target.bas_brand;
   var bas_num_brand = event.target.bas_num_brand;
   var cols = event.target.colbasket;
   var bas_cost = event.target.bas_cost;
   var oneSkidka = event.target.oneSkidka;
   var markup = event.target.markup;


   // количество записей в basket
   var vall = Basket.find().fetch();
   var massive = _.pluck(vall, 'bas_name');
   var mass_length = massive.length;
   var mass_real = mass_length;


   var vall = Main_base.find().fetch();
   var massive = _.pluck(vall, 'num_brand');
   var numberIdMain = _.pluck(vall, '_id');
   // Если в массив нет aiM_num_brand, если есть то обновим количество
    var mass_length = massive.length; // 2

   var ranid = Math.random() * 1000000000000000;
   var randId = Math.floor(ranid, 10);
   var col = 0;
   var mark = 0;

   //создаем дату для базы
   var realDate = new Date();
   var newDate = realDate.toLocaleDateString();

   while(col < mass_real){

        if(mass_real == 1){

          var realCol = bas_cost.value * cols.value;
          mark = realCol - mark - oneSkidka.value;

          Input_invoice.insert({
            "name_detail": bas_name.value,
            "brand": bas_brand.value,
            "num_brand": bas_num_brand.value,
            "exist": cols.value,
            "costOne": bas_cost.value,
            "realCol": realCol,
            "sale": oneSkidka.value,
            "randId": randId,
            "date": newDate,
            "markup": mark
          });

                var go = 0;
            
              while (go < mass_length) {

                if(massive[go] == bas_num_brand.value){
                Main_base.update({"_id": numberIdMain[go]},
                {$inc: {"exist": -cols.value}});

              }

                go++;
              }
       }

       if(mass_real != 1){

       var realCol = bas_cost[col].value * cols[col].value;
       mark = realCol - mark - oneSkidka[col].value;
       Input_invoice.insert({
         "name_detail": bas_name[col].value,
         "brand": bas_brand[col].value,
         "num_brand": bas_num_brand[col].value,
         "exist": cols[col].value,
         "costOne": bas_cost[col].value,
         "realCol": realCol,
         "sale": oneSkidka[col].value,
         "randId": randId,
         "date": newDate,
         "markup": mark
       });


                             var go = 0;
                           while (go < mass_length) {

                             if(massive[go] == bas_num_brand[col].value){
                             Main_base.update({"_id": numberIdMain[go]},
                             {$inc: {"exist": -cols[col].value}});
                           }
                             go++;

                           }
          }
     col++;
     //Meteor.call('removeAllBasket');
   }



 }
});

Template.basket.events({
 'click .basketClear': function (){
  Meteor.call('removeAllBasket');

 }
});

Template.basket.events({
 'click .del-basket': function (){
  Meteor.call('removeAllBasket');

 }
});
