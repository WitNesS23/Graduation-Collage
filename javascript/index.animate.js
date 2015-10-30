+function(){
	// logo-recom animate
	var x,y;
	$(".logo-recom>div").on('mouseover', function(event) {
		event.preventDefault();
		x = event.clientX;
		y = event.clientY;
	});

	$(".logo-recom>div").on('mousemove', function(event) {
		event.preventDefault();
		var _x = event.clientX - x;
		var _y = event.clientY - y;
		var absX = Math.abs(_x);
		var absY = Math.abs(_y);
		if(!$(this).children("div").is(":animated") && $(this).children("div").css("display") != "block" && ( absX != 0 || absY != 0))
		{
			if(_x > 0 && absX > absY){
				// left to right
				$(this).children("div").css({
						"display": "block",
						"left": - $(this).width()
					}).animate({
						left: 0
					}, 200, function() {
					/* stuff to do after animation is complete */
				});
			}else if(_x <= 0 && absX > absY){
				// right to left
				$(this).children("div").css({
						"display": "block",
						"left": $(this).width()
					}).animate({
						left: 0
					}, 200, function() {
					/* stuff to do after animation is complete */
				});
			}else if(_y < 0 && absY >= absX){
				// bottom to top
				$(this).children("div").css({
						"display": "block",
						"top": $(this).width()
					}).animate({
						top: 0
					}, 200, function() {
					/* stuff to do after animation is complete */
				});
			}else{
				// top to bottom
				$(this).children("div").css({
						"display": "block",
						"top": - $(this).width()
					}).animate({
						top: 0
					}, 200, function() {
					/* stuff to do after animation is complete */
				});
			}
		}
		x = event.clientX;
		y = event.clientY;
	});

	$(".logo-recom>div").on("mouseleave", function(event){
		event.preventDefault();
		var _x = event.clientX - x;
		var _y = event.clientY - y;
		var absX = Math.abs(_x);
		var absY = Math.abs(_y);
		if($(this).children("div").css("display") == "block")
		{
			if(_x > 0 && absX > absY){
				// left to right
				$(this).children("div").animate({
						left: $(this).width()
					}, 100, function() {
					$(this).css({
						"display": "none",
						"top": 0,
						"left": 0
					});
				});
			}else if(_x <= 0 && absX > absY){
				// right to left
				$(this).children("div").animate({
						left: -$(this).width()
					}, 100, function() {
					$(this).css({
						"display": "none",
						"top": 0,
						"left": 0
					});
				});
			}else if(_y < 0 && absY >= absX){
				// bottom to top
				$(this).children("div").animate({
						top: -$(this).width()
					}, 100, function() {
					$(this).css({
						"display": "none",
						"top": 0,
						"left": 0
					});
				});
			}else{
				// top to bottom
				$(this).children("div").animate({
						top: $(this).width()
					}, 100, function() {
					$(this).css({
						"display": "none",
						"top": 0,
						"left": 0
					});
				});
			}
		}
	});
	
	// side-bar job classify animate
	$(".job-box").on("mouseover", function(event){
		$(this).css("z-index", "2");
		$(this).next(".job-detail").css("display", "block");
	}).on("mouseleave", function(event){
		$(this).css("z-index", "0");
		$(this).next(".job-detail").css("display", "none");
	});

	$(".job-detail").on("mouseover", function(event){
		$(this).css("display", "block");
		$(this).prev().css("z-index", "2").addClass("hover");
	}).on("mouseleave", function(event){
		$(this).prev().css("z-index", "0").removeClass("hover");
		$(this).css("display", "none");
	})

	// search input animate
	$("#main-wrap input").on("focus", function(event){
		// UI设计师 预设关键词
		if($(this).val() == "UI设计师"){
			$(this).val("").css("color", "#555");
		}else{

		}
	}).on("blur", function(event){
		if($(this).val() == "UI设计师" || $(this).val().trim() == ""){
			$(this).val("UI设计师").css("color", "#999");
		}
	});

	// carousel-recom animate
	// auto function
	var itemOuterHeight		= $(".carousel-recom .high-light").outerHeight(),
		itemMarginTop		= parseInt($(".carousel-recom .job-item:nth-child(2)").css("margin-top").match(/\d/)[0]),
		itemBigOuterHeight	= $(".carousel-recom>div:first-child").outerHeight()
	// function autoCarousel(){
	// 	return setInterval(function(){
	// 		var index = $(".carousel-recom .present").index();
	// 		var animateTopRight = 0, animateTopLeft = 0;
	// 		if(index == 2){
	// 			animateTopRight = 0;
	// 			animateTopLeft	= 0;

	// 			var _selector = ".carousel-recom>div:last-child>div:nth-child(" + (index + 1) + ")";
	// 			$(_selector)[0].className = "job-item";
	// 			index = 0;
	// 			_selector = ".carousel-recom>div:last-child>div:nth-child(" + (index + 1) + ")";
	// 			$(_selector)[0].className = "job-item present";
	// 		}else{
	// 			index++;
	// 			var _selector = ".carousel-recom>div:last-child>div:nth-child(" + index + ")";
	// 			$(_selector)[0].className = "job-item";
	// 			var _index = index + 1;
	// 			_selector = ".carousel-recom>div:last-child>div:nth-child(" + _index + ")";
	// 			$(_selector)[0].className = "job-item present";

	// 			if((index - 1) == 0){
	// 				animateTopRight = itemOuterHeight + itemMarginTop;
	// 				animateTopLeft	= -itemBigOuterHeight;
	// 			}else{
	// 				animateTopRight = 2 * (itemOuterHeight + itemMarginTop);
	// 				animateTopLeft	= -2 * itemBigOuterHeight;
	// 			}
	// 		}

			

	// 	}, 3000);
	// }

	var timerId = setInterval(stepCarousel, 3000);
	
	$(".carousel-recom .job-item").on("mouseover", function(event){
		clearInterval(timerId);
		var index = $(".carousel-recom .present").index();
		var _index = $(this).index();
		if(index == _index){
			// nothing to do
		}else{
			stepCarousel(_index);
		}
	});

	$(".carousel-recom .job-item").on("mouseleave", function(event){
		timerId = setInterval(stepCarousel, 3000);
	});

	$(".carousel-recom>div:first-child").on("mouseover", function(event){
		clearInterval(timerId);
	});

	$(".carousel-recom>div:first-child").on("mouseleave", function(event){
		timerId = setInterval(stepCarousel, 3000);
	});


	function stepCarousel(aim){
		var topRight = 0, topLeft = 0, selector = "",
			// nth-child = index() ++; cancel the default present
			index = $(".carousel-recom .present").index();
			index ++;
			$(".carousel-recom .present")[0].className = "job-item";
		if(arguments.length == 0){
			// auto change
			if(index == 3){
				$(".carousel-recom>div:last-child>div:nth-child(1)")[0].className = "job-item present";
				topRight = 0;
				topLeft  = 0;
			}else{
				selector = ".carousel-recom>div:last-child>div:nth-child(" + (index + 1) + ")";
				$(selector)[0].className = "job-item present";
				if(index == 1){
					topRight = itemOuterHeight + itemMarginTop;
					topLeft  = -itemBigOuterHeight;
				}else{
					topRight = 2 * (itemOuterHeight + itemMarginTop);
					topLeft  = -2 * itemBigOuterHeight;
				}
			}
		}else{
			// to some page
			if(aim == 1){
				topRight = itemOuterHeight + itemMarginTop;
				topLeft  = -itemBigOuterHeight;
			}else if(aim == 2){
				topRight = 2 * (itemOuterHeight + itemMarginTop);
				topLeft  = -2 * itemBigOuterHeight;
			}else{
				topRight = 0;
				topLeft  = 0;
			}
			var selector = ".carousel-recom>div:last-child>div:nth-child(" + ( aim + 1 ) + ")";
			$(selector)[0].className = "job-item present";
		}

		$(".carousel-recom .high-light").animate({
			"top": topRight
		}, 300, function(){});

		$(".carousel-recom>div:first-child>div").animate({
			"top": topLeft
		}, 300, function(){});
	}
}();