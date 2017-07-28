//javascript

/*
function removeMsg(element){
	setTimeout(function(){
		element.attr('data-content', '')
	}, 3000)
	
}
*/

function removeMsg(element){

		element.attr('data-content', '')

	
}

// Jquery
$(document).ready(function(){
	// Active 
	$(window).scroll(function(){
		if ($(window).scrollTop() > 60){
			$('#jumbotron-navbar').addClass('navbar-fixed');
		}
		if ($(window).scrollTop() < 61){
			$('#jumbotron-navbar').removeClass('navbar-fixed');
		}
	});

	///
	// ScrollPy smooth scroll
	$("#content-navbar a, #jumbotron-btns a").on("click", function(event) {
	  // Make sure this.hash has a value before overriding default behavior
	  if (this.hash !== "") {
	  	
	    // Prevent default anchor click behavior
	    event.preventDefault();

	    // Store hash
	    var hash = this.hash;

	    // Using jQuery's animate() method to add smooth page scroll
	    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
	    $('html, body').animate({
	      scrollTop: $(hash).offset().top
	    }, 800, function(){

	    // Add hash (#) to URL when done scrolling (default click behavior)
	      window.location.hash = hash;
	    });

	  } // End if

	});

	// Tooltip
	$('[data-toggle="tooltip"]').tooltip(); 

	$("input:radio[name=optradio]").click(function() {
        var id= $(this).attr('id');
        if (id === 'eng-radio'){
        	// 	check if page was chinese
        	//	change to English
        }
        else{
        	// check if page was english
        	// change to chinesee
        }
    });



    $("form").submit(function(e) {
	    e.preventDefault(); // Prevents the page from refreshing
	    var $this = $(this); // `this` refers to the current form element
	    // Get URL
	    url = $this.attr('action');
	    // Serializes form data
	    formData  = $this.serialize();
	    // create another function to post using xmlhttp

		var http = new XMLHttpRequest();
		http.onreadystatechange = function(){
			if (this.readyState == 4){
				if (this.status == 200){
					// Get submit button
	    			$this.attr('data-content', 'Message Sent')
	    			setTimeout(removeMsg, 3000, $this)
	    			//removeMsg($this);
				}
			}
					   
		};
		http.open('POST', url, true);
		http.send(formData);
	   
	});


	//

	if (screen.width < 768){
		$('#user-description').html('Automation Developer<br>X<br>Programmer')
	}


	///

	
	$(window).scroll(function() {
		var hT = $('#lemonlaw').offset().top,
			hH = $('#lemonlaw').outerHeight(),
			wH = $(window).height(),
			wS = $(this).scrollTop();

		console.log(hT)
		console.log(hH)
		console.log(wH)
		console.log(wS)

		if (wS - (hT+hH-wH) > 50){
				if (screen.width < 768){
					$('.layer1').addClass('hover');
				}
		   
		}
		else{
				$('.layer1').removeClass('hover');
		}

		var hT = $('#hashtagTracker').offset().top,
			hH = $('#hashtagTracker').outerHeight(),
			wH = $(window).height(),
			wS = $(this).scrollTop();

		if (wS > (hT+hH-wH)){
				if (screen.width < 768){
					$('.layer2').addClass('hover');
				}
		   
		}
		else{
				$('.layer2').removeClass('hover');
		}


		var hT = $('#2048').offset().top,
			hH = $('#2048').outerHeight(),
			wH = $(window).height(),
			wS = $(this).scrollTop();

		if (wS > (hT+hH-wH)){
				if (screen.width < 768){
					$('.layer3').addClass('hover');
				}
		   
		}
		else{
				$('.layer3').removeClass('hover');
		}



	});
	

});

