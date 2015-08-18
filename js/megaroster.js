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
    //Grab TEMPLATE LI from page.
    var li = $("#list_item_template").clone();
    li.removeAttr('id').addClass('student').prepend(student_name).removeClass('hidden');

    $('#students').append(li);
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

    $(document).on('click', 'button.delete',function(ev) {
      //remove student from array
      // console.log($(this).closest('li').val());
      // self.students.splice(self.students.indexOf($.inArray($(this).closest('li').val()), self.students),1);
      // console.log($.map(self.students));

      //remove student from list
      $(this).closest('li').remove();
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
