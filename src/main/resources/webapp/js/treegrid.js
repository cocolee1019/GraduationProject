var treeGridMngs = new Map();

var treeGridUrlDataMap = new Map();

var treeGridInitDataMap = new Map();

var execTgFillC = 0;

//var execTgInitCount = 0;
//
function globalTgInitTask() {
	var keys = treeGridInitDataMap.keySet();
	if (treeGridInitDataMap.size() > 0) {
		for (var i = 0; i < treeGridInitDataMap.size(); i++) {
			var key = keys[i];
			var treeGridMng = treeGridInitDataMap.get(key);
			//treeGridMng.initData(key);
			if (treeGridMng.setting.url) {
				treeGridMng.remoteData(
						treeGridMng.setting.id,
						treeGridMng.setting.url);
			} else {
				treeGridMng.initData(id);
			}
			treeGridInitDataMap.remove(key);
			break;
		}
		if(treeGridInitDataMap.size() == 0) {
			resizeTreeGridPlugin();
		}
	}
	setTimeout(function() {globalTgInitTask();},20);
}
//globalTgInitTask();
//
//setInterval(function() {
//	globalTgInitTask();
//}, 50);

function fillTgValue(id, textVal) {
	if (execTgFillC > 0) {
		setTimeout("fillTgValue('" + id + "')", 10);
		return;
	}
	var $this = treeGridMngs.get(id);
	if(textVal != null) {
		$this.setting.defaultText = textVal+",";
	}
	var defaultVal = $this.setting.defaultText;
	var defaultSize = 1;
	if (defaultVal && defaultVal.length > 0) {
		if (defaultVal.indexOf(",") > -1) {
			defaultVal = defaultVal.split(",");
			defaultSize = defaultVal.length;
		}
	} else {
		resizeTreeGridPlugin($this.setting.id);
		return;
	}
	if ($this.setting.data != null && $this.setting.data.tree != null) {
		$this.setting.data = $this.setting.data.tree;
	}
	if ($this.setting.data != null && $this.setting.data.length > 0) {
		var idField = $this.setting.idField ? $this.setting.idField
				: $this.defaultSetting.idField;
		var textField = $this.setting.textField ? $this.setting.textField
				: $this.defaultSetting.textField;
		if (defaultSize == 1) {
			if ($this.setting.data && $this.setting.data.length > 0) {
				$.each($this.setting.data, function(idx, objd) {
					if (objd[idField] == defaultVal) {
						$("#" + $this.setting.proxyId).val(defaultVal);
						$("#selectbar_" + $this.setting.id + " .textarea").text(objd[textField]);
						return false;
					}
				});
			}
		} else if (defaultSize > 1) {
			var showText = "";
			var showIds = "";
			for (var i = 0; i < defaultSize; i++) {
				$.each($this.setting.data, function(idx, objd) {
					if (objd[idField] == defaultVal[i]) {
						showText = showText + objd[textField] + ",";
						showIds = showIds + objd[idField] + ",";
						return false;
					}
				});
			}
			if (showText.length > 0) {
				showText = showText.substring(0, showText.length - 1);
				showIds = showIds.substring(0, showIds.length - 1);
			}
			$("#selectbar_" + $this.setting.proxyId).val(showIds);
			$("#" + $this.setting.proxyId).val(showIds);
			$("#selectbar_" + $this.setting.id + " .textarea").text(showText);
		}
	} else {
		var url = $this.setting.url;
		var data1 = treeGridUrlDataMap.get(url);
		if (data1 == null || data1.length == 0) {
			if(url.indexOf("?") > -1) {
				url += "&times=" + new Date().getTime();
			} else {
				url += "?times=" + new Date().getTime()
			}
			$.ajax({
				url : url,
				type : "post",
				async : false,
				dataType : "json",
				success : function(data) {
					//treeGridUrlDataMap.put(url, data.tree);
					if ($this.setting.data == null
							|| $this.setting.data.length == 0) {
						$this.setting.data = data.tree;
					} else if ($this.setting.data.length > 0) {
						$this.setting.data.push(data.tree);
					}
				},
				error : function() {
					g.warning("load error.");
				}
			});
		} else {
			if($this.setting.data == null) {
				$this.setting.data = data1;
			}
		}
		if ($this.setting.data != null) {
			var idField = $this.setting.idField ? $this.setting.idField
					: $this.defaultSetting.idField;
			var textField = $this.setting.textField ? $this.setting.textField
					: $this.defaultSetting.textField;
			if (defaultSize == 1) {
				if ($this.setting.data && $this.setting.data.length > 0) {
					$.each($this.setting.data, function(idx, objd) {
						if (objd[idField] == defaultVal) {
							$("#" + $this.setting.proxyId).val(defaultVal);
							$("#selectbar_" + $this.setting.id + " .textarea")
									.text(objd[textField]);
							return false;
						}
					});
				}
			} else if (defaultSize > 1) {
				var showText = "";
				var showIds = "";
				for (var i = 0; i < defaultSize; i++) {
					$.each($this.setting.data, function(idx, objd) {
						if (objd[idField] == defaultVal[i]) {
							showText = showText + objd[textField] + ",";
							showIds = showIds + objd[idField] + ",";
							return false;
						}
					});
				}
				if (showText.length > 0) {
					showText = showText.substring(0, showText.length - 1);
					showIds = showIds.substring(0, showIds.length - 1);
				}
				$("#selectbar_" + $this.setting.proxyId).val(showIds);
				$("#" + $this.setting.proxyId).val(showIds);
				$("#selectbar_" + $this.setting.id + " .textarea").text(
						showText);
			}
		}
	}
	resizeTreeGridPlugin($this.setting.id);
	execTgFillC--;
}

function treegrid(setting) {

	var lastTreeGrid = null;

	this.defaultSetting = {
		id : "treeGrid_" + Math.round(new Date().getTime() / 1000),// 组件ID
		url : null,// 远程初始数据获取URL
		expandUrl : null,// 远程展开获取数据URL，预留参数ID的链接，例如： spu/tree?id=或者spu/tree/
		title : "标题",// 标题
		proxyId : null,// 代理ID，如果当前tree显示模式为非模态显示，则必须设置代理ID，用于在页面插入treegrid
		width : "400px",// 初始宽度
		defaultText : "",
		header : [],// 表头数据，json字符串，定义表头显示字段
		isCloseShow : true,// 是否显示头部关闭按钮
		isMultiSelect : false,// 是否多选模式
		checkbox : true,// 是否存在多选框
		isRelationCheck : true,// 是否级联选中
		isSearchAble : false,// 是否允许搜索，暂未实现
		maxHeight : "300px",// treegrid最大高度
		allowNoneSelect : true,// 模态框显示模式下，是否允许不选择数据退出
		displayType : "model",// 是否模态框显示 model/select/normal isModelDisplay
		idField : "id",// 定义ID获取字段
		textField : "text",// 定义内容获取字段
		parentIdField : "parent",// 定义父级设定字段
		data : null,// 定义非URL显示模式时展示的固定数据
		expandAllUnEapanding : false,
		openCache : new Map(),
		isInit : true,
		isDo : false,
		callBack : function() {
		},// 回掉函数，必须实现。参考SPU 目录选择
		onClick : function(event, e) {
			lastTreeGrid.onClicking(event, e);
		},// 选中事件
		onCheck : function(event) {
			lastTreeGrid.onCheck(event);
		},
		onExpand : function(event) {
			lastTreeGrid.onExpanding(event);
		},// 展开事件
		onDestory : function(id) {
			lastTreeGrid.onDestorying(id);
		}// 销毁/退出事件
	};

	this.setting = setting;

	var columnWidth = "100%";
	var typeInput = "checkbox";

	this.init = function() {
		var $this = this;
		if ($this.setting.proxyId) {
			if ($('#' + $this.setting.proxyId).length == 0) {
				return;
			}
		}
		setTimeout(
				function() {
					var keys = treeGridMngs.keySet();
					if (treeGridMngs.size() > 0) {
						for (var i = 0; i < treeGridMngs.size(); i++) {
							var key = keys[i];
							var treeGridMng = treeGridMngs.get(key);
							if ($("#selectbar_" + key).length == 0) {
								if (treeGridMng.setting.displayType == "select") {
									$("#" + key).remove();
									treeGridMngs.remove(key);
								}
							}
						}
					}

					var html = '';
					if ($this.setting == null) {
						$this.setting = $this.defaultSetting;
					}
					var cancelTitle = "取消";
					var confirmTitle = "确定";
					var width = $this.setting.width ? $this.setting.width
							: $this.defaultSetting.width;
					var id = $this.setting.id;
					if (id == null) {
						id = "treeGrid_" + Math.round(new Date().getTime())
								+ generateMixed_(Math.round(10));
						$this.setting.id = id;
					}
					if (treeGridMngs.get(id) != null) {
						while (true) {
							id = "treeGrid_" + Math.round(new Date().getTime())
									+ generateMixed_(Math.round(10));
							$this.setting.id = id;
							if (treeGridMngs.get(id) == null) {
								break;
							}
						}
					}
					if (null == $this.setting.isMultiSelect
							|| $this.setting.isMultiSelect == false) {
						typeInput = "radio";
					} else {
						typeInput = "checkbox";
					}
					if ($this.setting.displayType == "model") {
						html += '<div style="display: block; padding-left: 16px;" id="'
								+ id
								+ '" class="modal fade bs-modal-lg in" tabindex="-1" role="dialog" aria-hidden="true">';
						html += '<div class="modal-dialog modal-dialog-small" style="width:'
								+ width
								+ ';"><div class="modal-content  modal-sm-content"><div class="modal-header01">';
						if ($this.setting.isCloseShow) {
							html += '<button type="button" class="close btn-close_" data-dismiss="modal" aria-hidden="true"></button>';
						}
						var title = $this.setting.title ? $this.setting.title
								: $this.defaultSetting.title;
						html += '<h4 class="modal-title">' + title
								+ '</h4></div>';
						html += '<div class="modal-body modal-sty"><div class="loading-message"><img src="/theme/assets/global/img/loading-spinner-grey.gif" alt="" class="loading"><span>&nbsp;&nbsp;Loading...15 </span></div></div><div class="newlyadded-btn c-both"><button type="button" data-dismiss="modal" class="btn treeComplete preservation-btn"><i class="fa fa-check"></i>';
						html += confirmTitle
								+ '</button><button class="btn cancel-btn btn-close_ "><i class="fa fa-times"></i>'
								+ cancelTitle + '</button>';
						html += '</div></div></div></div>';
						$('body').append(html);
						if ($this.setting.url) {
							$this.remoteData($this.setting.id,
									$this.setting.url);
						} else {
							$this.initData(id);
						}
						treeGridMngs.put($this.setting.id, $this);
						lastTreeGrid = $this;
						if ($this.setting.url) {
							$this.remoteData($this.setting.id,
									$this.setting.url);
						} else {
							$this.initData(id);
						}
					} else if ($this.setting.displayType == "select") {
						html += '<div id="'
								+ id
								+ '" style="display:none;z-index: 100001;"></div>';//
						// $('#'+$this.setting.proxyId).parents("form").append(html);
						$("body").append(html);
						var wid = $('#' + $this.setting.proxyId).outerWidth(
								true);
						var hei = $("#" + $this.setting.proxyId).outerHeight(
								true);
						var selectBar = '<div id="selectbar_' + id
								+ '" class="selectBar" style="width:' + wid
								+ 'px;height:34px;">';
						var defVal = $this.setting.defaultText;
						defVal = defVal ? defVal : "";
						var currSelectVal = $("#" + $this.setting.proxyId)
								.val();
						if (currSelectVal && currSelectVal.length > 0) {
							defVal = currSelectVal;
						}
						$this.setting.defaultText = defVal;
						selectBar += '<div class="textarea" style="height:34px;line-height:34px;">'
								+ defVal
								+ '</div><div class="iconarea" style="height:33px;line-height:34px;"><i class="fa fa-angle-down"></i></div>';
						selectBar += "</div>";
						$("#" + $this.setting.proxyId).after(selectBar);
						$("#selectbar_" + id + " .textarea").css("width",
								(wid - 25) + "px");
						var left = $("#selectbar_" + id).offset().left;
						var proxyHeight = parseFloat($("#selectbar_" + id)
								.outerHeight(true));
						var top = parseFloat($("#selectbar_" + id).offset().top)
								+ proxyHeight;
						if ($this.setting.width != null) {
							wid = $this.setting.width;
						}
						$("#" + $this.setting.proxyId).css("position",
								"absolute").css("left", "-1000px").css("top",
								"-10000px");// .css("width","-1000px")
						$("#" + id).css("position", "absolute").css("left",
								left).css("top", top + "px").css("width",
								wid + "px");
						$("#" + setting.id).data("close", true);

						$(document)
								.click(
										function(e) {
											if ($(e.target).parents(
													"#selectbar_" + id).length > 0) {
												return;
											}
											if ($(e.target).parents("#" + id).length == 0) {
												$("#" + id).slideUp();
												$("#" + setting.id).data(
														"close", true);
											}
										});

						$(document)
								.change(
										function(e) {
											if ($(e.target).parents(
													"#selectbar_" + id).length > 0) {
												return;
											}
											if ($(e.target).parents("#" + id).length == 0) {
												$("#" + id).slideUp();
												$("#" + setting.id).data(
														"close", true);
											}
										});
						$(
								"#selectbar_" + id + " .textarea,#selectbar_"
										+ id + " .iconarea")
								.unbind("click")
								.click(
										function() {
											if ($("#" + id).data("close")) {
												treeGridMng = treeGridMngs.get(id);
												if (treeGridMng.defaultSetting.isInit) {
													if (treeGridMng.setting.url) {
														treeGridMng.remoteData(
																		treeGridMng.setting.id,
																		treeGridMng.setting.url,
																		function() {
																			var left = $("#selectbar_" + id)
																			.offset().left;
																	var proxyHeight = parseFloat($(
																			"#selectbar_" + id)
																			.outerHeight(true));
																	var top = parseFloat($(
																			"#selectbar_" + id)
																			.offset().top)
																			- 1 + proxyHeight;
																	$("#" + id).css("position",
																			"absolute").css("left",
																			left).css("top",
																			top + "px").css(
																			"width", wid + "px");
																	$("#" + id).slideDown();
																	$("#" + setting.id).data(
																			"close", false);
																		});
													} else {
														treeGridMng.initData(id);
													}
												} else {
													var left = $("#selectbar_" + id)
													.offset().left;
													var proxyHeight = parseFloat($(
															"#selectbar_" + id)
															.outerHeight(true));
													var top = parseFloat($(
															"#selectbar_" + id)
															.offset().top)
															- 1 + proxyHeight;
													$("#" + id).css("position",
															"absolute").css("left",
															left).css("top",
															top + "px").css(
															"width", wid + "px");
													$("#" + id).slideDown();
													$("#" + setting.id).data(
															"close", false);
														}
													} else {
														$("#" + id).slideUp();
														$("#" + setting.id).data(
																"close", true);
												}
										});
						treeGridMngs.put($this.setting.id, $this);
						lastTreeGrid = $this;
						//treeGridInitDataMap.put($this.setting.id, $this);
						setTimeout("fillTgValue('" + id + "')", 40);
					} else {
						if ($("#" + $this.setting.proxyId).find("div").length > 0) {
							$("#" + $this.setting.proxyId).empty();
						}
						html += '<div id="' + id
								+ '" style="width:100%;"></div>';
						$("#" + $this.setting.proxyId).append(html);
						treeGridMngs.put($this.setting.id, $this);
						lastTreeGrid = $this;
						if ($this.setting.url) {
							$this.remoteData($this.setting.id,
									$this.setting.url);
						} else {
							$this.initData(id);
						}
					}

					$("#" + id + " .treeComplete").click(function() {
						lastTreeGrid.onClicked($this, true);
					});

					$("#" + id + " .btn-close_").click(function() {
						lastTreeGrid.onDestorying(id);
					});

				}, 200);

	}

	this.manager = function(obj) {
		var id = $($(obj).parents(".catalog-form")[0]).parent().attr("id");
		if (!id) {
			id = $($(obj).parents(".bs-modal-lg")[0]).attr("id");
		}
		return treeGridMngs.get(id);
	}

	this.bindEvent = function(proxyId) {
		var defaultSetting = this.defaultSetting;

		$(".griddatatable tr").unbind("click").click(function(e) {
			if ($(e.target).hasClass("fa")) {
				return;
			}
			defaultSetting.onClick(this, e);
		});
		$("#" + proxyId).change(function() {
		});
		//		
		$(
				".griddatatableheader input[type='" + typeInput
						+ "'][name='checkboxcontrol']").unbind("click").click(
				function(e) {
					var treeGridMng = lastTreeGrid.manager($(e.target));

					if (null == treeGridMng.setting.isMultiSelect
							|| treeGridMng.setting.isMultiSelect == false) {
						typeInput = "radio";
					} else {
						typeInput = "checkbox";
					}

					if (!treeGridMng.setting.isMultiSelect) {
						return;
					}
					defaultSetting.onCheck(this);
				});
		$(".selecttree-search-input").unbind("keyup").keyup(function(e) {
			var treeGridMng = lastTreeGrid.manager($(e.target));
			treeGridMng.search(treeGridMng.setting.id);
		});
		$(".treegrid-select-panel .fa-times").unbind("click").click(
				function(e) {
					var treeGridMng = lastTreeGrid.manager($(e.target));
					$(".treegrid-select-panel .selecttree-search-input")
							.val("");
					treeGridMng.search(treeGridMng.setting.id);
				});
		$(".griddatatable .fa-folder")
				.unbind("click")
				.click(
						function() {
							var parentTd = $(this).parent();
							var treeGridMng = lastTreeGrid.manager(parentTd);
							if (parentTd.data("close") == "true"
									|| parentTd.data("close")) {
								if (setting.onExpand) {
									eval(setting.onExpand);
								} else if (setting.expandUrl) {
									treeGridMng.onExpanding(parentTd);
								} else {
									if ($("td[data-parent='"
											+ parentTd.parent().attr("data-id")
											+ "']").length > 0) {
										$(
												"td[data-parent='"
														+ parentTd
																.parent()
																.attr("data-id")
														+ "']").removeClass(
												"activedata");
										$(
												"td[data-parent='"
														+ parentTd
																.parent()
																.attr("data-id")
														+ "']").show();
									} else {
										defaultSetting.onExpand(parentTd);
									}
								}
								parentTd.data("close", false);
								$(this).addClass("fa-folder-open");
								var trId = parentTd.parent().data("id");
								treeGridMng.defaultSetting.openCache.put(trId,
										true);
							} else {
								var trId = parentTd.parent().data("id");
								treeGridMng.defaultSetting.openCache
										.remove(trId);
								var subtree = $("tr." + trId);
								$.each(subtree, function(idx, obj) {
									if ($(obj).data("id") != trId) {
										$(obj).removeClass("activedata");
										$(obj).hide();
									}
								});
								$(this).removeClass("fa-folder-open");
								parentTd.data("close", true);
							}
						});
	}

	this.remoteData = function(id, url, callback) {
		url = encodeURI(url);
		var treeGridMng = treeGridMngs.get(id);
		var tdata = treeGridMng.setting.data;
		if (tdata == null) {
			if (treeGridUrlDataMap.get(url) != null) {
				if (!treeGridMng.setting.data) {
					treeGridMng.setting.data = treeGridUrlDataMap.get(url);
				} else {
					treeGridMng.setting.data.push(treeGridUrlDataMap.get(url));
				}
				treeGridMng.initData(setting.id);
				if(callback)
					callback.apply();
			} else {
				if(url.indexOf("?") > -1) {
					url += "&times=" + new Date().getTime();
				} else {
					url += "?times=" + new Date().getTime()
				}
				$.ajax({
					url : url,
					type : "post",
					async : true,
					dataType : "json",
					success : function(data) {
						//treeGridUrlDataMap.put(url, data.tree);
						if (!treeGridMng.setting.data) {
							treeGridMng.setting.data = data.tree;
						} else {
							treeGridMng.setting.data.push(data.tree);
						}
						treeGridMng.initData(setting.id);
						if(callback)
							callback.apply();
					},
					error : function() {
						g.warning("load error.");
					}
				});
			}
		} else {
			if(tdata.tree != null) {
				treeGridMng.setting.data = tdata.tree;
			}
			// treeGridMng.setting.data = tdata;
			treeGridMng.initData(setting.id);
			if(callback)
				callback.apply();
		}
	}

	this.onCheck = function(event) {
		var treeGridMng = this.manager(event);
		var treeId = treeGridMng.setting.id;

		if (null == treeGridMng.setting.isMultiSelect
				|| treeGridMng.setting.isMultiSelect == false) {
			typeInput = "radio";
		} else {
			typeInput = "checkbox";
		}

		if ($(event).attr("name") == "checkboxcontrol") {
			// var idInputs =
			// $("#"+treeId).find("input[type='"+typeInput+"'][name='id']");
			var idInputs = $("#" + treeId).find(
					"input[type='" + typeInput + "']");
			if ($(event).is(":checked")) {
				$(event).parent().addClass("checked");
				$.each(idInputs, function(idx, obj) {
					$(obj).parent().addClass("checked");
					$(obj).attr("checked", true);
					$(obj).parents("tr").addClass("activedata");
				});
			} else {
				$(event).parent().removeClass("checked");
				$.each(idInputs, function(idx, obj) {
					$(obj).parent().removeClass("checked");
					$(obj).attr("checked", false);
					$(obj).parents("tr").removeClass("activedata");
				});
			}
		} else {
			// 级联
			if ((treeGridMng.setting.isRelationCheck == null && treeGridMng.defaultSetting.isRelationCheck)
					|| (treeGridMng.setting.isRelationCheck != null && treeGridMng.setting.isRelationCheck)) {
				var chkId = $(event).parents("tr").data("id");
				var trs = "#" + treeId + " ." + chkId;
				if (typeInput != "radio") {
					$.each($(trs), function(idx, obj) {
										if ($(event).is(":checked")) {
											if(!$(event).parent().hasClass("checked")) {
												$(event).parent().addClass("checked");
											}
											// 选中
											var curObj = $($(obj).find("td")[0])
													.find("input[type='"+ typeInput+ "']");
											curObj.parent().addClass("checked");
											curObj.attr("checked", true);
											var cls = $(obj).attr("class");
											var clss = cls.split(" ");
											$.each($("#" + treeId+ " tr"),
															function(idx, trr) {
																// 勾选子集时选中父项
																if ($(trr).data("id") == clss[1]) {
																	// $($(trr).find("td")[0]).find("input[type='"+typeInput+"']").parent().addClass("checked");
																	// $(trr).addClass("activedata");
																}
															});
											// 勾选子集时选中父项
											if ($("#" + treeId).find(
															"tr[data-parent='"
																	+ clss[0]
																	+ "']")
													.find("td:eq(0)")
													.find(
															"input[type='"
																	+ typeInput
																	+ "']:checked").length == $(
													"#" + treeId).find(
													"tr[data-parent='"
															+ clss[0] + "']")
													.find("td:eq(0)").find(
															"input[type='"
																	+ typeInput
																	+ "']").length) {
												// var parent =
												// $("#"+treeId).find("tr[data-id='"+clss[0]+"']").find("td:eq(0)").find("input[type='"+typeInput+"']");
												// parent.parent().addClass("checked");
												// parent.addClass("activedata");
											}
											if (($("#" + treeId + " tr").length - 1) == ($(
													"#" + treeId + " tr").find(
													"td:eq(0)").find(
													"input[type='" + typeInput
															+ "']:checked").length)) {
												$(event).parents(
														".catalog-form").find(
														".griddatatableheader tr th:first input[type='"
																+ typeInput
																+ "']")
														.parent().addClass(
																"checked");
											}
										} else {
											$(event).parent().removeClass(
													"checked");
											// 取消选中
											var cls = $(obj).attr("class");
											var clss = cls.split(" ");
											var parent;
											$
													.each(
															$("#" + treeId
																	+ " tr"),
															function(idx, trr) {
																if ($(trr)
																		.data(
																				"id") == clss[0]) {
																	parent = $(trr);
																}
															});
											$(parent.find("td")[0]).find(
													"input[type='" + typeInput
															+ "']").parent()
													.removeClass("checked");
											parent.removeClass("activedata");
											$($(obj).find("td")[0]).find(
													"input[type='" + typeInput
															+ "']").parent()
													.removeClass("checked");
											$(obj).removeClass("activedata");
											$(obj).parents(".catalog-form")
													.find(
															".griddatatableheader tr th:first input[type='"
																	+ typeInput
																	+ "']")
													.parent().removeClass(
															"checked");
										}
									});
				} else {
					$("#" + treeId + " td").find(
							"input[type='" + typeInput + "']").parent()
							.removeClass("checked");
					$(event).parent().addClass("checked");
				}
			} else {
				$(event).parents(".catalog-form").find(
						".griddatatableheader tr th:first input[type='"
								+ typeInput + "']").parent().removeClass(
						"checked");
				$(event).parents(".catalog-form").find(
						".griddatatableheader tr th:first input[type='"
								+ typeInput + "']").attr("checked", false);
			}

		}
	}

	this.onDestorying = function(id) {
		$("#" + id).remove();
		this.defaultSetting = null;
		this.setting = null;
	}

	this.onClicking = function(tr, e) {
		var treeGridMng = this.manager(tr);

		if (null == treeGridMng.setting.isMultiSelect
				|| treeGridMng.setting.isMultiSelect == false) {
			typeInput = "radio";
		} else {
			typeInput = "checkbox";
		}

		var checkbox = $($(tr).find("td")[0]).find(
				"input[type='" + typeInput + "']");
		var isActive = checkbox.is(":checked") || $(tr).hasClass("activedata");
		if (e && $(e.target).hasClass("treegridchkbox")) {
			isActive = !$(e.target).is(":checked");
		}
		if (checkbox.val() == "" || checkbox.val() == null) {
			var treeId = treeGridMng.setting.id;
			$("#" + treeId + " td").find("input[type='" + typeInput + "']")
					.parent().removeClass("checked");
			$($(tr).find("td")[0]).find("input[type='" + typeInput + "']")
					.parent().addClass("checked");
		}
		if (isActive) {
			if (typeInput != 'radio') {
				checkbox.attr("checked", false);
				treeGridMng.onCheck(checkbox);
				$(tr).removeClass("activedata");
				if (treeGridMng.setting.displayType == "select") {
					if (setting.onClick) {
						eval(treeGridMng.setting.onClick);
					} else {
						treeGridMng.onClicked(tr);
					}
				}
			} else {
				if ($(tr).find("input").val() == "") {
					// 请选择按钮 点击 置空
					treeGridMng.reset();
					$("#" + treeGridMng.setting.id).find("input[value='']")
							.parent().addClass("checked");
					$("#" + treeGridMng.setting.id).find("input[value='']")
							.attr("checked", true);
					$("#" + treeGridMng.setting.id).data("close", true);
					$("#" + treeGridMng.setting.id).slideUp();
				}
			}
		} else {
			if ($(tr).find("input").val() == "") {
				// 请选择按钮 点击 置空
				treeGridMng.reset();
				$("#" + treeGridMng.setting.id).find("input[value='']")
						.parent().addClass("checked");
				$("#" + treeGridMng.setting.id).find("input[value='']").attr(
						"checked", true);
				$("#" + treeGridMng.setting.id).data("close", true);
				$("#" + treeGridMng.setting.id).slideUp();
				if (treeGridMng.setting.callBack) {
					treeGridMng.setting.callBack(null);
				}
			} else {
				checkbox.attr("checked", true);
				treeGridMng.onCheck(checkbox);
				checkbox.parent().addClass("checker");
				var isMultiSelect = treeGridMng.setting.isMultiSelect != null ? treeGridMng.setting.isMultiSelect
						: treeGridMng.defaultSetting.isMultiSelect;
				if (!isMultiSelect) {
					var activedatas = $("#" + treeGridMng.setting.id
							+ " .griddatatable tr.activedata");
					$.each(activedatas, function(idx, obj) {
						$($(obj).find("td")[0]).find(
								"input[type='" + typeInput + "']").attr(
								"checked", false);
					});
					$("#" + treeGridMng.setting.id + " .griddatatable tr")
							.removeClass("activedata");
					$(tr).addClass("activedata");
				} else {
					$(tr).addClass("activedata");
				}
				if (treeGridMng.setting.onClick) {
					eval(treeGridMng.setting.onClick);
				} else {
					treeGridMng.onClicked(tr);
				}
			}
		}
	}
	// 返回选定的行对象
	this.selected = function(obj) {
		var treeGridMng = null;
		if (obj == null) {
			treeGridMng = treeGridMngs.get(this.setting.id);
		}
		if (treeGridMng == null) {
			treeGridMng = this.manager(obj);
			if (treeGridMng == null)
				treeGridMng = treeGridMngs.get(obj);
		}
		var idField = treeGridMng.setting.idField ? treeGridMng.setting.idField
				: treeGridMng.defaultSetting.idField;
		var activedatas = $("#" + treeGridMng.setting.id
				+ " .griddatatable tr.activedata");
		var selects = new Array;
		$.each(activedatas, function(idx, tr) {
			var dataId = $(tr).data("id");
			if (setting.data) {
				for (var i = 0; i < setting.data.length; i++) {
					var id = setting.data[i][idField];
					if (dataId == id) {
						selects.push(setting.data[i]);
					}
				}
			}
		});
		return selects;
	}
	// 返回选定的行ID
	this.selectedIds = function(obj) {
		var treeGridMng = null;
		if (obj == null) {
			treeGridMng = treeGridMngs.get(this.setting.id);
		}
		if (treeGridMng == null) {
			treeGridMng = this.manager(obj);
			if (treeGridMng == null)
				treeGridMng = treeGridMngs.get(obj);
		}
		var idField = treeGridMng.setting.idField ? treeGridMng.setting.idField
				: treeGridMng.defaultSetting.idField;
		var activedatas = $("#" + treeGridMng.setting.id
				+ " .griddatatable tr.activedata");
		var selects = new Array;
		$.each(activedatas, function(idx, tr) {
			var dataId = $(tr).data("id");
			if (setting.data) {
				for (var i = 0; i < setting.data.length; i++) {
					var id = setting.data[i][idField];
					if (dataId == id) {
						selects.push(id);
					}
				}
			}
		});
		return selects;
	}

	this.onClicked = function(tr, closed) {
		var treeGridMng = this.manager(tr);
		if (null == treeGridMng.setting.isMultiSelect
				|| treeGridMng.setting.isMultiSelect == false) {
			typeInput = "radio";
		} else {
			typeInput = "checkbox";
		}
		var datas = treeGridMng.selected(tr);
		if (closed == null) {
			closed = false;
		}
		if (!treeGridMng.defaultSetting.isInit) {
			if ($("#" + treeGridMng.setting.proxyId).parents("form").length > 0) {
				// $("#"+treeGridMng.setting.proxyId).parents("form").valid();
				$("#" + treeGridMng.setting.proxyId).parent().find("i")
						.removeClass("fa-warning");
			}
		}
		if (treeGridMng.setting.allowNoneSelect != null) {
			if (!treeGridMng.setting.allowNoneSelect && datas.length == 0) {
				return;
			}
		}
		if (treeGridMng.setting.displayType == "model"
				|| treeGridMng.setting.displayType == "select") {
			var text = "";
			var ids = "";
			var selectCount = 0;
			if (datas != null && datas.length > 0) {
				var idField = treeGridMng.setting.idField ? treeGridMng.setting.idField
						: treeGridMng.defaultSetting.idField;
				var textField = treeGridMng.setting.textField ? treeGridMng.setting.textField
						: treeGridMng.defaultSetting.textField;
				$.each(datas, function(idx, data) {
					ids = ids + data[idField] + ",";
					text = text + data[textField] + ",";
					selectCount++;
				});
				ids = ids.substring(0, ids.length - 1);
				text = text.substring(0, text.length - 1);
			}
			try {
				var fontWidth = text.visualLength();
				var textAreaWidth = $("#selectbar_" + treeGridMng.setting.id + " .textarea").width();
				if(fontWidth > textAreaWidth) {
					$("#selectbar_" + treeGridMng.setting.id + " .textarea").text("已选择数据记录："+selectCount+"条");
				} else {
					$("#selectbar_" + treeGridMng.setting.id + " .textarea").text(text);
				}
				$("#" + treeGridMng.setting.proxyId).val(ids);
			} catch (e) {
			}
			if (treeGridMng.setting.callBack) {
				treeGridMng.setting.callBack(datas);
			}
			if (treeGridMng.setting.displayType == "model") {
				if ((treeGridMng.setting.isMultiSelect != null && treeGridMng.setting.isMultiSelect)
						|| treeGridMng.defaultSetting.isMultiSelect) {
					if (closed) {
						if (treeGridMng.setting.onDestory) {
							eval(treeGridMng.setting.onDestory);
						} else {
							treeGridMng.onDestorying(treeGridMng.setting.id);
						}
					}
				} else {
					if (treeGridMng.setting.onDestory) {
						eval(treeGridMng.setting.onDestory);
					} else {
						treeGridMng.onDestorying(treeGridMng.setting.id);
					}
				}

			} else if (treeGridMng.setting.displayType == "select") {
				if (!((treeGridMng.setting.isMultiSelect != null && treeGridMng.setting.isMultiSelect) || treeGridMng.defaultSetting.isMultiSelect)) {
					$("#" + treeGridMng.setting.id).data("close", true);
					$("#" + treeGridMng.setting.id).slideUp();
				}
			}
		}
		if ($("#" + treeGridMng.setting.proxyId).parents("form").length > 0) {
			// alert($("#"+treeGridMng.setting.proxyId).parent().find("i").length);
			$("#" + treeGridMng.setting.proxyId).parent().find("i")
					.removeClass("fa-warning");
			// $("#"+treeGridMng.setting.proxyId).parents("form").valid();
		}
		return datas;
	}

	this.remoteExpandData = function(url, td) {
		if(url.indexOf("?") > -1) {
			url += "&times=" + new Date().getTime();
		} else {
			url += "?times=" + new Date().getTime()
		}
		$.ajax({
			url : url,
			type : "post",
			async : true,
			dataType : "json",
			success : function(data) {
				var treeGridMng = lastTreeGrid.manager(td);
				if (!treeGridMng.setting.data) {
					treeGridMng.setting.data = data.tree;
				} else if (treeGridMng.setting.data.length > 0) {
					treeGridMng.setting.data.push(data.tree);
				}
				treeGridMng.initExpandData(td);
			},
			error : function() {
				g.warning("load error.");
			}
		});
	}

	this.initExpandData = function(td) {
		var treeGridMng = this.manager(td);
		var id = td.parent().data("id");
		var cls = td.parent().attr("class");
		if (!treeGridMng) {
			return;
		}
		if (null == treeGridMng.setting.isMultiSelect
				|| treeGridMng.setting.isMultiSelect == false) {
			typeInput = "radio";
		} else {
			typeInput = "checkbox";
		}
		var isXmp = false;
		if(treeGridMng.setting.url != null && treeGridMng.setting.url.indexOf("companyCategory/") > -1) {
			isXmp = true;
		}
		var idField = treeGridMng.setting.idField ? treeGridMng.setting.idField
				: treeGridMng.defaultSetting.idField;
		var textField = treeGridMng.setting.textField ? treeGridMng.setting.textField
				: treeGridMng.defaultSetting.textField;
		var parentIdField = treeGridMng.setting.parentIdField ? treeGridMng.setting.parentIdField
				: treeGridMng.defaultSetting.parentIdField;
		var hasCheckbox = treeGridMng.setting.checkbox != null ? treeGridMng.setting.checkbox
				: treeGridMng.defaultSetting.checkbox;
		var isRelationCheck = treeGridMng.setting.isRelationCheck != null ? treeGridMng.setting.isRelationCheck
				: treeGridMng.defaultSetting.isRelationCheck;
		var treeData = "";
		var left = $(td).data("width") + 13;
		if (treeGridMng.setting.displayType != "select") {
			left += 12;
		}
		var curObj = null;
		var expandAllUnEapanding = treeGridMng.setting.expandAllUnEapanding ? treeGridMng.setting.expandAllUnEapanding
				: treeGridMng.defaultSetting.expandAllUnEapanding;
		;
		var bottomShowStyle = "";
		if (expandAllUnEapanding || treeGridMng.setting.displayType == "select") {
			bottomShowStyle = "border-bottom:0px";
		}
		$.each(treeGridMng.setting.data, function(idx, obj) {
							if (obj[parentIdField] == id) {
								var isFolder = false;
								for (var i = 0; i < treeGridMng.setting.data.length; i++) {
									if (treeGridMng.setting.data[i][parentIdField] == obj[idField]) {
										isFolder = true;
										break;
									}
								}
								curObj = obj;
								if (!isRelationCheck) {
									cls = cls.replace("activedata", "");
								}
								var checkStr = cls.indexOf("activedata") > -1 ? "checked" : "";
								if($("#" + treeGridMng.setting.id).find("tr[data-id='"+obj[idField]+"']").length > 0) {
									$("#" + treeGridMng.setting.id).find("tr[data-id='"+obj[idField]+"']").show();
									return;
								}
								treeData += '<tr data-id="' + obj[idField]
										+ '" class="' + cls + " "
										+ obj[idField] + '" data-parent="'
										+ obj[parentIdField] + '">';
								if (treeGridMng.setting.header) {
									if (hasCheckbox) {
										treeData += '<td style="width:40px;border-right:0px;'
												+ bottomShowStyle
												+ '"><input type="'
												+ typeInput
												+ '" class="form-control treegridchkbox" '
												+ checkStr
												+ ' style="padding: 0px !important;margin: 0px !important;margin-left:0px !important;" value="'
												+ obj[idField] + '" /></td>';
									}
									$.each(treeGridMng.setting.header, function(idx, objHeader) {
														var txt = "";
														if (objHeader.render) {
															txt = objHeader
																	.render(obj);
														} else {
															var objVal = obj;
															if (objHeader.field
																	.indexOf(".") > -1) {
																var fields = objHeader.field
																		.split(".");
																for (var k = 0; k < fields.length; k++) {
																	objVal = objVal[fields[k]];
																	if (objVal == null) {
																		break;
																	}
																}
															} else {
																objVal = objVal[objHeader.field];
															}
															txt = objVal;
														}
														if (txt == null) {
															txt = "";
														}
														if (idx == 0) {
															if (isFolder) {
																treeData += '<td folder  data-width="'
																		+ left
																		+ '" data-close="true" style="border-right:0px;border-left:0px;'
																		+ bottomShowStyle
																		+ '"><i class=" fa fa-folder" style="padding-left:'
																		+ left
																		+ 'px;"></i>'
																		+ txt
																		+ '</td>';
															} else {
																if(isXmp) {
																	treeData += '<td style="border-right:0px;border-left:0px;'
																		+ bottomShowStyle
																		+ '"><i class=" fa fa-file" style="padding-left:'
																		+ left
																		+ 'px;margin-left: 0px;"></i><xmp>'
																		+ txt
																		+ '</xmp></td>';
																} else {
																	treeData += '<td style="border-right:0px;border-left:0px;'
																		+ bottomShowStyle
																		+ '"><i class=" fa fa-file" style="padding-left:'
																		+ left
																		+ 'px;margin-left: 0px;"></i>'
																		+ txt
																		+ '</td>';
																}
															}
														} else {
															if(txt.indexOf("<div class=\"operate_fa\"") > -1) {
																treeData += '<td style="border-right:0px;border-left:0px;'
																	+ bottomShowStyle
																	+ '">'
																	+ txt
																	+ '</td>';
															} else {
																if(isXmp) {
																	treeData += '<td style="border-right:0px;border-left:0px;'
																		+ bottomShowStyle
																		+ '"><xmp>'
																		+ txt
																		+ '</xmp></td>';
																} else {
																	treeData += '<td style="border-right:0px;border-left:0px;'
																		+ bottomShowStyle
																		+ '">'
																		+ txt
																		+ '</td>';
																}
															}
														}
													});
								} else {
									if (hasCheckbox) {
										treeData += '<td style="width:40px;border-right:0px;'
												+ bottomShowStyle
												+ '"><input type="'
												+ typeInput
												+ '" class="form-control treegridchkbox" style="padding: 0px !important;margin: 0px !important;margin-left:0px !important;" value="'
												+ obj[idField] + '" /></td>';
									}
									if (isFolder) {
										if(isXmp) {
											treeData += '<td folder data-width="'
												+ left
												+ '" data-close="true" style="border-right:0px;border-left:0px;'
												+ bottomShowStyle
												+ '"><i class=" fa fa-folder" style="padding-left:'
												+ left + 'px;"></i><xmp>'
												+ obj[textField] + '</xmp></td>';
										} else {
											treeData += '<td folder data-width="'
												+ left
												+ '" data-close="true" style="border-right:0px;border-left:0px;'
												+ bottomShowStyle
												+ '"><i class=" fa fa-folder" style="padding-left:'
												+ left + 'px;"></i>'
												+ obj[textField] + '</td>';
										}
									} else {
										if(isXmp) {
											treeData += '<td style="border-right:0px;border-left:0px;'
												+ bottomShowStyle
												+ '"><i class=" fa fa-file" style="padding-left:'
												+ left
												+ 'px;margin-left: 0px;"></i><xmp>'
												+ obj[textField] + '</xmp></td>';
										} else {
											treeData += '<td style="border-right:0px;border-left:0px;'
												+ bottomShowStyle
												+ '"><i class=" fa fa-file" style="padding-left:'
												+ left
												+ 'px;margin-left: 0px;"></i>'
												+ obj[textField] + '</td>';
										}
									}
								}
								treeData += '</tr>';
								$(td).parent().after(treeData);
								if (isFolder) {
									var expandAllUnEapanding = treeGridMng.setting.expandAllUnEapanding ? treeGridMng.setting.expandAllUnEapanding
											: treeGridMng.defaultSetting.expandAllUnEapanding;
									;
									if (expandAllUnEapanding || treeGridMng.setting.displayType == "select") {
										var td1 = $(td).parent().next().find("td[data-close]");
										$("#" + treeGridMng.setting.id).find(
												"tr[data-id='" + obj[idField] + "']").find(".fa-folder")
												.addClass("fa-folder-open");
										treeGridMng.initExpandData(td1);
									}
								}
								treeData = "";
							}
						});
		$("tr[loading]").remove();
		// $(td).parent().find('[data-parent="'+curObj[parentIdField]+'"]').toggle(1000);
		treeGridMng.bindEvent(treeGridMng.setting.proxyId);
		$("#" + treeGridMng.setting.id).find("input[type='" + typeInput + "']").uniform();
		//resizeTreeGridPlugin();
	}

	this.onExpanding = function(td) {
		var treeGridMng = this.manager(td);
		var loadingHtml = '<tr style="display:none;" loading><td><span>&nbsp;&nbsp;Loading... </span></td></tr>';
		$(td).parent().after(loadingHtml);
		if (treeGridMng.setting.expandUrl) {
			var id = td.parent().data("id");
			treeGridMng
					.remoteExpandData(treeGridMng.setting.expandUrl + id, td);
		} else {
			treeGridMng.initExpandData(td);
			var id = td.parent().data("id");
		}
	}

	this.reload = function() {
		this.defaultSetting.isInit = true;
		this.setting.data = null;
		this.remoteData(this.setting.id, this.setting.url);
	}
	// 重置所有选中
	this.reset = function() {
		/* $("#"+this.setting.id).find("input[type='"+typeInput+"']").attr("checked",false); */
		$("#" + this.setting.id).find("input[type='" + typeInput + "']")
				.parent().removeClass("checked");
		$("#selectbar_" + this.setting.id + " .textarea").text("");
		$("#" + this.setting.proxyId).val("");
		$("#" + this.setting.id + " .activedata").removeClass("activedata");
		$("#" + this.setting.id).find("i[class='fa fa-times']").click();
	}
	this.search = function(id) {
		var treeGridMng = treeGridMngs.get(id);
		var searchVal = $.trim($("#" + id).find(".selecttree-search-input")
				.val());
		if (searchVal.length == 0) {
			$("#" + id).find(".griddatatable tr").show();
		} else {
			$("#" + id).find(".griddatatable tr").hide();
			var idField = treeGridMng.setting.idField ? treeGridMng.setting.idField
					: treeGridMng.defaultSetting.idField;
			var textField = treeGridMng.setting.textField ? treeGridMng.setting.textField
					: treeGridMng.defaultSetting.textField;
			var parentIdField = treeGridMng.setting.parentIdField ? treeGridMng.setting.parentIdField
					: treeGridMng.defaultSetting.parentIdField;
			$.each(treeGridMng.setting.data, function(idx, data) {
				if (data[textField].indexOf(searchVal) > -1) {
					var searchTr = $("#" + id).find(
							".griddatatable tr[data-id='" + data[idField]
									+ "']");
					searchTr.show();
					while (true) {
						var parent = searchTr.data("parent");
						if (parent && parent != "null" && parent != null) {
							searchTr = $("#" + id).find(
									".griddatatable tr[data-id='" + parent
											+ "']");
							searchTr.show();
						} else {
							break;
						}
					}
				}
			});
		}
	}

	this.initData = function(id) {
		var treeGridMng = treeGridMngs.get(id);
		if (null == treeGridMng.setting.isMultiSelect
				|| treeGridMng.setting.isMultiSelect == false) {
			typeInput = "radio";
		} else {
			typeInput = "checkbox";
		}
		var width = $("#" + id).width();
		var tableWidth = $("#" + id).find("table").width();
		if (!tableWidth) {
			tableWidth = 0;
		}
		if (tableWidth > width) {
			width = tableWidth;
		}
		var hasCheckbox = treeGridMng.setting.checkbox != null ? treeGridMng.setting.checkbox
				: treeGridMng.defaultSetting.checkbox;

		if (!treeGridMng.setting.displayType == "model") {
			width = $("#" + treeGridMng.setting.proxyId).width();
		}
		var columnWidthStr = columnWidth;
		if (treeGridMng.setting.data && treeGridMng.setting.data.length > 0) {
			var maxHeight = treeGridMng.setting.maxHeight ? treeGridMng.setting.maxHeight
					: treeGridMng.defaultSetting.maxHeight;
			var treeData = '<div class="catalog-form">';
			if (treeGridMng.setting.header) {
				if ($("#" + treeGridMng.setting.id).hasClass("modal-body")) {
					width = $("#" + treeGridMng.setting.id + " .modal-body")
							.width();
				}
				columnWidthStr = (width - 30)
						/ treeGridMng.setting.header.length + "";
				treeData += '<table class="table-bordered table griddatatableheader"><thead><tr role="row">';
				if (hasCheckbox) {
					treeData += '<th style="width:40px;border: 0px !important;"><input type="'
							+ typeInput
							+ '" class="form-control" style="padding: 0px !important;margin: 0px !important;margin-left:0px !important;" name="checkboxcontrol" value="" /></th>';
				}
				if (columnWidthStr.indexOf("%") == -1) {
					columnWidthStr += "px";
				}
				$.each(treeGridMng.setting.header, function(idx, objHeader) {
					treeData += '<th style="width:' + columnWidthStr + ';">'
							+ objHeader.text + '</th>';
				});
				treeData += '</tr></thead></table>';
			}
			if (null != treeGridMng.setting.displayType
					&& treeGridMng.setting.displayType == "select") {
				treeData += '<div class="treegrid-select-panel"><input type="text" value="" class="search-input selecttree-search-input" type="text"/><i class="fa fa-times"></i></div><div class="dataTables-scroll-catalog" style="max-height: 240px;overflow-y:auto !important;"';
			} else {
				treeData += '<div class="dataTables-scroll-catalog"';
			}
			treeData += '>';
			if (maxHeight < 0) {
				treeData += '<table class="table griddatatable">';
			} else {
				treeData += '<table class="table griddatatable">';
			}
			var prevId = null;
			var prevCls = "";
			var left = 0;
			var idField = treeGridMng.setting.idField ? treeGridMng.setting.idField
					: treeGridMng.defaultSetting.idField;
			var textField = treeGridMng.setting.textField ? treeGridMng.setting.textField
					: treeGridMng.defaultSetting.textField;
			var parentIdField = treeGridMng.setting.parentIdField ? treeGridMng.setting.parentIdField
					: treeGridMng.defaultSetting.parentIdField;
			var isXmp = false;
			if(treeGridMng.setting.url != null && treeGridMng.setting.url.indexOf("companyCategory/") > -1) {
				isXmp = true;
			}
			var myIndex = 0;
			$.each(treeGridMng.setting.data, function(idx, obj) {
								var icon = "fa-file";
								var currId = obj[idField];
								$.each(treeGridMng.setting.data, function(idx,
										obj1) {
									var pid = obj1[parentIdField];
									if (currId == pid) {
										icon = "fa-folder";
										return false;
									}
								});
								var parentId = obj[parentIdField];
								parentId = parentId == null ? "" : parentId;
								var style = "";
								var isDisplay = false;
								var isClose = true;
								if (parentId == "") {
									prevCls = obj[idField];
									left = 0;
									prevCls = prevCls + "";
									if (prevCls.indexOf("activedata") > -1) {
										prevCls = prevCls.replace(
												" activedata", "");
									}

									if (setting.header) {
										treeData += '<tr style="' + style
												+ '" data-id="' + obj[idField]
												+ '" class="' + prevCls
												+ '" data-parent="' + parentId
												+ '">';
										if (hasCheckbox) {
											treeData += '<td style="width:40px;border-right:0px;"><input type="'
													+ typeInput
													+ '" class="form-control treegridchkbox" style="padding: 0px !important;margin: 0px !important;margin-left:0px !important;" value="'
													+ obj[idField]
													+ '" /></td>';
										}
										$.each(setting.header, function(idx, objHeader) {
															var txt = "";
															if (objHeader.render) {
																txt = objHeader
																		.render(obj);
															} else {
																var objVal = obj;
																if (objHeader.field
																		.indexOf(".") > -1) {
																	var fields = objHeader.field
																			.split(".");
																	for (var k = 0; k < fields.length; k++) {
																		objVal = objVal[fields[k]];
																		if (objVal == null) {
																			break;
																		}
																	}
																} else {
																	objVal = objVal[objHeader.field];
																}
																txt = objVal;
															}
															if (txt == null) {
																txt = "";
															}
															if (idx == 0) {
																if(isXmp) {
																	treeData += '<td folder data-width="'
																		+ left
																		+ '" data-close="'
																		+ isClose
																		+ '" style="width:'
																		+ columnWidthStr
																		+ ';border-right:0px;border-left:0px;"><i class=" fa '
																		+ icon
																		+ '" style="padding-left:'
																		+ left
																		+ 'px;margin-left:0px !important;"></i><xmp>'
																		+ txt
																		+ '</xmp></td>';
																} else {
																	treeData += '<td folder data-width="'
																		+ left
																		+ '" data-close="'
																		+ isClose
																		+ '" style="width:'
																		+ columnWidthStr
																		+ ';border-right:0px;border-left:0px;"><i class=" fa '
																		+ icon
																		+ '" style="padding-left:'
																		+ left
																		+ 'px;margin-left:0px !important;"></i>'
																		+ txt
																		+ '</td>';
																}
															} else {
																if(txt.indexOf("<div class=\"operate_fa\"") > -1) {
																	treeData += '<td style="width:'
																		+ columnWidthStr
																		+ ';border-right:0px;border-left:0px;">'
																		+ txt
																		+ '</td>';
																} else {
																	if(isXmp) {
																		treeData += '<td style="width:'
																			+ columnWidthStr
																			+ ';border-right:0px;border-left:0px;"><xmp>'
																			+ txt
																			+ '</xmp></td>';
																	} else {
																		treeData += '<td style="width:'
																			+ columnWidthStr
																			+ ';border-right:0px;border-left:0px;">'
																			+ txt
																			+ '</td>';
																	}
																}
															}
														});
										treeData += '</tr>';
									} else {
										// radio添加请选择
										var strOp = "请选择";
										if (myIndex == 0
												&& typeInput == 'radio') {
											treeData += '<tr style="'
													+ style
													+ '" data-id="" data-parent="">';
											treeData += '<td style="width:40px;border-right:0px;border-bottom:0px;"><input type="'
													+ typeInput
													+ '" class="form-control treegridchkbox" style="padding: 0px !important;margin: 0px !important;margin-left:0px !important;" value="" /></td>';
											treeData += '<td  folder data-width="'
													+ left
													+ '" data-close="'
													+ isClose
													+ '" style="width:'
													+ columnWidthStr
													+ ';border-right:0px;border-bottom:0px;border-left:0px;"><i class="222 fa '
													+ icon
													+ '" style="padding-left:'
													+ left
													+ 'px;margin-left:0px !important;"></i>'+strOp+'</td></tr>';
											myIndex++;
										}
										treeData += '<tr style="' + style
												+ '" class="' + prevCls
												+ '" data-id="' + obj[idField]
												+ '" data-parent="' + parentId
												+ '">';
										if (hasCheckbox) {
											treeData += '<td style="width:40px;border-right:0px;border-bottom:0px;"><input type="'
													+ typeInput
													+ '" class="form-control treegridchkbox" style="padding: 0px !important;margin: 0px !important;margin-left:0px !important;" value="'
													+ obj[idField]
													+ '" /></td>';
										}
										var txt = obj[textField];
										// if(objHeader.render) {
										// txt = objHeader.render(obj);
										// }
										if(isXmp) {
											treeData += '<td folder data-width="'
												+ left
												+ '" data-close="'
												+ isClose
												+ '" style="width:'
												+ columnWidthStr
												+ ';border-right:0px;border-bottom:0px;border-left:0px;"><i class="fa '
												+ icon
												+ '" style="padding-left:'
												+ left
												+ 'px;margin-left:0px !important;"></i><xmp>'
												+ txt + '</xmp></td></tr>';
										} else {
											treeData += '<td folder data-width="'
												+ left
												+ '" data-close="'
												+ isClose
												+ '" style="width:'
												+ columnWidthStr
												+ ';border-right:0px;border-bottom:0px;border-left:0px;"><i class="fa '
												+ icon
												+ '" style="padding-left:'
												+ left
												+ 'px;margin-left:0px !important;"></i>'
												+ txt + '</td></tr>';
										}
									}
								}
							});
			treeData += "</table></div></div>";
			if (treeGridMng.setting.displayType == "model") {
				$("#" + treeGridMng.setting.id).find(".modal-body").html(
						treeData);
			} else if (null != treeGridMng.setting.displayType
					&& treeGridMng.setting.displayType == "select") {
				$("#" + treeGridMng.setting.id).html(treeData);// ;
			} else {
				$("#" + treeGridMng.setting.id).html(treeData);
			}
			var expandAllUnEapanding = treeGridMng.setting.expandAllUnEapanding ? treeGridMng.setting.expandAllUnEapanding
					: treeGridMng.defaultSetting.expandAllUnEapanding;
			;
			if (expandAllUnEapanding
					|| treeGridMng.setting.displayType == "select") {
				$.each(treeGridMng.setting.data, function(idx, objd) {
					var td = $("#" + treeGridMng.setting.id).find(
							"tr[data-id='" + objd[idField] + "']").find(
							"td[data-close]");
					if(cache != null) {
						$("#" + treeGridMng.setting.id).find(
								"tr[data-id='" + cache + "']").find(".fa-folder")
								.addClass("fa-folder-open");
					}
					var childrens = 0;
					if(td != null) {
						childrens = $(td).parent().find("tr[data-parent='"+objd[idField]+"']").length;
					}
					if(childrens == 0) {
						treeGridMng.initExpandData(td);
					}
				});
				$("#" + treeGridMng.setting.id).find(".fa-folder").removeClass(
						"fa-folder-open").removeClass("fa-folder");
				$("#" + treeGridMng.setting.id).find(".fa-file").removeClass(
						"fa-file");
				$("#" + treeGridMng.setting.id).find("tr")
						.css("border", "0px !important");
			} else {
				var openCache = treeGridMng.defaultSetting.openCache.keySet();
				if (openCache.length > 0) {
					for (var i = 0; i < openCache.length; i++) {
						var cache = openCache[i];
						var td = $("#" + treeGridMng.setting.id).find(
								"tr[data-id='" + cache + "']").find(
								"td[data-close]");
						$("#" + treeGridMng.setting.id).find(
								"tr[data-id='" + cache + "']").find("td:eq(1)")
								.attr("data-close", "false");
						$("#" + treeGridMng.setting.id).find(
								"tr[data-id='" + cache + "']").find(
								".fa-folder").addClass("fa-folder-open");
						treeGridMng.initExpandData(td);
					}
				}
			}
			var defaultVal = treeGridMng.setting.defaultText;
			var defaultSize = 1;
			if (defaultVal && defaultVal.length > 0) {
				if (defaultVal.indexOf(",") > -1) {
					defaultVal = defaultVal.split(",");
					defaultSize = defaultVal.length;
				}
			}
			$("#selectbar_" + treeGridMng.setting.id + " .textarea").text("");
			$("#" + treeGridMng.setting.proxyId).val("");
			if (defaultSize == 1) {
				$("#" + treeGridMng.setting.id).find("tr[data-id='" + defaultVal + "']").click();
				$("#" + treeGridMng.setting.id).find(
						"tr[data-id='" + defaultVal + "']").addClass(
						"activedata");
				$("#" + treeGridMng.setting.id).find(
						"tr[data-id='" + defaultVal + "'] .treegridchkbox")
						.attr("checked", true);
				$("#" + treeGridMng.setting.id).find("tr[data-id='" + defaultVal + "']").attr("checked", true);
				$("#" + treeGridMng.setting.id).find(
						"tr[data-id='" + defaultVal + "'] .treegridchkbox").parent().addClass("checked");
				if (treeGridMng.setting.data
						&& treeGridMng.setting.data.length > 0) {
					$.each(treeGridMng.setting.data, function(idx, objd) {
						if (objd[idField] == defaultVal) {
							$("#" + treeGridMng.setting.proxyId)
									.val(defaultVal);
							$(
									"#selectbar_" + treeGridMng.setting.id
											+ " .textarea").text(
									objd[textField]);
							return false;
						}
					});
				}
			} else if (defaultSize > 1) {
				var showText = "";
				var showIds = "";
				for (var i = 0; i < defaultSize; i++) {
					$("#" + treeGridMng.setting.id).find("tr[data-id='" + defaultVal[i] + "']").click();
					$("#" + treeGridMng.setting.id).find(
							"tr[data-id='" + defaultVal[i] + "']").addClass(
							"activedata");
					$("#" + treeGridMng.setting.id).find(
							"tr[data-id='" + defaultVal[i]
									+ "'] .treegridchkbox").attr("checked",
							true);
					$("#" + treeGridMng.setting.id).find("tr[data-id='" + defaultVal[i] + "']").attr("checked", true);
					$("#" + treeGridMng.setting.id).find(
							"tr[data-id='" + defaultVal[i] + "'] .treegridchkbox").parent().addClass("checked");
					$.each(treeGridMng.setting.data, function(idx, objd) {
						if (objd[idField] == defaultVal[i]) {
							showText = showText + objd[textField] + ",";
							showIds = showIds + objd[idField] + ",";
							return false;
						}
					});
				}
				if (showText.length > 0) {
					showText = showText.substring(0, showText.length - 1);
					showIds = showIds.substring(0, showIds.length - 1);
				}
				$("#selectbar_" + treeGridMng.setting.proxyId).val(showIds);
				$("#" + treeGridMng.setting.proxyId).val(showIds);
				$("#selectbar_" + treeGridMng.setting.id + " .textarea").text(
						showText);
			}
			$("#" + treeGridMng.setting.id).find(
					"input[type='" + typeInput + "']").uniform();
			treeGridMng.bindEvent(treeGridMng.setting.proxyId);
			resizeTreeGridPlugin(treeGridMng.setting.id);
		} else {
			var maxHeight = treeGridMng.setting.maxHeight ? treeGridMng.setting.maxHeight
					: treeGridMng.defaultSetting.maxHeight;
			var treeData = '<div class="catalog-form">';
			var columnNumbers = 1;
			if (treeGridMng.setting.header) {
				if ($("#" + treeGridMng.setting.id).hasClass("modal-body")) {
					width = $("#" + treeGridMng.setting.id + " .modal-body")
							.width();
				}
				columnNumbers = treeGridMng.setting.header.length;
				columnWidth = (width - 30) / treeGridMng.setting.header.length;
				treeData += '<table class="table-bordered table griddatatableheader"><thead><tr role="row">';
				if (hasCheckbox) {
					treeData += '<th style="width:30px;border: 0px !important;"><input type="'
							+ typeInput
							+ '" class="form-control" style="padding: 0px !important;margin: 0px !important;width: 30px;" name="checkboxcontrol" value="" /></th>';
				}
				$.each(treeGridMng.setting.header, function(idx, objHeader) {
					treeData += '<th>' + objHeader.text + '</th>';
				});
				treeData += '</tr></thead></table>';
			}
			if (null != treeGridMng.setting.displayType
					&& treeGridMng.setting.displayType == "select") {
				treeData += '<div class="dataTables-scroll-catalog" style="border:none;margin-top: 0px;';
			} else {
				treeData += '<div class="dataTables-scroll-catalog" style="border:none;';
			}
			if (maxHeight < 0) {
				treeData += 'max-height:300px;overflow-y: auto;';
			} else {
				treeData += 'max-height: ' + maxHeight + ';overflow-y: auto;';
			}
			treeData += '">';
			if (maxHeight < 0) {
				treeData += '<table class="table-bordered table griddatatable">';
			} else {
				treeData += '<table class="table-bordered table griddatatable">';
			}
			treeData += '';
			var msg = "无查询结果";
			treeData += '<tr><td align="center" colspan="'
					+ columnNumbers
					+ '" folder data-width="0" data-close="true" style="width:100%;border-right:0px;border-bottom:0px;border-left:0px;">'
					+ msg + '</td></tr></table></div></div>';
			if (treeGridMng.setting.displayType == "model") {
				if ($("#" + treeGridMng.setting.id).find(".modal-body")
						.hasClass(".catalog-form")) {
					$("#" + treeGridMng.setting.id).find(
							".modal-body .catalog-form").remove();
				}
				$("#" + treeGridMng.setting.id).find(".modal-body").html(
						treeData);
			} else if (null != treeGridMng.setting.displayType
					&& treeGridMng.setting.displayType == "select") {
				$("#" + treeGridMng.setting.id).html(treeData);// ;
			} else {
				$("#" + treeGridMng.setting.id).html(treeData);
			}
			resizeTreeGridPlugin(treeGridMng.setting.id);
		}
		if(typeInput != "checkbox") {
			var len = $("#" + treeGridMng.setting.id).find(".treegridchkbox:checked");
			if(len != null && len.length > 1) {
				var $first = $($("#" + treeGridMng.setting.id).find(".treegridchkbox:checked")[0]);
				$first.attr("checked", false);
				$first.parent().removeClass("checked");
			}
		}
		treeGridMng.defaultSetting.isInit = false;
	}
}

//重设列表table宽度
function resizeTablieList(header) {
	$header = $(header);
	$headertable = $header.find(".list_table");
	var dataWidth = 0;
	var resultWidth = 0;
	var padding = (window.navigator.userAgent.indexOf("Chrome") !== -1) ? 10 : 17;
	var windowWidth = $(window).width() - padding;
	if($(header).hasClass("treeContain")||$(header).find("div").hasClass("treeContain")){
		if($(header).parents(".tree_contain").find(".left_tree").css("display")=="none"){
			windowWidth=windowWidth-30;
		}else{
			windowWidth=windowWidth-280;
		}
	}
	$(header).find("table thead tr:first th:visible").each(function() {
		var thWidth = $(this).attr("width");
		if (isNaN(thWidth)) {
			thWidth = parseInt($(this).width());
			thWidth += 13;
		}
		dataWidth += parseInt(thWidth == null ? 0 : thWidth);
	});
	resultWidth = dataWidth > windowWidth ? dataWidth : windowWidth;
	if (resultWidth < windowWidth) {
		$header.find(".list_table").width(resultWidth);
		$(header + "_wrapper").parent(".slimScrollDiv").width(resultWidth);
		$(header + "_wrapper").width(resultWidth);
		$(header + "_wrapper").find(".list_table").width(resultWidth);
	} else {
		$header.find(".list_table").width(resultWidth - 10);
		$(header + "_wrapper").parent(".slimScrollDiv").width(resultWidth - 10);
		$(header + "_wrapper").width(resultWidth - 10);
		$(header + "_wrapper").find(".list_table").width(resultWidth - 10);
	}
	if($(header).attr("class")!=undefined&&$(header).attr("class").indexOf("resetTableHead")!=-1){
		var headTh = $(header + "_wrapper").find(".list_table thead").clone();
		$(header + "_wrapper").find(".list_table thead").remove();
		$(header + "_wrapper").find(".list_table tbody").before($(headTh).prop("outerHTML"));
//		$(header + "_wrapper").find(".list_table tbody").removeClass("page-break-inside");
	}
}

function resizeTreeGridPlugin(resizeId) {
	if(resizeId != null) {
		var treeGridMng = treeGridMngs.get(resizeId);
		if (treeGridMng.setting.displayType == "select") {
			$("#" + treeGridMng.setting.proxyId).css("position", "inherit")
					.css("top", "0px").css("left", "0px");
			var wid = $('#' + treeGridMng.setting.proxyId).outerWidth(true);
			$("#selectbar_" + treeGridMng.setting.id).css("position",
					"absolute").css("width", wid+"px");
			$("#selectbar_" + treeGridMng.setting.id + " .textarea").css(
					"width", (wid - 30) + "px");
			$("#" + treeGridMng.setting.proxyId)
					.css("position", "absolute").css("top", "-1000px").css(
							"left", "-10000px");

		} else if (treeGridMng.setting.displayType == "normal") {
			// var addH = $(window).height() -
			// $("#page-header-container").height() -
			// $("#main-page-container").height();
			// $("#"+treeGridMng.setting.id).height(function(index, height){
			// $("#"+treeGridMng.setting.id).find(".dataTables-scroll-catalog").css("max-height",
			// (height + addH-45)+"px");
			// return height + addH-45;
			// });
			// 高度控制
			var wrapperHeight = $(window).height()
					- $("#page-header-container").height();
			var $tabContent = $("#main-container").find(
					".tab-content > .active").first();
			var contentHeight = $tabContent.find(".portlet-header")
					.height()
					+ $("#" + treeGridMng.setting.id).find(
							".griddatatableheader").height();
			wrapperHeight = wrapperHeight - contentHeight - 96;
			$("#" + treeGridMng.setting.id).find(
					".dataTables-scroll-catalog").css("margin-bottom",
					"0px").css("margin-top", "0px");
			var width = $(window).width();
			width = (width < 1000 ? 1000 : width);
			$("#" + treeGridMng.setting.id).find(
					".dataTables-scroll-catalog").width(width - 13);
			width = width - 30;
			$("#" + treeGridMng.setting.id).find(".griddatatableheader")
					.css("margin-bottom", "0px").width(width).css(
							"min-width", width + "px");
			$("#" + treeGridMng.setting.id).find(".griddatatable").css(
					"max-width", width + "px").css("min-width",
					width + "px").css("width", width + "px");

		}
	} else {
		var keys = treeGridMngs.keySet();
		if (keys.length > 0) {
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var treeGridMng = treeGridMngs.get(key);
				if (treeGridMng.setting.displayType == "select") {
					$("#" + treeGridMng.setting.proxyId).css("position", "inherit")
							.css("top", "0px").css("left", "0px");
					var wid = $('#' + treeGridMng.setting.proxyId).outerWidth(true);
					$("#selectbar_" + treeGridMng.setting.id).css("position",
							"absolute").css("width", wid+"px");
					$("#selectbar_" + treeGridMng.setting.id + " .textarea").css(
							"width", (wid - 30) + "px");
					$("#" + treeGridMng.setting.proxyId)
							.css("position", "absolute").css("top", "-1000px").css(
									"left", "-10000px");

				} else if (treeGridMng.setting.displayType == "normal") {
					// var addH = $(window).height() -
					// $("#page-header-container").height() -
					// $("#main-page-container").height();
					// $("#"+treeGridMng.setting.id).height(function(index, height){
					// $("#"+treeGridMng.setting.id).find(".dataTables-scroll-catalog").css("max-height",
					// (height + addH-45)+"px");
					// return height + addH-45;
					// });
					// 高度控制
					var wrapperHeight = $(window).height()
							- $("#page-header-container").height();
					var $tabContent = $("#main-container").find(
							".tab-content > .active").first();
					var contentHeight = $tabContent.find(".portlet-header")
							.height()
							+ $("#" + treeGridMng.setting.id).find(
									".griddatatableheader").height();
					wrapperHeight = wrapperHeight - contentHeight - 96;
					$("#" + treeGridMng.setting.id).find(
							".dataTables-scroll-catalog").css("margin-bottom",
							"0px").css("margin-top", "0px");
					var width = $(window).width();
					width = (width < 1000 ? 1000 : width);
					$("#" + treeGridMng.setting.id).find(
							".dataTables-scroll-catalog").width(width - 13);
					width = width - 30;
					$("#" + treeGridMng.setting.id).find(".griddatatableheader")
							.css("margin-bottom", "0px").width(width).css(
									"min-width", width + "px");
					$("#" + treeGridMng.setting.id).find(".griddatatable").css(
							"max-width", width + "px").css("min-width",
							width + "px").css("width", width + "px");

				}
			}
		}
	}
}
//计算jsTree高度
function resizeJSTreeHeigth(){
	var wrapperHeight = $(window).height()- $("#page-header-container").height();
	wrapperHeight = wrapperHeight - 55;
	$(".tree_contain").find(".left_tree").css({"overflow-y":"auto","overflow-x":"hidden", "height":wrapperHeight});
	$(".tree_contain").find(".icon_for").css({"height":wrapperHeight,"line-height":(wrapperHeight-50)+"px"});
	$(".tree_contain").find(".right_form").css({"min-height":wrapperHeight,"line-height":"20px"});
	$(".tree_contain").find(".report_initial").css({"height":wrapperHeight,"line-height":(wrapperHeight)+"px"});
}