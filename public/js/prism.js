/* PrismJS 1.12.2
http://prismjs.com/download.html#themes=prism-twilight&languages=clike+javascript&plugins=line-highlight+line-numbers+autolinker+custom-class+file-highlight+highlight-keywords+autoloader+command-line+keep-markup */
var _self =
		"undefined" != typeof window
			? window
			: "undefined" != typeof WorkerGlobalScope &&
			  self instanceof WorkerGlobalScope
				? self
				: {},
	Prism = (function() {
		var e = /\blang(?:uage)?-(\w+)\b/i,
			t = 0,
			n = (_self.Prism = {
				manual: _self.Prism && _self.Prism.manual,
				disableWorkerMessageHandler:
					_self.Prism && _self.Prism.disableWorkerMessageHandler,
				util: {
					encode: function(e) {
						return e instanceof r
							? new r(e.type, n.util.encode(e.content), e.alias)
							: "Array" === n.util.type(e)
								? e.map(n.util.encode)
								: e
										.replace(/&/g, "&amp;")
										.replace(/</g, "&lt;")
										.replace(/\u00a0/g, " ");
					},
					type: function(e) {
						return Object.prototype.toString
							.call(e)
							.match(/\[object (\w+)\]/)[1];
					},
					objId: function(e) {
						return (
							e.__id || Object.defineProperty(e, "__id", { value: ++t }), e.__id
						);
					},
					clone: function(e) {
						var t = n.util.type(e);
						switch (t) {
							case "Object":
								var r = {};
								for (var a in e)
									e.hasOwnProperty(a) && (r[a] = n.util.clone(e[a]));
								return r;
							case "Array":
								return e.map(function(e) {
									return n.util.clone(e);
								});
						}
						return e;
					}
				},
				languages: {
					extend: function(e, t) {
						var r = n.util.clone(n.languages[e]);
						for (var a in t) r[a] = t[a];
						return r;
					},
					insertBefore: function(e, t, r, a) {
						a = a || n.languages;
						var l = a[e];
						if (2 == arguments.length) {
							r = arguments[1];
							for (var i in r) r.hasOwnProperty(i) && (l[i] = r[i]);
							return l;
						}
						var o = {};
						for (var s in l)
							if (l.hasOwnProperty(s)) {
								if (s == t)
									for (var i in r) r.hasOwnProperty(i) && (o[i] = r[i]);
								o[s] = l[s];
							}
						return (
							n.languages.DFS(n.languages, function(t, n) {
								n === a[e] && t != e && (this[t] = o);
							}),
							(a[e] = o)
						);
					},
					DFS: function(e, t, r, a) {
						a = a || {};
						for (var l in e)
							e.hasOwnProperty(l) &&
								(t.call(e, l, e[l], r || l),
								"Object" !== n.util.type(e[l]) || a[n.util.objId(e[l])]
									? "Array" !== n.util.type(e[l]) ||
									  a[n.util.objId(e[l])] ||
									  ((a[n.util.objId(e[l])] = !0),
									  n.languages.DFS(e[l], t, l, a))
									: ((a[n.util.objId(e[l])] = !0),
									  n.languages.DFS(e[l], t, null, a)));
					}
				},
				plugins: {},
				highlightAll: function(e, t) {
					n.highlightAllUnder(document, e, t);
				},
				highlightAllUnder: function(e, t, r) {
					var a = {
						callback: r,
						selector:
							'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
					};
					n.hooks.run("before-highlightall", a);
					for (
						var l, i = a.elements || e.querySelectorAll(a.selector), o = 0;
						(l = i[o++]);

					)
						n.highlightElement(l, t === !0, a.callback);
				},
				highlightElement: function(t, r, a) {
					for (var l, i, o = t; o && !e.test(o.className); ) o = o.parentNode;
					o &&
						((l = (o.className.match(e) || [, ""])[1].toLowerCase()),
						(i = n.languages[l])),
						(t.className =
							t.className.replace(e, "").replace(/\s+/g, " ") +
							" language-" +
							l),
						t.parentNode &&
							((o = t.parentNode),
							/pre/i.test(o.nodeName) &&
								(o.className =
									o.className.replace(e, "").replace(/\s+/g, " ") +
									" language-" +
									l));
					var s = t.textContent,
						g = { element: t, language: l, grammar: i, code: s };
					if ((n.hooks.run("before-sanity-check", g), !g.code || !g.grammar))
						return (
							g.code &&
								(n.hooks.run("before-highlight", g),
								(g.element.textContent = g.code),
								n.hooks.run("after-highlight", g)),
							n.hooks.run("complete", g),
							void 0
						);
					if ((n.hooks.run("before-highlight", g), r && _self.Worker)) {
						var u = new Worker(n.filename);
						(u.onmessage = function(e) {
							(g.highlightedCode = e.data),
								n.hooks.run("before-insert", g),
								(g.element.innerHTML = g.highlightedCode),
								a && a.call(g.element),
								n.hooks.run("after-highlight", g),
								n.hooks.run("complete", g);
						}),
							u.postMessage(
								JSON.stringify({
									language: g.language,
									code: g.code,
									immediateClose: !0
								})
							);
					} else
						(g.highlightedCode = n.highlight(g.code, g.grammar, g.language)),
							n.hooks.run("before-insert", g),
							(g.element.innerHTML = g.highlightedCode),
							a && a.call(t),
							n.hooks.run("after-highlight", g),
							n.hooks.run("complete", g);
				},
				highlight: function(e, t, a) {
					var l = n.tokenize(e, t);
					return r.stringify(n.util.encode(l), a);
				},
				matchGrammar: function(e, t, r, a, l, i, o) {
					var s = n.Token;
					for (var g in r)
						if (r.hasOwnProperty(g) && r[g]) {
							if (g == o) return;
							var u = r[g];
							u = "Array" === n.util.type(u) ? u : [u];
							for (var c = 0; c < u.length; ++c) {
								var h = u[c],
									f = h.inside,
									d = !!h.lookbehind,
									m = !!h.greedy,
									p = 0,
									y = h.alias;
								if (m && !h.pattern.global) {
									var v = h.pattern.toString().match(/[imuy]*$/)[0];
									h.pattern = RegExp(h.pattern.source, v + "g");
								}
								h = h.pattern || h;
								for (var b = a, k = l; b < t.length; k += t[b].length, ++b) {
									var w = t[b];
									if (t.length > e.length) return;
									if (!(w instanceof s)) {
										h.lastIndex = 0;
										var _ = h.exec(w),
											P = 1;
										if (!_ && m && b != t.length - 1) {
											if (((h.lastIndex = k), (_ = h.exec(e)), !_)) break;
											for (
												var A = _.index + (d ? _[1].length : 0),
													j = _.index + _[0].length,
													x = b,
													O = k,
													N = t.length;
												N > x && (j > O || (!t[x].type && !t[x - 1].greedy));
												++x
											)
												(O += t[x].length), A >= O && (++b, (k = O));
											if (t[b] instanceof s || t[x - 1].greedy) continue;
											(P = x - b), (w = e.slice(k, O)), (_.index -= k);
										}
										if (_) {
											d && (p = _[1] ? _[1].length : 0);
											var A = _.index + p,
												_ = _[0].slice(p),
												j = A + _.length,
												S = w.slice(0, A),
												C = w.slice(j),
												M = [b, P];
											S && (++b, (k += S.length), M.push(S));
											var E = new s(g, f ? n.tokenize(_, f) : _, y, _, m);
											if (
												(M.push(E),
												C && M.push(C),
												Array.prototype.splice.apply(t, M),
												1 != P && n.matchGrammar(e, t, r, b, k, !0, g),
												i)
											)
												break;
										} else if (i) break;
									}
								}
							}
						}
				},
				tokenize: function(e, t) {
					var r = [e],
						a = t.rest;
					if (a) {
						for (var l in a) t[l] = a[l];
						delete t.rest;
					}
					return n.matchGrammar(e, r, t, 0, 0, !1), r;
				},
				hooks: {
					all: {},
					add: function(e, t) {
						var r = n.hooks.all;
						(r[e] = r[e] || []), r[e].push(t);
					},
					run: function(e, t) {
						var r = n.hooks.all[e];
						if (r && r.length) for (var a, l = 0; (a = r[l++]); ) a(t);
					}
				}
			}),
			r = (n.Token = function(e, t, n, r, a) {
				(this.type = e),
					(this.content = t),
					(this.alias = n),
					(this.length = 0 | (r || "").length),
					(this.greedy = !!a);
			});
		if (
			((r.stringify = function(e, t, a) {
				if ("string" == typeof e) return e;
				if ("Array" === n.util.type(e))
					return e
						.map(function(n) {
							return r.stringify(n, t, e);
						})
						.join("");
				var l = {
					type: e.type,
					content: r.stringify(e.content, t, a),
					tag: "span",
					classes: ["token", e.type],
					attributes: {},
					language: t,
					parent: a
				};
				if (e.alias) {
					var i = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
					Array.prototype.push.apply(l.classes, i);
				}
				n.hooks.run("wrap", l);
				var o = Object.keys(l.attributes)
					.map(function(e) {
						return (
							e + '="' + (l.attributes[e] || "").replace(/"/g, "&quot;") + '"'
						);
					})
					.join(" ");
				return (
					"<" +
					l.tag +
					' class="' +
					l.classes.join(" ") +
					'"' +
					(o ? " " + o : "") +
					">" +
					l.content +
					"</" +
					l.tag +
					">"
				);
			}),
			!_self.document)
		)
			return _self.addEventListener
				? (n.disableWorkerMessageHandler ||
						_self.addEventListener(
							"message",
							function(e) {
								var t = JSON.parse(e.data),
									r = t.language,
									a = t.code,
									l = t.immediateClose;
								_self.postMessage(n.highlight(a, n.languages[r], r)),
									l && _self.close();
							},
							!1
						),
				  _self.Prism)
				: _self.Prism;
		var a =
			document.currentScript ||
			[].slice.call(document.getElementsByTagName("script")).pop();
		return (
			a &&
				((n.filename = a.src),
				n.manual ||
					a.hasAttribute("data-manual") ||
					("loading" !== document.readyState
						? window.requestAnimationFrame
							? window.requestAnimationFrame(n.highlightAll)
							: window.setTimeout(n.highlightAll, 16)
						: document.addEventListener("DOMContentLoaded", n.highlightAll))),
			_self.Prism
		);
	})();
"undefined" != typeof module && module.exports && (module.exports = Prism),
	"undefined" != typeof global && (global.Prism = Prism);
Prism.languages.clike = {
	comment: [
		{ pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
		{ pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }
	],
	string: {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: !0
	},
	"class-name": {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
		lookbehind: !0,
		inside: { punctuation: /[.\\]/ }
	},
	keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	boolean: /\b(?:true|false)\b/,
	function: /[a-z0-9_]+(?=\()/i,
	number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
	operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	punctuation: /[{}[\];(),.:]/
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
	keyword: /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	number: /\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
	function: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,
	operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
})),
	Prism.languages.insertBefore("javascript", "keyword", {
		regex: {
			pattern: /(^|[^\/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
			lookbehind: !0,
			greedy: !0
		},
		"function-variable": {
			pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,
			alias: "function"
		}
	}),
	Prism.languages.insertBefore("javascript", "string", {
		"template-string": {
			pattern: /`(?:\\[\s\S]|[^\\`])*`/,
			greedy: !0,
			inside: {
				interpolation: {
					pattern: /\$\{[^}]+\}/,
					inside: {
						"interpolation-punctuation": {
							pattern: /^\$\{|\}$/,
							alias: "punctuation"
						},
						rest: Prism.languages.javascript
					}
				},
				string: /[\s\S]+/
			}
		}
	}),
	Prism.languages.markup &&
		Prism.languages.insertBefore("markup", "tag", {
			script: {
				pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
				lookbehind: !0,
				inside: Prism.languages.javascript,
				alias: "language-javascript",
				greedy: !0
			}
		}),
	(Prism.languages.js = Prism.languages.javascript);
!(function() {
	function e(e, t) {
		return Array.prototype.slice.call((t || document).querySelectorAll(e));
	}
	function t(e, t) {
		return (
			(t = " " + t + " "),
			(" " + e.className + " ").replace(/[\n\t]/g, " ").indexOf(t) > -1
		);
	}
	function n(e, n, i) {
		n = "string" == typeof n ? n : e.getAttribute("data-line");
		for (
			var o,
				l = n.replace(/\s+/g, "").split(","),
				a = +e.getAttribute("data-line-offset") || 0,
				s = r() ? parseInt : parseFloat,
				d = s(getComputedStyle(e).lineHeight),
				u = t(e, "line-numbers"),
				c = 0;
			(o = l[c++]);

		) {
			var p = o.split("-"),
				m = +p[0],
				f = +p[1] || m,
				h =
					e.querySelector('.line-highlight[data-range="' + o + '"]') ||
					document.createElement("div");
			if (
				(h.setAttribute("aria-hidden", "true"),
				h.setAttribute("data-range", o),
				(h.className = (i || "") + " line-highlight"),
				u && Prism.plugins.lineNumbers)
			) {
				var g = Prism.plugins.lineNumbers.getLine(e, m),
					y = Prism.plugins.lineNumbers.getLine(e, f);
				g && (h.style.top = g.offsetTop + "px"),
					y &&
						(h.style.height =
							y.offsetTop - g.offsetTop + y.offsetHeight + "px");
			} else
				h.setAttribute("data-start", m),
					f > m && h.setAttribute("data-end", f),
					(h.style.top = (m - a - 1) * d + "px"),
					(h.textContent = new Array(f - m + 2).join(" \n"));
			u ? e.appendChild(h) : (e.querySelector("code") || e).appendChild(h);
		}
	}
	function i() {
		var t = location.hash.slice(1);
		e(".temporary.line-highlight").forEach(function(e) {
			e.parentNode.removeChild(e);
		});
		var i = (t.match(/\.([\d,-]+)$/) || [, ""])[1];
		if (i && !document.getElementById(t)) {
			var r = t.slice(0, t.lastIndexOf(".")),
				o = document.getElementById(r);
			o &&
				(o.hasAttribute("data-line") || o.setAttribute("data-line", ""),
				n(o, i, "temporary "),
				document.querySelector(".temporary.line-highlight").scrollIntoView());
		}
	}
	if (
		"undefined" != typeof self &&
		self.Prism &&
		self.document &&
		document.querySelector
	) {
		var r = (function() {
				var e;
				return function() {
					if ("undefined" == typeof e) {
						var t = document.createElement("div");
						(t.style.fontSize = "13px"),
							(t.style.lineHeight = "1.5"),
							(t.style.padding = 0),
							(t.style.border = 0),
							(t.innerHTML = "&nbsp;<br />&nbsp;"),
							document.body.appendChild(t),
							(e = 38 === t.offsetHeight),
							document.body.removeChild(t);
					}
					return e;
				};
			})(),
			o = 0;
		Prism.hooks.add("before-sanity-check", function(t) {
			var n = t.element.parentNode,
				i = n && n.getAttribute("data-line");
			if (n && i && /pre/i.test(n.nodeName)) {
				var r = 0;
				e(".line-highlight", n).forEach(function(e) {
					(r += e.textContent.length), e.parentNode.removeChild(e);
				}),
					r &&
						/^( \n)+$/.test(t.code.slice(-r)) &&
						(t.code = t.code.slice(0, -r));
			}
		}),
			Prism.hooks.add("complete", function l(e) {
				var r = e.element.parentNode,
					a = r && r.getAttribute("data-line");
				if (r && a && /pre/i.test(r.nodeName)) {
					clearTimeout(o);
					var s = Prism.plugins.lineNumbers,
						d = e.plugins && e.plugins.lineNumbers;
					t(r, "line-numbers") && s && !d
						? Prism.hooks.add("line-numbers", l)
						: (n(r, a), (o = setTimeout(i, 1)));
				}
			}),
			window.addEventListener("hashchange", i),
			window.addEventListener("resize", function() {
				var e = document.querySelectorAll("pre[data-line]");
				Array.prototype.forEach.call(e, function(e) {
					n(e);
				});
			});
	}
})();
!(function() {
	if ("undefined" != typeof self && self.Prism && self.document) {
		var e = "line-numbers",
			t = /\n(?!$)/g,
			n = function(e) {
				var n = r(e),
					s = n["white-space"];
				if ("pre-wrap" === s || "pre-line" === s) {
					var l = e.querySelector("code"),
						i = e.querySelector(".line-numbers-rows"),
						a = e.querySelector(".line-numbers-sizer"),
						o = l.textContent.split(t);
					a ||
						((a = document.createElement("span")),
						(a.className = "line-numbers-sizer"),
						l.appendChild(a)),
						(a.style.display = "block"),
						o.forEach(function(e, t) {
							a.textContent = e || "\n";
							var n = a.getBoundingClientRect().height;
							i.children[t].style.height = n + "px";
						}),
						(a.textContent = ""),
						(a.style.display = "none");
				}
			},
			r = function(e) {
				return e
					? window.getComputedStyle
						? getComputedStyle(e)
						: e.currentStyle || null
					: null;
			};
		window.addEventListener("resize", function() {
			Array.prototype.forEach.call(document.querySelectorAll("pre." + e), n);
		}),
			Prism.hooks.add("complete", function(e) {
				if (e.code) {
					var r = e.element.parentNode,
						s = /\s*\bline-numbers\b\s*/;
					if (
						r &&
						/pre/i.test(r.nodeName) &&
						(s.test(r.className) || s.test(e.element.className)) &&
						!e.element.querySelector(".line-numbers-rows")
					) {
						s.test(e.element.className) &&
							(e.element.className = e.element.className.replace(s, " ")),
							s.test(r.className) || (r.className += " line-numbers");
						var l,
							i = e.code.match(t),
							a = i ? i.length + 1 : 1,
							o = new Array(a + 1);
						(o = o.join("<span></span>")),
							(l = document.createElement("span")),
							l.setAttribute("aria-hidden", "true"),
							(l.className = "line-numbers-rows"),
							(l.innerHTML = o),
							r.hasAttribute("data-start") &&
								(r.style.counterReset =
									"linenumber " +
									(parseInt(r.getAttribute("data-start"), 10) - 1)),
							e.element.appendChild(l),
							n(r),
							Prism.hooks.run("line-numbers", e);
					}
				}
			}),
			Prism.hooks.add("line-numbers", function(e) {
				(e.plugins = e.plugins || {}), (e.plugins.lineNumbers = !0);
			}),
			(Prism.plugins.lineNumbers = {
				getLine: function(t, n) {
					if ("PRE" === t.tagName && t.classList.contains(e)) {
						var r = t.querySelector(".line-numbers-rows"),
							s = parseInt(t.getAttribute("data-start"), 10) || 1,
							l = s + (r.children.length - 1);
						s > n && (n = s), n > l && (n = l);
						var i = n - s;
						return r.children[i];
					}
				}
			});
	}
})();
!(function() {
	if (
		("undefined" == typeof self || self.Prism) &&
		("undefined" == typeof global || global.Prism)
	) {
		var i = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~\/.:=&]+(?:\?[\w\-+%~\/.:#=?&!$'()*,;]*)?(?:#[\w\-+%~\/.:#=?&!$'()*,;]*)?/,
			n = /\b\S+@[\w.]+[a-z]{2}/,
			e = /\[([^\]]+)]\(([^)]+)\)/,
			t = ["comment", "url", "attr-value", "string"];
		(Prism.plugins.autolinker = {
			processGrammar: function(r) {
				r &&
					!r["url-link"] &&
					(Prism.languages.DFS(r, function(r, a, l) {
						t.indexOf(l) > -1 &&
							"Array" !== Prism.util.type(a) &&
							(a.pattern || (a = this[r] = { pattern: a }),
							(a.inside = a.inside || {}),
							"comment" == l && (a.inside["md-link"] = e),
							"attr-value" == l
								? Prism.languages.insertBefore(
										"inside",
										"punctuation",
										{ "url-link": i },
										a
								  )
								: (a.inside["url-link"] = i),
							(a.inside["email-link"] = n));
					}),
					(r["url-link"] = i),
					(r["email-link"] = n));
			}
		}),
			Prism.hooks.add("before-highlight", function(i) {
				Prism.plugins.autolinker.processGrammar(i.grammar);
			}),
			Prism.hooks.add("wrap", function(i) {
				if (/-link$/.test(i.type)) {
					i.tag = "a";
					var n = i.content;
					if ("email-link" == i.type && 0 != n.indexOf("mailto:"))
						n = "mailto:" + n;
					else if ("md-link" == i.type) {
						var t = i.content.match(e);
						(n = t[2]), (i.content = t[1]);
					}
					i.attributes.href = n;
				}
				try {
					i.content = decodeURIComponent(i.content);
				} catch (r) {}
			});
	}
})();
!(function() {
	if (
		("undefined" != typeof self && self.Prism) ||
		("undefined" != typeof global && global.Prism)
	) {
		var s = { classMap: {} };
		(Prism.plugins.customClass = {
			map: function(i) {
				s.classMap = i;
			},
			prefix: function(i) {
				s.prefixString = i;
			}
		}),
			Prism.hooks.add("wrap", function(i) {
				(s.classMap || s.prefixString) &&
					(i.classes = i.classes.map(function(i) {
						return (s.prefixString || "") + (s.classMap[i] || i);
					}));
			});
	}
})();
!(function() {
	"undefined" != typeof self &&
		self.Prism &&
		self.document &&
		document.createRange &&
		((Prism.plugins.KeepMarkup = !0),
		Prism.hooks.add("before-highlight", function(e) {
			if (e.element.children.length) {
				var n = 0,
					o = [],
					t = function(e, d) {
						var r = {};
						d || ((r.clone = e.cloneNode(!1)), (r.posOpen = n), o.push(r));
						for (var a = 0, s = e.childNodes.length; s > a; a++) {
							var l = e.childNodes[a];
							1 === l.nodeType
								? t(l)
								: 3 === l.nodeType && (n += l.data.length);
						}
						d || (r.posClose = n);
					};
				t(e.element, !0), o && o.length && (e.keepMarkup = o);
			}
		}),
		Prism.hooks.add("after-highlight", function(e) {
			if (e.keepMarkup && e.keepMarkup.length) {
				var n = function(e, o) {
					for (var t = 0, d = e.childNodes.length; d > t; t++) {
						var r = e.childNodes[t];
						if (1 === r.nodeType) {
							if (!n(r, o)) return !1;
						} else
							3 === r.nodeType &&
								(!o.nodeStart &&
									o.pos + r.data.length > o.node.posOpen &&
									((o.nodeStart = r),
									(o.nodeStartPos = o.node.posOpen - o.pos)),
								o.nodeStart &&
									o.pos + r.data.length >= o.node.posClose &&
									((o.nodeEnd = r), (o.nodeEndPos = o.node.posClose - o.pos)),
								(o.pos += r.data.length));
						if (o.nodeStart && o.nodeEnd) {
							var a = document.createRange();
							return (
								a.setStart(o.nodeStart, o.nodeStartPos),
								a.setEnd(o.nodeEnd, o.nodeEndPos),
								o.node.clone.appendChild(a.extractContents()),
								a.insertNode(o.node.clone),
								a.detach(),
								!1
							);
						}
					}
					return !0;
				};
				e.keepMarkup.forEach(function(o) {
					n(e.element, { node: o, pos: 0 });
				}),
					(e.highlightedCode = e.element.innerHTML);
			}
		}));
})();
!(function() {
	"undefined" != typeof self &&
		self.Prism &&
		self.document &&
		document.querySelector &&
		((self.Prism.fileHighlight = function() {
			var e = {
				js: "javascript",
				py: "python",
				rb: "ruby",
				ps1: "powershell",
				psm1: "powershell",
				sh: "bash",
				bat: "batch",
				h: "c",
				tex: "latex"
			};
			Array.prototype.slice
				.call(document.querySelectorAll("pre[data-src]"))
				.forEach(function(t) {
					for (
						var s,
							a = t.getAttribute("data-src"),
							n = t,
							r = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
						n && !r.test(n.className);

					)
						n = n.parentNode;
					if ((n && (s = (t.className.match(r) || [, ""])[1]), !s)) {
						var o = (a.match(/\.(\w+)$/) || [, ""])[1];
						s = e[o] || o;
					}
					var l = document.createElement("code");
					(l.className = "language-" + s),
						(t.textContent = ""),
						(l.textContent = "Loading…"),
						t.appendChild(l);
					var i = new XMLHttpRequest();
					i.open("GET", a, !0),
						(i.onreadystatechange = function() {
							4 == i.readyState &&
								(i.status < 400 && i.responseText
									? ((l.textContent = i.responseText),
									  Prism.highlightElement(l))
									: (l.textContent =
											i.status >= 400
												? "✖ Error " +
												  i.status +
												  " while fetching file: " +
												  i.statusText
												: "✖ Error: File does not exist or is empty"));
						}),
						i.send(null);
				});
		}),
		document.addEventListener("DOMContentLoaded", self.Prism.fileHighlight));
})();
!(function() {
	("undefined" != typeof self && !self.Prism) ||
		("undefined" != typeof global && !global.Prism) ||
		Prism.hooks.add("wrap", function(e) {
			"keyword" === e.type && e.classes.push("keyword-" + e.content);
		});
})();
!(function() {
	if (
		"undefined" != typeof self &&
		self.Prism &&
		self.document &&
		document.createElement
	) {
		var e = {
				javascript: "clike",
				actionscript: "javascript",
				arduino: "cpp",
				aspnet: "markup",
				bison: "c",
				c: "clike",
				csharp: "clike",
				cpp: "c",
				coffeescript: "javascript",
				crystal: "ruby",
				"css-extras": "css",
				d: "clike",
				dart: "clike",
				django: "markup",
				erb: ["markup", "ruby"],
				fsharp: "clike",
				flow: "javascript",
				glsl: "clike",
				go: "clike",
				groovy: "clike",
				haml: "ruby",
				handlebars: "markup",
				haxe: "clike",
				java: "clike",
				jolie: "clike",
				kotlin: "clike",
				less: "css",
				markdown: "markup",
				n4js: "javascript",
				nginx: "clike",
				objectivec: "c",
				opencl: "cpp",
				parser: "markup",
				php: "clike",
				"php-extras": "php",
				plsql: "sql",
				processing: "clike",
				protobuf: "clike",
				pug: "javascript",
				qore: "clike",
				jsx: ["markup", "javascript"],
				tsx: ["jsx", "typescript"],
				reason: "clike",
				ruby: "clike",
				sass: "css",
				scss: "css",
				scala: "java",
				smarty: "markup",
				swift: "clike",
				textile: "markup",
				twig: "markup",
				typescript: "javascript",
				vbnet: "basic",
				wiki: "markup",
				xeora: "markup"
			},
			a = {},
			c = "none",
			s = document.getElementsByTagName("script");
		s = s[s.length - 1];
		var r = "components/";
		if (s.hasAttribute("data-autoloader-path")) {
			var t = s.getAttribute("data-autoloader-path").trim();
			t.length > 0 &&
				!/^[a-z]+:\/\//i.test(s.src) &&
				(r = t.replace(/\/?$/, "/"));
		} else
			/[\w-]+\.js$/.test(s.src) &&
				(r = s.src.replace(/[\w-]+\.js$/, "components/"));
		var n = (Prism.plugins.autoloader = {
				languages_path: r,
				use_minified: !0
			}),
			s = function(e, a, c) {
				var s = document.createElement("script");
				(s.src = e),
					(s.async = !0),
					(s.onload = function() {
						document.body.removeChild(s), a && a();
					}),
					(s.onerror = function() {
						document.body.removeChild(s), c && c();
					}),
					document.body.appendChild(s);
			},
			i = function(e) {
				return (
					n.languages_path +
					"prism-" +
					e +
					(n.use_minified ? ".min" : "") +
					".js"
				);
			},
			l = function(e, c) {
				var s = a[e];
				s || (s = a[e] = {});
				var r = c.getAttribute("data-dependencies");
				!r &&
					c.parentNode &&
					"pre" === c.parentNode.tagName.toLowerCase() &&
					(r = c.parentNode.getAttribute("data-dependencies")),
					(r = r ? r.split(/\s*,\s*/g) : []),
					o(r, function() {
						p(e, function() {
							Prism.highlightElement(c);
						});
					});
			},
			o = function(e, a, c) {
				"string" == typeof e && (e = [e]);
				var s = 0,
					r = e.length,
					t = function() {
						r > s
							? p(
									e[s],
									function() {
										s++, t();
									},
									function() {
										c && c(e[s]);
									}
							  )
							: s === r && a && a(e);
					};
				t();
			},
			p = function(c, r, t) {
				var n = function() {
						var e = !1;
						c.indexOf("!") >= 0 && ((e = !0), (c = c.replace("!", "")));
						var n = a[c];
						if (
							(n || (n = a[c] = {}),
							r &&
								(n.success_callbacks || (n.success_callbacks = []),
								n.success_callbacks.push(r)),
							t &&
								(n.error_callbacks || (n.error_callbacks = []),
								n.error_callbacks.push(t)),
							!e && Prism.languages[c])
						)
							u(c);
						else if (!e && n.error) k(c);
						else if (e || !n.loading) {
							n.loading = !0;
							var l = i(c);
							s(
								l,
								function() {
									(n.loading = !1), u(c);
								},
								function() {
									(n.loading = !1), (n.error = !0), k(c);
								}
							);
						}
					},
					l = e[c];
				l && l.length ? o(l, n) : n();
			},
			u = function(e) {
				a[e] &&
					a[e].success_callbacks &&
					a[e].success_callbacks.length &&
					a[e].success_callbacks.forEach(function(a) {
						a(e);
					});
			},
			k = function(e) {
				a[e] &&
					a[e].error_callbacks &&
					a[e].error_callbacks.length &&
					a[e].error_callbacks.forEach(function(a) {
						a(e);
					});
			};
		Prism.hooks.add("complete", function(e) {
			e.element &&
				e.language &&
				!e.grammar &&
				e.language !== c &&
				l(e.language, e.element);
		});
	}
})();
!(function() {
	"undefined" != typeof self &&
		self.Prism &&
		self.document &&
		Prism.hooks.add("complete", function(e) {
			if (e.code) {
				var t = e.element.parentNode,
					a = /\s*\bcommand-line\b\s*/;
				if (
					t &&
					/pre/i.test(t.nodeName) &&
					(a.test(t.className) || a.test(e.element.className)) &&
					!e.element.querySelector(".command-line-prompt")
				) {
					a.test(e.element.className) &&
						(e.element.className = e.element.className.replace(a, "")),
						a.test(t.className) || (t.className += " command-line");
					var n = function(e, a) {
							return (t.getAttribute(e) || a).replace(/"/g, "&quot");
						},
						s = new Array(1 + e.code.split("\n").length),
						r = n("data-prompt", "");
					if ("" !== r) s = s.join('<span data-prompt="' + r + '"></span>');
					else {
						var l = n("data-user", "user"),
							m = n("data-host", "localhost");
						s = s.join(
							'<span data-user="' + l + '" data-host="' + m + '"></span>'
						);
					}
					var o = document.createElement("span");
					(o.className = "command-line-prompt"), (o.innerHTML = s);
					var i = t.getAttribute("data-output") || "";
					i = i.split(",");
					for (var c = 0; c < i.length; c++) {
						var p = i[c].split("-"),
							d = parseInt(p[0]),
							u = d;
						if (
							(2 === p.length && (u = parseInt(p[1])), !isNaN(d) && !isNaN(u))
						)
							for (var f = d; u >= f && f <= o.children.length; f++) {
								var N = o.children[f - 1];
								N.removeAttribute("data-user"),
									N.removeAttribute("data-host"),
									N.removeAttribute("data-prompt");
							}
					}
					e.element.innerHTML = o.outerHTML + e.element.innerHTML;
				}
			}
		});
})();
