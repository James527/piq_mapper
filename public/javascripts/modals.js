// On Document ready
$(document).ready(function() {

  //Finds the active modal and hides it
  function hideActive() {
    $(".active").addClass("hidden");
    $(".active").removeClass("active");
  };

  function checkModalWrap() {
    return $(".modalWrap").hasClass("hidden");
  }

  //Show modalWrap
  function showModalWrap() {
    if (checkModalWrap()) {
      $(".modalWrap").removeClass("hidden");
    }
  };

  //Hide modalWrap
  function hideModalWrap() {
    if (!checkModalWrap()) {
      // alert('does not have Hidden Class');
      $(".modalWrap").addClass("hidden");
    }
    else if (checkModalWrap()) {
      // alert('has Hidden Class');
    }
  };

  //Event listener for AboutLink
  $("#aboutLink").on('click', function() {
    hideActive();
    showModalWrap();

    //Show the about modal
    $("#aboutModal").addClass("active");
  });

  //Event listener for loginLink
  $("#loginLink").on('click', function() {
    hideActive();
    showModalWrap();

    //Show the login modal
    $("#loginModal").addClass("active");
  });

  //Event listener for registerLink
  $("#registerLink").on('click', function() {
    hideActive();
    showModalWrap();

    //Show the register modal
    $("#registerModal").removeClass("hidden");
    $("#registerModal").addClass("active");
  });

  //Event listener for addPiqLink
  $("#add_piqLink").on('click', function() {
    hideActive();
    showModalWrap();

    //Show the add piq modal
    $("#addPiqModal").removeClass("hidden");
    $("#addPiqModal").addClass("active");
  });

  //Event listener for resetLink
  $("#resetLink").on('click', function() {
    hideActive();
    showModalWrap();

    //Show the reset modal
    $("#resetModal").removeClass("hidden");
    $("#resetModal").addClass("active");
  });

  //Event listener for updateLink
  $("#updateLink").on('click', function() {
    hideActive();
    showModalWrap();

    //Show the update modal
    $("#updateModal").removeClass("hidden");
    $("#updateModal").addClass("active");
  });


  //TEMPORARY HIDE MODALS TESTER:
  //Event listener for logoutLink
  $("#logoutLink").on('click', function() {
    hideActive();
    hideModalWrap();
  });

});