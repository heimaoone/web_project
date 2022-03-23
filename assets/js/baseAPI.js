//每次调用 请求时  会先调用  ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    options.url = "http://www.liulongbin.top:3007" + options.url
    console.log(options.url);
})