module.exports = function(app){
	app.get("/", function(req, res){
		var userAgent = req.headers["user-agent"];
		if(userAgent.match(/(iphone|ipod|ipad|android|MicroMessenger)/i)){
			// Mobile or Wechat
			res.render("index_Mobile", {
				title: "常州职业信息技术学院校园招聘网站"
			});			
		}else{
			// PC
			res.render("index", {
				title: "常州职业信息技术学院校园招聘网站"
			});
		}
	});
};

function checkMobile(req, res, next){
	var userAgent = req.headers["user-agent"];
	if(userAgent.match(/(iphone|ipod|ipad|android|MicroMessenger)/i)){
		
	}
}
