var Megaroster = function() {

  this.init = function() {
    var self = this;
    this.students = [];
    // console.log(this);

    $('#new_student_form').on('submit', function(ev){
      // console.log("Students: " + self.students.length);
      ev.preventDefault();
      var student_name = $(this.student_name).val();

      //if student is typed in, push student to array
      if(student_name.trim() !== "") {
        self.students.push(student_name);
        console.log("Students: " + self.students.length);
        // console.log(this);

        //add student to list
        $('#students').append('<li class="list-group-item">' + student_name + '</li>');

        //clear field
        $(this.student_name).val('');
      }
    });
  };
};


var roster = new Megaroster();
roster.init();
