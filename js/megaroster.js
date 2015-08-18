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

  this.init = function() {
    self.students = [];
    Student.counter = 0;
    self.load();

    $(document).on('click', 'button.delete',function(ev) {
      var li = $(this).closest('li');

      //remove student from array
      var id = li.attr('data-id');
      // have id now must delete from array.

      //things I tried over lunch... if they worked (not all did) they deleted last array item, NOT selected item... -G
      //following line splices last entity in array no matter which "button" is clicked
      //console.log(li.text());
      //console.log(id);
      //console.log($.inArray(id,self.students));  returns -1 as in it didn't find id in array
      //console.log(self.students.splice($.inArray( li.text(), self.students), 1)); //id is not the same as index
      //self.students.splice(self.students.indexOf(id), 1);
      // console.log($.grep(self.students, function(e){ return e.id == id; }));
      // self.students.splice($.inArray($.grep(self.students, function(e){ return e.id == id; }),self.students),1);
      // self.students.splice(self.students.indexOf(current_student), 1);

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
