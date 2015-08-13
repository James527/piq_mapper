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
  $("#aboutLink").on('click', function(event) {
    event.preventDefault();
    hideActive();
    showModalWrap();

    //Show the about modal
    $("#aboutModal").addClass("active");
  });

  //Event listener for ProfileLink
  $("#profileLink").on('click', function(event) {
    event.preventDefault();
    hideActive();
    showModalWrap();

    // AJAX accessing profile
    $.ajax({
      url: "/ajax/profile",
      method: "GET",
      dataType: "json",
      timeout: 5000,
      success: function(data, textStatus, jqXHR) {
        var ajaxData = data;

        console.log(ajaxData);

        // Clears the profile
        $("#username").html('');
        // $("#user").html('');
        $("#email").html('');

        // Fills the profile with the user data
        $("#username").append(ajaxData.user.username);
        // $("#user").html("Don't ever use 'name' for a database column!");
        $("#email").html(ajaxData.user.email);

        // Iterating loop for the returned piqs data array
        for (i=0; i<ajaxData.piqs.length; i++) {
          // Creates an html element for each piq
          $("#myPiqsWrapper").append("<a class='plink' href='/piq/" + ajaxData.piqs[i]._id + "'><div class='piq' style='background-color: " + ajaxData.piqs[i].color + "'></div></a>");
        }
      },
      error: function() {
        console.log('Error!');
      },
      complete: function() {
        // console.log('FIN');
      }
    });

    //Show the profile modal
    $("#profileModal").addClass("active");
  });


  //Event listener for loginLink
  $("#loginLink").on('click', function(event) {
    event.preventDefault();
    hideActive();
    showModalWrap();

    //Show the login modal
    $("#loginModal").addClass("active");
  });

  //Event listener for registerLink
  $("#registerLink").on('click', function(event) {
    event.preventDefault();
    hideActive();
    showModalWrap();

    //Show the register modal
    $("#registerModal").removeClass("hidden");
    $("#registerModal").addClass("active");
  });

  //Event listener for addPiqLink
  $("#add_piqLink").on('click', function(event) {
    event.preventDefault();
    hideActive();
    showModalWrap();

    //Show the add piq modal
    $("#addPiqModal").removeClass("hidden");
    $("#addPiqModal").addClass("active");
  });

  //Event listener for resetLink
  $("#resetLink").on('click', function(event) {
    event.preventDefault();
    hideActive();
    showModalWrap();

    //Show the reset modal
    $("#resetModal").removeClass("hidden");
    $("#resetModal").addClass("active");
  });

  //Event listener for updateLink
  $("#updateLink").on('click', function(event) {
    event.preventDefault();
    hideActive();
    showModalWrap();

    //Show the update modal
    $("#updateModal").removeClass("hidden");
    $("#updateModal").addClass("active");
  });

  //TEMPORARY HIDE MODALS TESTER:
  //Event listener for logoutLink
  $("#logoutLink").on('click', function(event) {
    event.preventDefault();
    hideActive();
    hideModalWrap();
  });

});