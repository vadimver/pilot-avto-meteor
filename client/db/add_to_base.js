// Добавляем запрос поиска в базу данных
Template.addInvoice.events({
 'submit .searchBrandsName': function (event){
   var searchBrandsValue = event.target.title.value;
   Input_ain.update({_id: 1},        //update данных
    {$set: {value_search: searchBrandsValue}});
    return false;
 }
});
// ADD TO INVOICE FINAL
Template.addInvoice.events({
 'submit .add_invoiceFinal': function (event){

   var aiF_id = event.target.id.value;

   var money = event.target.money.value;

   if(money == "uah"){
      var aiF_cost_ua = event.target.cost.value;
   }else{
     var aiF_cost_ua = event.target.cost.value * event.target.course.value;
   }



   var aiF_cost = Math.round(aiF_cost_ua * 100)/100;



   var aiF_group = Session.get('group_name');
   var aiF_subgroup = Session.get('subgroup_name');
   var aiF_name = event.target.name_detail.value;
   var aiF_description = event.target.desc.value;
   var aiF_avto = event.target.avto.value;
   var aiF_marc = event.target.marc.value;
   var aiF_brand = event.target.brand.value;
   var aiF_num_brand = event.target.num_brand.value;
   var aiF_original = event.target.original.value;
   var aiF_exist = event.target.exist.value;

   var aiF_course = event.target.course.value;

   var aiF_markup = event.target.markup.value;
   var aiF_discount = event.target.discount.value;



   Add_invoice_final.insert({
     "id": aiF_id,
     "group": aiF_group,
     "subgroup": aiF_subgroup,
     "name_detail": aiF_name,
     "desc": aiF_description,
     "avto": aiF_avto,
     "marc": aiF_marc,
     "brand": aiF_brand,
     "num_brand": aiF_num_brand,
     "original": aiF_original,
     "exist": +aiF_exist,
     "cost_ua": aiF_cost,
     "course": aiF_course,
     "markup": aiF_markup,
     "discount": aiF_discount
   });

   Input_ain.update({_id: 1},        //update данных
    {$set: {value_search: ''}});
    return false;
 }
});






// ADD to MAIN_BASE
Template.addInvoice.events({
 'submit .add_invoiceMain': function (event){


  var aim = Add_invoice_final.find().fetch();
  var aim_value = _.pluck(aim, '_id');
  var aim_length = aim_value.length; // количество записей

  // количества записей + 1 для цикла
  var aim_real = aim_length;


   // получаем количество значений в базе
   var aiM_id = event.target.id;
   var aiM_group = event.target.group;
   var aiM_subgroup = event.target.subgroup;
   var aiM_name = event.target.name_detail;
   var aiM_description = event.target.desc;
   var aiM_avto = event.target.avto;
   var aiM_marc = event.target.marc;
   var aiM_brand = event.target.brand;
   var aiM_num_brand = event.target.num_brand;
   var aiM_original = event.target.original;
   var aiM_exist = event.target.exist;
   var aiM_cost_ua = event.target.cost_ua;
   var aiM_course = event.target.course;
   var aiM_markup = event.target.markup;
   var aiM_discount = event.target.discount;


   var vall = Main_base.find().fetch();
   // количество в базе данных
   var massive = _.pluck(vall, 'num_brand');
   var numberIdMain = _.pluck(vall, '_id');

   // Если в массив нет aiM_num_brand, если есть то обновим количество
    var mass_length = massive.length; // 2

    //блок для сравнения  с наличием в базе-------------------------------------
    var i = 0;
    var a = [];

    if(aim_real == 1){
      a[0] = aiM_num_brand.value;
    }
    else{
    while(i < aim_length){
      a[i] = aiM_num_brand[i].value;
      i++;
    }
    }

    var haveTovar = _.intersection(a, massive);

    var twoStep = _.difference(a,haveTovar);  // получаем номер элемента нового
    //---------------------------------------------------------

    // -------------------------------------------------
    var ranid = Math.random() * 1000000000000000;
    var randId = Math.floor(ranid, 10);
    var col = 0;
    //создаем дату для базы
    var realDate = new Date();
    var newDate = realDate.toLocaleDateString();


    var provider = event.target.provider.value;
    var idinput = event.target.idinput.value;

    while(col < aim_real){
          if(aim_real == 1){
            var diffElement = aiM_num_brand.value;
          }else{
            var diffElement = aiM_num_brand[col].value;
          }
          diff = 0
          while(diff < twoStep.length){
            if(diffElement == twoStep[diff]){

              if(aim_real == 1){

                var cost_euro = +aiM_cost_ua.value / aiM_course.value
                var cost_euro_mark = +aiM_cost_ua.value / aiM_course.value * aiM_markup.value;
                var cost_ua_mark = +aiM_cost_ua.value * aiM_markup.value;
                var cost_ua = +aiM_cost_ua.value;
				var cost_ua_no = Math.round(cost_ua*100)/100;
				
                cost_ua = Math.round(cost_ua);
                cost_euro = Math.round(cost_euro*100)/100;
                cost_euro_mark = Math.round(cost_euro_mark*100)/100;
                cost_ua_mark = Math.round(cost_ua_mark);

                Main_base.insert({
                "provider": provider,
                "idinput": idinput,
                  "group": aiM_group.value,
                  "subgroup": aiM_subgroup.value,
                  "name_detail": aiM_name.value,
                  "desc": aiM_description.value,
                  "avto": aiM_avto.value,
                  "marc": aiM_marc.value,
                  "brand": aiM_brand.value,
                  "num_brand": aiM_num_brand.value,
                  "original": aiM_original.value,
                  "exist": +aiM_exist.value,
                  "cost_ua": cost_ua_no,
                  "course": +aiM_course.value,
                  "markup": aiM_markup.value,
                  "discount": +aiM_discount.value,
                  "cost_euro": cost_euro,
                  "cost_euro_mark": cost_euro_mark,
                  "cost_ua_mark": cost_ua_mark,
                  "date": newDate

                });


                // добавляем в накладные

                Add_invoice.insert({
                  "provider": provider,
                  "idinput": idinput,
                  "group": aiM_group.value,
                  "name_detail": aiM_name.value,
                  "avto": aiM_avto.value,
                  "marc": aiM_marc.value,
                  "brand": aiM_brand.value,
                  "num_brand": aiM_num_brand.value,
                  "original": aiM_original.value,
                  "exist": +aiM_exist.value,
                  "cost_ua": cost_ua_no,
                  "randId": randId,
                  "course": +aiM_course.value,
                  "date": newDate
                });
              }


              var cost_euro = +aiM_cost_ua[col].value / aiM_course[col].value;
              var cost_euro_mark = +aiM_cost_ua[col].value / aiM_course[col].value * aiM_markup[col].value;
              var cost_ua_mark = +aiM_cost_ua[col].value * aiM_markup[col].value;
              var cost_ua = +aiM_cost_ua[col].value;
              
              
              
			  var cost_ua_no = Math.round(cost_ua*100)/100;
              cost_ua = Math.round(cost_ua);
              cost_euro = Math.round(cost_euro*100)/100;
              cost_euro_mark = Math.round(cost_euro_mark*100)/100;
              cost_ua_mark = Math.round(cost_ua_mark);

              Main_base.insert({
               "provider": provider,
               "idinput": idinput,
               "group": aiM_group[col].value,
               "subgroup": aiM_subgroup[col].value,
               "name_detail": aiM_name[col].value,
               "desc": aiM_description[col].value,
               "avto": aiM_avto[col].value,
               "marc": aiM_marc[col].value,
               "brand": aiM_brand[col].value,
               "num_brand": aiM_num_brand[col].value,
               "original": aiM_original[col].value,
               "exist": +aiM_exist[col].value,
               "cost_ua": cost_ua_no,
               "course": +aiM_course[col].value,
               "markup": +aiM_markup[col].value,
               "discount": +aiM_discount[col].value,
               "cost_euro": cost_euro,
               "cost_euro_mark": cost_euro_mark,
               "cost_ua_mark": cost_ua_mark,
               "date": newDate
              });


              // добавляем в накладные

              Add_invoice.insert({
              "provider": provider,
              "idinput": idinput,
               "group": aiM_group[col].value,
               "name_detail": aiM_name[col].value,
               "avto": aiM_avto[col].value,
               "marc": aiM_marc[col].value,
               "brand": aiM_brand[col].value,
               "num_brand": aiM_num_brand[col].value,
               "original": aiM_original[col].value,
               "exist": +aiM_exist[col].value,
               "cost_ua": cost_ua_no,
               "randId": randId,
               "course": +aiM_course[col].value,
               "date": newDate
              });
            }
            diff++
          }
                                // обновляем при наличии
                                if(aim_real == 1){

                                var new_num_brand = aiM_num_brand.value;
                                var new_exist = +aiM_exist.value
                                var new_cost_ua = +aiM_cost_ua.value
                                var new_markup = aiM_markup.value;
                                var new_course = aiM_course.value;


                                }else{

                                var new_num_brand = aiM_num_brand[col].value;
                                var new_exist = +aiM_exist[col].value
                                var new_cost_ua = +aiM_cost_ua[col].value
                                var new_markup = aiM_markup[col].value;
                                var new_course = aiM_course[col].value;

                                }

                                  var go = 0;
                                    while (go < mass_length) {

                                    // если в базе находим такой массив то...
                                    if(massive[go] == new_num_brand){

                                    // запрос к базе данных
                                    var all = Main_base.find({"_id": numberIdMain[go]}).fetch();
                                    // Количество

                                    var old_exist = _.pluck(all, 'exist');
                                    // Цена старая

                                    var old_cost_ua = _.pluck(all, 'cost_ua');
                                    var old_cost_ua_mark = _.pluck(all, 'cost_ua_mark');
                                    var old_cost_euro_mark = _.pluck(all, 'cost_euro_mark');
                                    var old_cost_euro = _.pluck(all, 'cost_euro');
                                    //


                                    var cost_ua_mark = new_cost_ua * new_markup;
                                    var cost_ua = new_cost_ua;



                                    cost_euro = Math.round(cost_euro*100)/100;
                                    cost_euro_mark = Math.round(cost_euro_mark*100)/100;
                                    cost_ua = Math.round(cost_ua);
                                    // общее количество
                                    var updateExist = +old_exist + +new_exist;
                                    // средняя цена
                                    var updateCost_ua = (old_exist * old_cost_ua + new_exist * cost_ua) / updateExist;
                                    var updateCost_ua_mark = (old_exist * old_cost_ua_mark + new_exist * cost_ua_mark) / updateExist;
                                    var updateCost_euro = updateCost_ua / new_course;
                                    var updateCost_euro_mark = updateCost_ua_mark / new_course;


                                    // увеличиваем к оличество

                                    Main_base.update({"_id": numberIdMain[go]},
                                    {$inc: {"exist": new_exist}});
                                    // меняем на новое значение
                                    Main_base.update({"_id": numberIdMain[go]},
                                    {$set: {"cost_ua": updateCost_ua}});
                                    // меняем на новое значение
                                    Main_base.update({"_id": numberIdMain[go]},
                                    {$set: {"cost_ua_mark": updateCost_ua_mark}});
                                    // меняем на новое значение
                                    Main_base.update({"_id": numberIdMain[go]},
                                    {$set: {"cost_euro": updateCost_euro}});
                                    // меняем на новое значение
                                    Main_base.update({"_id": numberIdMain[go]},
                                    {$set: {"cost_euro_mark": updateCost_euro_mark}});



                                  }
                                    go++;
                                  }

                              // енд цикл
       col++;
     } //main цикл обновления
     return false;
 } // submit функция
});

Template.addInvoice.events({
 'click .delete_all': function (event){
   Meteor.call('removeAll');
 }
 });
// delete

Template.addInvoice.events({
 'click .delFinal': function (){
   Add_invoice_final.remove(this._id);
 }
});


Template.addInvoice.events({
  'click .group-one': function (event){
  var groupName = event.target.value;
  Session.set('group_name', groupName);
  return false;
  }
});

Template.addInvoice.events({
  'click .subgroup-one': function (event){
  var subgroupName = event.target.value;
  Session.set('subgroup_name', subgroupName);
  return false;
  }
});
