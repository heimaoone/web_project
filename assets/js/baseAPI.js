//每次调用 请求时  会先调用  ajaxPrefilter这个函数
$.ajaxPrefilter(function (options) {
    options.url = "http://www.liulongbin.top:3007" + options.url
    console.log(options.url);
    //
    //统一为有权限的接口 设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token' || '')
        }
    }



    //全局统一挂载 complete 回调函数
    //无论请求还是失败,最终都会调用这个函数
    options.complete = function (res) {
        // console.log(414);
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //强制清空token
            localStorage.removeItem('token')
            //强制跳转登录页
            location.href = '/login.html'
        }
    }

})