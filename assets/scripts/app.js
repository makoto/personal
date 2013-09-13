$( document ).ready(function() {

	// set section height
	var h = $(window).height();
	nh = $(".navigation").outerHeight();

 	$('section.work').css('min-height',h);
 	$('.home').css('height',h); // show the nav

 	// make h1 sit dead central vertically
 	$('h1.intro').css('margin-top',-nh*0.5)

 	// typer
 	$('.typer').typeTo("Tom Cavill is a product designer in London.");
 	$.typer.options.typeSpeed = 90;

 	// pageslide
 	$('.hamburger').pageslide();
 	$('.beefburger').pageslide({ direction: "left" });

 	// lettering js
 	//$(".intro").lettering();

 	// Scroll events

 	$(document).on("scroll", function () {
 		// How many px from the top am I?
		var t = $(document).scrollTop();

		$("body").toggleClass("affix", t+nh > h);

 	});

 	$("nav a").on("click", function () {

		console.log(this); // 'this' is a reserved/special word

		// save the href of the link we just clicked
		var href = $(this).attr("href");
		var	c = $(this).attr("class");
			console.log("we just clicked", href, "and", c);

		// find the top position
		var t = $(href).offset().top - nh; // remove nav height

		$("body").animate({
			scrollTop: t
		}, 750);

		//prevent default
		return false;

	});

	$("section").waypoint(function (direction) {

		if (direction == "down") {

			// find the id of the particular section we just scrolled on
			var id = "#" + $(this).attr("id");
			var idSplit = id.split('-');
			var proj = $(this).attr("data-project-name");
			console.log("down",id,idSplit[0]);
			console.log("project name is",proj);

		} else {

			// find the id of the PREVIOUS section we just scrolled on
			var id = "#" + $(this).prev().attr("id");
			var idSplit = id.split('-');
			var proj = $(this).prev().attr("data-project-name");
			console.log("up",id,idSplit[0]);
			console.log("previous project name is",proj);

		}

		var nav = $("nav a[href=" + idSplit[0] + "]");

		// add a class to the link
		nav.addClass("active");

		// find the link's neighbours and remove the class from them
		nav.siblings().removeClass("active");

	}, { offset: nh });

 	// tell the scroll event to happen
	// when we load the page, not just on scroll
	$(document).trigger("scroll");
 
});