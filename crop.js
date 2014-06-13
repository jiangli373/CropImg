/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 14-6-13
 * Time: 下午2:21
 * To change this template use File | Settings | File Templates.
 */
F.module("superplus:skin/skin_init", function(c, b, a) {
    var d = c("skin/skin_control");
    var e = function(f) {
        var g = $("#s_skin_layer");
        if (g.get(0)) {
            d.init()
        } else {
            $.ajaxget(s_domain.baseuri + "/page/data/skin", function(h) {
                if (h.errNo == 0) {
                    var k = h.bsResult.data, j = h.bsResult.conf;
                    d.init(k, j);
                    f && f()
                }
            })
        }
    };
    b.init = e
});
F.module("superplus:skin/skin_cut_img", function(m, x, s) {
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
});
F.module("superplus:skin/skin_model", function(c, b, a) {
    var d = c("skin/skin_tools");
    var e = {isAsync: window._sp_async,everyPageLiNum: 12,historyItemNum: 27,definedNavId: 8888,historyNavId: 9999,bigImgPosArr: [0, 8],skinData: {},skinConf: {},navPageNumObj: {},historyLiArray: [],userLastestImgId: 0,hasInitFlash: false,hasClickClearDefinedBtn: false,reUploadFlash: false,definedData: null,shouldSaveDefinedState: true,definedImgDataCache: null,definedLogoName: "white",isShowErrorPage: false,isShowReUploadErrorPage: false,hadNotChangeDefinedImg: true,stateMsg: {defaultMsg: "上传失败！请稍后重新上传。",noLogin: "上传失败！请登录百度账号后重新上传。",overSize: "上传失败！图片大小超过10M的我不传噢。",formatErr: "上传失败！我只能上传JPG和PNG格式的图片噢。"},numToMsgMap: {overSize: "overSize",2401060001: "noLogin",3201010002: "defaultMsg",4301060002: "defaultMsg",4301060003: "defaultMsg",4301060004: "defaultMsg",4301060005: "defaultMsg",4301060100: "defaultMsg",4301060101: "overSize",4301060105: "defaultMsg",4301060106: "defaultMsg",4301060107: "defaultMsg"}};
    b.initSkinData = function(l, h) {
        e.skinConf = h;
        if (!h.rawPicUrl) {
            e.shouldSaveDefinedState = false
        }
        for (var k = 0, f = l.length; k < f; k++) {
            if (!l[k]) {
                continue
            }
            for (var g = (l[k].bgitem ? (l[k].bgitem.length - 1) : -1); g >= 0; g--) {
                e.skinData[l[k].bgitem[g].dataindex] = l[k].bgitem[g];
                if (l[k].navId == e.historyNavId) {
                    if (l[k].bgitem[g].dataindex != undefined && l[k].bgitem[g].dataindex != "") {
                        e.historyLiArray.push(l[k].bgitem[g])
                    }
                }
            }
            if (l[k].navId == e.historyNavId) {
                e.userLastestImgId = (l[k].bgitem[0] && l[k].bgitem[0].dataindex) ? +l[k].bgitem[0].dataindex : 0
            }
            if (l[k].navId == e.definedNavId) {
                e.definedData = (l[k].bgitem[0] && l[k].bgitem[0].dataindex) ? l[k].bgitem[0] : null
            }
            e.navPageNumObj[l[k].navId] = Math.ceil(l[k].bgitem.length / e.everyPageLiNum)
        }
        e.userLastestImgId = e.userLastestImgId > 0 ? e.userLastestImgId : parseInt(Math.random() * 100)
    };
    b.setItemData = function(f) {
        if (!f || !f.dataindex) {
            return false
        } else {
            e.skinData[f.dataindex] = f
        }
    };
    b.setDataByKey = function(f, g) {
        if (!f || g === undefined) {
            return false
        }
        e[f] = g;
        return true
    };
    b.getDataByKey = function(f) {
        if (!f) {
            return false
        }
        return e[f]
    };
    b.getPageNumByNavId = function(f) {
        return e.navPageNumObj[f]
    };
    b.getItemDataById = function(f) {
        if (e.skinData[f]) {
            return e.skinData[f]
        } else {
            return false
        }
    };
    b.getFlashErrByKey = function(g) {
        var f = g;
        if (f) {
            if (f.indexOf("图片压缩后仍然大于限制大小！") >= 0 || f.indexOf("上传失败！图片大小超过10M的我不传噢。") >= 0) {
                f = "overSize"
            } else {
                if (f.indexOf("error") >= 0 || f.indexOf("undefined") >= 0) {
                    f = "defaultMsg"
                } else {
                    if (f.indexOf("上传失败！我只能上传JPG和PNG格式的图片噢。") >= 0) {
                        f = "formatErr"
                    } else {
                        f = (e.numToMsgMap[f] ? e.numToMsgMap[f] : "defaultMsg")
                    }
                }
            }
        } else {
            f = "defaultMsg"
        }
        return e.stateMsg[f]
    };
    b.updateHistoryLiArray = function(f) {
        if (e.skinData[f] && e.skinData[f].dataindex) {
            e.historyLiArray = d.spliceByKey(e.historyLiArray, "dataindex", f);
            e.historyLiArray.push(e.skinData[f])
        }
    }
});
F.module("superplus:skin/skin_nav", function(c, b, a) {
    var g = c("skin/skin_img"), f = c("skin/skin_model"), e = c("skin/skin_defined");
    var d = function(o, m, k) {
        var n = m || $("#s_skin_layer .s-skin-nav"), j = k || n.find(".nav-" + o), l = "show-nav-", h = $("#s_skin_layer_cell");
        if (!o || !n[0] || !j[0]) {
            return
        }
        n.find(".skin-nav").removeClass("choose-nav");
        j.addClass("choose-nav");
        if (+o == 8888) {
            e.init();
            a.use("skin/skin_preview", function(p) {
                if (f.getDataByKey("definedImgDataCache")) {
                    p.changeSkinPreview(f.getDataByKey("definedImgDataCache").url, true);
                    p.changePreviewLogo(f.getDataByKey("definedLogoName"))
                }
            })
        } else {
            g.lazyLoadImg(o, 0);
            e.definedAction("hideDefinedFlash");
            a.use("skin/skin_preview", function(p) {
                p.hideDefined()
            })
        }
        if (h.hasClass("hide-choose-img")) {
            h.get(0).className = "s-skin-layer-cell hide-choose-img show-page-0 " + l + o
        } else {
            h.get(0).className = "s-skin-layer-cell show-page-0 " + l + o
        }
        a.use("skin/skin_page", function(p) {
            p.resetPage(f.getPageNumByNavId(o))
        });
        a.fire("skinClick", {clickType: "nav",navId: o})
    };
    b.bindNav = function() {
        var h = $("#s_skin_layer .s-skin-nav");
        h.delegate(".skin-nav", "click", function() {
            d($(this).attr("navtype"), h, $(this))
        });
        if ($.isIE6) {
            h.delegate(".skin-nav", "mouseover", function() {
                $(this).addClass("hover-nav4ie6")
            }).delegate(".skin-nav", "mouseout", function() {
                    $(this).removeClass("hover-nav4ie6")
                })
        }
    };
    b.changeNav = d
});
F.module("superplus:skin/skin_page", function(d, b, a) {
    var c = d("skin/skin_tools"), e = d("skin/skin_img");
    b.resetPage = function(f) {
        a.use("skin/skin_view", function(g) {
            var h = g.randerPage(f, 0);
            $("#s_skin_layer_cell .s-skin-page-cell").html(h)
        })
    };
    b.bindPage = function() {
        var h = $("#s_skin_layer_cell"), k = h.find(".s-skin-page"), o = null, m = null, l = null, n = "show-page-", f = null, g = null, j = 0;
        function q(r) {
            m.attr("n", r);
            o.attr("n", r)
        }
        function p(s, r) {
            o = k.find(".page-next"), m = k.find(".page-pre"), g = k.find(".skin-page-number");
            j = +s.attr("n");
            if (!g.get(0) || j < 0) {
                return
            }
            g.removeClass("choose-page-btn");
            switch (r) {
                case "next":
                    ++j;
                    if (j >= g.length) {
                        j = 0
                    }
                    q(j);
                    $(g.get(j)).addClass("choose-page-btn");
                    a.fire("skinClick", {clickType: "nextPageBtn"});
                    break;
                case "pre":
                    --j;
                    if (j < 0) {
                        j = g.length - 1
                    }
                    q(j);
                    $(g.get(j)).addClass("choose-page-btn");
                    a.fire("skinClick", {clickType: "prePageBtn"});
                    break;
                case "num":
                    s.addClass("choose-page-btn");
                    q(j);
                    a.fire("skinClick", {clickType: "PageBtn",skinPageNum: j});
                    break;
                default:
                    break
            }
            f = h.find(".choose-nav").attr("navtype");
            l = c.spliceByIndexStr(h.get(0).className.split(" "), n);
            e.lazyLoadImg(f, j);
            h.get(0).className = l.join(" ") + " " + n + j;
            if (g.length > 1) {
                if (j > 0) {
                    m.removeClass("hide-page")
                } else {
                    m.addClass("hide-page")
                }
                if (j < g.length - 1) {
                    o.removeClass("hide-page")
                } else {
                    o.addClass("hide-page")
                }
            } else {
                m.addClass("hide-page");
                o.addClass("hide-page")
            }
        }
        k.delegate(".page-pre", "click", function() {
            p($(this), "pre")
        }).delegate(".page-next", "click", function() {
                p($(this), "next")
            }).delegate(".skin-page-number", "click", function() {
                p($(this), "num")
            });
        if ($.isIE6) {
            k.delegate(".skin-page-dire", "mouseover", function() {
                $(this).addClass("hover-page-dire")
            }).delegate(".skin-page-dire", "mouseout", function() {
                    $(this).removeClass("hover-page-dire")
                })
        }
    }
});
F.module("superplus:skin/skin_tools", function(c, b, a) {
    b.spliceByIndexStr = function(d, f) {
        if (!d || !f) {
            return []
        }
        for (var e = d.length - 1; e >= 0; e--) {
            if (d[e].indexOf("" + f) >= 0) {
                d.splice(e, 1)
            }
        }
        return d
    };
    b.spliceByKey = function(d, f, g) {
        if (!d || !f) {
            return []
        }
        if (g) {
            for (var e = d.length - 1; e >= 0; e--) {
                if (d[e][f] == g) {
                    d.splice(e, 1)
                }
            }
        } else {
            for (var e = d.length - 1; e >= 0; e--) {
                if (d[e][f] === undefined) {
                    d.splice(e, 1)
                }
            }
        }
        return d
    };
    b.throttle = function(g, e, d) {
        if (g.throttleId) {
            clearTimeout(g.throttleId)
        }
        if (!d) {
            var f = e ? e : {};
            g.throttleId = setTimeout(function() {
                g.call((f.context ? f.context : null), (f.arr ? f.arr : null))
            }, (f.time ? f.time : 300))
        }
    };
    b.jsonParse = function(d) {
        return (new Function("return (" + d + ")"))()
    }
});
F.module("superplus:skin/skin_img", function(d, g, k) {
    var c = d("skin/skin_model"), e = d("skin/skin_tools"), b = d("skin/skin_ajax");
    var j = null;
    var f = function() {
        k.use("skin/skin_preview", function(l) {
            l.changeSkinPreview(s_session.userSkinName)
        })
    };
    function h(m) {
        if (!m.get(0)) {
            return
        }
        var l = m.attr("data-index");
        if (+l > 0) {
            k.use("skin/skin_preview", function(n) {
                n.changeSkinPreview(l)
            })
        }
    }
    function a() {
        $("#s_skin_layer .s-skin-set").removeClass("skin-no-bg").addClass("skin-has-bg")
    }
    g.lazyLoadImg = function(q, o) {
        var p = "#s_skin_img_content .nav-" + q + ".page-" + o, m = $(p), l;
        if (!m.get(0)) {
            return
        }
        for (var n = m.length - 1; n >= 0; n--) {
            l = $(m[n]).find(".skin-img-item-img");
            if (!l.attr("src") && l.attr("data-src")) {
                l.attr("src", l.attr("data-src"))
            }
        }
    };
    g.bindImgClick = function() {
        var l = $("#s_skin_img_content");
        l.delegate(".skin-img-item", "click", function() {
            var m = $(this), n = m.attr("data-index");
            if (+n > 0) {
                j = c.getItemDataById(n);
                if (!j) {
                    return
                }
                $("#s_skin_layer_cell").removeClass("hide-choose-img");
                $("#s_skin_img_content .skin-img-item").removeClass("choose-li");
                m.addClass("choose-li");
                b.submitLookingImg({pid: j.dataindex ? j.dataindex : 0,isupload: j.userDefined == "on" ? true : false,history: j.userDefined == "on" ? true : false}, function() {
                    k.use("skin/skin_rewrite", function(o) {
                        o.setBg(j)
                    });
                    a()
                });
                if (j.userDefined == "on") {
                    k.fire("skinClick", {clickType: "imgItem",skinImgName: "defined",isNewImg: j.isNew})
                } else {
                    k.fire("skinClick", {clickType: "imgItem",skinImgName: n,isNewImg: j.isNew})
                }
            }
        }).delegate(".skin-img-item", "mouseover", function() {
                e.throttle(f, null, true);
                h($(this));
                var m = c.getItemDataById($(this).attr("data-index"));
                if (m && m.userDefined == "on") {
                    k.fire("skinHover", {hoverType: "imgItem",skinImgName: "defined"})
                } else {
                    k.fire("skinHover", {hoverType: "imgItem",skinImgName: $(this).attr("data-index")})
                }
            }).delegate(".skin-img-item", "mouseout", function() {
                e.throttle(f, {time: 500})
            });
        if ($.isIE6) {
            l.delegate(".skin-img-item", "mouseover", function() {
                $(this).addClass("hover-skin-img")
            }).delegate(".skin-img-item", "mouseout", function() {
                    $(this).removeClass("hover-skin-img")
                })
        }
    }
});
F.module("superplus:skin/skin_control", function(d, g, l) {
    d("skin_layer.css");
    var a = d("skin/skin_view"), c = d("skin/skin_model");
    var b = null;
    var f = function() {
        var n = b.get(0), p = $("#s_mod_weather").get(0), q = $("#u_sp").get(0), m = $("#s_skin_flash").get(0);
        var o = function(r) {
            if (n == r) {
                return false
            }
            if ($.contains(n, r)) {
                return false
            }
            if (p == r) {
                return false
            }
            if ($.contains(p, r)) {
                return false
            }
            if (q == r) {
                return false
            }
            if ($.contains(q, r)) {
                return false
            }
            if (parseInt(b.css("top")) < -1) {
                return false
            }
            if (r == $("body").get(0)) {
                return false
            }
            if (r == $("#content").get(0)) {
                return false
            }
            if (r == m) {
                return false
            }
            if ($.contains(m, r)) {
                return false
            }
            return true
        };
        $("body").click(function(s) {
            if (!b.get(0)) {
                return
            }
            var r = s.target;
            if (o(r)) {
                h()
            }
        })
    };
    var e = function() {
        l.use("skin/skin_nav", function(m) {
            m.bindNav()
        });
        l.use("skin/skin_setting", function(m) {
            m.bindSetting()
        });
        l.use("skin/skin_page", function(m) {
            m.bindPage()
        });
        l.use("skin/skin_img", function(m) {
            m.bindImgClick()
        });
        l.use("skin/skin_preview", function(m) {
            m.init()
        });
        l.use("skin/skin_opacity", function(m) {
            m.init()
        });
        f()
    };
    var j = function() {
        if (b[0]) {
            F.call("superplus:mngr/top_layer", "changeLayer", "skin");
            if (c.getDataByKey("isAsync")) {
                $("#content").addClass("s-show-skin")
            } else {
                $("body").addClass("s-show-skin")
            }
            $("#s_skin_layer_shadow").show();
            if ($("#s_skin_layer_cell").hasClass("show-nav-8888")) {
                l.use("skin/skin_defined", function(m) {
                    m.setFlashPos()
                })
            }
            b.animate({top: 0,opacity: 1}, 500, function() {
                l.fire("skinShow", {showType: "skinLayer"})
            })
        }
    };
    var h = function(m) {
        l.use("skin/skin_defined", function(n) {
            n.setFlashPos(true)
        });
        if (b[0]) {
            b.animate({top: -325,opacity: 0}, 500, function() {
                if (c.getDataByKey("isAsync")) {
                    $("#content").removeClass("s-show-skin")
                } else {
                    $("body").removeClass("s-show-skin")
                }
                $("#s_skin_layer_shadow").hide();
                l.use("skin/skin_ajax", function(n) {
                    if (s_session.userSkinName == 0) {
                        n.submitHistoryImg()
                    } else {
                        if (!m) {
                            c.updateHistoryLiArray(c.getDataByKey("userLastestImgId"));
                            $("#s_skin_layer #s_skin_content_historymod").html(a.createHistory({data: c.getDataByKey("historyLiArray").slice(0).reverse(),navId: c.getDataByKey("historyNavId"),liLength: c.getDataByKey("historyItemNum")}, true))
                        }
                        n.submitHistoryImg(c.getItemDataById(c.getDataByKey("userLastestImgId")))
                    }
                })
            })
        }
    };
    var k = function(n, m) {
        if (!b) {
            c.initSkinData(n, m);
            if (c.getDataByKey("isAsync")) {
                $("#content").append(a.render({data: n,definedNavId: c.getDataByKey("definedNavId"),historyNavId: c.getDataByKey("historyNavId"),historyItemNum: c.getDataByKey("historyItemNum"),everyPageLiNum: c.getDataByKey("everyPageLiNum"),bigImgPosArr: c.getDataByKey("bigImgPosArr")}))
            } else {
                $("body").append(a.render({data: n,definedNavId: c.getDataByKey("definedNavId"),historyNavId: c.getDataByKey("historyNavId"),historyItemNum: c.getDataByKey("historyItemNum"),everyPageLiNum: c.getDataByKey("everyPageLiNum"),bigImgPosArr: c.getDataByKey("bigImgPosArr")}))
            }
            b = $("#s_skin_layer");
            e();
            b.css("opacity", 0);
            j()
        } else {
            if (parseInt(b.css("top")) < -1) {
                j()
            } else {
                h()
            }
        }
    };
    g.changeNav = function(m) {
        l.use("skin/skin_nav", function(n) {
            n.changeNav(m)
        })
    };
    g.init = k;
    g.show = j;
    g.hide = h
});
F.module("superplus:skin/skin_view", function(d, e, k) {
    var h = d("skin/skin_tools");
    var g = {mod: ['<div class="s-skin-layer-shadow" id="s_skin_layer_shadow"></div>', '<div class="s-skin-layer" id="s_skin_layer" onselectstart="return false">', '<div class="s-skin-border">', '<div class="s-skin-arrow"></div>', "</div>", '<div class="s-skin-layer-cell #{showEveryState}" id="s_skin_layer_cell">', '<ul class="s-skin-nav">#{nav}</ul>', '<div class="s-skin-opacity-set" id="s_skin_opacity_set">', '<span class="bg-hideOrShowAjax" style="visibility:' + ((s_session.userIsNewSkined == "on" && !$.isIE6) ? "visible" : "hidden") + '">', '<span class="bg-alphaBarTitle">背景透明度</span>', '<span class="bg-alphaBar" id="s_bg_ajust_bar">', '<span class="bg-alphaBarMoveBtn" id="s_bg_ajust_btn" style="#{opacityleft}">', '<em class="bg-alphaBarOpacity" id="s_bg_ajust_txt">#{opacitynum}</em>', "</span>", "</span>", "</span>", "</div>", '<div class="s-skin-set #{hadBg}">#{setting}</div>', '<div class="s-skin-preview">#{preview}</div>', '<div id="s_skin_img_content" class="s-skin-border-content">', '<ul class="s-skin-content">#{content}</ul>', "</div>", '<div class="s-skin-page">', '<ul class="s-skin-page-cell">#{page}</ul>', "</div>", "</div>", '<span class="skinset-close skin-bg-icon"></span>', "</div>", '<div id="s_skin_flash" class="s-skin-defined-flash"></div>'].join(""),skinNavNewIcons: {isNewNav: '<span class="skinnav-new-icon"></span>'},preview: ['<div class="preview-vertial"></div>', '<div id="s_skin_preview_view" class="preview-view #{whichStyle}">', '<div class="preview-view-container">', '<img id="s_skin_preview_skin" height="180" width="262" class="preview-skin-view" #{skinPreviewImg} />', '<img  id="s_skin_preview_defined" class="preview-defined-view"/>', "</div>", '<div class="preview-tabSkinOpacity"></div>', '<div class="preview-pageSkinOpacity"></div>', '<div class="preview-pageUI"></div>', "</div>", '<p class="preview-title">背景皮肤效果预览</p>'].join(""),setting: ["", '<span class="skinset-hasBg skin-bg-icon"></span>', '<span class="skinset-title">换肤</span>', '<span class="skinset-remind-hasbg skin-bg-icon"></span>'].join(""),navItem: ['<li navtype="#{navType}" class="skin-nav nav-#{navType} #{isChooseNavType}">', '<span class="skinnav-nav-name">#{type}</span>', "#{isNewNav}", "</li>"].join(""),navVertial: ['<li class="nav-vertial">', '<div class="nav-vertial-border"></div>', "</li>"].join(""),pageItem: {pagePre: '<li class="skin-page-dire page-pre #{isHide}" n="#{pageNum}"><div class="skin-bg-icon"></div></li>',pageNext: '<li class="skin-page-dire page-next #{isHide}" n="#{pageNum}"><div class="skin-bg-icon"></div></li>',pageBtn: '<li class="skin-page-number skin-bg-icon #{choosePage}" n="#{pageNum}">' + ($.browser.ie < 8 ? '<span class="skin-page-hack467"></span>' : "") + "</li>"},contentState: {contentStart: ['<li  class="skin-type-content #{itemNavTpe}">', '<ul class="skin-img-list" #{historyId}>'].join(""),contentEnd: ["</ul>", "</li>"].join("")},contentItem: ['<li  class="skin-img-item #{itemPage} #{itemPosition} #{itemNavType} #{itemHasImg} #{isFloat} #{itemIsChoose} #{itemNoMargin} #{itemShowShadow}" data-index="#{liDataIndex}">', '<img class="skin-img-item-img" #{itemImg} />', '<div class="skin-img-shadow"></div>', '<p class="skin-img-item-writer">', "#{itemWriter}", "</p>", '<div class="skin-img-item-new skin-bg-icon #{itemNew}"></div>', '<div class="skin-img-item-choose skin-bg-icon skin-bg-png24-icon"></div>', "</li>"].join(""),definedModule: ['<li id="s_skin_defined_mod" lastshowtype="" class="bg-definedItem is-loading-flash #{itemNavTpe}">', '<ul id="s_skin_defined">', '<li class="defined-state-chooseimg">', '<div class="defined-chooseimg-btn skin-bg-icon"></div>', '<p class="defined-chooseimg-descript">仅支持JPG、PNG图片，图片尺寸不小于1600*1000像素、10M以内（高质量图片效果更佳）</p>', '<p class="defined-chooseimg-text">', '<span class="defined-chooseimg-loadinggif">正在加载</span>', "</p>", "</li>", '<li class="defined-state-faile">', '<p class="defined-faile-descript">', '<span class="defined-faile-descript-text skin-bg-png24-icon"></span>', "</p>", '<div class="defined-faile-reupload skin-bg-icon"></div>', "</li>", '<li class="defined-state-uploading">', '<p class="defined-uploading-text">', '<span class="defined-uploading-gif-text">正在上传</span>', "</p>", "</li>", '<li class="defined-state-saving">', '<p class="defined-saving-text">', '<span class="defined-saving-gif-text">正在保存</span>', "</p>", "</li>", '<li class="defined-state-noflash">', '<div class="defined-noflash-btn skin-bg-icon"></div>', '<p class="defined-noflash-descript">', '<span class="defined-noflash-descript-icon skin-bg-png24-icon">', '您还未安装flash播放器，暂时无法使用上传功能。<a href="http://get.adobe.com/cn/flashplayer/" class="bg-flash-err" target="_blank">点此安装</a>', "</span>", "</p>", "</li>", '<li class="defined-state-oldflash">', '<div class="defined-oldflash-btn skin-bg-icon"></div>', '<p class="defined-oldflash-descript">', '<span class="defined-oldflash-descript-icon skin-bg-png24-icon">', '您的flash播放器版本过低，暂时无法使用上传功能。<a href="http://get.adobe.com/cn/flashplayer/" class="bg-oldflash-err" target="_blank">点此安装最新版</a>', "</span>", "</p>", "</li>", '<li id="s_skin_exhibition_mod" class="defined-state-exhibition">', '<div id="s_skin_cutimg" class="defined-exhibition-cutimg"></div>', '<div id="s_skin_exhibition_options" class="defined-exhibition-param white">', '<div class="defined-param-reupload skin-bg-icon"></div>', '<p class="logo-title">百度LOGO</p>', '<p class="logoitem">', '<span class="logocheckbox skin-bg-png24-icon white-checkbox white-option choose-logo"></span>', '<span class="logoicon skin-bg-png24-icon white-icon white-option"></span>', '<span class="recommend">（深色背景推荐）</span>', "</p>", '<p class="logoitem">', '<span class="logocheckbox skin-bg-png24-icon redblue-checkbox redblue-option"></span>', '<span class="logoicon skin-bg-png24-icon redblue-icon redblue-option"></span>', '<span class="recommend">（浅色背景推荐）</span>', "</p>", '<div class="defined-btn-yes skin-bg-icon"></div>', '<div class="defined-btn-no skin-bg-icon"></div>', "</div>", "</li>", "</ul>", "</li>"].join("")};
    var a = function(r) {
        var p = r.data, n = r.historyNavId, o = r.definedNavId, s = r.historyItemNum, x = r.everyPageLiNum, z = r.bigImgPosArr, v = (s_session.userIsNewSkined == "on" ? s_session.userSkinName : "0"), w = "", u = "", m = null, q = 0, t = 0, y = null;
        $.each(p, function(A, B) {
            switch (+B.navId) {
                case n:
                    u += $.formatString(g.navItem, {navType: B.navId,isChooseNavType: (A == 0 ? " choose-nav" : ""),type: B.type,isNewNav: (B.isNewTab == "true" ? g.skinNavNewIcons.isNewNav : "")});
                    w += $.formatString(g.contentState.contentStart, {itemNavTpe: "content-" + B.navId,historyId: 'id="s_skin_content_historymod"'});
                    w += j({data: B.bgitem,navId: B.navId,liLength: s});
                    w += g.contentState.contentEnd;
                    break;
                case o:
                    u += g.navVertial;
                    u += $.formatString(g.navItem, {navType: B.navId,isChooseNavType: (A == 0 ? " choose-nav" : ""),type: B.type,isNewNav: (B.isNewTab == "true" ? g.skinNavNewIcons.isNewNav : "")});
                    y = (B.bgitem[0] && B.bgitem[0].dataindex) ? B.bgitem[0] : false;
                    w += $.formatString(g.definedModule, {itemNavTpe: "content-" + B.navId});
                    break;
                default:
                    u += $.formatString(g.navItem, {navType: B.navId,isChooseNavType: (A == 0 ? " choose-nav" : ""),type: B.type,isNewNav: (B.isNewTab == "true" ? g.skinNavNewIcons.isNewNav : "")});
                    if (!B.bgitem || !B.bgitem.length) {
                        break
                    }
                    w += $.formatString(g.contentState.contentStart, {itemNavTpe: "content-" + B.navId,historyId: ""});
                    for (q = 0, t = B.bgitem.length; q < t; q++) {
                        if (!B.bgitem[q]) {
                            continue
                        }
                        y = B.bgitem[q];
                        w += $.formatString(g.contentItem, {itemIsChoose: (y.dataindex == v ? "choose-li" : ""),itemPosition: ("pos-" + (q % x) + " " + (f(q % x, z) ? "big-img-li" : "")),liDataIndex: y.dataindex,itemImg: (((q < 24 && A == 0) ? "src=" : "data-src=") + (y.userDefined == "on" ? ('"' + decodeURIComponent(y.shortUrl) + '"') : ('"' + b(y.dataindex, f(q % x, z)) + y.dataindex + '.jpg?2"'))),itemWriter: (y.filewriter != "" ? ("来自:" + y.filewriter) : y.name),itemNew: (y.isNew == "on" ? "is-new" : ""),itemHasImg: "",itemPage: "page-" + parseInt(q / x),isFloat: "",itemNavType: "nav-" + B.navId,itemNoMargin: "",itemShowShadow: ((y.filewriter == "" && y.name == "") ? "img-hide-shadow" : "")})
                    }
                    if (B.bgitem.length % 12 > 0) {
                        for (q = B.bgitem.length % 12; q < 12; q++) {
                            w += $.formatString(g.contentItem, {itemIsChoose: "",itemPosition: ("pos-" + (q % x) + " " + (f(q % x, z) ? "big-img-li" : "")),liDataIndex: "",itemImg: "",itemWriter: "",itemNew: "",itemHasImg: "no-img",itemPage: "page-" + parseInt(B.bgitem.length / x),isFloat: "",itemNavType: "nav-" + B.navId,itemNoMargin: "",itemShowShadow: "img-hide-shadow"})
                        }
                    }
                    w += g.contentState.contentEnd;
                    break
            }
        });
        m = $.extend({}, {nav: u,setting: g.setting,hadBg: (+v > 0 ? "skin-has-bg" : "skin-no-bg"),preview: $.formatString(g.preview, {skinPreviewImg: (s_session.userIsNewSkined == "on" ? ("src=" + (s_session.userSkinDefined == "on" ? ('"' + decodeURIComponent(s_session.userSkinUrl) + '"') : ("'" + b(s_session.userSkinName, true) + s_session.userSkinName + ".jpg?2'"))) : ""),whichStyle: (+v > 0 ? (s_session.userIsNewSkined == "on" ? "preview-whitelogo" : "preview-redlogo") : "preview-nobg")}),content: w,page: c(1, 0),showEveryState: ("show-nav-" + p[0].navId + " show-page-0"),opacityleft: "left:" + (((s_session.userSkinOpacity || 20) - 20) / 80 * 66) + "px",opacitynum: (s_session.userSkinOpacity || 0) + "%"});
        return $.formatString(g.mod, m)
    };
    function j(q, u) {
        var n = h.spliceByKey(q.data, "dataindex"), o = (n && n.length) ? n : [], p = q.navId, m = q.liLength, r = 0, s = s_session.userSkinName, t = "", v;
        for (; r < m; r++) {
            v = o[r];
            if (!v) {
                t += $.formatString(g.contentItem, {itemIsChoose: "",itemPosition: "pos-99",liDataIndex: "",itemImg: "",itemWriter: "",itemNew: "",itemHasImg: "no-img",itemPage: "page-0",isFloat: "is-float",itemNavType: "nav-" + p,itemNoMargin: l(r),itemShowShadow: "img-hide-shadow"})
            } else {
                t += $.formatString(g.contentItem, {itemIsChoose: (v.dataindex == s ? "choose-li" : ""),itemPosition: "pos-99",liDataIndex: v.dataindex,itemImg: ((u ? "src=" : "data-src=") + (v.userDefined == "on" ? ('"' + decodeURIComponent(v.shortUrl) + '"') : ('"' + b(v.dataindex) + v.dataindex + '.jpg?2"'))),itemWriter: (v.filewriter != "" ? ("来自:" + v.filewriter) : v.name),itemNew: (v.isNew == "on" ? "is-new" : ""),itemHasImg: "",itemPage: "page-0",isFloat: "is-float",itemNavType: "nav-" + p,itemNoMargin: l(r),itemShowShadow: ((v.filewriter == "" && v.name == "") ? "img-hide-shadow" : "")})
            }
        }
        return t
    }
    function l(p) {
        if (p === undefined) {
            return ""
        }
        var q = [8, 17, 26], o = [18, 19, 20, 23, 24, 25], n = [3, 4, 12, 13], m = [21, 22];
        if (f(+p, q)) {
            return "no-right-margin"
        } else {
            if (f(+p, o)) {
                return "no-bottom-margin"
            } else {
                if (f(+p, n)) {
                    return "no-right-4px"
                } else {
                    if (f(+p, m)) {
                        return "no-right-4px no-bottom-margin"
                    }
                }
            }
        }
    }
    function f(n, m) {
        if ($.inArray(n, m) >= 0) {
            return true
        } else {
            return false
        }
    }
    function b(o, n) {
        var m = o ? +o : 0;
        o = parseInt(o) || 0;
        return "http://" + ((o + 1) % 10 + 1) + ".su.bdimg.com/skin_plus/"
    }
    var c = function(n, s) {
        var p = "", o = parseInt(n), q = {}, m = s ? s : 0, r = 0;
        if (o <= 1) {
            return ""
        }
        p = $.formatString(g.pageItem.pagePre, {pageNum: m,isHide: (m == 0 ? "hide-page" : "")});
        for (; r < o; r++) {
            q.choosePage = "";
            if (r == m) {
                q.choosePage = "choose-page-btn"
            }
            q.pageNum = r;
            p += $.formatString(g.pageItem.pageBtn, q)
        }
        p += $.formatString(g.pageItem.pageNext, {pageNum: m,isHide: (m == o ? "hide-page" : "")});
        return p
    };
    e.createHistory = j;
    e.imgDomain = b;
    e.render = a;
    e.randerPage = c
});
F.module("superplus:skin/skin_upload_flash", function(require, exports, ctx) {
    var UploadFlash = function() {
    };
    UploadFlash.prototype = {initial: function(options) {
        var defaultOpt = {container: null,width: 200,height: 50,accept_size_limit: 10,upload_size_limit: 10,uploadUrl: ""};
        this._options = $.extend(defaultOpt, options || {});
        this._token = this._makeToken();
        this._flashVars = "";
        this._version = "1_0_1_3";
        this._EVENTS = {FileItemCompress: "onFipFlashFileItemCompress",FileItemComplete: "onFipFlashFileItemComplete",initComplete: "onFipFlashInitComplete",startUpload: "onFipFlashStartUpload",FileItemError: "onFipFlashFileItemError",uploadError: "onFlashUploadError",errorMessage: "onFlashErrorMessage",itemUploadError: "onFlashItemUploadError"};
        this._reset()
    },_reset: function() {
        this._initFlashvars();
        this._generateCallBack();
        this._initUI()
    },_initFlashvars: function() {
        this._flashVars = ["accept_size_limit=" + encodeURIComponent(this._options.accept_size_limit), "upload_size_limit=" + encodeURIComponent(this._options.upload_size_limit), "upload_url=" + encodeURIComponent(this._options.uploadUrl)].join("&")
    },_initUI: function() {
        var flashMsg = this._flashChecker();
        var version = flashMsg.version;
        var url;
        var id = "flashUploader" + this._token;
        if (!flashMsg.hasFlash) {
            this._fireFlashMsg("showNoFlashPage");
            return
        }
        if (+version[0] < 11 || (+version[0] == 11 && +version[1] < 4)) {
            this._fireFlashMsg("showOldFlashPage");
            return
        }
        url = s_domain.staticUrl + "static/superplus/swf/single_upload_3.swf";
        var ie = '<object id="' + id + '" name="' + id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + this._options.width + '" height="' + this._options.height + '"><param name="allowScriptAccess" value="always" /><param value="transparent" name="wmode"><param name="flashvars" value="' + this._flashVars + '" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + url + '" /></object>';
        var w3c = '<object id="' + id + '" type="application/x-shockwave-flash" data="' + url + '" width="' + this._options.width + '" height="' + this._options.height + '"><param name="allowScriptAccess" value="always" /><param value="transparent" name="wmode"><param name="flashvars" value="' + this._flashVars + '" /></object>';
        if (!this._options.container.get(0)) {
            if (window._sp_async) {
                this._options.container = $("div").css({position: "absolute",width: "1px",height: "1px",overflow: "hidden",left: "1px",bottom: "1px"}).appendTo($("#content"))
            } else {
                this._options.container = $("div").css({position: "absolute",width: "1px",height: "1px",overflow: "hidden",left: "1px",bottom: "1px"}).appendTo($("body"))
            }
        }
        if (navigator.appName.indexOf("Microsoft") != -1) {
            this._options.container.html(ie)
        } else {
            this._options.container.html(w3c)
        }
        this.flash = document[id] || window[id];
        this._fireFlashMsg("showChooseImgPage")
    },_generateCallBack: function() {
        for (var i in this._EVENTS) {
            this._flashVars += "&" + i + "=" + this._EVENTS[i]
        }
        var that = this;
        window.onFipFlashFileItemComplete = function() {
            var _a = arguments;
            that._fireFlashMsg("uploadComplate", _a)
        };
        window.onFipFlashFileItemCompress = function(err, data) {
            if (err == 0) {
                that._fireFlashMsg("uploadImgSize", data)
            }
        };
        window.onFipFlashInitComplete = function() {
            that._fireFlashMsg("loadFlash")
        };
        window.onFipFlashStartUpload = function() {
            that._fireFlashMsg("clickFlashBtn")
        };
        window.onFlashUploadError = function(errNo, msg) {
            that._fireFlashMsg("errorWithMsg", msg)
        };
        window.onFlashErrorMessage = function(errNo, msg) {
            that._fireFlashMsg("errorWithMsg", msg)
        };
        window.onFlashItemUploadError = function(errNo, msg) {
            that._fireFlashMsg("errorWithMsg", msg)
        };
        window.onFipFlashFileItemError = function(errNo, msg) {
            that._fireFlashMsg("errorWithMsg", msg)
        }
    },start: function() {
        this.flash.startUpload()
    },stop: function() {
        this.flash.pauseUpload()
    },deleteFile: function(id) {
        this.flash.deleteFile(id)
    },clearList: function() {
        this.flash.clearList()
    },reUploadError: function(id) {
        this.flash.resetErrorStatus(id)
    },_flashChecker: function() {
        var hasFlash = false;
        var flashVersion;
        var isIE =
            /*@cc_on!@*/
            0;
        var swf;
        if (isIE) {
            try {
                swf = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                if (swf) {
                    hasFlash = true;
                    flashVersion = swf.GetVariable("$version")
                }
            } catch (e) {
            }
        } else {
            try {
                if (navigator.plugins && navigator.plugins.length > 0) {
                    swf = navigator.plugins["Shockwave Flash"];
                    if (swf) {
                        hasFlash = true;
                        flashVersion = swf.description
                    }
                }
            } catch (e) {
            }
        }
        if (hasFlash) {
            return {hasFlash: hasFlash,version: flashVersion.match(/\d+/g)}
        } else {
            return {hasFlash: hasFlash}
        }
    },_fireFlashMsg: function(msg, param) {
        ctx.use("skin/skin_defined", function(sc) {
            sc.definedAction(msg, param)
        })
    },_makeToken: function() {
        var S4 = function() {
            return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1)
        };
        return (S4() + S4() + "_" + S4() + S4() + S4())
    }};
    exports.Flash = function(param) {
        var _flash = new UploadFlash();
        _flash.initial(param);
        return _flash
    }
});
F.module("superplus:skin/skin_setting", function(c, b, a) {
    var f = c("skin/skin_model");
    var e = c("skin/skin_ajax");
    var d = null;
    b.bindSetting = function() {
        var g = $("#s_skin_layer .s-skin-set");
        g.delegate(".skinset-hasBg", "mouseover", function() {
            g.toggleClass("hover-skin-setting");
            g.css("z-index", "200")
        }).delegate(".skinset-hasBg", "mouseout", function() {
                g.toggleClass("hover-skin-setting");
                g.css("z-index", "1")
            }).delegate(".skinset-hasBg", "click", function() {
                a.use("skin/skin_rewrite", function(h) {
                    if (g.hasClass("skin-has-bg")) {
                        e.submitLookingImg({pid: 0,isupload: false}, function() {
                            g.removeClass("skin-has-bg").addClass("skin-no-bg");
                            $("#s_skin_layer_cell").addClass("hide-choose-img");
                            h.removeBg()
                        });
                        a.use("skin/skin_preview", function(j) {
                            j.changeSkinPreview(0)
                        });
                        a.fire("skinClick", {clickType: "closeSkinBtn"})
                    } else {
                        d = f.getItemDataById(f.getDataByKey("userLastestImgId"));
                        e.submitLookingImg({pid: d.dataindex ? d.dataindex : 0,isupload: d.userDefined == "on" ? true : false,history: d.userDefined == "on" ? true : false}, function() {
                            g.removeClass("skin-no-bg").addClass("skin-has-bg");
                            $("#s_skin_layer_cell").removeClass("hide-choose-img");
                            h.setBg(d)
                        });
                        a.use("skin/skin_preview", function(j) {
                            j.changeSkinPreview(d.dataindex ? d.dataindex : 0)
                        });
                        a.fire("skinClick", {clickType: "openSkinBtn"})
                    }
                })
            });
        $(".s-skin-layer .skinset-close").on("click", function() {
            a.use("skin/skin_control", function(h) {
                h.hide()
            });
            a.fire("skinClick", {clickType: "closeSkinModBtn"})
        }).on("mouseover", function() {
                $(this).addClass("skinset-close-hover")
            }).on("mouseout", function() {
                $(this).removeClass("skinset-close-hover")
            })
    }
});
F.module("superplus:skin/skin_preview", function(d, e, k) {
    var c = d("skin/skin_model");
    var b = null, j = null, l = null, f = "", g = null, a = {width: 262,height: 165};
    var h = function(m) {
        var n = "";
        switch (m) {
            case "white":
                n = "preview-whitelogo";
                break;
            case "redblue":
                n = "preview-redlogo";
                break;
            case "nologo":
                n = "preview-nobg";
                break
        }
        b.removeClass("preview-whitelogo").removeClass("preview-redlogo").removeClass("preview-nobg");
        n && b.addClass(n)
    };
    e.changeSkinPreview = function(o, m) {
        var n = j || $("#s_skin_preview_skin");
        if (!n.get(0)) {
            return
        }
        if (m) {
            if (!o) {
                return
            }
            l.attr("src", decodeURIComponent(o));
            h("white");
            b.addClass("show-defined-preview").removeClass("hide-defined-preview");
            return
        }
        g = c.getItemDataById(o);
        if (g) {
            if (g.userDefined == "on") {
                g.shortUrl && n.attr("src", decodeURIComponent(g.shortUrl));
                if (g.logo == "logo_redBlue") {
                    h("redblue")
                } else {
                    h("white")
                }
            } else {
                if (g.dataindex) {
                    k.use("skin/skin_view", function(p) {
                        f = p.imgDomain(g.dataindex, true);
                        if (f) {
                            n.attr("src", f + g.dataindex + ".jpg?2")
                        }
                    });
                    h("white")
                }
            }
            b.removeClass("show-defined-preview")
        } else {
            h("nologo");
            n.removeAttr("src");
            b.addClass("hide-defined-preview")
        }
    };
    e.hideDefined = function() {
        b.addClass("hide-defined-preview").removeClass("show-defined-preview")
    };
    e.showDefined = function() {
        b.removeClass("hide-defined-preview").addClass("show-defined-preview")
    };
    e.init = function() {
        b = $("#s_skin_preview_view");
        j = b.find("#s_skin_preview_skin");
        l = b.find("#s_skin_preview_defined")
    };
    e.changePreviewLogo = h;
    e.resizePreviewImg = function(r) {
        var s = l || $("#s_skin_preview_defined");
        if (!s.get(0) || !r.h || !r.w || !r.sh || !r.sw) {
            return
        }
        var o = -r.h / r.sh * (r.y ? r.y : 0), n = -r.w / r.sw * (r.x ? r.x : 0), m = a.width * r.w / r.sw, p = a.height * r.h / r.sh, q = {};
        if (m >= a.width) {
            q.width = m
        }
        if (p >= a.height) {
            q.height = p
        }
        if (o <= 0 && (p - Math.abs(o) >= a.height)) {
            q.top = o
        }
        if (n <= 0 && (m - Math.abs(n) >= a.width)) {
            q.left = n
        }
        s.css(q)
    }
});
F.module("superplus:skin/skin_defined", function(g, A, r) {
    var h = g("skin/skin_model"), c = g("skin/skin_tools"), z = g("skin/skin_ajax"), f = g("skin/skin_cut_img");
    var k = function(D, C) {
        f.init(D, C)
    };
    var j = function() {
        return f.getInfo()
    };
    var b = function(E, C, D) {
        f.changeImg(E, C, D)
    };
    var d = function() {
        if (!h.getDataByKey("hasInitFlash")) {
            if (!$("#s_skin_flash")[0]) {
                return
            }
            var C = h.getDataByKey("skinConf"), D = $("#s_skin_flash");
            r.use("skin/skin_upload_flash", function(E) {
                E.Flash({container: D,width: 200,height: 33,isAutoUp: true,isFlash: true,uploadUrl: decodeURIComponent(C.url) + "?pid=" + C.pid + "&app=" + C.app + "&logid=" + s_session.logId});
                h.setDataByKey("hasInitFlash", true)
            })
        }
    };
    var t = function(C) {
        r.use("skin/skin_preview", function(D) {
            D.changeSkinPreview(C, true);
            D.showDefined()
        })
    };
    var B = function(E) {
        var G = $("#s_skin_defined_mod"), C = G.attr("lastshowtype"), D = "show-" + E;
        G.attr("lastshowtype", D).removeClass(C).addClass(D)
    };
    var s = function(C, D) {
        var E = $("#s_skin_flash");
        if (C) {
            if (D === "chooseImg") {
                E.removeClass("flash-upload-faile").removeClass("flash-upload-new-img").addClass("flash-choose-img");
                h.setDataByKey("reUploadFlash", false)
            } else {
                if (D === "uploadFaile") {
                    E.removeClass("flash-upload-new-img").removeClass("flash-choose-img").addClass("flash-upload-faile");
                    h.setDataByKey("reUploadFlash", true)
                } else {
                    if (D === "uploadNewImg") {
                        E.removeClass("flash-upload-faile").removeClass("flash-choose-img").addClass("flash-upload-new-img");
                        h.setDataByKey("reUploadFlash", true)
                    } else {
                        E.removeClass("flash-upload-faile").removeClass("flash-upload-new-img").removeClass("flash-choose-img");
                        h.setDataByKey("reUploadFlash", false)
                    }
                }
            }
        } else {
            E.removeClass("flash-upload-faile").removeClass("flash-upload-new-img").removeClass("flash-choose-img");
            h.setDataByKey("reUploadFlash", false)
        }
    };
    var o = function(E) {
        var D = (E && E[0]) ? E[0] : "", C = null;
        if (E && E[1]) {
            C = c.jsonParse(E[1])
        }
        if (C && +C.err_no == 0) {
            if (C.data && C.data.pic_id) {
                z.getDefinedRawUrl({pid: C.data.pic_id,w: C.data.fullpic_width,h: C.data.fullpic_height}, function(H) {
                    var G = H;
                    if (G.rawPicUrl) {
                        h.setDataByKey("hadNotChangeDefinedImg", true);
                        p(G.rawPicUrl);
                        w("showExhibitionPage");
                        h.setDataByKey("shouldSaveDefinedState", true);
                        h.setDataByKey("definedImgDataCache", {pid: C.data.pic_id,w: C.data.fullpic_width,h: C.data.fullpic_height,url: G.rawPicUrl})
                    }
                    z.submitUploadImg({pid: +C.data.pic_id,isupload: true,x: 0,y: 0,w: C.data.fullpic_width,h: C.data.fullpic_height,raww: C.data.fullpic_width,rawh: C.data.fullpic_height,logo: "logo_white"})
                })
            }
        } else {
        }
    };
    var x = function(H) {
        var C = h.getDataByKey("definedImgDataCache");
        if (!C || +C.pid <= 0) {
            C = h.getDataByKey("definedData");
            if (!C || +C.dataindex <= 0) {
                return
            } else {
                C.pid = C.dataindex;
                C.url = C.shortUrl
            }
        }
        var G = j(), D = h.getDataByKey("skinConf"), E = {pid: +C.pid,isupload: "true",x: G.x,y: G.y,w: G.w,h: G.h,raww: G.raww,rawh: G.rawh,logo: h.getDataByKey("definedLogoName") == "white" ? "logo_white" : "logo_redBlue",opacity: D.opacity ? D.opacity : "65"};
        z.submitLookingImg(E, function(J) {
            var I = J, K = $.extend({}, {color: D.color ? D.color : "#404040",dataindex: +C.pid,defaultOpacity: D.opacity ? D.opacity : "65",longUrl: (I.longUrl ? decodeURIComponent(I.longUrl) : ""),shortUrl: (I.shortUrl ? decodeURIComponent(I.shortUrl) : ""),filewriter: "",isChoose: "",isNew: "",logo: h.getDataByKey("definedLogoName") == "white" ? "logo_white" : "logo_redBlue",name: D.name ? D.name : "",userDefined: "on"});
            h.setItemData(K);
            H && H(K)
        })
    };
    var a = function(C) {
        C && $("#s_skin_defined_mod .defined-faile-descript-text").html(C)
    };
    var m = function() {
        var C = h.getDataByKey("skinConf");
        if (C.rawPicUrl && C.rawPicUrl.indexOf("http") >= 0) {
            b(C, true);
            t(C.rawPicUrl);
            w("showExhibitionPage")
        } else {
            B("chooseimg");
            s(true, "chooseImg")
        }
    };
    var w = function(E, D) {
        switch (E) {
            case "hideDefinedFlash":
                s(false);
                break;
            case "showChooseImgPage":
                h.setDataByKey("hasInitFlash", true);
                m();
                break;
            case "showExhibitionPage":
                B("exhibition");
                s(true, "uploadNewImg");
                break;
            case "showNoFlashPage":
                B("noflash");
                s(false);
                break;
            case "showOldFlashPage":
                B("oldflash");
                s(false);
                break;
            case "errorWithMsg":
                h.setDataByKey("isShowErrorPage", true);
                h.setDataByKey("isShowReUploadErrorPage", true);
                a(h.getFlashErrByKey(D));
                B("faile");
                s(true, "uploadFaile");
                r.fire("skinInfo", {infoType: "uploadFaile",errorInfo: D});
                break;
            case "flashError":
                h.setDataByKey("isShowErrorPage", true);
                h.setDataByKey("isShowReUploadErrorPage", true);
                a(h.getFlashErrByKey(D));
                B("faile");
                s(true, "uploadFaile");
                r.fire("skinInfo", {infoType: "uploadFaile",errorInfo: D});
                break;
            case "clickFlashBtn":
                if (!h.getDataByKey("isShowErrorPage") && h.getDataByKey("isShowReUploadErrorPage")) {
                    h.setDataByKey("isShowReUploadErrorPage", false)
                }
                if (h.getDataByKey("isShowErrorPage")) {
                    h.setDataByKey("isShowErrorPage", false)
                } else {
                    B("uploading");
                    s(false)
                }
                if (h.getDataByKey("reUploadFlash")) {
                    r.fire("skinClick", {clickType: "definedReUploadBtn"})
                } else {
                    r.fire("skinClick", {clickType: "definedUploadBtn"})
                }
                break;
            case "uploadComplate":
                h.setDataByKey("hasClickClearDefinedBtn", false);
                B("saving");
                s(false);
                o(D);
                r.fire("skinInfo", {infoType: "uploadSuccess"});
                break;
            case "uploadImgSize":
                var C = (D ? D.split("|") : [0, 0]);
                r.fire("skinInfo", {infoType: "uploadImgSize",imgShapeWidth: C[0],imgShapeHeight: C[1],imgWholeShape: C[0] + "_" + C[1]});
                break;
            case "loadFlash":
                $("#s_skin_defined_mod").removeClass("is-loading-flash");
                break;
            default:
                break
        }
    };
    var p = function(C) {
        if (!C) {
            return
        }
        b(decodeURIComponent(C), false);
        t(C)
    };
    var u = function(C) {
        var D = C;
        D.delegate(".white-option", "click", function() {
            v("white");
            h.setDataByKey("definedLogoName", "white");
            r.use("skin/skin_preview", function(E) {
                E.changePreviewLogo("white");
                E.showDefined()
            });
            r.fire("skinOperate", {operateType: "changeLogo",logoType: "white"})
        }).delegate(".redblue-option", "click", function() {
                v("redblue");
                h.setDataByKey("definedLogoName", "redblue");
                r.use("skin/skin_preview", function(E) {
                    E.changePreviewLogo("redblue");
                    E.showDefined()
                });
                r.fire("skinOperate", {operateType: "changeLogo",logoType: "redBlue"})
            })
    };
    var v = function(C) {
        var D = $("#s_skin_exhibition_options");
        if (C == "white") {
            if (!D.hasClass("white")) {
                D.addClass("white")
            }
            if (D.hasClass("redblue")) {
                D.removeClass("redblue")
            }
        } else {
            if (C == "redblue") {
                if (!D.hasClass("redblue")) {
                    D.addClass("redblue")
                }
                if (D.hasClass("white")) {
                    D.removeClass("white")
                }
            }
        }
    };
    var q = function(C) {
        var D = C;
        D.delegate(".defined-btn-yes", "click", function() {
            x(function(E) {
                r.use("skin/skin_rewrite", function(G) {
                    G.setBg(E);
                    $("#s_skin_layer .s-skin-set").removeClass("skin-no-bg").addClass("skin-has-bg")
                });
                y(false);
                h.setDataByKey("hasClickClearDefinedBtn", true)
            });
            r.fire("skinClick", {clickType: "chooseDefinedImg"})
        }).delegate(".defined-btn-no", "click", function() {
                var E = h.getDataByKey("definedData");
                if (!E || +E.dataindex <= 0) {
                    E = h.getDataByKey("definedImgDataCache");
                    E.dataindex = E.pid
                }
                if (!E || +E.dataindex <= 0) {
                    y(true)
                } else {
                    z.clearDefinedImgUrl(E.dataindex, function() {
                        y(true)
                    })
                }
                h.setDataByKey("hasClickClearDefinedBtn", true);
                r.fire("skinClick", {clickType: "deleteDefinedImg"})
            })
    };
    var n = function() {
        var C = $("#s_skin_exhibition_options");
        u(C);
        q(C)
    };
    var y = function(C) {
        h.setDataByKey("definedImgDataCache", null);
        h.setDataByKey("shouldSaveDefinedState", false);
        s(false);
        l(C);
        e(true)
    };
    var l = function(C) {
        r.use("skin/skin_control", function(D) {
            D.hide(C)
        })
    };
    var e = function(C) {
        if (!h.getDataByKey("shouldSaveDefinedState") || !h.getDataByKey("definedImgDataCache")) {
            h.setDataByKey("definedLogoName", "white");
            v("white");
            B("chooseimg");
            if (C) {
                r.use("skin/skin_preview", function(D) {
                    D.changeSkinPreview(s_session.userSkinName)
                })
            }
        }
    };
    A.definedAction = w;
    A.init = function() {
        if (h.getDataByKey("hasInitFlash")) {
            if (h.getDataByKey("isShowReUploadErrorPage")) {
                h.setDataByKey("isShowReUploadErrorPage", false);
                B("chooseimg");
                s(true, "chooseImg")
            } else {
                if (h.getDataByKey("hadNotChangeDefinedImg") && h.getDataByKey("skinConf") && h.getDataByKey("skinConf").rawPicUrl && !h.getDataByKey("hasClickClearDefinedBtn")) {
                    m()
                } else {
                    if (!h.getDataByKey("shouldSaveDefinedState") || !h.getDataByKey("definedImgDataCache")) {
                        s(true, "chooseImg")
                    } else {
                        s(true, "uploadNewImg")
                    }
                    e()
                }
            }
        } else {
            d();
            n()
        }
    };
    A.setFlashPos = function(C) {
        if (C) {
            $("#s_skin_flash").removeClass("flash-upload-faile").removeClass("flash-upload-new-img").removeClass("flash-choose-img");
            return
        }
        if (h.getDataByKey("hasInitFlash")) {
            if (h.getDataByKey("isShowReUploadErrorPage")) {
                h.setDataByKey("isShowReUploadErrorPage", false);
                B("chooseimg");
                s(true, "chooseImg")
            } else {
                if (!h.getDataByKey("shouldSaveDefinedState") || h.getDataByKey("hasClickClearDefinedBtn") || (!h.getDataByKey("definedImgDataCache") && !h.getDataByKey("skinConf").rawPicUrl)) {
                    s(true, "chooseImg")
                } else {
                    s(true, "uploadNewImg")
                }
            }
        }
    }
});
F.module("superplus:skin/skin_opacity", function(l, w, s) {
    var f, m, b, h;
    var g = 0, n = "", v = "false";
    var k = {x: 0}, p = false;
    var y = {};
    var x = null, e = 0;
    var o = l("skin/skin_ajax");
    var d = 0;
    var t = function(z) {
        if ($.isIE6) {
            return
        }
        if ($.isIE) {
            clearTimeout(d);
            d = setTimeout(function() {
                x.removeClass("s-opacity-" + e);
                x.addClass("s-opacity-" + z);
                e = z
            }, 300)
        } else {
            x.removeClass("s-opacity-" + e);
            x.addClass("s-opacity-" + z);
            e = z
        }
        b.css("left", (((z) - 20) / 80 * 66) + "px");
        h[0].innerHTML = (z + "%")
    };
    var u = 0;
    var j = function(z, A) {
        var C = Math.floor((z - k.x) / 66 * 80 / 5) * 5;
        var B = +g + +C;
        if (B < 20) {
            B = 20
        }
        if (B > 100) {
            B = 100
        }
        t(B);
        clearTimeout(u);
        u = setTimeout(function() {
            o.submitOpacity(n, B, v, function() {
                y[n] = B
            })
        }, 1000);
        A && (g = B)
    };
    var a = function(z) {
        if (p) {
            return
        }
        p = true;
        k = {x: z.clientX}
    };
    var q = function(z) {
        if (p) {
            j(z.clientX)
        }
    };
    var r = function(z) {
        if (p) {
            j(z.clientX, true);
            p = false
        }
    };
    var c = function() {
        b.on("mousedown", function(z) {
            a(z)
        });
        f.on("mousemove", function(z) {
            z.preventDefault();
            q(z)
        });
        f.on("mouseup", function(z) {
            r(z)
        });
        f.on("mouseleave", function(z) {
            r(z)
        });
        b.on("click", function(z) {
            z.stopPropagation()
        });
        m.on("click", function(z) {
            k.x = m.offset().left + parseInt(b.css("left").replace(/px$/g, ""));
            j(z.clientX, true)
        })
    };
    w.init = function() {
        f = $("#s_skin_opacity_set");
        m = $("#s_bg_ajust_bar");
        b = $("#s_bg_ajust_btn");
        h = $("#s_bg_ajust_txt");
        g = s_session.userSkinOpacity;
        e = g;
        if (window._sp_async) {
            x = $("#content")
        } else {
            x = $("body")
        }
        n = s_session.userSkinName;
        v = (s_session.userSkinDefined == "on") ? "true" : "false";
        c();
        s.listen("superplus:skin/skin_rewrite", "skin_change", function(z) {
            w.changeOpacity(z.dataindex, (y[z.dataindex] || z.defaultOpacity), (z.userDefined == "on") ? "true" : "false")
        })
    };
    w.changeOpacity = function(B, A, z) {
        t(A);
        n = B;
        g = A;
        v = z;
        y[n] = A
    }
});
F.module("superplus:skin/skin_ajax", function(c, b, a) {
    b.submitLookingImg = function(f, e, d) {
        if (!f || f.pid === undefined || f.isupload === undefined) {
            return
        }
        s_session.userSkinName = f.pid;
        $.ajaxpost(s_domain.baseuri + "/page/submit/setuskin", f, function(g) {
            if (g.errNo == 0) {
                if (+f.pid > 0) {
                    a.use("skin/skin_model", function(h) {
                        h.setDataByKey("userLastestImgId", f.pid)
                    })
                }
                if (g.bsResult) {
                    if (d) {
                        b.clearDefinedImgUrl(f.pid, function() {
                            e && e(g.bsResult)
                        })
                    } else {
                        e && e(g.bsResult)
                    }
                }
            }
        })
    };
    b.submitHistoryImg = function(e) {
        var f, d;
        if (e && e.dataindex !== undefined && +e.dataindex > 0) {
            f = e.dataindex;
            d = ((+f > 0 && e.userDefined == "on") ? true : false)
        } else {
            f = 0;
            d = false
        }
        s_session.userSkinName = f;
        $.ajaxpost(s_domain.baseuri + "/page/submit/sethistory", {pid: f,isupload: d}, function(g) {
            if (g.errNo == 0) {
            }
        })
    };
    b.submitUploadImg = function(d) {
        if (!d || d.pid === undefined) {
            return
        }
        $.ajaxpost(s_domain.baseuri + "/page/submit/setuploadpic", d, function(e) {
        })
    };
    b.clearDefinedImgUrl = function(e, d) {
        if (e && +e > 0) {
            $.ajaxpost(s_domain.baseuri + "/page/submit/clearuskin", {pid: e}, function(f) {
                if (f.errNo == 0) {
                    d && d()
                }
            })
        }
    };
    b.getDefinedRawUrl = function(e, d) {
        if (!e || !e.pid || (+e.pid < 0) || !e.w || !e.h) {
            return
        }
        $.ajaxpost(s_domain.baseuri + "/page/data/rawpic", e, function(f) {
            if (f.errNo == 0) {
                d && d(f.bsResult)
            }
        })
    };
    b.submitDefinedLogo = function(h, e, g) {
        if (!h || !e || +h <= 0) {
            return
        }
        var f = h, d = e;
        $.ajaxpost(s_domain.baseuri + "/page/submit/skinlogo", {pid: f,name: d}, function(j) {
            if (j.errNo == 0) {
                g && g()
            }
        })
    };
    b.submitOpacity = function(g, e, d, f) {
        if (!g || !e || +g <= 0) {
            return
        }
        $.ajaxpost(s_domain.baseuri + "/page/submit/opacity", {pid: g,num: e,isupload: d}, function(h) {
            if (h.errNo == 0) {
                f && f()
            }
        })
    }
});
