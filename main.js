function deviceReady() {
	console.log("deviceReady");
	$("#loginPage").on("pageshow",function() {
		//console.log("pageinit run");
		$("#loginForm").on("submit",handleLogin);
		checkPreAuth();
	});
	$.mobile.changePage("#loginPage");
}
function init() {
	document.addEventListener("deviceready", deviceReady, true);
	delete init;
}

function checkPreAuth() {
	console.log("checkPreAuth");
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
        $("#username", form).val(window.localStorage["username"]);
        $("#password", form).val(window.localStorage["password"]);
        handleLogin();
    }
}

function handleLogin() {
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    if(u != '' && p!= '') {
        $.post("https://m.xstrememd.com/backend/model/services/security.cfc?method=loginUserApp", {username:u,password:p}, function(res) {
            if(res == true) {
                //store
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;             
                $.mobile.changePage("some.html");
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
         $("#submitButton").removeAttr("disabled");
        },"json");
    } else {
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

