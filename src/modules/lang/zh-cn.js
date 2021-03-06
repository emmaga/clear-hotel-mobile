define([], function () {'use strict';
    return {
        app: {
            name: 'HiApp'
        },
        global: {
            cancel: '取消',
            send: '发送',
            back: '返回',
            done: '完成',
            search: '搜索',
            modal_title: '系统消息',
            modal_button_ok: '确定',
            hour_ago: '小时前',
            day_ago: '天前',
            just_now: '刚刚',
            switch_language: '切换语言',
            preparing:'正在为您准备...',
            pano:'全景'

        },
        index: {
            nothing_found: '未有匹配结果',
            nothing_loaded: '没有加载到新动态',
            tweet: '动态',
            contacts: '联系人',
            setting: '设置',
            sen_tweet: '发动态',
            send_placeholder: '呃...说点什么吧？',
            sending: '正在发送中...',
            err_text_too_short: 'Er,内容有点短哦，再写点吧...'
        },
        setting: {
            feed_back: '意见反馈',
            feed_back_placeholder: 'Hi，有什么开心的不开心的告诉我们吧...',
            feed_back_result: '感谢您的反馈，我们将尽快与您联系！',
            check_update: '检测更新',
            about: '关于我们',
            login_out: '登出',
            nickname: '用户名',
            points: '积分',
            confirm_logout: '你确定要退出登录吗？',
            current_version: '当前版本为'
        },
        login: {
            loginname_placeholder: '请输入账号',
            password_placeholder: '请输入密码',
            login_btn: '登录',
            sign_up: '注册',
            forgot_pwd: '忘记密码',
            err_empty_input: '账户或密码不能为空',
            err_illegal_email: '登录账户必须是Email',
            login: '正在登录...'
        },
        timeline: {
            forward: '转发',
            comment: '评论',
            like: '喜欢'
        },
        item: {
            title: '正文'
        },
        comment: {
            reply: '回复',
            reply_comment: '回复评论',
            copy_comment: '复制评论',
            placeholder: 'Er,评论..',
            empty_comment: '暂时还没有评论',
            commenting: '评论中...'
        },
        chat: {
            title: '聊天',
            chatPlaceholder: '说点什么'
        },
        geo: {
            loading_geo: '正在获取您所在的位置...',
            permission_denied: '您拒绝了系统定位的权限申请',
            position_unavailable: '无法获取到您所在的地理位置信息',
            timeout: '获取地理位置信息超时',
            confirm_clean_geo: '您将清除定位的地理信息'
        },
        camera: {
            image_uploading: '正在上传图片...',
            confirm_clear_image: '你确定要取消选择的图片吗？',
            file_not_found_err: '未找到需要上传的文件',
            invalid_url_err: '无效的上传服务器指向',
            connection_err: '与网络断开或请求超时',
            abort_err: '已经取消图片的上传',
            not_modified_err: '没有修改'
        },
        error: {
            unknown_error: '未知错误',
            no_network: '无网络连接',
            http_error: '网络错误',
            error_text: '抱歉，出错了',
            error_expired: '抱歉，页面已过期，你可以关注公众号“',
            error_expired2: '”继续访问',
            phonegap_only: '该模块只支持在PhoneGap中使用',
            not_found: '404, 页面未找到'

        },
        room:{
            date_in:'入住',
            date_out:'离店',
            calendar_error:'请选择入住和离店时间',
            price:'均:￥',
            day1:'共',
            day2:'晚',
            total_price:'总价:',
            room_num:'房间数',
            name:'姓名',
            pre_name:'预订人姓名',
            tel:'手机号',
            pre_tel:'预订人手机号',
            submit:'提交订单',
            reserve:'预订',
            soldOut:'已订完',
            soldOut_class:'soldOutCN',
            price_detail:'价格详情',
            tel_error:'请输入正确的手机号',
            name_error:'预订人姓名不能为空',
            correct:'确定'
        },
        order:{
            order_message:'订单信息',
            order_id:'订单号',
            order_time:'下单时间',
            total_price:'总价',
            room_message:'客房信息',
            room_type:'房型',
            date:'日期',
            room_num:'房间数',
            price_detail:'房价明细',
            contacts:'联系人',
            telephone:'手机号',
            name:'姓名',
            stateText1:'等待处理',
            stateText2:'订房成功',
            stateText3:'订房失败',
            check_in_check_out: '入住时间',
            no_orders: '无订单'
        },
        confirm:{
            network_state:'当前网络不是wifi状态，继续播放可能会产生流量，确定继续观看？'
        }
    }
});