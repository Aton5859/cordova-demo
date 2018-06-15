// 有关“空白”模板的简介，请参阅以下文档:
// http://go.microsoft.com/fwlink/?LinkID=397704
// 若要在 Ripple 或 Android 设备/仿真程序中调试代码: 启用你的应用程序，设置断点，
// 然后在 JavaScript 控制台中运行 "window.location.reload()"。
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // 处理 Cordova 暂停并恢复事件
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);

        // TODO: Cordova 已加载。在此处执行任何需要 Cordova 的初始化。
        //var parentElement = document.getElementById('deviceready');
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
        //listeningElement.setAttribute('style', 'display:none;');
        //receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: 此应用程序已挂起。在此处保存应用程序状态。
    };

    function onResume() {
        // TODO: 此应用程序已重新激活。在此处还原应用程序状态。
    };


    /* document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown(e) {
        e.preventDefault();
        alert('"后退按钮"被点击啦!');
    } */

    document.getElementById("btnLogin").addEventListener("click", login);
    function login() {
        var username = document.getElementById("iptUserName");
        var password = document.getElementById("iptPassword");
        var salt = 'avatech';
        $.ajax({
            url: "http://192.168.3.14:8080/edi.initialfantasy_Web/v1/userauthrization",
            type: "get",
            data: {
                "companyName": "北京奥维奥科技有限公司",
                "userName": username.value,
                "password": hex_hmac_md5(salt, password.value),
            },
            dataType: "jsonp",
            success: function (result) {
                //获取接口返回的数据
                if (result.code == 0) {
                    alert("登录成功");
                    window.location.href = "index.html";
                   // getTask(result.data[0].token);
                } else {
                    alert("用户名或密码错误");
                }
            },
            error: function (XMLHttpRequest) {
                alert("服务器连接失败");
                //alert(XMLHttpRequest.status);
                //alert(XMLHttpRequest.readyState);
               // window.location.href = "index.html"
            },
        })
    }
    function getTask(token) {
        $.ajax({
            url: "http://192.168.3.14:8080/edi.stocktask_Web/v1/stocktasks",
            type: "get",
            data: {
                "token": token
            },
            dataType: "jsonp",
            success: function (result) {
                //获取接口返回的数据
                if (result.code == 0) {
                    return result;
                } else {
                    alert(result);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("任务清单获取失败");
            },
        })
    }
})();