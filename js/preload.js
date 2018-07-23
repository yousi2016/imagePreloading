/*
* @Author: Administrator
* @Date:   2018-07-15 11:13:50
* @Last Modified by:   Administrator
* @Last Modified time: 2018-07-15 12:35:41
*/
;(function($){
	//构造函数模式
    function PreLoad(options) {
       //默认参数
        _default = {
        	//要预加载的图片路径数组
            imgsArr:[],
            //加载完每一张执行
            each:null,
            //所有图片加载完毕执行
            all:null,
            //true：有虚加载，false：无序加载
            order:true
        };
        //如果用户传的是一个字符串，先转换成数组
        options.imgsArr = (typeof options.imgsArr === 'string')?[options.imgsArr]:options.imgsArr;
		//将用户传来的参数和默认参数合并到一个空对象里面，空对象作用是避免将默认参数覆盖
        this.opts=$.extend({}, _default, options);
		//初始化函数
        this.init();
    };
    //原型模式
    PreLoad.prototype={
    	
    	constructor:PreLoad,
    	//初始化方法
        init:function () {

           var _this = this;
		   
		   //判断是有序加载还是无序加载
		   if (this.opts.order === true) {
		   	
		   		this.orderedPreload();
		   		
		   } else{
		   	
		   	 	this.unorderedPreload();
		   	 	
		   }
		   
        },
        //有序加载方法
        orderedPreload: function(){
        	var _this = this,
        	
                len = this.opts.imgsArr.length,
                
                count = 0;
            function load () {
            	//创建一个实例对象
            	var imgObj = new Image();
            	//图片加载完毕执行函数
            	$(imgObj).on('load error', function () {
            		  //只有用户传了each才执行
                    _this.opts.each && _this.opts.each(count, len);
                    //如果图片全部加载完毕
            		if (count > len - 1) {
            			 //只有用户传了all才执行
                        _this.opts.all && _this.opts.all();

            		} else{
            			//递归调用自身
            			load();
            		}
            		
            		count++;
            		
            	});
            	//将图片的路径复制给新创建的对象src
            	imgObj.src=_this.opts.imgsArr[count];
            };
            //先执行一次
         	load();
        },
        //无序加载方法
        unorderedPreload: function () {
        	var _this = this;
        	var count = 0,
               len = this.opts.imgsArr.length;
			//循环图片路径数组
           $.each(this.opts.imgsArr, function(i, src){
				//创建一个实例对象
                var imgObj = new Image();
				//图片加载完毕执行函数
                $(imgObj).on('load error', function () {

                    count++;
                    //只有用户传了each才执行
                    _this.opts.each && _this.opts.each(count, len);
					//如果图片全部加载完毕
                    if (count > len - 1) {
                        //只有用户传了all才执行
                        _this.opts.all && _this.opts.all();

                    }

                });
				//将图片的路径复制给新创建的对象src
                imgObj.src = src;

            });
        }
    };
	//1.通过$.extend()来扩展jQuery
   /* $.extend({
        preLoad:function (options){
        	//
            new PreLoad(options);
        }
    });*/
   //2.通过$.fn 向jQuery添加新的方法(推荐)
   $.fn.preLoad = function (options) {
   		console.log(this)
	   return this.each(function () {
	   		new PreLoad(options);
	   })
   };

})(jQuery);