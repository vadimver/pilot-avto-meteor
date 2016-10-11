

Template.editMain.events({
"submit .editMain": function (event){


   var id = event.target.id.value;
   var group = event.target.group;
   var subgroup = event.target.subgroup;
   var name_detail = event.target.name_detail;
   var desc = event.target.desc;
   var avto = event.target.avto;
   var marc = event.target.marc;
   var brand = event.target.brand;
   var num_brand = event.target.num_brand;
   var original = event.target.original;
   var exist = event.target.exist;

  Main_base.update({_id: id},
  {$set: {
   "group": group.value,
   "subgroup": subgroup.value,
   "name_detail": name_detail.value,
   "desc": desc.value,
   "avto": avto.value,
   "marc": marc.value,
   "brand": brand.value,
   "num_brand": num_brand.value,
   "original": original.value,
   "exist": +exist.value
   }});

}
});


Template.editMain.helpers({
  groups: function(){
    return Groups.find();
  }
});



Template.editMain.helpers({
  subgroups: function(){
    return Subgroups.find();
  }
});
// блок сортировки

Template.editMain.events({
 'click .groupBtn': function (event){

   var btnValue = event.target.value;
   Session.set("setGroup", btnValue);
   Session.set("sortsubGroup", undefined);

   return false;
 }
});

Template.editMain.events({
 'click .subgroupBtn': function (event){

   var btnValue = event.target.value;
   Session.set("sortsubGroup", btnValue);
   Session.set("setGroup", undefined);
   return false;
 }
});

Template.editMain.helpers({
  main_base: function(){
    var setGroup = Session.get("setGroup");
    var sortsubGroup = Session.get("sortsubGroup");

    if(sortsubGroup != undefined){

      return Main_base.find({"subgroup": sortsubGroup});

    }

    if(setGroup != undefined){
      return Main_base.find({"group": setGroup});
    }

    if(sortsubGroup == undefined && setGroup == undefined){

      return Main_base.find();
    }


   }

});
