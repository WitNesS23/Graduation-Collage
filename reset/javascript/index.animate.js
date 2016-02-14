// 主导航动画效果
$(".main-nav").on("mouseover", ".job-container", function(e) {
    var $that = $(this);
    $that.addClass("hover").siblings().removeClass("hover");
    var height = $that.innerHeight();

    var detailItem = $that.find(".navbar-details-container");
    detailItem.addClass("show");
    $(".hover-sep", detailItem).height(height);
}).on("mouseleave", ".job-container", function(e) {
    $(this).removeClass("hover");

    $(".main-nav .navbar-details-container").removeClass("show");
    $(".hover-sep").height(0);
});

// 搜索关键词动画效果
$("#main .main-content input").on("focus", function(event) {
    // 预设关键词 页面载入时写死 进行判断
    if ($(this).val() == globalSettings.keyword) {
        $(this).val("").css("color", "#555");
    } else {

    }
}).on("blur", function(event) {
    if ($(this).val() == globalSettings.keyword || $(this).val().trim() == "") {
        $(this).val(globalSettings.keyword).css("color", "#999");
    }
});

// 主轮播
// 剥离出来的独立轮播步骤
function stepCarousel(aim){
	// 初始化数据
	var $outer = $(".main-content .jobs-recom");
	var aimTopLeft = 0, leftSingleHeight = $(".job-item-bigpic", $outer).eq(1).innerHeight();
	var aimTopRight = 0, rightSingleHeight = $(".job-item", $outer).eq(1).outerHeight(true);
	var presentIndex = arguments.length != 0 ? aim : ($(".present", $outer).index() + 1); 
	if(presentIndex == 3){
		aimTopLeft = 0;
		aimTopRight = 0;
		presentIndex = 0;
	}else{
		aimTopLeft = -1 * leftSingleHeight * presentIndex;
		aimTopRight = rightSingleHeight * presentIndex;
	}

	$(".high-light", $outer).animate({
		"top": aimTopRight
	}, 300, function(){
		$(".job-item", $outer).removeClass("present").eq(presentIndex).addClass("present");
	});

	$(".detail-imgs-wrap>div", $outer).animate({
		"top": aimTopLeft
	}, 300, function(){});
}

var timer = setInterval(stepCarousel, 3000);

// 鼠标停留的事件监听
$(".carousel-recom .detail-imgs-wrap").on("mouseover", function(){
	clearInterval(timer);
	console.log("left-over");
}).on("mouseleave", function(){
	timer = setInterval(stepCarousel, 3000);
	console.log("left-outer");
});

$(".carousel-recom .thumb-imgs-wrap .job-item").on("mouseover", function(e){
	clearInterval(timer);
	console.log("right-over");
	var index = $(this).index();
	stepCarousel(index);
}).on("mouseleave", function(){
	console.log("right-outer");
	timer = setInterval(stepCarousel, 3000);
});















