// On Document ready
$(document).ready(function() {
	// alert('Doc Ready');
	
	// Event listener for AJAX button
	$("#ajaxLink").on('click', function(event) {
		event.preventDefault();
		// alert('JQUERY HOORAY!');

		// Clear the container
		// $(".container").html('');

		// AJAX accessing Piqs
		$.ajax({
			url: "/ajax",
			// url: "http://localhost/3000/ajax",
			method: "GET",
			dataType: "json",
			timeout: 5000,
			success: function(data, textStatus, jqXHR) {
				var piqs = data;
				// alert("Success! Here's the data! PiqID: " + piqs._id + ", Color: " + piqs.color);
				// $(".container").html('');
				$(".container").append("<a class='plink' href='.'><div class='piq' style='background-color:" + piqs.color + "'></div></a>");

				// $(".container").append("<a class='plink' href="."><div class='piq' style='background-color:" + piqs.color + "'></div></a>");


				// Iterating loop listing the returned queries
				// for (i=0; i<piqs.length; i++) {
					// alert(piqs[i]);
					// $(".container").append("<a class='plink' href='/piq/" + piqs[i]._id "'><div class='piq' style='background-color:" + piqs[i].color + "'></div></a>");
				// }

				// Event listener for piqAttach
				// $("#gifAttach").click(function() {
				// 	var saveGif = $(this).prev();
				// 	$("body").append("<img src='" + saveGif[0].src + "'>");
				// });

			},
			error: function() {
				alert('Error!');
			},
			complete: function() {
				// alert('FIN');
			}

		});

	});

});
