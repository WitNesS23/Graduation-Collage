// 基于原型编写的弹窗对象 - 带动画效果
function myDialog($dialog){
	this.dom = $dialog;
}

myDialog.prototype.show = function(){
	var that = this;

	that.dom.closest("#mask").addClass("show");

	that.dom.find(">div").removeClass("show").eq("1").addClass("show");

	that.height = that.dom.height();
	that.width = that.dom.width();

	that.dom.find(">div").removeClass("show").eq("0").addClass("show");

	that.loading = that.dom.find("i");


	// 判断动画方式 撑开或者压扁
	if(that.width/that.height > 1.5){
		// 压扁效果
		var beginHeight = that.height * 1.3;
		that.dom.height(beginHeight);

		var beginWidth = that.width / 1.5;
		that.dom.width(beginWidth);
	}else{
		// 撑开效果
		var beginHeight = that.height / 2 > that.loading.height() ? that.height / 2 : that.loading.height();
		that.dom.height(beginHeight);

		var beginWidth = that.width * 1.3;
		that.dom.width(beginWidth);
	}

	that.dom.animate({
		"width": that.width + "px",
		"height": that.height + "px",
		"opacity": 1
	}, 400, function(){
		that.dom.find(".animate").removeClass("show");
		that.dom.find(".true-info").addClass("show");
	});
};

myDialog.prototype.hide = function(callback){
	this.dom.closest("#mask").fadeOut(300, function(){
		$(this).removeClass("show").children().removeClass("show");

		$(this)[0].style = "";
	});
};

// 1. 动画效果 压扁或者撑开 / 渐渐显示  - 内部有简单动画加载效果
// 2. 动画加载完成 内容显示替换
// 3. 关闭效果 渐进消失


$.fn.dialog = function(settings){
	var defaultConfig = {
		"mask": "#mask",
		"close": ".close-btn"
	};

	var options = $.extend({}, defaultConfig, settings || {})

	this.each(function(){
		var _this = $(this);
		var $mask = _this.closest(options.mask);

		if(_this.data("bind-dialog")){
			return this;
		}else{
			var dialog = new myDialog(_this);
			_this.data("bind-dialog", true);

			var $dom = _this.data("dialog-dom");
			$dom.on("click", function(){
				dialog.show();
			});

			$mask.on("click", function(e){
				var $target = $(e.target);

				if($target.closest(options.close).length){
					dialog.hide();
					return false;
				}else if($target.closest(_this).length){
					return false;
				}else{
					dialog.hide();
					return false;
				}
			});
		}
		
	})
};