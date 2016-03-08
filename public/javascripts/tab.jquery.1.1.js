/**
 * [myTab 简单的基于jQuery的tab组件]
 * [
 * 	带有简单的渐进渐出的动画效果
 * 	默认数据都是同步，没有考虑异步请求的情况
 * 	添加简单的报错检查信息
 * ]
 * @param  {[selector/DOM/jQuery]}   container [outer Wrapper]
 * @param  {[selector/DOM/jQuery]}   nav       [nav selector *single*]
 * @param  {[selector/DOM/jQuery]}   panel     [panel selector *single*]
 * @param  {[string/default: active]}   navActive    [description]
 * @param  {[string/default: active]}   panelActive  [description]
 * @param  {[number]}   active       [the index of the default active panel]
 * @param  {[string]}   rel          [the related attribute]
 * @param  {Function}	callback     [callback]
 * @param  {Function}	beforeTabFun     [beforeTabFun]
 * @return {[object]}                [object]
 */
function myTab(options){
	var defaultSettings = {
		"container": 	null,
		"nav": 			".nav",
		"panel": 		".panel",
		"navActive": 	"active", 
		"panelActive": 	"active",
		"active": 		0,
		"rel": 			undefined,
		"beforeTabFun": null,
		"callback": 	null 
	};

	this.settings = $.extend({}, defaultSettings, options);

	this.init();
}

myTab.prototype.init = function(){
	var that = this;

	this.settings.container = $(this.settings.container);
	this.settings.nav = $(this.settings.nav, this.settings.container);
	this.settings.panel = $(this.settings.panel, this.settings.container);
	// update settings
	var _this = this.settings;

	if(!this.checkInfo()){
		return false;
	}

	// the default chosen
	_this.nav.removeClass(_this.navActive).eq(_this.active).addClass(_this.navActive);

	if(_this.rel == undefined){
		_this.panel.removeClass(_this.panelActive).eq(_this.active).addClass(_this.panelActive);
	}else{
		var tagRel = _this.nav.eq(_this.active).attr(settings.rel);

		_this.panel.filter("[" + settings.rel + "=" + tagRel + "]").addClass(_this.panelActive);
	}

	// change into the arr
	var arrNav = Array.apply(null, _this.nav);
	// the arguments of the `array.forEach(ele, index, arr)`
	arrNav.forEach(function(ele){
		$(ele).on("click", changeTab.bind(ele, _this));
	});
	
};

myTab.prototype.checkInfo = function(){
	var _this = this.settings;

	if(_this.nav.length == 0){
		// nav length wrong
		console.error("the length of nav is 0");
		return false;
	}else if(_this.panel.length == 0){
		// panel length wrong
		console.error("the length of panel is 0.");
		return false;
	}else if(_this.panel.length != _this.nav.length){
		// different length
		console.error("nav, panel have different length.");
		return false;
	}else{
		return true;
	}
};

var changeTab = function(settings){
	var $that = $(this);
	if(settings.rel == undefined){
		var index = $that.index();

		var $aimPanel = $(settings.panel).eq(index);
	}else{
		var tagRel = $that.attr(settings.rel);

		var $aimPanel = $(settings.panel).filter("[" + settings.rel + "=" + tagRel + "]");
	}

	var $beforeNav = $(settings.nav).filter("[class*=" + settings.navActive + "]");
	var $beforePanel = $(settings.panel).filter("[class*=" + settings.panelActive + "]");

	$beforePanel.fadeOut(200, function(){
		$beforeNav.removeClass(settings.navActive);
		$that.addClass(settings.navActive);
		$beforePanel.removeClass(settings.panelActive);

		$aimPanel.fadeIn(200, function(){
			// settings.callback();
			$(this).addClass(settings.panelActive);
		})
	});

	

	return false;
};