define([], function () {'use strict';
    return {
        app: {
            name: 'HiApp'
        },
        global: {
            cancel: 'Cancel',
            send: 'Send',
            back:'Back',
            done:'Done',
            search:'Search',
            modal_title: 'System',
            modal_button_ok: 'OK',
            minute_ago:' mins ago',
            hour_ago:' hours ago',
            day_ago:' days ago',
            just_now:'Just now',
            language:'Language',
            switch_language:'Switching languages'
        },
        index: {
            nothing_found: 'No matching results',
            nothing_loaded:'Nothing loaded',
            tweet: 'Tweet',
            contacts: 'Contacts',
            setting: 'Setting',
            sen_tweet: 'New Tweet',
            send_placeholder: 'What is new with you.',
            sending:'Submitting...',
            err_text_too_short:'Ah,Content is too short'
        },
        setting: {
            feed_back: 'Feedback',
            feed_back_placeholder:'Hi,Any suggestions to tell us?',
            feed_back_result:'Thank you for your feedback',
            check_update: 'Update',
            about: 'About',
            login_out: 'Log out',
            nickname: 'Name',
            points: 'Points',
            confirm_logout:'Are you sure to log out?',
            current_version:'The current version is '
        },
        login: {
            loginname_placeholder: 'Email/Username',
            password_placeholder: 'Password',
            login_btn: 'Sign In',
            sign_up: 'Sign Up',
            forgot_pwd: 'Forgot password',
            err_empty_input: 'Please enter login name and password',
            err_illegal_email: 'Username must be Email',
            login: 'Loading, please wait...'
        },
        timeline:{
            forward:'Forward',
            comment:'Comment',
            like:'Like'
        },
        item:{
            title:'Tweet'
        },
        comment:{
            reply:'Reply',
            reply_comment:'Reply',
            copy_comment:'Copy',
            placeholder:'Write a comment ...',
            empty_comment:'No one comments',
            commenting:'Submitting...'
        },
        chat:{
            title:'Message',
            chatPlaceholder:'Message'
        },
        geo:{
            loading_geo:'Getting your geo info...',
            permission_denied:'Permission denied',
            position_unavailable:'Position unavailable',
            timeout:'Getting timeout',
            confirm_clean_geo:'You will clear geo info'
        },
        camera:{
            image_uploading: 'Uploading pictures',
            confirm_clear_image: 'Are you sure clear the selected pictures？',
            file_not_found_err: 'Upload file not found',
            invalid_url_err: 'Invalid url',
            connection_err: 'Connection error',
            abort_err: 'Abort upload',
            not_modified_err: 'Not modified'
        },
        error:{
            unknown_error:'Unknown error',
            no_network:'No network connection',
            http_error: 'network error',
            error_text: 'oops, something went wrong',
            error_expired: 'Sorry, this page has expired , you can re-access this page , by focusing public number : ',
            error_expired2: '',
            phonegap_only:'PhoneGap Only',
            not_found: '404, page not found'
        },
        room:{
            date_in:'check in:',
            date_out:'check out:',
            calendar_error:'Dates for check in and check out are both need',
            price:'average:￥',
            day1:'total',
            day2:'day/days',
            total_price:'total price',
            room_num:'room number',
            name:'name',
            pre_name:'name for reserved person',
            tel:'tel number',
            pre_tel:'tel number for reserved person',
            submit:'submit',
            reserve:'reserve',
            soldOut:'sold out',
            price_detail:'price detail',
            tel_error:'Please input the correct phone number',
            name_error:'The name of the booking person cannot be empty.'
        },
        order:{
            order_message:'order message',
            order_id:'order id',
            order_time:'order time',
            total_price:'total price',
            room_message:'room message',
            room_type:'room type',
            date:'date',
            room_num:'room number',
            price_detail:'price detail',
            contacts:'contacts',
            telephone:'telephone number',
            name:'name',
            stateText1:'waiting for dispose',
            stateText2:'order succeed',
            stateText3:'order failed',
            check_in_check_out:'Check In ~ Check Out',
            no_orders: 'No orders'
        },
        confirm:{
            network_state:'The current network status is not wifi, go on？'
        }
    };
});