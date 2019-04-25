/**
 * 全局
 */
var _chars_code_ = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

window.onresize = function(e) {
	if ($(".navbar-nav").is(":hidden") && $(".menu-toggler").is(":hidden")) {
		var menu = $(".page-header .page-header-menu");
		menu.slideDown(300);
	}
	if (g.wrapperTableInfo != null) {
		// 固定表头的table的高度需要重新设置
		if (g.wrapperTableInfo.length > 0) {
			for (var i = 0; i < g.wrapperTableInfo.length; i++) {
				g.fixWrapperTable(g.wrapperTableInfo[i]);
				resizeTablieList(g.wrapperTableInfo[i]);
			}
		}
	}
	try {
		resizeTreeGridPlugin();
	} catch(e) {}
	try {
		resizeTagIptEvent();
	} catch(e) {}
	try {
		resizeJSTreeHeigth();
	} catch(e) {}
	var $fzFrozenTables = $(".fzFrozenTable");
	if($fzFrozenTables.length > 0) {
		$fzFrozenTables.fzFrozenTable("resize", e);
	}
}

String.prototype.visualLength = function()
{
var ruler = $("#homeUnshowFontWidth");
ruler.text(this);
return ruler[0].offsetWidth;
} 

function generateMixed_(n) {
     var res = "";
     for(var i = 0; i < n ; i ++) {
         var id = Math.ceil(Math.random()*35);
         res += _chars_code_[id];
     }
     return res;
}

function Map() {
	this.container = new Object();
}

Map.prototype.put = function(key, value) {
	this.container[key] = value;
}

Map.prototype.get = function(key) {
	return this.container[key];
}

Map.prototype.keySet = function() {
	var keyset = new Array();
	var count = 0;
	for ( var key in this.container) {
		// 跳过object的extend函数
		if (key == 'extend') {
			continue;
		}
		keyset[count] = key;
		count++;
	}
	return keyset;
}

Map.prototype.size = function() {
	var count = 0;
	for ( var key in this.container) {
		// 跳过object的extend函数
		if (key == 'extend') {
			continue;
		}
		count++;
	}
	return count;
}

Map.prototype.remove = function(key) {
	delete this.container[key];
}

var g = {
	// 定义全局静态属
	name : "fusionzoom-erp",
	// 保留每次分页查询前端传的数据,ex:"#demo2TableDiv":{'url':'/search/demo/1/10','dataForm':{},
	// fixHead,true/false}
	tableInfo : {},
	//固定表头的table的target
	wrapperTableInfo : [],
	userStatus : "ACTIVED",
	oldOrderByValue : "",
	oldOrderByWay : "",
	
};
g.feedbackTypeTree = function(id, defaultText) {
	if (defaultText == null) {
		defaultText = "";
	}
	var tree1 = new treegrid({
		url : '/feedbackType/addOrEditTree',
		//expandUrl : '/companyCategory/tree?id=',
		allowNoneSelect : true,
		isMultiSelect : false,
		proxyId : id,
		expandAllUnEapanding: true,
		defaultText	: defaultText,
		displayType : "select",
		idField : "id",
		textField : "name",
		parentIdField : "parentId"
	});
	tree1.init();
	return tree1;
}

g.feedbackInfoTree = function(id, defaultText) {
	if (defaultText == null) {
		defaultText = "";
	}
	var tree1 = new treegrid({
		url : '/feedbackType/tree',
		allowNoneSelect : true,
		isMultiSelect : false,
		proxyId : id,
		expandAllUnEapanding: true,
		defaultText	: defaultText,
		displayType : "select",
		idField : "id",
		textField : "name",
		parentIdField : "parentId",
	});
	tree1.init();
	return tree1;
}
//
//g.showImg = function(thisDiv){
//	var divHeight = $($(thisDiv).find("div")[0]).height();
//	var divWidth= $($(thisDiv).find("div")[0]).width();
//	if(divHeight>divWidth&&divHeight>300){
//		$($(thisDiv).find("div")[0]).height(300);
//	}
//	if(divWidth<300&&divHeight>300){
//		$($(thisDiv).find("div")[0]).height(300);
//	}
//	if(divHeight<divWidth&&divHeight>300){
//		divHeight=(300/divWidth)*divHeight;
//		$($(thisDiv).find("div")[0]).height(divHeight);
//	}
//	if(divWidth>300&&divHeight<300){
//		divHeight=(300/divWidth)*divHeight;
//		$($(thisDiv).find("div")[0]).height(divHeight);
//	}
//	if(divWidth<300&&divHeight<300){
//		$($(thisDiv).find("div")[0]).height(divHeight);
//	}
//	var smallDis = $(window).height()-($(thisDiv).offset().top - $(window).scrollTop());
//	var bigDis =  $(window).height()-($($(thisDiv).find("div")[0]).offset().top - $(window).scrollTop());
//	console.log("smallDis:" + smallDis);
//	console.log("bigDis:" + bigDis);
//	if(smallDis<divHeight){
//		console.log("dd-up");
////		$($(thisDiv).find("div")[0]).attr("class","dd-up");
////		var margin = parseInt(divHeight-1);
////		$($(thisDiv).find("div")[0]).css("margin-top","-"+(margin)+"px");
////		$($(thisDiv).find("div")[0]).css("margin-top","-"+(bigDis - smallDis + 36)+"px");
//	} else {
//		console.log("dd");
//		$($(thisDiv).find("div")[0]).attr("class","dd");
//		if(bigDis > smallDis) {
//			console.log("bigDis > smallDis");
//			console.log("smallDis:" + smallDis);
//			console.log("bigDis:" + bigDis);
//			$($(thisDiv).find("div")[0]).css("margin-top",-(bigDis - smallDis)+"px");
//		} else if(bigDis < smallDis) {
//			$($(thisDiv).find("div")[0]).css("margin-top",-(smallDis - bigDis -36)+"px");
//		}
//	}
//	}else{
//		if($(window).height()-$(thisDiv).offset().top<300){
//			
//			$($(thisDiv).find("div")[0]).attr("class","dd-up dd-up2");
//			$($(thisDiv).find("div")[0]).css("height","300px");
//			$($(thisDiv).find("div")[0]).css("margin-top","-300px");
//		}
//	}
//	
//}

//g.showImg2 = function(thisDiv) {
//	var $bigImg = $(thisDiv).next();
//	$bigImg.css("display","block").css("position","absolute");
//	var divHeight = $bigImg.height();
//	var divWidth= $bigImg.width();
//	if(divHeight>divWidth&&divHeight>300){
//		$bigImg.height(300);
//	}
//	if(divWidth<300&&divHeight>300){
//		$bigImg.height(300);
//	}
//	if(divHeight<divWidth&&divHeight>300){
//		divHeight=(300/divWidth)*divHeight;
//		$bigImg.height(divHeight);
//	}
//	if(divWidth>300&&divHeight<300){
//		divHeight=(300/divWidth)*divHeight;
//		$bigImg.height(divHeight);
//	}
//	if(divWidth<300&&divHeight<300){
//		$bigImg.height(divHeight);
//	}
//	
//	var smallDis = $(thisDiv).offset().top - $(window).scrollTop();//小图距离屏幕顶部的高度
//	var bigDis =  $bigImg.offset().top - $(window).scrollTop();//大图距离屏幕顶部的高度
//	console.log("smallDis:" + smallDis);
//	console.log("bigDis:" + bigDis);
//	var bigDisNow = $bigImg.offset().top - $(window).scrollTop();//大图距离屏幕顶部的高度,now
//	console.log("bigDisNow:" + bigDisNow);
//   if("smallDisNow" < $bigImg.height()) {
//		$bigImg.addClass("dd");
//		if(($(window).height() - smallDis) < $bigImg.height())
//		{
//			$bigImg.removeClass("dd");
//			$bigImg.addClass("dd-up1");
//			$bigImg.css("margin-top", -(bigDis - smallDis+ $bigImg.height())+"px");
//		
//			}
//		else
//		{
//			$bigImg.addClass("dd2");
//			$bigImg.css("margin-top", -(bigDis - smallDis + 36)+"px");
//			console.log(($(window).height() - smallDis)>$bigImg.height());	
//		}
//		
//	}
//	else{
//		$bigImg.addClass("dd");
//		if(($(window).height() - bigDisNow) < $bigImg.height())
//		  {
//			$bigImg.removeClass("dd");
//			$bigImg.addClass("dd-up3");
//			$bigImg.css("margin-top", -(bigDisNow - smallDis+ $bigImg.height())+"px");
//			}
//		else
//		{
//			$bigImg.css("margin-top", -(bigDisNow - smallDis+ 36)+"px");
//		}
//		
//	}
//		
//		
		
		
//		
//		console.log("bigDis > smallDis");
//		$bigImg.css("margin-top", -(bigDis - smallDis + 36)+"px");
//	} else if
//	console.log("margin-top1:" + $bigImg.css("margin-top"));
//	var bigDisNow = $bigImg.offset().top - $(window).scrollTop();//大图距离屏幕顶部的高度,now
//	console.log("bigDisNow:" + bigDisNow);
//	$bigImg.removeClass("dd").removeClass("dd-up");
//	if(($(window).height() - bigDisNow) < $bigImg.height()) {
//		console.log("dd-up");
//		$bigImg.addClass("dd-up");
//		$bigImg.css("margin-top", ($bigImg.css("margin-top")-(bigDisNow - smallDis + $bigImg.height()))+"px");
//	} else {
//		console.log("dd");
//		$bigImg.addClass("dd");
//		$bigImg.css("margin-top", ($bigImg.css("margin-top")-(bigDisNow - smallDis + 36))+"px");
//	}
//	console.log("margin-top2:" + $bigImg.css("margin-top"));
//}

g.hideImg2 = function(thisDiv) {
	var $bigImg = $(thisDiv).next();
	$bigImg.css("display","none");
}

g.tagInput = function(setting) {
	var tagInput = new taginput(setting);
	tagInput.init();
	return tagInput;
}
g.tagInput2 = function(setting) {
	var tagInput2 = new taginput2(setting);
	tagInput2.init();
	return tagInput2;
}
/**
 * 防止按钮再次点击（将按钮置灰）
 */
g.closebtn = function(closebtn){
	if($(closebtn)[0].tagName=="A"){
		if($(closebtn).attr("onclick") && $(closebtn).attr("onclick") == "javascript:void(0);") {
			return;
		}
		$(closebtn).attr("clickData",$(closebtn).attr("onclick"));
		$(closebtn).attr("onclick","javascript:void(0);");
	}else{
		$(closebtn).attr("disabled","disabled");
	}
	
}

/**
 * 提交错误,重新激活按钮
 */
g.openbtn = function(openbtn){
	if($(openbtn)[0].tagName=="A"){
		if($(openbtn).attr("clickData")) {
			$(openbtn).attr("onclick",$(openbtn).attr("clickData"));
			//$(openbtn).removeAttr("clickData");
		}
	}else{
		$(openbtn).removeAttr('disabled');
	}
}

g.categoryTree = function(setting) {
	var tree1 = new treegrid(setting);
	tree1.init();
	return tree1;
}

g.openToops = function(){
	$(".portlet.light.bordered>.portlet-title>.tools").children().addClass("collapse");
	$(".portlet.light.bordered>.portlet-title>.tools").parent().parent().find(".portlet-body").css("display","block");
}

g.userTree = function(id, defaultText, url) {
	if (defaultText == null) {
		defaultText = "";
	}
	var tree1 = new treegrid({
		url : url,
		expandUrl : url + '?id=',
		allowNoneSelect : true,
		isMultiSelect : false,
		proxyId : id,
		width : 350,
		defaultText : defaultText,
		displayType : "select",
		idField : "id",
		textField : "name",
		parentIdField : "parentId"
	});
	tree1.init();
	return tree1;
}

//折叠展开collapse
g.collapse = function(){
	$('.portlet > .portlet-title > .tools > .collapse, .portlet .portlet-title > .tools > .expand').unbind("click").on('click',  function(e) {
	    e.preventDefault();
	    var el = $(this).closest(".portlet").children(".portlet-body");
	    if ($(this).hasClass("collapse")) {
	        $(this).removeClass("collapse").addClass("expand");
	        el.slideUp(200);
	    } else {
	        $(this).removeClass("expand").addClass("collapse");
	        el.slideDown(200);
	    }
	});
}

//解决相同名字只验证一个问题
g.addValidateBatch = function(){
	if ($.validator) {
	    $.validator.prototype.elements = function () {
	        var validator = this,
	            rulesCache = {};
	        return $([]).add(this.currentForm.elements)
	        .filter(":input")
	        .not(":submit, :reset, :image, [disabled]")
	        .not(this.settings.ignore)
	        .filter(function () {
	            var elementIdentification = this.id || this.name;
	            !elementIdentification && validator.settings.debug && window.console && console.error("%o has no id nor name assigned", this);
	            if (elementIdentification in rulesCache || !validator.objectLength($(this).rules()))
	                return false;
	            rulesCache[elementIdentification] = true;
	            return true;
	        });
	    };
	}
}

g.chageShopByPlatform = function(platformId,shopId){
	var type = $("#"+platformId).find("option:selected").val();
	var shops = $("#"+shopId).data("shop");
	if(shops == null || shops.length == 0) {
		var shopArrs = new Array;
		var options = $("#"+shopId).find("option");
		$.each(options, function(idx, option){
			var s = new Object;
			s.id = $(option).val();
			if(!(s.id == null || s.id.length == 0)) {
				s.name = $(option).text();
				s.platform = $(option).attr("platform");
				shopArrs.push(s);
			}
		});
		$("#"+shopId).data("shop", shopArrs);
		shops = shopArrs;
	}
	var options = "";
	$.each(shops, function(idx, shop) {
		if(type.length == 0) {
			options += '<option platform="'+shop.platform+'" value="'+shop.id+'">'+shop.name+'</option>';
		} else {
			if(type == shop.platform) {
				options += '<option platform="'+shop.platform+'" value="'+shop.id+'">'+shop.name+'</option>';
			}
		}
	});
	$("#"+shopId).html(options);
	$("#"+shopId).multiselect('clearSelection');
	$("#"+shopId).multiselect('rebuild');
    $(".multiselect-container label.checkbox input").addClass("icheck");
}

//展开collapse 
g.collapseExpand = function(collapseId){
	var el = $("#"+collapseId).closest(".portlet").children(".portlet-body");
	$("#"+collapseId).addClass("collapse");
	el.slideDown(200);
}

g.collapseExpandClass = function(collapseClass){
	var el = $("."+collapseClass).closest(".portlet").children(".portlet-body");
	$("."+collapseClass).addClass("collapse");
	el.slideDown(200);
}

g.shopTree = function(id, defaultText, url) {
	if (defaultText == null) {
		defaultText = "";
	}
	var tree1 = new treegrid({
		url : url,
		allowNoneSelect : true,
		isMultiSelect : true,
		proxyId : id,
		defaultText : defaultText,
		displayType : "select",
		idField : "id",
		textField : "name",
		parentIdField : "parentId"
	});
	tree1.init();
	return tree1;
}

g.userTree = function(id, defaultText, url) {
	if (defaultText == null) {
		defaultText = "";
	}
	var tree1 = new treegrid({
		url : url,
		/* expandUrl : url+'?id=', */
		allowNoneSelect : true,
		isMultiSelect : true,
		proxyId : id,
	/*	width : 350,*/
		defaultText : defaultText,
		displayType : "select",
		idField : "id",
		textField : "actualName",
		parentIdField : "parentId"
	});
	tree1.init();
	return tree1;
}

g.companyCategoryTree = function(id, defaultText) {
	if (defaultText == null) {
		defaultText = "";
	}
	var tree1 = new treegrid({
		url : '/companyCategory/tree',
		//expandUrl : '/companyCategory/tree?id=',
		allowNoneSelect : true,
		isMultiSelect : false,
		proxyId : id,
		expandAllUnEapanding: true,
		defaultText	: defaultText,
		displayType : "select",
		idField : "id",
		textField : "name",
		parentIdField : "parentId"
	});
	tree1.init();
	return tree1;
}
//目录上级修改查询
g.companyCategoryTreeInEdit = function(id, defaultText,categoryId) {
	if (defaultText == null) {
		defaultText = "";
	}
	var tree1 = new treegrid({
		url : '/companyCategory/treeInEdit?id='+categoryId,
		//expandUrl : '/companyCategory/tree?id=',
		allowNoneSelect : true,
		isMultiSelect : false,
		proxyId : id,
		expandAllUnEapanding: true,
		defaultText	: defaultText,
		displayType : "select",
		idField : "id",
		textField : "name",
		parentIdField : "parentId"
	});
	tree1.init();
	return tree1;
}
g.mailTemplateClazzTree = function(id, defaultText,callback) {
	if (defaultText == null) {
		defaultText = "";
	}
	var tree1 = new treegrid({
		url : '/mailTemplateClazz/addOrEditTree',
		//expandUrl : '/companyCategory/tree?id=',
		enableFiltering: true,
		allowNoneSelect : true,
		isMultiSelect : false,
		isSearchAble : true,// 是否允许搜索，暂未实现
		proxyId : id,
		expandAllUnEapanding: true,
		defaultText	: defaultText,
		displayType : "select",
		idField : "id",
		textField : "name",
		parentIdField : "parentId",
		callBack :callback
	});
	tree1.init();
	return tree1;
}

g.mailTemplateTree = function(id, defaultText) {
	if (defaultText == null) {
		defaultText = "";
	}
	var tree1 = new treegrid({
		url : '/mailTemplateClazz/tree',
		//expandUrl : '/companyCategory/tree?id=',
		allowNoneSelect : true,
		isMultiSelect : false,
		proxyId : id,
		expandAllUnEapanding: true,
		defaultText	: defaultText,
		displayType : "select",
		idField : "id",
		textField : "name",
		parentIdField : "parentId",
	});
	tree1.init();
	return tree1;
}

g.companyCategoryTreeData = function(id, defaultText,data) {
	if (defaultText == null) {
		defaultText = "";
	}
	var tree1 = new treegrid({
		url : '/companyCategory/tree',
		allowNoneSelect : true,
		isMultiSelect : false,
		proxyId : id,
		/*width: 350,*/
		expandAllUnEapanding: true,
		defaultText	: defaultText,
		displayType : "select",
		idField : "id",
		textField : "name",
		parentIdField : "parentId"
	});
	tree1.setting.data = data;
	tree1.init();
	return tree1;
}


//context  提示内容
//callback 回调函数
//title    标题
g.confirm = function(context, callback, title) {
	$("#global-confirm-model-a").click();
	title = title ? title : "i18n.module.global.prompt.msg.safetytips";
	$("#global-confirm-model .modal-title").text(title);
	$("#global-confirm-model .modal-body").html(context);
	if(callback) {
		$("#global-confirm-model .preservation-btn2").unbind("click").click(function() {
			$("#global-confirm-model .cancel-btn").click();
			callback.apply(this, null);
			return false;
		});
	} else {
		$("#global-confirm-model .preservation-btn2").unbind("click").click(function() {
			$("#global-confirm-model .cancel-btn").click();
		});
	}
}

//context  提示内容
//callback 回调函数
//title    标题
g.confirm1 = function(context, callback, title) {
	$("#global-confirm-model-b").click();
	title = title ? title : "i18n.module.global.prompt.msg.safetytips";
	$("#global-confirm-model1 .modal-title").text(title);
	$("#global-confirm-model1 .modal-body").text(context);
	if(callback) {
		$("#global-confirm-model1 .preservation-btn").unbind("click").click(function() {
			$("#global-confirm-model1 .cancel-btn").click();
			callback.apply(this, null);
			return false;
		});
	} else {
		$("#global-confirm-model1 .preservation-btn").unbind("click").click(function() {
			$("#global-confirm-model1 .cancel-btn").click();
		});
	}
}

//context  提示内容
//callback 点击确定后执行的回调函数
//cancelCallback 点击取消后执行的回调函数
//title    标题
g.confirmcancelback = function(context,callback,cancelCallback, title) {
	$("#global-confirm-model-a").click();
	title = title ? title : "i18n.module.global.prompt.msg.safetytips";
	$("#global-confirm-model .modal-title").text(title);
	$("#global-confirm-model .modal-body").text(context);
	if(callback) {
		$("#global-confirm-model .preservation-btn2").unbind("click").click(function() {
			callback.apply(this, null);
			$("#global-confirm-model .cancel-btn").data("closed", true);
			$("#global-confirm-model .cancel-btn").click();
		});
	} else {
		$("#global-confirm-model .preservation-btn2").unbind("click").click(function() {
			$("#global-confirm-model .cancel-btn").click();
		});
	}
	$("#global-confirm-model .cancel-btn").unbind("click").click(function() {
		if(cancelCallback) {
			if($("#global-confirm-model .cancel-btn").data("closed") != true) {
				cancelCallback.apply(this, null);
			}
		}
		$("#global-confirm-model .cancel-btn").data("closed", false);
	});
}


//context  提示内容
//callback 点击确定后执行的回调函数
//cancelCallback 点击取消后执行的回调函数
//title    标题
g.confirmcancelback2 = function(context,callback,cancelCallback, title) {
	$("#global-confirm-model-c").click();
	title = title ? title : "i18n.module.global.prompt.msg.safetytips";
	$("#global-confirm-modelCC .modal-title").text(title);
	$("#global-confirm-modelCC .modal-body").text(context);
	if(callback) {
		$("#global-confirm-modelCC .preservation-btn2").unbind("click").click(function() {
			callback.apply(this, null);
			$("#global-confirm-modelCC .cancel-btn").data("closed", true);
			$("#global-confirm-modelCC .cancel-btn").click();
		});
	} else {
		$("#global-confirm-modelCC .preservation-btn2").unbind("click").click(function() {
			$("#global-confirm-modelCC .cancel-btn").click();
		});
	}
	$("#global-confirm-modelCC .cancel-btn").unbind("click").click(function() {
		if(cancelCallback) {
			if($("#global-confirm-modelCC .cancel-btn").data("closed") != true) {
				cancelCallback.apply(this, null);
			}
		}
		$("#global-confirm-modelCC .cancel-btn").data("closed", false);
	});
}


//按钮选中
g.checkRadioBy = function(obj){
	$(obj).parent().parent().parent().parent().find("radio:checked").removeClass("checked");
	$(obj).parent().parent().parent().parent().find(".checked").removeClass("checked");
	$(obj).parent().attr("class","checked");
	$(obj).attr("class","checked");
}

/*
 * text:提示内容
 * title:表示标题内容
 */
g.success = function(text,title) {
	if(!title) {
		title = "i18n.module.global.prompt.msg.operatesuccess";
	}
	g.alert("success", text,title);
}
// 消息提示
g.info = function(text) {
	g.alert("info", text,"i18n.module.global.prompt.msg.info");
}

// 危险
g.danger = function(text) {
	g.alert("error", text,"i18n.module.global.prompt.msg.unknownerror");
}

// 警告
g.warning = function(text) {
	g.alert("warning", text,"i18n.module.global.prompt.msg.operatefailure");
}

var isInitAlert = false;

g.alert = function(type, text,title) {
	if(!isInitAlert) {
		toastr.options = {
				  "closeButton": true,
				  "debug": false,
				  "positionClass": "toast-top-right",
				  "onclick": null,
				  "showDuration": "1000",
				  "hideDuration": "1000",
				  "timeOut": "5000",
				  "extendedTimeOut": "1000",
				  "showEasing": "swing",
				  "hideEasing": "linear",
				  "showMethod": "fadeIn",
				  "hideMethod": "fadeOut"
			};
		isInitAlert = true;
	}
	toastr[type](text, title);
}
g.loadTable = function(div) {
}
//设置固定表头的table高度
g.fixWrapperTable = function(wraperInfo, $actionTarget, $wraperTable) {
	if($actionTarget == null) {
		$actionTarget = $("."+wraperInfo);
		$wraperTable = $actionTarget.data("wraperTable");
	}
	if($actionTarget == null || $actionTarget.length == 0) {
		return;
	}
	if($wraperTable == null) {
		$wraperTable = $actionTarget.parent().parent().find(".wraper_div_zz");
		$actionTarget.data("wraperTable", $wraperTable);
	}
	var offsetLen = 0;
	if($actionTarget.parents(".page-container").find(".bottom-height-84").length > 0) {
		offsetLen = 84;
	}
	if($actionTarget.parents(".page-container").find(".bottom-height-54").length > 0) {
		offsetLen = 14;
	}
	//高度控制
	var wrapperHeight = $(window).height() - $("#page-header-container").height() - 55 - offsetLen;
	var $tabContent = $("#main-container").find(".tab-content > .active").first();
	var formHeight = 0;
	//普通查询表单高度
	if($($tabContent.find("form")[0]).find("div")[0]&&$($($tabContent.find("form")[0]).find("div")[0]).style!="undefined"&&$($tabContent.find("form")[0]).find("div")[0].style.display!="none"){
			formHeight = $tabContent.find("form").height();
	} else{
		//高级查询表单高度
		if($($tabContent.find("form")[1])!="undefined"){
			formHeight = $($tabContent.find("form")[1]).height();
		}
	}
	var contentHeight = $tabContent.find(".portlet-header").height()  + formHeight + $actionTarget.height();
	var elseHeight = $tabContent.find(".bottom_paging").height();
	wrapperHeight = wrapperHeight - contentHeight;
	if(elseHeight!=null){
		wrapperHeight = wrapperHeight - elseHeight;
	}
	//是否包含jstree
	if($actionTarget.hasClass("treeContain") || $actionTarget.hasClass("treeContain1")){
		wrapperHeight=wrapperHeight-12;
	}
//	if(wrapperHeight<245){
//		wrapperHeight=200;
//		$(target+"_wrapper").parent(".slimScrollDiv").css("margin-bottom","45px");
//	}
	//计算出错时，设置最小高度
	if(wrapperHeight<=0||wrapperHeight==undefined){
		wrapperHeight = 150;
	}
	$wraperTable.height(wrapperHeight);
	var $wraperInfo = $actionTarget.data("wraperInfo");
	if($wraperInfo == null) {
		var random = Math.random()+"";
		random = random.substring(2);
		$wraperInfo = "table_wrp_inf_" + random;
		$actionTarget.addClass($wraperInfo);
		$actionTarget.data("wraperTable", $wraperTable);
		$actionTarget.data("wraperInfo", $wraperInfo);
	}
	//$(target+"_wrapper").parent(".slimScrollDiv").height(wrapperHeight);
	if($.inArray($wraperInfo, g.wrapperTableInfo) == -1) {
		g.wrapperTableInfo.push($wraperInfo);
	}
}
/**
 * 展开
 */
g.expandTable = function($div, event, e) {
	var $event = $(event);
	var expandUrl = $div.data("expand-url");
	var flag = $event.data("id");
	var url = expandUrl + flag;
	if (url.indexOf("?") > -1) {
		url += "&timestamp=" + new Date().getTime();
	} else {
		url += "?timestamp=" + new Date().getTime();
	}
	$.ajax({
		type:'get',
		url:url,
		success:function(data){
			if($event.find(".row-details").hasClass("row-details-open")) {
				var size = $(event).parent().find("tr:first").find("td").length;
				var html = "<tr class='details'><td class='details' colspan="+size+"><div class='commodity_list'>";
				html += data;
				html += "</div></td></tr>";
				$(html).insertAfter($event);
				if(e) {
					$(e).data("loaded", true);//将状态改为加载完毕
				}
			}
		},
		error:function() {
			g.warning("i18n.pages.global.msg.10");
			$tab_content.children('div').eq(i).html("i18n.pages.global.msg.10");
			if(e) {
				$(e).data("loaded", false);
			}
			$event.find(".row-details").addClass("row-details-close").removeClass("row-details-open");
//			isLoaded = true;
		}
	});
//	$.get(url, null, function(data) {
//		if($event.find(".row-details").hasClass("row-details-open")) {
//			var size = $(event).parent().find("tr:first").find("td").length;
//			var html = "<tr class='details'><td class='details' colspan="+size+"><div class='commodity_list'>";
//			html += data;
//			html += "</div></td></tr>";
//			$(html).insertAfter($event);
//			if(e) {
//				$(e).data("loaded", false);
//			}
//		}
////		$event.after(html);
////		$event.next().find(".commodity_list").html(data);
//		//$event.parent().find(".details").remove();
//	});
}
/***
 * 展开-- 包含局部刷新：在重新插入之前，去除 掉之前存在的数据
 */
g.expandTable2 = function($div, event, e) {
	var $event = $(event);
	var expandUrl = $div.data("expand-url");
	var flag = $event.data("id");
	var url = expandUrl + flag;
	if (url.indexOf("?") > -1) {
		url += "&timestamp=" + new Date().getTime();
	} else {
		url += "?timestamp=" + new Date().getTime();
	}
	$.ajax({
		type:'get',
		url:url,
		success:function(data){
			if($event.find(".row-details").hasClass("row-details-open")) {
				var size = $(event).parent().find("tr:first").find("td").length;
				var html = "<tr class='details'><td class='details' colspan="+size+"><div class='commodity_list'>";
				html += data;
				html += "</div></td></tr>";
				$event.next("tr").remove();//在重新插入之前，去除 掉之前存在的数据
				$(html).insertAfter($event);
				if(e) {
					$(e).data("loaded", true);//将状态改为加载完毕
				}
			}
		},
		error:function() {
			g.warning("i18n.pages.global.msg.10");
			$tab_content.children('div').eq(i).html("i18n.pages.global.msg.10");
			if(e) {
				$(e).data("loaded", false);
			}
			$event.find(".row-details").addClass("row-details-close").removeClass("row-details-open");
		}
	});
}

g.closeCurrentWindow = function() {
	$(".nav-tabs li.active:not('.tabdrop') .closebtn").click();
}

/**

 * table加载数据，专为分页
 * 
 * @param target
 *            指定的div id id"
 * @param url
 *            xxxx/pageNumber/pageSize
 * @param dataForm
 *            查询条件
 * @param isFixHead
 *            是否固定表头，默认固定
 */
g.table = function(target, url, dataForm, isFixHead, isTargetLoading, actionEvent) {
	var isTargetLoading = isTargetLoading == null ? false : isTargetLoading == true ? true : false;
//	var loadingStatus = $(target).data("loading");
//	if(loadingStatus != null && loadingStatus == true) {
//		g.info("i18n.pages.global.msg.21");
//		return;
//	}
	var $actionTarget = null;
	var $wraperTarget = null;
	if(actionEvent == null) {
//		var $rootContainer = $(target).parents(".page-container");
//		if($rootContainer.length == 0) {
//			$rootContainer = $(target).parents(".page-content");
//		}
		$actionTarget = $(target);
		$wraperTarget = $(target + "_wrapper");
	} else {
		var $rootContainer = $(actionEvent).parents(".tab-pane.active");
		if($rootContainer.length == 0) {
			$rootContainer = $(actionEvent).parents(".page-container");
		}
		if($rootContainer.length == 0) {
			$rootContainer = $(actionEvent).parents(".page-content");
		}
		$actionTarget = $rootContainer.find(target);
		$wraperTarget = $rootContainer.find(target + "_wrapper");
	}
	if($actionTarget.data("autoback") != false) {
		var $processPanel = $actionTarget.parents(".tab-pane");
//		console.log("=================================================");
//		console.log(target);
//		console.log($actionTarget);
//		console.log($processPanel);
		if($processPanel != null && $processPanel.length > 0) {
//			console.log($processPanel);
//			console.log($processPanel.data("info"));
			var $processNav = $("#ul_nav_tabs.nav-tabs>li[data-info='"+$processPanel.data("info")+"']");
			if($processNav.hasClass("hide")) {
				$processNav = $("#ul_nav_tabs.nav-tabs #child_ul_nav_tabs>li[data-info='"+$processPanel.data("info")+"']");
			}
//			console.log($processNav);
//			console.log($actionTarget.is(":hidden"));
			if($actionTarget.is(":hidden")) {
				$processNav.click();
			}
		}
	}
//	console.log("=================================================");
	$actionTarget.data("loading", true);
	//移除全选标记
	$actionTarget.attr("data-all","");
	if (url.indexOf("?") > -1) {
		url += "&timestamp=" + new Date().getTime();
	} else {
		url += "?timestamp=" + new Date().getTime();
	}
	var blockDiv= $actionTarget.parents(".container").first();
	if(isTargetLoading) {
		blockDiv = $actionTarget;
	}
	blockDiv.addClass("block_"+target.substring(1));
	// loading
	Metronic.blockUI({target:".container.block_"+target.substring(1)});
	// 删除已有的head,body,分页
	$actionTarget.empty();
	$actionTarget.data("loaded", "no");
	if ($wraperTarget.length > 0) {
		//移除上次的定时渲染
		var st = $actionTarget.data("st");
		if(st){
			clearTimeout(st);
		}
		//移除分页组件
		$wraperTarget.parent().parent().find(".bottom_paging").remove();
		//移除table
		//	$(target + "_wrapper").parent(".slimScrollDiv").remove();
		//移除自己（当没有slimScrollDiv时）
		$wraperTarget.remove();
	} else {
		$actionTarget.next().remove();
	}
	$wraperTarget = [];
	var info = $actionTarget.parents(".tab-pane").data("info");
	$("#ul_nav_tabs >li[data-info='"+info+"']").data("loading", true);
	// 查询
	var index = url.lastIndexOf("/");
	var condition = url.substring(url.lastIndexOf("?")); 
	var defaultPageSize = url.substring(index+1, url.lastIndexOf("?"));
	url = url.substring(0, index + 1);
	url = url + g.getCurPageSize(target,defaultPageSize);// 取cookie保留的每页大
	$.post(url+condition, dataForm, function(data) {
		setTimeout(function(){
			loadData(target,data, isFixHead, $actionTarget, $wraperTarget);
		},15);
	}).error(function() {$actionTarget.data("loading", false);$actionTarget.data("loaded", "yes");
	var info = $actionTarget.parents(".tab-pane").data("info");
	$("#ul_nav_tabs >li[data-info='"+info+"']").data("loading", false);
	Metronic.unblockUI(".container.block_"+target.substring(1));
	blockDiv.removeClass("block_"+target.substring(1));});
	
	//
	var loadData=function(target,data, isFixHead, $actionTarget, $wraperTarget){
		if ($wraperTarget.length > 0) {
			//移除上次的定时渲染
			var st = $actionTarget.data("st");
			if(st){
				clearTimeout(st);
			}
			//移除分页组件
			$wraperTarget.parent().parent().find(".bottom_paging").remove();
			//移除table
			//	$(target + "_wrapper").parent(".slimScrollDiv").remove();
			//移除自己（当没有slimScrollDiv时）
			$wraperTarget.remove();
		} else {
			$actionTarget.next().remove();
			changeButtonStatus(target,false, $actionTarget, $wraperTarget);
		}
		var loadingLiInfo = $actionTarget.parents(".tab-pane").data("info");
		//截取script
//		var scriptContent = data.substring(data.lastIndexOf("</table>")+8);
//		var inType = 0;
//		if(data.lastIndexOf("</form>")+7!=-1){
//			scriptContent = data.substring(data.lastIndexOf("</form>")+7);
//			inType = 1;
//		}
//		if(scriptContent.indexOf("<script")>=3||scriptContent.indexOf("<script")==-1){
//			scriptContent = "";
//		}else{
//			if(inType==0){
//				data = data.substring(0,data.lastIndexOf("</table>")+8);
//			}else{
//				data = data.substring(0,data.lastIndexOf("</form>")+7);
//			}
//		}
		var scriptContent = "";
		var endTag = $(data).attr("endTag");
		//截取script 页面表格数据加载完成以后再加载scripta
		if(endTag!="undefined"&&endTag!=undefined){
//			if(endTag=="table"){
				scriptContent = data.substring(data.lastIndexOf("</"+endTag+">")+(endTag.length+3));
//				scriptContent = data.substring(data.lastIndexOf("</table>")+8);
//			}else if(endTag=="form"){
//				scriptContent = data.substring(data.lastIndexOf("</form>")+7);
//			}
		}
		if(scriptContent.indexOf("<script")>=3||scriptContent.indexOf("<script")==-1){
			scriptContent = "";
		}else{
//			if(endTag=="table"){
//				data = data.substring(0,data.lastIndexOf("</table>")+8);
//			}else if(endTag=="form"){
//				data = data.substring(0,data.lastIndexOf("</form>")+7);
//			}
			data = data.substring(0,data.lastIndexOf("</"+endTag+">")+(endTag.length+3));
		}
		var size =100;
		var $data= $(data);
		if($actionTarget.hasClass("expandTable")) {
			var nCloneTh = document.createElement('th');
             $(nCloneTh).css("width",30);
			// nCloneTh.className = "table-checkbox";
			var nCloneTd = document.createElement('td');
			 $(nCloneTd).css("width", 30);
			nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';
			nCloneTh.innerHTML = '<span class="row-details row-details-close"></span>';
			$data.addClass("dataTable");
			$data.find('thead tr').each(function () {
				if($(this).find("th:eq(0)").find("input").length > 0) {
					 $(nCloneTh).insertBefore($(this).find("th:eq(1)"));
				} else {
					 $(nCloneTh).insertBefore($(this).find("th:eq(0)"));
				}
			});
			$data.find('tbody tr').each(function () {
				if($(this).find("td:eq(0)").find("input").length > 0) {
					 $(nCloneTd).clone().insertBefore($(this).find("td:eq(1)"));
				} else {
					 $(nCloneTd).clone().insertBefore($(this).find("td:eq(0)"));
				}
			});
		}
		var $tbodyClone = $data.find("tbody").clone();
		$data.find("tbody tr").remove();
		var $firstTen = $tbodyClone.find("tr:lt("+size+")");
		$data.find("tbody").append($firstTen.clone());
		$actionTarget.html($data);
		$.each($data.find("tr td"),function(){
//			replaceSpace($(this));
		});
		$firstTen.remove();
		Metronic.unblockUI(".container.block_"+target.substring(1));
		blockDiv.removeClass("block_"+target.substring(1));
		if((isFixHead || typeof isFixHead == 'undefined')&&$data.length>0){
			g.fixHead(target, $actionTarget, $wraperTarget);
			if($wraperTarget == null || $wraperTarget.length == 0) {
				$wraperTarget = $actionTarget.parent().find(target + "_wrapper");
			}
			g.fixWrapperTable(target, $actionTarget, $wraperTarget);
		}
		if($wraperTarget == null || $wraperTarget.length == 0) {
			$wraperTarget = $actionTarget.parent().find(target + "_wrapper");
		}
		//
		if(isFixHead || typeof isFixHead == 'undefined'){
			//
			if($(target+"_wrapper").find("tbody tr").length == 0) {
				//nullDataAlert 表格无数据时添加提示
				$actionTarget.find("table").after(scriptContent);
				nullDataInfo($actionTarget, $wraperTarget);
				changeButtonStatus(target,true, $actionTarget, $wraperTarget);
				$actionTarget.data("loading", false);
				$("#ul_nav_tabs >li[data-info='"+loadingLiInfo+"']").data("loading", false);
				var onloaded = $(data).data("onloaded");
				if(onloaded) {
					eval(onloaded);
				} else {
					onloaded = $actionTarget.data("onloaded");
					if(onloaded) {
						eval(onloaded);
					}
				}
				return;
			}
		} else if($actionTarget.find("tbody tr").length == 0) {
			//nullDataAlert 表格无数据时添加提示
			$actionTarget.find("table").after(scriptContent);
			nullDataInfo($actionTarget, $wraperTarget);
			changeButtonStatus(target,true, $actionTarget, $wraperTarget);
			$actionTarget.data("loading", false);
			$("#ul_nav_tabs >li[data-info='"+loadingLiInfo+"']").data("loading", false);
			var onloaded = $(data).data("onloaded");
			if(onloaded) {
				eval(onloaded);
			} else {
				onloaded = $actionTarget.data("onloaded");
				if(onloaded) {
					eval(onloaded);
				}
			}
			return;
		}
		//
		var times = parseInt(($tbodyClone.find("tr").length + (size-1))/size);
		//
		$actionTarget.data("loaded", "no");
		//列表选择不可用
		g.changDisabledChecked(target.substring(1));
		var $targetDataBody = $(target+"_wrapper").find("table tbody");
		var $targetDataBody2 = $actionTarget.find("table tbody");
		var startTime = Date.parse(new Date());
		var tableTrLen = $tbodyClone.find("tr").length;
		var timer = function() {
			var loaded__ = $actionTarget.data("loaded");
			if(loaded__ == null || loaded__ == undefined) {
				return;
			}
			times--;
			var $child = $tbodyClone.find("tr:lt("+size+")");
//			$.each($child.find("td"),function(){
//				replaceSpace($(this));
//			});
			if(isFixHead || typeof isFixHead == 'undefined') {
				$targetDataBody.append($child.clone());
			} else {
				$targetDataBody2.append($child.clone());
			}
			$child.remove();
			if(times > 0) {
				var st = setTimeout(function(){
					timer();
					
				},1);
				$actionTarget.data("st",st);
			} else {
				var endTime = Date.parse(new Date());
				console.log("数据量："+tableTrLen+"；耗时："+(endTime - startTime)+" 毫秒");
				//数据加载完成设置列表选择列可用
				g.changEnableChecked(target.substring(1));
				
				changeButtonStatus(target,true, $actionTarget, $wraperTarget);
				//$(target).find("table").after(scriptContent);
				addCheckbox1(target, $actionTarget, $wraperTarget);
				bindSort(target, url, dataForm, isFixHead, $actionTarget, $wraperTarget);	
				$actionTarget.find("table").after(scriptContent);
				if($(g.mainModal.id).html()) {
					g.mainModal.resize();
				}
				if($(g.assistModal.id).html()) {
					g.assistModal.resize();
				}
				var onloaded = $(data).data("onloaded");
				if(onloaded) {
					eval(onloaded);
				} else {
					onloaded = $actionTarget.data("onloaded");
					if(onloaded) {
						eval(onloaded);
					}
				}
				$actionTarget.data("loading", false);
				$actionTarget.data("loaded", "yes");
				$("#ul_nav_tabs >li[data-info='"+loadingLiInfo+"']").data("loading", false);
				$actionTarget.parent().find('tbody tr td .row-details').unbind("click").click(function () {
					if($(this).data("loaded") == false) {
						g.info("i18n.module.global.msg.loading");
						return;
					}
					$(this).data("loaded", false);
					if($actionTarget.data("loaded") == 'yes') {
						var nTr = $(this).parents('tr')[0];
				        if ($(this).hasClass("row-details-open")) {
				            /* This row is already open - close it */
				        	$(nTr).next().remove();
							$(this).data("loaded", true);
							$(this).addClass("row-details-close").removeClass("row-details-open");
				    		//$(nTr).parent().find(".details").remove();
				        } else {
				            /* Open this row */
				        	g.expandTable($actionTarget, nTr, $(this));
				        	$(this).addClass("row-details-open").removeClass("row-details-close");
				        	//$table.fnOpen(nTr, fnFormatDetails($table, nTr), 'details');
				        }
					} else {
						g.info("i18n.module.global.msg.loading");
						$(this).data("loaded", true);
					}
			    });
				if($actionTarget.parent().find('thead tr th .row-details').length > 0) {
					$actionTarget.parent().find('thead tr th .row-details').unbind("click").click(function () {
						var vthis = $(this);
						var flag = true;
						$actionTarget.parent().find('tbody tr td .row-details').each(function () {
							if ($(this).data("loaded") == false) {
								flag=false;
								return false;
							} 
						});
						if($(this).data("loaded") == false || !flag) {
							g.info("i18n.module.global.msg.loading");
							return;
						}
						$(this).data("loaded", false);//将状态设为加载中
						if($actionTarget.data("loaded") == 'yes') {
							if ($(this).hasClass("row-details-open")) {
					        	$actionTarget.parent().find('tbody tr td .row-details').each(function () {
					        		var nTr = $(this).parents('tr')[0];
					        		if ($(this).hasClass("row-details-open")) {
					        			//进入移除展开信息
					        			$(this).data("loaded",false);//将状态设为加载中
					        			$(nTr).next().remove();
					        			$(this).data("loaded",true);//将状态设为加载完毕
					        			$(this).addClass("row-details-close").removeClass("row-details-open");
							        } 
								});
								$(this).data("loaded", true);
				        		$(this).addClass("row-details-close").removeClass("row-details-open");
					        } else {
					        	$actionTarget.parent().find('tbody tr td .row-details').each(function () {
					        		var nTr = $(this).parents('tr')[0];
						        	if ($(this).hasClass("row-details-close")) {
						        		//进入展开信息
						        		g.expandTable($actionTarget, nTr, $(this));
						        		$(this).data("loaded",false);
						        		$(this).addClass("row-details-open").removeClass("row-details-close");
							        } 
								});
					        	$(this).data("loaded", true);
				        		$(this).addClass("row-details-open").removeClass("row-details-close");
					        }
						} else {
							g.info("i18n.module.global.msg.loading");
							$(this).data("loaded", true);
						}
				    });
				}
				g.handleUniform();
			}
		}
		if(times > 0){
			timer();
		} else {
			//数据加载完成设置列表选择列可用
			g.changEnableChecked(target.substring(1));
			changeButtonStatus(target,true, $actionTarget, $wraperTarget);
			var onloaded = $(data).data("onloaded");
			if(onloaded) {
				eval(onloaded);
			} else {
				onloaded = $actionTarget.data("onloaded");
				if(onloaded) {
					eval(onloaded);
				}
			}
			addCheckbox1(target, $actionTarget, $wraperTarget);
			bindSort(target, url, dataForm, isFixHead, $actionTarget, $wraperTarget);
			$actionTarget.find("table").after(scriptContent);
			if($(g.mainModal.id).html()) {
				g.mainModal.resize();
			}
			if($(g.assistModal.id).html()) {
				g.assistModal.resize();
			}
			//Metronic.initSlimScroll('.scroller');
			$actionTarget.parent().find('tbody tr td .row-details').unbind("click").click(function () {
				if($(this).data("loaded") == false) {
					g.info("i18n.module.global.msg.loading");
					return;
				}
				$(this).data("loaded", false);
				if($actionTarget.data("loaded") == 'yes') {
					var nTr = $(this).parents('tr')[0];
			        if ($(this).hasClass("row-details-open")) {
			            /* This row is already open - close it */
			        	$(nTr).next().remove();
						$(this).data("loaded", true);
						$(this).addClass("row-details-close").removeClass("row-details-open");
			    		//$(nTr).parent().find(".details").remove();
			        } else {
			            /* Open this row */
			        	g.expandTable($actionTarget, nTr, $(this));
			        	$(this).addClass("row-details-open").removeClass("row-details-close");
			        	//$table.fnOpen(nTr, fnFormatDetails($table, nTr), 'details');
			        }
				} else {
					g.info("i18n.module.global.msg.loading");
					$(this).data("loaded", true);
				}
		    });

			$actionTarget.parent().find('thead tr th .row-details').unbind("click").click(function () {
				var vthis = $(this);
				var flag = true;
				$actionTarget.parent().find('tbody tr td .row-details').each(function () {
					if ($(this).data("loaded") == false) {
						flag=false;
						return false;
					} 
				});
				if($(this).data("loaded") == false || !flag) {
					g.info("i18n.module.global.msg.loading");
					return;
				}
				$(this).data("loaded", false);//将状态设为加载中
				if($actionTarget.data("loaded") == 'yes') {
					if ($(this).hasClass("row-details-open")) {
			        	$actionTarget.parent().find('tbody tr td .row-details').each(function () {
			        		var nTr = $(this).parents('tr')[0];
			        		if ($(this).hasClass("row-details-open")) {
			        			//进入移除展开信息
			        			$(this).data("loaded",false);//将状态设为加载中
			        			$(nTr).next().remove();
			        			$(this).data("loaded",true);//将状态设为加载完毕
			        			$(this).addClass("row-details-close").removeClass("row-details-open");
					        } 
						});
						$(this).data("loaded", true);
		        		$(this).addClass("row-details-close").removeClass("row-details-open");
			        } else {
			        	$actionTarget.parent().find('tbody tr td .row-details').each(function () {
			        		var nTr = $(this).parents('tr')[0];
				        	if ($(this).hasClass("row-details-close")) {
				        		//进入展开信息
				        		g.expandTable($actionTarget, nTr, $(this));
				        		$(this).data("loaded",false);
				        		$(this).addClass("row-details-open").removeClass("row-details-close");
					        } 
						});
			        	$(this).data("loaded", true);
		        		$(this).addClass("row-details-open").removeClass("row-details-close");
			        }
				} else {
					g.info("i18n.module.global.msg.loading");
					$(this).data("loaded", true);
				}
		    });
			$actionTarget.data("loaded", "yes");
			g.handleUniform();
			$actionTarget.data("loading", false);
			$("#ul_nav_tabs >li[data-info='"+loadingLiInfo+"']").data("loading", false);
			
		}
	}
	
	//替换空白符
	var replaceSpace = function(obj){
//		if($(obj).find("input,select,img,i").length<=0){
		if($(obj).find(" > *").length>0){
			$.each($(obj).find(" > *"),function(){
				if($(this).find(" > *").length>0){
					replaceSpace($(this));
				}else{
					if($.trim($(this).text())!=""){
//						if($(this).attr("flag")!=undefined&&$(this).attr("flag")=="colContent"){
//							return true;
//						}else{
							var text = $.trim($(this).text());
							text = text.replace(/ /g, "&nbsp;");
							$(this).html(text);
//						}
					}else{
						$(this).text("");
					}
				}
			});
		}else{
			if($.trim($(obj).text())!=""){
				var text = $.trim($(obj).text());
				text = text.replace(/ /g, "&nbsp;");
				$(obj).html(text);
			}
		}
//		}
	};
	
	var addCheckbox1 = function(divId, $actionTarget, $wraperTarget) {
		var $thr = $actionTarget.find('table thead tr');
		if($thr.find("div").length == 0) {
			addCheckbox(divId, $actionTarget, $wraperTarget);
			return;
		}
		$thr.find("input[type='checkbox']").parent().css('text-align',"left");
		//“全反选”复选框
		var $checkAll = $thr.find("input[type='checkbox']").first();
		$checkAll.parents("div.checker.disabled").removeClass("disabled");
		$checkAll.click(function(event){
//			$tbr.find("input[type='checkbox']").prop('checked',$(this).prop('checked'));
			/*并调整所有选中行的CSS样式*/
			if ($(this).prop('checked')) {
				var $trs = $tbr.find("input[type='checkbox']");
				for(var i = 0 ; i < $trs.length ; i++){
					var $tr=$($trs[i]);
					if (!$tr.prop('disabled')) {
						$tr.prop('checked',$(this).prop('checked'));
						$tr.parent().addClass('checked');
					}
				}
//				$tbr.find("input[type='checkbox']").parent().addClass('checked');
				$(this).parent().addClass('checked');
				//判断是否需要提示选中全部
				var all = $checkAll.attr("data-all");
				var totalP = $actionTarget.parent().parent().find(divId+"_totalPage").val();
				if(all&&all=='1'&&parseInt(totalP)>1){
					g.confirm1('i18n.module.global.prompt.msg.checkAll', function() {
						$actionTarget.attr("data-all","all");
						// 判断是否要加提示，有则提示相应的内容
						var $info = $checkAll.attr("data-info");
						if($info != null && $info != ''){
							g.info($info);
						}
					});
				}
			} else{
				var $trs = $tbr.find("input[type='checkbox']");
				for(var i = 0 ; i < $trs.length ; i++){
					var $tr=$($trs[i]);
					if (!$tr.prop('disabled')) {
						$tr.prop('checked',$(this).prop('checked'));
						$tr.parent().removeClass('checked');
					}
				}
//				$tbr.find("input[type='checkbox']").parent().removeClass('checked');
				$(this).parent().removeClass('checked');
				$actionTarget.attr("data-all","");
			}
			/*阻止向上冒泡，以防再次触发点击操*/
			event.stopPropagation();
		});
		$thr.find("th:eq(0)").click(function(){
			$checkAll.click();
		});
		var $tbr = $actionTarget.find('table tbody tr');
		if ($wraperTarget.length > 0) {
			$tbr = $wraperTarget.find('table tbody tr');
		}
		$tbr.find("div.checker.disabled").removeClass("disabled");
		/*点击每一行的选中复选框*/
		$tbr.find("input[type='checkbox']").click(function(event){
			/*如果已经被选中行的行数等于表格的数据行数，将全选框设为选中状态，否则设为未选中*/
			if($(this).prop("checked")){
				$(this).parent().addClass('checked');
				if($tbr.find('input:checked').length == $tbr.length){
					$checkAll.prop("checked",true);
					$checkAll.parent().addClass('checked');
					//$(divId).attr("data-all","all");
				}
			}else{
				$(this).parent().removeClass('checked');
				$checkAll.prop("checked",false);
				$checkAll.parent().removeClass('checked');
				$actionTarget.attr("data-all","");
			}
			/*阻止向上冒泡，以防再次触发点击操*/
			event.stopPropagation();
		});
		/*点击每一行时也触发该行的选中操作*/
		$tbr.click(function(e){
			if($(e.target).hasClass("row-details")) {
				return;
			}
			e = $(e.target);
			if($(e).hasClass("unclickevent") || $(e).hasClass("unclickevent1") || $(e).is('input') || $(e).is('button') || $(e).is('select') || $(e).is('textarea')|| $(e).is('a')|| $(e).is('i')) {
				return;
			}
			var canCheck=true;
			var tds = $(this).find("td");
			for(var i=0;i<tds.length;i++){
				$td=$(tds[i]);
				if(i>0){
//					if($td.find("input[type='checkbox']").length>0||$td.find("input[type='radio']").length>0||$td.find("input[type='text']").length>0||
//							$td.find("input[type='button']").length>0||$td.find("input[type='checkbox']").length>0||$td.find("select").length>0){
//						canCheck=false;
//						break;
//					}
				}
			}
			if(!canCheck){
				return;
				}
			$(this).find("input[type='checkbox']").click();
		});
		$tbr.find("div.checker").click(function(e){
			$(this).find("input[type='checkbox']").click();
		});
	};
	g.addCheckboxTr = function(divId,$tbr) {
		var $thr = $(divId).find('table thead tr');
		var $checkAll = $thr.find("input[type='checkbox']").first();
		$tbr.find("div.checker.disabled").removeClass("disabled");
		/*点击每一行的选中复选框*/
		$tbr.find("input[type='checkbox']").click(function(event){
			/*如果已经被选中行的行数等于表格的数据行数，将全选框设为选中状态，否则设为未选中*/
			if($(this).prop("checked")){
				$(this).parent().addClass('checked');
				if($tbr.find('input:checked').length == $tbr.length){
					$checkAll.prop("checked",true);
					$checkAll.parent().addClass('checked');
					$(divId).attr("data-all","all");
				}
			}else{
				$(this).parent().removeClass('checked');
				$checkAll.prop("checked",false);
				$checkAll.parent().removeClass('checked');
				$(divId).attr("data-all","");
			}
			/*阻止向上冒泡，以防再次触发点击操*/
			event.stopPropagation();
		});
		$tbr.find("div.checker").click(function(e){
			$(this).find("input[type='checkbox']").click();
		});
	};
	$actionTarget.data("x-url", url);
	$actionTarget.data("x-dataForm", dataForm);
	$actionTarget.data("x-fixHead", isFixHead);
	
	
	//表格无数据时添加提示
	var nullDataInfo = function ($actionTarget, $wraperTarget){
		if(isFixHead || typeof isFixHead == 'undefined') {
			if($wraperTarget.find("table tbody tr").length==0){
				if($actionTarget.find("table tbody").length > 0) {
					$actionTarget.append('<div class="no_result">'+'i18n.pages.global.dialog.table.nullData.info'+'</div>');
				} else {
					$actionTarget.next().append('<div class="no_result">'+'i18n.pages.global.dialog.table.nullData.info'+'</div>');
				}
			}
		} else if($actionTarget.find("table tbody tr").length==0) {
			$actionTarget.find("table tbody").parent().after('<div class="no_result">'+'i18n.pages.global.dialog.table.nullData.info'+'</div>');
		}
	}
	
	//给td添加title
	var addTitle = function (divId){
		var $tableData;
		if($(divId+"_wrapper").length > 0) { //若存在，表示是固定表头的，则会有两个table
			$tableData = $(divId+"_wrapper").find("table");
		} else {
			$tableData = $(divId).find("table");
		}
		var $dataTrs = $tableData.find("tbody tr");//tbody 的所有tr
		$dataTrs.each(function(trIdx, tr){
			$(tr).find("td").each(function(tdIdx, td){
				//添加title提示
				$(td).attr("title",$.trim($(td).text()));
			});
		});
	}
	
	//加载数据时查询按钮不可用
	var changeButtonStatus = function(target,isEnable, $actionTarget, $wraperTarget){
		if(!isEnable){
			$actionTarget.next().remove();
			var objSearch = $actionTarget.parent().parent().parent().find("button");
			if(objSearch!=undefined){
				if($.trim($(objSearch[0]).text())=="查询"){
					$(objSearch[0]).attr("disabled",true);
				}
				if(objSearch.length>1){
					if($.trim($(objSearch[1]).text())=="高级查询"){
						$(objSearch[1]).attr("disabled",true);
					}
				}
			}
		}else{
			var objSearch = $actionTarget.parent().parent().parent().find("button");
			if(objSearch!=undefined){
				if($.trim($(objSearch[0]).text())=="查询"){
					$(objSearch[0]).removeAttr("disabled");
				}
				if(objSearch.length>1){
					if($.trim($(objSearch[1]).text())=="高级查询"){
						$(objSearch[1]).removeAttr("disabled");
					}
				}
			}
		}
	}
	
	// 固定表头
	g.fixHead = function(divId, $actionTarget, $wraperDiv) {
		// 拼接div
		if(!$actionTarget.find("table").hasClass("list_table")) {
			$actionTarget.find("table").addClass("list_table")
		}
		$headTable =$actionTarget.find("table");
		var dataWidth=0;
		var resultWidth = 0;
		var padding = (window.navigator.userAgent.indexOf("Chrome") !== -1)?10:17;
		var windowWidth=$(window).width()-padding;
		//windowWidth = windowWidth - 30;
		//判断是否有jsTree
		if($actionTarget.hasClass("treeContain") || $actionTarget.hasClass("treeContain1")){
			windowWidth=windowWidth-282;
		}
		$actionTarget.find("table thead tr:first() th:visible").each(function(){
			var thWidth=$(this).attr("width");
			if (isNaN(thWidth)) {
				thWidth=parseInt($(this).width());
				thWidth+=13;
			}
			dataWidth += parseInt(thWidth==null?0:thWidth);
		});
		resultWidth=dataWidth>windowWidth?dataWidth:windowWidth;
		$headTable.css("width",(resultWidth)+"px");
		$actionTarget.css("padding-right",padding+"px");
		if (resultWidth > windowWidth) {
			resultWidth=(resultWidth+padding)+"px";
		}else{
			$headTable.css("width",(windowWidth-10)+"px");
		}
		
		var $cloneDiv = $actionTarget.clone();
		var cloneId = divId.substring(1, divId.length) + "_wrapper";
		if($actionTarget.parent().find("#"+cloneId).length>0){
			$cloneDiv = $actionTarget.parent().find("#"+cloneId);
		}else{
			$cloneDiv.html($cloneDiv.find("table"));
			$cloneDiv.attr("id", divId.substring(1, divId.length) + "_wrapper");
			$cloneDiv.find("table").attr("id", $cloneDiv.find("table").attr("id") + "_wrapper");
			$actionTarget.after($cloneDiv);
			// 把divId里面的分页div放在$cloneDiv后面
			var $pageDiv = $actionTarget.find(".bottom_paging").clone();
			if($actionTarget.hasClass("treeContain") || $actionTarget.hasClass("treeContain1")){
				$pageDiv.addClass("bottom_paging2");
			}
			$cloneDiv.after($pageDiv);
			// 把divId里面的分页div去掉
			$actionTarget.find(".bottom_paging").remove();
			$actionTarget.find("table tbody").remove();
		
			var $headInner = $("<div></div>");
			$headInner.html($actionTarget.find("table").clone());
			$cloneDiv.addClass("fixed_div scroll_bar");
		}
		$cloneDiv.addClass("wraper_div_zz");
		$cloneDiv.css({
			'overflow-x' : 'hidden',
			'overflow-y' : 'auto',
			'min-width' : '100%',
			'max-height' : '100%',
			"width":resultWidth
		});
		//$cloneDiv.addClass("scroller");
		$cloneDiv.css("padding-right",padding+"px");
		//$cloneDiv.attr("data-always-visible","1");
		//$cloneDiv.attr("data-rail-visible1","0");
		//$cloneDiv.attr("data-handle-color","#D7DCE2");
		
		$cloneDiv.find("thead tr").css({
			'display' : '0px'
		});
		$cloneDiv.find("thead tr th").each(function(i) {
			$(this).css({
				'padding' : '0px'
			});
			var $thDiv = $("<div></div>").html($(this).html());
			$thDiv.height(0);
			$(this).html($thDiv);
		});
		
	};
	// 表头绑定排序事件
	var bindSort = function(divId, url, dataForm, isFixHead, $actionTarget, $wraperTarget) {
		var $headThs = $actionTarget.find("tr th");// 表头数组
		if ($wraperTarget.length == 0) {// 若不是表头固定的，则只有一个table，则取当前的tbody
			$wraperTarget = $actionTarget.find("tbody");
		}
		var $trs = $wraperTarget.find("tbody tr");// 需要排序的所有tr
		$headThs.each(function(indexTh) {// 循环表头th，把每个binding事件
			if($(this).find("input[type='checkbox']").length>0&&indexTh==0){
				return true ;
			}
			if($.trim($(this).html())=="操作"){
				return true;
			}
			var orderByValue = $(this).attr("orderByValue");
			$(this).unbind('click').click(
					function() {
						var sortBy;// 排序方式，第一次为升序。若初始化的数据本来就是升序，则第一次点击相当于没反应
//						if ($(this).attr("sortBy") == "desc" || typeof $(this).attr("sortBy") == 'undefined') {
//							$(this).attr("sortBy", "asc");
//							sortBy = "asc";
//						} else if ($(this).attr("sortBy") == "asc") {
//							$(this).attr("sortBy", "desc");
//							sortBy = "desc";
//						}
						if(orderByValue!=undefined){
							if(g.oldOrderByValue!=(divId+orderByValue)){
								sortBy = "ASC";
							}else{
								if(g.oldOrderByWay=="ASC"){
									sortBy = "DESC";
								}else{
									sortBy = "ASC";
								}
							}
							var dataStr = [];
							if(dataForm!=null){
								dataStr = dataForm;
							}
							var exists = false;
							var index = -1;
							//如果存在排序字段 直接替换
							if(dataStr!=null&&dataStr!=""){
								$.each(dataStr, function() {
									if(this.name=="orderByValue"){
										exists = true;
										this.value = orderByValue;
										return true;
									}else if(this.name=="orderByWay"){
										this.value = sortBy;
										return true;
									}
								});
							}
							//不存在排序字段则封装到表头
							if(!exists){
								var obj1 = {
									 name : "orderByValue",
									 value : orderByValue
								}; 
								var obj2 = {
									 name : "orderByWay",
									 value : sortBy
								}; 
								var indexLength = 0;
								if(dataStr!=null&&dataStr!=""){
									indexLength = dataStr.length;
								}
								dataStr[dataStr.length]=obj1;
								dataStr[dataStr.length+1]=obj2;
							}
							//记录排序方式
							g.oldOrderByValue = divId+orderByValue;
							g.oldOrderByWay = sortBy;
							g.table(divId, url, dataStr, isFixHead, $actionTarget);
						}
						/*var sortArray = [];// 排序的结束
						$trs.each(function(indexTr) {// 对应当前th的td的行数及td的内容。对这个进行排序后，再给所有的tr对应着排序
							$(this).find("td").each(
								function(indexTd) {
									if (indexTd == indexTh) {
										sortArray.push({
											'index' : indexTr,
											'value' : $(this).html()
										});
									}
								});
						});
						if (sortArray.length > 0) {// 先对需要排序的字段进行排序
							sortArray.sort(getSortFun(sortBy,'value'));
							//console.log(JSON.stringify(sortArray));
							function getSortFun(order, sortBy) {
								var ordAlpah = (order == 'asc') ? '>' : '<';
								var sortFun = new Function('a', 'b', 'return a.' + sortBy + ordAlpah + 'b.' + sortBy + '?1:-1');
								return sortFun;
							}
							// 清空原有的tbody
							var $oldTbody = $tableData.find("tbody");
							// 给所有的tr对应着sortArray的顺序进行排序
							for (var i = 0; i < sortArray.length; i++) {
								$trs.each(function(index) {
									if (sortArray[i].index == index) {
										// 填充排序后的内容
										$($oldTbody.find("tr")[i]).replaceWith($(this).prop("outerHTML"));
									}
								});
							}
						}
						addCheckbox1(divId);*/
					});
			});
	};
	// 添加checkbox
	var addCheckbox = function(divId, $actionTarget, $wraperTarget) {
		var $tableHead = $actionTarget.find("table");
		var $tableData;
		if ($wraperTarget.length > 0) { // 若存在，表示是固定表头的，则会有两个table
			$tableData = $wraperTarget.find("table");
		} else {
			$tableData = $actionTarget.find("table");
		}
		var $firstTh = $tableHead.find("thead tr th").first();// 表头的th
		
		var $dataTrs = $tableData.find("tbody tr");// tbody 的所有tr
		// checkColum这个样式没有对应实现，只是为了标示此列需加checkbox
		if (!$firstTh.hasClass("checkColum") || $dataTrs.length == 0) {
			return;
		}
		
		// 添加表头复选框
		$firstTh.html("<div class='checker'><span><input type='checkbox' class='checkboxes checkColum'></span></div>");
		// head的checkbox选中事件
		$firstTh.find('input').unbind('click').click(function() {
			var checkMethod = $(this).is(":checked");
			var $thSpan = $firstTh.find("span");
			if (checkMethod) {
				$thSpan.addClass("checked");
			} else {
				$thSpan.removeClass("checked");
			}
			$(this).attr("checked", checkMethod);
			$dataTrs.each(function(idx, tr) {
				var $span = $(tr).find("td").first().find("span");
				if (checkMethod) {
					$span.addClass("checked");
				} else {
					$span.removeClass("checked");
				}
				var $checkBox = $(tr).find("td").first().find("input");
				$checkBox.attr("checked", checkMethod);
			});
		});
		$firstTh.removeClass("hide");
		$dataTrs.each(function(trIdx, tr) {
			// 获取表格数据第一列
			var $checkColumTd = $(tr).find("td").first();
			$checkColumTd.removeClass("hide");
			if($checkColumTd.data("value") != null) {
				$checkColumTd.html("<div class='checker' ><span><input type='checkbox' value='"
								+ $checkColumTd.data("value")
								+ "' class='checkboxes checkdata'></span></div>");
			} else {
				$checkColumTd.html("<div class='checker' ><span><input type='checkbox' value='"
						+ $checkColumTd.text()
						+ "' class='checkboxes checkdata'></span></div>");
			}
			$(tr).find("td").each(function(tdIdx, td) {
					var supportClick = $(td).attr("click");
					if (supportClick && (supportClick == "false" || supportClick == false)) {
						return false;
					}
					// td的input
					if (tdIdx == 0) {
						$(td).find("span").unbind('click').click(function(e) {
							var checkMethod = $(this).find("input").is(":checked");
							if (checkMethod) {
								$(this).find("input").attr("checked",true);
								$(td).find("span").addClass("checked");
							} else {
								$(td).find("span").removeClass("checked");
								$(this).find("input").attr("checked",false);
							}
						});
						$(td).find("input").unbind('click').click(function(e) {
							var checkMethod = $(this).attr("checked");
							if (!checkMethod) {
								$(this).attr("checked",true);
								$(this).parent().addClass("checked");
							} else {
								$(this).parent().removeClass("checked");
								$(this).attr("checked",false);
							}
						});
					} else {
						
					}
					//获取表格列数
					var tdlength =  $(tr).find("td").length;
					var oper = $.trim($tableHead.find("thead tr th").last().text());
					
					//屏蔽操作列的复选框选中事件
					if((tdlength!=(tdIdx+1)&&oper=='操作')||oper!='操作'){
						// td点击事件选中复选框
						$(td).unbind('click').click(function() {
							var $checkBox = $checkColumTd.find("input");
							if ($checkBox.is(":checked")) {
								$firstTh.find("span").removeClass("checked");
								$firstTh.find("input").attr("checked",false);
								$checkColumTd.find("span").removeClass("checked");
								$checkBox.attr("checked",false);
							} else {
								//$firstTh.find("span").addClass("checked");
								$checkColumTd.find("span").addClass("checked");
								$checkBox.attr("checked",true);
								//是否选中表头复选框
								var totalRow = $tableData.find("tr").length;
								var checkRow = $($dataTrs).find("input[type='checkbox']:checked").length;
								if(checkRow==(totalRow-1)){
									$firstTh.find("span").addClass("checked");
								}
							}
						});
					}
				});
		});

	}

	return {
		// 选中的checkbox 的array
		selected : function() {
			var $table;
			if ($(target + "_wrapper").length == 0) {
				$table = $(target).find("table");
			} else {
				$table = $(target + "_wrapper").find("table");
			}
			var ids = [];
			if ($table.length > 0) {
				var $trs = $table.find("tbody tr");
				$trs.each(function(idx, tr) {
					var $checkcolum = $(tr).find("td").first().find("input");
					if ($checkcolum.is(":checked")) {
						ids.push($checkcolum.val());
					}
				});
			}
			return ids;
		},
		/**
		 * 选择的checkbox 的对象值
		 * fieldArr 为对象数组
		 * 对象包含两个字段
		 * field 字段名称
		 * type 字段类型(如input)
		 */
		selectedObject : function(fieldArr){
			if (fieldArr != null && fieldArr.length > 0) {
				var $table;
				if ($(target + "_wrapper").length == 0) {
					$table = $(target).find("table");
				} else {
					$table = $(target + "_wrapper").find("table");
				}
				if ($table.length > 0) {
					var $objArr = new Array();
					var $trs = $table.find("tbody tr");
					var $i = 0;
					$trs.each(function(idx, tr) {
						var $checkcolum = $(tr).find("td").first().find("input");
						if ($checkcolum.is(":checked")) {
							var $obj = new Object();
							$obj.id = $checkcolum.val();
							for (var j = 0; j < fieldArr.length; j++) {
								var $fieldObj = fieldArr[j];
								$obj[$fieldObj.field] = $(tr).find("td").find($fieldObj.type + "[field=" + $fieldObj.field +"]").val();
							}
							$objArr[$i++] = $obj;
						}
					});
					return $objArr;
				}
			}
			return null;
		},
	}
	
};

// 分页代码
g.page = {
	// 第一页
	firstPage : function(target, event) {
		var $rootContainer = $(event).parents(".page-container");
		if($rootContainer.length == 0) {
			$rootContainer = $(event).parents(".page-content");
		}
		if($rootContainer.length == 0) {
			$rootContainer = $(event).parents(".modal-dialog");
		}
		var $actionTarget = $rootContainer.find(target);
		var tableInfo = g.tableInfo["'" + target + "'"];
		var url = $actionTarget.data("x-url");
		// 查询条件
		var dataForm = $actionTarget.data("x-dataForm");
		// 是否固定表头
		var fixHead = $actionTarget.data("x-fixHead");
		var args = url.split("/");
		// 分页信息
		var oldPageNumber = args[args.length - 2];
		var oldPageSize = args[args.length - 1];
		// 新请求的url
		var newUrl = url.substring(0, url.length - oldPageNumber.length
				- oldPageSize.length - 2)
				+ "/" + 1 + "/" + oldPageSize;
		// 查询
		g.table(target, newUrl, dataForm, fixHead, $actionTarget);
	},
	// 前一页
	prevPage : function(target, curPageNum, event) {
		var $rootContainer = $(event).parents(".page-container");
		if($rootContainer.length == 0) {
			$rootContainer = $(event).parents(".page-content");
		}
		if($rootContainer.length == 0) {
			$rootContainer = $(event).parents(".modal-dialog");
		}
		var $actionTarget = $rootContainer.find(target);
		var tableInfo = g.tableInfo["'" + target + "'"];
		var url = $actionTarget.data("x-url");
		// 查询条件
		var dataForm = $actionTarget.data("x-dataForm");
		// 是否固定表头
		var fixHead = $actionTarget.data("x-fixHead");
		var args = url.split("/");
		// 分页信息
		var oldPageNumber = args[args.length - 2];
		var oldPageSize = args[args.length - 1];
		// 新请求的url
		var newUrl = url.substring(0, url.length - oldPageNumber.length
				- oldPageSize.length - 2)
				+ "/" + (oldPageNumber - 1) + "/" + oldPageSize;
		// 查询
		g.table(target, newUrl, dataForm, fixHead, $actionTarget);
	},
	// 指定页数查询
	// target:指定的div id id"
	// pageNum: 指定的页码
	// o:当前对象this
	consPage : function(target, pageNum, event) {
		if(!$(event).parent().hasClass("active")){
			var $rootContainer = $(event).parents(".page-container");
			if($rootContainer.length == 0) {
				$rootContainer = $(event).parents(".page-content");
			}
			if($rootContainer.length == 0) {
				$rootContainer = $(event).parents(".modal-dialog");
			}
			var $actionTarget = $rootContainer.find(target);
			var url = $actionTarget.data("x-url");
			// 查询条件
			var dataForm = $actionTarget.data("x-dataForm");
			// 是否固定表头
			var fixHead = $actionTarget.data("x-fixHead");
			var args = url.split("/");
			// 分页信息
			var oldPageNumber = args[args.length - 2];
			var oldPageSize = args[args.length - 1];
			// 新请求的url
			var newUrl = url.substring(0, url.length - oldPageNumber.length
					- oldPageSize.length - 2)
					+ "/" + pageNum + "/" + oldPageSize;
			// 查询
			g.table(target, newUrl, dataForm, fixHead, $actionTarget);
		}
		
	},
	// 下一页
	// target:指定的div id id"
	// curPageNum: 当前页数
	// o:当前对象this
	nextPage : function(target, curPageNum, event) {
		var $rootContainer = $(event).parents(".page-container");
		if($rootContainer.length == 0) {
			$rootContainer = $(event).parents(".page-content");
		}
		if($rootContainer.length == 0) {
			$rootContainer = $(event).parents(".modal-dialog");
		}
		var $actionTarget = $rootContainer.find(target);
		var tableInfo = g.tableInfo["'" + target + "'"];
		var url = $actionTarget.data("x-url");
		// 查询条件
		var dataForm = $actionTarget.data("x-dataForm");
		// 是否固定表头
		var fixHead = $actionTarget.data("x-fixHead");
		var args = url.split("/");
		// 分页信息
		var oldPageNumber = args[args.length - 2];
		var oldPageSize = args[args.length - 1];
		// 下一页的页码
		var nextPageNum = curPageNum + 1;
		// 新请求的url
		var newUrl = url.substring(0, url.length - oldPageNumber.length
				- oldPageSize.length - 2)
				+ "/" + nextPageNum + "/" + oldPageSize;
		// 查询
		g.table(target, newUrl, dataForm, fixHead, $actionTarget);
	},
	// 最后一页
	lastPage : function(target, num, event) {
		var $rootContainer = $(event).parents(".page-container");
		if($rootContainer.length == 0) {
			$rootContainer = $(event).parents(".page-content");
		}
		if($rootContainer.length == 0) {
			$rootContainer = $(event).parents(".modal-dialog");
		}
		var $actionTarget = $rootContainer.find(target);
		var tableInfo = g.tableInfo["'" + target + "'"];
		var url = $actionTarget.data("x-url");
		// 查询条件
		var dataForm = $actionTarget.data("x-dataForm");
		// 是否固定表头
		var fixHead = $actionTarget.data("x-fixHead");
		var args = url.split("/");
		// 分页信息
		var oldPageNumber = args[args.length - 2];
		var oldPageSize = args[args.length - 1];
		// 新请求的url
		var newUrl = url.substring(0, url.length - oldPageNumber.length
				- oldPageSize.length - 2)
				+ "/" + num + "/" + oldPageSize;
		// 查询
		g.table(target, newUrl, dataForm, fixHead, $actionTarget);
	},
	changePageSize : function(target, event) {
		var $rootContainer = $(event).parents(".page-container");
		if($rootContainer.length == 0) {
			$rootContainer = $(event).parents(".page-content");
		}
		if($rootContainer.length == 0) {
			$rootContainer = $(event).parents(".modal-dialog");
		}
		var $actionTarget = $rootContainer.find(target);
		var url = $actionTarget.data("x-url");
		// 查询条件
		var dataForm = $actionTarget.data("x-dataForm");
		// 是否固定表头
		var fixHead = $actionTarget.data("x-fixHead");
		var args = url.split("/");
		// 分页信息
		var oldPageNumber = args[args.length - 2];
		var oldPageSize = args[args.length - 1];
		// 新请求的url
		var newUrl = url.substring(0, url.length - oldPageNumber.length
				- oldPageSize.length - 2)
				+ "/" + 1 + "/" + $(event).val();
		var expiresDate= new Date();
		expiresDate.setTime(expiresDate.getTime() + (20 * 365* 24 * 60 * 60 * 1000));
		$.cookie(target + "CurPageSize", $(event).val(), {
			  path : '/',//cookie的作用域
			  expires : expiresDate
			 });
		// 查询
		g.table(target, newUrl, dataForm, fixHead, $actionTarget);
	}
}

/**
 * post请求数据
 */
g.post = function(target, url, dataForm, beforeFun, afterFun) {
	if (typeof (beforeFun) != 'undefined') {
		beforeFun();
	}
	$.post(url, dataForm, function(data) {
		$(target).html(data);
		if (afterFun && typeof (afterFun) != 'undefined') {
			afterFun(data);
		}
	});
};
/**
 * 公共主弹出框
 */
g.mainModal = {
	id : "#publicMainModal",
	open : function(url, data, afterFun) {
		var status = false;
		if (url.indexOf("?") > -1) {
			url += "&timestamp=" + new Date().getTime();
		} else {
			url += "?timestamp=" + new Date().getTime();
		}
		$("#publicAssistModal").html("");
		$(g.mainModal.id).html("").modal({
		  'show' : true,
	      'backdrop' : 'static'
		}).load(url, data, function() {
			status = true;
			$(document).off('focusin.modal');//解决商品目录树弹层input框不能输入
			if (afterFun && typeof (afterFun) != 'undefined') {
				afterFun(data);
			}
			g.mainModal.resize();
			return;
		}).ajaxError(function(e) {
			if(status) {
				return;
			}
			g.info("i18n.pages.global.msg.10");
			$(g.assistModal.id).empty();
			$(g.assistModal.id).hide();
			$(".modal-backdrop").hide();
		}).on('hide.bs.modal',function(){
//			$(g.mainModal.id).empty();
		});
	},
	close : function() {
		$(g.mainModal.id).empty();
	},
	resize: function() {
		var maxHeight = $(window).height()*0.8;
	  	var height = $(g.mainModal.id).height() < maxHeight ? $(g.mainModal.id).height() : maxHeight;
	  	$(g.mainModal.id).css("top","20px").css("right","20px").css("left","20px");
	  	$(g.mainModal.id).find(".modal-body01").css("max-height",$(g.mainModal.id).height()-140);
	  	return;
	}
};
/**
 * 公共副弹出框
 */
g.assistModal = {
	id : "#publicAssistModal",
	open : function(url, data, afterFun) {
		var status = false;
		$(g.assistModal.id).html("").modal({
			  'show' : true,
		      'backdrop' : 'static'
		}).load(url, data, function() {
			status = true;
			$(document).off('focusin.modal');//解决商品目录树弹层input框不能输入
			if (afterFun && typeof (afterFun) != 'undefined') {
				afterFun(data);
			}
			g.assistModal.resize();
			$(g.assistModal.id).find("button[data-dismiss='modal']").click(function(){
				$(g.mainModal.id).css("display","block");
			});
		}).ajaxError(function(e) {
			if(status) {
				return;
			}
			g.info("i18n.pages.global.msg.10");
			$(g.assistModal.id).empty();
			$(g.assistModal.id).hide();
			$(".modal-backdrop").hide();
		}).on('hide.bs.modal',function(){
//			$(g.assistModal.id).empty();
		});
	},
	close : function() {
		$(g.assistModal.id).empty();
	},
	resize: function() {
		$(g.mainModal.id).css("display","none");
		$(g.assistModal.id).css("max-height","100%").css("width","100%").css("top","20px").css("padding","10px");
		$(g.assistModal.id).find(".modal-dialog-two").width($(g.assistModal.id).width()*0.8).css("max-width","1500px").css("min-width","480px").css("margin","0 auto");
	  	$(g.assistModal.id).find(".modal-body01").css("max-height",$(g.assistModal.id).height()-140);
	}
};

/**
 * 以下是激活新用户向导并且不允许用户作弊隐藏向导
 */
g.isRegisterUncomplete = function(company) {
	if (!company || company.length == 0) {
		g.userStatus = "UNCOMPLETE";
		$("#userGuideEvent").click();
		$("#userGuide .close").remove();
		document.onclick = function() {
			if (g.userStatus == "UNCOMPLETE") {
				if ($("#userGuide").is(":hidden")) {
					$("#userGuide").show();
				}
				if ($(".modal-backdrop").is(":hidden")) {
					$(".modal-backdrop").show();
				}
			}
		}
	}else{
		//弹出版本信息
		 var see=$("#home_login_user").val();
		   if(see=="true"){
			  /*  $("#latest_servsion").click(); */
		 	   g.mainModal.open("/version/seeVersion");
		   }
	}
};
/**
 * 多图上传
 */
g.multiImages = {
	myUploadImage : "",
	editor : "",
	id : "publicMultiImages",
	// 上传返回的url,每次调用open，将清空
	urls : [],
	//
	callback : "",
	//
	beforeInsertImage : function(t, arg) {
		for (var i = 0, a = arg.length; i < a; i++) {
			// 后台（目前使用的是七牛）返回的url
			g.multiImages.urls.push(arg[i].src);
		}
		if (g.multiImages.callback
				&& typeof g.multiImages.callback != 'undefined') {
			g.multiImages.callback();
		}
	},
	// 打开多图上传
	open : function(back) {
		// 清空urls
		g.multiImages.urls = [];
		// 更新callback
		g.multiImages.callback = back;
		// 初始化百度编辑器UEditor
		if (!g.multiImages.myUploadImage) {
			g.multiImages.editor = UE.getEditor(g.multiImages.id, {
				toolbars : [ [ "insertimage" ] ]
			});
		} else {
			g.multiImages.myUploadImage.render();
			g.multiImages.myUploadImage.open();
			
		}
		// 点击“确定”事件
		g.multiImages.editor.removeListener('beforeInsertImage',
				g.multiImages.beforeInsertImage);
		g.multiImages.editor.addListener('beforeInsertImage',
				g.multiImages.beforeInsertImage);
		// 监听editor加载完成
		g.multiImages.editor.addListener('ready', function(e) {
			g.multiImages.editor.setDisabled();
			g.multiImages.editor.hide();// 隐藏UE框体
			g.multiImages.myUploadImage = g.multiImages.editor
					.getDialog("insertimage");
			g.multiImages.myUploadImage.render();
			g.multiImages.myUploadImage.open();

		}, 100);
	}
};

g.getCurPageSize = function(id,defaultPageSize) {
	var curPageSize = $.cookie(id + "CurPageSize"); // 当前size
	if (curPageSize == 'undefined' || curPageSize == undefined) {
		curPageSize = defaultPageSize;
	}
	return curPageSize;
};

//
g.handleiCheck = function() {
    if (!$().iCheck) {
        return;
    }
    $('.icheck').each(function() {
        var checkboxClass = $(this).attr('data-checkbox') ? $(this).attr('data-checkbox') : 'icheckbox_minimal-grey';
        var radioClass = $(this).attr('data-radio') ? $(this).attr('data-radio') : 'iradio_minimal-grey';

        if (checkboxClass.indexOf('_line') > -1 || radioClass.indexOf('_line') > -1) {
            $(this).iCheck({
                checkboxClass: checkboxClass,
                radioClass: radioClass,
                insert: '<div class="icheck_line-icon"></div>' + $(this).attr("data-label")
            });
        } else {
            $(this).iCheck({
                checkboxClass: checkboxClass,
                radioClass: radioClass
            });
        }
    });
};


//check radio初始化
g.handleUniform = function() {
    if (!$().uniform) {
        return;
    }
    var test = $("input[type=checkbox]:not(.toggle, .md-check, .md-radiobtn, .treegridchkbox, .make-switch, .icheck, .acheck), input[type=radio]:not(.toggle, .md-check, .md-radiobtn, .treegridchkbox, .star, .make-switch, .icheck)");
    if (test.size() > 0) {
        test.each(function() {
            if ($(this).parents(".checker").size() === 0) {
                $(this).show();
                $(this).uniform();
            }
        });
    }
    /*g.handleiCheck();*/
};

/**
 * 表格列的隐藏和显示
 */
g.changTableListChecked = function(obj,currTableId){
	var value = $(obj).attr("data-list-value");
	if($(obj).parent().attr("class")=="checked"){
		$("#"+currTableId).find("tr th[data-list-value='"+value+"']").hide();
		$("#"+currTableId).find("tr td[data-list-value='"+value+"']").hide();
		$("#"+currTableId+"_wrapper").find("tr th[data-list-value='"+value+"']").hide();
		$("#"+currTableId+"_wrapper").find("tr td[data-list-value='"+value+"']").hide();
	}else{
		$("#"+currTableId).find("tr th[data-list-value='"+value+"']").show();
		$("#"+currTableId).find("tr td[data-list-value='"+value+"']").show();
		$("#"+currTableId+"_wrapper").find("tr th[data-list-value='"+value+"']").show();
		$("#"+currTableId+"_wrapper").find("tr td[data-list-value='"+value+"']").show();
	}
};
/**
 * 表格查询选择列不可用
 */
g.changDisabledChecked = function(formId){
	var checkboxs = $("#"+formId).find("input[type='checkbox'][data-list-value]").not("input[type='checkbox'][data-checked]");
	$(checkboxs).attr("checked",true);
	$(checkboxs).parent().attr("class","checked");
	$(checkboxs).attr("disabled","disabled");
	$(checkboxs).parent().parent().attr("class","checker disabled");
	
	var checkboxs2 = $("#"+formId).find("input[type='checkbox'][data-checked='false']");
	$(checkboxs2).attr("disabled","disabled");
	$(checkboxs2).parent().parent().attr("class","checker disabled");
	
};

g.changEnableChecked = function(formId){
	$("#"+formId).find("input[type='checkbox'][data-list-value]").attr("disabled",false);
	$("#"+formId).find("input[type='checkbox'][data-list-value]").parent().parent().removeClass("disabled");
};

g.checkboxList= function (divId){
	if($("#"+divId).find('input[type="checkbox"]').length>0){
		$("#"+divId).find('input[type="checkbox"][data-list-value]').each(function(){
			$(this).parent().addClass("checked");
		});
	}
};

//扩展表格事件绑定
g.bindExpandEvent = function(trObj,target) {
	$(trObj).find(".row-details").unbind("click").click(function () {
		var vthis = $(this);
		var flag = true;
		if ($(this).data("loaded") == false) {
			flag=false;
			return false;
		} 
		if($(this).data("loaded") == false || !flag) {
			g.info("i18n.module.global.msg.loading");
			return;
		}
		$(this).data("loaded", false);//将状态设为加载中
		if($(target).data("loaded") == 'yes') {
			if ($(this).hasClass("row-details-open")) {
	        		var nTr = $(this).parents('tr')[0];
	        		if ($(this).hasClass("row-details-open")) {
	        			//进入移除展开信息
	        			$(this).data("loaded",false);//将状态设为加载中
	        			$(nTr).next().remove();
	        			$(this).data("loaded",true);//将状态设为加载完毕
	        			$(this).addClass("row-details-close").removeClass("row-details-open");
			        } 
				$(this).data("loaded", true);
        		$(this).addClass("row-details-close").removeClass("row-details-open");
	        } else {
        		var nTr = $(this).parents('tr')[0];
	        	if ($(this).hasClass("row-details-close")) {
	        		//进入展开信息
	        		g.expandTable($(target), nTr, $(this));
	        		$(this).data("loaded",false);
	        		$(this).addClass("row-details-open").removeClass("row-details-close");
		        } 
	        	$(this).data("loaded", true);
        		$(this).addClass("row-details-open").removeClass("row-details-close");
	        }
		} else {
			g.info("i18n.module.global.msg.loading");
			$(this).data("loaded", true);
		}
    });
};

g.handleUniform2 = function(obj) {
    if (!$().uniform) {
        return;
    }
    var test = $(obj).find("input[type=checkbox]:not(.toggle, .md-check, .md-radiobtn, .treegridchkbox, .make-switch, .icheck, .acheck), input[type=radio]:not(.toggle, .md-check, .md-radiobtn, .treegridchkbox, .star, .make-switch, .icheck)");
    if (test.size() > 0) {
        test.each(function() {
            if ($(this).parents(".checker").size() === 0) {
                $(this).show();
                $(this).uniform();
            }
        });
    }
    /*g.handleiCheck();*/
};


//添加sku弹出框
g.SKUBox = function(id,callBack) {
	 g.mainModal.open("sku/selectSkuList?id="+id+"&callBack="+callBack);
};
//添加库存sku弹出框
g.stockSKUBox = function(id,callBack) {
	g.mainModal.open("stockSku/selectStockSkuList?id="+id+"&callBack="+callBack);
};
// 以下为闭包属性

String.prototype.strlen = function() {
	var len = 0;
	for (var i = 0; i < this.length; i++) {
		if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94) {
			len += 2;
		} else {
			len++;
		}
	}
	return parseInt(len);
}

//判断当前字符串是否以str开头先判断是否存在function是避免和js原生方法冲突，自定义方法的效率不如原生的
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
     return this.slice(0, str.length) == str;
  };
}

//判断当前字符串是否以str结束
if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function (str){
     return this.slice(-str.length) == str;
  };
}

jQuery.validator.addMethod("needOneExists", function(value, element, param) {
	if ((value && value.length == 0) || !value) {
		if(($(param).val() && $(param).val().length == 0) || !$(param).val()) {
			return false;
		}
		$(param).parents(".form-group").removeClass("has-error").find(".fa-warning").removeClass("fa-warning");
		return true;
	}
	$(param).parents(".form-group").removeClass("has-error").find(".fa-warning").removeClass("fa-warning");
	return true;
}, "两者必须填写一项");


/**
 * 联系电话匹配
 */
jQuery.validator.addMethod("phone", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	return this.optional(element) || /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(value) || /^(1)[0-9]{10}$/.test(value) ;
}, "i18n.pages.guide.label.51");

/**
 * 编码非中文验证
 */
jQuery.validator.addMethod("codeEncode", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	return this.optional(element) || /^[\w\-\.\s]+$/.test(value);
}, "i18n.pages.global.validate.msg.codeEncode");

/**
 * 编码非中文验证
 */
jQuery.validator.addMethod("codeEncode2", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	return this.optional(element) || !/[<>'"\u4e00-\u9fa5。？！,，、；：“”‘'（）《》〈〉【】『』「」﹃﹄〔〕…—～﹏￥]/gi.test(value);}, "i18n.pages.global.validate.msg.codeEncode2");

/**
 * 编码非特许字符验证
 */
jQuery.validator.addMethod("codeEncode3", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	return this.optional(element) || !/[<>'"。？！,，、；：“”‘'（）《》〈〉【】『』「」﹃﹄〔〕…—～﹏￥]/gi.test(value);
}, "i18n.pages.global.validate.msg.codeEncode3");

/**
 * 验证字母和数字
 */
jQuery.validator.addMethod("checkEnNum", function(value, element) {
	if (value == null || value.length == 0) {
		return true;
	}
	return this.optional(element) || /^[A-Za-z0-9]+$/.test(value);
}, "i18n.pages.global.validate.msg.checkEnNum");

/**验证字母开头数字结尾*/
jQuery.validator.addMethod("checkEnBeginNum", function(value, element) {
	if (value == null || value.length == 0) {
		return true;
	}
	return this.optional(element) || /^[a-zA-Z].*\d$/.test(value);
}, "i18n.pages.global.validate.msg.checkEnBeginNum");

jQuery.validator.addMethod("ebaySpecUnsupper", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	return this.optional(element) || !/[ ~！@#￥%……&*（）]/gi.test(value);
}, "i18n.pages.shop.authorized.hasnull");

/**
 * 自定义jquery验证规则 字符串中英文长度验证
 */
jQuery.validator.addMethod("strlen", function(value, element, param) {
	if(value == null || value.length == 0) {
		return true;
	}
	if ((!param || isNaN(param))) {
		return false;
	}
	return value.strlen() <= parseInt(param);
}, "i18n.pages.global.validate.msg.len");

/**
 * 验证字段是否存在表中
 */
jQuery.validator.addMethod("exists", function(value, element, param) {
	var isExists = true;
	var url = null;
	var oldValue = null;
	if (param && param.length == 2) {
		url = param[0];
		oldValue = param[1];
	} else {
		url = param;
	}
	if (oldValue != null) {
		if (oldValue == value) {
			return true;
		}
	}
	$.ajax({
		url : url,
		type : "post",
		data : {
			name : value
		},
		async : false,
		dataType : "json",
		success : function(data) {
			if (data.code == "FALSE") {
				isExists = false;
			}
		}
	});
	return isExists;
});
var skuMinValidateIndex = 0;
//最小值不能大于最大值
jQuery.validator.addMethod("minMax",
		function(value, element, param) {
			var min = $.trim($(param).val());
			value = $.trim(value);
			if ((min == ""|| min == null || min.length == 0) && ( value==""||value == null || value.length == 0)) {
				return true;
			}
			if ((min == ""||min == null || min.length == 0) && (value != null && value.length > 0)) {
				return false;
			}
			if(min.length>0 && ( value==""||value == null || value.length == 0)){
				return false;
			}
			min = parseFloat(min);
			value = parseFloat(value);
			if (value < min) {
				return false;
			}
			$(param).valid();
			//$(param).valid();
			//$(param).blur();
			/*if(skuMinValidateIndex==0&&value-0>0&&min-0>0){
				$(param).valid();
				$(param).focus();
				$(param).blur();
				skuMinValidateIndex = skuMinValidateIndex+1 ;
			}*/
			return true;
		}, "i18n.pages.sku.validate.max");



//最大值不能小于最小值
jQuery.validator.addMethod("maxMin",
		function(value, element, param) {
			var min = $.trim($(param).val());
			value = $.trim(value);
			if ((min == ""||min == null || min.length == 0) && (value==""||value == null || value.length == 0)) {
				return true;
			}
			if ((min == ""||min == null || min.length == 0) && (value != null && value.length > 0)) {
				return false;
			}
			if(min.length>0 && ( value==""||value == null || value.length == 0)){
				return false;
			}
			min = parseFloat(min);
			value = parseFloat(value);
			if (value > min) {
				return false;
			}
//			$(param).valid();
//			$(param).focus();
//			$(param).blur();
//			if(value-0>0&&min-0>0){
//				$(param).valid();
//				skuMinValidateIndex = skuMinValidateIndex+1 ;
//			}
			return true;
		}, "i18n.pages.sku.validate.min");

/**
 * 验证是否为整数
 */
jQuery.validator.addMethod("positiveintegerZero", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	if (isNaN(value)) {
		return false;
	}
	var aint = parseInt(value);
	if(value.indexOf(".")!=-1){
		return false;
	}
	//return aint >= 0 && (aint + "") == value;
	return aint >= 0;
}, "i18n.pages.global.validate.msg.positiveintegerZero");

/**
 * 验证是否为整数
 */
jQuery.validator.addMethod("positiveintegerZero2", function(value, element) {
	if (isNaN(value)) {
		return false;
	}
	var aint = parseInt(value);
	if(value.indexOf(".")!=-1){
		return false;
	}
	if (aint < 1) {
		return false;
	}
	return aint >= 0 && (aint + "") == value;
}, "i18n.pages.global.validate.msg.positiveintegerZero2");

/**
 * 验证评分
 */
jQuery.validator.addMethod("positiveintegerScore", function(value, element) {
	 if ((value && value.length == 0) || !value) {
		return true;
	}
	/*return this.optional(element) || /^((([0-4])(\.\d{1,2})?)|5|5.0|5.00)$/.test(value);;*/
	 return this.optional(element) || /^[0-9]{1,3}(\.\d{1,2})?$/.test(value);
}, "i18n.pages.global.validate.msg.positiveintegerScore");

/**
 * 验证是否为大于0的整数
 */
/*jQuery.validator.addMethod("positiveinteger", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	if (isNaN(value)||value==0) {
		return false;
	}
	var aint = parseInt(value);
	if(value.indexOf(".")!=-1){
		return false;
	}
	//return aint >= 0 && (aint + "") == value;
	return aint >= 0;
}, "i18n.pages.global.validate.msg.positiveinteger");*/

// url匹配
jQuery.validator
		.addMethod(
				"url",
				function(value, element) {
					if ((value && value.length == 0) || !value) {
						return true;
					}
					return this.optional(element)
							|| /(https:\/\/|ftp:\/\/|mms:\/\/|www.)([A-z0-9]+[_\-]?[A-z0-9]+\.)*[A-z0-9]+\-?[A-z0-9]+\.[A-z]{2,}(\/.*)*\/?/ || /(http:\/\/|ftp:\/\/|mms:\/\/|www.)([A-z0-9]+[_\-]?[A-z0-9]+\.)*[A-z0-9]+\-?[A-z0-9]+\.[A-z]{2,}(\/.*)*\/?/
									.test(value);
				}, "i18n.pages.sku.validate.url");

// 大于等于0(保留2位小数）
jQuery.validator.addMethod("checkNumberPn", function(value, element) {
	return this.optional(element) || /^([0-9]{0,9}(\.\d{1,2})?)?$/.test(value);
}, "i18n.pages.sku.validate.checkNumberPn");

//大于等于0(保留4位小数）
jQuery.validator.addMethod("checkNumberRate", function(value, element) {
	return this.optional(element) || /^([0-9]{0,9}(\.\d{1,4})?)?$/.test(value);
}, "i18n.pages.sku.validate.checkNumberRate");
//大于0(保留4位小数）
jQuery.validator.addMethod("checkNumberRateZero", function(value, element) {
	if(value==0){
		return false;
	}
	return this.optional(element) || /^([0-9]{0,9}(\.\d{1,4})?)?$/.test(value);
}, "i18n.pages.sku.validate.checkNumberRateZero");

// 大于0(保留2位小数）
jQuery.validator.addMethod("checkNumberPn1", function(value, element) {
	if(value==0){
		return false;
	}
	return this.optional(element) || /^([0-9]{0,5}(\.\d{1,2})?)?$/.test(value);
}, "i18n.pages.sku.validate.checkNumberPn1");


//大于0(保留2位小数）
jQuery.validator.addMethod("checkNumberDouble", function(value, element) {
	if(value==0){
		return false;
	}
	return this.optional(element) || /^([0-9]{0,9}(\.\d{1,2})?)?$/.test(value);
}, "i18n.pages.refund.validate.checkNumberDouble");


//大于1(保留2位小数）
jQuery.validator.addMethod("checkMinNumber", function(value, element) {
	if(value.length==0){
		return true;
	}
	if(value==0){
		return false;
	}else if(value-1<0){
		return false;
	}
	return this.optional(element) || /^([0-9]{0,5}(\.\d{1,2})?)?$/.test(value);
}, "i18n.pages.module.freight.validate.checkMinNumber");

//  
jQuery.validator.addMethod("checkRequired", function(value,element,param) {
 	if($(param).parent().attr("class")=="checked"){
		if(value.length==0){
			return false;
		}
	} 
 	return true;
}, "i18n.pages.permissionTemplate.label.notNullName");

jQuery.validator.addMethod("checkRequired3", function(value,element,param) {
	if(value.length>0){
		var pvalue = $(param).val();
		if(pvalue.length==0){
			$(param).valid();
			return false;
		}
		return true;
	}
 	return true;
}, "i18n.pages.permissionTemplate.label.notNullName");

//
jQuery.validator.addMethod("checkRequired2", function(value,element,param) {
	if(value.length>0){
		var pvalue = $(param).val();
		if(pvalue.length==0){
			$(param).valid();
			return false;
		}
		if(value.length>0&&pvalue.length>0){
			
		}
		return true;
	}
 	return true;
}, "i18n.pages.permissionTemplate.label.notNullName");

// 0-100之间,保留2位小数字
jQuery.validator.addMethod("maxNumberValue", function(value, element) {
	return this.optional(element) || /^(([0-9]{1,2}(\.\d{1,2})?)|100|100.0|100.00)?$/.test(value);
}, "i18n.pages.sku.validate.maxNumber");

//0.01-99.99之间,保留2位小数字
jQuery.validator.addMethod("minMaxNumberValue", function(value, element) {
	if(value.length==0){
		return true;
	}
	if(value==0){
		return false;
	}
	return this.optional(element) || /^(([0-9]{1,2}(\.\d{1,2})?))?$/.test(value);
}, "i18n.pages.module.freight.validate.minMaxNumberValue");

//0到9999之间的整数
jQuery.validator.addMethod("disMaxNumberValue", function(value, element) {
	if(value==0){
		return true;
	}
	return this.optional(element) || /^(([0-9]{1,4}?))?$/.test(value);
}, "i18n.pages.module.freight.validate.disMaxNumberValue");

//0.01-1之间,保留2位小数字
jQuery.validator.addMethod("zeroOneNumberValue", function(value, element) {
	if(value==0){
		return false;
	}
	return this.optional(element) || /^(([0]{1}(\.\d{1,2})?)|1|1.0|1.00)?$/.test(value);
}, "i18n.pages.sku.validate.zero.one.numberCheck");

//0.01-1之间,保留2位小数字
jQuery.validator.addMethod("zeroOneNumberValue2", function(value, element) {
	if(value.length==0){
		return true;
	}
	if(value==0){
		return false;
	}
	return this.optional(element) || /^(([0]{1}(\.\d{1,2})?)|1|1.0|1.00)?$/.test(value);
}, "i18n.pages.sku.validate.zero.one.numberCheck");

//请输1-7位正整数
jQuery.validator.addMethod("positiveintegertype",function(value, element) {
	return this.optional(element) || /^(1|[1-9]\d{0,6})$/.test(value);
}, "i18n.pages.allocateOrder.validate.msg09");

//请输0-7位正整数
jQuery.validator.addMethod("positiveintegertypeZero",function(value, element) {
	return this.optional(element) || /^(1|[0-9]\d{0,6})$/.test(value);
}, "i18n.pages.global.validate.msg.positiveintegertypeZero");

//请输1-6位正整数
jQuery.validator.addMethod("positiveintegertype2",function(value, element,maxLength) {
	return this.optional(element) || /^(1|[1-9]\d{0,5})$/.test(value);
}, "i18n.pages.allocateOrder.validate.msg32");

//请输0-6位整数
jQuery.validator.addMethod("positiveintegertype3",function(value, element,maxLength) {
	return this.optional(element) || /^([0-9]\d{0,5})$/.test(value);
}, "i18n.pages.allocateOrder.validate.msg99");

/*//请输0-7位正整数
jQuery.validator.addMethod("checkMaxNum",function(value, element,max) {
	if(value==0){
		return false;
	}
	if(value>max){
		return false;
	}
	return this.optional(element) || /^(1|[1-9]\d{0,6})$/.test(value);
}, "i18n.pages.allocateOrder.validate.msg09");*/


//请输入0-1的小数数值，最多两位小数（小于等与1，大于等于0）
jQuery.validator.addMethod("decimalMaxMinVal",function(value, element) {
	return this.optional(element) || /^1(\.0{1,2})?$|^0(\.\d{1,2})?$/.test(value);
}, "i18n.pages.global.msg.decimalMaxMinVal");

// 整数为6位并且保留2位小数
jQuery.validator.addMethod("isDoubleNumber", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	return this.optional(element) || /^[0-9]{1,6}(\.\d{1,2})?$/.test(value);
}, "i18n.pages.sku.validate.double");

jQuery.validator.addMethod("isDoubleNumber3", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	return this.optional(element) || /^[0-9]{1,6}(\.\d{1,3})?$/.test(value);
}, "i18n.pages.sku.validate.double3");

//整数为5位并且保留2位小数
jQuery.validator.addMethod("isDoubleNumber2", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	return this.optional(element) || /^[0-9]{1,5}(\.\d{1,2})?$/.test(value);
}, "i18n.pages.global.validate.msg.double");

//整数为9位并且保留2位小数
jQuery.validator.addMethod("isDoubleNumber4", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	return this.optional(element) || /^[0-9]{1,9}(\.\d{1,2})?$/.test(value);
}, "i18n.pages.global.validate.msg.ninedouble");

// 判断英文字符
jQuery.validator.addMethod("isEnglish", function(value, element) {
	return true;
	// value = $.trim(value);
	// console.log(element);
	// console.log(">>>"+value);
	// return this.optional(element) || /^[A-Za-z\s]*$/i.test(value);
}, "i18n.pages.sku.validate.english");
/**
 * 邮箱验证
 */
jQuery.validator.addMethod("chkemail", function(value, element, param) {
					if (!value) {
						return true;
					}
					var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g;
					return reg.test(value);
				}, "i18n.pages.global.validate.msg.email");

jQuery.validator.addMethod("numbertype", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	if (isNaN(value)) {
		return false;
	}
	var aint = parseFloat(value);
	return aint >= 0;
}, "i18n.pages.global.msg.3");
/**
 * 验证是否为正整数
 */
jQuery.validator.addMethod("positiveinteger", function(value, element) {
	if ((value && value.length == 0) || !value) {
		return true;
	}
	if (isNaN(value)) {
		return false;
	}
	var aint = parseInt(value);
	return aint > 0 && (aint + "") == value;
}, "i18n.pages.global.validate.msg.positiveinteger");

jQuery.validator.addMethod("minInt", function(value, element, param) {
	if(value == null) {
		return true;
	}
	if (isNaN(value)) {
		return false;
	}
	var aint = parseInt(value);
	return !(aint < parseInt(param));
}, "");
/**最大整数*/
jQuery.validator.addMethod("maxInt", function(value, element, param) {
	if(value == null || value=="" || value.length == 0) {
		return true;
	}
	if (isNaN(value)) {
		return false;
	}
	var aint = parseInt(value);
	return (aint <= parseInt(param));
}, "i18n.pages.global.validate.msg.maxint");

/**
 * 验证时输入为空格，如果是required验证，则被认为未输入
 */
(function($) {
	$.each($.validator.methods, function(key, value) {
		$.validator.methods[key] = function() {
			if (arguments.length > 0) {
				arguments[0] = $.trim(arguments[0]);
			}
			return value.apply(this, arguments);
		};
	});
}(jQuery));

/**
 * 以下是激活新用户向导并且不允许用户作弊隐藏向导
 */
var userStatus = "ACTIVED";

g.guideSuccess = function() {
	userStatus = "ACTIVED";
}

function isRegisterUncomplete(company) {
	if (!company || company.length == 0) {
		userStatus = "UNCOMPLETE";
		$("#userGuideEvent").click();
		$("#userGuide .close").remove();
	}
}

document.onclick = function() {
	if (userStatus == "UNCOMPLETE") {
		if ($("#userGuide").is(":hidden")) {
			$("#userGuide").show();
		}
		if ($(".modal-backdrop").is(":hidden")) {
			$(".modal-backdrop").show();
		}
	} else {
		$("#userGuide").remove();
	}
}

Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 天
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
/*$('.hor-menu [data-hover="megamenu-dropdown"].hover-initialized').each(
		function() {
			$(this).unbind('hover');
			$(this).parent().unbind('hover').find('.dropdown-submenu').each(
					function() {
						$(this).unbind('hover');
					});
			$(this).removeClass('hover-initialized');
		});
$('.hor-menu [data-toggle="dropdown"].active').removeClass('open');

$('.hor-menu [data-hover="megamenu-dropdown"]').not('.hover-initialized').each(
		function() {
			$(this).dropdownHover();
			$(this).addClass('hover-initialized');
		});
$('.hor-menu .navbar-nav li.open').removeClass('open');
$(".page-header-menu").css("display", "block");*/

$('#page-header-container').find('.menu-dropdown').find("a").click(function(){//当headMenu的子菜单被点击隐藏父菜单
	$(this).parents('.mega-menu-dropdown.open').removeClass('open');
});
/**
 * 导入刷新页面使用
 * 
 * @param importid
 *            导入日志ID
 * @param callback
 *            回调函数
 */
g.importRefresh = function(importid, callback,blockDiv) {
	if (importid != null && importid > 0) {
		// 定义导入状态
		var status = ""
		var importlog = setInterval(function() {
			$.ajax({
				type : "POST",
				url : "/productLog/showProductLog/" + importid,
				dataType : "json",
				success : function(data) {
					// 获取导入状态
					status = data.result.obj.status;
					// 导入状态为已完成
					if (status == "COMPLETE") {
						// 清除监听
						clearInterval(importlog);
						// 刷新页面数据
						callback();
						if (blockDiv!=null) {
							//清除Loading(注：目前只在 盘点导入  有使用)
							Metronic.unblockUI(".block_"+blockDiv);
							$("#"+blockDiv).removeClass("block_"+blockDiv);
						}
					}
				},
				error:function(){
					// 清除监听
					clearInterval(importlog);
					if (blockDiv!=null) {
						//清除Loading
						Metronic.unblockUI(".block_"+blockDiv);
						$("#"+blockDiv).removeClass("block_"+blockDiv);
					}
				}
			});
		}, 2000);// COMPLETE
	}
};
g.addDate=function (dd,dadd){
	var a = new Date(dd)
	a = a.valueOf()
	a = a + dadd * 24 * 60 * 60 * 1000
	a = new Date(a)
	return a;
};

/**
 * 日期区间控件
 */
g.dateRange = function(setting) {
	var dateRange = new daterange(setting);
	dateRange.init();
	return dateRange;
};

/**
 * 动态加载js
 */
g.loadScript = function (src, callback) {
    var script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.src = src;
    if (script.addEventListener) {
        script.addEventListener('load', function () {
            callback();
        }, false);
    } else if (script.attachEvent) {
        script.attachEvent('onreadystatechange', function () {
            var target = window.event.srcElement;
            if (target.readyState == 'loaded') {
                callback();
            }
        });
    }
    head.appendChild(script);
}