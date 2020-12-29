! function (e) {
    function t(t) {
        for (var r, c, o = t[0], s = t[1], l = t[2], d = 0, p = []; d < o.length; d++) c = o[d], Object.prototype.hasOwnProperty.call(a, c) && a[c] && p.push(a[c][0]), a[c] = 0;
        for (r in s) Object.prototype.hasOwnProperty.call(s, r) && (e[r] = s[r]);
        for (u && u(t); p.length;) p.shift()();
        return i.push.apply(i, l || []), n()
    }

    function n() {
        for (var e, t = 0; t < i.length; t++) {
            for (var n = i[t], r = !0, o = 1; o < n.length; o++) {
                var s = n[o];
                0 !== a[s] && (r = !1)
            }
            r && (i.splice(t--, 1), e = c(c.s = n[0]))
        }
        return e
    }
    var r = {},
        a = {
            0: 0
        },
        i = [];

    function c(t) {
        if (r[t]) return r[t].exports;
        var n = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, c), n.l = !0, n.exports
    }
    c.m = e, c.c = r, c.d = function (e, t, n) {
        c.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }, c.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, c.t = function (e, t) {
        if (1 & t && (e = c(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (c.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var r in e) c.d(n, r, function (t) {
                return e[t]
            }.bind(null, r));
        return n
    }, c.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return c.d(t, "a", t), t
    }, c.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, c.p = "./";
    var o = window.webpackJsonp = window.webpackJsonp || [],
        s = o.push.bind(o);
    o.push = t, o = o.slice();
    for (var l = 0; l < o.length; l++) t(o[l]);
    var u = s;
    i.push([58, 1]), n()
}({
    25: function (e, t, n) {
        e.exports = {
            "source-bar": "style__source-bar--6-ssq"
        }
    },
    26: function (e, t, n) {
        e.exports = {
            list_container: "style__list_container--OptNu"
        }
    },
    28: function (e, t) {},
    29: function (e, t, n) {},
    35: function (e, t, n) {},
    54: function (e, t) {
        window.__ONERROR_ADDED || (window.onerror = function (e, t, n, r, a) {
            return !0
        }, window.__ONERROR_ADDED = !0)
    },
    55: function (e, t) {
        window.__ERROR_EVENT_ADDED || (window.addEventListener("error", (function (e) {
            var t = e.target;
            t.tagName, t.src
        }), !0), window.__ERROR_EVENT_ADDED = !0)
    },
    56: function (e, t) {
        window.__UNHANDLEREJECTION_ADDED || (window.addEventListener("unhandledrejection", (function (e) {
            return e.preventDefault(), !0
        })), window.__UNHANDLEREJECTION_ADDED = !0)
    },
    57: function (e, t) {
        window.__UNETWORK_ADDED || (window.addEventListener("online", (function () {}), !1), window.addEventListener("offline", (function () {}), !1), window.__UNETWORK_ADDED = !0)
    },
    58: function (e, t, n) {
        "use strict";
        n.r(t);
        var r = n(0),
            a = n.n(r),
            i = n(11),
            c = n.n(i),
            o = (n(35), n(8)),
            s = n(23),
            l = n.n(s),
            u = n(15),
            d = n(12),
            p = n.n(d),
            f = n(9),
            m = r.useMemo,
            v = r.useState,
            y = r.useEffect,
            _ = r.useRef;

        function h(e) {
            var t = _(null),
                n = v(!1),
                a = n[0],
                i = n[1],
                c = e.options,
                o = void 0 === c ? [] : c,
                s = e.value,
                l = e.onChange,
                d = m((function () {
                    return o.find((function (e) {
                        return e.value === s
                    }))
                }), [s]);
            y((function () {
                var e = function (e) {
                    t.current.contains(e.target) || i(!1)
                };
                return document.addEventListener("click", e, !1),
                    function () {
                        document.removeEventListener("click", e, !1)
                    }
            }), []);
            var p = function (e, t) {
                l(e, t), i(!1)
            };
            return r.createElement("div", {
                className: f["easy-selector"],
                ref: t
            }, r.createElement("div", {
                className: f.content,
                onClick: function () {
                    return i(!a)
                }
            }, r.createElement("div", {
                className: f.title
            }, r.createElement("div", null, Object(u.oc)(d).label("")))), r.createElement("div", {
                className: f.list,
                style: {
                    display: a ? "block" : "none"
                }
            }, o.map((function (e) {
                return r.createElement(E, {
                    key: e.value,
                    data: e,
                    isActive: e.value === Object(u.oc)(d).value(""),
                    onChange: p
                })
            }))))
        }

        function E(e) {
            var t, n = e.data,
                a = e.onChange,
                i = e.isActive;
            return r.createElement("div", {
                className: p()(f.item, (t = {}, t[f.active] = i, t)),
                onClick: function () {
                    return a(n.value, n)
                }
            }, r.createElement("span", null, e.data.label))
        }
        var b = n(7),
            w = n(24),
            g = n(3);

        function D(e) {
            return r.createElement(g.a, {
                render: function () {
                    return r.createElement("div", {
                        className: b["mark-list"]
                    }, e.list.map((function (t) {
                        return r.createElement(k, {
                            key: t.id,
                            data: t,
                            presenter: e.presenter
                        })
                    })))
                }
            })
        }

        function k(e) {
            var t = e.data,
                n = t.id,
                a = t.title,
                i = t.url,
                c = t.createTime,
                o = t.isStar;
            return r.createElement(g.a, {
                render: function () {
                    return r.createElement("div", {
                        className: b["mark-item"]
                    }, r.createElement("div", {
                        className: b.left
                    }, r.createElement("input", {
                        type: "checkbox",
                        checked: e.presenter.isSelected(n),
                        onChange: function () {
                            return e.presenter.selectMark(n)
                        }
                    })), r.createElement("a", {
                        className: b.content,
                        href: i,
                        target: "_blank"
                    }, r.createElement("div", {
                        className: b.title
                    }, a), r.createElement("div", {
                        className: b.url
                    }, i), r.createElement("div", {
                        className: b.meta
                    }, r.createElement("div", null, w(c).format("YYYY-MM-DD HH:mm:ss")))), r.createElement("div", {
                        className: b.right
                    }, o ? r.createElement("span", {
                        className: "iconfont iconbaseline-star-px",
                        onClick: function () {
                            return e.presenter.starMark(n)
                        }
                    }) : r.createElement("span", {
                        className: "iconfont iconstar",
                        onClick: function () {
                            return e.presenter.starMark(n)
                        }
                    })))
                }
            })
        }
        var N = n(25);

        function O(e) {
            var t = e.children;
            return r.createElement("div", {
                className: N["source-bar"]
            }, t)
        }
        var x = n(10),
            R = n(26),
            j = function (e, t, n, r) {
                var a, i = arguments.length,
                    c = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, r);
                else
                    for (var o = e.length - 1; o >= 0; o--)(a = e[o]) && (c = (i < 3 ? a(c) : i > 3 ? a(t, n, c) : a(t, n)) || c);
                return i > 3 && c && Object.defineProperty(t, n, c), c
            },
            S = [{
                label: "全部",
                value: "all"
            }, {
                label: "最近一周",
                value: "week"
            }, {
                label: "最近一月",
                value: "month"
            }],
            I = function (e) {
                function t() {
                    var t;
                    return (t = e.apply(this, arguments) || this).state = {
                        data: [],
                        total: 0,
                        type: "all",
                        selectedItems: []
                    }, t.handleTypeChange = function (e, n) {
                        t.setState({
                            type: e
                        })
                    }, t.renderType = function () {
                        return r.createElement(O, null, r.createElement(h, {
                            value: t.state.type,
                            onChange: t.handleTypeChange,
                            options: S
                        }))
                    }, t
                }
                return l()(t, e), t.prototype.render = function () {
                    var e = this;
                    return r.createElement(g.a, {
                        render: function () {
                            return r.createElement("div", null, r.createElement("div", {
                                className: R.list_container
                            }, e.renderType(), r.createElement(D, {
                                list: e.props.presenter.getRenderData() || [],
                                presenter: e.props.presenter
                            })))
                        }
                    })
                }, t
            }(r.Component),
            C = I = j([x.a], I),
            M = (r.useState, [{
                title: "全部",
                value: "all"
            }, {
                title: "星标",
                value: "star"
            }, {
                title: "未读",
                value: "notRead"
            }]);
        var P = Object(x.a)((function (e) {
                return r.createElement("div", {
                    className: o.sidebar
                }, M.map((function (t) {
                    var n;
                    return r.createElement("div", {
                        key: t.value,
                        className: p()(o.sidebar_item, (n = {}, n[o.sidebar_item_active] = e.presenter.type === t.value, n)),
                        onClick: function () {
                            return e.presenter.setType(t.value)
                        }
                    }, r.createElement("span", null, t.title))
                })))
            })),
            T = n(2),
            A = n.n(T),
            L = n(4),
            U = n.n(L),
            G = "ENUM_LOADING_SENDING",
            J = "ENUM_LOADING_SUCCESS",
            q = "ENUM_LOADING_FAILED",
            B = n(27),
            H = n.n(B),
            z = (n(54), n(55), n(56), n(57), n(28)),
            F = {
                handleError: n.n(z).a
            },
            V = n(29);

        function Y(e) {
            return H.a.create({
                baseURL: e || "https://api.vwood.xyz/v1",
                timeout: 6e4,
                headers: {
                    "content-type": "application/json",
                    token: Object(V.getToken)()
                }
            })
        }
        var Z = function (e) {
            var t = Y();
            return t.interceptors.response.use((function (e) {
                return e.data
            }), (function (e) {
                return F.handleError(e), Promise.reject(e)
            })), t(e)
        };

        function Q(e) {
            return e ? e[0].toLowerCase() + e.slice(1) : ""
        }

        function W(e, t) {
            return K.apply(this, arguments)
        }

        function K() {
            return (K = U()(A.a.mark((function e(t, n) {
                return A.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return e.abrupt("return", Z({
                                method: "post",
                                url: "/" + Q(t),
                                data: n
                            }));
                        case 1:
                        case "end":
                            return e.stop()
                    }
                }), e)
            })))).apply(this, arguments)
        }

        function X(e, t) {
            return $.apply(this, arguments)
        }

        function $() {
            return ($ = U()(A.a.mark((function e(t, n) {
                return A.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            return e.abrupt("return", Z({
                                method: "PUT",
                                url: "/" + Q(t),
                                data: n
                            }));
                        case 1:
                        case "end":
                            return e.stop()
                    }
                }), e)
            })))).apply(this, arguments)
        }

        function ee(e) {
            return te.apply(this, arguments)
        }

        function te() {
            return (te = U()(A.a.mark((function e(t) {
                var n, r;
                return A.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (!chrome) {
                                e.next = 8;
                                break
                            }
                            return n = chrome.extension.getBackgroundPage(), e.next = 6, n.getData(t);
                        case 6:
                            return r = e.sent, e.abrupt("return", r);
                        case 8:
                            e.next = 11;
                            break;
                        case 10:
                            return e.abrupt("return", new Promise((function (e, n) {
                                var r = localStorage.getItem(t);
                                e(r ? JSON.parse(r) : r)
                            })));
                        case 11:
                        case "end":
                            return e.stop()
                    }
                }), e)
            })))).apply(this, arguments)
        }

        function ne() {
            return (ne = U()(A.a.mark((function e(t, n) {
                var r, a;
                return A.a.wrap((function (e) {
                    for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (!chrome) {
                                e.next = 8;
                                break
                            }
                            return r = chrome.extension.getBackgroundPage(), e.next = 6, r.setData(t, n);
                        case 6:
                            return a = e.sent, e.abrupt("return", a);
                        case 8:
                            e.next = 11;
                            break;
                        case 10:
                            return e.abrupt("return", new Promise((function (e, r) {
                                e(localStorage.setItem(t, JSON.stringify(n)))
                            })));
                        case 11:
                        case "end":
                            return e.stop()
                    }
                }), e)
            })))).apply(this, arguments)
        }
        var re = n(30),
            ae = n.n(re),
            ie = n(1),
            ce = function (e, t, n, r) {
                var a, i = arguments.length,
                    c = i < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, n) : r;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, n, r);
                else
                    for (var o = e.length - 1; o >= 0; o--)(a = e[o]) && (c = (i < 3 ? a(c) : i > 3 ? a(t, n, c) : a(t, n)) || c);
                return i > 3 && c && Object.defineProperty(t, n, c), c
            },
            oe = function () {
                function e(e) {
                    var t = this;
                    this.entityName = "", this.id = "", this.selectedItems = [], this.data = [], this.mode = "", this.loading = J, this.type = "all", this.saveData = function () {
                        switch (t.mode) {
                            case "Create":
                                t.createData();
                                break;
                            case "Edit":
                                t.updateData()
                        }
                    }, this.createData = U()(A.a.mark((function e() {
                        return A.a.wrap((function (e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0, t.loading = G, e.next = 4, W(t.entityName, t.data);
                                case 4:
                                    t.loading = J, e.next = 10;
                                    break;
                                case 7:
                                    e.prev = 7, e.t0 = e.catch(0), t.loading = q;
                                case 10:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [0, 7]
                        ])
                    }))), this.updateData = U()(A.a.mark((function e() {
                        return A.a.wrap((function (e) {
                            for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0, t.loading = G, e.next = 4, X(t.entityName, t.data);
                                case 4:
                                    t.loading = J, e.next = 10;
                                    break;
                                case 7:
                                    e.prev = 7, e.t0 = e.catch(0), t.loading = q;
                                case 10:
                                case "end":
                                    return e.stop()
                            }
                        }), e, null, [
                            [0, 7]
                        ])
                    }))), this.selectMark = function (e) {
                        var n = t.selectedItems.findIndex((function (t) {
                            return t === e
                        })); - 1 !== n ? t.selectedItems.splice(n, 1) : t.selectedItems.push(e), t.selectedItems = [].concat(t.selectedItems)
                    }, this.starMark = function (e) {
                        for (var n = 0; n < t.data.length; n++)
                            if (t.data[n].id === e) {
                                t.data[n].isStar = !t.data[n].isStar, t.data = [].concat(t.data);
                                break
                            }!
                        function (e, t) {
                            ne.apply(this, arguments)
                        }("data", t.data)
                    }, this.isSelected = function (e) {
                        return t.selectedItems.includes(e)
                    }, this.getFilters = function () {
                        var e = {};
                        return "all" === t.type ? null : ("star" === t.type && (e.isStar = !0), "notRead" === t.type && (e.isRead = !1), e)
                    }, this.getRenderData = function () {
                        var e = t.getFilters();
                        if (!e) return t.data;
                        var n = Object.keys(e);
                        return (t.data || []).filter((function (t) {
                            return n.every((function (n) {
                                return t[n] === e[n]
                            }))
                        }))
                    }, this.setType = function (e) {
                        Object(ie.n)((function () {
                            t.type = e, t.selectedItems = []
                        }))
                    }, this.entityName = e, this.init()
                }
                var t, n = e.prototype;
                return n.setData = function (e) {
                    this.data = ae.a.cloneDeep(e)
                }, n.init = function () {
                    this.queryData()
                }, n.queryData = (t = U()(A.a.mark((function e() {
                    var t;
                    return A.a.wrap((function (e) {
                        for (;;) switch (e.prev = e.next) {
                            case 0:
                                return e.next = 2, ee("data");
                            case 2:
                                t = e.sent, this.data = t || [];
                            case 4:
                            case "end":
                                return e.stop()
                        }
                    }), e, this)
                }))), function () {
                    return t.apply(this, arguments)
                }), e
            }();
        ce([ie.m], oe.prototype, "selectedItems", void 0), ce([ie.m], oe.prototype, "data", void 0), ce([ie.m], oe.prototype, "loading", void 0), ce([ie.m], oe.prototype, "type", void 0), ce([ie.f], oe.prototype, "setData", null), ce([ie.f], oe.prototype, "queryData", null), ce([ie.f], oe.prototype, "selectMark", void 0), ce([ie.f], oe.prototype, "starMark", void 0), ce([ie.f], oe.prototype, "setType", void 0);
        var se = new oe("Mark");

        function le() {
            return r.createElement(g.a, {
                render: function () {
                    return r.createElement("div", {
                        className: o.layout
                    }, r.createElement("div", {
                        className: o.layout_sidebar
                    }, r.createElement(P, {
                        presenter: se
                    })), r.createElement("div", {
                        className: o.layout_content
                    }, r.createElement(C, {
                        presenter: se
                    })))
                }
            })
        }
        c.a.render(a.a.createElement("div", null, a.a.createElement(le, null)), document.getElementById("app"))
    },
    7: function (e, t, n) {
        e.exports = {
            "mark-list": "style__mark-list--1WzEz",
            "mark-item": "style__mark-item--DqrmV",
            title: "style__title--29a9D",
            url: "style__url--126ZS",
            meta: "style__meta--Pk7LG",
            content: "style__content--oDizr",
            left: "style__left--2BQ2G",
            right: "style__right--2NSF-"
        }
    },
    8: function (e, t, n) {
        e.exports = {
            layout: "style__layout--2QMNB",
            layout_sidebar: "style__layout_sidebar--2SM-n",
            layout_content: "style__layout_content--1Ipyv",
            sidebar: "style__sidebar--CIZdQ",
            sidebar_item: "style__sidebar_item--10u8e",
            sidebar_item_active: "style__sidebar_item_active--2veej"
        }
    },
    9: function (e, t, n) {
        e.exports = {
            "easy-selector": "style__easy-selector--3LpZd",
            content: "style__content--2tkwV",
            title: "style__title--14Hx5",
            list: "style__list--3bn4s",
            item: "style__item--f2s_g",
            active: "style__active--31IoZ"
        }
    }
});