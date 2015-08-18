var Student = function() {
  var self = this;

  self.getOrSetId = function(id) {
    if (!id) {
      id = Student.counter + 1;
      Student.counter ++;
    }
    return id;
  };

  self.init = function(properties) {
    self.name = properties.name;
    self.id = self.getOrSetId(properties.id);
  };

  self.appendToList = function() {
    var li = $("#list_item_template").clone();
    li.removeAttr('id').addClass('student').prepend(self.name).removeClass('hidden');

    $('#students').append(li);
  };
};
