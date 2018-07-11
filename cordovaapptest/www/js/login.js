function login() {
    var username = document.getElementById("iptUserName");
    var password = document.getElementById("iptPassword");
    var salt = 'avatech';
    $.ajax({
        url: "http://192.168.3.14:8080/edi.initialfantasy_Web/v1/userauthrization",
        type: "get",
        timeout:10000, //10秒超时
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
                window.sessionStorage.token = result.data[0].token;
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