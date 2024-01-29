(async () => {
    let requestPayload = {
      "collectorVersion": 'v1.0.1',
      "collectorHost": window.location.href,
      "isChrome": Boolean(window.chrome),
      "userAgent": navigator.userAgent,
      "screenDim": {
        availHeight: window.screen.availHeight,
        availLeft: window.screen.availLeft,
        availTop: window.screen.availTop,
        availWidth: window.screen.availWidth,
        colorDepth: window.screen.colorDepth,
        height: window.screen.height,
        isExtended: window.screen.isExtended,
        onchange: window.screen.onchange,
        orientation: {
          angle: window.screen.orientation.angle,
          type: window.screen.orientation.type,
          onchange: window.screen.orientation.onchange,
        },
        pixelDepth: window.screen.pixelDepth,
        width: window.screen.width,
      },
      "navigator": {
        "appCodeName": navigator.appCodeName,
        "appName": navigator.appName,
        "userAgentData": navigator.userAgentData,
        "connection": {
          "downlink": navigator.connection.downlink,
          "effectiveType": navigator.connection.effectiveType,
          "onchange": navigator.connection.onchange,
          "rtt": navigator.connection.rtt,
          "saveData": navigator.connection.saveData,
        },
      },
      "deviceMemory": navigator.deviceMemory,
      "doNotTrack": navigator.doNotTrack,
      "hardwareConcurrency": navigator.hardwareConcurrency,
      "maxTouchPoints": navigator.maxTouchPoints,
      "language": navigator.language,
      "languages": navigator.languages,
      "mimeTypes": {},
      "onLine": navigator.online,
      "pdfViewerEnabled": navigator.pdfViewerEnabled,
      "platform": navigator.platform,
      "plugins": {},
      "product": navigator.product,
      "productSub": navigator.productSub,
      "sayswho": navigator.sayswho,
      "vendor": navigator.vendor,
      "javaEnabled": navigator.javaEnabled(),
      "vendorSub": navigator.vendorSub,
      "webdriver": navigator.webdriver,
      "vibrate": 1,
      "bluetooth": navigator.bluetooth,
      "clipboard": navigator.clipboard,
      "cookieEnabled": navigator.cookieEnabled,
      "iframe": {
        "innerWidth": window.innerWidth,
        "innerHeight": window.innerHeight,
        "outerWidth": window.outerWidth,
        "outerHeight": window.outerHeight,
        "devicePixelRatio": window.devicePixelRatio,
        "screenX": window.screenX,
        "screenY": window.screenY,
      },
      "performanceObserver": {
        "supportedEntryTypes": window.PerformanceObserver.supportedEntryTypes,
      },
      "canvas": getCanvasWebglInfo(),
      "pxData": await collectPX(),
    };
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestPayload)
    };
  
    try {
      const response = await fetch("YOUR-API", options);
      if (response.ok) {
        console.log('Script executed successfully!');
      } else {
        console.error('Error executing script:', response.statusText);
      }
    } catch (error) {
      console.error('Error executing script:', error);
    }
    async function getBrowserName() {
      const browsers = ["webkit", "trident", "gecko", "presto"];
      const userAgent = navigator.userAgent.toLowerCase();
  
      for (const browser of browsers) {
        if (userAgent.includes(browser)) {
          console.log(browser);
          return browser;
        }
      }
  
      return "unknown";
    }
  
    async function getPluginArray() {
      let plugins = {};
      const plugins_len = navigator.plugins.length;
  
      for (let i = 0; i < plugins_len; i++) {
        plugins[i] = {
          f: navigator.plugins[i].filename,
          n: navigator.plugins[i].name
        };
      }
  
      const data = {
        plugext: plugins,
        plugins_len: plugins_len
      };
      return data;
    }
  
    async function collectPX() {
      const pxFunctions = {
        normalize: (str) => {
          str = "" + str;
          var b;
          var hash = 0;
          var i = 0;
          for (; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash = hash | 0;
          }
          return b = hash, (b = b | 0) < 0 && (b = b + 4294967296), b.toString(16);
        },
        entry: () => {
          try {
            if (typeof atob === "function" && atob("dGVzdA==") === "test") {
              return atob;
            }
          } catch (error) {
            // Ignore the error
          }
  
          return function (encodedString) {
            var decodedString = "";
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var padding = 0;
            var position = 0;
            var char;
  
            encodedString = encodedString.replace(/[=]+$/, "");
  
            if (encodedString.length % 4 === 1) {
              throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
            }
  
            for (; char = encodedString.charAt(position++);) {
              char = characters.indexOf(char);
              if (~char) {
                if (padding % 4) {
                  decodedString += String.fromCharCode(255 & (padding * 64 + char) >> (8 - padding % 4 * 2));
                }
                padding++;
              }
            }
  
            return decodedString;
          };
        },
        getNode: () => {
          var _null = {
            imgFromResourceApi: 0,
            cssFromResourceApi: 0,
            fontFromResourceApi: 0,
            cssFromStyleSheets: 0
          };
          var sheets = document.styleSheets;
          var i = 0;
          for (; i < sheets.length; i++) {
            sheets[i].href;
          }
          if (window.performance && typeof window.performance.getEntriesByType === "function") {
            var options = window.performance.getEntriesByType("resource");
            var index = 0;
            for (; index < options.length; index++) {
              var config = options[index];
              if (config.initiatorType === "img") {
                _null.imgFromResourceApi++;
              }
              if (
                config.initiatorType === "css" ||
                (config.initiatorType === "link" && config.name.indexOf(".css") !== -1)
              ) {
                _null.cssFromResourceApi++;
              }
              if (config.initiatorType === "link" && config.name.indexOf(".woff") !== -1) {
                _null.fontFromResourceApi++;
              }
            }
          }
          return _null;
        },
        isFunction: (value) => {
          return pxFunctions.normalize(value);
        },
        matcher: (text) => {
          var wrap = function (s, k) {
            var txt = '';
            for (var x = 0; x < s.length; x++) {
              txt += String.fromCharCode(k ^ s.charCodeAt(x));
            }
            return txt;
          };
  
          var equal = (function () {
            if (typeof btoa === 'function') {
              return function (t) {
                return btoa(encodeURIComponent(t).replace(/%([0-9A-F]{2})/g, function (match, p1) {
                  return String.fromCharCode(parseInt(p1, 16));
                }));
              };
            }
            var unescape = window.unescape || window.decodeURI;
            return function (value) {
              if (!value) {
                return value;
              }
              try {
                value = unescape(encodeURIComponent(value));
              } catch (e) {
                return value;
              }
              var k = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
              var i = 0,
                iFeature = 0;
              var features = [];
              var b, m, r, first, a;
              do {
                b = value.charCodeAt(i++) << 16 | value.charCodeAt(i++) << 8 | value.charCodeAt(i++);
                m = b >> 18 & 63;
                r = b >> 12 & 63;
                first = b >> 6 & 63;
                a = b & 63;
                features[iFeature++] = k.charAt(m) + k.charAt(r) + k.charAt(first) + k.charAt(a);
              } while (i < value.length);
              var res = features.join('');
              var len = value.length % 3;
              return (len ? res.slice(0, len - 3) : res) + '==='.slice(len || 3);
            };
          })();
  
          try {
            return equal(wrap(text, 4210));
          } catch (t) {}
        },
  
        getStatsValue: () => {
          var s = "";
          if (!chrome) {
            return s;
          }
  
          var indent = 0;
          var dirs = ["webstore", "runtime", "app", "csi", "loadTimes"];
          for (let i = 0; i < dirs.length; i++) {
            try {
              indent = indent + (chrome[dirs[i]].constructor + "").length;
            } catch (t) {}
          }
  
          s = s + (indent + "|");
  
          try {
            chrome.webstore.install(0);
          } catch (jtimes) {
            s = s + ((jtimes + "").length + "|");
          }
  
          try {
            chrome.webstore.install();
          } catch (jtimes) {
            s = s + ((jtimes + "").length + "|");
          }
  
          if (location.protocol && 0 === location.protocol.indexOf("http")) {
            try {
              chrome.runtime.sendMessage();
            } catch (jtimes) {
              s = s + ((jtimes + "").length + "|");
            }
          }
          try {
            chrome.webstore.onInstallStageChanged.dispatchToListener();
          } catch (jtimes) {
            s = s + (jtimes + "").length;
          }
          return s;
        }
      }
      const user = await pxFunctions.getNode();
      const pxPayload = {
        PX11431: (new Date).getTime(),
        PX12588: await getBrowserName(),
        PX12551: location.protocol,
        // PX12552: navigator.share.toString(),
        PX12553: window.Intl.DateTimeFormat().resolvedOptions().timeZone,
        PX12567: window.webkitNotifications ? window.webkitNotifications = "wk" : window.Notification ? window.webkitNotifications = "w3c" : window.webkitNotifications = "undef",
        PX12576: window.styleMedia.type,
        PX12555: await getPluginArray(),
        PX12583: {
          "smd": {
            "ok": true,
            "ex": false
          }
        },
        PX12578: {},
        PX12571: pxFunctions.normalize("" + pxFunctions.entry),
        PX12579: (() => {
          try {
            const data = {
              support: true,
              status: {
                effectiveType: navigator.connection.effectiveType,
                rtt: navigator.connection.rtt,
                downlink: navigator.connection.downlink,
                saveData: navigator.connection.saveData
              }
            };
            return data
          } catch {}
        })(),
        PX12581: typeof window.Notification.permission === "object" ? JSON.stringify(window.Notification.permission) : window.Notification.permission,
        PX12582: 3,
        PX12587: location.outerHTML > -1 && location.outerHTML.indexOf("navigator") > -1,
        PX11843: screen && screen.width || -1,
        PX11781: screen && screen.height || -1,
        PX12121: screen && screen.availWidth || -1,
        PX12128: screen && screen.availHeight || -1,
        PX12387: screen && screen.width || -1 + "X" + screen && screen.height || -1,
        PX12003: screen && +screen.pixelDepth || 0,
        PX11380: screen && +screen.colorDepth || 0,
        PX11494: window.innerWidth || -1,
        PX12411: window.innerHeight || -1,
        PX12443: window.scrollY || window.pageYOffset || 0,
        PX12447: window.scrollY || window.pageYOffset || 0,
        PX11533: !(window.outerWidth && 0 === window.outerHeight),
        PX12079: (() => {
          try {
            return window.hasOwnProperty("_cordovaNative") || window.hasOwnProperty("Ti") || window.hasOwnProperty("webView") || window.hasOwnProperty("Android") || document.hasOwnProperty("ondeviceready") || navigator.hasOwnProperty("standalone") || (window.external && "notify" in window.external) || (navigator.userAgent.indexOf("Mobile/") > 0 && navigator.userAgent.indexOf("Safari/") === -1);
          } catch (error) {
            return false;
          }
        })(),
        PX11529: window.performance && window.performance.memory.usedJSHeapSize,
        PX11555: window.performance && window.performance.memory.jsHeapSizeLimit,
        PX11833: window.performance && window.performance.memory.totalJSHeapSize,
        PX11840: new Date(Date.now()).toString(),
        PX11526: !!window.Buffer,
        PX11684: !!window.v8Locale,
        PX11812: !!window.ActiveXObject,
        PX12335: !!navigator.sendBeacon,
        PX12080: typeof navigator.maxTouchPoints === "number" ? navigator.maxTouchPoints : typeof navigator.msMaxTouchPoints === "number" ? navigator.msMaxTouchPoints : 0,
        PX11678: Boolean((window.PointerEvent && "maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) || (window.matchMedia && window.matchMedia("(any-hover: none), (any-pointer: coarse)").matches) || window.TouchEvent || "ontouchstart" in window),
        PX11349: (function () {
          var value = void 0 !== document.hidden ? "" : ["webkit", "moz", "ms", "o"].find(function (prefix) {
            return void 0 !== document[prefix + "Hidden"];
          });
          return document[((value === "" ? "v" : "V") + "isibilityState")];
        })(),
        PX12397: !!window.showModalDialog,
        PX11387: +document.documentMode || 0,
        PX12150: window.outerWidth,
        PX12304: window.openDatabase === 'function' && /\{\s*\[native code\]\s*\}/.test("" + window.openDatabase),
        PX11651: window.outerHeight,
        PX11867: navigator.msDoNotTrack || "missing",
        PX12254: window.setTimeout === 'function' && /\{\s*\[native code\]\s*\}/.test("" + window.setTimeout),
        PX11540: window.matchMedia && window.matchMedia("(pointer:fine)").matches,
        PX11548: window.hasOwnProperty("ontouchstart") || "ontouchstart" in window,
        PX11446: window.BatteryManager === "function" && /\{\s*\[native code\]\s*\}/.test("" + window.BatteryManager),
        PX12550: window.performance && window.performance.navigation && window.performance.navigation.type,
        PX12431: (function () {
          if (window.PointerEvent && "maxTouchPoints" in navigator) {
            if (navigator.maxTouchPoints > 0) return true;
          } else {
            if (window.matchMedia && window.matchMedia("(any-hover: none), (any-pointer: coarse)").matches) return true;
            if (window.TouchEvent || "ontouchstart" in window) return true;
          }
          return false;
        })(),
        PX11991: user.cssFromResourceApi,
        PX11837: user.imgFromResourceApi,
        PX11632: user.fontFromResourceApi,
        PX11409: user.cssFromStyleSheets,
        PX12597: (function () {
          var Wu = 0;
          if (-1 !== navigator.userAgent.indexOf("Chrome")) {
            window.console.debug(Object.defineProperty(Error(), "stack", {
              get: function () {
                return Wu++, "";
              }
            }));
          }
          return Wu;
        })(),
        PX11303: !!window.emit,
        PX11515: !!window.spawn,
        PX12133: !!window.fmget_targets,
        PX12340: !!window.awesomium,
        PX11738: !!window.__nightmare,
        PX11723: window.RunPerfTest === "function" && /\{\s*\[native code\]\s*\}/.test("" + window.RunPerfTest),
        PX11389: !!window.geb,
        PX11839: !!window._Selenium_IDE_Recorder,
        PX11460: !!window.PX12073,
        PX12102: !!document.__webdriver_script_fn,
        PX11378: !!window.domAutomation || !!window.domAutomationController,
        PX12317: window.hasOwnProperty(navigator.webdriver),
        PX11539: pxFunctions.isFunction(window.console.log),
        PX11528: (function () {
          try {
            return typeof Object.getOwnPropertyDescriptor(HTMLDocument.prototype, "cookie").get === "function" ? Object.getOwnPropertyDescriptor(HTMLDocument.prototype, "cookie").get : "";
          } catch (error) {
            return "";
          }
        })(),
        PX12271: pxFunctions.isFunction(Object.prototype.toString),
        PX11849: pxFunctions.isFunction(navigator.toString),
        PX12464: (function () {
          var e = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(navigator), "webdriver");
          if (e) {
            return pxFunctions.normalize("" + (e.get || "") + (e.value || ""))
          }
        }),
        PX11356: !!window.Worklet,
        PX12426: !!window.AudioWorklet,
        PX11791: !!window.AudioWorkletNode,
        PX11517: !!window.isSecureContext,
        PX12520: !!Element.prototype.attachShadow,
        PX12524: (function () {
          try {
            pxFunctions.matcher(window.speechSynthesis.getVoices()[window.speechSynthesis.getVoices().length - 1].voiceURI)
          } catch {}
        }),
        PX12260: navigator.userAgent,
        PX12249: !!navigator.webdriver,
        PX12330: pxFunctions.getStatsValue(),
        PX11705: (window.fetch ? (window.fetch + '').length : 0) + (window.performance && window.performance.timing && window.performance.timing.toJSON ? (window.performance.timing.toJSON + '').length : 0) + (document && document.createElement ? (document.createElement + '').length : 0),
        PX11938: !!window.caches,
        PX11602: !!window.caches,
        PX12021: navigator.webdriver + '',
        PX12421: navigator.webdriver + '',
        PX12124: 'webdriver' in navigator ? 1 : 0,
        PX11609: 'webdriver' in navigator ? 1 : 0,
        PX12291: window.chrome && window.chrome.runtime && window.chrome.runtime.id || '',
        PX11881: window.chrome && typeof Object.keys === 'function' ? Object.keys(window.chrome) : [],
        PX12069: (function () {
          let names = [];
          for (let i = 0; i < navigator.plugins.length; i++) {
            names.push(navigator.plugins[i].name);
          }
          return names;
        })(),
        PX12286: navigator.plugins.length,
        PX11384: navigator.plugins[0] === navigator.plugins[0][0].enabledPlugin,
        PX11886: navigator.plugins.item(4294967296) === navigator.plugins[0],
        PX11583: navigator.language,
        PX12458: navigator.platform,
        PX11681: navigator.languages,
        PX11754: navigator.userAgent,
        PX12037: !!(navigator.doNotTrack || null === navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack),
        PX11390: new Date().getTimezoneOffset(),
        PX11621: navigator.deviceMemory,
        PX11657: navigator.languages && navigator.languages.length,
        PX12081: navigator.product,
        PX11908: navigator.productSub,
        PX12314: navigator.appVersion,
        PX11829: navigator.mimeTypes && navigator.mimeTypes.toString() === "[object MimeTypeArray]" || /MSMimeTypesCollection/i.test(navigator.mimeTypes && navigator.mimeTypes.toString()),
        PX11464: navigator.mimeTypes && navigator.mimeTypes.toString() === "[object MimeTypeArray]" || /MSMimeTypesCollection/i.test(navigator.mimeTypes && navigator.mimeTypes.toString()),
        PX12054: navigator.mimeTypes && navigator.mimeTypes.length || -1,
        PX11821: navigator.appName,
        PX11479: navigator.appCodeName,
        PX11674: navigator.permissions && navigator.permissions.query && navigator.permissions.query.name === "query",
        PX12241: navigator.connection.rtt,
        PX11372: navigator.connection.saveData,
        PX11683: navigator.connection.downlink,
        PX11561: navigator.connection.effectiveType,
        PX11877: "onLine" in navigator && !0 === navigator.onLine,
        PX12100: navigator.geolocation + "" === "[object Geolocation]",
        PX12506: await (async function () {
          let value = await navigator.userAgentData.getHighEntropyValues(["architecture"]);
          return value.architecture;
        })(),
        PX12507: await (async function () {
          let value = await navigator.userAgentData.getHighEntropyValues(["bitness"]);
          return value.bitness;
        })(),
        PX12508: await (async function () {
          let value = await navigator.userAgentData.getHighEntropyValues(["brands"]);
          return value.brands;
        })(),
        PX12509: await (async function () {
          let value = await navigator.userAgentData.getHighEntropyValues(["mobile"]);
          return value.mobile;
        })(),
        PX12510: await (async function () {
          let value = await navigator.userAgentData.getHighEntropyValues(["model"]);
          return value.model;
        })(),
        PX12511: await (async function () {
          let value = await navigator.userAgentData.getHighEntropyValues(["platform"]);
          return value.platform;
        })(),
        PX12512: await (async function () {
          let value = await navigator.userAgentData.getHighEntropyValues(["platformVersion"]);
          return value.platformVersion;
        })(),
        PX12513: await (async function () {
          let value = await navigator.userAgentData.getHighEntropyValues(["uaFullVersion"]);
          return value.uaFullVersion;
        })(),
        PX12548: !!navigator.userAgentData,
        PX12549: navigator.pdfViewerEnabled,
        PX12544: !(!window.WebAssembly || !window.WebAssembly.instantiate),
        PX12207: window.self === window.top ? 0 : 1,
        PX11538: history && history.length !== NaN && history.length || -1,
        PX11645: location && location.href || "",
        PX11597: (function () {
          var e = [];
          if (location.ancestorOrigins) {
            for (var o = 0; o < location.ancestorOrigins.length; o++) {
              if (location.ancestorOrigins[o] && location.ancestorOrigins[o] !== "null") {
                e.push(location.ancestorOrigins[o]);
              }
            }
          }
          return e;
        })(),
        PX12023: document.referrer ? encodeURIComponent(document.referrer) : "",
        PX11337: window.hasOwnProperty("onorientationchange") || !!window.onorientationchange,
        PX12278: !navigator.webdriver && !navigator.hasOwnProperty(navigator.webdriver) && (navigator.webdriver = 1, r = 1 !== navigator.webdriver, delete navigator.webdriver),
        r,
        PX11694: navigator.plugins && (navigator.plugins.refresh = 1, r = 1 !== navigator.plugins.refresh, delete navigator.plugins.refresh),
        r,
        PX12294: Boolean(window.navigator && window.navigator._),
        PX12514: Boolean((function () {
          try {
            var m = window.performance && window.performance.memory;
            if (m) {
              return window.performance && window.performance.memory.jsHeapSizeLimit !== window.performance && window.performance.memory.jsHeapSizeLimit || lastJsStartIndex !== window.performance && window.performance.memory.totalJSHeapSize || lastUsedHeap !== window.performance && window.performance.memory.usedJSHeapSize;
            }
          } catch (t) {}
        })()),
        PX12516: Array.prototype.slice.call(window.getComputedStyle(document.documentElement, "")).join("").match(/-(moz|webkit|ms)-/)[1],
        PX12517: window.eval.toString().length,
        PX12518: /constructor/i.test(window.HTMLElement),
        PX12593: (function () {
          try {
            return new Worker("chrome://juggler/content"), true;
          } catch (t) {
            return false;
          }
        })(),
        PX12595: Object.getOwnPropertyNames(window).filter(function (p_Interval) {
          return /^(s|a).*(usc|da).*/.test(p_Interval.toLowerCase());
        }).sort().join(".").substring(0, 100),
        PX12594: !(!Object.getOwnPropertyDescriptor(document, "createElement") || !Object.getOwnPropertyDescriptor(document, "createElement").value),
      }
      return pxPayload
    }
  
    function getCanvasWebglInfo() {
      var mK = function (AV) {
        return AV ? [AV[0], AV[1]] : null;
      };
      var Q6 = function (x8) {
        var HW = null;
        var uY =
          x8["getExtension"]("EXT_texture_filter_anisotropic") ||
          x8["getExtension"]("WEBKIT_EXT_texture_filter_anisotropic") ||
          x8["getExtension"]("MOZ_EXT_texture_filter_anisotropic'");
        if (uY) {
          var UZ = x8["getParameter"](uY["MAX_TEXTURE_MAX_ANISOTROPY_EXT"]);
          HW = UZ === 0 ? 2 : UZ;
        }
        return HW;
      };
      var newCanvas = document["createElement"]("canvas");
  
      var gpu = newCanvas["getContext"]("webgl");
      var vt = {};
  
      vt["dataUrl"] = newCanvas.toDataURL();
      vt["drawingBufferColorSpace"] = gpu["drawingBufferColorSpace"];
      vt["drawingBufferHeight"] = gpu["drawingBufferHeight"];
      vt["drawingBufferWidth"] = gpu["drawingBufferWidth"];
      vt["unpackColorSpace"] = gpu["unpackColorSpace"];
  
      var DF = gpu;
      var Rp = gpu["getSupportedExtensions"] && gpu["getSupportedExtensions"]();
      vt["supported_extensions"] = Rp ? Rp : null;
      vt[DF["ALIASED_LINE_WIDTH_RANGE"]] = mK(
        DF["getParameter"](DF["ALIASED_LINE_WIDTH_RANGE"])
      );
      vt[DF["ALIASED_POINT_SIZE_RANGE"]] = mK(
        DF["getParameter"](DF["ALIASED_POINT_SIZE_RANGE"])
      );
      vt[DF["ALPHA_BITS"]] = DF["getParameter"](DF["ALPHA_BITS"]);
      var pK = DF["getContextAttributes"] && DF["getContextAttributes"]();
      vt["antialias"] = pK ? (pK["antialias"] ? true : false) : null;
      vt[DF["BLUE_BITS"]] = DF["getParameter"](DF["BLUE_BITS"]);
      vt[DF["DEPTH_BITS"]] = DF["getParameter"](DF["DEPTH_BITS"]);
      vt[DF["GREEN_BITS"]] = DF["getParameter"](DF["GREEN_BITS"]);
      vt["function"] = Q6(DF);
      vt[DF["MAX_COMBINED_TEXTURE_IMAGE_UNITS"]] = DF["getParameter"](
        DF["MAX_COMBINED_TEXTURE_IMAGE_UNITS"]
      );
      vt[DF["MAX_CUBE_MAP_TEXTURE_SIZE"]] = DF["getParameter"](
        DF["MAX_CUBE_MAP_TEXTURE_SIZE"]
      );
      vt[DF["MAX_FRAGMENT_UNIFORM_VECTORS"]] = DF["getParameter"](
        DF["MAX_FRAGMENT_UNIFORM_VECTORS"]
      );
      vt[DF["MAX_RENDERBUFFER_SIZE"]] = DF["getParameter"](
        DF["MAX_RENDERBUFFER_SIZE"]
      );
      vt[DF["MAX_TEXTURE_IMAGE_UNITS"]] = DF["getParameter"](
        DF["MAX_TEXTURE_IMAGE_UNITS"]
      );
      vt[DF["MAX_TEXTURE_SIZE"]] = DF["getParameter"](DF["MAX_TEXTURE_SIZE"]);
      vt[DF["MAX_VARYING_VECTORS"]] = DF["getParameter"](DF["MAX_VARYING_VECTORS"]);
      vt[DF["MAX_VERTEX_ATTRIBS"]] = DF["getParameter"](DF["MAX_VERTEX_ATTRIBS"]);
      vt[DF["MAX_VERTEX_TEXTURE_IMAGE_UNITS"]] = DF["getParameter"](
        DF["MAX_VERTEX_TEXTURE_IMAGE_UNITS"]
      );
      vt[DF["MAX_VERTEX_UNIFORM_VECTORS"]] = DF["getParameter"](
        DF["MAX_VERTEX_UNIFORM_VECTORS"]
      );
      vt[DF["MAX_VIEWPORT_DIMS"]] = mK(DF["getParameter"](DF["MAX_VIEWPORT_DIMS"]));
      vt[DF["RED_BITS"]] = DF["getParameter"](DF["RED_BITS"]);
      vt[DF["RENDERER"]] = DF["getParameter"](DF["RENDERER"]);
      vt[DF["SHADING_LANGUAGE_VERSION"]] = DF["getParameter"](
        DF["SHADING_LANGUAGE_VERSION"]
      );
      vt[DF["STENCIL_BITS"]] = DF["getParameter"](DF["STENCIL_BITS"]);
      vt[DF["VENDOR"]] = DF["getParameter"](DF["VENDOR"]);
      vt[DF["VERSION"]] = DF["getParameter"](DF["VERSION"]);
  
      var sT = DF["getExtension"]("WEBGL_debug_renderer_info");
      if (sT) {
        if (DF["getParameter"](sT["UNMASKED_VENDOR_WEBGL"]) !== undefined) {
          vt[sT["UNMASKED_VENDOR_WEBGL"]] = DF["getParameter"](
            sT["UNMASKED_VENDOR_WEBGL"]
          );
        }
        if (DF["getParameter"](sT["UNMASKED_RENDERER_WEBGL"]) !== undefined) {
          vt[sT["UNMASKED_RENDERER_WEBGL"]] = DF["getParameter"](
            sT["UNMASKED_RENDERER_WEBGL"]
          );
        }
      }
  
      return vt;
    }
  })();