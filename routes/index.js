module.exports = function(app){
	app.get("/", function(req, res){
		res.render("index", {
			title: "常州职业信息技术学院校园招聘网站"
		})
	});
};
