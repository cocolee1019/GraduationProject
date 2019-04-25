var g = {
	// 定义全局静态属
	name : "MySupermarket"
};

var _chars_code_ = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

generateMixed_ = function(n) {
    var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*35);
        res += _chars_code_[id];
    }
    return res;
};

function Map() {
	this.container = new Object();
};

Map.prototype.put = function(key, value) {
	this.container[key] = value;
};

Map.prototype.get = function(key) {
	return this.container[key];
};

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
};

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
};

Map.prototype.remove = function(key) {
	delete this.container[key];
};

/**动态加载面板***/
//存储已经加载的面板
var panelMngs = new Map();
//加载页面数据
g.load = function(url,obj,title,tabId){
	console.log("url----->"+url);
	if (panelMngs.size() > 10) {
		g.info("选项面板过多，请删除多余的再进行操作！！！");
		return;
	}
	//获取面板名称
	var panelName = title == null ? obj.outerText : title;
	if (panelName == null) {
		panelName = '';
	}
	var panelHtml = '';
	var panelDivHtml = '';
	var divId = '';
	//是否加载页面table
	var isAddDivHtml = false;
	if(tabId==null || tabId==""){
		tabId = Math.round(new Date().getTime());
	}
	if (!panelMngs.get(panelName)) {
		//创建div和选项卡标签
		divId = 'div_' + Math.round(new Date().getTime());
		panelHtml += '<li data-id="'+divId+'"><a href="#'+divId+'" data-toggle="tab" id="'+tabId+'">';
		panelHtml += '<span>'+panelName +'</span>';
		panelHtml += '<i class="fa fa-close tab-close navTabPanelClose"></i></a></li>';
		panelDivHtml +='<div id="'+divId+'" class="tab-pane fade"></div>';
		//添加面板
		$('#navTabPanel').append(panelHtml);
		//添加div
		$('#navTabPanelDiv').append(panelDivHtml);
		panelMngs.put(panelName,divId);
		isAddDivHtml = true;
	} else {
		divId = panelMngs.get(panelName);
	}
	if (isAddDivHtml) {
		var htmlobj = $.ajax({url:url,async:false});
		$('#'+divId).html(htmlobj.responseText);
	}
	$('#navTabPanel').find('li[class="active"]').attr('class','');
	$('#navTabPanelDiv').find('.active').removeClass("active");
	$('#navTabPanelDiv').find('.active').removeClass("in");
	
	$('#navTabPanel').find('li[data-id="'+divId+'"]').attr('class','active');
	$('#'+divId).attr('class',"tab-pane fade active in");
};

/**面板删除操作**/
$(document).on('click','.navTabPanelClose', function(){ 
	var li = $(this).parent().parent();
	var divId = li.attr('data-id');
	//如果选中的当前面板，删除当前面板后，取下一个面板选中；如果当前面板是最好一个节点则取上一个面板选中，都不存在回到首页
	if (li.hasClass('active')) {
		if ((li.index()+1) == $("#navTabPanel li").length) {
			li.prev().addClass('active');
			$('#'+li.prev().attr('data-id')).attr('class',"tab-pane fade active in");
		} else {
			li.next().addClass('active');
			$('#'+li.next().attr('data-id')).attr('class',"tab-pane fade active in");
		}
	}
	panelMngs.remove($(this).prev().html());
	li.remove();
	$('#'+divId).remove();
});

var isInitAlert = false;
//弹框
g.alert = function(type, text,title) {
	console.log(isInitAlert);
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
};

/*
 * text:提示内容
 * title:表示标题内容
 */
g.success = function(text,title) {
	if(!title) {
		title = "操作成功";
	}
	g.alert("success", text,title);
};

// 消息提示
g.info = function(text) {
	g.alert("info", text,"提示");
};

// 危险
g.danger = function(text) {
	g.alert("error", text,"未知错误");
};

// 警告
g.warning = function(text) {
	g.alert("warning", text,"操作失败");
};

g.loadTable = function(target, url, dataForm) {
	g.post(target, url, dataForm);
	$(target).attr("x-url",url);
	$(target).attr("x-dataForm",dataForm);
};

//分页代码
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
		var url = $actionTarget.attr("x-url");
		// 查询条件
		var dataForm = $actionTarget.attr("x-dataForm");
		// 是否固定表头
		var args = url.split("/");
		// 分页信息
		var oldPageNumber = args[args.length - 2];
		var oldPageSize = args[args.length - 1];
		// 新请求的url
		var newUrl = url.substring(0, url.length - oldPageNumber.length
				- oldPageSize.length - 2)
				+ "/" + 1 + "/" + oldPageSize;
		// 查询
		g.loadTable(target, newUrl, dataForm);
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
		var url = $actionTarget.attr("x-url");
		// 查询条件
		var dataForm = $actionTarget.attr("x-dataForm");
		var args = url.split("/");
		// 分页信息
		var oldPageNumber = args[args.length - 2];
		var oldPageSize = args[args.length - 1];
		// 新请求的url
		var newUrl = url.substring(0, url.length - oldPageNumber.length
				- oldPageSize.length - 2)
				+ "/" + (oldPageNumber - 1) + "/" + oldPageSize;
		// 查询
		g.loadTable(target, newUrl, dataForm);
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
			var url = $actionTarget.attr("x-url");
			// 查询条件
			var dataForm = $actionTarget.attr("x-dataForm");
			var args = url.split("/");
			// 分页信息
			var oldPageNumber = args[args.length - 2];
			var oldPageSize = args[args.length - 1];
			// 新请求的url
			var newUrl = url.substring(0, url.length - oldPageNumber.length
					- oldPageSize.length - 2)
					+ "/" + pageNum + "/" + oldPageSize;
			// 查询
			g.loadTable(target, newUrl, dataForm);
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
		var url = $actionTarget.attr("x-url");
		// 查询条件
		var dataForm = $actionTarget.attr("x-dataForm");
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
		g.loadTable(target, newUrl, dataForm);
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
		var url = $actionTarget.attr("x-url");
		// 查询条件
		var dataForm = $actionTarget.attr("x-dataForm");
		var args = url.split("/");
		// 分页信息
		var oldPageNumber = args[args.length - 2];
		var oldPageSize = args[args.length - 1];
		// 新请求的url
		var newUrl = url.substring(0, url.length - oldPageNumber.length
				- oldPageSize.length - 2)
				+ "/" + num + "/" + oldPageSize;
		// 查询
		g.loadTable(target, newUrl, dataForm);
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
		var url = $actionTarget.attr("x-url");
		// 查询条件
		var dataForm = $actionTarget.attr("x-dataForm");
		var args = url.split("/");
		// 分页信息
		var oldPageNumber = args[args.length - 2];
		var oldPageSize = args[args.length - 1];
		// 新请求的url
		var newUrl = url.substring(0, url.length - oldPageNumber.length
				- oldPageSize.length - 2)
				+ "/" + 1 + "/" + $(event).val();
		// 查询
		g.loadTable(target, newUrl, dataForm);
	}
};
	
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
		console.log("date------->"+data);
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
			g.info("加载页面失败，请刷新页面");
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

/**关闭按钮**/
g.closeCurrentWindow = function() {
	$(".nav-tabs li.active:not('.tabdrop') .navTabPanelClose").click();
}

