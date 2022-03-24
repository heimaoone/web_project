$(function () {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不相同'
            }
        }

    })


    $('.layui-form').on('submit', function (e) {
        e.preventDefault()

        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    console.log(111);
                    return layui.layer.msg('重置密码失败')
                }
                console.log(res);
                $('.layui-form')[0].reset()
            }
        });
    })
})