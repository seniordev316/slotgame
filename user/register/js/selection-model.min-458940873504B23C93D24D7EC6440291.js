angular.module("selectionModel", []), angular.module("selectionModel").directive("selectionModel", ["selectionStack", "uuidGen", "selectionModelOptions", function(a, b, c) {
    "use strict";
    return {
        restrict: "A",
        link: function(d, e, f) {
            var g = c.get(),
                h = g.selectedAttribute,
                i = g.selectedClass,
                j = g.type,
                k = g.mode,
                l = g.cleanupStrategy,
                m = f.selectionModelType || j,
                n = f.selectionModelMode || k,
                o = /^multi(ple)?(-additive)?$/.test(n),
                p = /^multi(ple)?-additive/.test(n),
                q = f.selectionModelSelectedAttribute || h,
                r = f.selectionModelSelectedClass || i,
                s = f.selectionModelCleanupStrategy || l,
                t = f.selectionModelOnChange,
                u = f.ngRepeat;
            if (!u) throw "selectionModel must be used along side ngRepeat";
            var v = d.$eval(f.selectionModelSelectedItems),
                w = function() {
                    if (!o) return null;
                    var a = "data-selection-model-stack-id",
                        c = e.attr(a);
                    return c ? c : (c = e.parent().attr(a)) ? (e.attr(a, c), c) : (c = b.create(), e.attr(a, c), e.parent().attr(a, c), c)
                }(),
                x = u.split(" in "),
                y = d.$eval(x[0]),
                z = function() {
                    if (y[q] ? e.addClass(r) : e.removeClass(r), "checkbox" === m) {
                        var a = e.find("input");
                        a.prop("checked", y[q])
                    }
                },
                A = function() {
                    return d.$eval(x[1])
                },
                B = function() {
                    return d.$eval(x[1].split("|")[0])
                },
                C = function(a) {
                    var b, c = angular.isArray(v),
                        d = angular.isArray(a) && 2 === a.length,
                        e = B(),
                        f = 0,
                        g = !1;
                    c && (v.length = 0), angular.forEach(e, function(e) {
                        d ? (b = a.indexOf(e), b > -1 ? (f++, g = !1, a.splice(b, 1)) : g = 1 !== f) : g = e !== a, g ? e[q] = !1 : c && e[q] && v.push(e)
                    })
                },
                D = function(a) {
                    var b = (A(), !1),
                        c = !1;
                    a = a || y, angular.forEach(A(), function(d) {
                        c = c || d === y, b = b || d === a;
                        var e = b + c === 1;
                        (e || d === y || d === a) && (d[q] = !0)
                    })
                },
                E = function(b) {
                    var c = b.ctrlKey || b.metaKey || p,
                        e = b.shiftKey,
                        f = b.target || b.srcElement,
                        g = "checkbox" === m && "INPUT" === f.tagName && "checkbox" === f.type;
                    if (g && b.stopPropagation(), e && o && !g) return c || d.$apply(function() {
                        C([y, a.peek(w)])
                    }), D(a.peek(w)), d.$apply(), void 0;
                    if (c || e || g) {
                        var h = !y[q];
                        return o || C(y), y[q] = h, y[q] && a.push(w, y), d.$apply(), void 0
                    }
                    C(y), d.$apply(), y[q] = !0, a.push(w, y), d.$apply()
                },
                F = function() {
                    if (angular.isArray(v)) {
                        var a = v.indexOf(y);
                        y[q] ? -1 === a && v.push(y) : a > -1 && v.splice(a, 1)
                    }
                };
            if (e.on("click", E), "checkbox" === m) {
                var G = e.find("input");
                G[0] && "checkbox" === G[0].type && e.find("input").on("click", E)
            }
            z(), F(), "deselect" === s && d.$on("$destroy", function() {
                var a = y[q];
                y[q] = !1, F(), t && a && d.$eval(t)
            }), d.$watch(x[0] + "." + q, function(a, b) {
                a !== b && (o || !a || b || (C(y), y[q] = !0), z(), F(), t && d.$eval(t))
            })
        }
    }
}]), angular.module("selectionModel").provider("selectionModelOptions", [function() {
    "use strict";
    var a = {
        selectedAttribute: "selected",
        selectedClass: "selected",
        type: "basic",
        mode: "single",
        cleanupStrategy: "none"
    };
    this.set = function(b) {
        angular.extend(a, b)
    }, this.$get = function() {
        var b = {
            get: function() {
                return angular.copy(a)
            }
        };
        return b
    }
}]), angular.module("selectionModel").service("selectionStack", function() {
    "use strict";
    var a = {},
        b = 1e3,
        c = {};
    return a.push = function(a, d) {
        c.hasOwnProperty(a) || (c[a] = []);
        var e = c[a];
        for (e.push(d); e.length > b;) e.shift();
        return e.length
    }, a.pop = function(a) {
        c.hasOwnProperty(a) || (c[a] = []);
        var b = c[a];
        return b.pop()
    }, a.peek = function(a) {
        c.hasOwnProperty(a) || (c[a] = []);
        var b = c[a];
        return b.length ? b[b.length - 1] : void 0
    }, a
}), angular.module("selectionModel").service("uuidGen", function() {
    "use strict";
    var a = {},
        b = ["0", "0", "0"];
    return a.create = function() {
        for (var a, c = b.length; c;) {
            if (c--, a = b[c].charCodeAt(0), 57 === a) return b[c] = "A", b.join("");
            if (90 !== a) return b[c] = String.fromCharCode(a + 1), b.join("");
            b[c] = "0"
        }
        return b.unshift("0"), b.join("")
    }, a
});