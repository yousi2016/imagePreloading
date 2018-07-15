/*
* @Author: Administrator
* @Date:   2018-07-15 11:13:50
* @Last Modified by:   Administrator
* @Last Modified time: 2018-07-15 12:35:41
*/
;(function($){
    function PreLoad(options) {
       
        _default = {
            imgsArr:[],
            each:null,
            all:null
        };
        //如果用户传的是一个字符串，先转换成数组
        options.imgsArr = (typeof options.imgsArr === 'string')?[options.imgsArr]:options.imgsArr;

        this.opts=$.extend({}, _default, options);

        this.init();
    };
    PreLoad.prototype={
        init:function () {

           var _this = this;

           var count = 0,
                len = this.opts.imgsArr.length;

           $.each(this.opts.imgsArr, function(i, src){

                var imgObj = new Image();

                $(imgObj).on('load error', function () {

                    count++;
                    //只有用户传了each才执行
                    _this.opts.each && _this.opts.each(count, len);

                    if (count > len - 1) {
                        //只有用户传了each才执行
                        _this.opts.all && _this.opts.all();

                    }

                });

                imgObj.src = src;

            });
        }
    };

    $.extend({
        preload:function (options){
            new PreLoad(options);
        }
    });

})(jQuery);