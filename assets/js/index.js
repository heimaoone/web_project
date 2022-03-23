$(function () {
    getUserInfo()
    //退出模块
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layui.layer.confirm('确定退出吗?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //清空本地缓存
            localStorage.removeItem('token')
            //跳转到登陆页面
            location.href = '/login.html'
            layer.close(index);
        });

    })
})
//获得用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        //headers请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token' || '')
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            //调用函数 渲染用户头像
            render(res.data)
        }

    });
}
//渲染用户图像
function render(user) {
    console.log(user);
    //获取用户名称
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需 渲染头像
    if (user.user_pic !== null) {
        //渲染图片图像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        //渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}