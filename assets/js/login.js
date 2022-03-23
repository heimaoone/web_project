$(function () {
    //点击 去注册账号的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击  去登录的链接
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    // 从layui中 获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义 验证密码规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //再次确认密码验证
        repwd: function (value) {

            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不同'
            }
        }
    })

    //监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        //阻止默认的提交行为
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/reguser",
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('注册成功,请登录')
                $('#link_login').click()
            }
        });
    })
    //监听登录表单提交事件
    $('#form-login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/login",
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登陆失败')
                }
                layer.msg('登陆成功')
                //将登陆成功后的token值存入本地存储
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        });
    })
})