//javascript

var projectPeriodicTimer

function cycleProject(){
	var element = ".layer3"
	projectPeriodicTimer = setInterval(function(){
			
		if (screen.width >= 768 && screen.width <= 991){
			$(element).removeClass('hover')
			if (element === ".layer1"){
				
				element = ".layer2"
				
			}
			else if (element === ".layer2"){
				
				element = ".layer3"
				
			}
			else{
				
				element = ".layer1"
				
			}
			$(element).addClass('hover')
		}
	}, 1500);
}

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
				else{
					$this.attr('data-content', 'ERROR: Message not sent.')
	    			setTimeout(removeMsg, 3000, $this)
				}
			}
					   
		};

		http.open('POST', url, true);
		http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		http.send(formData);
	   
	});


	///

	
	$(window).scroll(function() {

		// Only Show when element in view of middle of viewport
		// Project 1
		var height = $(window).height();
		var top = $(window).scrollTop();
		var bot = $(window).scrollTop() + height;
		var ele = $('#lemonlaw').offset().top;

		if (ele > top+height/6 && ele < bot-height/2){
			if (screen.width < 768){
				$('.layer1').addClass('hover')
			}
		}
		else{
			$('.layer1').removeClass('hover');
		}

		// Project 2
		var height = $(window).height();
		var top = $(window).scrollTop();
		var bot = $(window).scrollTop() + height;
		var ele = $('#hashtagTracker').offset().top;

		if (ele > top+height/6 && ele < bot-height/2){
			if (screen.width < 768){
				$('.layer2').addClass('hover')
			}
		}
		else{
			$('.layer2').removeClass('hover');
		}

		// Project 3
		var height = $(window).height();
		var top = $(window).scrollTop();
		var bot = $(window).scrollTop() + height;
		var ele = $('#2048').offset().top;

		if (ele > top+height/6 && ele < bot-height/2){
			if (screen.width < 768){
				$('.layer3').addClass('hover')
			}
		}
		else{
			$('.layer3').removeClass('hover');
		}


	});


	//
	
	if (screen.width >= 768 && screen.width <= 991){
		$('.layer1').removeClass('hover')
		$('.layer2').removeClass('hover')
		$('.layer3').removeClass('hover')
		cycleProject()
	}
	else{
		$('.layer1').removeClass('hover')
		$('.layer2').removeClass('hover')
		$('.layer3').removeClass('hover')
		clearInterval(projectPeriodicTimer)
		
	}
	$(window).resize(function(){
		$('.layer1').removeClass('hover')
		$('.layer2').removeClass('hover')
		$('.layer3').removeClass('hover')
		clearInterval(projectPeriodicTimer)
		if (screen.width >= 768 && screen.width <= 991){
			cycleProject()
		}

	})

});

