var Megaroster = function() {
  var self = this;

  this.save = function() {
    try {
      return (localStorage.students = JSON.stringify(self.students));
    }
    catch (err) {
      return false;
    }
  };

  this.load = function() {
    try{
      self.students = JSON.parse(localStorage.students);
      $.each(self.students, function(index, student_name) {
          self.appendToList(student_name);
      } );
    }
    catch(err) {
      return false;
    }
  };

  this.appendToList = function(student_name) {
    $('#students').append('<li class="list-group-item">' + student_name + '</li>');
  };

  this.addStudent = function(student_name) {
      if(student_name.trim() !== "") {
        self.students.push(student_name);
        //add student to list
        self.appendToList(student_name);
        console.log(self.save());
      }
  };

  this.init = function() {
    self.students = [];
    self.load();

    $('#new_student_form').on('submit', function(ev){
      ev.preventDefault();
      var student_name = $(this.student_name).val();

      self.addStudent(student_name);
      //clear field
      $(this.student_name).val('').focus();

    });
  };
};


var roster = new Megaroster();
roster.init();
