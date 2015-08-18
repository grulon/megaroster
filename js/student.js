var Student = function() {
  var self = this;

  self.getOrSetId = function(id) {
    if (!id) {
      id = Student.counter + 1;
    }
    self.incrementCounter(id);
    return id;
  };



  self.incrementCounter = function(id) {
      if(id > Student.counter) {
        Student.counter = id;
      }
      // Student.counter ++;
  };


  self.init = function(properties) {
    self.name = properties.name;
    self.id = self.getOrSetId(properties.id);
  };

  self.appendToList = function() {
    var li = $("#list_item_template").clone();
    li.removeAttr('id')
      .attr('data-id', self.id)
      .addClass('student')
      .prepend(self.name)
      .removeClass('hidden');

    $('#students').append(li);
  };
};

Student.getStudentById = function(id) {
  var student;
  $.each(roster.students, function(index, current_student) {
    if(current_student.id.toString() === id.toString()) {
      student = current_student;
      return false;
    }
  });
    return student;

};
