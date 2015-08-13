// On Document ready
$(document).ready(function() {
	
	// Event listener for AJAX GET PIQS link
	$("#").on('click', function(event) {
		event.preventDefault();

		// AJAX accessing Piqs
		$.ajax({
			url: "/ajax",
			method: "GET",
			dataType: "json",
			timeout: 5000,
			success: function(data, textStatus, jqXHR) {

			},
			error: function() {
				console.log('Error!');
			},
			complete: function() {
				// console.log('FIN');
			}

		});

	});

});
