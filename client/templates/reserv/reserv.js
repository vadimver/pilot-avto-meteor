Template.reserv.helpers({
  basket: function(){
    return Reserv.find();
   }

});

// удалить main_base
Template.reserv.events({
 'click .del': function (){
    var idmain = this._id;

    var res = Reserv.find({'_id': idmain}).fetch();
    var oneRes = _.pluck(res, 'col');

    Main_base.update({_id: idmain},        //update данных
    {$inc: {'exist': +oneRes}});


    Reserv.remove(this._id);

 }
});
