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
function stepCarousel(aim) {
    // 初始化数据
    var $outer = $(".main-content .jobs-recom");
    var aimTopLeft = 0,
        leftSingleHeight = $(".job-item-bigpic", $outer).eq(1).innerHeight();
    var aimTopRight = 0,
        rightSingleHeight = $(".job-item", $outer).eq(1).outerHeight(true);
    var presentIndex = arguments.length != 0 ? aim : ($(".present", $outer).index() + 1);
    if (presentIndex == 3) {
        aimTopLeft = 0;
        aimTopRight = 0;
        presentIndex = 0;
    } else {
        aimTopLeft = -1 * leftSingleHeight * presentIndex;
        aimTopRight = rightSingleHeight * presentIndex;
    }

    $(".high-light", $outer).animate({
        "top": aimTopRight
    }, 250, function() {
        $(".job-item", $outer).removeClass("present").eq(presentIndex).addClass("present");
    });

    $(".detail-imgs-wrap>div", $outer).animate({
        "top": aimTopLeft
    }, 250, function() {});
}

var timer = setInterval(stepCarousel, 3000);

// 鼠标停留的事件监听
$(".carousel-recom .detail-imgs-wrap").on("mouseover", function() {
    clearInterval(timer);
    console.log("left-over");
}).on("mouseleave", function() {
    timer = setInterval(stepCarousel, 3000);
    console.log("left-outer");
});

// mouseenter 不会多次触发事件
$(".carousel-recom .thumb-imgs-wrap .job-item").not(".high-light").on("mouseenter", function(e) {
    clearInterval(timer);
    console.log("right-over");
    var index = $(this).index();
    console.log(e.target);
    stepCarousel(index);
}).on("mouseleave", function() {
    console.log("right-outer");
    timer = setInterval(stepCarousel, 3000);
});

// tab组件的初始化
var options = {
    "container": ".tab-job-info",
    "nav": ">ul li",
    "panel": ".job-list-outer-container>div",
    "navActive": "chosen",
    "panelActive": "chosen",
    "active": 0,
    "rel": undefined,
    "beforeTabFun": undefined,
    "callback": undefined
}
var tab = new myTab(options);

// logo 推荐区域动画效果
$(".logo-recom").on("mouseover", ">div", function(e) {
    if (!$(this).data("hover")) {
        var X = e.offsetX;
        var Y = e.offsetY;

        $(this).data("x", X).data("y", Y).data("hover", false);
    }
});

$(".logo-recom").on("mousemove", ">div", function(e) {
    var X = e.offsetX;
    var Y = e.offsetY;

    var $that = $(this);

    if (!$(this).data("hover")) {
        var _X = $(this).data("x");
        var _Y = $(this).data("y");

        var diffX = X - _X;
        var diffY = Y - _Y;

        if (diffX == 0 && diffY == 0) {
            return false;
        }

        var absX = Math.abs(diffX);
        var absY = Math.abs(diffY);

        $hover = $(this).find(".over-info");

        if (absX > absY) {
            // 代表是左右移动
            if (diffX > 0) {
                // 左 -> 右
                $hover.css({ "left": "-100%", "top": "0" })
                    .animate({ "left": "0" }, 250, function() {
                        $that.data("animate", true);
                    });
            } else {
                // 右 -> 左
                $hover.css({ "left": "100%", "top": "0" })
                    .animate({ "left": "0" }, 250, function() {
                        $that.data("animate", true);
                    });
            }
        } else {
            // 代表是上下移动
            if (diffY > 0) {
                // 上 -> 下
                $hover.css({ "left": "0", "top": "-100%" })
                    .animate({ "top": "0" }, 250, function() {
                        $that.data("animate", true);
                    });
            } else {
                // 下 -> 上
                $hover.css({ "left": "0", "top": "100%" })
                    .animate({ "top": "0" }, 250, function() {
                        $that.data("animate", true);
                    });;
            }
        }

        $(this).data("hover", true);
    }

    $(this).data("x", X).data("y", Y);
});

$(".logo-recom").on("mouseleave", ">div", function(e) {
    var X = e.offsetX;
    var Y = e.offsetY;

    var $that = $(this);
    $hover = $(this).find(".over-info");

    if ($(this).data("hover")) {
        var _X = $(this).data("x");
        var _Y = $(this).data("y");

        var diffX = X - _X;
        var diffY = Y - _Y;

        var absX = Math.abs(diffX);
        var absY = Math.abs(diffY);

        if (absX > absY) {
            // 代表是左右移动
            if (diffX > 0) {
                // 左 -> 右
                $hover.animate({ "left": "100%" }, 250);
            } else {
                // 右 -> 左
                $hover.animate({ "left": "-100%" }, 250);
            }
        } else {
            // 代表是上下移动
            if (diffY > 0) {
                // 上 -> 下
                $hover.animate({ "top": "100%" }, 250);
            } else {
                // 下 -> 上
                $hover.animate({ "top": "-100%" }, 250);
            }
        }

        $(this).data("hover", false);
    }

    $(this).data("x", X).data("y", Y);
});
