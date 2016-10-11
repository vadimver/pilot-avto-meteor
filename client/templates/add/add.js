Template.add.helpers({
  groups: function(){
    return Groups.find();
  }
});

Template.add.helpers({
  subgroups: function(){
    return Subgroups.find();
  }
});
