// On Document ready
$(document).ready(function() {
	// alert('Doc Ready');
	// Event listener for AJAX button
	$("#ajaxButton").on('click', function() {
		// alert('JQUERY HOORAY!');

		// Clear the container
		$(".container").html('');

		// AJAX accessing Piqs
		$.ajax({
			url: "localhost:3000/",
			method: "GET",
			dataType: "json",
			success: function(data, textStatus, jqXHR) {
				var piqs = data.data;
				console.log(piqs);
				// Iterating loop listing the returned queries
				for (i=0; i<piqs.length; i++) {
					$(".container").append("<a class='plink' href='/piq/" + piqs[i]._id "'><div class='piq' style='background-color:" + piqs[i].color + "'></div></a>");
				}

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
