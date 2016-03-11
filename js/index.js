var currIndex = 1,
	firstIN = true,
	offset,
	scale = 1,
	isScale = false;

$(function () {
		
	Snap.load("svg/bg.svg", function (svg) {
		this.append(svg.node);
		
//		reSizePage();
		initSVG();
		title_click_fun();
		nav_click_fun();
		reg_chk_fun();
		input_blur_fun();
		input_focus_fun();
		
	}, $("#container"));
	
	
});

function reSizePage () {
	var w = document.body.clientWidth;	
	if (w < 500) {
		scale = w / 500;
		isScale = true;
		$("#container").css("zoom", scale);
	}
}


function initSVG () {
	
	//隐藏所有文本
	$("div[id*='_txt']").hide();
	//导航栏样式
	$("#nav #b"+currIndex).hide().siblings().show();
	//隐藏其他步骤
	$("#stage #step"+currIndex).show().siblings().hide();
	//清空文本框值
	$("input[type!=button]").val("");
	//清空提示文字
	$("span[id*='_span']").text("");
	//隐藏loading.gif
	$("#loading").hide();
	
}

function title_click_fun () {
	$("#t1, #t2, #s1, #s2, #s3, #s4, #s_use").zdw_addEvent("mousedown", function (e) {
		var id = e.currentTarget.id;
		$("#"+id+"_txt").slideToggle('slow').siblings("div[id*='_txt']").hide();		
	});
}

function nav_click_fun () {
	$("#b1, #b2, #b3").zdw_addEvent("mousedown", function (e) {
		currIndex = e.currentTarget.id[1];
		initSVG();
	});
}

function reg_chk_fun () {
	
	$("#commit").zdw_addEvent("mousedown", function () {		
		$("#commit").css({
			"margin": "22px 0 0 102px",
			"box-shadow": "1px 1px #a0b3d6"
		});
	})
	.zdw_addEvent("mouseup", function () {
		$("#commit").css({
			"margin": "20px 0 0 100px",
			"box-shadow": "1px 1px #a0b3d6, 2px 2px #a0b3d6,3px 3px #a0b3d6, 4px 4px #a0b3d6"
		});
		
		if (username_span_fun() && pwd_chk_span_fun() && birthday_span_fun()) {
			alert("亲爱的"+$("#username").val()+"童鞋\n恭喜你已经完成本节课的学习\n我想通过模拟注册会员\n你已经明白了验证在网站中的目的了吧");
		}
		
	});
}

function input_blur_fun () {
	$("#username").blur(function () {
		username_span_fun();
	});
	
	$("#pwd").blur(function () {
		pwd_span_fun();
	});
	
	$("#pwd_chk").blur(function () {
		pwd_chk_span_fun();
	});
	
	$("#birthday").blur(function () {
		birthday_span_fun();
	});
	
}

function input_focus_fun () {
	
	$("#username, #pwd, #pwd_chk, #birthday").focus(function (e) {
		var id = e.currentTarget.id;
		$("#"+id+"_span").text("");
	});
	
}

function username_span_fun () {
	
	var value = $("#username").val(),
		req = /^[\u4e00-\u9fa5]{2,10}$/;
	
	if (value.length < 2 || value.length > 4) {		
		$("#username_span").text("姓名长度须在2~4位之间").css("color","red");
		return false;
	}
	
	if (!req.test(value)) {
		$("#username_span").text("请输入汉字").css("color","red");
		return false;
	}
	
	$("#username_span").text("通过").css("color","green");
	return true;
	
}

function pwd_span_fun () {
	var pwd_value = $("#pwd").val(),
		len = pwd_value.length;
	if (len < 6 || len > 16) {
		$("#pwd_span").text("密码长度须在6~16位之间").css("color","red");
		return false;
	}
	
	$("#pwd_span").text("通过").css("color","green");
	return true;
	
}

function pwd_chk_span_fun () {
	
	var pwd_value = $("#pwd").val(),
		pwd_chk_value = $("#pwd_chk").val();
		
	if (pwd_span_fun()) {
		if (pwd_value != pwd_chk_value) {
			$("#pwd_chk_span").text("两次输入密码不一致").css("color","red");
			return false;
		} else {
			$("#pwd_span").text("");
			$("#pwd_chk_span").text("密码一致").css("color","green");
			return true;
		}
	}
	
	return true;
}

function birthday_span_fun () {
	var req1 = /^(\d{4})-(\d{2})-(\d{2})$/,
		req2 = /^(\d{4})\/(\d{2})\/(\d{2})$/,
		req3 = /^(\d{4})年(\d{2})月(\d{2})日$/,
		value = $("#birthday").val();
		
	if (!(req1.test(value) || req2.test(value) || req3.test(value))) {
		$("#birthday_span").html("请输入正确格式的日期").css("color","red");
		return false;
		var year = value.splice(0,4);
	}
	
	$("#birthday_span").text("通过").css("color","green");
	return true;
	
}