$(function() {
 $("img.lazy").lazyload({
    effect : "fadeIn",
	threshold : 200
 });
});

	// set section height
	var h = $(window).height(),
	 	nh = $(".navigation").outerHeight();

 	//$('article.work').css('height',h);
 	$('.home').css('height',h); // show the nav
 	$('#about').css('min-height',h-nh); // show the nav
 	$('#footer').css('min-height',h*0.5);

 	// make h1 sit dead central vertically
 	$('h1.intro').css('margin-top',-nh*0.5)

 	// typer
 	$(document).ready(function() {
	 	$('.typer').typeTo("Hi. I'm Tom, a product designer in London.");
 		$.typer.options.typeSpeed = 80;
 	});

 	// pageslide
 	$('.hamburger-action').pageslide({
 		modal: 'true'
 	});
 	
 	$(".hamburger-action").click(function(){
		$("nav").addClass("toilet"); 		
 	});
 	// todo: change class name

 	$(".hamburger-close").click(function() {
 		$.pageslide.close();
 		$("nav").removeClass("toilet");

 		return false;
 	});

 	$(".tomcavill-logo").click(function() {
 		$(this).addClass("hinge");
 	});


 	// Scroll events

 	$(document).on("scroll", function (e) {

 		// How many px from the top am I?
		var t = $(document).scrollTop();

		$("body").toggleClass("affix", t+nh > h);

 	});

 	$("nav a").on("click", function () {

		//console.log(this); // 'this' is a reserved/special word

		$(this).addClass("active");
		$(this).siblings().removeClass("active");

		// save the href of the link we just clicked
		var href = $(this).attr("href");
		var	c = $(this).attr("class");
			//console.log("we just clicked", href, "and", c);

		// find the top position
		var t = $(href).offset().top; // remove nav height

		$("body").animate({
			scrollTop: t
		}, 750);

		//prevent default
		return false;

	});

	$(".top").on("click", function () {
		$("body").animate({
			scrollTop: "0"
		}, 1000);

		return false;
	});

	$("article").waypoint(function (direction) {

		if (direction == "down") {

			// find the id of the particular section we just scrolled on
			var id = "#" + $(this).attr("id");
			// var idSplit = id.split('-');
			// var proj = $(this).attr("data-project-name");
			// console.log("down",id,idSplit[0]);
			// console.log("project name is",proj);
			// console.log("from top",this.scrollTop);

		} else {

			// find the id of the PREVIOUS section we just scrolled on
			var id = "#" + $(this).prev().attr("id");
			// var idSplit = id.split('-');
			// var proj = $(this).prev().attr("data-project-name");
			// console.log("up",id,idSplit[0]);
			// console.log("project name is",proj);

		}

		var nav = $("nav a[href=" + id + "]");

		// add a class to the link
		nav.addClass("active");

		// find the link's neighbours and remove the class from them
		nav.siblings().removeClass("active");

	}, { offset: nh*0.5 });

 	// tell the scroll event to happen
	// when we load the page, not just on scroll
	$(document).trigger("scroll");

	$( document ).ready(function() {

	var foursq = "http://pipes.yahoo.com/pipes/pipe.run?_id=4a8f402af848a1c7848f7d207747730d&_render=json";

	$.getJSON(foursq, function(data){
	    $.each(data, function (index, value) {
	        var location = data.value.items[0]['georss:point'];
	        var name = data.value.items[0].title;
	        var maplocation = location.split(' ');
	        console.log(maplocation,name);

			var map = "http://a.tiles.mapbox.com/v3/cavill.map-whbp68a2/"+maplocation[1]+","+maplocation[0]+",18/1000x1000.png"
			console.log(map);
			$("article.home").css("background-image","url("+map+")");
			$(".location-where").replaceWith(name);
			// todo: buy mapbox
	    });
	});

});