var Megatask = {
  author: "Davey",
  hisDeal: "Who the heck knows?",
  newStudentForm: $('#new_student_form'),  //will return jquery obj  # = css for ID, . = css for class.
  submitHandler: function(ev) {
    alert('What!?');
  },
  start: function() {
    this.newStudentForm.submit(this.submitHandler);
  }
};

Megatask.start();
