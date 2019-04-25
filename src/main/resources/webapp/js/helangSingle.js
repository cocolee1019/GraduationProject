/**
 * Created by helang on 2018/5/2.
 * Email:helang.love@qq.com
 * qq:1846492969
 */
/* 管理系统单页框架-jQuery类级别插件封装 */
$.extend({
    helangSingle:function (defaultParameter) {
        var helang=new Object();
        var $nav=$("#helangNav"),$tab=$("#helangTab"),$frame=$("#helangFrame");
        /* 已选择 */
        helang.selectedArr=[];

        /* 检索项 */
        helang.selectItem=function (url) {
            return index=helang.selectedArr.indexOf(url);
        };
        /* 创建项 */
        helang.creation=function (url,txt) {
            var index=helang.selectItem(url);
            if(index>=0){
                helang.showItem(index);
            }else {
                $frame.children("iframe").hide();
                $frame.append('<iframe src="'+url+'"></iframe>');
                $tab.children("li").removeClass("active");
                var srt='<span class="h_colse glyphicon glyphicon-remove" data-url="'+url+'"></span>';
                if(helang.selectedArr.length<1){
                    srt='';
                }
                $tab.append('<li role="presentation" class="active"><a href="javascript:;"> '+txt+' '+srt+' </a> </li>');
                helang.selectedArr.push(url);
            }

        };

        /* 显示项 */
        helang.showItem=function (index) {
            $frame.children("iframe").hide();
            $frame.children("iframe").eq(index).show();
            $tab.children("li").removeClass("active");
            $tab.children("li").eq(index).addClass("active");
        };

        /* 删除项 */
        helang.deleteItem=function (index) {
            $frame.children("iframe").eq(index).remove();
            $tab.children("li").eq(index).remove();
            helang.selectedArr.splice(index,1);
        };

        /* 初始化 */
        helang.init=function () {
            /* 框架集容器高度 */
            $frame.css("height",$(window).height()-$("#helangHead").outerHeight()-30+"px");

            /* 导航栏点击 */
            $nav.on("click",".h_nav",function () {
                helang.creation($(this).data("url"),$(this).text());
            });

            /* 选项卡点击 */
            $tab.on("click",">li",function () {
                var _index=$(this).index();
                helang.setTime=setTimeout(function () {
                    helang.showItem(_index);
                },100);
            });

            /* 选项卡关闭点击 */
            $tab.on("click",".h_colse",function () {
                var _index=helang.selectItem($(this).data("url"));
                setTimeout(function () {
                    clearTimeout(helang.setTime);
                    if($tab.children("li").eq(_index).hasClass("active")){
                        setTimeout(function () {
                            helang.showItem(0);
                        },10);
                    }
                    helang.deleteItem(_index);
                },10);

            });
        };
        helang.creation(defaultParameter.url,defaultParameter.title);
        helang.init();
    }
});