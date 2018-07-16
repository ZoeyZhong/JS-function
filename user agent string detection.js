var client = function () {
    //呈现引擎
    var engine = {
        ie: 0,
        gecko: 0,
        webkit: 0,
        khtml: 0,
        opera: 0,
        //具体版本号
        ver: null
    };

    //浏览器
    var browser = {
        ie: 0,
        firefox: 0,
        safari: 0,
        konq: 0,
        opera: 0,
        chrome: 0,

        //具体版本号
        ver: null
    };

    //平台
    var system = {
        win: false,
        mac: false,
        x11: false,

        //移动设备
        iphone: false,
        ipod: false,
        ipad: false,
        ios: false,
        android: false,
        nokiaN: false,
        winMobile: false,

        //游戏系统
        wii: false,
        ps: false
    };


    //检测呈现引擎、平台和设备
    var ua = navigator.userAgent;//用户代理字符串

    if (window.opera) {//opera 引擎
        engine.ver = browser.ver = window.opera.version();
        engine.opera = browser.opera = parseFloat(engine.ver);
    } else if (/AppleWebKit\/(\S+)/.test(ua)) {//webkit 引擎
        engine.ver = RegExp["$1"];
        engine.webkit = parseFloat(engine.ver);

        //先区分 Chrome 与 Safari
        if (/Chrome\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.chrome = parseFloat(browser.ver);
        } else if (/Version\/(\S+)/.test(ua)) {
            browser.ver = RegExp["$1"];
            browser.safari = parseFloat(browser.ver);
        } else {
            //近似地确定版本号
            var safariVersion = 1;
            if (engine.webkit < 100) {
                safariVersion = 1;
            } else if (engine.webkit < 312) {
                safariVersion = 1.2;
            } else if (engine.webkit < 412) {
                safariVersion = 1.3;
            } else {
                safariVersion = 2;
            }
            browser.safari = browser.ver = safariVersion;
        }
    } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {//khtml 引擎
        engine.ver = browser.ver = RegExp["$1"];
        engine.khtml = browser.konq = parseFloat(engine.ver);

    } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {//gecko 引擎
        engine.ver = RegExp["$1"];
        engine.gecko = parseFloat(engine.ver);

        if (/Firefox\/(\S+)/.test(ua)) {//是 Firefox
            browser.ver = RegExp["$1"];
            browser.firefox = parseFloat(browser.ver);
        }
    } else if (/MSIE ([^;]+)/.test(ua)) {//ie 引擎
        engine.ver = browser.ver = RegExp["$1"];
        engine.ie = browser.ie = parseFloat(engine.ver);
    }

    //识别平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p.indexOf("X11") == 0) || (p.indexOf("Linux") == 0);

    //识别 Windows 操作系统
    console.log("ua:" + ua);
    if (system.win) {
        if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
            if (RegExp["$1"] == "NT") {
                switch (RegExp["$2"]) {
                    case "5.0":
                        system.win = "2000";
                        break;
                    case "5.1":
                        system.win = "XP";
                        break;
                    case "6.0":
                        system.win = "Vista";
                        break;
                    case "6.1":
                        system.win = "7";
                        break;
                    default :
                        system.win = "NT";
                        break;
                }
            }
        } else if (RegExp["$1"] == "9x") {
            system.win = "ME";
        } else {
            system.win = RegExp["$1"];
        }
    }

    //识别移动设备
    system.iphone = ua.indexOf("iPhone") > -1;
    system.ipod = ua.indexOf("iPod") > -1;
    system.ipad = ua.indexOf("iPad") > -1;

    //检测 iOS 版本
    if (system.mac && ua.indexOf("Mobile") > -1) {
        if (/CPU(?:iPhone)?OS (\d+_\d+)/.test(ua)) {
            system.ios = parseFloat(RegExp.$1.replace("_", "."));
        } else {
            system.ios = 2;//检测不出，所以猜测是更早的版本，比较稳妥
        }
    }

    //检测 Android 版本
    if (/Android (\d+\.\d+)/.test(ua)) {
        system.android = parseFloat(RegExp.$1);
    }

    //检测诺基亚 N 系列手机
    system.nokiaN = ua.indexOf("NokiaN") > -1;

    //windows mobile
    if (system.win == "CE") {
        system.winMobile = system.win;
    } else if (system.win == "Ph") {
        if (/Windows Phone OS (\d+.\d+)/.test(ua)) {
            system.win = "Phone";
            system.winMobile = parseFloat(RegExp["$1"]);
        }
    }

    //识别游戏系统
    system.wii = ua.indexOf("Wii") > -1;
    system.ps = /playstation/i.test(ua);

    return {
        engine: engine,
        browser: browser,
        system: system
    };
}();



//how to use
//应该优先使用能力检测和怪癖检测，用户代理检测方法尽量只用作最后检测的手段。它一般适用于以下情形：

//不能直接准确地使用能力检测和怪癖检测。
//同一种浏览器在不同平台下具有不同的能力。
//为了跟踪分析等目的需要知道确切的浏览器类型。
