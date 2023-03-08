/*!
FullCalendar Core Package v4.2.0
Docs & License: https://fullcalendar.io/
(c) 2019 Adam Shaw
*/
! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : (e = e || self, t(e.FullCalendar = {}))
}(this, function(e) {
    "use strict";

    function t(e, t, n) {
        var r = document.createElement(e);
        if (t)
            for (var i in t) "style" === i ? g(r, t[i]) : pi[i] ? r[i] = t[i] : r.setAttribute(i, t[i]);
        return "string" == typeof n ? r.innerHTML = n : null != n && a(r, n), r
    }

    function n(e) {
        e = e.trim();
        var t = document.createElement(o(e));
        return t.innerHTML = e, t.firstChild
    }

    function r(e) {
        return Array.prototype.slice.call(i(e))
    }

    function i(e) {
        e = e.trim();
        var t = document.createElement(o(e));
        return t.innerHTML = e, t.childNodes
    }

    function o(e) {
        return hi[e.substr(0, 3)] || "div"
    }

    function a(e, t) {
        for (var n = l(t), r = 0; r < n.length; r++) e.appendChild(n[r])
    }

    function s(e, t) {
        for (var n = l(t), r = e.firstChild || null, i = 0; i < n.length; i++) e.insertBefore(n[i], r)
    }

    function u(e, t) {
        for (var n = l(t), r = e.nextSibling || null, i = 0; i < n.length; i++) e.parentNode.insertBefore(n[i], r)
    }

    function l(e) {
        return "string" == typeof e ? r(e) : e instanceof Node ? [e] : Array.prototype.slice.call(e)
    }

    function c(e) {
        e.parentNode && e.parentNode.removeChild(e)
    }

    function d(e, t) {
        return gi.call(e, t)
    }

    function f(e, t) {
        return vi.call(e, t)
    }

    function p(e, t) {
        for (var n = e instanceof HTMLElement ? [e] : e, r = [], i = 0; i < n.length; i++)
            for (var o = n[i].querySelectorAll(t), a = 0; a < o.length; a++) r.push(o[a]);
        return r
    }

    function h(e, t) {
        for (var n = e instanceof HTMLElement ? [e] : e, r = [], i = 0; i < n.length; i++)
            for (var o = n[i].children, a = 0; a < o.length; a++) {
                var s = o[a];
                t && !f(s, t) || r.push(s)
            }
        return r
    }

    function v(e, t, n) {
        n ? e.classList.add(t) : e.classList.remove(t)
    }

    function g(e, t) {
        for (var n in t) y(e, n, t[n])
    }

    function y(e, t, n) {
        null == n ? e.style[t] = "" : "number" == typeof n && yi.test(t) ? e.style[t] = n + "px" : e.style[t] = n
    }

    function m(e, t) {
        return e.left >= t.left && e.left < t.right && e.top >= t.top && e.top < t.bottom
    }

    function E(e, t) {
        var n = {
            left: Math.max(e.left, t.left),
            right: Math.min(e.right, t.right),
            top: Math.max(e.top, t.top),
            bottom: Math.min(e.bottom, t.bottom)
        };
        return n.left < n.right && n.top < n.bottom && n
    }

    function S(e, t, n) {
        return {
            left: e.left + t,
            right: e.right + t,
            top: e.top + n,
            bottom: e.bottom + n
        }
    }

    function b(e, t) {
        return {
            left: Math.min(Math.max(e.left, t.left), t.right),
            top: Math.min(Math.max(e.top, t.top), t.bottom)
        }
    }

    function T(e) {
        return {
            left: (e.left + e.right) / 2,
            top: (e.top + e.bottom) / 2
        }
    }

    function D(e, t) {
        return {
            left: e.left - t.left,
            top: e.top - t.top
        }
    }

    function w() {
        return null === mi && (mi = R()), mi
    }
  
    function R() {
        var e = t("div", {
            style: {
                position: "absolute",
                top: -1e3,
                left: 0,
                border: 0,
                padding: 0,
                overflow: "scroll",
                direction: "rtl"
            }
        }, "<div></div>");
        document.body.appendChild(e);
        var n = e.firstChild,
            r = n.getBoundingClientRect().left > e.getBoundingClientRect().left;
        return c(e), r
    }

    function I(e) {
        return e = Math.max(0, e), e = Math.round(e)
    }

    function C(e, t) {
        void 0 === t && (t = !1);
        var n = window.getComputedStyle(e),
            r = parseInt(n.borderLeftWidth, 10) || 0,
            i = parseInt(n.borderRightWidth, 10) || 0,
            o = parseInt(n.borderTopWidth, 10) || 0,
            a = parseInt(n.borderBottomWidth, 10) || 0,
            s = I(e.offsetWidth - e.clientWidth - r - i),
            u = I(e.offsetHeight - e.clientHeight - o - a),
            l = {
                borderLeft: r,
                borderRight: i,
                borderTop: o,
                borderBottom: a,
                scrollbarBottom: u,
                scrollbarLeft: 0,
                scrollbarRight: 0
            };
        return w() && "rtl" === n.direction ? l.scrollbarLeft = s : l.scrollbarRight = s, t && (l.paddingLeft = parseInt(n.paddingLeft, 10) || 0, l.paddingRight = parseInt(n.paddingRight, 10) || 0, l.paddingTop = parseInt(n.paddingTop, 10) || 0, l.paddingBottom = parseInt(n.paddingBottom, 10) || 0), l
    }

    function M(e, t) {
        void 0 === t && (t = !1);
        var n = k(e),
            r = C(e, t),
            i = {
                left: n.left + r.borderLeft + r.scrollbarLeft,
                right: n.right - r.borderRight - r.scrollbarRight,
                top: n.top + r.borderTop,
                bottom: n.bottom - r.borderBottom - r.scrollbarBottom
            };
        return t && (i.left += r.paddingLeft, i.right -= r.paddingRight, i.top += r.paddingTop, i.bottom -= r.paddingBottom), i
    }

    function k(e) {
        var t = e.getBoundingClientRect();
        return {
            left: t.left + window.pageXOffset,
            top: t.top + window.pageYOffset,
            right: t.right + window.pageXOffset,
            bottom: t.bottom + window.pageYOffset
        }
    }

    function O() {
        return {
            left: window.pageXOffset,
            right: window.pageXOffset + document.documentElement.clientWidth,
            top: window.pageYOffset,
            bottom: window.pageYOffset + document.documentElement.clientHeight
        }
    }

    function _(e) {
        var t = window.getComputedStyle(e);
        return e.getBoundingClientRect().height + parseInt(t.marginTop, 10) + parseInt(t.marginBottom, 10)
    }

    function P(e) {
        for (var t = []; e instanceof HTMLElement;) {
            var n = window.getComputedStyle(e);
            if ("fixed" === n.position) break;
            /(auto|scroll)/.test(n.overflow + n.overflowY + n.overflowX) && t.push(e), e = e.parentNode
        }
        return t
    }

    function x(e) {
        return P(e).map(function(e) {
            return M(e)
        }).concat(O()).reduce(function(e, t) {
            return E(e, t) || t
        })
    }

    function H(e) {
        e.preventDefault()
    }

    function N(e, t, n, r) {
        function i(e) {
            var t = d(e.target, n);
            t && r.call(t, e, t)
        }
        return e.addEventListener(t, i),
            function() {
                e.removeEventListener(t, i)
            }
    }

    function z(e, t, n, r) {
        var i;
        return N(e, "mouseover", t, function(e, t) {
            if (t !== i) {
                i = t, n(e, t);
                var o = function(e) {
                    i = null, r(e, t), t.removeEventListener("mouseleave", o)
                };
                t.addEventListener("mouseleave", o)
            }
        })
    }

    function U(e, t) {
        var n = function(r) {
            t(r), Ei.forEach(function(t) {
                e.removeEventListener(t, n)
            })
        };
        Ei.forEach(function(t) {
            e.addEventListener(t, n)
        })
    }

    function L(e, t) {
        var n = ie(e);
        return n[2] += 7 * t, oe(n)
    }

    function V(e, t) {
        var n = ie(e);
        return n[2] += t, oe(n)
    }

    function B(e, t) {
        var n = ie(e);
        return n[6] += t, oe(n)
    }

    function A(e, t) {
        return F(e, t) / 7
    }

    function F(e, t) {
        return (t.valueOf() - e.valueOf()) / 864e5
    }

    function W(e, t) {
        return (t.valueOf() - e.valueOf()) / 36e5
    }

    function Z(e, t) {
        return (t.valueOf() - e.valueOf()) / 6e4
    }

    function j(e, t) {
        return (t.valueOf() - e.valueOf()) / 1e3
    }

    function Y(e, t) {
        var n = X(e),
            r = X(t);
        return {
            years: 0,
            months: 0,
            days: Math.round(F(n, r)),
            milliseconds: t.valueOf() - r.valueOf() - (e.valueOf() - n.valueOf())
        }
    }

    function q(e, t) {
        var n = G(e, t);
        return null !== n && n % 7 == 0 ? n / 7 : null
    }

    function G(e, t) {
        return se(e) === se(t) ? Math.round(F(e, t)) : null
    }

    function X(e) {
        return oe([e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()])
    }

    function J(e) {
        return oe([e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours()])
    }

    function K(e) {
        return oe([e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes()])
    }

    function Q(e) {
        return oe([e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds()])
    }

    function $(e, t, n) {
        var r = e.getUTCFullYear(),
            i = ee(e, r, t, n);
        if (i < 1) return ee(e, r - 1, t, n);
        var o = ee(e, r + 1, t, n);
        return o >= 1 ? Math.min(i, o) : i
    }

    function ee(e, t, n, r) {
        var i = oe([t, 0, 1 + te(t, n, r)]),
            o = X(e),
            a = Math.round(F(i, o));
        return Math.floor(a / 7) + 1
    }

    function te(e, t, n) {
        var r = 7 + t - n;
        return -(7 + oe([e, 0, r]).getUTCDay() - t) % 7 + r - 1
    }

    function ne(e) {
        return [e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds()]
    }

    function re(e) {
        return new Date(e[0], e[1] || 0, null == e[2] ? 1 : e[2], e[3] || 0, e[4] || 0, e[5] || 0)
    }

    function ie(e) {
        return [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), e.getUTCHours(), e.getUTCMinutes(), e.getUTCSeconds(), e.getUTCMilliseconds()]
    }

    function oe(e) {
        return 1 === e.length && (e = e.concat([0])), new Date(Date.UTC.apply(Date, e))
    }

    function ae(e) {
        return !isNaN(e.valueOf())
    }

    function se(e) {
        return 1e3 * e.getUTCHours() * 60 * 60 + 1e3 * e.getUTCMinutes() * 60 + 1e3 * e.getUTCSeconds() + e.getUTCMilliseconds()
    }

    function ue(e, t) {
        var n;
        return "string" == typeof e ? le(e) : "object" == typeof e && e ? ce(e) : "number" == typeof e ? ce((n = {}, n[t || "milliseconds"] = e, n)) : null
    }

    function le(e) {
        var t = Ti.exec(e);
        if (t) {
            var n = t[1] ? -1 : 1;
            return {
                years: 0,
                months: 0,
                days: n * (t[2] ? parseInt(t[2], 10) : 0),
                milliseconds: n * (60 * (t[3] ? parseInt(t[3], 10) : 0) * 60 * 1e3 + 60 * (t[4] ? parseInt(t[4], 10) : 0) * 1e3 + 1e3 * (t[5] ? parseInt(t[5], 10) : 0) + (t[6] ? parseInt(t[6], 10) : 0))
            }
        }
        return null
    }

    function ce(e) {
        return {
            years: e.years || e.year || 0,
            months: e.months || e.month || 0,
            days: (e.days || e.day || 0) + 7 * de(e),
            milliseconds: 60 * (e.hours || e.hour || 0) * 60 * 1e3 + 60 * (e.minutes || e.minute || 0) * 1e3 + 1e3 * (e.seconds || e.second || 0) + (e.milliseconds || e.millisecond || e.ms || 0)
        }
    }

    function de(e) {
        return e.weeks || e.week || 0
    }

    function fe(e, t) {
        return e.years === t.years && e.months === t.months && e.days === t.days && e.milliseconds === t.milliseconds
    }

    function pe(e) {
        return 0 === e.years && 0 === e.months && 1 === e.days && 0 === e.milliseconds
    }

    function he(e, t) {
        return {
            years: e.years + t.years,
            months: e.months + t.months,
            days: e.days + t.days,
            milliseconds: e.milliseconds + t.milliseconds
        }
    }

    function ve(e, t) {
        return {
            years: e.years - t.years,
            months: e.months - t.months,
            days: e.days - t.days,
            milliseconds: e.milliseconds - t.milliseconds
        }
    }

    function ge(e, t) {
        return {
            years: e.years * t,
            months: e.months * t,
            days: e.days * t,
            milliseconds: e.milliseconds * t
        }
    }

    function ye(e) {
        return Ee(e) / 365
    }

    function me(e) {
        return Ee(e) / 30
    }

    function Ee(e) {
        return Te(e) / 864e5
    }

    function Se(e) {
        return Te(e) / 6e4
    }

    function be(e) {
        return Te(e) / 1e3
    }

    function Te(e) {
        return 31536e6 * e.years + 2592e6 * e.months + 864e5 * e.days + e.milliseconds
    }

    function De(e, t) {
        for (var n = null, r = 0; r < bi.length; r++) {
            var i = bi[r];
            if (t[i]) {
                var o = e[i] / t[i];
                if (!Ze(o) || null !== n && n !== o) return null;
                n = o
            } else if (e[i]) return null
        }
        return n
    }

    function we(e, t) {
        var n = e.milliseconds;
        if (n) {
            if (n % 1e3 != 0) return {
                unit: "millisecond",
                value: n
            };
            if (n % 6e4 != 0) return {
                unit: "second",
                value: n / 1e3
            };
            if (n % 36e5 != 0) return {
                unit: "minute",
                value: n / 6e4
            };
            if (n) return {
                unit: "hour",
                value: n / 36e5
            }
        }
        return e.days ? t || e.days % 7 != 0 ? {
            unit: "day",
            value: e.days
        } : {
            unit: "week",
            value: e.days / 7
        } : e.months ? {
            unit: "month",
            value: e.months
        } : e.years ? {
            unit: "year",
            value: e.years
        } : {
            unit: "millisecond",
            value: 0
        }
    }

    function Re(e, t) {
        t.left && g(e, {
            borderLeftWidth: 1,
            marginLeft: t.left - 1
        }), t.right && g(e, {
            borderRightWidth: 1,
            marginRight: t.right - 1
        })
    }

    function Ie(e) {
        g(e, {
            marginLeft: "",
            marginRight: "",
            borderLeftWidth: "",
            borderRightWidth: ""
        })
    }

    function Ce() {
        document.body.classList.add("fc-not-allowed")
    }

    function Me() {
        document.body.classList.remove("fc-not-allowed")
    }

    function ke(e, t, n) {
        var r = Math.floor(t / e.length),
            i = Math.floor(t - r * (e.length - 1)),
            o = [],
            a = [],
            s = [],
            u = 0;
        Oe(e), e.forEach(function(t, n) {
            var l = n === e.length - 1 ? i : r,
                c = _(t);
            c < l ? (o.push(t), a.push(c), s.push(t.offsetHeight)) : u += c
        }), n && (t -= u, r = Math.floor(t / o.length), i = Math.floor(t - r * (o.length - 1))), o.forEach(function(e, t) {
            var n = t === o.length - 1 ? i : r,
                u = a[t],
                l = s[t],
                c = n - (u - l);
            u < n && (e.style.height = c + "px")
        })
    }

    function Oe(e) {
        e.forEach(function(e) {
            e.style.height = ""
        })
    }

    function _e(e) {
        var t = 0;
        return e.forEach(function(e) {
            var n = e.firstChild;
            if (n instanceof HTMLElement) {
                var r = n.offsetWidth;
                r > t && (t = r)
            }
        }), t++, e.forEach(function(e) {
            e.style.width = t + "px"
        }), t
    }

    function Pe(e, t) {
        var n = {
            position: "relative",
            left: -1
        };
        g(e, n), g(t, n);
        var r = e.offsetHeight - t.offsetHeight,
            i = {
                position: "",
                left: ""
            };
        return g(e, i), g(t, i), r
    }

    function xe(e) {
        e.classList.add("fc-unselectable"), e.addEventListener("selectstart", H)
    }

    function He(e) {
        e.classList.remove("fc-unselectable"), e.removeEventListener("selectstart", H)
    }

    function Ne(e) {
        e.addEventListener("contextmenu", H)
    }

    function ze(e) {
        e.removeEventListener("contextmenu", H)
    }

    function Ue(e) {
        var t, n, r = [],
            i = [];
        for ("string" == typeof e ? i = e.split(/\s*,\s*/) : "function" == typeof e ? i = [e] : Array.isArray(e) && (i = e), t = 0; t < i.length; t++) n = i[t], "string" == typeof n ? r.push("-" === n.charAt(0) ? {
            field: n.substring(1),
            order: -1
        } : {
            field: n,
            order: 1
        }) : "function" == typeof n && r.push({
            func: n
        });
        return r
    }

    function Le(e, t, n) {
        var r, i;
        for (r = 0; r < n.length; r++)
            if (i = Ve(e, t, n[r])) return i;
        return 0
    }

    function Ve(e, t, n) {
        return n.func ? n.func(e, t) : Be(e[n.field], t[n.field]) * (n.order || 1)
    }

    function Be(e, t) {
        return e || t ? null == t ? -1 : null == e ? 1 : "string" == typeof e || "string" == typeof t ? String(e).localeCompare(String(t)) : e - t : 0
    }

    function Ae(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
    }

    function Fe(e, t) {
        var n = String(e);
        return "000".substr(0, t - n.length) + n
    }

    function We(e, t) {
        return e - t
    }

    function Ze(e) {
        return e % 1 == 0
    }

    function je(e, t, n) {
        if ("function" == typeof e && (e = [e]), e) {
            var r = void 0,
                i = void 0;
            for (r = 0; r < e.length; r++) i = e[r].apply(t, n) || i;
            return i
        }
    }

    function Ye() {
        for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
        for (var n = 0; n < e.length; n++)
            if (void 0 !== e[n]) return e[n]
    }

    function qe(e, t) {
        var n, r, i, o, a, s = function() {
            var u = (new Date).valueOf() - o;
            u < t ? n = setTimeout(s, t - u) : (n = null, a = e.apply(i, r), i = r = null)
        };
        return function() {
            return i = this, r = arguments, o = (new Date).valueOf(), n || (n = setTimeout(s, t)), a
        }
    }

    function Ge(e, t, n, r) {
        void 0 === n && (n = {});
        var i = {};
        for (var o in t) {
            var a = t[o];
            void 0 !== e[o] ? a === Function ? i[o] = "function" == typeof e[o] ? e[o] : null : i[o] = a ? a(e[o]) : e[o] : void 0 !== n[o] ? i[o] = n[o] : a === String ? i[o] = "" : a && a !== Number && a !== Boolean && a !== Function ? i[o] = a(null) : i[o] = null
        }
        if (r)
            for (var o in e) void 0 === t[o] && (r[o] = e[o]);
        return i
    }

    function Xe(e) {
        var t = Math.floor(F(e.start, e.end)) || 1,
            n = X(e.start);
        return {
            start: n,
            end: V(n, t)
        }
    }

    function Je(e, t) {
        void 0 === t && (t = ue(0));
        var n = null,
            r = null;
        if (e.end) {
            r = X(e.end);
            var i = e.end.valueOf() - r.valueOf();
            i && i >= Te(t) && (r = V(r, 1))
        }
        return e.start && (n = X(e.start), r && r <= n && (r = V(n, 1))), {
            start: n,
            end: r
        }
    }

    function Ke(e) {
        var t = Je(e);
        return F(t.start, t.end) > 1
    }

    function Qe(e, t, n, r) {
        return "year" === r ? ue(n.diffWholeYears(e, t), "year") : "month" === r ? ue(n.diffWholeMonths(e, t), "month") : Y(e, t)
    }

    function $e(e, t) {
        function n() {
            this.constructor = e
        }
        Di(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    }

    function et(e, t, n, r, i) {
        for (var o = 0; o < r.length; o++) {
            var a = {},
                s = r[o].parse(e, a, n);
            if (s) {
                var u = a.allDay;
                return delete a.allDay, null == u && null == (u = t) && null == (u = s.allDayGuess) && (u = !1), wi(i, a), {
                    allDay: u,
                    duration: s.duration,
                    typeData: s.typeData,
                    typeId: o
                }
            }
        }
        return null
    }

    function tt(e, t, n, r, i) {
        var o = i[e.recurringDef.typeId],
            a = o.expand(e.recurringDef.typeData, {
                start: r.subtract(n.start, t),
                end: n.end
            }, r);
        return e.allDay && (a = a.map(X)), a
    }

    function nt(e, t) {
        var n, r, i, o, a, s, u = {};
        if (t)
            for (n = 0; n < t.length; n++) {
                for (r = t[n], i = [], o = e.length - 1; o >= 0; o--)
                    if ("object" == typeof(a = e[o][r]) && a) i.unshift(a);
                    else if (void 0 !== a) {
                    u[r] = a;
                    break
                }
                i.length && (u[r] = nt(i))
            }
        for (n = e.length - 1; n >= 0; n--) {
            s = e[n];
            for (r in s) r in u || (u[r] = s[r])
        }
        return u
    }

    function rt(e, t) {
        var n = {};
        for (var r in e) t(e[r], r) && (n[r] = e[r]);
        return n
    }

    function it(e, t) {
        var n = {};
        for (var r in e) n[r] = t(e[r], r);
        return n
    }

    function ot(e) {
        for (var t = {}, n = 0, r = e; n < r.length; n++) {
            t[r[n]] = !0
        }
        return t
    }

    function at(e) {
        var t = [];
        for (var n in e) t.push(e[n]);
        return t
    }

    function st(e, t) {
        for (var n in e)
            if (Ri.call(e, n) && !(n in t)) return !1;
        for (var n in t)
            if (Ri.call(t, n) && e[n] !== t[n]) return !1;
        return !0
    }

    function ut(e, t, n, r) {
        for (var i = vt(), o = 0, a = e; o < a.length; o++) {
            var s = a[o],
                u = On(s, t, n, r);
            u && lt(u, i)
        }
        return i
    }

    function lt(e, t) {
        return void 0 === t && (t = vt()), t.defs[e.def.defId] = e.def, e.instance && (t.instances[e.instance.instanceId] = e.instance), t
    }

    function ct(e, t, n) {
        var r = n.dateEnv,
            i = e.defs,
            o = e.instances;
        o = rt(o, function(e) {
            return !i[e.defId].recurringDef
        });
        for (var a in i) {
            var s = i[a];
            if (s.recurringDef) {
                var u = s.recurringDef.duration;
                u || (u = s.allDay ? n.defaultAllDayEventDuration : n.defaultTimedEventDuration);
                for (var l = tt(s, u, t, n.dateEnv, n.pluginSystem.hooks.recurringTypes), c = 0, d = l; c < d.length; c++) {
                    var f = d[c],
                        p = Pn(a, {
                            start: f,
                            end: r.add(f, u)
                        });
                    o[p.instanceId] = p
                }
            }
        }
        return {
            defs: i,
            instances: o
        }
    }

    function dt(e, t) {
        var n = e.instances[t];
        if (n) {
            var r = e.defs[n.defId],
                i = yt(e, function(e) {
                    return ft(r, e)
                });
            return i.defs[r.defId] = r, i.instances[n.instanceId] = n, i
        }
        return vt()
    }

    function ft(e, t) {
        return Boolean(e.groupId && e.groupId === t.groupId)
    }

    function pt(e, t, n) {
        var r = n.opt("eventDataTransform"),
            i = t ? t.eventDataTransform : null;
        return i && (e = ht(e, i)), r && (e = ht(e, r)), e
    }

    function ht(e, t) {
        var n;
        if (t) {
            n = [];
            for (var r = 0, i = e; r < i.length; r++) {
                var o = i[r],
                    a = t(o);
                a ? n.push(a) : null == a && n.push(o)
            }
        } else n = e;
        return n
    }

    function vt() {
        return {
            defs: {},
            instances: {}
        }
    }

    function gt(e, t) {
        return {
            defs: wi({}, e.defs, t.defs),
            instances: wi({}, e.instances, t.instances)
        }
    }

    function yt(e, t) {
        var n = rt(e.defs, t),
            r = rt(e.instances, function(e) {
                return n[e.defId]
            });
        return {
            defs: n,
            instances: r
        }
    }

    function mt(e, t) {
        var n = null,
            r = null;
        return e.start && (n = t.createMarker(e.start)), e.end && (r = t.createMarker(e.end)), n || r ? n && r && r < n ? null : {
            start: n,
            end: r
        } : null
    }

    function Et(e, t) {
        var n, r, i = [],
            o = t.start;
        for (e.sort(St), n = 0; n < e.length; n++) r = e[n], r.start > o && i.push({
            start: o,
            end: r.start
        }), r.end > o && (o = r.end);
        return o < t.end && i.push({
            start: o,
            end: t.end
        }), i
    }

    function St(e, t) {
        return e.start.valueOf() - t.start.valueOf()
    }

    function bt(e, t) {
        var n = e.start,
            r = e.end,
            i = null;
        return null !== t.start && (n = null === n ? t.start : new Date(Math.max(n.valueOf(), t.start.valueOf()))), null != t.end && (r = null === r ? t.end : new Date(Math.min(r.valueOf(), t.end.valueOf()))), (null === n || null === r || n < r) && (i = {
            start: n,
            end: r
        }), i
    }

    function Tt(e, t) {
        return (null === e.start ? null : e.start.valueOf()) === (null === t.start ? null : t.start.valueOf()) && (null === e.end ? null : e.end.valueOf()) === (null === t.end ? null : t.end.valueOf())
    }

    function Dt(e, t) {
        return (null === e.end || null === t.start || e.end > t.start) && (null === e.start || null === t.end || e.start < t.end)
    }

    function wt(e, t) {
        return (null === e.start || null !== t.start && t.start >= e.start) && (null === e.end || null !== t.end && t.end <= e.end)
    }

    function Rt(e, t) {
        return (null === e.start || t >= e.start) && (null === e.end || t < e.end)
    }

    function It(e, t) {
        return null != t.start && e < t.start ? t.start : null != t.end && e >= t.end ? new Date(t.end.valueOf() - 1) : e
    }

    function Ct(e, t) {
        for (var n = 0, r = 0; r < e.length;) e[r] === t ? (e.splice(r, 1), n++) : r++;
        return n
    }

    function Mt(e, t) {
        var n, r = e.length;
        if (r !== t.length) return !1;
        for (n = 0; n < r; n++)
            if (e[n] !== t[n]) return !1;
        return !0
    }

    function kt(e) {
        var t, n;
        return function() {
            return t && Mt(t, arguments) || (t = arguments, n = e.apply(this, arguments)), n
        }
    }

    function Ot(e, t) {
        var n = null;
        return function() {
            var r = e.apply(this, arguments);
            return (null === n || n !== r && !t(n, r)) && (n = r), n
        }
    }

    function _t(e, t, n) {
        var r = Object.keys(e).length;
        return 1 === r && "short" === e.timeZoneName ? function(e) {
            return Wt(e.timeZoneOffset)
        } : 0 === r && t.week ? function(e) {
            return zt(n.computeWeekNumber(e.marker), n.weekLabel, n.locale, t.week)
        } : Pt(e, t, n)
    }

    function Pt(e, t, n) {
        e = wi({}, e), t = wi({}, t), xt(e, t), e.timeZone = "UTC";
        var r, i = new Intl.DateTimeFormat(n.locale.codes, e);
        if (t.omitZeroMinute) {
            var o = wi({}, e);
            delete o.minute, r = new Intl.DateTimeFormat(n.locale.codes, o)
        }
        return function(o) {
            var a, s = o.marker;
            return a = r && !s.getUTCMinutes() ? r : i, Ht(a.format(s), o, e, t, n)
        }
    }

    function xt(e, t) {
        e.timeZoneName && (e.hour || (e.hour = "2-digit"), e.minute || (e.minute = "2-digit")), "long" === e.timeZoneName && (e.timeZoneName = "short"), t.omitZeroMinute && (e.second || e.millisecond) && delete t.omitZeroMinute
    }

    function Ht(e, t, n, r, i) {
        return e = e.replace(_i, ""), "short" === n.timeZoneName && (e = Nt(e, "UTC" === i.timeZone || null == t.timeZoneOffset ? "UTC" : Wt(t.timeZoneOffset))), r.omitCommas && (e = e.replace(ki, "").trim()), r.omitZeroMinute && (e = e.replace(":00", "")), !1 === r.meridiem ? e = e.replace(Mi, "").trim() : "narrow" === r.meridiem ? e = e.replace(Mi, function(e, t) {
            return t.toLocaleLowerCase()
        }) : "short" === r.meridiem ? e = e.replace(Mi, function(e, t) {
            return t.toLocaleLowerCase() + "m"
        }) : "lowercase" === r.meridiem && (e = e.replace(Mi, function(e) {
            return e.toLocaleLowerCase()
        })), e = e.replace(Oi, " "), e = e.trim()
    }

    function Nt(e, t) {
        var n = !1;
        return e = e.replace(Pi, function() {
            return n = !0, t
        }), n || (e += " " + t), e
    }

    function zt(e, t, n, r) {
        var i = [];
        return "narrow" === r ? i.push(t) : "short" === r && i.push(t, " "), i.push(n.simpleNumberFormat.format(e)), n.options.isRtl && i.reverse(), i.join("")
    }

    function Ut(e, t, n) {
        return n.getMarkerYear(e) !== n.getMarkerYear(t) ? 5 : n.getMarkerMonth(e) !== n.getMarkerMonth(t) ? 4 : n.getMarkerDay(e) !== n.getMarkerDay(t) ? 2 : se(e) !== se(t) ? 1 : 0
    }

    function Lt(e, t) {
        var n = {};
        for (var r in e) r in Ci && !(Ci[r] <= t) || (n[r] = e[r]);
        return n
    }

    function Vt(e, t, n, r) {
        for (var i = 0; i < e.length;) {
            var o = e.indexOf(t, i);
            if (-1 === o) break;
            var a = e.substr(0, o);
            i = o + t.length;
            for (var s = e.substr(i), u = 0; u < n.length;) {
                var l = n.indexOf(r, u);
                if (-1 === l) break;
                var c = n.substr(0, l);
                u = l + r.length;
                var d = n.substr(u);
                if (a === c && s === d) return {
                    before: a,
                    after: s
                }
            }
        }
        return null
    }

    function Bt(e, t) {
        return "object" == typeof e && e ? ("string" == typeof t && (e = wi({
            separator: t
        }, e)), new xi(e)) : "string" == typeof e ? new Hi(e, t) : "function" == typeof e ? new Ni(e) : void 0
    }

    function At(e, t, n) {
        void 0 === n && (n = !1);
        var r = e.toISOString();
        return r = r.replace(".000", ""), n && (r = r.replace("T00:00:00Z", "")), r.length > 10 && (null == t ? r = r.replace("Z", "") : 0 !== t && (r = r.replace("Z", Wt(t, !0)))), r
    }

    function Ft(e) {
        return Fe(e.getUTCHours(), 2) + ":" + Fe(e.getUTCMinutes(), 2) + ":" + Fe(e.getUTCSeconds(), 2)
    }

    function Wt(e, t) {
        void 0 === t && (t = !1);
        var n = e < 0 ? "-" : "+",
            r = Math.abs(e),
            i = Math.floor(r / 60),
            o = Math.round(r % 60);
        return t ? n + Fe(i, 2) + ":" + Fe(o, 2) : "GMT" + n + i + (o ? ":" + Fe(o, 2) : "")
    }

    function Zt(e, t, n, r) {
        var i = jt(e, n.calendarSystem);
        return {
            date: i,
            start: i,
            end: t ? jt(t, n.calendarSystem) : null,
            timeZone: n.timeZone,
            localeCodes: n.locale.codes,
            separator: r
        }
    }

    function jt(e, t) {
        var n = t.markerToArray(e.marker);
        return {
            marker: e.marker,
            timeZoneOffset: e.timeZoneOffset,
            array: n,
            year: n[0],
            month: n[1],
            day: n[2],
            hour: n[3],
            minute: n[4],
            second: n[5],
            millisecond: n[6]
        }
    }

    function Yt(e, t, n, r) {
        var i = {},
            o = {},
            a = {},
            s = [],
            u = [],
            l = Kt(e.defs, t);
        for (var c in e.defs) {
            var d = e.defs[c];
            "inverse-background" === d.rendering && (d.groupId ? (i[d.groupId] = [], a[d.groupId] || (a[d.groupId] = d)) : o[c] = [])
        }
        for (var f in e.instances) {
            var p = e.instances[f],
                d = e.defs[p.defId],
                h = l[d.defId],
                v = p.range,
                g = !d.allDay && r ? Je(v, r) : v,
                y = bt(g, n);
            y && ("inverse-background" === d.rendering ? d.groupId ? i[d.groupId].push(y) : o[p.defId].push(y) : ("background" === d.rendering ? s : u).push({
                def: d,
                ui: h,
                instance: p,
                range: y,
                isStart: g.start && g.start.valueOf() === y.start.valueOf(),
                isEnd: g.end && g.end.valueOf() === y.end.valueOf()
            }))
        }
        for (var m in i)
            for (var E = i[m], S = Et(E, n), b = 0, T = S; b < T.length; b++) {
                var D = T[b],
                    d = a[m],
                    h = l[d.defId];
                s.push({
                    def: d,
                    ui: h,
                    instance: null,
                    range: D,
                    isStart: !1,
                    isEnd: !1
                })
            }
        for (var c in o)
            for (var E = o[c], S = Et(E, n), w = 0, R = S; w < R.length; w++) {
                var D = R[w];
                s.push({
                    def: e.defs[c],
                    ui: l[c],
                    instance: null,
                    range: D,
                    isStart: !1,
                    isEnd: !1
                })
            }
        return {
            bg: s,
            fg: u
        }
    }

    function qt(e) {
        return "background" === e.rendering || "inverse-background" === e.rendering
    }

    function Gt(e, t, n) {
        e.hasPublicHandlers("eventRender") && (t = t.filter(function(t) {
            var r = e.publiclyTrigger("eventRender", [{
                event: new Ui(e.calendar, t.eventRange.def, t.eventRange.instance),
                isMirror: n,
                isStart: t.isStart,
                isEnd: t.isEnd,
                el: t.el,
                view: e
            }]);
            return !1 !== r && (r && !0 !== r && (t.el = r), !0)
        }));
        for (var r = 0, i = t; r < i.length; r++) {
            var o = i[r];
            Xt(o.el, o)
        }
        return t
    }

    function Xt(e, t) {
        e.fcSeg = t
    }

    function Jt(e) {
        return e.fcSeg || null
    }

    function Kt(e, t) {
        return it(e, function(e) {
            return Qt(e, t)
        })
    }

    function Qt(e, t) {
        var n = [];
        return t[""] && n.push(t[""]), t[e.defId] && n.push(t[e.defId]), n.push(e.ui), Mn(n)
    }

    function $t(e, t, n, r) {
        var i = Kt(e.defs, t),
            o = vt();
        for (var a in e.defs) {
            var s = e.defs[a];
            o.defs[a] = en(s, i[a], n, r.pluginSystem.hooks.eventDefMutationAppliers, r)
        }
        for (var u in e.instances) {
            var l = e.instances[u],
                s = o.defs[l.defId];
            o.instances[u] = nn(l, s, i[l.defId], n, r)
        }
        return o
    }

    function en(e, t, n, r, i) {
        var o = n.standardProps || {};
        null == o.hasEnd && t.durationEditable && tn(t.startEditable ? n.startDelta : null, n.endDelta || null) && (o.hasEnd = !0);
        var a = wi({}, e, o, {
            ui: wi({}, e.ui, o.ui)
        });
        n.extendedProps && (a.extendedProps = wi({}, a.extendedProps, n.extendedProps));
        for (var s = 0, u = r; s < u.length; s++) {
            (0, u[s])(a, n, i)
        }
        return !a.hasEnd && i.opt("forceEventDuration") && (a.hasEnd = !0), a
    }

    function tn(e, t) {
        return e && !Te(e) && (e = null), t && !Te(t) && (t = null), !(!e && !t) && (Boolean(e) !== Boolean(t) || !fe(e, t))
    }

    function nn(e, t, n, r, i) {
        var o = i.dateEnv,
            a = r.standardProps && !0 === r.standardProps.allDay,
            s = r.standardProps && !1 === r.standardProps.hasEnd,
            u = wi({}, e);
        return a && (u.range = Xe(u.range)), r.startDelta && n.startEditable && (u.range = {
            start: o.add(u.range.start, r.startDelta),
            end: u.range.end
        }), s ? u.range = {
            start: u.range.start,
            end: i.getDefaultEventEnd(t.allDay, u.range.start)
        } : !r.endDelta || !n.durationEditable && tn(n.startEditable ? r.startDelta : null, r.endDelta) || (u.range = {
            start: u.range.start,
            end: o.add(u.range.end, r.endDelta)
        }), t.allDay && (u.range = {
            start: X(u.range.start),
            end: X(u.range.end)
        }), u.range.end < u.range.start && (u.range.end = i.getDefaultEventEnd(t.allDay, u.range.start)), u
    }

    function rn(e, t, n, r, i) {
        switch (t.type) {
            case "RECEIVE_EVENTS":
                return on(e, n[t.sourceId], t.fetchId, t.fetchRange, t.rawEvents, i);
            case "ADD_EVENTS":
                return an(e, t.eventStore, r ? r.activeRange : null, i);
            case "MERGE_EVENTS":
                return gt(e, t.eventStore);
            case "PREV":
            case "NEXT":
            case "SET_DATE":
            case "SET_VIEW_TYPE":
                return r ? ct(e, r.activeRange, i) : e;
            case "CHANGE_TIMEZONE":
                return sn(e, t.oldDateEnv, i.dateEnv);
            case "MUTATE_EVENTS":
                return un(e, t.instanceId, t.mutation, t.fromApi, i);
            case "REMOVE_EVENT_INSTANCES":
                return cn(e, t.instances);
            case "REMOVE_EVENT_DEF":
                return yt(e, function(e) {
                    return e.defId !== t.defId
                });
            case "REMOVE_EVENT_SOURCE":
                return ln(e, t.sourceId);
            case "REMOVE_ALL_EVENT_SOURCES":
                return yt(e, function(e) {
                    return !e.sourceId
                });
            case "REMOVE_ALL_EVENTS":
                return vt();
            case "RESET_EVENTS":
                return {
                    defs: e.defs,
                    instances: e.instances
                };
            default:
                return e
        }
    }

    function on(e, t, n, r, i, o) {
        if (t && n === t.latestFetchId) {
            var a = ut(pt(i, t, o), t.sourceId, o);
            return r && (a = ct(a, r, o)), gt(ln(e, t.sourceId), a)
        }
        return e
    }

    function an(e, t, n, r) {
        return n && (t = ct(t, n, r)), gt(e, t)
    }

    function sn(e, t, n) {
        var r = e.defs,
            i = it(e.instances, function(e) {
                var i = r[e.defId];
                return i.allDay || i.recurringDef ? e : wi({}, e, {
                    range: {
                        start: n.createMarker(t.toDate(e.range.start, e.forcedStartTzo)),
                        end: n.createMarker(t.toDate(e.range.end, e.forcedEndTzo))
                    },
                    forcedStartTzo: n.canComputeOffset ? null : e.forcedStartTzo,
                    forcedEndTzo: n.canComputeOffset ? null : e.forcedEndTzo
                })
            });
        return {
            defs: r,
            instances: i
        }
    }

    function un(e, t, n, r, i) {
        var o = dt(e, t);
        return o = $t(o, r ? {
            "": {
                startEditable: !0,
                durationEditable: !0,
                constraints: [],
                overlap: null,
                allows: [],
                backgroundColor: "",
                borderColor: "",
                textColor: "",
                classNames: []
            }
        } : i.eventUiBases, n, i), gt(e, o)
    }

    function ln(e, t) {
        return yt(e, function(e) {
            return e.sourceId !== t
        })
    }

    function cn(e, t) {
        return {
            defs: e.defs,
            instances: rt(e.instances, function(e) {
                return !t[e.instanceId]
            })
        }
    }

    function dn(e, t) {
        return pn({
            eventDrag: e
        }, t)
    }

    function fn(e, t) {
        return pn({
            dateSelection: e
        }, t)
    }

    function pn(e, t) {
        var n = t.view,
            r = wi({
                businessHours: n ? n.props.businessHours : vt(),
                dateSelection: "",
                eventStore: t.state.eventStore,
                eventUiBases: t.eventUiBases,
                eventSelection: "",
                eventDrag: null,
                eventResize: null
            }, e);
        return (t.pluginSystem.hooks.isPropsValid || hn)(r, t)
    }

    function hn(e, t, n, r) {
        return void 0 === n && (n = {}), !(e.eventDrag && !vn(e, t, n, r)) && !(e.dateSelection && !gn(e, t, n, r))
    }

    function vn(e, t, n, r) {
        var i = e.eventDrag,
            o = i.mutatedEvents,
            a = o.defs,
            s = o.instances,
            u = Kt(a, i.isEvent ? e.eventUiBases : {
                "": t.selectionConfig
            });
        r && (u = it(u, r));
        var l = cn(e.eventStore, i.affectedEvents.instances),
            c = l.defs,
            d = l.instances,
            f = Kt(c, e.eventUiBases);
        for (var p in s) {
            var h = s[p],
                v = h.range,
                g = u[h.defId],
                y = a[h.defId];
            if (!yn(g.constraints, v, l, e.businessHours, t)) return !1;
            var m = t.opt("eventOverlap");
            "function" != typeof m && (m = null);
            for (var E in d) {
                var S = d[E];
                if (Dt(v, S.range)) {
                    if (!1 === f[S.defId].overlap && i.isEvent) return !1;
                    if (!1 === g.overlap) return !1;
                    if (m && !m(new Ui(t, c[S.defId], S), new Ui(t, y, h))) return !1
                }
            }
            for (var b = 0, T = g.allows; b < T.length; b++) {
                var D = T[b],
                    w = wi({}, n, {
                        range: h.range,
                        allDay: y.allDay
                    }),
                    R = e.eventStore.defs[y.defId],
                    I = e.eventStore.instances[p],
                    C = void 0;
                if (C = R ? new Ui(t, R, I) : new Ui(t, y), !D(t.buildDateSpanApi(w), C)) return !1
            }
        }
        return !0
    }

    function gn(e, t, n, r) {
        var i = e.eventStore,
            o = i.defs,
            a = i.instances,
            s = e.dateSelection,
            u = s.range,
            l = t.selectionConfig;
        if (r && (l = r(l)), !yn(l.constraints, u, i, e.businessHours, t)) return !1;
        var c = t.opt("selectOverlap");
        "function" != typeof c && (c = null);
        for (var d in a) {
            var f = a[d];
            if (Dt(u, f.range)) {
                if (!1 === l.overlap) return !1;
                if (c && !c(new Ui(t, o[f.defId], f))) return !1
            }
        }
        for (var p = 0, h = l.allows; p < h.length; p++) {
            var v = h[p],
                g = wi({}, n, s);
            if (!v(t.buildDateSpanApi(g), null)) return !1
        }
        return !0
    }

    function yn(e, t, n, r, i) {
        for (var o = 0, a = e; o < a.length; o++) {
            if (!Sn(mn(a[o], t, n, r, i), t)) return !1
        }
        return !0
    }

    function mn(e, t, n, r, i) {
        return "businessHours" === e ? En(ct(r, t, i)) : "string" == typeof e ? En(yt(n, function(t) {
            return t.groupId === e
        })) : "object" == typeof e && e ? En(ct(e, t, i)) : []
    }

    function En(e) {
        var t = e.instances,
            n = [];
        for (var r in t) n.push(t[r].range);
        return n
    }

    function Sn(e, t) {
        for (var n = 0, r = e; n < r.length; n++) {
            if (wt(r[n], t)) return !0
        }
        return !1
    }

    function bn(e, t) {
        return Array.isArray(e) ? ut(e, "", t, !0) : "object" == typeof e && e ? ut([e], "", t, !0) : null != e ? String(e) : null
    }

    function Tn(e) {
        return (e + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#039;").replace(/"/g, "&quot;").replace(/\n/g, "<br />")
    }

    function Dn(e) {
        var t = [];
        for (var n in e) {
            var r = e[n];
            null != r && "" !== r && t.push(n + ":" + r)
        }
        return t.join(";")
    }

    function wn(e) {
        var t = [];
        for (var n in e) {
            var r = e[n];
            null != r && t.push(n + '="' + Tn(r) + '"')
        }
        return t.join(" ")
    }

    function Rn(e) {
        return Array.isArray(e) ? e : "string" == typeof e ? e.split(/\s+/) : []
    }

    function In(e, t, n) {
        var r = Ge(e, Li, {}, n),
            i = bn(r.constraint, t);
        return {
            startEditable: null != r.startEditable ? r.startEditable : r.editable,
            durationEditable: null != r.durationEditable ? r.durationEditable : r.editable,
            constraints: null != i ? [i] : [],
            overlap: r.overlap,
            allows: null != r.allow ? [r.allow] : [],
            backgroundColor: r.backgroundColor || r.color,
            borderColor: r.borderColor || r.color,
            textColor: r.textColor,
            classNames: r.classNames.concat(r.className)
        }
    }

    function Cn(e, t, n, r) {
        var i = {},
            o = {};
        for (var a in Li) {
            var s = e + Ae(a);
            i[a] = t[s], o[s] = !0
        }
        if ("event" === e && (i.editable = t.editable), r)
            for (var a in t) o[a] || (r[a] = t[a]);
        return In(i, n)
    }

    function Mn(e) {
        return e.reduce(kn, Vi)
    }

    function kn(e, t) {
        return {
            startEditable: null != t.startEditable ? t.startEditable : e.startEditable,
            durationEditable: null != t.durationEditable ? t.durationEditable : e.durationEditable,
            constraints: e.constraints.concat(t.constraints),
            overlap: "boolean" == typeof t.overlap ? t.overlap : e.overlap,
            allows: e.allows.concat(t.allows),
            backgroundColor: t.backgroundColor || e.backgroundColor,
            borderColor: t.borderColor || e.borderColor,
            textColor: t.textColor || e.textColor,
            classNames: e.classNames.concat(t.classNames)
        }
    }

    function On(e, t, n, r) {
        var i = zn(t, n),
            o = {},
            a = et(e, i, n.dateEnv, n.pluginSystem.hooks.recurringTypes, o);
        if (a) {
            var s = _n(o, t, a.allDay, Boolean(a.duration), n);
            return s.recurringDef = {
                typeId: a.typeId,
                typeData: a.typeData,
                duration: a.duration
            }, {
                def: s,
                instance: null
            }
        }
        var u = {},
            l = xn(e, i, n, u, r);
        if (l) {
            var s = _n(u, t, l.allDay, l.hasEnd, n);
            return {
                def: s,
                instance: Pn(s.defId, l.range, l.forcedStartTzo, l.forcedEndTzo)
            }
        }
        return null
    }

    function _n(e, t, n, r, i) {
        var o = {},
            a = Nn(e, i, o);
        a.defId = String(Fi++), a.sourceId = t, a.allDay = n, a.hasEnd = r;
        for (var s = 0, u = i.pluginSystem.hooks.eventDefParsers; s < u.length; s++) {
            var l = u[s],
                c = {};
            l(a, o, c), o = c
        }
        return a.extendedProps = wi(o, a.extendedProps || {}), Object.freeze(a.ui.classNames), Object.freeze(a.extendedProps), a
    }

    function Pn(e, t, n, r) {
        return {
            instanceId: String(Fi++),
            defId: e,
            range: t,
            forcedStartTzo: null == n ? null : n,
            forcedEndTzo: null == r ? null : r
        }
    }

    function xn(e, t, n, r, i) {
        var o, a, s = Hn(e, r),
            u = s.allDay,
            l = null,
            c = !1,
            d = null;
        if (o = n.dateEnv.createMarkerMeta(s.start)) l = o.marker;
        else if (!i) return null;
        return null != s.end && (a = n.dateEnv.createMarkerMeta(s.end)), null == u && (u = null != t ? t : (!o || o.isTimeUnspecified) && (!a || a.isTimeUnspecified)), u && l && (l = X(l)), a && (d = a.marker, u && (d = X(d)), l && d <= l && (d = null)), d ? c = !0 : i || (c = n.opt("forceEventDuration") || !1, d = n.dateEnv.add(l, u ? n.defaultAllDayEventDuration : n.defaultTimedEventDuration)), {
            allDay: u,
            hasEnd: c,
            range: {
                start: l,
                end: d
            },
            forcedStartTzo: o ? o.forcedTzo : null,
            forcedEndTzo: a ? a.forcedTzo : null
        }
    }

    function Hn(e, t) {
        var n = Ge(e, Ai, {}, t);
        return n.start = null !== n.start ? n.start : n.date, delete n.date, n
    }

    function Nn(e, t, n) {
        var r = {},
            i = Ge(e, Bi, {}, r),
            o = In(r, t, n);
        return i.publicId = i.id, delete i.id, i.ui = o, i
    }

    function zn(e, t) {
        var n = null;
        if (e) {
            n = t.state.eventSources[e].allDayDefault
        }
        return null == n && (n = t.opt("allDayDefault")), n
    }

    function Un(e, t) {
        return ut(Ln(e), "", t)
    }

    function Ln(e) {
        var t;
        return t = !0 === e ? [{}] : Array.isArray(e) ? e.filter(function(e) {
            return e.daysOfWeek
        }) : "object" == typeof e && e ? [e] : [], t = t.map(function(e) {
            return wi({}, Wi, e)
        })
    }

    function Vn(e, t, n) {
        function r() {
            if (a) {
                for (var e = 0, n = s; e < n.length; e++) {
                    n[e].unrender()
                }
                t && t.apply(o, a), a = null
            }
        }

        function i() {
            a && Mt(a, arguments) || (r(), o = this, a = arguments, e.apply(this, arguments))
        }
        void 0 === n && (n = []);
        var o, a, s = [];
        i.dependents = s, i.unrender = r;
        for (var u = 0, l = n; u < l.length; u++) {
            l[u].dependents.push(i)
        }
        return i
    }

    function Bn(e, t, n) {
        var r = [];
        e && r.push(e), t && r.push(t);
        var i = {
            "": Mn(r)
        };
        return n && wi(i, n), i
    }

    function An(e, t, n, r) {
        var i, o, a, s, u = e.dateEnv;
        return t instanceof Date ? i = t : (i = t.date, o = t.type, a = t.forceOff), s = {
            date: u.formatIso(i, {
                omitTime: !0
            }),
            type: o || "day"
        }, "string" == typeof n && (r = n, n = null), n = n ? " " + wn(n) : "", r = r || "", !a && e.opt("navLinks") ? "<a" + n + ' data-goto="' + Tn(JSON.stringify(s)) + '">' + r + "</a>" : "<span" + n + ">" + r + "</span>"
    }

    function Fn(e) {
        return e.opt("allDayHtml") || Tn(e.opt("allDayText"))
    }

    function Wn(e, t, n, r) {
        var i, o, a = n.calendar,
            s = n.view,
            u = n.theme,
            l = n.dateEnv,
            c = [];
        return Rt(t.activeRange, e) ? (c.push("fc-" + Si[e.getUTCDay()]), s.opt("monthMode") && l.getMonth(e) !== l.getMonth(t.currentRange.start) && c.push("fc-other-month"), i = X(a.getNow()), o = V(i, 1), e < i ? c.push("fc-past") : e >= o ? c.push("fc-future") : (c.push("fc-today"), !0 !== r && c.push(u.getClass("today")))) : c.push("fc-disabled-day"), c
    }

    function Zn(e, t, n) {
        var r = !1,
            i = function() {
                r || (r = !0, t.apply(this, arguments))
            },
            o = function() {
                r || (r = !0, n && n.apply(this, arguments))
            },
            a = e(i, o);
        a && "function" == typeof a.then && a.then(i, o)
    }

    function jn(e, t, n) {
        (e[t] || (e[t] = [])).push(n)
    }

    function Yn(e, t, n) {
        n ? e[t] && (e[t] = e[t].filter(function(e) {
            return e !== n
        })) : delete e[t]
    }

    function qn(e, t, n) {
        var r = {},
            i = !1;
        for (var o in t) o in e && (e[o] === t[o] || n[o] && n[o](e[o], t[o])) ? r[o] = e[o] : (r[o] = t[o], i = !0);
        for (var o in e)
            if (!(o in t)) {
                i = !0;
                break
            }
        return {
            anyChanges: i,
            comboProps: r
        }
    }

    function Gn(e) {
        return {
            id: String(ro++),
            deps: e.deps || [],
            reducers: e.reducers || [],
            eventDefParsers: e.eventDefParsers || [],
            eventDragMutationMassagers: e.eventDragMutationMassagers || [],
            eventDefMutationAppliers: e.eventDefMutationAppliers || [],
            dateSelectionTransformers: e.dateSelectionTransformers || [],
            datePointTransforms: e.datePointTransforms || [],
            dateSpanTransforms: e.dateSpanTransforms || [],
            views: e.views || {},
            viewPropsTransformers: e.viewPropsTransformers || [],
            isPropsValid: e.isPropsValid || null,
            externalDefTransforms: e.externalDefTransforms || [],
            eventResizeJoinTransforms: e.eventResizeJoinTransforms || [],
            viewContainerModifiers: e.viewContainerModifiers || [],
            eventDropTransformers: e.eventDropTransformers || [],
            componentInteractions: e.componentInteractions || [],
            calendarInteractions: e.calendarInteractions || [],
            themeClasses: e.themeClasses || {},
            eventSourceDefs: e.eventSourceDefs || [],
            cmdFormatter: e.cmdFormatter,
            recurringTypes: e.recurringTypes || [],
            namedTimeZonedImpl: e.namedTimeZonedImpl,
            defaultView: e.defaultView || "",
            elementDraggingImpl: e.elementDraggingImpl,
            optionChangeHandlers: e.optionChangeHandlers || {}
        }
    }

    function Xn(e, t) {
        return {
            reducers: e.reducers.concat(t.reducers),
            eventDefParsers: e.eventDefParsers.concat(t.eventDefParsers),
            eventDragMutationMassagers: e.eventDragMutationMassagers.concat(t.eventDragMutationMassagers),
            eventDefMutationAppliers: e.eventDefMutationAppliers.concat(t.eventDefMutationAppliers),
            dateSelectionTransformers: e.dateSelectionTransformers.concat(t.dateSelectionTransformers),
            datePointTransforms: e.datePointTransforms.concat(t.datePointTransforms),
            dateSpanTransforms: e.dateSpanTransforms.concat(t.dateSpanTransforms),
            views: wi({}, e.views, t.views),
            viewPropsTransformers: e.viewPropsTransformers.concat(t.viewPropsTransformers),
            isPropsValid: t.isPropsValid || e.isPropsValid,
            externalDefTransforms: e.externalDefTransforms.concat(t.externalDefTransforms),
            eventResizeJoinTransforms: e.eventResizeJoinTransforms.concat(t.eventResizeJoinTransforms),
            viewContainerModifiers: e.viewContainerModifiers.concat(t.viewContainerModifiers),
            eventDropTransformers: e.eventDropTransformers.concat(t.eventDropTransformers),
            calendarInteractions: e.calendarInteractions.concat(t.calendarInteractions),
            componentInteractions: e.componentInteractions.concat(t.componentInteractions),
            themeClasses: wi({}, e.themeClasses, t.themeClasses),
            eventSourceDefs: e.eventSourceDefs.concat(t.eventSourceDefs),
            cmdFormatter: t.cmdFormatter || e.cmdFormatter,
            recurringTypes: e.recurringTypes.concat(t.recurringTypes),
            namedTimeZonedImpl: t.namedTimeZonedImpl || e.namedTimeZonedImpl,
            defaultView: e.defaultView || t.defaultView,
            elementDraggingImpl: e.elementDraggingImpl || t.elementDraggingImpl,
            optionChangeHandlers: wi({}, e.optionChangeHandlers, t.optionChangeHandlers)
        }
    }

    function Jn(e, t, n, r, i) {
        e = e.toUpperCase();
        var o = null;
        "GET" === e ? t = Kn(t, n) : o = Qn(n);
        var a = new XMLHttpRequest;
        a.onreadystatechange = function() {
          if (a.status >= 200 && a.status < 400) try {
              var e = JSON.parse(a.responseText);
              if(e.code && e.code ==100){
                window.ShowErrorToast(e.msg);
                window.GenerateSessionToken();
              }else{
                r(e, a);
              }
          } catch (e) {
              i("Failure parsing JSON", a)
          } else i("Request failed", a)
        };
        a.open("GET", t, true);
        a.setRequestHeader("Authorization", "Bearer " + window.sessionToken);
        a.send();

    }

    function Kn(e, t) {
        return e + (-1 === e.indexOf("?") ? "?" : "&") + Qn(t)
    }

    function Qn(e) {
        var t = [];
        for (var n in e) t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
        return t.join("&")
    }

    function $n(e, t, n) {
        var r, i, o, a, s = n.dateEnv,
            u = {};
        return r = e.startParam, null == r && (r = n.opt("startParam")), i = e.endParam, null == i && (i = n.opt("endParam")), o = e.timeZoneParam, null == o && (o = n.opt("timeZoneParam")), a = "function" == typeof e.extraParams ? e.extraParams() : e.extraParams || {}, wi(u, a), u[r] = s.formatIso(t.start), u[i] = s.formatIso(t.end), "local" !== s.timeZone && (u[o] = s.timeZone), u
    }

    function er(e, t, n, r) {
        for (var i = e ? ot(e) : null, o = X(n.start), a = n.end, s = []; o < a;) {
            var u = void 0;
            i && !i[o.getUTCDay()] || (u = t ? r.add(o, t) : o, s.push(u)), o = V(o, 1)
        }
        return s
    }

    function tr(e, t, n) {
        for (var r = at(t.state.eventSources), i = [], o = 0, a = e; o < a.length; o++) {
            for (var s = a[o], u = !1, l = 0; l < r.length; l++)
                if (n(r[l]._raw, s)) {
                    r.splice(l, 1), u = !0;
                    break
                }
            u || i.push(s)
        }
        for (var c = 0, d = r; c < d.length; c++) {
            var f = d[c];
            t.dispatch({
                type: "REMOVE_EVENT_SOURCE",
                sourceId: f.sourceId
            })
        }
        for (var p = 0, h = i; p < h.length; p++) {
            var v = h[p];
            t.addEventSource(v)
        }
    }

    function nr(e, t) {
        t.addPluginInputs(e)
    }

    function rr(e) {
        return nt(e, mo)
    }

    function ir(e) {
        for (var t = [], n = 0, r = e; n < r.length; n++) {
            var i = r[n];
            if ("string" == typeof i) {
                var o = "FullCalendar" + Ae(i);
                window[o] ? t.push(window[o].default) : console.warn("Plugin file not loaded for " + i)
            } else t.push(i)
        }
        return Eo.concat(t)
    }

    function or(e) {
        for (var t = e.length > 0 ? e[0].code : "en", n = window.FullCalendarLocalesAll || [], r = window.FullCalendarLocales || {}, i = n.concat(at(r), e), o = {
                en: So
            }, a = 0, s = i; a < s.length; a++) {
            var u = s[a];
            o[u.code] = u
        }
        return {
            map: o,
            defaultCode: t
        }
    }

    function ar(e, t) {
        return "object" != typeof e || Array.isArray(e) ? sr(e, t) : lr(e.code, [e.code], e)
    }

    function sr(e, t) {
        var n = [].concat(e || []);
        return lr(e, n, ur(n, t) || So)
    }

    function ur(e, t) {
        for (var n = 0; n < e.length; n++)
            for (var r = e[n].toLocaleLowerCase().split("-"), i = r.length; i > 0; i--) {
                var o = r.slice(0, i).join("-");
                if (t[o]) return t[o]
            }
        return null
    }

    function lr(e, t, n) {
        var r = nt([So, n], ["buttonText"]);
        delete r.code;
        var i = r.week;
        return delete r.week, {
            codeArg: e,
            codes: t,
            week: i,
            simpleNumberFormat: new Intl.NumberFormat(e),
            options: r
        }
    }

    function cr(e) {
        return new To[e]
    }

    function dr(e) {
        var t = wo.exec(e);
        if (t) {
            var n = new Date(Date.UTC(Number(t[1]), t[3] ? Number(t[3]) - 1 : 0, Number(t[5] || 1), Number(t[7] || 0), Number(t[8] || 0), Number(t[10] || 0), t[12] ? 1e3 * Number("0." + t[12]) : 0));
            if (ae(n)) {
                var r = null;
                return t[13] && (r = ("-" === t[15] ? -1 : 1) * (60 * Number(t[16] || 0) + Number(t[18] || 0))), {
                    marker: n,
                    isTimeUnspecified: !t[6],
                    timeZoneOffset: r
                }
            }
        }
        return null
    }

    function fr(e, t) {
        return !t.pluginSystem.hooks.eventSourceDefs[e.sourceDefId].ignoreRange
    }

    function pr(e, t) {
        for (var n = t.pluginSystem.hooks.eventSourceDefs, r = n.length - 1; r >= 0; r--) {
            var i = n[r],
                o = i.parseMeta(e);
            if (o) {
                var a = hr("object" == typeof e ? e : {}, o, r, t);
                return a._raw = e, a
            }
        }
        return null
    }

    function hr(e, t, n, r) {
        var i = {},
            o = Ge(e, Io, {}, i),
            a = {},
            s = In(i, r, a);
        return o.isFetching = !1, o.latestFetchId = "", o.fetchRange = null, o.publicId = String(e.id || ""), o.sourceId = String(Co++), o.sourceDefId = n, o.meta = t, o.ui = s, o.extendedProps = a, o
    }

    function vr(e, t, n, r) {
        switch (t.type) {
            case "ADD_EVENT_SOURCES":
                return gr(e, t.sources, n ? n.activeRange : null, r);
            case "REMOVE_EVENT_SOURCE":
                return yr(e, t.sourceId);
            case "PREV":
            case "NEXT":
            case "SET_DATE":
            case "SET_VIEW_TYPE":
                return n ? mr(e, n.activeRange, r) : e;
            case "FETCH_EVENT_SOURCES":
            case "CHANGE_TIMEZONE":
                return Sr(e, t.sourceIds ? ot(t.sourceIds) : Dr(e, r), n ? n.activeRange : null, r);
            case "RECEIVE_EVENTS":
            case "RECEIVE_EVENT_ERROR":
                return Tr(e, t.sourceId, t.fetchId, t.fetchRange);
            case "REMOVE_ALL_EVENT_SOURCES":
                return {};
            default:
                return e
        }
    }

    function gr(e, t, n, r) {
        for (var i = {}, o = 0, a = t; o < a.length; o++) {
            var s = a[o];
            i[s.sourceId] = s
        }
        return n && (i = mr(i, n, r)), wi({}, e, i)
    }

    function yr(e, t) {
        return rt(e, function(e) {
            return e.sourceId !== t
        })
    }

    function mr(e, t, n) {
        return Sr(e, rt(e, function(e) {
            return Er(e, t, n)
        }), t, n)
    }

    function Er(e, t, n) {
        return fr(e, n) ? !n.opt("lazyFetching") || !e.fetchRange || t.start < e.fetchRange.start || t.end > e.fetchRange.end : !e.latestFetchId
    }

    function Sr(e, t, n, r) {
        var i = {};
        for (var o in e) {
            var a = e[o];
            t[o] ? i[o] = br(a, n, r) : i[o] = a
        }
        return i
    }

    function br(e, t, n) {
        var r = n.pluginSystem.hooks.eventSourceDefs[e.sourceDefId],
            i = String(Mo++);
        return r.fetch({
            eventSource: e,
            calendar: n,
            range: t
        }, function(r) {
            var o, a, s = r.rawEvents,
                u = n.opt("eventSourceSuccess");
            e.success && (a = e.success(s, r.xhr)), u && (o = u(s, r.xhr)), s = a || o || s, n.dispatch({
                type: "RECEIVE_EVENTS",
                sourceId: e.sourceId,
                fetchId: i,
                fetchRange: t,
                rawEvents: s
            })
        }, function(r) {
            var o = n.opt("eventSourceFailure");
            console.warn(r.message, r), e.failure && e.failure(r), o && o(r), n.dispatch({
                type: "RECEIVE_EVENT_ERROR",
                sourceId: e.sourceId,
                fetchId: i,
                fetchRange: t,
                error: r
            })
        }), wi({}, e, {
            isFetching: !0,
            latestFetchId: i
        })
    }

    function Tr(e, t, n, r) {
        var i, o = e[t];
        return o && n === o.latestFetchId ? wi({}, e, (i = {}, i[t] = wi({}, o, {
            isFetching: !1,
            fetchRange: r
        }), i)) : e
    }

    function Dr(e, t) {
        return rt(e, function(e) {
            return fr(e, t)
        })
    }

    function wr(e, t) {
        return Tt(e.activeRange, t.activeRange) && Tt(e.validRange, t.validRange) && fe(e.minTime, t.minTime) && fe(e.maxTime, t.maxTime)
    }

    function Rr(e, t, n) {
        for (var r = Ir(e.viewType, t), i = Cr(e.dateProfile, t, e.currentDate, r, n), o = vr(e.eventSources, t, i, n), a = wi({}, e, {
                viewType: r,
                dateProfile: i,
                currentDate: Mr(e.currentDate, t, i),
                eventSources: o,
                eventStore: rn(e.eventStore, t, o, i, n),
                dateSelection: kr(e.dateSelection, t, n),
                eventSelection: Or(e.eventSelection, t),
                eventDrag: _r(e.eventDrag, t, o, n),
                eventResize: Pr(e.eventResize, t, o, n),
                eventSourceLoadingLevel: xr(o),
                loadingLevel: xr(o)
            }), s = 0, u = n.pluginSystem.hooks.reducers; s < u.length; s++) {
            a = (0, u[s])(a, t, n)
        }
        return a
    }

    function Ir(e, t) {
        switch (t.type) {
            case "SET_VIEW_TYPE":
                return t.viewType;
            default:
                return e
        }
    }

    function Cr(e, t, n, r, i) {
        var o;
        switch (t.type) {
            case "PREV":
                o = i.dateProfileGenerators[r].buildPrev(e, n);
                break;
            case "NEXT":
                o = i.dateProfileGenerators[r].buildNext(e, n);
                break;
            case "SET_DATE":
                e.activeRange && Rt(e.currentRange, t.dateMarker) || (o = i.dateProfileGenerators[r].build(t.dateMarker, void 0, !0));
                break;
            case "SET_VIEW_TYPE":
                var a = i.dateProfileGenerators[r];
                if (!a) throw new Error(r ? 'The FullCalendar view "' + r + '" does not exist. Make sure your plugins are loaded correctly.' : "No available FullCalendar view plugins.");
                o = a.build(t.dateMarker || n, void 0, !0)
        }
        return !o || !o.isValid || e && wr(e, o) ? e : o
    }

    function Mr(e, t, n) {
        switch (t.type) {
            case "PREV":
            case "NEXT":
                return Rt(n.currentRange, e) ? e : n.currentRange.start;
            case "SET_DATE":
            case "SET_VIEW_TYPE":
                var r = t.dateMarker || e;
                return n.activeRange && !Rt(n.activeRange, r) ? n.currentRange.start : r;
            default:
                return e
        }
    }

    function kr(e, t, n) {
        switch (t.type) {
            case "SELECT_DATES":
                return t.selection;
            case "UNSELECT_DATES":
                return null;
            default:
                return e
        }
    }

    function Or(e, t) {
        switch (t.type) {
            case "SELECT_EVENT":
                return t.eventInstanceId;
            case "UNSELECT_EVENT":
                return "";
            default:
                return e
        }
    }

    function _r(e, t, n, r) {
        switch (t.type) {
            case "SET_EVENT_DRAG":
                var i = t.state;
                return {
                    affectedEvents: i.affectedEvents,
                    mutatedEvents: i.mutatedEvents,
                    isEvent: i.isEvent,
                    origSeg: i.origSeg
                };
            case "UNSET_EVENT_DRAG":
                return null;
            default:
                return e
        }
    }

    function Pr(e, t, n, r) {
        switch (t.type) {
            case "SET_EVENT_RESIZE":
                var i = t.state;
                return {
                    affectedEvents: i.affectedEvents,
                    mutatedEvents: i.mutatedEvents,
                    isEvent: i.isEvent,
                    origSeg: i.origSeg
                };
            case "UNSET_EVENT_RESIZE":
                return null;
            default:
                return e
        }
    }

    function xr(e) {
        var t = 0;
        for (var n in e) e[n].isFetching && t++;
        return t
    }

    function Hr(e, t, n) {
        var r = Nr(e, t),
            i = r.range;
        if (!i.start) return null;
        if (!i.end) {
            if (null == n) return null;
            i.end = t.add(i.start, n)
        }
        return r
    }

    function Nr(e, t) {
        var n = {},
            r = Ge(e, Oo, {}, n),
            i = r.start ? t.createMarkerMeta(r.start) : null,
            o = r.end ? t.createMarkerMeta(r.end) : null,
            a = r.allDay;
        return null == a && (a = i && i.isTimeUnspecified && (!o || o.isTimeUnspecified)), n.range = {
            start: i ? i.marker : null,
            end: o ? o.marker : null
        }, n.allDay = a, n
    }

    function zr(e, t) {
        return Tt(e.range, t.range) && e.allDay === t.allDay && Ur(e, t)
    }

    function Ur(e, t) {
        for (var n in t)
            if ("range" !== n && "allDay" !== n && e[n] !== t[n]) return !1;
        for (var n in e)
            if (!(n in t)) return !1;
        return !0
    }

    function Lr(e, t) {
        return {
            start: t.toDate(e.range.start),
            end: t.toDate(e.range.end),
            startStr: t.formatIso(e.range.start, {
                omitTime: e.allDay
            }),
            endStr: t.formatIso(e.range.end, {
                omitTime: e.allDay
            }),
            allDay: e.allDay
        }
    }

    function Vr(e, t) {
        return {
            date: t.toDate(e.range.start),
            dateStr: t.formatIso(e.range.start, {
                omitTime: e.allDay
            }),
            allDay: e.allDay
        }
    }

    function Br(e, t, n) {
        var r = _n({
            editable: !1
        }, "", e.allDay, !0, n);
        return {
            def: r,
            ui: Qt(r, t),
            instance: Pn(r.defId, e.range),
            range: e.range,
            isStart: !0,
            isEnd: !0
        }
    }

    function Ar(e, t) {
        var n, r = {};
        for (n in e) Fr(n, r, e, t);
        for (n in t) Fr(n, r, e, t);
        return r
    }

    function Fr(e, t, n, r) {
        if (t[e]) return t[e];
        var i = Wr(e, t, n, r);
        return i && (t[e] = i), i
    }

    function Wr(e, t, n, r) {
        var i = n[e],
            o = r[e],
            a = function(e) {
                return i && null !== i[e] ? i[e] : o && null !== o[e] ? o[e] : null
            },
            s = a("class"),
            u = a("superType");
        !u && s && (u = Zr(s, r) || Zr(s, n));
        var l = u ? Fr(u, t, n, r) : null;
        return !s && l && (s = l.class), s ? {
            type: e,
            class: s,
            defaults: wi({}, l ? l.defaults : {}, i ? i.options : {}),
            overrides: wi({}, l ? l.overrides : {}, o ? o.options : {})
        } : null
    }

    function Zr(e, t) {
        var n = Object.getPrototypeOf(e.prototype);
        for (var r in t) {
            var i = t[r];
            if (i.class && i.class.prototype === n) return r
        }
        return ""
    }

    function jr(e) {
        return it(e, Yr)
    }

    function Yr(e) {
        "function" == typeof e && (e = {
            class: e
        });
        var t = {},
            n = Ge(e, _o, {}, t);
        return {
            superType: n.type,
            class: n.class,
            options: t
        }
    }

    function qr(e, t) {
        var n = jr(e),
            r = jr(t.overrides.views);
        return it(Ar(n, r), function(e) {
            return Gr(e, r, t)
        })
    }

    function Gr(e, t, n) {
        var r = e.overrides.duration || e.defaults.duration || n.dynamicOverrides.duration || n.overrides.duration,
            i = null,
            o = "",
            a = "",
            s = {};
        if (r && (i = ue(r))) {
            var u = we(i, !de(r));
            o = u.unit, 1 === u.value && (a = o, s = t[o] ? t[o].options : {})
        }
        var l = function(t) {
            var n = t.buttonText || {},
                r = e.defaults.buttonTextKey;
            return null != r && null != n[r] ? n[r] : null != n[e.type] ? n[e.type] : null != n[a] ? n[a] : void 0
        };
        return {
            type: e.type,
            class: e.class,
            duration: i,
            durationUnit: o,
            singleUnit: a,
            options: wi({}, go, e.defaults, n.dirDefaults, n.localeDefaults, n.overrides, s, e.overrides, n.dynamicOverrides),
            buttonTextOverride: l(n.dynamicOverrides) || l(n.overrides) || e.overrides.buttonText,
            buttonTextDefault: l(n.localeDefaults) || l(n.dirDefaults) || e.defaults.buttonText || l(go) || e.type
        }
    }

    function Xr(e, t) {
        var n;
        return n = /^(year|month)$/.test(e.currentRangeUnit) ? e.currentRange : e.activeRange, this.dateEnv.formatRange(n.start, n.end, Bt(t.titleFormat || Jr(e), t.titleRangeSeparator), {
            isEndExclusive: e.isRangeAllDay
        })
    }

    function Jr(e) {
        var t = e.currentRangeUnit;
        if ("year" === t) return {
            year: "numeric"
        };
        if ("month" === t) return {
            year: "numeric",
            month: "long"
        };
        var n = G(e.currentRange.start, e.currentRange.end);
        return null !== n && n > 1 ? {
            year: "numeric",
            month: "short",
            day: "numeric"
        } : {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    }

    function Kr(e) {
        return e.map(function(e) {
            return new e
        })
    }

    function Qr(e, t) {
        return {
            component: e,
            el: t.el,
            useEventCenter: null == t.useEventCenter || t.useEventCenter
        }
    }

    function $r(e) {
        var t;
        return t = {}, t[e.component.uid] = e, t
    }

    function ei(e, t, n, r, i, o, a) {
        return new Ro({
            calendarSystem: "gregory",
            timeZone: t,
            namedTimeZoneImpl: n,
            locale: e,
            weekNumberCalculation: i,
            firstDay: r,
            weekLabel: o,
            cmdFormatter: a
        })
    }

    function ti(e) {
        return new(this.pluginSystem.hooks.themeClasses[e.themeSystem] || Lo)(e)
    }

    function ni(e) {
        var t = this.tryRerender.bind(this);
        return null != e && (t = qe(t, e)), t
    }

    function ri(e) {
        return it(e, function(e) {
            return e.ui
        })
    }

    function ii(e, t, n) {
        var r = {
            "": t
        };
        for (var i in e) {
            var o = e[i];
            o.sourceId && n[o.sourceId] && (r[i] = n[o.sourceId])
        }
        return r
    }

    function oi(e) {
        var t = e.eventRange.def,
            n = e.eventRange.instance.range,
            r = n.start ? n.start.valueOf() : 0,
            i = n.end ? n.end.valueOf() : 0;
        return wi({}, t.extendedProps, t, {
            id: t.publicId,
            start: r,
            end: i,
            duration: i - r,
            allDay: Number(t.allDay),
            _seg: e
        })
    }

    function ai(e, t) {
        void 0 === t && (t = {});
        var n = ui(t),
            r = Bt(t),
            i = n.createMarkerMeta(e);
        return i ? n.format(i.marker, r, {
            forcedTzo: i.forcedTzo
        }) : ""
    }

    function si(e, t, n) {
        var r = ui("object" == typeof n && n ? n : {}),
            i = Bt(n, go.defaultRangeSeparator),
            o = r.createMarkerMeta(e),
            a = r.createMarkerMeta(t);
        return o && a ? r.formatRange(o.marker, a.marker, i, {
            forcedStartTzo: o.forcedTzo,
            forcedEndTzo: a.forcedTzo,
            isEndExclusive: n.isEndExclusive
        }) : ""
    }

    function ui(e) {
        var t = ar(e.locale || "en", or([]).map);
        return e = wi({
            timeZone: go.timeZone,
            calendarSystem: "gregory"
        }, e, {
            locale: t
        }), new Ro(e)
    }

    function li(e) {
        var t = {},
            n = Ge(e, jo, Yo, t);
        return n.leftoverProps = t, n
    }

    function ci(e, t) {
        return !e || t > 10 ? {
            weekday: "short"
        } : t > 1 ? {
            weekday: "short",
            month: "numeric",
            day: "numeric",
            omitCommas: !0
        } : {
            weekday: "long"
        }
    }

    function di(e, t, n, r, i, o, a, s) {
        var u, l = o.view,
            c = o.dateEnv,
            d = o.theme,
            f = o.options,
            p = Rt(t.activeRange, e),
            h = ["fc-day-header", d.getClass("widgetHeader")];
        return u = "function" == typeof f.columnHeaderHtml ? f.columnHeaderHtml(c.toDate(e)) : Tn("function" == typeof f.columnHeaderText ? f.columnHeaderText(c.toDate(e)) : c.format(e, i)), n ? h = h.concat(Wn(e, t, o, !0)) : h.push("fc-" + Si[e.getUTCDay()]), '<th class="' + h.join(" ") + '"' + (p && n ? ' data-date="' + c.formatIso(e, {
            omitTime: !0
        }) + '"' : "") + (a > 1 ? ' colspan="' + a + '"' : "") + (s ? " " + s : "") + ">" + (p ? An(l, {
            date: e,
            forceOff: !n || 1 === r
        }, u) : u) + "</th>"
    }

    function fi(e, t) {
        var n = e.activeRange;
        return t ? n : {
            start: B(n.start, e.minTime.milliseconds),
            end: B(n.end, e.maxTime.milliseconds - 864e5)
        }
    }
    var pi = {
            className: !0,
            colSpan: !0,
            rowSpan: !0
        },
        hi = {
            "<tr": "tbody",
            "<td": "tr"
        },
        vi = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.msMatchesSelector,
        gi = Element.prototype.closest || function(e) {
            var t = this;
            if (!document.documentElement.contains(t)) return null;
            do {
                if (f(t, e)) return t;
                t = t.parentElement || t.parentNode
            } while (null !== t && 1 === t.nodeType);
            return null
        },
        yi = /(top|left|right|bottom|width|height)$/i,
        mi = null,
        Ei = ["webkitTransitionEnd", "otransitionend", "oTransitionEnd", "msTransitionEnd", "transitionend"],
        Si = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
        bi = ["years", "months", "days", "milliseconds"],
        Ti = /^(-?)(?:(\d+)\.)?(\d+):(\d\d)(?::(\d\d)(?:\.(\d\d\d))?)?/,
        Di = function(e, t) {
            return (Di = Object.setPrototypeOf || {
                    __proto__: []
                }
                instanceof Array && function(e, t) {
                    e.__proto__ = t
                } || function(e, t) {
                    for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
                })(e, t)
        },
        wi = function() {
            return wi = Object.assign || function(e) {
                for (var t, n = 1, r = arguments.length; n < r; n++) {
                    t = arguments[n];
                    for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i])
                }
                return e
            }, wi.apply(this, arguments)
        },
        Ri = Object.prototype.hasOwnProperty,
        Ii = {
            week: 3,
            separator: 0,
            omitZeroMinute: 0,
            meridiem: 0,
            omitCommas: 0
        },
        Ci = {
            timeZoneName: 7,
            era: 6,
            year: 5,
            month: 4,
            day: 2,
            weekday: 2,
            hour: 1,
            minute: 1,
            second: 1
        },
        Mi = /\s*([ap])\.?m\.?/i,
        ki = /,/g,
        Oi = /\s+/g,
        _i = /\u200e/g,
        Pi = /UTC|GMT/,
        xi = function() {
            function e(e) {
                var t = {},
                    n = {},
                    r = 0;
                for (var i in e) i in Ii ? (n[i] = e[i], r = Math.max(Ii[i], r)) : (t[i] = e[i], i in Ci && (r = Math.max(Ci[i], r)));
                this.standardDateProps = t, this.extendedSettings = n, this.severity = r, this.buildFormattingFunc = kt(_t)
            }
            return e.prototype.format = function(e, t) {
                return this.buildFormattingFunc(this.standardDateProps, this.extendedSettings, t)(e)
            }, e.prototype.formatRange = function(e, t, n) {
                var r = this,
                    i = r.standardDateProps,
                    o = r.extendedSettings,
                    a = Ut(e.marker, t.marker, n.calendarSystem);
                if (!a) return this.format(e, n);
                var s = a;
                !(s > 1) || "numeric" !== i.year && "2-digit" !== i.year || "numeric" !== i.month && "2-digit" !== i.month || "numeric" !== i.day && "2-digit" !== i.day || (s = 1);
                var u = this.format(e, n),
                    l = this.format(t, n);
                if (u === l) return u;
                var c = Lt(i, s),
                    d = _t(c, o, n),
                    f = d(e),
                    p = d(t),
                    h = Vt(u, f, l, p),
                    v = o.separator || "";
                return h ? h.before + f + v + p + h.after : u + v + l
            }, e.prototype.getLargestUnit = function() {
                switch (this.severity) {
                    case 7:
                    case 6:
                    case 5:
                        return "year";
                    case 4:
                        return "month";
                    case 3:
                        return "week";
                    default:
                        return "day"
                }
            }, e
        }(),
        Hi = function() {
            function e(e, t) {
                this.cmdStr = e, this.separator = t
            }
            return e.prototype.format = function(e, t) {
                return t.cmdFormatter(this.cmdStr, Zt(e, null, t, this.separator))
            }, e.prototype.formatRange = function(e, t, n) {
                return n.cmdFormatter(this.cmdStr, Zt(e, t, n, this.separator))
            }, e
        }(),
        Ni = function() {
            function e(e) {
                this.func = e
            }
            return e.prototype.format = function(e, t) {
                return this.func(Zt(e, null, t))
            }, e.prototype.formatRange = function(e, t, n) {
                return this.func(Zt(e, t, n))
            }, e
        }(),
        zi = function() {
            function e(e, t) {
                this.calendar = e, this.internalEventSource = t
            }
            return e.prototype.remove = function() {
                this.calendar.dispatch({
                    type: "REMOVE_EVENT_SOURCE",
                    sourceId: this.internalEventSource.sourceId
                })
            }, e.prototype.refetch = function() {
                this.calendar.dispatch({
                    type: "FETCH_EVENT_SOURCES",
                    sourceIds: [this.internalEventSource.sourceId]
                })
            }, Object.defineProperty(e.prototype, "id", {
                get: function() {
                    return this.internalEventSource.publicId
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "url", {
                get: function() {
                    return this.internalEventSource.meta.url
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        Ui = function() {
            function e(e, t, n) {
                this._calendar = e, this._def = t, this._instance = n || null
            }
            return e.prototype.setProp = function(e, t) {
                var n, r;
                if (e in Ai);
                else if (e in Bi) "function" == typeof Bi[e] && (t = Bi[e](t)), this.mutate({
                    standardProps: (n = {}, n[e] = t, n)
                });
                else if (e in Li) {
                    var i = void 0;
                    "function" == typeof Li[e] && (t = Li[e](t)), "color" === e ? i = {
                        backgroundColor: t,
                        borderColor: t
                    } : "editable" === e ? i = {
                        startEditable: t,
                        durationEditable: t
                    } : (r = {}, r[e] = t, i = r), this.mutate({
                        standardProps: {
                            ui: i
                        }
                    })
                }
            }, e.prototype.setExtendedProp = function(e, t) {
                var n;
                this.mutate({
                    extendedProps: (n = {}, n[e] = t, n)
                })
            }, e.prototype.setStart = function(e, t) {
                void 0 === t && (t = {});
                var n = this._calendar.dateEnv,
                    r = n.createMarker(e);
                if (r && this._instance) {
                    var i = this._instance.range,
                        o = Qe(i.start, r, n, t.granularity),
                        a = null;
                    if (t.maintainDuration) {
                        a = ve(Qe(i.start, i.end, n, t.granularity), Qe(r, i.end, n, t.granularity))
                    }
                    this.mutate({
                        startDelta: o,
                        endDelta: a
                    })
                }
            }, e.prototype.setEnd = function(e, t) {
                void 0 === t && (t = {});
                var n, r = this._calendar.dateEnv;
                if ((null == e || (n = r.createMarker(e))) && this._instance)
                    if (n) {
                        var i = Qe(this._instance.range.end, n, r, t.granularity);
                        this.mutate({
                            endDelta: i
                        })
                    } else this.mutate({
                        standardProps: {
                            hasEnd: !1
                        }
                    })
            }, e.prototype.setDates = function(e, t, n) {
                void 0 === n && (n = {});
                var r, i = this._calendar.dateEnv,
                    o = {
                        allDay: n.allDay
                    },
                    a = i.createMarker(e);
                if (a && (null == t || (r = i.createMarker(t))) && this._instance) {
                    var s = this._instance.range;
                    !0 === n.allDay && (s = Xe(s));
                    var u = Qe(s.start, a, i, n.granularity);
                    if (r) {
                        var l = Qe(s.end, r, i, n.granularity);
                        this.mutate({
                            startDelta: u,
                            endDelta: l,
                            standardProps: o
                        })
                    } else o.hasEnd = !1, this.mutate({
                        startDelta: u,
                        standardProps: o
                    })
                }
            }, e.prototype.moveStart = function(e) {
                var t = ue(e);
                t && this.mutate({
                    startDelta: t
                })
            }, e.prototype.moveEnd = function(e) {
                var t = ue(e);
                t && this.mutate({
                    endDelta: t
                })
            }, e.prototype.moveDates = function(e) {
                var t = ue(e);
                t && this.mutate({
                    startDelta: t,
                    endDelta: t
                })
            }, e.prototype.setAllDay = function(e, t) {
                void 0 === t && (t = {});
                var n = {
                        allDay: e
                    },
                    r = t.maintainDuration;
                null == r && (r = this._calendar.opt("allDayMaintainDuration")), this._def.allDay !== e && (n.hasEnd = r), this.mutate({
                    standardProps: n
                })
            }, e.prototype.formatRange = function(e) {
                var t = this._calendar.dateEnv,
                    n = this._instance,
                    r = Bt(e, this._calendar.opt("defaultRangeSeparator"));
                return this._def.hasEnd ? t.formatRange(n.range.start, n.range.end, r, {
                    forcedStartTzo: n.forcedStartTzo,
                    forcedEndTzo: n.forcedEndTzo
                }) : t.format(n.range.start, r, {
                    forcedTzo: n.forcedStartTzo
                })
            }, e.prototype.mutate = function(e) {
                var t = this._def,
                    n = this._instance;
                if (n) {
                    this._calendar.dispatch({
                        type: "MUTATE_EVENTS",
                        instanceId: n.instanceId,
                        mutation: e,
                        fromApi: !0
                    });
                    var r = this._calendar.state.eventStore;
                    this._def = r.defs[t.defId], this._instance = r.instances[n.instanceId]
                }
            }, e.prototype.remove = function() {
                this._calendar.dispatch({
                    type: "REMOVE_EVENT_DEF",
                    defId: this._def.defId
                })
            }, Object.defineProperty(e.prototype, "source", {
                get: function() {
                    var e = this._def.sourceId;
                    return e ? new zi(this._calendar, this._calendar.state.eventSources[e]) : null
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "start", {
                get: function() {
                    return this._instance ? this._calendar.dateEnv.toDate(this._instance.range.start) : null
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "end", {
                get: function() {
                    return this._instance && this._def.hasEnd ? this._calendar.dateEnv.toDate(this._instance.range.end) : null
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "id", {
                get: function() {
                    return this._def.publicId
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "groupId", {
                get: function() {
                    return this._def.groupId
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "allDay", {
                get: function() {
                    return this._def.allDay
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "title", {
                get: function() {
                    return this._def.title
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "url", {
                get: function() {
                    return this._def.url
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "rendering", {
                get: function() {
                    return this._def.rendering
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "startEditable", {
                get: function() {
                    return this._def.ui.startEditable
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "durationEditable", {
                get: function() {
                    return this._def.ui.durationEditable
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "constraint", {
                get: function() {
                    return this._def.ui.constraints[0] || null
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "overlap", {
                get: function() {
                    return this._def.ui.overlap
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "allow", {
                get: function() {
                    return this._def.ui.allows[0] || null
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "backgroundColor", {
                get: function() {
                    return this._def.ui.backgroundColor
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "borderColor", {
                get: function() {
                    return this._def.ui.borderColor
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "textColor", {
                get: function() {
                    return this._def.ui.textColor
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "classNames", {
                get: function() {
                    return this._def.ui.classNames
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "extendedProps", {
                get: function() {
                    return this._def.extendedProps
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(),
        Li = {
            editable: Boolean,
            startEditable: Boolean,
            durationEditable: Boolean,
            constraint: null,
            overlap: null,
            allow: null,
            className: Rn,
            classNames: Rn,
            color: String,
            backgroundColor: String,
            borderColor: String,
            textColor: String
        },
        Vi = {
            startEditable: null,
            durationEditable: null,
            constraints: [],
            overlap: null,
            allows: [],
            backgroundColor: "",
            borderColor: "",
            textColor: "",
            classNames: []
        },
        Bi = {
            id: String,
            groupId: String,
            title: String,
            url: String,
            rendering: String,
            extendedProps: null
        },
        Ai = {
            start: null,
            date: null,
            end: null,
            allDay: null
        },
        Fi = 0,
        Wi = {
            startTime: "09:00",
            endTime: "17:00",
            daysOfWeek: [1, 2, 3, 4, 5],
            rendering: "inverse-background",
            classNames: "fc-nonbusiness",
            groupId: "_businessHours"
        },
        Zi = vt(),
        ji = function() {
            function e() {
                this.getKeysForEventDefs = kt(this._getKeysForEventDefs), this.splitDateSelection = kt(this._splitDateSpan), this.splitEventStore = kt(this._splitEventStore), this.splitIndividualUi = kt(this._splitIndividualUi), this.splitEventDrag = kt(this._splitInteraction), this.splitEventResize = kt(this._splitInteraction), this.eventUiBuilders = {}
            }
            return e.prototype.splitProps = function(e) {
                var t = this,
                    n = this.getKeyInfo(e),
                    r = this.getKeysForEventDefs(e.eventStore),
                    i = this.splitDateSelection(e.dateSelection),
                    o = this.splitIndividualUi(e.eventUiBases, r),
                    a = this.splitEventStore(e.eventStore, r),
                    s = this.splitEventDrag(e.eventDrag),
                    u = this.splitEventResize(e.eventResize),
                    l = {};
                this.eventUiBuilders = it(n, function(e, n) {
                    return t.eventUiBuilders[n] || kt(Bn)
                });
                for (var c in n) {
                    var d = n[c],
                        f = a[c] || Zi,
                        p = this.eventUiBuilders[c];
                    l[c] = {
                        businessHours: d.businessHours || e.businessHours,
                        dateSelection: i[c] || null,
                        eventStore: f,
                        eventUiBases: p(e.eventUiBases[""], d.ui, o[c]),
                        eventSelection: f.instances[e.eventSelection] ? e.eventSelection : "",
                        eventDrag: s[c] || null,
                        eventResize: u[c] || null
                    }
                }
                return l
            }, e.prototype._splitDateSpan = function(e) {
                var t = {};
                if (e)
                    for (var n = this.getKeysForDateSpan(e), r = 0, i = n; r < i.length; r++) {
                        var o = i[r];
                        t[o] = e
                    }
                return t
            }, e.prototype._getKeysForEventDefs = function(e) {
                var t = this;
                return it(e.defs, function(e) {
                    return t.getKeysForEventDef(e)
                })
            }, e.prototype._splitEventStore = function(e, t) {
                var n = e.defs,
                    r = e.instances,
                    i = {};
                for (var o in n)
                    for (var a = 0, s = t[o]; a < s.length; a++) {
                        var u = s[a];
                        i[u] || (i[u] = vt()), i[u].defs[o] = n[o]
                    }
                for (var l in r)
                    for (var c = r[l], d = 0, f = t[c.defId]; d < f.length; d++) {
                        var u = f[d];
                        i[u] && (i[u].instances[l] = c)
                    }
                return i
            }, e.prototype._splitIndividualUi = function(e, t) {
                var n = {};
                for (var r in e)
                    if (r)
                        for (var i = 0, o = t[r]; i < o.length; i++) {
                            var a = o[i];
                            n[a] || (n[a] = {}), n[a][r] = e[r]
                        }
                return n
            }, e.prototype._splitInteraction = function(e) {
                var t = {};
                if (e) {
                    var n = this._splitEventStore(e.affectedEvents, this._getKeysForEventDefs(e.affectedEvents)),
                        r = this._getKeysForEventDefs(e.mutatedEvents),
                        i = this._splitEventStore(e.mutatedEvents, r),
                        o = function(r) {
                            t[r] || (t[r] = {
                                affectedEvents: n[r] || Zi,
                                mutatedEvents: i[r] || Zi,
                                isEvent: e.isEvent,
                                origSeg: e.origSeg
                            })
                        };
                    for (var a in n) o(a);
                    for (var a in i) o(a)
                }
                return t
            }, e
        }(),
        Yi = function() {
            function e() {}
            return e.mixInto = function(e) {
                this.mixIntoObj(e.prototype)
            }, e.mixIntoObj = function(e) {
                var t = this;
                Object.getOwnPropertyNames(this.prototype).forEach(function(n) {
                    e[n] || (e[n] = t.prototype[n])
                })
            }, e.mixOver = function(e) {
                var t = this;
                Object.getOwnPropertyNames(this.prototype).forEach(function(n) {
                    e.prototype[n] = t.prototype[n]
                })
            }, e
        }(),
        qi = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return $e(t, e), t.prototype.on = function(e, t) {
                return jn(this._handlers || (this._handlers = {}), e, t), this
            }, t.prototype.one = function(e, t) {
                return jn(this._oneHandlers || (this._oneHandlers = {}), e, t), this
            }, t.prototype.off = function(e, t) {
                return this._handlers && Yn(this._handlers, e, t), this._oneHandlers && Yn(this._oneHandlers, e, t), this
            }, t.prototype.trigger = function(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                return this.triggerWith(e, this, t), this
            }, t.prototype.triggerWith = function(e, t, n) {
                return this._handlers && je(this._handlers[e], t, n), this._oneHandlers && (je(this._oneHandlers[e], t, n), delete this._oneHandlers[e]), this
            }, t.prototype.hasHandlers = function(e) {
                return this._handlers && this._handlers[e] && this._handlers[e].length || this._oneHandlers && this._oneHandlers[e] && this._oneHandlers[e].length
            }, t
        }(Yi),
        Gi = function() {
            function e(e, t, n, r) {
                this.originEl = e, this.els = t, this.isHorizontal = n, this.isVertical = r
            }
            return e.prototype.build = function() {
                var e = this.originEl,
                    t = this.originClientRect = e.getBoundingClientRect();
                this.isHorizontal && this.buildElHorizontals(t.left), this.isVertical && this.buildElVerticals(t.top)
            }, e.prototype.buildElHorizontals = function(e) {
                for (var t = [], n = [], r = 0, i = this.els; r < i.length; r++) {
                    var o = i[r],
                        a = o.getBoundingClientRect();
                    t.push(a.left - e), n.push(a.right - e)
                }
                this.lefts = t, this.rights = n
            }, e.prototype.buildElVerticals = function(e) {
                for (var t = [], n = [], r = 0, i = this.els; r < i.length; r++) {
                    var o = i[r],
                        a = o.getBoundingClientRect();
                    t.push(a.top - e), n.push(a.bottom - e)
                }
                this.tops = t, this.bottoms = n
            }, e.prototype.leftToIndex = function(e) {
                var t, n = this.lefts,
                    r = this.rights,
                    i = n.length;
                for (t = 0; t < i; t++)
                    if (e >= n[t] && e < r[t]) return t
            }, e.prototype.topToIndex = function(e) {
                var t, n = this.tops,
                    r = this.bottoms,
                    i = n.length;
                for (t = 0; t < i; t++)
                    if (e >= n[t] && e < r[t]) return t
            }, e.prototype.getWidth = function(e) {
                return this.rights[e] - this.lefts[e]
            }, e.prototype.getHeight = function(e) {
                return this.bottoms[e] - this.tops[e]
            }, e
        }(),
        Xi = function() {
            function e() {}
            return e.prototype.getMaxScrollTop = function() {
                return this.getScrollHeight() - this.getClientHeight()
            }, e.prototype.getMaxScrollLeft = function() {
                return this.getScrollWidth() - this.getClientWidth()
            }, e.prototype.canScrollVertically = function() {
                return this.getMaxScrollTop() > 0
            }, e.prototype.canScrollHorizontally = function() {
                return this.getMaxScrollLeft() > 0
            }, e.prototype.canScrollUp = function() {
                return this.getScrollTop() > 0
            }, e.prototype.canScrollDown = function() {
                return this.getScrollTop() < this.getMaxScrollTop()
            }, e.prototype.canScrollLeft = function() {
                return this.getScrollLeft() > 0
            }, e.prototype.canScrollRight = function() {
                return this.getScrollLeft() < this.getMaxScrollLeft()
            }, e
        }(),
        Ji = function(e) {
            function t(t) {
                var n = e.call(this) || this;
                return n.el = t, n
            }
            return $e(t, e), t.prototype.getScrollTop = function() {
                return this.el.scrollTop
            }, t.prototype.getScrollLeft = function() {
                return this.el.scrollLeft
            }, t.prototype.setScrollTop = function(e) {
                this.el.scrollTop = e
            }, t.prototype.setScrollLeft = function(e) {
                this.el.scrollLeft = e
            }, t.prototype.getScrollWidth = function() {
                return this.el.scrollWidth
            }, t.prototype.getScrollHeight = function() {
                return this.el.scrollHeight
            }, t.prototype.getClientHeight = function() {
                return this.el.clientHeight
            }, t.prototype.getClientWidth = function() {
                return this.el.clientWidth
            }, t
        }(Xi),
        Ki = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return $e(t, e), t.prototype.getScrollTop = function() {
                return window.pageYOffset
            }, t.prototype.getScrollLeft = function() {
                return window.pageXOffset
            }, t.prototype.setScrollTop = function(e) {
                window.scroll(window.pageXOffset, e)
            }, t.prototype.setScrollLeft = function(e) {
                window.scroll(e, window.pageYOffset)
            }, t.prototype.getScrollWidth = function() {
                return document.documentElement.scrollWidth
            }, t.prototype.getScrollHeight = function() {
                return document.documentElement.scrollHeight
            }, t.prototype.getClientHeight = function() {
                return document.documentElement.clientHeight
            }, t.prototype.getClientWidth = function() {
                return document.documentElement.clientWidth
            }, t
        }(Xi),
        Qi = function(e) {
            function n(n, r) {
                var i = e.call(this, t("div", {
                    className: "fc-scroller"
                })) || this;
                return i.overflowX = n, i.overflowY = r, i.applyOverflow(), i
            }
            return $e(n, e), n.prototype.clear = function() {
                this.setHeight("auto"), this.applyOverflow()
            }, n.prototype.destroy = function() {
                c(this.el)
            }, n.prototype.applyOverflow = function() {
                g(this.el, {
                    overflowX: this.overflowX,
                    overflowY: this.overflowY
                })
            }, n.prototype.lockOverflow = function(e) {
                var t = this.overflowX,
                    n = this.overflowY;
                e = e || this.getScrollbarWidths(), "auto" === t && (t = e.bottom || this.canScrollHorizontally() ? "scroll" : "hidden"), "auto" === n && (n = e.left || e.right || this.canScrollVertically() ? "scroll" : "hidden"), g(this.el, {
                    overflowX: t,
                    overflowY: n
                })
            }, n.prototype.setHeight = function(e) {
                y(this.el, "height", e)
            }, n.prototype.getScrollbarWidths = function() {
                var e = C(this.el);
                return {
                    left: e.scrollbarLeft,
                    right: e.scrollbarRight,
                    bottom: e.scrollbarBottom
                }
            }, n
        }(Ji),
        $i = function() {
            function e(e) {
                this.calendarOptions = e, this.processIconOverride()
            }
            return e.prototype.processIconOverride = function() {
                this.iconOverrideOption && this.setIconOverride(this.calendarOptions[this.iconOverrideOption])
            }, e.prototype.setIconOverride = function(e) {
                var t, n;
                if ("object" == typeof e && e) {
                    t = wi({}, this.iconClasses);
                    for (n in e) t[n] = this.applyIconOverridePrefix(e[n]);
                    this.iconClasses = t
                } else !1 === e && (this.iconClasses = {})
            }, e.prototype.applyIconOverridePrefix = function(e) {
                var t = this.iconOverridePrefix;
                return t && 0 !== e.indexOf(t) && (e = t + e), e
            }, e.prototype.getClass = function(e) {
                return this.classes[e] || ""
            }, e.prototype.getIconClass = function(e) {
                var t = this.iconClasses[e];
                return t ? this.baseIconClass + " " + t : ""
            }, e.prototype.getCustomButtonIconClass = function(e) {
                var t;
                return this.iconOverrideCustomButtonOption && (t = e[this.iconOverrideCustomButtonOption]) ? this.baseIconClass + " " + this.applyIconOverridePrefix(t) : ""
            }, e
        }();
    $i.prototype.classes = {}, $i.prototype.iconClasses = {}, $i.prototype.baseIconClass = "", $i.prototype.iconOverridePrefix = "";
    var eo = 0,
        to = function() {
            function e(e, t) {
                t && (e.view = this), this.uid = String(eo++), this.context = e, this.dateEnv = e.dateEnv, this.theme = e.theme, this.view = e.view, this.calendar = e.calendar, this.isRtl = "rtl" === this.opt("dir")
            }
            return e.addEqualityFuncs = function(e) {
                this.prototype.equalityFuncs = wi({}, this.prototype.equalityFuncs, e)
            }, e.prototype.opt = function(e) {
                return this.context.options[e]
            }, e.prototype.receiveProps = function(e) {
                var t = qn(this.props || {}, e, this.equalityFuncs),
                    n = t.anyChanges,
                    r = t.comboProps;
                this.props = r, n && this.render(r)
            }, e.prototype.render = function(e) {}, e.prototype.destroy = function() {}, e
        }();
    to.prototype.equalityFuncs = {};
    var no = function(e) {
        function t(t, n, r) {
            var i = e.call(this, t, r) || this;
            return i.el = n, i
        }
        return $e(t, e), t.prototype.destroy = function() {
            e.prototype.destroy.call(this), c(this.el)
        }, t.prototype.buildPositionCaches = function() {}, t.prototype.queryHit = function(e, t, n, r) {
            return null
        }, t.prototype.isInteractionValid = function(e) {
            var t = this.calendar,
                n = this.props.dateProfile,
                r = e.mutatedEvents.instances;
            if (n)
                for (var i in r)
                    if (!wt(n.validRange, r[i].range)) return !1;
            return dn(e, t)
        }, t.prototype.isDateSelectionValid = function(e) {
            var t = this.props.dateProfile;
            return !(t && !wt(t.validRange, e.range)) && fn(e, this.calendar)
        }, t.prototype.publiclyTrigger = function(e, t) {
            return this.calendar.publiclyTrigger(e, t)
        }, t.prototype.publiclyTriggerAfterSizing = function(e, t) {
            return this.calendar.publiclyTriggerAfterSizing(e, t)
        }, t.prototype.hasPublicHandlers = function(e) {
            return this.calendar.hasPublicHandlers(e)
        }, t.prototype.triggerRenderedSegs = function(e, t) {
            var n = this.calendar;
            if (this.hasPublicHandlers("eventPositioned"))
                for (var r = 0, i = e; r < i.length; r++) {
                    var o = i[r];
                    this.publiclyTriggerAfterSizing("eventPositioned", [{
                        event: new Ui(n, o.eventRange.def, o.eventRange.instance),
                        isMirror: t,
                        isStart: o.isStart,
                        isEnd: o.isEnd,
                        el: o.el,
                        view: this
                    }])
                }
            n.state.loadingLevel || (n.afterSizingTriggers._eventsPositioned = [null])
        }, t.prototype.triggerWillRemoveSegs = function(e, t) {
            for (var n = this.calendar, r = 0, i = e; r < i.length; r++) {
                var o = i[r];
                n.trigger("eventElRemove", o.el)
            }
            if (this.hasPublicHandlers("eventDestroy"))
                for (var a = 0, s = e; a < s.length; a++) {
                    var o = s[a];
                    this.publiclyTrigger("eventDestroy", [{
                        event: new Ui(n, o.eventRange.def, o.eventRange.instance),
                        isMirror: t,
                        el: o.el,
                        view: this
                    }])
                }
        }, t.prototype.isValidSegDownEl = function(e) {
            return !this.props.eventDrag && !this.props.eventResize && !d(e, ".fc-mirror") && (this.isPopover() || !this.isInPopover(e))
        }, t.prototype.isValidDateDownEl = function(e) {
            var t = d(e, this.fgSegSelector);
            return (!t || t.classList.contains("fc-mirror")) && !d(e, ".fc-more") && !d(e, "a[data-goto]") && !this.isInPopover(e)
        }, t.prototype.isPopover = function() {
            return this.el.classList.contains("fc-popover")
        }, t.prototype.isInPopover = function(e) {
            return Boolean(d(e, ".fc-popover"))
        }, t
    }(to);
    no.prototype.fgSegSelector = ".fc-event-container > *", no.prototype.bgSegSelector = ".fc-bgevent:not(.fc-nonbusiness)";
    var ro = 0,
        io = function() {
            function e() {
                this.hooks = {
                    reducers: [],
                    eventDefParsers: [],
                    eventDragMutationMassagers: [],
                    eventDefMutationAppliers: [],
                    dateSelectionTransformers: [],
                    datePointTransforms: [],
                    dateSpanTransforms: [],
                    views: {},
                    viewPropsTransformers: [],
                    isPropsValid: null,
                    externalDefTransforms: [],
                    eventResizeJoinTransforms: [],
                    viewContainerModifiers: [],
                    eventDropTransformers: [],
                    componentInteractions: [],
                    calendarInteractions: [],
                    themeClasses: {},
                    eventSourceDefs: [],
                    cmdFormatter: null,
                    recurringTypes: [],
                    namedTimeZonedImpl: null,
                    defaultView: "",
                    elementDraggingImpl: null,
                    optionChangeHandlers: {}
                }, this.addedHash = {}
            }
            return e.prototype.add = function(e) {
                if (!this.addedHash[e.id]) {
                    this.addedHash[e.id] = !0;
                    for (var t = 0, n = e.deps; t < n.length; t++) {
                        var r = n[t];
                        this.add(r)
                    }
                    this.hooks = Xn(this.hooks, e)
                }
            }, e
        }(),
        oo = {
            ignoreRange: !0,
            parseMeta: function(e) {
                return Array.isArray(e) ? e : Array.isArray(e.events) ? e.events : null
            },
            fetch: function(e, t) {
                t({
                    rawEvents: e.eventSource.meta
                })
            }
        },
        ao = Gn({
            eventSourceDefs: [oo]
        }),
        so = {
            parseMeta: function(e) {
                return "function" == typeof e ? e : "function" == typeof e.events ? e.events : null
            },
            fetch: function(e, t, n) {
                var r = e.calendar.dateEnv;
                Zn(e.eventSource.meta.bind(null, {
                    start: r.toDate(e.range.start),
                    end: r.toDate(e.range.end),
                    startStr: r.formatIso(e.range.start),
                    endStr: r.formatIso(e.range.end),
                    timeZone: r.timeZone
                }), function(e) {
                    t({
                        rawEvents: e
                    })
                }, n)
            }
        },
        uo = Gn({
            eventSourceDefs: [so]
        }),
        lo = {
            parseMeta: function(e) {
                if ("string" == typeof e) e = {
                    url: e
                };
                else if (!e || "object" != typeof e || !e.url) return null;
                return {
                    url: e.url,
                    method: (e.method || "GET").toUpperCase(),
                    extraParams: e.extraParams,
                    startParam: e.startParam,
                    endParam: e.endParam,
                    timeZoneParam: e.timeZoneParam
                }
            },
            fetch: function(e, t, n) {
                var r = e.eventSource.meta,
                    i = $n(r, e.range, e.calendar);
                Jn(r.method, r.url, i, function(e, n) {
                    t({
                        rawEvents: e,
                        xhr: n
                    })
                }, function(e, t) {
                    n({
                        message: e,
                        xhr: t
                    })
                })
            }
        },
        co = Gn({
            eventSourceDefs: [lo]
        }),
        fo = {
            parse: function(e, t, n) {
                var r = n.createMarker.bind(n),
                    i = {
                        daysOfWeek: null,
                        startTime: ue,
                        endTime: ue,
                        startRecur: r,
                        endRecur: r
                    },
                    o = Ge(e, i, {}, t),
                    a = !1;
                for (var s in o)
                    if (null != o[s]) {
                        a = !0;
                        break
                    }
                if (a) {
                    var u = null;
                    return "duration" in t && (u = ue(t.duration), delete t.duration), !u && o.startTime && o.endTime && (u = ve(o.endTime, o.startTime)), {
                        allDayGuess: Boolean(!o.startTime && !o.endTime),
                        duration: u,
                        typeData: o
                    }
                }
                return null
            },
            expand: function(e, t, n) {
                var r = bt(t, {
                    start: e.startRecur,
                    end: e.endRecur
                });
                return r ? er(e.daysOfWeek, e.startTime, r, n) : []
            }
        },
        po = Gn({
            recurringTypes: [fo]
        }),
        ho = Gn({
            optionChangeHandlers: {
                events: function(e, t, n) {
                    tr([e], t, n)
                },
                eventSources: tr,
                plugins: nr
            }
        }),
        vo = {},
        go = {
            defaultRangeSeparator: " - ",
            titleRangeSeparator: " – ",
            defaultTimedEventDuration: "01:00:00",
            defaultAllDayEventDuration: {
                day: 1
            },
            forceEventDuration: !1,
            nextDayThreshold: "00:00:00",
            columnHeader: !0,
            defaultView: "",
            aspectRatio: 1.35,
            header: {
                left: "title",
                center: "",
                right: "today prev,next"
            },
            weekends: !0,
            weekNumbers: !1,
            weekNumberCalculation: "local",
            editable: !1,
            scrollTime: "06:00:00",
            minTime: "00:00:00",
            maxTime: "24:00:00",
            showNonCurrentDates: !0,
            lazyFetching: !0,
            startParam: "start",
            endParam: "end",
            timeZoneParam: "timeZone",
            timeZone: "local",
            locales: [],
            locale: "",
            timeGridEventMinHeight: 0,
            themeSystem: "standard",
            dragRevertDuration: 500,
            dragScroll: !0,
            allDayMaintainDuration: !1,
            unselectAuto: !0,
            dropAccept: "*",
            eventOrder: "start,-duration,allDay,title",
            eventLimit: !1,
            eventLimitClick: "popover",
            dayPopoverFormat: {
                month: "long",
                day: "numeric",
                year: "numeric"
            },
            handleWindowResize: !0,
            windowResizeDelay: 100,
            longPressDelay: 1e3,
            eventDragMinDistance: 5
        },
        yo = {
            header: {
                left: "next,prev today",
                center: "",
                right: "title"
            },
            buttonIcons: {
                prev: "fc-icon-chevron-right",
                next: "fc-icon-chevron-left",
                prevYear: "fc-icon-chevrons-right",
                nextYear: "fc-icon-chevrons-left"
            }
        },
        mo = ["header", "footer", "buttonText", "buttonIcons"],
        Eo = [ao, uo, co, po, ho],
        So = {
            code: "en",
            week: {
                dow: 0,
                doy: 4
            },
            dir: "ltr",
            buttonText: {
                prev: "prev",
                next: "next",
                prevYear: "prev year",
                nextYear: "next year",
                year: "year",
                today: "today",
                month: "month",
                week: "week",
                day: "day",
                list: "list"
            },
            weekLabel: "W",
            allDayText: "all-day",
            eventLimitText: "more",
            noEventsMessage: "No events to display"
        },
        bo = function() {
            function e(e) {
                this.overrides = wi({}, e), this.dynamicOverrides = {}, this.compute()
            }
            return e.prototype.mutate = function(e, t, n) {
                var r = n ? this.dynamicOverrides : this.overrides;
                wi(r, e);
                for (var i = 0, o = t; i < o.length; i++) {
                    delete r[o[i]]
                }
                this.compute()
            }, e.prototype.compute = function() {
                var e = Ye(this.dynamicOverrides.locales, this.overrides.locales, go.locales),
                    t = Ye(this.dynamicOverrides.locale, this.overrides.locale, go.locale),
                    n = or(e),
                    r = ar(t || n.defaultCode, n.map).options,
                    i = Ye(this.dynamicOverrides.dir, this.overrides.dir, r.dir),
                    o = "rtl" === i ? yo : {};
                this.dirDefaults = o, this.localeDefaults = r, this.computed = rr([go, o, r, this.overrides, this.dynamicOverrides])
            }, e
        }(),
        To = {},
        Do = function() {
            function e() {}
            return e.prototype.getMarkerYear = function(e) {
                return e.getUTCFullYear()
            }, e.prototype.getMarkerMonth = function(e) {
                return e.getUTCMonth()
            }, e.prototype.getMarkerDay = function(e) {
                return e.getUTCDate()
            }, e.prototype.arrayToMarker = function(e) {
                return oe(e)
            }, e.prototype.markerToArray = function(e) {
                return ie(e)
            }, e
        }();
    ! function(e, t) {
        To[e] = t
    }("gregory", Do);
    var wo = /^\s*(\d{4})(-(\d{2})(-(\d{2})([T ](\d{2}):(\d{2})(:(\d{2})(\.(\d+))?)?(Z|(([-+])(\d{2})(:?(\d{2}))?))?)?)?)?$/,
        Ro = function() {
            function e(e) {
                var t = this.timeZone = e.timeZone,
                    n = "local" !== t && "UTC" !== t;
                e.namedTimeZoneImpl && n && (this.namedTimeZoneImpl = new e.namedTimeZoneImpl(t)), this.canComputeOffset = Boolean(!n || this.namedTimeZoneImpl), this.calendarSystem = cr(e.calendarSystem), this.locale = e.locale, this.weekDow = e.locale.week.dow, this.weekDoy = e.locale.week.doy, "ISO" === e.weekNumberCalculation ? (this.weekDow = 1, this.weekDoy = 4) : "number" == typeof e.firstDay && (this.weekDow = e.firstDay), "function" == typeof e.weekNumberCalculation && (this.weekNumberFunc = e.weekNumberCalculation), this.weekLabel = null != e.weekLabel ? e.weekLabel : e.locale.options.weekLabel, this.cmdFormatter = e.cmdFormatter
            }
            return e.prototype.createMarker = function(e) {
                var t = this.createMarkerMeta(e);
                return null === t ? null : t.marker
            }, e.prototype.createNowMarker = function() {
                return this.canComputeOffset ? this.timestampToMarker((new Date).valueOf()) : oe(ne(new Date))
            }, e.prototype.createMarkerMeta = function(e) {
                if ("string" == typeof e) return this.parse(e);
                var t = null;
                return "number" == typeof e ? t = this.timestampToMarker(e) : e instanceof Date ? (e = e.valueOf(), isNaN(e) || (t = this.timestampToMarker(e))) : Array.isArray(e) && (t = oe(e)), null !== t && ae(t) ? {
                    marker: t,
                    isTimeUnspecified: !1,
                    forcedTzo: null
                } : null
            }, e.prototype.parse = function(e) {
                var t = dr(e);
                if (null === t) return null;
                var n = t.marker,
                    r = null;
                return null !== t.timeZoneOffset && (this.canComputeOffset ? n = this.timestampToMarker(n.valueOf() - 60 * t.timeZoneOffset * 1e3) : r = t.timeZoneOffset), {
                    marker: n,
                    isTimeUnspecified: t.isTimeUnspecified,
                    forcedTzo: r
                }
            }, e.prototype.getYear = function(e) {
                return this.calendarSystem.getMarkerYear(e)
            }, e.prototype.getMonth = function(e) {
                return this.calendarSystem.getMarkerMonth(e)
            }, e.prototype.add = function(e, t) {
                var n = this.calendarSystem.markerToArray(e);
                return n[0] += t.years, n[1] += t.months, n[2] += t.days, n[6] += t.milliseconds, this.calendarSystem.arrayToMarker(n)
            }, e.prototype.subtract = function(e, t) {
                var n = this.calendarSystem.markerToArray(e);
                return n[0] -= t.years, n[1] -= t.months, n[2] -= t.days, n[6] -= t.milliseconds, this.calendarSystem.arrayToMarker(n)
            }, e.prototype.addYears = function(e, t) {
                var n = this.calendarSystem.markerToArray(e);
                return n[0] += t, this.calendarSystem.arrayToMarker(n)
            }, e.prototype.addMonths = function(e, t) {
                var n = this.calendarSystem.markerToArray(e);
                return n[1] += t, this.calendarSystem.arrayToMarker(n)
            }, e.prototype.diffWholeYears = function(e, t) {
                var n = this.calendarSystem;
                return se(e) === se(t) && n.getMarkerDay(e) === n.getMarkerDay(t) && n.getMarkerMonth(e) === n.getMarkerMonth(t) ? n.getMarkerYear(t) - n.getMarkerYear(e) : null
            }, e.prototype.diffWholeMonths = function(e, t) {
                var n = this.calendarSystem;
                return se(e) === se(t) && n.getMarkerDay(e) === n.getMarkerDay(t) ? n.getMarkerMonth(t) - n.getMarkerMonth(e) + 12 * (n.getMarkerYear(t) - n.getMarkerYear(e)) : null
            }, e.prototype.greatestWholeUnit = function(e, t) {
                var n = this.diffWholeYears(e, t);
                return null !== n ? {
                    unit: "year",
                    value: n
                } : null !== (n = this.diffWholeMonths(e, t)) ? {
                    unit: "month",
                    value: n
                } : null !== (n = q(e, t)) ? {
                    unit: "week",
                    value: n
                } : null !== (n = G(e, t)) ? {
                    unit: "day",
                    value: n
                } : (n = W(e, t), Ze(n) ? {
                    unit: "hour",
                    value: n
                } : (n = Z(e, t), Ze(n) ? {
                    unit: "minute",
                    value: n
                } : (n = j(e, t), Ze(n) ? {
                    unit: "second",
                    value: n
                } : {
                    unit: "millisecond",
                    value: t.valueOf() - e.valueOf()
                })))
            }, e.prototype.countDurationsBetween = function(e, t, n) {
                var r;
                return n.years && null !== (r = this.diffWholeYears(e, t)) ? r / ye(n) : n.months && null !== (r = this.diffWholeMonths(e, t)) ? r / me(n) : n.days && null !== (r = G(e, t)) ? r / Ee(n) : (t.valueOf() - e.valueOf()) / Te(n)
            }, e.prototype.startOf = function(e, t) {
                return "year" === t ? this.startOfYear(e) : "month" === t ? this.startOfMonth(e) : "week" === t ? this.startOfWeek(e) : "day" === t ? X(e) : "hour" === t ? J(e) : "minute" === t ? K(e) : "second" === t ? Q(e) : void 0
            }, e.prototype.startOfYear = function(e) {
                return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(e)])
            }, e.prototype.startOfMonth = function(e) {
                return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(e), this.calendarSystem.getMarkerMonth(e)])
            }, e.prototype.startOfWeek = function(e) {
                return this.calendarSystem.arrayToMarker([this.calendarSystem.getMarkerYear(e), this.calendarSystem.getMarkerMonth(e), e.getUTCDate() - (e.getUTCDay() - this.weekDow + 7) % 7])
            }, e.prototype.computeWeekNumber = function(e) {
                return this.weekNumberFunc ? this.weekNumberFunc(this.toDate(e)) : $(e, this.weekDow, this.weekDoy)
            }, e.prototype.format = function(e, t, n) {
                return void 0 === n && (n = {}), t.format({
                    marker: e,
                    timeZoneOffset: null != n.forcedTzo ? n.forcedTzo : this.offsetForMarker(e)
                }, this)
            }, e.prototype.formatRange = function(e, t, n, r) {
                return void 0 === r && (r = {}), r.isEndExclusive && (t = B(t, -1)), n.formatRange({
                    marker: e,
                    timeZoneOffset: null != r.forcedStartTzo ? r.forcedStartTzo : this.offsetForMarker(e)
                }, {
                    marker: t,
                    timeZoneOffset: null != r.forcedEndTzo ? r.forcedEndTzo : this.offsetForMarker(t)
                }, this)
            }, e.prototype.formatIso = function(e, t) {
                void 0 === t && (t = {});
                var n = null;
                return t.omitTimeZoneOffset || (n = null != t.forcedTzo ? t.forcedTzo : this.offsetForMarker(e)), At(e, n, t.omitTime)
            }, e.prototype.timestampToMarker = function(e) {
                return "local" === this.timeZone ? oe(ne(new Date(e))) : "UTC" !== this.timeZone && this.namedTimeZoneImpl ? oe(this.namedTimeZoneImpl.timestampToArray(e)) : new Date(e)
            }, e.prototype.offsetForMarker = function(e) {
                return "local" === this.timeZone ? -re(ie(e)).getTimezoneOffset() : "UTC" === this.timeZone ? 0 : this.namedTimeZoneImpl ? this.namedTimeZoneImpl.offsetForArray(ie(e)) : null
            }, e.prototype.toDate = function(e, t) {
                return "local" === this.timeZone ? re(ie(e)) : "UTC" === this.timeZone ? new Date(e.valueOf()) : this.namedTimeZoneImpl ? new Date(e.valueOf() - 1e3 * this.namedTimeZoneImpl.offsetForArray(ie(e)) * 60) : new Date(e.valueOf() - (t || 0))
            }, e
        }(),
        Io = {
            id: String,
            allDayDefault: Boolean,
            eventDataTransform: Function,
            success: Function,
            failure: Function
        },
        Co = 0,
        Mo = 0,
        ko = function() {
            function e(e, t) {
                this.viewSpec = e, this.options = e.options, this.dateEnv = t.dateEnv, this.calendar = t, this.initHiddenDays()
            }
            return e.prototype.buildPrev = function(e, t) {
                var n = this.dateEnv,
                    r = n.subtract(n.startOf(t, e.currentRangeUnit), e.dateIncrement);
                return this.build(r, -1)
            }, e.prototype.buildNext = function(e, t) {
                var n = this.dateEnv,
                    r = n.add(n.startOf(t, e.currentRangeUnit), e.dateIncrement);
                return this.build(r, 1)
            }, e.prototype.build = function(e, t, n) {
                void 0 === n && (n = !1);
                var r, i, o, a, s, u, l = null,
                    c = null;
                return r = this.buildValidRange(), r = this.trimHiddenDays(r), n && (e = It(e, r)), i = this.buildCurrentRangeInfo(e, t), o = /^(year|month|week|day)$/.test(i.unit), a = this.buildRenderRange(this.trimHiddenDays(i.range), i.unit, o), a = this.trimHiddenDays(a), s = a, this.options.showNonCurrentDates || (s = bt(s, i.range)), l = ue(this.options.minTime), c = ue(this.options.maxTime), s = this.adjustActiveRange(s, l, c), s = bt(s, r), u = Dt(i.range, r), {
                    validRange: r,
                    currentRange: i.range,
                    currentRangeUnit: i.unit,
                    isRangeAllDay: o,
                    activeRange: s,
                    renderRange: a,
                    minTime: l,
                    maxTime: c,
                    isValid: u,
                    dateIncrement: this.buildDateIncrement(i.duration)
                }
            }, e.prototype.buildValidRange = function() {
                return this.getRangeOption("validRange", this.calendar.getNow()) || {
                    start: null,
                    end: null
                }
            }, e.prototype.buildCurrentRangeInfo = function(e, t) {
                var n, r = this,
                    i = r.viewSpec,
                    o = r.dateEnv,
                    a = null,
                    s = null,
                    u = null;
                return i.duration ? (a = i.duration, s = i.durationUnit, u = this.buildRangeFromDuration(e, t, a, s)) : (n = this.options.dayCount) ? (s = "day", u = this.buildRangeFromDayCount(e, t, n)) : (u = this.buildCustomVisibleRange(e)) ? s = o.greatestWholeUnit(u.start, u.end).unit : (a = this.getFallbackDuration(), s = we(a).unit, u = this.buildRangeFromDuration(e, t, a, s)), {
                    duration: a,
                    unit: s,
                    range: u
                }
            }, e.prototype.getFallbackDuration = function() {
                return ue({
                    day: 1
                })
            }, e.prototype.adjustActiveRange = function(e, t, n) {
                var r = this.dateEnv,
                    i = e.start,
                    o = e.end;
                return this.viewSpec.class.prototype.usesMinMaxTime && (Ee(t) < 0 && (i = X(i), i = r.add(i, t)), Ee(n) > 1 && (o = X(o), o = V(o, -1), o = r.add(o, n))), {
                    start: i,
                    end: o
                }
            }, e.prototype.buildRangeFromDuration = function(e, t, n, r) {
                function i() {
                    s = c.startOf(e, d), u = c.add(s, n), l = {
                        start: s,
                        end: u
                    }
                }
                var o, a, s, u, l, c = this.dateEnv,
                    d = this.options.dateAlignment;
                return d || (o = this.options.dateIncrement, o ? (a = ue(o), d = Te(a) < Te(n) ? we(a, !de(o)).unit : r) : d = r), Ee(n) <= 1 && this.isHiddenDay(s) && (s = this.skipHiddenDays(s, t), s = X(s)), i(), this.trimHiddenDays(l) || (e = this.skipHiddenDays(e, t), i()), l
            }, e.prototype.buildRangeFromDayCount = function(e, t, n) {
                var r, i = this.dateEnv,
                    o = this.options.dateAlignment,
                    a = 0,
                    s = e;
                o && (s = i.startOf(s, o)), s = X(s), s = this.skipHiddenDays(s, t), r = s;
                do {
                    r = V(r, 1), this.isHiddenDay(r) || a++
                } while (a < n);
                return {
                    start: s,
                    end: r
                }
            }, e.prototype.buildCustomVisibleRange = function(e) {
                var t = this.dateEnv,
                    n = this.getRangeOption("visibleRange", t.toDate(e));
                return !n || null != n.start && null != n.end ? n : null
            }, e.prototype.buildRenderRange = function(e, t, n) {
                return e
            }, e.prototype.buildDateIncrement = function(e) {
                var t, n = this.options.dateIncrement;
                return n ? ue(n) : (t = this.options.dateAlignment) ? ue(1, t) : e || ue({
                    days: 1
                })
            }, e.prototype.getRangeOption = function(e) {
                for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                var r = this.options[e];
                return "function" == typeof r && (r = r.apply(null, t)), r && (r = mt(r, this.dateEnv)), r && (r = Je(r)), r
            }, e.prototype.initHiddenDays = function() {
                var e, t = this.options.hiddenDays || [],
                    n = [],
                    r = 0;
                for (!1 === this.options.weekends && t.push(0, 6), e = 0; e < 7; e++)(n[e] = -1 !== t.indexOf(e)) || r++;
                if (!r) throw new Error("invalid hiddenDays");
                this.isHiddenDayHash = n
            }, e.prototype.trimHiddenDays = function(e) {
                var t = e.start,
                    n = e.end;
                return t && (t = this.skipHiddenDays(t)), n && (n = this.skipHiddenDays(n, -1, !0)), null == t || null == n || t < n ? {
                    start: t,
                    end: n
                } : null
            }, e.prototype.isHiddenDay = function(e) {
                return e instanceof Date && (e = e.getUTCDay()), this.isHiddenDayHash[e]
            }, e.prototype.skipHiddenDays = function(e, t, n) {
                for (void 0 === t && (t = 1), void 0 === n && (n = !1); this.isHiddenDayHash[(e.getUTCDay() + (n ? t : 0) + 7) % 7];) e = V(e, t);
                return e
            }, e
        }(),
        Oo = {
            start: null,
            end: null,
            allDay: Boolean
        },
        _o = {
            type: String,
            class: null
        },
        Po = function(e) {
            function r(n, r) {
                var i = e.call(this, n) || this;
                return i._renderLayout = Vn(i.renderLayout, i.unrenderLayout), i._updateTitle = Vn(i.updateTitle, null, [i._renderLayout]), i._updateActiveButton = Vn(i.updateActiveButton, null, [i._renderLayout]), i._updateToday = Vn(i.updateToday, null, [i._renderLayout]), i._updatePrev = Vn(i.updatePrev, null, [i._renderLayout]), i._updateNext = Vn(i.updateNext, null, [i._renderLayout]), i.el = t("div", {
                    className: "fc-toolbar " + r
                }), i
            }
            return $e(r, e), r.prototype.destroy = function() {
                e.prototype.destroy.call(this), this._renderLayout.unrender(), c(this.el)
            }, r.prototype.render = function(e) {
                this._renderLayout(e.layout), this._updateTitle(e.title), this._updateActiveButton(e.activeButton), this._updateToday(e.isTodayEnabled), this._updatePrev(e.isPrevEnabled), this._updateNext(e.isNextEnabled)
            }, r.prototype.renderLayout = function(e) {
                var t = this.el;
                this.viewsWithButtons = [], a(t, this.renderSection("left", e.left)), a(t, this.renderSection("center", e.center)), a(t, this.renderSection("right", e.right))
            }, r.prototype.unrenderLayout = function() {
                this.el.innerHTML = ""
            }, r.prototype.renderSection = function(e, r) {
                var i = this,
                    o = this,
                    s = o.theme,
                    u = o.calendar,
                    l = u.optionsManager,
                    c = u.viewSpecs,
                    d = t("div", {
                        className: "fc-" + e
                    }),
                    f = l.computed.customButtons || {},
                    p = l.overrides.buttonText || {},
                    h = l.computed.buttonText || {};
                return r && r.split(" ").forEach(function(e, t) {
                    var r, o = [],
                        l = !0;
                    if (e.split(",").forEach(function(e, t) {
                            var r, a, d, v, g, y, m, E, S;
                            "title" === e ? (o.push(n("<h2>&nbsp;</h2>")), l = !1) : ((r = f[e]) ? (d = function(e) {
                                r.click && r.click.call(E, e)
                            }, (v = s.getCustomButtonIconClass(r)) || (v = s.getIconClass(e)) || (g = r.text)) : (a = c[e]) ? (i.viewsWithButtons.push(e), d = function() {
                                u.changeView(e)
                            }, (g = a.buttonTextOverride) || (v = s.getIconClass(e)) || (g = a.buttonTextDefault)) : u[e] && (d = function() {
                                u[e]()
                            }, (g = p[e]) || (v = s.getIconClass(e)) || (g = h[e])), d && (m = ["fc-" + e + "-button", s.getClass("button")], g ? (y = Tn(g), S = "") : v && (y = "<span class='" + v + "'></span>", S = ' aria-label="' + e + '"'), E = n('<button type="button" class="' + m.join(" ") + '"' + S + ">" + y + "</button>"), E.addEventListener("click", d), o.push(E)))
                        }), o.length > 1) {
                        r = document.createElement("div");
                        var v = s.getClass("buttonGroup");
                        l && v && r.classList.add(v), a(r, o), d.appendChild(r)
                    } else a(d, o)
                }), d
            }, r.prototype.updateToday = function(e) {
                this.toggleButtonEnabled("today", e)
            }, r.prototype.updatePrev = function(e) {
                this.toggleButtonEnabled("prev", e)
            }, r.prototype.updateNext = function(e) {
                this.toggleButtonEnabled("next", e)
            }, r.prototype.updateTitle = function(e) {
                p(this.el, "h2").forEach(function(t) {
                    t.innerText = e
                })
            }, r.prototype.updateActiveButton = function(e) {
                var t = this.theme.getClass("buttonActive");
                p(this.el, "button").forEach(function(n) {
                    e && n.classList.contains("fc-" + e + "-button") ? n.classList.add(t) : n.classList.remove(t)
                })
            }, r.prototype.toggleButtonEnabled = function(e, t) {
                p(this.el, ".fc-" + e + "-button").forEach(function(e) {
                    e.disabled = !t
                })
            }, r
        }(to),
        xo = function(e) {
            function n(n, r) {
                var i = e.call(this, n) || this;
                i._renderToolbars = Vn(i.renderToolbars), i.buildViewPropTransformers = kt(Kr), i.el = r, s(r, i.contentEl = t("div", {
                    className: "fc-view-container"
                }));
                for (var o = i.calendar, a = 0, u = o.pluginSystem.hooks.viewContainerModifiers; a < u.length; a++) {
                    (0, u[a])(i.contentEl, o)
                }
                return i.toggleElClassNames(!0), i.computeTitle = kt(Xr), i.parseBusinessHours = kt(function(e) {
                    return Un(e, i.calendar)
                }), i
            }
            return $e(n, e), n.prototype.destroy = function() {
                this.header && this.header.destroy(), this.footer && this.footer.destroy(), this.view && this.view.destroy(), c(this.contentEl), this.toggleElClassNames(!1), e.prototype.destroy.call(this)
            }, n.prototype.toggleElClassNames = function(e) {
                var t = this.el.classList,
                    n = "fc-" + this.opt("dir"),
                    r = this.theme.getClass("widget");
                e ? (t.add("fc"), t.add(n), t.add(r)) : (t.remove("fc"), t.remove(n), t.remove(r))
            }, n.prototype.render = function(e) {
                this.freezeHeight();
                var t = this.computeTitle(e.dateProfile, e.viewSpec.options);
                this._renderToolbars(e.viewSpec, e.dateProfile, e.currentDate, e.dateProfileGenerator, t), this.renderView(e, t), this.updateSize(), this.thawHeight()
            }, n.prototype.renderToolbars = function(e, t, n, r, i) {
                var o = this.opt("header"),
                    u = this.opt("footer"),
                    l = this.calendar.getNow(),
                    c = r.build(l),
                    d = r.buildPrev(t, n),
                    f = r.buildNext(t, n),
                    p = {
                        title: i,
                        activeButton: e.type,
                        isTodayEnabled: c.isValid && !Rt(t.currentRange, l),
                        isPrevEnabled: d.isValid,
                        isNextEnabled: f.isValid
                    };
                o ? (this.header || (this.header = new Po(this.context, "fc-header-toolbar"), s(this.el, this.header.el)), this.header.receiveProps(wi({
                    layout: o
                }, p))) : this.header && (this.header.destroy(), this.header = null), u ? (this.footer || (this.footer = new Po(this.context, "fc-footer-toolbar"), a(this.el, this.footer.el)), this.footer.receiveProps(wi({
                    layout: u
                }, p))) : this.footer && (this.footer.destroy(), this.footer = null)
            }, n.prototype.renderView = function(e, t) {
                var n = this.view,
                    r = e.viewSpec,
                    i = e.dateProfileGenerator;
                n && n.viewSpec === r ? n.addScroll(n.queryScroll()) : (n && n.destroy(), n = this.view = new r.class({
                    calendar: this.calendar, view: null, dateEnv: this.dateEnv, theme: this.theme, options: r.options
                }, r, i, this.contentEl)), n.title = t;
                for (var o = {
                        dateProfile: e.dateProfile,
                        businessHours: this.parseBusinessHours(r.options.businessHours),
                        eventStore: e.eventStore,
                        eventUiBases: e.eventUiBases,
                        dateSelection: e.dateSelection,
                        eventSelection: e.eventSelection,
                        eventDrag: e.eventDrag,
                        eventResize: e.eventResize
                    }, a = this.buildViewPropTransformers(this.calendar.pluginSystem.hooks.viewPropsTransformers), s = 0, u = a; s < u.length; s++) {
                    var l = u[s];
                    wi(o, l.transform(o, r, e, n))
                }
                n.receiveProps(o)
            }, n.prototype.updateSize = function(e) {
                void 0 === e && (e = !1);
                var t = this.view;
                e && t.addScroll(t.queryScroll()), (e || null == this.isHeightAuto) && this.computeHeightVars(), t.updateSize(e, this.viewHeight, this.isHeightAuto), t.updateNowIndicator(), t.popScroll(e)
            }, n.prototype.computeHeightVars = function() {
                var e = this.calendar,
                    t = e.opt("height"),
                    n = e.opt("contentHeight");
                this.isHeightAuto = "auto" === t || "auto" === n, this.viewHeight = "number" == typeof n ? n : "function" == typeof n ? n() : "number" == typeof t ? t - this.queryToolbarsHeight() : "function" == typeof t ? t() - this.queryToolbarsHeight() : "parent" === t ? this.el.parentNode.offsetHeight - this.queryToolbarsHeight() : Math.round(this.contentEl.offsetWidth / Math.max(e.opt("aspectRatio"), .5))
            }, n.prototype.queryToolbarsHeight = function() {
                var e = 0;
                return this.header && (e += _(this.header.el)), this.footer && (e += _(this.footer.el)), e
            }, n.prototype.freezeHeight = function() {
                g(this.el, {
                    height: this.el.offsetHeight,
                    overflow: "hidden"
                })
            }, n.prototype.thawHeight = function() {
                g(this.el, {
                    height: "",
                    overflow: ""
                })
            }, n
        }(to),
        Ho = function() {
            function e(e) {
                this.component = e.component
            }
            return e.prototype.destroy = function() {}, e
        }(),
        No = {},
        zo = function(e) {
            function t(t) {
                var n = e.call(this, t) || this;
                n.handleSegClick = function(e, t) {
                    var r = n.component,
                        i = Jt(t);
                    if (i && r.isValidSegDownEl(e.target)) {
                        var o = d(e.target, ".fc-has-url"),
                            a = o ? o.querySelector("a[href]").href : "";
                        r.publiclyTrigger("eventClick", [{
                            el: t,
                            event: new Ui(r.calendar, i.eventRange.def, i.eventRange.instance),
                            jsEvent: e,
                            view: r.view
                        }]), a && !e.defaultPrevented && (window.location.href = a)
                    }
                };
                var r = t.component;
                return n.destroy = N(r.el, "click", r.fgSegSelector + "," + r.bgSegSelector, n.handleSegClick), n
            }
            return $e(t, e), t
        }(Ho),
        Uo = function(e) {
            function t(t) {
                var n = e.call(this, t) || this;
                n.handleEventElRemove = function(e) {
                    e === n.currentSegEl && n.handleSegLeave(null, n.currentSegEl)
                }, n.handleSegEnter = function(e, t) {
                    Jt(t) && (t.classList.add("fc-allow-mouse-resize"), n.currentSegEl = t, n.triggerEvent("eventMouseEnter", e, t))
                }, n.handleSegLeave = function(e, t) {
                    n.currentSegEl && (t.classList.remove("fc-allow-mouse-resize"), n.currentSegEl = null, n.triggerEvent("eventMouseLeave", e, t))
                };
                var r = t.component;
                return n.removeHoverListeners = z(r.el, r.fgSegSelector + "," + r.bgSegSelector, n.handleSegEnter, n.handleSegLeave), r.calendar.on("eventElRemove", n.handleEventElRemove), n
            }
            return $e(t, e), t.prototype.destroy = function() {
                this.removeHoverListeners(), this.component.calendar.off("eventElRemove", this.handleEventElRemove)
            }, t.prototype.triggerEvent = function(e, t, n) {
                var r = this.component,
                    i = Jt(n);
                t && !r.isValidSegDownEl(t.target) || r.publiclyTrigger(e, [{
                    el: n,
                    event: new Ui(this.component.calendar, i.eventRange.def, i.eventRange.instance),
                    jsEvent: t,
                    view: r.view
                }])
            }, t
        }(Ho),
        Lo = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return $e(t, e), t
        }($i);
    Lo.prototype.classes = {
        widget: "fc-unthemed",
        widgetHeader: "fc-widget-header",
        widgetContent: "fc-widget-content",
        buttonGroup: "fc-button-group",
        button: "fc-button fc-button-primary",
        buttonActive: "fc-button-active",
        popoverHeader: "fc-widget-header",
        popoverContent: "fc-widget-content",
        headerRow: "fc-widget-header",
        dayRow: "fc-widget-content",
        listView: "fc-widget-content"
    }, Lo.prototype.baseIconClass = "fc-icon", Lo.prototype.iconClasses = {
        close: "fc-icon-x",
        prev: "fc-icon-chevron-left",
        next: "fc-icon-chevron-right",
        prevYear: "fc-icon-chevrons-left",
        nextYear: "fc-icon-chevrons-right"
    }, Lo.prototype.iconOverrideOption = "buttonIcons", Lo.prototype.iconOverrideCustomButtonOption = "icon", Lo.prototype.iconOverridePrefix = "fc-icon-";
    var Vo = function() {
        function e(e, t) {
            var n = this;
            this.parseRawLocales = kt(or), this.buildLocale = kt(ar), this.buildDateEnv = kt(ei), this.buildTheme = kt(ti), this.buildEventUiSingleBase = kt(this._buildEventUiSingleBase), this.buildSelectionConfig = kt(this._buildSelectionConfig), this.buildEventUiBySource = Ot(ri, st), this.buildEventUiBases = kt(ii), this.interactionsStore = {}, this.actionQueue = [], this.isReducing = !1, this.needsRerender = !1, this.needsFullRerender = !1, this.isRendering = !1, this.renderingPauseDepth = 0, this.buildDelayedRerender = kt(ni), this.afterSizingTriggers = {}, this.isViewUpdated = !1, this.isDatesUpdated = !1, this.isEventsUpdated = !1, this.el = e, this.optionsManager = new bo(t || {}), this.pluginSystem = new io, this.addPluginInputs(this.optionsManager.computed.plugins || []), this.handleOptions(this.optionsManager.computed), this.publiclyTrigger("_init"), this.hydrate(), this.calendarInteractions = this.pluginSystem.hooks.calendarInteractions.map(function(e) {
                return new e(n)
            })
        }
        return e.prototype.addPluginInputs = function(e) {
            for (var t = ir(e), n = 0, r = t; n < r.length; n++) {
                var i = r[n];
                this.pluginSystem.add(i)
            }
        }, Object.defineProperty(e.prototype, "view", {
            get: function() {
                return this.component ? this.component.view : null
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.render = function() {
            this.component ? this.requestRerender(!0) : (this.renderableEventStore = vt(), this.bindHandlers(), this.executeRender())
        }, e.prototype.destroy = function() {
            if (this.component) {
                this.unbindHandlers(), this.component.destroy(), this.component = null;
                for (var e = 0, t = this.calendarInteractions; e < t.length; e++) {
                    t[e].destroy()
                }
                this.publiclyTrigger("_destroyed")
            }
        }, e.prototype.bindHandlers = function() {
            var e = this;
            this.removeNavLinkListener = N(this.el, "click", "a[data-goto]", function(t, n) {
                var r = n.getAttribute("data-goto");
                r = r ? JSON.parse(r) : {};
                var i = e.dateEnv,
                    o = i.createMarker(r.date),
                    a = r.type,
                    s = e.viewOpt("navLink" + Ae(a) + "Click");
                "function" == typeof s ? s(i.toDate(o), t) : ("string" == typeof s && (a = s), e.zoomTo(o, a))
            }), this.opt("handleWindowResize") && window.addEventListener("resize", this.windowResizeProxy = qe(this.windowResize.bind(this), this.opt("windowResizeDelay")))
        }, e.prototype.unbindHandlers = function() {
            this.removeNavLinkListener(), this.windowResizeProxy && (window.removeEventListener("resize", this.windowResizeProxy), this.windowResizeProxy = null)
        }, e.prototype.hydrate = function() {
            var e = this;
            this.state = this.buildInitialState();
            var t = this.opt("eventSources") || [],
                n = this.opt("events"),
                r = [];
            n && t.unshift(n);
            for (var i = 0, o = t; i < o.length; i++) {
                var a = o[i],
                    s = pr(a, this);
                s && r.push(s)
            }
            this.batchRendering(function() {
                e.dispatch({
                    type: "INIT"
                }), e.dispatch({
                    type: "ADD_EVENT_SOURCES",
                    sources: r
                }), e.dispatch({
                    type: "SET_VIEW_TYPE",
                    viewType: e.opt("defaultView") || e.pluginSystem.hooks.defaultView
                })
            })
        }, e.prototype.buildInitialState = function() {
            return {
                viewType: null,
                loadingLevel: 0,
                eventSourceLoadingLevel: 0,
                currentDate: this.getInitialDate(),
                dateProfile: null,
                eventSources: {},
                eventStore: vt(),
                dateSelection: null,
                eventSelection: "",
                eventDrag: null,
                eventResize: null
            }
        }, e.prototype.dispatch = function(e) {
            if (this.actionQueue.push(e), !this.isReducing) {
                this.isReducing = !0;
                for (var t = this.state; this.actionQueue.length;) this.state = this.reduce(this.state, this.actionQueue.shift(), this);
                var n = this.state;
                this.isReducing = !1, !t.loadingLevel && n.loadingLevel ? this.publiclyTrigger("loading", [!0]) : t.loadingLevel && !n.loadingLevel && this.publiclyTrigger("loading", [!1]);
                var r = this.component && this.component.view;
                (t.eventStore !== n.eventStore || this.needsFullRerender) && t.eventStore && (this.isEventsUpdated = !0), (t.dateProfile !== n.dateProfile || this.needsFullRerender) && (t.dateProfile && r && this.publiclyTrigger("datesDestroy", [{
                    view: r,
                    el: r.el
                }]), this.isDatesUpdated = !0), (t.viewType !== n.viewType || this.needsFullRerender) && (t.viewType && r && this.publiclyTrigger("viewSkeletonDestroy", [{
                    view: r,
                    el: r.el
                }]), this.isViewUpdated = !0), this.requestRerender()
            }
        }, e.prototype.reduce = function(e, t, n) {
            return Rr(e, t, n)
        }, e.prototype.requestRerender = function(e) {
            void 0 === e && (e = !1), this.needsRerender = !0, this.needsFullRerender = this.needsFullRerender || e, this.delayedRerender()
        }, e.prototype.tryRerender = function() {
            this.component && this.needsRerender && !this.renderingPauseDepth && !this.isRendering && this.executeRender()
        }, e.prototype.batchRendering = function(e) {
            this.renderingPauseDepth++, e(), this.renderingPauseDepth--, this.needsRerender && this.requestRerender()
        }, e.prototype.executeRender = function() {
            var e = this.needsFullRerender;
            this.needsRerender = !1, this.needsFullRerender = !1, this.isRendering = !0, this.renderComponent(e), this.isRendering = !1, this.needsRerender && this.delayedRerender()
        }, e.prototype.renderComponent = function(e) {
            var t = this,
                n = t.state,
                r = t.component,
                i = n.viewType,
                o = this.viewSpecs[i],
                a = e && r ? r.view.queryScroll() : null;
            if (!o) throw new Error('View type "' + i + '" is not valid');
            var s = this.renderableEventStore = n.eventSourceLoadingLevel && !this.opt("progressiveEventRendering") ? this.renderableEventStore : n.eventStore,
                u = this.buildEventUiSingleBase(o.options),
                l = this.buildEventUiBySource(n.eventSources),
                c = this.eventUiBases = this.buildEventUiBases(s.defs, u, l);
            !e && r || (r && (r.freezeHeight(), r.destroy()), r = this.component = new xo({
                calendar: this,
                view: null,
                dateEnv: this.dateEnv,
                theme: this.theme,
                options: this.optionsManager.computed
            }, this.el)), r.receiveProps(wi({}, n, {
                viewSpec: o,
                dateProfile: n.dateProfile,
                dateProfileGenerator: this.dateProfileGenerators[i],
                eventStore: s,
                eventUiBases: c,
                dateSelection: n.dateSelection,
                eventSelection: n.eventSelection,
                eventDrag: n.eventDrag,
                eventResize: n.eventResize
            })), a && r.view.applyScroll(a, !1), this.isViewUpdated && (this.isViewUpdated = !1, this.publiclyTrigger("viewSkeletonRender", [{
                view: r.view,
                el: r.view.el
            }])), this.isDatesUpdated && (this.isDatesUpdated = !1, this.publiclyTrigger("datesRender", [{
                view: r.view,
                el: r.view.el
            }])), this.isEventsUpdated && (this.isEventsUpdated = !1), this.releaseAfterSizingTriggers()
        }, e.prototype.setOption = function(e, t) {
            var n;
            this.mutateOptions((n = {}, n[e] = t, n), [], !0)
        }, e.prototype.getOption = function(e) {
            return this.optionsManager.computed[e]
        }, e.prototype.opt = function(e) {
            return this.optionsManager.computed[e]
        }, e.prototype.viewOpt = function(e) {
            return this.viewOpts()[e]
        }, e.prototype.viewOpts = function() {
            return this.viewSpecs[this.state.viewType].options
        }, e.prototype.mutateOptions = function(e, t, n, r) {
            var i = this,
                o = this.pluginSystem.hooks.optionChangeHandlers,
                a = {},
                s = {},
                u = this.dateEnv,
                l = !1,
                c = !1,
                d = Boolean(t.length);
            for (var f in e) o[f] ? s[f] = e[f] : a[f] = e[f];
            for (var p in a) /^(height|contentHeight|aspectRatio)$/.test(p) ? c = !0 : /^(defaultDate|defaultView)$/.test(p) || (d = !0, "timeZone" === p && (l = !0));
            this.optionsManager.mutate(a, t, n), d && (this.handleOptions(this.optionsManager.computed), this.needsFullRerender = !0), this.batchRendering(function() {
                if (d ? (l && i.dispatch({
                        type: "CHANGE_TIMEZONE",
                        oldDateEnv: u
                    }), i.dispatch({
                        type: "SET_VIEW_TYPE",
                        viewType: i.state.viewType
                    })) : c && i.updateSize(), r)
                    for (var e in s) o[e](s[e], i, r)
            })
        }, e.prototype.handleOptions = function(e) {
            var t = this,
                n = this.pluginSystem.hooks;
            this.defaultAllDayEventDuration = ue(e.defaultAllDayEventDuration), this.defaultTimedEventDuration = ue(e.defaultTimedEventDuration), this.delayedRerender = this.buildDelayedRerender(e.rerenderDelay), this.theme = this.buildTheme(e);
            var r = this.parseRawLocales(e.locales);
            this.availableRawLocales = r.map;
            var i = this.buildLocale(e.locale || r.defaultCode, r.map);
            this.dateEnv = this.buildDateEnv(i, e.timeZone, n.namedTimeZonedImpl, e.firstDay, e.weekNumberCalculation, e.weekLabel, n.cmdFormatter), this.selectionConfig = this.buildSelectionConfig(e), this.viewSpecs = qr(n.views, this.optionsManager), this.dateProfileGenerators = it(this.viewSpecs, function(e) {
                return new e.class.prototype.dateProfileGeneratorClass(e, t)
            })
        }, e.prototype.getAvailableLocaleCodes = function() {
            return Object.keys(this.availableRawLocales)
        }, e.prototype._buildSelectionConfig = function(e) {
            return Cn("select", e, this)
        }, e.prototype._buildEventUiSingleBase = function(e) {
            return e.editable && (e = wi({}, e, {
                eventEditable: !0
            })), Cn("event", e, this)
        }, e.prototype.hasPublicHandlers = function(e) {
            return this.hasHandlers(e) || this.opt(e)
        }, e.prototype.publiclyTrigger = function(e, t) {
            var n = this.opt(e);
            if (this.triggerWith(e, this, t), n) return n.apply(this, t)
        }, e.prototype.publiclyTriggerAfterSizing = function(e, t) {
            var n = this.afterSizingTriggers;
            (n[e] || (n[e] = [])).push(t)
        }, e.prototype.releaseAfterSizingTriggers = function() {
            var e = this.afterSizingTriggers;
            for (var t in e)
                for (var n = 0, r = e[t]; n < r.length; n++) {
                    var i = r[n];
                    this.publiclyTrigger(t, i)
                }
            this.afterSizingTriggers = {}
        }, e.prototype.isValidViewType = function(e) {
            return Boolean(this.viewSpecs[e])
        }, e.prototype.changeView = function(e, t) {
            var n = null;
            t && (t.start && t.end ? (this.optionsManager.mutate({
                visibleRange: t
            }, []), this.handleOptions(this.optionsManager.computed)) : n = this.dateEnv.createMarker(t)), this.unselect(), this.dispatch({
                type: "SET_VIEW_TYPE",
                viewType: e,
                dateMarker: n
            })
        }, e.prototype.zoomTo = function(e, t) {
            var n;
            t = t || "day", n = this.viewSpecs[t] || this.getUnitViewSpec(t), this.unselect(), n ? this.dispatch({
                type: "SET_VIEW_TYPE",
                viewType: n.type,
                dateMarker: e
            }) : this.dispatch({
                type: "SET_DATE",
                dateMarker: e
            })
        }, e.prototype.getUnitViewSpec = function(e) {
            var t, n, r = this.component,
                i = [];
            r.header && i.push.apply(i, r.header.viewsWithButtons), r.footer && i.push.apply(i, r.footer.viewsWithButtons);
            for (var o in this.viewSpecs) i.push(o);
            for (t = 0; t < i.length; t++)
                if ((n = this.viewSpecs[i[t]]) && n.singleUnit === e) return n
        }, e.prototype.getInitialDate = function() {
            var e = this.opt("defaultDate");
            return null != e ? this.dateEnv.createMarker(e) : this.getNow()
        }, e.prototype.prev = function() {
            this.unselect(), this.dispatch({
                type: "PREV"
            })
        }, e.prototype.next = function() {
            this.unselect(), this.dispatch({
                type: "NEXT"
            })
        }, e.prototype.prevYear = function() {
            this.unselect(), this.dispatch({
                type: "SET_DATE",
                dateMarker: this.dateEnv.addYears(this.state.currentDate, -1)
            })
        }, e.prototype.nextYear = function() {
            this.unselect(), this.dispatch({
                type: "SET_DATE",
                dateMarker: this.dateEnv.addYears(this.state.currentDate, 1)
            })
        }, e.prototype.today = function() {
            this.unselect(), this.dispatch({
                type: "SET_DATE",
                dateMarker: this.getNow()
            })
        }, e.prototype.gotoDate = function(e) {
            this.unselect(), this.dispatch({
                type: "SET_DATE",
                dateMarker: this.dateEnv.createMarker(e)
            })
        }, e.prototype.incrementDate = function(e) {
            var t = ue(e);
            t && (this.unselect(), this.dispatch({
                type: "SET_DATE",
                dateMarker: this.dateEnv.add(this.state.currentDate, t)
            }))
        }, e.prototype.getDate = function() {
            return this.dateEnv.toDate(this.state.currentDate)
        }, e.prototype.formatDate = function(e, t) {
            var n = this.dateEnv;
            return n.format(n.createMarker(e), Bt(t))
        }, e.prototype.formatRange = function(e, t, n) {
            var r = this.dateEnv;
            return r.formatRange(r.createMarker(e), r.createMarker(t), Bt(n, this.opt("defaultRangeSeparator")), n)
        }, e.prototype.formatIso = function(e, t) {
            var n = this.dateEnv;
            return n.formatIso(n.createMarker(e), {
                omitTime: t
            })
        }, e.prototype.windowResize = function(e) {
            !this.isHandlingWindowResize && this.component && e.target === window && (this.isHandlingWindowResize = !0, this.updateSize(), this.publiclyTrigger("windowResize", [this.view]), this.isHandlingWindowResize = !1)
        }, e.prototype.updateSize = function() {
            this.component && this.component.updateSize(!0)
        }, e.prototype.registerInteractiveComponent = function(e, t) {
            var n = Qr(e, t),
                r = [zo, Uo],
                i = r.concat(this.pluginSystem.hooks.componentInteractions),
                o = i.map(function(e) {
                    return new e(n)
                });
            this.interactionsStore[e.uid] = o, No[e.uid] = n
        }, e.prototype.unregisterInteractiveComponent = function(e) {
            for (var t = 0, n = this.interactionsStore[e.uid]; t < n.length; t++) {
                n[t].destroy()
            }
            delete this.interactionsStore[e.uid], delete No[e.uid]
        }, e.prototype.select = function(e, t) {
            var n;
            n = null == t ? null != e.start ? e : {
                start: e,
                end: null
            } : {
                start: e,
                end: t
            };
            var r = Hr(n, this.dateEnv, ue({
                days: 1
            }));
            r && (this.dispatch({
                type: "SELECT_DATES",
                selection: r
            }), this.triggerDateSelect(r))
        }, e.prototype.unselect = function(e) {
            this.state.dateSelection && (this.dispatch({
                type: "UNSELECT_DATES"
            }), this.triggerDateUnselect(e))
        }, e.prototype.triggerDateSelect = function(e, t) {
            var n = wi({}, this.buildDateSpanApi(e), {
                jsEvent: t ? t.origEvent : null,
                view: this.view
            });
            this.publiclyTrigger("select", [n])
        }, e.prototype.triggerDateUnselect = function(e) {
            this.publiclyTrigger("unselect", [{
                jsEvent: e ? e.origEvent : null,
                view: this.view
            }])
        }, e.prototype.triggerDateClick = function(e, t, n, r) {
            var i = wi({}, this.buildDatePointApi(e), {
                dayEl: t,
                jsEvent: r,
                view: n
            });
            this.publiclyTrigger("dateClick", [i])
        }, e.prototype.buildDatePointApi = function(e) {
            for (var t = {}, n = 0, r = this.pluginSystem.hooks.datePointTransforms; n < r.length; n++) {
                var i = r[n];
                wi(t, i(e, this))
            }
            return wi(t, Vr(e, this.dateEnv)), t
        }, e.prototype.buildDateSpanApi = function(e) {
            for (var t = {}, n = 0, r = this.pluginSystem.hooks.dateSpanTransforms; n < r.length; n++) {
                var i = r[n];
                wi(t, i(e, this))
            }
            return wi(t, Lr(e, this.dateEnv)), t
        }, e.prototype.getNow = function() {
            var e = this.opt("now");
            return "function" == typeof e && (e = e()), null == e ? this.dateEnv.createNowMarker() : this.dateEnv.createMarker(e)
        }, e.prototype.getDefaultEventEnd = function(e, t) {
            var n = t;
            return e ? (n = X(n), n = this.dateEnv.add(n, this.defaultAllDayEventDuration)) : n = this.dateEnv.add(n, this.defaultTimedEventDuration), n
        }, e.prototype.addEvent = function(e, t) {
            if (e instanceof Ui) {
                var n = e._def,
                    r = e._instance;
                return this.state.eventStore.defs[n.defId] || this.dispatch({
                    type: "ADD_EVENTS",
                    eventStore: lt({
                        def: n,
                        instance: r
                    })
                }), e
            }
            var i;
            if (t instanceof zi) i = t.internalEventSource.sourceId;
            else if (null != t) {
                var o = this.getEventSourceById(t);
                if (!o) return console.warn('Could not find an event source with ID "' + t + '"'), null;
                i = o.internalEventSource.sourceId
            }
            var a = On(e, i, this);
            return a ? (this.dispatch({
                type: "ADD_EVENTS",
                eventStore: lt(a)
            }), new Ui(this, a.def, a.def.recurringDef ? null : a.instance)) : null
        }, e.prototype.getEventById = function(e) {
            var t = this.state.eventStore,
                n = t.defs,
                r = t.instances;
            e = String(e);
            for (var i in n) {
                var o = n[i];
                if (o.publicId === e) {
                    if (o.recurringDef) return new Ui(this, o, null);
                    for (var a in r) {
                        var s = r[a];
                        if (s.defId === o.defId) return new Ui(this, o, s)
                    }
                }
            }
            return null
        }, e.prototype.getEvents = function() {
            var e = this.state.eventStore,
                t = e.defs,
                n = e.instances,
                r = [];
            for (var i in n) {
                var o = n[i],
                    a = t[o.defId];
                r.push(new Ui(this, a, o))
            }
            return r
        }, e.prototype.removeAllEvents = function() {
            this.dispatch({
                type: "REMOVE_ALL_EVENTS"
            })
        }, e.prototype.rerenderEvents = function() {
            this.dispatch({
                type: "RESET_EVENTS"
            })
        }, e.prototype.getEventSources = function() {
            var e = this.state.eventSources,
                t = [];
            for (var n in e) t.push(new zi(this, e[n]));
            return t
        }, e.prototype.getEventSourceById = function(e) {
            var t = this.state.eventSources;
            e = String(e);
            for (var n in t)
                if (t[n].publicId === e) return new zi(this, t[n]);
            return null
        }, e.prototype.addEventSource = function(e) {
            if (e instanceof zi) return this.state.eventSources[e.internalEventSource.sourceId] || this.dispatch({
                type: "ADD_EVENT_SOURCES",
                sources: [e.internalEventSource]
            }), e;
            var t = pr(e, this);
            return t ? (this.dispatch({
                type: "ADD_EVENT_SOURCES",
                sources: [t]
            }), new zi(this, t)) : null
        }, e.prototype.removeAllEventSources = function() {
            this.dispatch({
                type: "REMOVE_ALL_EVENT_SOURCES"
            })
        }, e.prototype.refetchEvents = function() {
            this.dispatch({
                type: "FETCH_EVENT_SOURCES"
            })
        }, e.prototype.scrollToTime = function(e) {
            var t = ue(e);
            t && this.component.view.scrollToTime(t)
        }, e
    }();
    qi.mixInto(Vo);
    var Bo = function(e) {
        function n(n, r, i, o) {
            var a = e.call(this, n, t("div", {
                className: "fc-view fc-" + r.type + "-view"
            }), !0) || this;
            return a.renderDatesMem = Vn(a.renderDatesWrap, a.unrenderDatesWrap), a.renderBusinessHoursMem = Vn(a.renderBusinessHours, a.unrenderBusinessHours, [a.renderDatesMem]), a.renderDateSelectionMem = Vn(a.renderDateSelectionWrap, a.unrenderDateSelectionWrap, [a.renderDatesMem]), a.renderEventsMem = Vn(a.renderEvents, a.unrenderEvents, [a.renderDatesMem]), a.renderEventSelectionMem = Vn(a.renderEventSelectionWrap, a.unrenderEventSelectionWrap, [a.renderEventsMem]), a.renderEventDragMem = Vn(a.renderEventDragWrap, a.unrenderEventDragWrap, [a.renderDatesMem]), a.renderEventResizeMem = Vn(a.renderEventResizeWrap, a.unrenderEventResizeWrap, [a.renderDatesMem]), a.viewSpec = r, a.dateProfileGenerator = i, a.type = r.type, a.eventOrderSpecs = Ue(a.opt("eventOrder")), a.nextDayThreshold = ue(a.opt("nextDayThreshold")), o.appendChild(a.el), a.initialize(), a
        }
        return $e(n, e), n.prototype.initialize = function() {}, Object.defineProperty(n.prototype, "activeStart", {
            get: function() {
                return this.dateEnv.toDate(this.props.dateProfile.activeRange.start)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(n.prototype, "activeEnd", {
            get: function() {
                return this.dateEnv.toDate(this.props.dateProfile.activeRange.end)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(n.prototype, "currentStart", {
            get: function() {
                return this.dateEnv.toDate(this.props.dateProfile.currentRange.start)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(n.prototype, "currentEnd", {
            get: function() {
                return this.dateEnv.toDate(this.props.dateProfile.currentRange.end)
            },
            enumerable: !0,
            configurable: !0
        }), n.prototype.render = function(e) {
            this.renderDatesMem(e.dateProfile), this.renderBusinessHoursMem(e.businessHours), this.renderDateSelectionMem(e.dateSelection), this.renderEventsMem(e.eventStore), this.renderEventSelectionMem(e.eventSelection), this.renderEventDragMem(e.eventDrag), this.renderEventResizeMem(e.eventResize)
        }, n.prototype.destroy = function() {
            e.prototype.destroy.call(this), this.renderDatesMem.unrender()
        }, n.prototype.updateSize = function(e, t, n) {
            var r = this.calendar;
            (e || r.isViewUpdated || r.isDatesUpdated || r.isEventsUpdated) && this.updateBaseSize(e, t, n)
        }, n.prototype.updateBaseSize = function(e, t, n) {}, n.prototype.renderDatesWrap = function(e) {
            this.renderDates(e), this.addScroll({
                timeMs: ue(this.opt("scrollTime")).milliseconds
            }), this.startNowIndicator(e)
        }, n.prototype.unrenderDatesWrap = function() {
            this.stopNowIndicator(), this.unrenderDates()
        }, n.prototype.renderDates = function(e) {}, n.prototype.unrenderDates = function() {}, n.prototype.renderBusinessHours = function(e) {}, n.prototype.unrenderBusinessHours = function() {}, n.prototype.renderDateSelectionWrap = function(e) {
            e && this.renderDateSelection(e)
        }, n.prototype.unrenderDateSelectionWrap = function(e) {
            e && this.unrenderDateSelection(e)
        }, n.prototype.renderDateSelection = function(e) {}, n.prototype.unrenderDateSelection = function(e) {}, n.prototype.renderEvents = function(e) {}, n.prototype.unrenderEvents = function() {}, n.prototype.sliceEvents = function(e, t) {
            var n = this.props;
            return Yt(e, n.eventUiBases, n.dateProfile.activeRange, t ? this.nextDayThreshold : null).fg
        }, n.prototype.renderEventSelectionWrap = function(e) {
            e && this.renderEventSelection(e)
        }, n.prototype.unrenderEventSelectionWrap = function(e) {
            e && this.unrenderEventSelection(e)
        }, n.prototype.renderEventSelection = function(e) {}, n.prototype.unrenderEventSelection = function(e) {}, n.prototype.renderEventDragWrap = function(e) {
            e && this.renderEventDrag(e)
        }, n.prototype.unrenderEventDragWrap = function(e) {
            e && this.unrenderEventDrag(e)
        }, n.prototype.renderEventDrag = function(e) {}, n.prototype.unrenderEventDrag = function(e) {}, n.prototype.renderEventResizeWrap = function(e) {
            e && this.renderEventResize(e)
        }, n.prototype.unrenderEventResizeWrap = function(e) {
            e && this.unrenderEventResize(e)
        }, n.prototype.renderEventResize = function(e) {}, n.prototype.unrenderEventResize = function(e) {}, n.prototype.startNowIndicator = function(e) {
            var t, n, r, i = this,
                o = this.dateEnv;
            this.opt("nowIndicator") && (t = this.getNowIndicatorUnit(e)) && (n = this.updateNowIndicator.bind(this), this.initialNowDate = this.calendar.getNow(), this.initialNowQueriedMs = (new Date).valueOf(), r = o.add(o.startOf(this.initialNowDate, t), ue(1, t)).valueOf() - this.initialNowDate.valueOf(), this.nowIndicatorTimeoutID = setTimeout(function() {
                i.nowIndicatorTimeoutID = null, n(), r = "second" === t ? 1e3 : 6e4, i.nowIndicatorIntervalID = setInterval(n, r)
            }, r))
        }, n.prototype.updateNowIndicator = function() {
            this.props.dateProfile && this.initialNowDate && (this.unrenderNowIndicator(), this.renderNowIndicator(B(this.initialNowDate, (new Date).valueOf() - this.initialNowQueriedMs)), this.isNowIndicatorRendered = !0)
        }, n.prototype.stopNowIndicator = function() {
            this.isNowIndicatorRendered && (this.nowIndicatorTimeoutID && (clearTimeout(this.nowIndicatorTimeoutID), this.nowIndicatorTimeoutID = null), this.nowIndicatorIntervalID && (clearInterval(this.nowIndicatorIntervalID), this.nowIndicatorIntervalID = null), this.unrenderNowIndicator(), this.isNowIndicatorRendered = !1)
        }, n.prototype.getNowIndicatorUnit = function(e) {}, n.prototype.renderNowIndicator = function(e) {}, n.prototype.unrenderNowIndicator = function() {}, n.prototype.addScroll = function(e) {
            var t = this.queuedScroll || (this.queuedScroll = {});
            wi(t, e)
        }, n.prototype.popScroll = function(e) {
            this.applyQueuedScroll(e), this.queuedScroll = null
        }, n.prototype.applyQueuedScroll = function(e) {
            this.applyScroll(this.queuedScroll || {}, e)
        }, n.prototype.queryScroll = function() {
            var e = {};
            return this.props.dateProfile && wi(e, this.queryDateScroll()), e
        }, n.prototype.applyScroll = function(e, t) {
            var n = e.timeMs;
            null != n && (delete e.timeMs, this.props.dateProfile && wi(e, this.computeDateScroll(n))), this.props.dateProfile && this.applyDateScroll(e)
        }, n.prototype.computeDateScroll = function(e) {
            return {}
        }, n.prototype.queryDateScroll = function() {
            return {}
        }, n.prototype.applyDateScroll = function(e) {}, n.prototype.scrollToTime = function(e) {
            this.applyScroll({
                timeMs: e.milliseconds
            }, !1)
        }, n
    }(no);
    qi.mixInto(Bo), Bo.prototype.usesMinMaxTime = !1, Bo.prototype.dateProfileGeneratorClass = ko;
    var Ao = function() {
            function e(e) {
                this.segs = [], this.isSizeDirty = !1, this.context = e
            }
            return e.prototype.renderSegs = function(e, t) {
                this.rangeUpdated(), e = this.renderSegEls(e, t), this.segs = e, this.attachSegs(e, t), this.isSizeDirty = !0, this.context.view.triggerRenderedSegs(this.segs, Boolean(t))
            }, e.prototype.unrender = function(e, t) {
                this.context.view.triggerWillRemoveSegs(this.segs, Boolean(t)), this.detachSegs(this.segs), this.segs = []
            }, e.prototype.rangeUpdated = function() {
                var e, t, n = this.context.options;
                this.eventTimeFormat = Bt(n.eventTimeFormat || this.computeEventTimeFormat(), n.defaultRangeSeparator), e = n.displayEventTime, null == e && (e = this.computeDisplayEventTime()), t = n.displayEventEnd, null == t && (t = this.computeDisplayEventEnd()), this.displayEventTime = e, this.displayEventEnd = t
            }, e.prototype.renderSegEls = function(e, t) {
                var n, i = "";
                if (e.length) {
                    for (n = 0; n < e.length; n++) i += this.renderSegHtml(e[n], t);
                    r(i).forEach(function(t, n) {
                        var r = e[n];
                        t && (r.el = t)
                    }), e = Gt(this.context.view, e, Boolean(t))
                }
                return e
            }, e.prototype.getSegClasses = function(e, t, n, r) {
                var i = ["fc-event", e.isStart ? "fc-start" : "fc-not-start", e.isEnd ? "fc-end" : "fc-not-end"].concat(e.eventRange.ui.classNames);
                return t && i.push("fc-draggable"), n && i.push("fc-resizable"), r && (i.push("fc-mirror"), r.isDragging && i.push("fc-dragging"), r.isResizing && i.push("fc-resizing")), i
            }, e.prototype.getTimeText = function(e, t, n) {
                var r = e.def,
                    i = e.instance;
                return this._getTimeText(i.range.start, r.hasEnd ? i.range.end : null, r.allDay, t, n, i.forcedStartTzo, i.forcedEndTzo)
            }, e.prototype._getTimeText = function(e, t, n, r, i, o, a) {
                var s = this.context.dateEnv;
                return null == r && (r = this.eventTimeFormat), null == i && (i = this.displayEventEnd), this.displayEventTime && !n ? i && t ? s.formatRange(e, t, r, {
                    forcedStartTzo: o,
                    forcedEndTzo: a
                }) : s.format(e, r, {
                    forcedTzo: o
                }) : ""
            }, e.prototype.computeEventTimeFormat = function() {
                return {
                    hour: "numeric",
                    minute: "2-digit",
                    omitZeroMinute: !0
                }
            }, e.prototype.computeDisplayEventTime = function() {
                return !0
            }, e.prototype.computeDisplayEventEnd = function() {
                return !0
            }, e.prototype.getSkinCss = function(e) {
                return {
                    "background-color": e.backgroundColor,
                    "border-color": e.borderColor,
                    color: e.textColor
                }
            }, e.prototype.sortEventSegs = function(e) {
                var t = this.context.view.eventOrderSpecs,
                    n = e.map(oi);
                return n.sort(function(e, n) {
                    return Le(e, n, t)
                }), n.map(function(e) {
                    return e._seg
                })
            }, e.prototype.computeSizes = function(e) {
                (e || this.isSizeDirty) && this.computeSegSizes(this.segs)
            }, e.prototype.assignSizes = function(e) {
                (e || this.isSizeDirty) && (this.assignSegSizes(this.segs), this.isSizeDirty = !1)
            }, e.prototype.computeSegSizes = function(e) {}, e.prototype.assignSegSizes = function(e) {}, e.prototype.hideByHash = function(e) {
                if (e)
                    for (var t = 0, n = this.segs; t < n.length; t++) {
                        var r = n[t];
                        e[r.eventRange.instance.instanceId] && (r.el.style.visibility = "hidden")
                    }
            }, e.prototype.showByHash = function(e) {
                if (e)
                    for (var t = 0, n = this.segs; t < n.length; t++) {
                        var r = n[t];
                        e[r.eventRange.instance.instanceId] && (r.el.style.visibility = "")
                    }
            }, e.prototype.selectByInstanceId = function(e) {
                if (e)
                    for (var t = 0, n = this.segs; t < n.length; t++) {
                        var r = n[t],
                            i = r.eventRange.instance;
                        i && i.instanceId === e && r.el && r.el.classList.add("fc-selected")
                    }
            }, e.prototype.unselectByInstanceId = function(e) {
                if (e)
                    for (var t = 0, n = this.segs; t < n.length; t++) {
                        var r = n[t];
                        r.el && r.el.classList.remove("fc-selected")
                    }
            }, e
        }(),
        Fo = function() {
            function e(e) {
                this.fillSegTag = "div", this.dirtySizeFlags = {}, this.context = e, this.containerElsByType = {}, this.segsByType = {}
            }
            return e.prototype.getSegsByType = function(e) {
                return this.segsByType[e] || []
            }, e.prototype.renderSegs = function(e, t) {
                var n, r = this.renderSegEls(e, t),
                    i = this.attachSegs(e, r);
                i && (n = this.containerElsByType[e] || (this.containerElsByType[e] = [])).push.apply(n, i), this.segsByType[e] = r, "bgEvent" === e && this.context.view.triggerRenderedSegs(r, !1), this.dirtySizeFlags[e] = !0
            }, e.prototype.unrender = function(e) {
                var t = this.segsByType[e];
                t && ("bgEvent" === e && this.context.view.triggerWillRemoveSegs(t, !1), this.detachSegs(e, t))
            }, e.prototype.renderSegEls = function(e, t) {
                var n, i = this,
                    o = "";
                if (t.length) {
                    for (n = 0; n < t.length; n++) o += this.renderSegHtml(e, t[n]);
                    r(o).forEach(function(e, n) {
                        var r = t[n];
                        e && (r.el = e)
                    }), "bgEvent" === e && (t = Gt(this.context.view, t, !1)), t = t.filter(function(e) {
                        return f(e.el, i.fillSegTag)
                    })
                }
                return t
            }, e.prototype.renderSegHtml = function(e, t) {
                var n = null,
                    r = [];
                return "highlight" !== e && "businessHours" !== e && (n = {
                    "background-color": t.eventRange.ui.backgroundColor
                }), "highlight" !== e && (r = r.concat(t.eventRange.ui.classNames)), "businessHours" === e ? r.push("fc-bgevent") : r.push("fc-" + e.toLowerCase()), "<" + this.fillSegTag + (r.length ? ' class="' + r.join(" ") + '"' : "") + (n ? ' style="' + Dn(n) + '"' : "") + "></" + this.fillSegTag + ">"
            }, e.prototype.detachSegs = function(e, t) {
                var n = this.containerElsByType[e];
                n && (n.forEach(c), delete this.containerElsByType[e])
            }, e.prototype.computeSizes = function(e) {
                for (var t in this.segsByType)(e || this.dirtySizeFlags[t]) && this.computeSegSizes(this.segsByType[t])
            }, e.prototype.assignSizes = function(e) {
                for (var t in this.segsByType)(e || this.dirtySizeFlags[t]) && this.assignSegSizes(this.segsByType[t]);
                this.dirtySizeFlags = {}
            }, e.prototype.computeSegSizes = function(e) {}, e.prototype.assignSegSizes = function(e) {}, e
        }(),
        Wo = function() {
            function e(e) {
                this.timeZoneName = e
            }
            return e
        }(),
        Zo = function() {
            function e(e) {
                this.emitter = new qi
            }
            return e.prototype.destroy = function() {}, e.prototype.setMirrorIsVisible = function(e) {}, e.prototype.setMirrorNeedsRevert = function(e) {}, e.prototype.setAutoScrollEnabled = function(e) {}, e
        }(),
        jo = {
            startTime: ue,
            duration: ue,
            create: Boolean,
            sourceId: String
        },
        Yo = {
            create: !0
        },
        qo = function(e) {
            function t(t, r) {
                var i = e.call(this, t) || this;
                return r.innerHTML = "", r.appendChild(i.el = n('<div class="fc-row ' + i.theme.getClass("headerRow") + '"><table class="' + i.theme.getClass("tableGrid") + '"><thead></thead></table></div>')), i.thead = i.el.querySelector("thead"), i
            }
            return $e(t, e), t.prototype.destroy = function() {
                c(this.el)
            }, t.prototype.render = function(e) {
                var t = e.dates,
                    n = e.datesRepDistinctDays,
                    r = [];
                e.renderIntroHtml && r.push(e.renderIntroHtml());
                for (var i = Bt(this.opt("columnHeaderFormat") || ci(n, t.length)), o = 0, a = t; o < a.length; o++) {
                    var s = a[o];
                    r.push(di(s, e.dateProfile, n, t.length, i, this.context))
                }
                this.isRtl && r.reverse(), this.thead.innerHTML = "<tr>" + r.join("") + "</tr>"
            }, t
        }(to),
        Go = function() {
            function e(e, t) {
                for (var n = e.start, r = e.end, i = [], o = [], a = -1; n < r;) t.isHiddenDay(n) ? i.push(a + .5) : (a++, i.push(a), o.push(n)), n = V(n, 1);
                this.dates = o, this.indices = i, this.cnt = o.length
            }
            return e.prototype.sliceRange = function(e) {
                var t = this.getDateDayIndex(e.start),
                    n = this.getDateDayIndex(V(e.end, -1)),
                    r = Math.max(0, t),
                    i = Math.min(this.cnt - 1, n);
                return r = Math.ceil(r), i = Math.floor(i), r <= i ? {
                    firstIndex: r,
                    lastIndex: i,
                    isStart: t === r,
                    isEnd: n === i
                } : null
            }, e.prototype.getDateDayIndex = function(e) {
                var t = this.indices,
                    n = Math.floor(F(this.dates[0], e));
                return n < 0 ? t[0] - 1 : n >= t.length ? t[t.length - 1] + 1 : t[n]
            }, e
        }(),
        Xo = function() {
            function e(e, t) {
                var n, r, i, o = e.dates;
                if (t) {
                    for (r = o[0].getUTCDay(), n = 1; n < o.length && o[n].getUTCDay() !== r; n++);
                    i = Math.ceil(o.length / n)
                } else i = 1, n = o.length;
                this.rowCnt = i, this.colCnt = n, this.daySeries = e, this.cells = this.buildCells(), this.headerDates = this.buildHeaderDates()
            }
            return e.prototype.buildCells = function() {
                for (var e = [], t = 0; t < this.rowCnt; t++) {
                    for (var n = [], r = 0; r < this.colCnt; r++) n.push(this.buildCell(t, r));
                    e.push(n)
                }
                return e
            }, e.prototype.buildCell = function(e, t) {
                return {
                    date: this.daySeries.dates[e * this.colCnt + t]
                }
            }, e.prototype.buildHeaderDates = function() {
                for (var e = [], t = 0; t < this.colCnt; t++) e.push(this.cells[0][t].date);
                return e
            }, e.prototype.sliceRange = function(e) {
                var t = this.colCnt,
                    n = this.daySeries.sliceRange(e),
                    r = [];
                if (n)
                    for (var i = n.firstIndex, o = n.lastIndex, a = i; a <= o;) {
                        var s = Math.floor(a / t),
                            u = Math.min((s + 1) * t, o + 1);
                        r.push({
                            row: s,
                            firstCol: a % t,
                            lastCol: (u - 1) % t,
                            isStart: n.isStart && a === i,
                            isEnd: n.isEnd && u - 1 === o
                        }), a = u
                    }
                return r
            }, e
        }(),
        Jo = function() {
            function e() {
                this.sliceBusinessHours = kt(this._sliceBusinessHours), this.sliceDateSelection = kt(this._sliceDateSpan), this.sliceEventStore = kt(this._sliceEventStore), this.sliceEventDrag = kt(this._sliceInteraction), this.sliceEventResize = kt(this._sliceInteraction)
            }
            return e.prototype.sliceProps = function(e, t, n, r) {
                for (var i = [], o = 4; o < arguments.length; o++) i[o - 4] = arguments[o];
                var a = e.eventUiBases,
                    s = this.sliceEventStore.apply(this, [e.eventStore, a, t, n, r].concat(i));
                return {
                    dateSelectionSegs: this.sliceDateSelection.apply(this, [e.dateSelection, a, r].concat(i)),
                    businessHourSegs: this.sliceBusinessHours.apply(this, [e.businessHours, t, n, r].concat(i)),
                    fgEventSegs: s.fg,
                    bgEventSegs: s.bg,
                    eventDrag: this.sliceEventDrag.apply(this, [e.eventDrag, a, t, n, r].concat(i)),
                    eventResize: this.sliceEventResize.apply(this, [e.eventResize, a, t, n, r].concat(i)),
                    eventSelection: e.eventSelection
                }
            }, e.prototype.sliceNowDate = function(e, t) {
                for (var n = [], r = 2; r < arguments.length; r++) n[r - 2] = arguments[r];
                return this._sliceDateSpan.apply(this, [{
                    range: {
                        start: e,
                        end: B(e, 1)
                    },
                    allDay: !1
                }, {}, t].concat(n))
            }, e.prototype._sliceBusinessHours = function(e, t, n, r) {
                for (var i = [], o = 4; o < arguments.length; o++) i[o - 4] = arguments[o];
                return e ? this._sliceEventStore.apply(this, [ct(e, fi(t, Boolean(n)), r.calendar), {}, t, n, r].concat(i)).bg : []
            }, e.prototype._sliceEventStore = function(e, t, n, r, i) {
                for (var o = [], a = 5; a < arguments.length; a++) o[a - 5] = arguments[a];
                if (e) {
                    var s = Yt(e, t, fi(n, Boolean(r)), r);
                    return {
                        bg: this.sliceEventRanges(s.bg, i, o),
                        fg: this.sliceEventRanges(s.fg, i, o)
                    }
                }
                return {
                    bg: [],
                    fg: []
                }
            }, e.prototype._sliceInteraction = function(e, t, n, r, i) {
                for (var o = [], a = 5; a < arguments.length; a++) o[a - 5] = arguments[a];
                if (!e) return null;
                var s = Yt(e.mutatedEvents, t, fi(n, Boolean(r)), r);
                return {
                    segs: this.sliceEventRanges(s.fg, i, o),
                    affectedInstances: e.affectedEvents.instances,
                    isEvent: e.isEvent,
                    sourceSeg: e.origSeg
                }
            }, e.prototype._sliceDateSpan = function(e, t, n) {
                for (var r = [], i = 3; i < arguments.length; i++) r[i - 3] = arguments[i];
                if (!e) return [];
                for (var o = Br(e, t, n.calendar), a = this.sliceRange.apply(this, [e.range].concat(r)), s = 0, u = a; s < u.length; s++) {
                    var l = u[s];
                    l.component = n, l.eventRange = o
                }
                return a
            }, e.prototype.sliceEventRanges = function(e, t, n) {
                for (var r = [], i = 0, o = e; i < o.length; i++) {
                    var a = o[i];
                    r.push.apply(r, this.sliceEventRange(a, t, n))
                }
                return r
            }, e.prototype.sliceEventRange = function(e, t, n) {
                for (var r = this.sliceRange.apply(this, [e.range].concat(n)), i = 0, o = r; i < o.length; i++) {
                    var a = o[i];
                    a.component = t, a.eventRange = e, a.isStart = e.isStart && a.isStart, a.isEnd = e.isEnd && a.isEnd
                }
                return r
            }, e
        }();
    e.Calendar = Vo, e.Component = to, e.DateComponent = no, e.DateEnv = Ro, e.DateProfileGenerator = ko, e.DayHeader = qo, e.DaySeries = Go, e.DayTable = Xo, e.ElementDragging = Zo, e.ElementScrollController = Ji, e.EmitterMixin = qi, e.EventApi = Ui, e.FgEventRenderer = Ao, e.FillRenderer = Fo, e.Interaction = Ho, e.Mixin = Yi, e.NamedTimeZoneImpl = Wo, e.PositionCache = Gi, e.ScrollComponent = Qi, e.ScrollController = Xi, e.Slicer = Jo, e.Splitter = ji, e.Theme = $i, e.View = Bo, e.WindowScrollController = Ki, e.addDays = V, e.addDurations = he, e.addMs = B, e.addWeeks = L, e.allowContextMenu = ze, e.allowSelection = He, e.appendToElement = a, e.applyAll = je, e.applyMutationToEventStore = $t, e.applyStyle = g, e.applyStyleProp = y, e.asRoughMinutes = Se, e.asRoughMs = Te, e.asRoughSeconds = be, e.buildGotoAnchorHtml = An, e.buildSegCompareObj = oi, e.capitaliseFirstLetter = Ae, e.combineEventUis = Mn, e.compareByFieldSpec = Ve, e.compareByFieldSpecs = Le, e.compareNumbers = We, e.compensateScroll = Re, e.computeClippingRect = x, e.computeEdges = C, e.computeFallbackHeaderFormat = ci, e.computeHeightAndMargins = _, e.computeInnerRect = M, e.computeRect = k, e.computeVisibleDayRange = Je, e.config = vo, e.constrainPoint = b, e.createDuration = ue, e.createElement = t, e.createEmptyEventStore = vt, e.createEventInstance = Pn, e.createFormatter = Bt, e.createPlugin = Gn, e.cssToStr = Dn, e.debounce = qe, e.diffDates = Qe, e.diffDayAndTime = Y, e.diffDays = F, e.diffPoints = D, e.diffWeeks = A, e.diffWholeDays = G, e.diffWholeWeeks = q, e.disableCursor = Ce, e.distributeHeight = ke, e.elementClosest = d, e.elementMatches = f, e.enableCursor = Me, e.eventTupleToStore = lt, e.filterEventStoreDefs = yt, e.filterHash = rt, e.findChildren = h, e.findElements = p, e.flexibleCompare = Be, e.forceClassName = v, e.formatDate = ai, e.formatIsoTimeString = Ft, e.formatRange = si, e.getAllDayHtml = Fn, e.getClippingParents = P, e.getDayClasses = Wn, e.getElSeg = Jt, e.getRectCenter = T, e.getRelevantEvents = dt, e.globalDefaults = go, e.greatestDurationDenominator = we, e.hasBgRendering = qt, e.htmlEscape = Tn, e.htmlToElement = n, e.insertAfterElement = u, e.interactionSettingsStore = No, e.interactionSettingsToStore = $r, e.intersectRanges = bt, e.intersectRects = E, e.isArraysEqual = Mt, e.isDateSpansEqual = zr, e.isInt = Ze, e.isInteractionValid = dn, e.isMultiDayRange = Ke, e.isPropsEqual = st, e.isPropsValid = hn, e.isSingleDay = pe, e.isValidDate = ae, e.listenBySelector = N, e.mapHash = it, e.matchCellWidths = _e, e.memoize = kt, e.memoizeOutput = Ot, e.memoizeRendering = Vn, e.mergeEventStores = gt, e.multiplyDuration = ge, e.padStart = Fe, e.parseBusinessHours = Un, e.parseDragMeta = li, e.parseEventDef = _n, e.parseFieldSpecs = Ue, e.parseMarker = dr, e.pointInsideRect = m, e.prependToElement = s, e.preventContextMenu = Ne, e.preventDefault = H, e.preventSelection = xe, e.processScopedUiProps = Cn, e.rangeContainsMarker = Rt, e.rangeContainsRange = wt, e.rangesEqual = Tt, e.rangesIntersect = Dt, e.refineProps = Ge, e.removeElement = c, e.removeExact = Ct, e.renderDateCell = di, e.requestJson = Jn, e.sliceEventStore = Yt, e.startOfDay = X, e.subtractInnerElHeight = Pe, e.translateRect = S, e.uncompensateScroll = Ie, e.undistributeHeight = Oe, e.unpromisify = Zn, e.version = "4.2.0", e.whenTransitionDone = U, e.wholeDivideDurations = De, Object.defineProperty(e, "__esModule", {
        value: !0
    })
});
