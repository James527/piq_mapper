// On Document ready
$(document).ready(function() {
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
			// Iterating loop for the returned piqs data array
			for (i=0; i<315; i++) {
				// Creates an html element for each piq
				$(".piqContainer").append("<a class='plink' href='/piq/" + piqs[i]._id + "'><div class='piq' style='background-color: " + piqs[i].color + "'></div></a>");
			}
		},
		error: function() {
			console.log('Error!');
		},
		complete: function() {
			// console.log('FIN');
		}
	});

	// Sets an AJAX Piq Refresh every 3 seconds
	var j = 1;
	setInterval(function() {
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
				for (i=j; i<315+j; i++) {
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
			}
		});
	}, 3000);
});
