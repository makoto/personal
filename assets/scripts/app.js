$( document ).ready(function() {

	// set section height
	var h = $(window).height(),
	 	nh = $(".navigation").outerHeight();

 	$('section.work').css('height',h);
 	$('.home').css('height',h); // show the nav

 	// make h1 sit dead central vertically
 	$('h1.intro').css('margin-top',-nh*0.5)

 	// typer
 	$('.typer').typeTo("I'm a product designer in London.");
 	$.typer.options.typeSpeed = 80;

 	// pageslide
 	$('.hamburger').pageslide();
 	$('.beefburger').pageslide({ direction: "left" });

 	// Scroll events

 	$(document).on("scroll", function (e) {

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
			console.log("project name is",proj);

		}

		var nav = $("nav a[href=" + idSplit[0] + "]");

		// add a class to the link
		nav.addClass("active");

		// find the link's neighbours and remove the class from them
		nav.siblings().removeClass("active");


	}, { offset: nh });

	$(".portfolio section").waypoint(function (direction) {
		var currSection = this;
		var currSectionId = "section" + "#" + $(currSection).attr("id");
		var sectionSibs = $(currSection).siblings();
		//currSection.css("overflow","scroll");
		//currSection.siblings().css("overflow","hidden");
		console.log("current section is",currSectionId);
		$(currSectionId).css("overflow","scroll");
		$(sectionSibs).css("overflow","hidden");
		var desc = $(currSectionId).find(".project-description");
		var descAlt = $(sectionSibs).find(".project-description");
		console.log(desc);
		$(desc).css('position','fixed');
		$(descAlt).css('position','static');

		var descH = $(desc).outerHeight();
		console.log("desc height",descH);
		var images = $(currSectionId).find(".portfolio-image");
		$(images).css("margin-top",descH + nh);
	});

	// trying to get the desc to fade out when images scroll over
	// $(".project-description").waypoint(function (direction) {
	// 	var tom = $(this).scrollTop();
	// 	console.log("context",direction,this,tom);
	// }, { context: '.portfolio section' });

 	// tell the scroll event to happen
	// when we load the page, not just on scroll
	$(document).trigger("scroll");
 
});