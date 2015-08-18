var Student = function() {
  var self = this;

  self.init = function(name) {
    self.name = name;
  };
  self.appendToList = function() {
    var li = $("#list_item_template").clone();
    li.removeAttr('id').addClass('student').prepend(self.name).removeClass('hidden');

    $('#students').append(li);
  };
};
