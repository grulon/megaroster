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
      var student_data_objects = JSON.parse(localStorage.students);
      $.each(student_data_objects, function(index, student_data) {
        var student = new Student();
        student.init(student_data);
        student.appendToList();
        self.students.push(student);    //needed to convert the json to student objects before saving to array.
      } );
    }
    catch(err) {
      return false;
    }
  };

  // this.appendToList = function(student_name) {
  //   //Grab TEMPLATE LI from page.
  //   var li = $("#list_item_template").clone();
  //   li.removeAttr('id').addClass('student').prepend(student_name).removeClass('hidden');
  //   $('#students').append(li);
  // };

  this.addStudent = function(student_name) {
    var student = new Student();
    student.init({
      name: student_name
    });
    self.students.push(student);
    student.appendToList();

    self.save();
  };

  this.createEditForm = function(ev) {
    //console.log('It worked');
    var li, edit_form;
    li = $(this).closest('li');
    label = li.find('label');

    edit_form = $("#edit_form_template")
      .clone()
      .removeAttr('id')
      .removeClass('hidden');

    label.addClass('hidden');
    li.find('.btn-group').addClass('hidden');

    li.append(edit_form);


  };

  this.init = function() {
    self.students = [];
    Student.counter = 0;
    self.load();

    $(document).on('click', 'button.edit', self.createEditForm);

    //delete student
    $(document).on('click', 'button.delete',function(ev) {
      var li = $(this).closest('li');
      var id = li.attr('data-id');

      $.each(self.students, function(index, current_student) {
      if (current_student.id.toString() === id.toString()) {
        self.students.splice(index, 1);
        return false;
        }
      });

      //remove student from list
      li.remove();
      //Update localStorage
      self.save();

    });


    $('#new_student_form').on('submit', function(ev){       //'submit' is which event you are listening for... could be click or keypress.
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
