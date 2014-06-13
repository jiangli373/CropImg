var sd = function cc(){

    var e = s.base;

    //定义基本属性
    var h = {container: ['<div id="s_bg_cut_img" class="s-bg-cutimg-container" #{containerShapeStyle} onselectstart="return false">',
        '<img class="s-bg-cutimg-bg-img" #{ImgSrc} #{containerStyle} draggable="false">',
        '<div class="s-bg-cutimg-ctrl-mod" #{containerStyle}>',
        '<div class="s-bg-cutimg-shadow"></div>',
        '<div class="s-bg-cutimg-select" #{ctrlStyle} title="">',
        '<img class="s-bg-cutimg-show-img" #{ctrlImgStyle} #{ImgSrc} draggable="false">',
        '<div id="s_bg_dropimgtips" class="s-bg-cutimg-tips #{shouldShowTip}">',
        '<div class="s-bg-cutimg-tips-bg"></div>',
        '<div class="s-bg-cutimg-tips-text">拖动方框可裁剪图片</div>',
        "</div>",
        '<div class="s-bg-cutimg-select-border"  #{ctrlBorderStyle}></div>',
        '<div class="s-bg-cutimg-ctrl-tl cutimg-ctrl-cell" #{ctrlTL}></div>',
        '<div class="s-bg-cutimg-ctrl-tr cutimg-ctrl-cell" #{ctrlTR}></div>',
        '<div class="s-bg-cutimg-ctrl-bl cutimg-ctrl-cell" #{ctrlBL}></div>',
        '<div class="s-bg-cutimg-ctrl-br cutimg-ctrl-cell" #{ctrlBR}></div>',
        "</div>",
        "</div>",
        "</div>"].join(""),
        position: ['style="', "#{xKey}:#{xValue}px;", "#{yKey}:#{yValue}px;", '"'].join("")
        ,widthHeight: ['style="', "width:#{w}px;", "height:#{h}px;", '"'].join(""),
        widthHeightPosition: ['style="', "width:#{w}px;", "height:#{h}px;", "left: #{l}px;", "top: #{t}px;", '"'].join(""),
        widthHeightAlignPos: ['style="', "width:#{w}px;", "height:#{h}px;", "margin-left: #{ml}px;", "margin-top: #{mt}px;", '"'].join(""),
        hasShowTips: false};

    //基本宽高，变换率
    var t = {
        CONTAINER_RATIO: 320 / 180,
        CONTAINER_WIDTH: 320,CONTAINER_HEIGHT: 180,
        SKIN_RATIO: 8 / 5,
        SKIN_WIDTH: 288,SKIN_HEIGHT: 180,
        MIN_HEIGHT: 20,MIN_WIDTH: 32
    };
    var j = {ratio: 1,
        info: {
            w: 0,
            h: 0,
            sw: 0,
            sh: 0,
            x: 0,
            y: 0,
            raww: 0,  //图片原宽
            rawh: 0}, //图片原高
        pos: {x: 0,y: 0,w: 0,type: ""},
        isMove: false,
        isZoom: false,
        containerDom: null,
        selectMod: null,
        selectDom: null,
        selectBorder: null,
        selectImg: null,
        bgShowImg: null
    };
    var v = function(D, B, C) {      //D:{rawPicUrl: C}, B:false, C: function() {}

        //最外层
        var E = $("#s_skin_cutimg");
        if (!E[0] || !D.rawPicUrl) {
            return
        }
        if (!E.hasClass("bg-definedItem-nobgimg")) {
            E.addClass("bg-definedItem-nobgimg")
        }
        var A = new Image();
        A.src = decodeURIComponent(D.rawPicUrl);
        f(A, function() {
            var H = a({width: A.width,height: A.height}), J = H.w, L = H.h, I, N, Q, P, G = 0, O = 0, K = null;
            if (B) {
                if (D.w / D.h < t.SKIN_RATIO) {
                    O = (D.h - D.w / t.SKIN_RATIO) / j.ratio / 2;
                    D.h = D.w / t.SKIN_RATIO
                } else {
                    G = (D.w - D.h * t.SKIN_RATIO) / j.ratio / 2;
                    D.w = D.h * t.SKIN_RATIO
                }
                j.ratio = D.rawW / J;
                I = D.w ? D.w / j.ratio : H.sw;
                N = D.h ? D.h / j.ratio : H.sh;
                Q = D.x ? (D.x / j.ratio + G) : H.l;
                P = D.y ? (D.y / j.ratio + O) : H.t;
                j.info.w = J;
                j.info.h = L;
                j.info.sw = I;
                j.info.sh = N;
                j.info.x = Q;
                j.info.y = P
            } else {
                I = H.sw;
                N = H.sh;
                Q = H.l;
                P = H.t
            }
            K = {ImgSrc: 'src="' + decodeURIComponent(D.rawPicUrl) + '"',containerShapeStyle: $.formatString(h.widthHeightAlignPos, {w: J,h: L,ml: -1 * J / 2,mt: -1 * L / 2}),containerStyle: $.formatString(h.widthHeight, {w: J,h: L}),ctrlStyle: $.formatString(h.widthHeightPosition, {w: I - 1,h: N - 1,l: Q,t: P}),ctrlBorderStyle: $.formatString(h.widthHeight, {w: I - 3,h: N - 3}),ctrlImgStyle: $.formatString(h.widthHeightPosition, {w: J,h: L,l: -1 * Q,t: -1 * P}),ctrlTL: $.formatString(h.position, {xKey: "left",xValue: "0",yKey: "top",yValue: "0"}),ctrlTR: $.formatString(h.position, {xKey: "right",xValue: "0",yKey: "top",yValue: "0"}),ctrlBL: $.formatString(h.position, {xKey: "left",xValue: "0",yKey: "bottom",yValue: "0"}),ctrlBR: $.formatString(h.position, {xKey: "right",xValue: "0",yKey: "bottom",yValue: "0"}),shouldShowTip: h.hasShowTips ? "hide" : ""};
            var M = $.formatString(h.container, K);
            E.append(M);
            j.containerDom = $("#s_bg_cut_img");
            j.bgShowImg = j.containerDom.find(".s-bg-cutimg-bg-img");
            j.selectMod = j.containerDom.find(".s-bg-cutimg-ctrl-mod");
            j.selectDom = j.containerDom.find(".s-bg-cutimg-select");
            j.selectBorder = j.containerDom.find(".s-bg-cutimg-select-border");
            j.selectImg = j.containerDom.find(".s-bg-cutimg-show-img");
            y();
            p(j.info);
            C && C()
        })
    };

    //对上传的图片的宽高进行一系列操作
    var a = function(H) {
        if (!H) {
            return
        }
        j.info.raww = H.width;
        j.info.rawh = H.height;
        var A = H.width / H.height >= t.CONTAINER_RATIO ? t.CONTAINER_WIDTH : parseInt(t.CONTAINER_HEIGHT * H.width / H.height),
            D = H.width / H.height >= t.CONTAINER_RATIO ? parseInt(t.CONTAINER_WIDTH * H.height / H.width) : t.CONTAINER_HEIGHT,
            E = H.width / H.height >= t.SKIN_RATIO ? t.SKIN_WIDTH : parseInt(t.SKIN_HEIGHT * H.width / H.height),
            B = H.width / H.height >= t.SKIN_RATIO ? parseInt(t.SKIN_WIDTH * H.height / H.width) : t.SKIN_HEIGHT,
            C = null;
        if (E / B <= t.SKIN_RATIO) {
            B = E / t.SKIN_RATIO
        } else {
            E = B * t.SKIN_RATIO
        }
        var G = (A - E) / 2, I = (D - B) / 2;
        j.ratio = H.width / A;
        j.info.w = A;
        j.info.h = D;
        j.info.sw = E;
        j.info.sh = B;
        j.info.x = G;
        j.info.y = I;
        return {w: A,h: D,sw: E,sh: B,l: G,t: I}
    };
    var q = function(A) {
        j.bgShowImg.attr("src", A);
        j.selectImg.attr("src", A);
        j.containerDom.css({width: j.info.w,height: j.info.h,marginLeft: -1 * j.info.w / 2,marginTop: -1 * j.info.h / 2});
        j.selectMod.css({width: j.info.w,height: j.info.h});
        j.bgShowImg.css({width: j.info.w,height: j.info.h});
        j.selectImg.css({width: j.info.w,height: j.info.h,left: -1 * j.info.x,top: -1 * j.info.y})
    };
    var o = function(B, D, C) {
        var A = new Image();
        A.src = decodeURIComponent(B);
        f(A, function() {
            a({width: A.width,height: A.height});
            q(decodeURIComponent(B));
            n("newShape", j.info.sw, j.info.sh, j.info.x, j.info.y);
            C && C();
            p({w: j.info.w,h: j.info.h,sw: j.info.sw,sh: j.info.sh,x: j.info.x,y: j.info.y})
        })
    };

    //预览
    var c = function() {
        s.use("skin/skin_preview", function(A) {
            A.showDefined()
        })
    };

    //去掉提示
    var d = function() {
        $("#s_bg_dropimgtips").remove()
    };
    var y = function() {
        j.selectMod.delegate(".s-bg-cutimg-select-border", "mousedown", function(A) {
            c();
            d();
            $(document.body).off("mousemove");
            u("move", A);
            s.fire("skinOperate", {skinOperate: "cutImg",cutImgType: "cutImgMove"})
        }).delegate(".s-bg-cutimg-ctrl-tl", "mousedown", function(A) {
                c();
                d();
                $(document.body).off("mousemove");
                u("tl", A);
                s.fire("skinOperate", {skinOperate: "cutImg",cutImgType: "cutImgTL"})
            }).delegate(".s-bg-cutimg-ctrl-tr", "mousedown", function(A) {
                c();
                d();
                $(document.body).off("mousemove");
                u("tr", A);
                s.fire("skinOperate", {skinOperate: "cutImg",cutImgType: "cutImgTR"})
            }).delegate(".s-bg-cutimg-ctrl-bl", "mousedown", function(A) {
                c();
                d();
                $(document.body).off("mousemove");
                u("bl", A);
                s.fire("skinOperate", {skinOperate: "cutImg",cutImgType: "cutImgBL"})
            }).delegate(".s-bg-cutimg-ctrl-br", "mousedown", function(A) {
                c();
                d();
                $(document.body).off("mousemove");
                u("br", A);
                s.fire("skinOperate", {skinOperate: "cutImg",cutImgType: "cutImgBR"})
            });
        j.selectMod.on("mouseup", function(A) {
            if (!j.isMove && !j.isZoom) {
                return
            }
            A.stopPropagation();
            if (j.isMove) {
                j.isMove = false;
                $(document.body).off("mousemove");
                b(A.pageX - j.pos.x, j.pos.type, A.pageY - j.pos.y)
            }
            if (j.isZoom) {
                j.isZoom = false;
                $(document.body).off("mousemove");
                b(A.pageX - j.pos.w, j.pos.type)
            }
            k()
        });
        $(document.body).on("mouseup", function(A) {
            if (!j.isMove && !j.isZoom) {
                return
            }
            A.stopPropagation();
            if (j.isMove) {
                j.isMove = false;
                $(document.body).off("mousemove");
                b(A.pageX - j.pos.x, j.pos.type, A.pageY - j.pos.y)
            }
            if (j.isZoom) {
                j.isZoom = false;
                $(document.body).off("mousemove");
                b(A.pageX - j.pos.w, j.pos.type)
            }
            k()
        })
    };
    var u = function(A, B) {
        if (typeof (B) === undefined) {
            return
        }
        if (A === "move") {
            j.pos.type = A;
            j.isMove = true;
            j.pos.x = B.pageX;
            j.pos.y = B.pageY;
            B.stopPropagation();
            $(document.body).on("mousemove", function(C) {
                if (!j.isMove) {
                    if (!j.isZoom) {
                        $(document.body).off("mousemove")
                    }
                    return
                }
                z(C, j.pos.type);
                C.stopPropagation()
            })
        } else {
            j.pos.type = A;
            j.isZoom = true;
            j.pos.w = B.pageX;
            B.stopPropagation();
            $(document.body).on("mousemove", function(C) {
                if (!j.isZoom) {
                    if (!j.isMove) {
                        $(document.body).off("mousemove")
                    }
                    return
                }
                z(C, j.pos.type);
                C.stopPropagation()
            })
        }
    };
    var b = function(D, G, C) {
        if (!D || !G || (G == "move" && !C)) {
            var A, I, B, E, H
        }
        switch (G) {
            case "move":
                j.info.x += D;
                j.info.y += C;
                H = g(G, j.info.x, j.info.y);
                j.info.x = H.x;
                j.info.y = H.y;
                break;
            case "tl":
                j.info.sw -= D;
                j.info.sh = j.info.sw / t.SKIN_RATIO;
                j.info.x += D;
                j.info.y -= D / t.SKIN_RATIO;
                H = g(G, j.info.sw, j.info.sh, j.info.x, j.info.y);
                j.info.sw = H.w;
                j.info.sh = H.h;
                j.info.x = H.l;
                j.info.y = H.t;
                break;
            case "tr":
                j.info.sw += D;
                j.info.sh = j.info.sw / t.SKIN_RATIO;
                j.info.y -= D / t.SKIN_RATIO;
                H = g(G, j.info.sw, j.info.sh, j.info.x, j.info.y);
                j.info.sw = H.w;
                j.info.sh = H.h;
                j.info.y = H.t;
                break;
            case "bl":
                j.info.sw -= D;
                j.info.sh = j.info.sw / t.SKIN_RATIO;
                j.info.x += D;
                H = g(G, j.info.sw, j.info.sh, j.info.x, j.info.y);
                j.info.sw = H.w;
                j.info.sh = H.h;
                j.info.x = H.l;
                break;
            case "br":
                j.info.sw += D;
                j.info.sh = j.info.sw / t.SKIN_RATIO;
                H = g(G, j.info.sw, j.info.sh, j.info.x, j.info.y);
                j.info.sw = H.w;
                j.info.sh = H.h;
                break;
            default:
                break
        }
    };
    var z = function(E, A) {
        var I, D, B, J, H, G, C;
        l();
        switch (A) {
            case "move":
                H = j.info.x + (E.pageX - j.pos.x), G = j.info.y + (E.pageY - j.pos.y);
                C = g(A, H, G);
                C && n(A, C.x, C.y);
                break;
            case "tl":
                I = j.info.sw - (E.pageX - j.pos.w);
                D = I / t.SKIN_RATIO;
                B = j.info.x + (E.pageX - j.pos.w);
                J = j.info.y + (E.pageX - j.pos.w) / t.SKIN_RATIO;
                C = g(A, I, D, B, J);
                C && n(A, C.w, C.h, C.l, C.t);
                break;
            case "tr":
                I = j.info.sw + (E.pageX - j.pos.w);
                D = I / t.SKIN_RATIO;
                B = j.info.x;
                J = j.info.y - (E.pageX - j.pos.w) / t.SKIN_RATIO;
                C = g(A, I, D, B, J);
                C && n(A, C.w, C.h, C.l, C.t);
                break;
            case "bl":
                I = j.info.sw - (E.pageX - j.pos.w);
                D = I / t.SKIN_RATIO;
                B = j.info.x + (E.pageX - j.pos.w);
                J = j.info.y;
                C = g(A, I, D, B, J);
                C && n(A, C.w, C.h, C.l, C.t);
                break;
            case "br":
                I = j.info.sw + (E.pageX - j.pos.w);
                D = I / t.SKIN_RATIO;
                B = j.info.x;
                J = j.info.y;
                C = g(A, I, D, B, J);
                C && n(A, C.w, C.h, C.l, C.t);
                break;
            default:
                break
        }
        if (A == "move") {
            p({w: j.info.w,h: j.info.h,sw: j.info.sw,sh: j.info.sh,x: H,y: G})
        } else {
            p({w: j.info.w,h: j.info.h,sw: I ? I : j.info.sw,sh: D ? D : j.info.sh,x: B ? B : j.info.x,y: J ? J : j.info.y})
        }
    };
    var l = function() {
        for (var A in j.info) {
            if (isNaN(j.info[A])) {
                w(A)
            }
        }
    };
    var w = function(A) {
        switch (A) {
            case "x":
                if (j.selectDom) {
                    j.info.x = parseInt(j.selectDom[0].style.left)
                }
                break;
            case "y":
                if (j.selectDom) {
                    j.info.y = parseInt(j.selectDom[0].style.top)
                }
                break;
            case "sw":
                if (j.selectDom) {
                    j.info.sw = parseInt(j.selectDom[0].style.width)
                }
                break;
            case "sh":
                if (j.selectDom) {
                    j.info.sh = parseInt(j.selectDom[0].style.height)
                }
                break;
            case "w":
                if (j.selectMod) {
                    j.info.w = parseInt(j.selectMod[0].style.width)
                }
                break;
            case "h":
                if (j.selectMod) {
                    j.info.h = parseInt(j.selectMod[0].style.height)
                }
                break;
            default:
                break
        }
    };
    var p = function(A) {
        s.use("skin/skin_preview", function(B) {
            B.resizePreviewImg(A)
        })
    };
    var k = function() {
        if (j.selectDom) {
            j.info.x = parseInt(j.selectDom[0].style.left);
            j.info.y = parseInt(j.selectDom[0].style.top);
            j.info.sw = parseInt(j.selectDom[0].style.width);
            j.info.sh = parseInt(j.selectDom[0].style.height)
        }
        if (j.selectMod) {
            j.info.w = parseInt(j.selectMod[0].style.width);
            j.info.h = parseInt(j.selectMod[0].style.height)
        }
        p(j.info)
    };
    var g = function(G, K, E, B, N) {
        if (G === "move") {
            var I = K, H = E;
            (+I < 0) && (I = 0);
            (I + j.info.sw > j.info.w) && (I = j.info.w - j.info.sw);
            (+H < 0) && (H = 0);
            (H + j.info.sh > j.info.h) && (H = j.info.h - j.info.sh);
            return {x: I,y: H}
        } else {
            var J = K, D = E, C = B, M = N, A = t.SKIN_RATIO, L = 0;
            switch (G) {
                case "tl":
                    if (C < 0) {
                        L = C - 0;
                        J += L;
                        D += L / A;
                        M -= L / A;
                        C = 0
                    }
                    if (M < 0) {
                        L = M - 0;
                        J += L * A;
                        D += L;
                        C -= L * A;
                        M = 0
                    }
                    if (J < t.MIN_WIDTH) {
                        L = J - t.MIN_WIDTH;
                        C += L;
                        M += L / A;
                        D -= L / A;
                        J = t.MIN_WIDTH
                    }
                    if (D < t.MIN_HEIGHT) {
                        L = D - t.MIN_HEIGHT;
                        C += L * A;
                        M += L;
                        J -= L * A;
                        D = t.MIN_HEIGHT
                    }
                    break;
                case "tr":
                    if (M < 0) {
                        L = M - 0;
                        J += L * A;
                        D += L;
                        M = 0
                    }
                    if (J + j.info.x > j.info.w) {
                        L = J + j.info.x - j.info.w;
                        M += L / A;
                        D -= L / A;
                        J = j.info.w - j.info.x
                    }
                    if (J < t.MIN_WIDTH) {
                        L = J - t.MIN_WIDTH;
                        M += L / A;
                        D -= L / A;
                        J = t.MIN_WIDTH
                    }
                    if (D < t.MIN_HEIGHT) {
                        L = D - t.MIN_HEIGHT;
                        M += L;
                        J -= L * A;
                        D = t.MIN_HEIGHT
                    }
                    break;
                case "bl":
                    if (C < 0) {
                        L = C - 0;
                        J += L;
                        D += L / A;
                        C = 0
                    }
                    if (D + j.info.y > j.info.h) {
                        L = D + j.info.y - j.info.h;
                        C += L * A;
                        J -= L * A;
                        D = j.info.h - j.info.y
                    }
                    if (J < t.MIN_WIDTH) {
                        L = J - t.MIN_WIDTH;
                        C += L;
                        D -= L / A;
                        J = t.MIN_WIDTH
                    }
                    if (D < t.MIN_HEIGHT) {
                        L = D - t.MIN_HEIGHT;
                        C += L * A;
                        J -= L * A;
                        D = t.MIN_HEIGHT
                    }
                    break;
                case "br":
                    if (D + j.info.y > j.info.h) {
                        L = D + j.info.y - j.info.h;
                        J -= L * A;
                        D = j.info.h - j.info.y
                    }
                    if (J + j.info.x > j.info.w) {
                        L = J + j.info.x - j.info.w;
                        D -= L / A;
                        J = j.info.w - j.info.x
                    }
                    if (J < t.MIN_WIDTH) {
                        L = J - t.MIN_WIDTH;
                        D -= L / A;
                        J = t.MIN_WIDTH
                    }
                    if (D < t.MIN_HEIGHT) {
                        L = D - t.MIN_HEIGHT;
                        J -= L * A;
                        D = t.MIN_HEIGHT
                    }
                    break;
                default:
                    break
            }
            return {w: J,h: D,l: C,t: M}
        }
    };
    var n = function(E, D, C, A, B) {
        if (E === "move") {
            j.selectDom.css({left: D + "px",top: C + "px"});
            j.selectImg.css({left: -1 * D + "px",top: -1 * C + "px"})
        } else {
            j.selectBorder.css({width: D - 2 + "px",height: C - 2 + "px"});
            j.selectDom.css({width: D + "px",height: C + "px",left: A + "px",top: B + "px"});
            j.selectImg.css({left: -1 * A + "px",top: -1 * B + "px"})
        }
    };

    //判断图片加载属性
    var f = function(A, B) {
        A.complete || A.readyState == "loading" || A.readyState == "complete" ? B() : A.onload = B
    };
    var r = function(C, A, B) {
        var D = $("#s_bg_cut_img").get(0);
        if (A) {
            if (!C.rawPicUrl) {
                return
            }
            if (!D) {
                v(C, true)
            } else {
                o(C.rawPicUrl, C)
            }
        } else {
            if (!C) {
                return
            }
            if (!D) {
                v({rawPicUrl: C}, false, function() {
                    B && B()
                })
            } else {
                o(C, false, function() {
                    B && B()
                })
            }
        }
    };
    x.getInfo = function() {
        var B = {};
        B.x = j.info.x ? j.info.x * j.ratio : j.info.x;
        B.y = j.info.y ? j.info.y * j.ratio : j.info.y;
        B.w = j.info.sw ? j.info.sw * j.ratio : j.info.sw;
        B.h = j.info.sh ? j.info.sh * j.ratio : j.info.sh;
        B.raww = j.info.raww;
        B.rawh = j.info.rawh;
        for (var A in B) {
            if (B[A] !== undefined) {
                if (B[A] !== 0) {
                    B[A] = Math.floor(B[A])
                }
            } else {
                B[A] = j.info[i]
            }
        }
        return B
    };
    x.changeImg = r;
    x.init = v

}

$.extend({formatString: function(c, a) {
    c = String(c);
    var b = Array.prototype.slice.call(arguments, 1), d = Object.prototype.toString;
    if (b.length) {
        b = b.length == 1 ? (a !== null && (/\[object Array\]|\[object Object\]/.test(d.call(a))) ? a : b) : b;
        return c.replace(/#\{(.+?)\}/g, function(e, g) {
            var f = b[g];
            if ("[object Function]" == d.call(f)) {
                f = f(g)
            }
            return ("undefined" == typeof f ? "" : f)
        })
    }
    return c
},encodeHTML: function(a) {
    return String(a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")
},decodeHTML: function(a) {
    var b = String(a).replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    return b.replace(/&#([\d]+);/g, function(d, c) {
        return String.fromCharCode(parseInt(c, 10))
    })
},isString: function(a) {
    return "[object String]" == Object.prototype.toString.call(a)
},trimAll: function(a) {
    return a.replace(/\s+/g, "")
}});