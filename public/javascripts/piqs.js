// On Document ready
$(document).ready(function() {
	
	// Event listener for AJAX button
	$("#ajaxLink").on('click', function(event) {
		event.preventDefault();

		// AJAX accessing Piqs
		$.ajax({
			url: "/ajax",
			method: "GET",
			dataType: "json",
			timeout: 5000,
			success: function(data, textStatus, jqXHR) {
				var piqs = data;
			
				// Clears the container
				$(".container").html('');

				// Iterating loop for the returned piqs data array
				for (i=0; i<piqs.length; i++) {
					// This console.log is client-side:
					// console.log("Success! Here's the data! PiqID: " + piqs[i]._id + ", Color: " + piqs[i].color);

					// Creates an html element for each piq
					$(".container").append("<a class='plink' href='.'><div class='piq' style='background-color: " + piqs[i].color + "'></div></a>");
				}

				// Event listener for piqAttach
				// $("#gifAttach").click(function() {
				// 	var saveGif = $(this).prev();
				// 	$("body").append("<img src='" + saveGif[0].src + "'>");
				// });

			},
			error: function() {
				console.log('Error!');
			},
			complete: function() {
				console.log('FIN');
			}

		});

	});

});
