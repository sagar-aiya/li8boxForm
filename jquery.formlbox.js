(function($) {
  $.fn.jqueryFormlbox = function(options) {
		var defaults = {
			formid: "none",
			position: "auto",
			h_off: 250,
			clearance: 200
		};
		//console.log("Into the plugin.. ");
		settings = $.extend({}, defaults, options);

		/*these values can be included in the settings at a later stage*/
		var h_off = settings.h_off;
		var v_off = 5;

		var id = settings.formid; /*for convenience*/

		/*Hide the form if it isn't already hidden*/
		var $form = $("#" + id);
		$form.hide();

		/*Create and append the html markup for the overlay to the body*/

		var overlay_html = '<div id = "' + id + '_overlay" class = "lbox_overlay"></div>';
		$('body').append(overlay_html);
		var lbox_html = "<div id = '" + id + "_lbox' class = 'lbox'></div>";

		/*Create variables for the overlay and the form*/
		var $overlay = $("#" + id + "_overlay");


		/*Add the lbox_form class to the form*/
		$form.addClass("lbox_form");


		/*Append the form and the arrow to the lbox, lbox  to overlay*/
		$overlay.append(lbox_html);
		$lbox = $("#" + id + "_lbox");

		$lbox.append($form);
		
		$(this).click(function(evt) {
			/*Prevents autoscrolling to top of the page*/
			evt.preventDefault();
			//console.log("Clicked on the bait");
			/*Create the arrow*/
			var arrow_html = "<div class = 'lbox_arrow' id = '" + id + "_lbox_arrow'></div>";
			$lbox.append(arrow_html);
			$arrow = $("#" + id + "_lbox_arrow");


			/*Decide where the form should be  positioned*/
			var lpos = ($(this).offset().left + $(this).width() + h_off);
			var tpos = ($(this).offset().top - v_off - $(document).scrollTop());

			//console.log($(document).scrollTop());
			//console.log($form.height());

			var atbottom = false;
			if(($(window).height() - $(this).offset().top - $(this).height() + $(document).scrollTop()) < settings.clearance) {
				//console.log('too close to the bottom');
				//tpos = $(this).offset().top + $(this).height() - $form.height() + v_off - $(document).scrollTop();
				atbottom = true;

			} else {
				$arrow.css("top", (tpos + 5).toString() + "px");
			}

			//console.log(tpos);
			//console.log(lpos);

			$arrow.css("left", (lpos - 20).toString() + "px");
			$arrow.hide();

			/*Change the position of the form*/
			$form.css("top", tpos.toString() + "px");
			$form.css("left", lpos.toString() + "px");
			
			$overlay.show();

			if(atbottom)
			{
				$form.css("visibility","hidden");
				$form.show();
				var form_height = $form.height();
				tpos = tpos - form_height+2*v_off;
				$form.css("top",tpos.toString()+"px");
				$form.css("visibility","visible");
				$arrow.css("top", (tpos + $form.height() - 5).toString() + "px");
			}
			
			/*Show the elements*/
			
			$arrow.fadeIn(100);
			
			$form.show("slide", {
				direction: "left"
			}, 500);
			
		});

		$form.submit(function(evt) {
			evt.preventDefault();
			$overlay.fadeOut('slow');
			$form.hide("slide", {
				direction: "left"
			}, 200);
			$arrow.fadeOut(200);
			$arrow.remove();
		});
	};
})(jQuery);
