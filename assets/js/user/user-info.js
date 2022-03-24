$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return layer.msg('昵称长度必须在1~6个字符之间')
            }
        }
    })
    initUserInfo()

    //重置按钮
    $('#btnReset').on('click', function (e) {
        e.preventDefault() //阻止表单的默认重置行为
        initUserInfo()
    })

    //提交修改按钮
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),

            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                //调用父页面中的方法
                window.parent.getUserInfo()
            }
        });
    })
    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败11111')
                }
                // 调用form.val()快速为表单赋值
                form.val('fromUserInfo', res.data)
            }
        });
    }

})