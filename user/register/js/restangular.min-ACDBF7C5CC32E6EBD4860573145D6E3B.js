/**
 * Restful Resources service for AngularJS apps
 * @version v1.3.1 - 2014-01-29 * @link https://github.com/mgonto/restangular
 * @author Martin Gontovnikas <martin@gon.to>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
! function() {
    var a = angular.module("restangular", []);
    a.provider("Restangular", function() {
        var a = {};
        a.init = function(a, b) {
            function c(a, b, c, d) {
                var e = {};
                return _.each(_.keys(d), function(f) {
                    var g = d[f];
                    g.params = _.extend({}, g.params, a.defaultRequestParams[g.method.toLowerCase()]), _.isEmpty(g.params) && delete g.params, e[f] = a.isSafe(g.method) ? function() {
                        return b(_.extend(g, {
                            url: c
                        }))
                    } : function(a) {
                        return b(_.extend(g, {
                            url: c,
                            data: a
                        }))
                    }
                }), e
            }
            a.configuration = b;
            var d = ["get", "head", "options", "trace", "getlist"];
            b.isSafe = function(a) {
                return _.contains(d, a.toLowerCase())
            };
            var e = /^https?:\/\//i;
            b.isAbsoluteUrl = function(a) {
                return _.isUndefined(b.absoluteUrl) || _.isNull(b.absoluteUrl) ? a && e.test(a) : b.absoluteUrl
            }, b.absoluteUrl = _.isUndefined(b.absoluteUrl) ? !1 : !0, a.setSelfLinkAbsoluteUrl = function(a) {
                b.absoluteUrl = a
            }, b.baseUrl = _.isUndefined(b.baseUrl) ? "" : b.baseUrl, a.setBaseUrl = function(a) {
                return b.baseUrl = /\/$/.test(a) ? a.substring(0, a.length - 1) : a, this
            }, b.extraFields = b.extraFields || [], a.setExtraFields = function(a) {
                return b.extraFields = a, this
            }, b.defaultHttpFields = b.defaultHttpFields || {}, a.setDefaultHttpFields = function(a) {
                return b.defaultHttpFields = a, this
            }, b.withHttpValues = function(a, c) {
                return _.defaults(c, a, b.defaultHttpFields)
            }, b.encodeIds = _.isUndefined(b.encodeIds) ? !0 : b.encodeIds, a.setEncodeIds = function(a) {
                b.encodeIds = a
            }, b.defaultRequestParams = b.defaultRequestParams || {
                get: {},
                post: {},
                put: {},
                remove: {},
                common: {}
            }, a.setDefaultRequestParams = function(a, c) {
                var d = [],
                    e = c || a;
                return _.isUndefined(c) ? d.push("common") : _.isArray(a) ? d = a : d.push(a), _.each(d, function(a) {
                    b.defaultRequestParams[a] = e
                }), this
            }, a.requestParams = b.defaultRequestParams, b.defaultHeaders = b.defaultHeaders || {}, a.setDefaultHeaders = function(c) {
                return b.defaultHeaders = c, a.defaultHeaders = b.defaultHeaders, this
            }, a.defaultHeaders = b.defaultHeaders, b.methodOverriders = b.methodOverriders || [], a.setMethodOverriders = function(a) {
                var c = _.extend([], a);
                return b.isOverridenMethod("delete", c) && c.push("remove"), b.methodOverriders = c, this
            }, b.jsonp = _.isUndefined(b.jsonp) ? !1 : b.jsonp, a.setJsonp = function(a) {
                b.jsonp = a
            }, b.isOverridenMethod = function(a, c) {
                var d = c || b.methodOverriders;
                return !_.isUndefined(_.find(d, function(b) {
                    return b.toLowerCase() === a.toLowerCase()
                }))
            }, b.urlCreator = b.urlCreator || "path", a.setUrlCreator = function(a) {
                if (!_.has(b.urlCreatorFactory, a)) throw new Error("URL Path selected isn't valid");
                return b.urlCreator = a, this
            }, b.restangularFields = b.restangularFields || {
                id: "id",
                route: "route",
                parentResource: "parentResource",
                restangularCollection: "restangularCollection",
                cannonicalId: "__cannonicalId",
                etag: "restangularEtag",
                selfLink: "href",
                get: "get",
                getList: "getList",
                put: "put",
                post: "post",
                remove: "remove",
                head: "head",
                trace: "trace",
                options: "options",
                patch: "patch",
                getRestangularUrl: "getRestangularUrl",
                getRequestedUrl: "getRequestedUrl",
                putElement: "putElement",
                addRestangularMethod: "addRestangularMethod",
                getParentList: "getParentList",
                clone: "clone",
                ids: "ids",
                httpConfig: "_$httpConfig",
                reqParams: "reqParams",
                one: "one",
                all: "all",
                several: "several",
                oneUrl: "oneUrl",
                allUrl: "allUrl",
                customPUT: "customPUT",
                customPOST: "customPOST",
                customDELETE: "customDELETE",
                customGET: "customGET",
                customGETLIST: "customGETLIST",
                customOperation: "customOperation",
                doPUT: "doPUT",
                doPOST: "doPOST",
                doDELETE: "doDELETE",
                doGET: "doGET",
                doGETLIST: "doGETLIST",
                fromServer: "$fromServer",
                withConfig: "withConfig",
                withHttpConfig: "withHttpConfig"
            }, a.setRestangularFields = function(a) {
                return b.restangularFields = _.extend(b.restangularFields, a), this
            }, b.isRestangularized = function(a) {
                return !!a[b.restangularFields.one] || !!a[b.restangularFields.all]
            }, b.setFieldToElem = function(a, b, c) {
                var d = a.split("."),
                    e = b;
                return _.each(_.initial(d), function(a) {
                    e[a] = {}, e = e[a]
                }), e[_.last(d)] = c, this
            }, b.getFieldFromElem = function(a, b) {
                var c = a.split("."),
                    d = b;
                return _.each(c, function(a) {
                    d && (d = d[a])
                }), angular.copy(d)
            }, b.setIdToElem = function(a, c) {
                return b.setFieldToElem(b.restangularFields.id, a, c), this
            }, b.getIdFromElem = function(a) {
                return b.getFieldFromElem(b.restangularFields.id, a)
            }, b.isValidId = function(a) {
                return "" !== a && !_.isUndefined(a) && !_.isNull(a)
            }, b.setUrlToElem = function(a, c) {
                return b.setFieldToElem(b.restangularFields.selfLink, a, c), this
            }, b.getUrlFromElem = function(a) {
                return b.getFieldFromElem(b.restangularFields.selfLink, a)
            }, b.useCannonicalId = _.isUndefined(b.useCannonicalId) ? !1 : b.useCannonicalId, a.setUseCannonicalId = function(a) {
                return b.useCannonicalId = a, this
            }, b.getCannonicalIdFromElem = function(a) {
                var c = a[b.restangularFields.cannonicalId],
                    d = b.isValidId(c) ? c : b.getIdFromElem(a);
                return d
            }, b.responseInterceptors = b.responseInterceptors || [], b.defaultResponseInterceptor = function(a) {
                return a
            }, b.responseExtractor = function(a, c, d, e, f, g) {
                var h = angular.copy(b.responseInterceptors);
                h.push(b.defaultResponseInterceptor);
                var i = a;
                return _.each(h, function(a) {
                    i = a(i, c, d, e, f, g)
                }), i
            }, a.addResponseInterceptor = function(a) {
                return b.responseInterceptors.push(a), this
            }, a.setResponseInterceptor = a.addResponseInterceptor, a.setResponseExtractor = a.addResponseInterceptor, b.requestInterceptors = b.requestInterceptors || [], b.defaultInterceptor = function(a, b, c, d, e, f, g) {
                return {
                    element: a,
                    headers: e,
                    params: f,
                    httpConfig: g
                }
            }, b.fullRequestInterceptor = function(a, c, d, e, f, g, h) {
                var i = angular.copy(b.requestInterceptors);
                return i.push(b.defaultInterceptor), _.reduce(i, function(b, i) {
                    return _.defaults(b, i(a, c, d, e, f, g, h))
                }, {})
            }, a.addRequestInterceptor = function(a) {
                return b.requestInterceptors.push(function(b, c, d, e, f, g, h) {
                    return {
                        headers: f,
                        params: g,
                        element: a(b, c, d, e),
                        httpConfig: h
                    }
                }), this
            }, a.setRequestInterceptor = a.addRequestInterceptor, a.addFullRequestInterceptor = function(a) {
                return b.requestInterceptors.push(a), this
            }, a.setFullRequestInterceptor = a.addFullRequestInterceptor, b.errorInterceptor = b.errorInterceptor || function() {}, a.setErrorInterceptor = function(a) {
                return b.errorInterceptor = a, this
            }, b.onBeforeElemRestangularized = b.onBeforeElemRestangularized || function(a) {
                return a
            }, a.setOnBeforeElemRestangularized = function(a) {
                return b.onBeforeElemRestangularized = a, this
            }, b.onElemRestangularized = b.onElemRestangularized || function(a) {
                return a
            }, a.setOnElemRestangularized = function(a) {
                return b.onElemRestangularized = a, this
            }, b.shouldSaveParent = b.shouldSaveParent || function() {
                return !0
            }, a.setParentless = function(a) {
                return _.isArray(a) ? b.shouldSaveParent = function(b) {
                    return !_.contains(a, b)
                } : _.isBoolean(a) && (b.shouldSaveParent = function() {
                    return !a
                }), this
            }, b.suffix = _.isUndefined(b.suffix) ? null : b.suffix, a.setRequestSuffix = function(a) {
                return b.suffix = a, this
            }, b.transformers = b.transformers || {}, a.addElementTransformer = function(a, c, d) {
                var e = null,
                    f = null;
                2 === arguments.length ? f = c : (f = d, e = c);
                var g = b.transformers[a];
                g || (g = b.transformers[a] = []), g.push(function(a, b) {
                    return _.isNull(e) || a == e ? f(b) : b
                })
            }, a.extendCollection = function(b, c) {
                return a.addElementTransformer(b, !0, c)
            }, a.extendModel = function(b, c) {
                return a.addElementTransformer(b, !1, c)
            }, b.transformElem = function(a, c, d, e) {
                if (!b.transformLocalElements && !a[b.restangularFields.fromServer]) return a;
                var f = b.transformers[d],
                    g = a;
                return f && _.each(f, function(a) {
                    g = a(c, g)
                }), b.onElemRestangularized(g, c, d, e)
            }, b.transformLocalElements = _.isUndefined(b.transformLocalElements) ? !0 : b.transformLocalElements, a.setTransformOnlyServerElements = function(a) {
                b.transformLocalElements = !a
            }, b.fullResponse = _.isUndefined(b.fullResponse) ? !1 : b.fullResponse, a.setFullResponse = function(a) {
                return b.fullResponse = a, this
            }, b.urlCreatorFactory = {};
            var f = function() {};
            f.prototype.setConfig = function(a) {
                return this.config = a, this
            }, f.prototype.parentsArray = function(a) {
                for (var b = []; a;) b.push(a), a = a[this.config.restangularFields.parentResource];
                return b.reverse()
            }, f.prototype.resource = function(a, d, e, f, g, h, i, j) {
                var k = _.defaults(g || {}, this.config.defaultRequestParams.common),
                    l = _.defaults(f || {}, this.config.defaultHeaders);
                i && (b.isSafe(j) ? l["If-None-Match"] = i : l["If-Match"] = i);
                var m = this.base(a);
                if (h) {
                    var n = "";
                    /\/$/.test(m) || (n += "/"), n += h, m += n
                }
                return this.config.suffix && -1 === m.indexOf(this.config.suffix, m.length - this.config.suffix.length) && !this.config.getUrlFromElem(a) && (m += this.config.suffix), a[this.config.restangularFields.httpConfig] = void 0, c(this.config, d, m, {
                    getList: this.config.withHttpValues(e, {
                        method: "GET",
                        params: k,
                        headers: l
                    }),
                    get: this.config.withHttpValues(e, {
                        method: "GET",
                        params: k,
                        headers: l
                    }),
                    jsonp: this.config.withHttpValues(e, {
                        method: "jsonp",
                        params: k,
                        headers: l
                    }),
                    put: this.config.withHttpValues(e, {
                        method: "PUT",
                        params: k,
                        headers: l
                    }),
                    post: this.config.withHttpValues(e, {
                        method: "POST",
                        params: k,
                        headers: l
                    }),
                    remove: this.config.withHttpValues(e, {
                        method: "DELETE",
                        params: k,
                        headers: l
                    }),
                    head: this.config.withHttpValues(e, {
                        method: "HEAD",
                        params: k,
                        headers: l
                    }),
                    trace: this.config.withHttpValues(e, {
                        method: "TRACE",
                        params: k,
                        headers: l
                    }),
                    options: this.config.withHttpValues(e, {
                        method: "OPTIONS",
                        params: k,
                        headers: l
                    }),
                    patch: this.config.withHttpValues(e, {
                        method: "PATCH",
                        params: k,
                        headers: l
                    })
                })
            };
            var g = function() {};
            g.prototype = new f, g.prototype.base = function(a) {
                var c = this;
                return _.reduce(this.parentsArray(a), function(a, d) {
                    var e, f = c.config.getUrlFromElem(d);
                    if (f) {
                        if (c.config.isAbsoluteUrl(f)) return f;
                        e = f
                    } else if (e = d[c.config.restangularFields.route], d[c.config.restangularFields.restangularCollection]) {
                        var g = d[c.config.restangularFields.ids];
                        g && (e += "/" + g.join(","))
                    } else {
                        var h;
                        h = c.config.useCannonicalId ? c.config.getCannonicalIdFromElem(d) : c.config.getIdFromElem(d), b.isValidId(h) && (e += "/" + (c.config.encodeIds ? encodeURIComponent(h) : h))
                    }
                    return a.replace(/\/$/, "") + "/" + e
                }, this.config.baseUrl)
            }, g.prototype.fetchUrl = function(a, b) {
                var c = this.base(a);
                return b && (c += "/" + b), c
            }, g.prototype.fetchRequestedUrl = function(a, c) {
                function d(a) {
                    var b = [];
                    for (var c in a) a.hasOwnProperty(c) && b.push(c);
                    return b.sort()
                }

                function e(a, b, c) {
                    for (var e = d(a), f = 0; f < e.length; f++) b.call(c, a[e[f]], e[f]);
                    return e
                }

                function f(a, b) {
                    return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, b ? "%20" : "+")
                }
                var g = this.fetchUrl(a, c),
                    h = a[b.restangularFields.reqParams];
                if (!h) return g;
                var i = [];
                return e(h, function(a, b) {
                    null != a && void 0 != a && (angular.isArray(a) || (a = [a]), angular.forEach(a, function(a) {
                        angular.isObject(a) && (a = angular.toJson(a)), i.push(f(b) + "=" + f(a))
                    }))
                }), g + (this.config.suffix || "") + (-1 === g.indexOf("?") ? "?" : "&") + i.join("&")
            }, b.urlCreatorFactory.path = g
        };
        var b = {};
        a.init(this, b), this.$get = ["$http", "$q", function(c, d) {
            function e(b) {
                function f(a, c, d, e, f) {
                    if (c[b.restangularFields.route] = d, c[b.restangularFields.getRestangularUrl] = _.bind(N.fetchUrl, N, c), c[b.restangularFields.getRequestedUrl] = _.bind(N.fetchRequestedUrl, N, c), c[b.restangularFields.addRestangularMethod] = _.bind(K, c), c[b.restangularFields.clone] = _.bind(r, c, c), c[b.restangularFields.reqParams] = _.isEmpty(e) ? null : e, c[b.restangularFields.withHttpConfig] = _.bind(z, c), c[b.restangularFields.one] = _.bind(g, c, c), c[b.restangularFields.all] = _.bind(h, c, c), c[b.restangularFields.several] = _.bind(i, c, c), c[b.restangularFields.oneUrl] = _.bind(j, c, c), c[b.restangularFields.allUrl] = _.bind(k, c, c), c[b.restangularFields.fromServer] = !!f, a && b.shouldSaveParent(d)) {
                        var l = b.getIdFromElem(a),
                            m = b.getUrlFromElem(a),
                            n = _.union(_.values(_.pick(b.restangularFields, ["route", "parentResource"])), b.extraFields),
                            o = _.pick(a, n);
                        b.isValidId(l) && b.setIdToElem(o, l), b.isValidId(m) && b.setUrlToElem(o, m), c[b.restangularFields.parentResource] = o
                    } else c[b.restangularFields.parentResource] = null;
                    return c
                }

                function g(a, c, d) {
                    if (_.isNumber(c) || _.isNumber(a)) {
                        var e = "You're creating a Restangular entity with the number ";
                        throw e += "instead of the route or the parent. You can't call .one(12)", new Error(e)
                    }
                    var f = {};
                    return b.setIdToElem(f, d), s(a, f, c, !1)
                }

                function h(a, b) {
                    return t(a, [], b, !1)
                }

                function i(a, c) {
                    var d = [];
                    return d[b.restangularFields.ids] = Array.prototype.splice.call(arguments, 2), t(a, d, c, !1)
                }

                function j(a, c, d) {
                    if (!c) throw new Error("Route is mandatory when creating new Restangular objects.");
                    var e = {};
                    return b.setUrlToElem(e, d), s(a, e, c, !1)
                }

                function k(a, c, d) {
                    if (!c) throw new Error("Route is mandatory when creating new Restangular objects.");
                    var e = {};
                    return b.setUrlToElem(e, d), t(a, e, c, !1)
                }

                function l(a, c, d) {
                    return a.call = _.bind(m, a), a.get = _.bind(n, a), a[b.restangularFields.restangularCollection] = c, c && (a.push = _.bind(m, a, "push")), a.$object = d, a
                }

                function m(a) {
                    var c = d.defer(),
                        e = arguments,
                        f = {};
                    return this.then(function(b) {
                        var d = Array.prototype.slice.call(e, 1),
                            g = b[a];
                        g.apply(b, d), f = b, c.resolve(b)
                    }), l(c.promise, this[b.restangularFields.restangularCollection], f)
                }

                function n(a) {
                    var c = d.defer(),
                        e = {};
                    return this.then(function(b) {
                        e = b[a], c.resolve(e)
                    }), l(c.promise, this[b.restangularFields.restangularCollection], e)
                }

                function o(a, c, d, e) {
                    return _.extend(e, d), b.fullResponse ? a.resolve(_.extend(c, {
                        data: d
                    })) : (a.resolve(d), void 0)
                }

                function p(a) {
                    if (_.isArray(a)) {
                        var c = [];
                        return _.each(a, function(a) {
                            c.push(p(a))
                        }), c
                    }
                    return _.omit(a, _.values(_.omit(b.restangularFields, "id")))
                }

                function q(a) {
                    a[b.restangularFields.customOperation] = _.bind(J, a), _.each(["put", "post", "get", "delete"], function(b) {
                        _.each(["do", "custom"], function(c) {
                            var d, e = "delete" === b ? "remove" : b,
                                f = c + b.toUpperCase();
                            d = "put" !== e && "post" !== e ? J : function(a, b, c, d, e) {
                                return _.bind(J, this)(a, c, d, e, b)
                            }, a[f] = _.bind(d, a, e)
                        })
                    }), a[b.restangularFields.customGETLIST] = _.bind(y, a), a[b.restangularFields.doGETLIST] = a[b.restangularFields.customGETLIST]
                }

                function r(a) {
                    var c = angular.copy(a);
                    return s(c[b.restangularFields.parentResource], c, c[b.restangularFields.route], !0)
                }

                function s(a, c, d, e, g, h) {
                    var i = b.onBeforeElemRestangularized(c, !1, d),
                        j = f(a, i, d, h, e);
                    return b.useCannonicalId && (j[b.restangularFields.cannonicalId] = b.getIdFromElem(j)), g && (j[b.restangularFields.getParentList] = function() {
                        return g
                    }), j[b.restangularFields.restangularCollection] = !1, j[b.restangularFields.get] = _.bind(B, j), j[b.restangularFields.getList] = _.bind(y, j), j[b.restangularFields.put] = _.bind(D, j), j[b.restangularFields.post] = _.bind(E, j), j[b.restangularFields.remove] = _.bind(C, j), j[b.restangularFields.head] = _.bind(F, j), j[b.restangularFields.trace] = _.bind(G, j), j[b.restangularFields.options] = _.bind(H, j), j[b.restangularFields.patch] = _.bind(I, j), q(j), b.transformElem(j, !1, d, M)
                }

                function t(a, c, d, e, g) {
                    var h = b.onBeforeElemRestangularized(c, !0, d),
                        i = f(a, h, d, g, e);
                    return i[b.restangularFields.restangularCollection] = !0, i[b.restangularFields.post] = _.bind(E, i, null), i[b.restangularFields.remove] = _.bind(C, i), i[b.restangularFields.head] = _.bind(F, i), i[b.restangularFields.trace] = _.bind(G, i), i[b.restangularFields.putElement] = _.bind(w, i), i[b.restangularFields.options] = _.bind(H, i), i[b.restangularFields.patch] = _.bind(I, i), i[b.restangularFields.get] = _.bind(v, i), i[b.restangularFields.getList] = _.bind(y, i, null), q(i), b.transformElem(i, !0, d, M)
                }

                function u(a, b, c) {
                    var d = t(a, b, c, !1);
                    return _.each(d, function(b) {
                        s(a, b, c, !1)
                    }), d
                }

                function v(a, b, c) {
                    return this.customGET(a.toString(), b, c)
                }

                function w(a, c, e) {
                    var f = this,
                        g = this[a],
                        h = d.defer(),
                        i = [];
                    return i = b.transformElem(i, !0, whatFetched, M), g.put(c, e).then(function(b) {
                        var c = r(f);
                        c[a] = b, i = c, h.resolve(c)
                    }, function(a) {
                        h.reject(a)
                    }), l(h.promise, !0, i)
                }

                function x(a, c, d, e, f, g) {
                    var h = b.responseExtractor(a, c, d, e, f, g),
                        i = f.headers("ETag");
                    return h && i && (h[b.restangularFields.etag] = i), h
                }

                function y(a, e, f) {
                    var g = this,
                        h = d.defer(),
                        i = "getList",
                        j = N.fetchUrl(this, a),
                        k = a || g[b.restangularFields.route],
                        m = b.fullRequestInterceptor(null, i, k, j, f || {}, e || {}, this[b.restangularFields.httpConfig] || {}),
                        n = [];
                    n = b.transformElem(n, !0, k, M);
                    var p = "getList";
                    return b.jsonp && (p = "jsonp"), N.resource(this, c, m.httpConfig, m.headers, m.params, a, this[b.restangularFields.etag], i)[p]().then(function(c) {
                        var d = c.data,
                            e = c.config.params,
                            f = x(d, i, k, j, c, h);
                        if (!_.isArray(f)) throw new Error("Response for getList SHOULD be an array and not an object or something else");
                        var l = _.map(f, function(c) {
                            return g[b.restangularFields.restangularCollection] ? s(g[b.restangularFields.parentResource], c, g[b.restangularFields.route], !0, f) : s(g, c, a, !0, f)
                        });
                        l = _.extend(f, l), g[b.restangularFields.restangularCollection] ? o(h, c, t(g[b.restangularFields.parentResource], l, g[b.restangularFields.route], !0, e), n) : o(h, c, t(g, l, a, !0, e), n)
                    }, function(a) {
                        304 === a.status && g[b.restangularFields.restangularCollection] ? o(h, a, g, n) : b.errorInterceptor(a, h) !== !1 && h.reject(a)
                    }), l(h.promise, !0, n)
                }

                function z(a) {
                    return this[b.restangularFields.httpConfig] = a, this
                }

                function A(a, e, f, g, h) {
                    var i = this,
                        j = d.defer(),
                        k = f || {},
                        m = e || this[b.restangularFields.route],
                        n = N.fetchUrl(this, e),
                        q = g || this,
                        r = q[b.restangularFields.etag] || ("post" != a ? this[b.restangularFields.etag] : null);
                    _.isObject(q) && b.isRestangularized(q) && (q = p(q));
                    var t = b.fullRequestInterceptor(q, a, m, n, h || {}, k || {}, this[b.restangularFields.httpConfig] || {}),
                        u = {};
                    u = b.transformElem(u, !1, m, M);
                    var v = function(c) {
                            var d = c.data,
                                f = c.config.params,
                                g = x(d, a, m, n, c, j);
                            g ? "post" !== a || i[b.restangularFields.restangularCollection] ? o(j, c, s(i[b.restangularFields.parentResource], g, i[b.restangularFields.route], !0, null, f), u) : o(j, c, s(i, g, e, !0, null, f), u) : o(j, c, void 0, u)
                        },
                        w = function(c) {
                            304 === c.status && b.isSafe(a) ? o(j, c, i, u) : b.errorInterceptor(c, j) !== !1 && j.reject(c)
                        },
                        y = a,
                        z = _.extend({}, t.headers),
                        A = b.isOverridenMethod(a);
                    return A ? (y = "post", z = _.extend(z, {
                        "X-HTTP-Method-Override": "remove" === a ? "DELETE" : a
                    })) : b.jsonp && "get" === y && (y = "jsonp"), b.isSafe(a) ? A ? N.resource(this, c, t.httpConfig, z, t.params, e, r, y)[y]({}).then(v, w) : N.resource(this, c, t.httpConfig, z, t.params, e, r, y)[y]().then(v, w) : N.resource(this, c, t.httpConfig, z, t.params, e, r, y)[y](t.element).then(v, w), l(j.promise, !1, u)
                }

                function B(a, b) {
                    return _.bind(A, this)("get", void 0, a, void 0, b)
                }

                function C(a, b) {
                    return _.bind(A, this)("remove", void 0, a, void 0, b)
                }

                function D(a, b) {
                    return _.bind(A, this)("put", void 0, a, void 0, b)
                }

                function E(a, b, c, d) {
                    return _.bind(A, this)("post", a, c, b, d)
                }

                function F(a, b) {
                    return _.bind(A, this)("head", void 0, a, void 0, b)
                }

                function G(a, b) {
                    return _.bind(A, this)("trace", void 0, a, void 0, b)
                }

                function H(a, b) {
                    return _.bind(A, this)("options", void 0, a, void 0, b)
                }

                function I(a, b, c) {
                    return _.bind(A, this)("patch", void 0, b, a, c)
                }

                function J(a, b, c, d, e) {
                    return _.bind(A, this)(a, b, c, e, d)
                }

                function K(a, c, d, e, f, g) {
                    var h;
                    h = "getList" === c ? _.bind(y, this, d) : _.bind(J, this, c, d);
                    var i = function(a, b, c) {
                        var d = _.defaults({
                            params: a,
                            headers: b,
                            elem: c
                        }, {
                            params: e,
                            headers: f,
                            elem: g
                        });
                        return h(d.params, d.headers, d.elem)
                    };
                    this[a] = b.isSafe(c) ? i : function(a, b, c) {
                        return i(b, c, a)
                    }
                }

                function L(c) {
                    var d = angular.copy(_.omit(b, "configuration"));
                    return a.init(d, d), c(d), e(d)
                }
                var M = {},
                    N = new b.urlCreatorFactory[b.urlCreator];
                return N.setConfig(b), a.init(M, b), M.copy = _.bind(r, M), M.withConfig = _.bind(L, M), M.one = _.bind(g, M, null), M.all = _.bind(h, M, null), M.several = _.bind(i, M, null), M.oneUrl = _.bind(j, M, null), M.allUrl = _.bind(k, M, null), M.stripRestangular = _.bind(p, M), M.restangularizeElement = _.bind(s, M), M.restangularizeCollection = _.bind(u, M), M
            }
            return e(b)
        }]
    })
}();