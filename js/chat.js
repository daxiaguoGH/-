$(function() {
    //方法封装到scroll.js中
    resetui()
        //为发送按钮做点击事件
    $('#btnSend').on('click', function() {
        var text = $('#ipt').val().trim()
        if (text.length <= 0) {
            return $('#ipt').val('')
        }
        //如果用户输入聊天内容，把内容追加到聊天框
        $('#talk_list').append('<li class="right_word"><img src="img/person02.png" /><span>' + text + '</span></li>')
        $('#ipt').val('')
            //重置滚动条位置
        resetui()
        getMsg(text)


    })

    //获取聊天机器人信息
    function getMsg(text) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/robot',
            data: { spoken: text },
            success: function(res) {
                console.log(res);
                if (res.message === 'success') {
                    //接受聊天信息
                    var msg = res.data.info.text
                        //机器人信息追加到聊天框
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span>')
                    resetui()
                    getVoice(msg)
                }

            }


        })

    }
    //转为语音
    function getVoice(msg) {
        $.ajax({
            type: 'GET',
            url: 'http://www.liulongbin.top:3006/api/synthesize',
            data: { text: msg },
            success: function(res) {
                console.log(res);
                if (res.status === 200) {
                    $('.voice').attr('src', res.voiceUrl)
                }
            }
        });

    }
    $('#ipt').on('keyup', function(e) {
        // console.log(e.keyCode);
        if (e.keyCode === 13) {
            $('#btnSend').click()
        }

    })
})