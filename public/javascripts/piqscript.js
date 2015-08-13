// On Document ready
$(document).ready(function() {
	var j = 0;

	setInterval(function() {
		// AJAX accessing Piqs
		$.ajax({
			url: "/ajax",
			method: "GET",
			dataType: "json",
			timeout: 5000,
			success: function(data, textStatus, jqXHR) {
				var piqs = data;
			
				// Clears the container
				$(".piqContainer").html('');

				// Reset for J variable
				if (j == piqs.length) {
					j = 0;
				}

				// Iterating loop for the returned piqs data array
				for (i=j; i<piqs.length; i++) {
					// Creates an html element for each piq
					$(".piqContainer").append("<a class='plink' href='/piq/" + piqs[i]._id + "'><div class='piq' style='background-color: " + piqs[i].color + "'></div></a>");

					// This console.log is client-side:
					// console.log("Success! Here's the data! PiqID: " + piqs[i]._id + ", Color: " + piqs[i].color);
				}

			},
			error: function() {
				console.log('Error!');
			},
			complete: function() {
				j += 1;
				// console.log('FIN');
			}

		});

	}, 3000);

});
