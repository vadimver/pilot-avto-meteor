Template.add.events({
 'submit .add_groups': function (event){

   var add_groups = event.target.group.value;

       Groups.insert({
          "group": add_groups
        });
      }
});

Template.add.events({
 'submit .add_subgroups': function (event){

   var edit_group = event.target.editgroup.value;
   var add_subgroups = event.target.subgroup.value;
       Subgroups.insert({
          "group": edit_group,
          "subgroup": add_subgroups
        });
      }
});


Template.add.events({
 'click .delgroups': function (){
   Groups.remove(this._id);
 }
});

Template.add.events({
 'click .delsubgroups': function (){
   Subgroups.remove(this._id);
 }
});
