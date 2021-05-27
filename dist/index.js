module.exports = function(e, t) {
    "use strict";
    var r = {};

    function __webpack_require__(t) {
        if (r[t]) {
            return r[t].exports
        }
        var n = r[t] = {
            i: t,
            l: false,
            exports: {}
        };
        e[t].call(n.exports, n, n.exports, __webpack_require__);
        n.l = true;
        return n.exports
    }
    __webpack_require__.ab = __dirname + "/";

    function startup() {
        return __webpack_require__(526)
    }
    return startup()
}({
    87: function(e) {
        e.exports = require("os")
    },
    129: function(e) {
        e.exports = require("child_process")
    },
    431: function(e, t, r) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        const n = r(87);

        function issueCommand(e, t, r) {
            const o = new Command(e, t, r);
            process.stdout.write(o.toString() + n.EOL)
        }
        t.issueCommand = issueCommand;

        function issue(e, t = "") {
            issueCommand(e, {}, t)
        }
        t.issue = issue;
        const o = "::";
        class Command {
            constructor(e, t, r) {
                if (!e) {
                    e = "missing.command"
                }
                this.command = e;
                this.properties = t;
                this.message = r
            }
            toString() {
                let e = o + this.command;
                if (this.properties && Object.keys(this.properties).length > 0) {
                    e += " ";
                    for (const t in this.properties) {
                        if (this.properties.hasOwnProperty(t)) {
                            const r = this.properties[t];
                            if (r) {
                                e += `${t}=${escape(`${r||""}`)},`
                            }
                        }
                    }
                }
                e += o;
                const t = `${this.message||""}`;
                e += escapeData(t);
                return e
            }
        }

        function escapeData(e) {
            return e.replace(/\r/g, "%0D").replace(/\n/g, "%0A")
        }

        function escape(e) {
            return e.replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/]/g, "%5D").replace(/;/g, "%3B")
        }
    },
    470: function(e, t, r) {
        "use strict";
        var n = this && this.__awaiter || function(e, t, r, n) {
            function adopt(e) {
                return e instanceof r ? e : new r(function(t) {
                    t(e)
                })
            }
            return new(r || (r = Promise))(function(r, o) {
                function fulfilled(e) {
                    try {
                        step(n.next(e))
                    } catch (e) {
                        o(e)
                    }
                }

                function rejected(e) {
                    try {
                        step(n["throw"](e))
                    } catch (e) {
                        o(e)
                    }
                }

                function step(e) {
                    e.done ? r(e.value) : adopt(e.value).then(fulfilled, rejected)
                }
                step((n = n.apply(e, t || [])).next())
            })
        };
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        const o = r(431);
        const i = r(87);
        const s = r(622);
        var u;
        (function(e) {
            e[e["Success"] = 0] = "Success";
            e[e["Failure"] = 1] = "Failure"
        })(u = t.ExitCode || (t.ExitCode = {}));

        function exportVariable(e, t) {
            process.env[e] = t;
            o.issueCommand("set-env", {
                name: e
            }, t)
        }
        t.exportVariable = exportVariable;

        function setSecret(e) {
            o.issueCommand("add-mask", {}, e)
        }
        t.setSecret = setSecret;

        function addPath(e) {
            o.issueCommand("add-path", {}, e);
            process.env["PATH"] = `${e}${s.delimiter}${process.env["PATH"]}`
        }
        t.addPath = addPath;

        function getInput(e, t) {
            const r = process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`] || "";
            if (t && t.required && !r) {
                throw new Error(`Input required and not supplied: ${e}`)
            }
            return r.trim()
        }
        t.getInput = getInput;

        function setOutput(e, t) {
            o.issueCommand("set-output", {
                name: e
            }, t)
        }
        t.setOutput = setOutput;

        function setFailed(e) {
            process.exitCode = u.Failure;
            error(e)
        }
        t.setFailed = setFailed;

        function debug(e) {
            o.issueCommand("debug", {}, e)
        }
        t.debug = debug;

        function error(e) {
            o.issue("error", e)
        }
        t.error = error;

        function warning(e) {
            o.issue("warning", e)
        }
        t.warning = warning;

        function info(e) {
            process.stdout.write(e + i.EOL)
        }
        t.info = info;

        function startGroup(e) {
            o.issue("group", e)
        }
        t.startGroup = startGroup;

        function endGroup() {
            o.issue("endgroup")
        }
        t.endGroup = endGroup;

        function group(e, t) {
            return n(this, void 0, void 0, function*() {
                startGroup(e);
                let r;
                try {
                    r = yield t()
                } finally {
                    endGroup()
                }
                return r
            })
        }
        t.group = group;

        function saveState(e, t) {
            o.issueCommand("save-state", {
                name: e
            }, t)
        }
        t.saveState = saveState;

        function getState(e) {
            return process.env[`STATE_${e}`] || ""
        }
        t.getState = getState
    },
    526: function(e, t, r) {
        "use strict";
        var n = this && this.__await || function(e) {
            return this instanceof n ? (this.v = e, this) : new n(e)
        };
        var o = this && this.__asyncValues || function(e) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var t = e[Symbol.asyncIterator],
                r;
            return t ? t.call(e) : (e = typeof __values === "function" ? __values(e) : e[Symbol.iterator](), r = {}, verb("next"), verb("throw"), verb("return"), r[Symbol.asyncIterator] = function() {
                return this
            }, r);

            function verb(t) {
                r[t] = e[t] && function(r) {
                    return new Promise(function(n, o) {
                        r = e[t](r), settle(n, o, r.done, r.value)
                    })
                }
            }

            function settle(e, t, r, n) {
                Promise.resolve(n).then(function(t) {
                    e({
                        value: t,
                        done: r
                    })
                }, t)
            }
        };
        var i = this && this.__asyncDelegator || function(e) {
            var t, r;
            return t = {}, verb("next"), verb("throw", function(e) {
                throw e
            }), verb("return"), t[Symbol.iterator] = function() {
                return this
            }, t;

            function verb(o, i) {
                t[o] = e[o] ? function(t) {
                    return (r = !r) ? {
                        value: n(e[o](t)),
                        done: o === "return"
                    } : i ? i(t) : t
                } : i
            }
        };
        var s = this && this.__asyncGenerator || function(e, t, r) {
            if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
            var o = r.apply(e, t || []),
                i, s = [];
            return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
                return this
            }, i;

            function verb(e) {
                if (o[e]) i[e] = function(t) {
                    return new Promise(function(r, n) {
                        s.push([e, t, r, n]) > 1 || resume(e, t)
                    })
                }
            }

            function resume(e, t) {
                try {
                    step(o[e](t))
                } catch (e) {
                    settle(s[0][3], e)
                }
            }

            function step(e) {
                e.value instanceof n ? Promise.resolve(e.value.v).then(fulfill, reject) : settle(s[0][2], e)
            }

            function fulfill(e) {
                resume("next", e)
            }

            function reject(e) {
                resume("throw", e)
            }

            function settle(e, t) {
                if (e(t), s.shift(), s.length) resume(s[0][0], s[0][1])
            }
        };
        var u = this && this.__importStar || function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (e != null)
                for (var r in e)
                    if (Object.hasOwnProperty.call(e, r)) t[r] = e[r];
            t["default"] = e;
            return t
        };
        var c = this && this.__importDefault || function(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        };
        Object.defineProperty(t, "__esModule", {
            value: true
        });
        const a = u(r(470));
        const f = r(747);
        const l = c(r(622));
        const p = c(r(669));
        const d = r(129);
        const m = r(765);
        const g = p.default.promisify(d.exec);
        const h = m.env["TEMP"] + "\\certificate.pfx";
        const v = "C:/Program Files (x86)/Windows Kits/10/bin/10.0.17763.0/x86/signtool.exe";
        const y = [".dll", ".exe", ".sys", ".vxd", ".msix", ".msixbundle", ".appx", ".appxbundle", ".msi", ".msp", ".msm", ".cab", ".ps1", ".psm1"];

        function sleep(e) {
            if (e > 0) console.log(`Waiting for ${e} seconds.`);
            return new Promise(t => setTimeout(t, e * 1e3))
        }
        async function createCertificatePfx() {
            const e = a.getInput("certificate");
            const t = Buffer.from(e, "base64");
            if (t.length == 0) {
                console.log('The value for "certificate" is not set.');
                return false
            }
            console.log(`Writing ${t.length} bytes to ${h}.`);
            await f.promises.writeFile(h, t);
            return true
        }
        async function addCertificateToStore() {
            try {
                const t = a.getInput("password");
                if (t == "") {
                    console.log("Password is required to add pfx certificate to store");
                    return false
                }
                var e = `certutil -f -p ${t} -importpfx ${h}`;
                console.log("Adding cert to store command: " + e);
                const {
                    stdout: r
                } = await g(e);
                console.log(r);
                return true
            } catch (e) {
                console.log(e.stdout);
                console.log(e.stderr);
                return false
            }
        }
        async function signWithSigntool(e) {
            try {
                var t = false;
                var r = a.getInput("timestampUrl");
                if (r === "") {
                    r = "http://timestamp.verisign.com/scripts/timstamp.dll"
                }
                var n = `"${v}" sign /sm /tr ${r}`;
                const o = a.getInput("certificatesha1");
                if (o != "") {
                    n = n + ` /sha1 "${o}"`;
                    t = true
                }
                const i = a.getInput("certificatename");
                if (i != "") {
                    t = true;
                    n = n + ` /n "${i}"`
                }
                if (!t) {
                    console.log("You need to include a NAME or a SHA1 Hash for the certificate to sign with.")
                }
                n = n + ` ${e}`;
                console.log("Signing command: " + n);
                const {
                    stdout: s
                } = await g(n);
                console.log(s);
                return true
            } catch (e) {
                console.log(e.stdout);
                console.log(e.stderr);
                return false
            }
        }
        async function trySignFile(e) {
            console.log(`Signing ${e}.`);
            const t = l.default.extname(e);
            for (let r = 0; r < 10; r++) {
                await sleep(r);
                if (y.includes(t)) {
                    if (await signWithSigntool(e)) return
                }
            }
            throw `Failed to sign '${e}'.`
        }

        function getFiles(e, t) {
            return s(this, arguments, function* getFiles_1() {
                const r = yield n(f.promises.readdir(e));
                for (const s of r) {
                    const r = `${e}/${s}`;
                    const u = yield n(f.promises.stat(r));
                    if (u.isFile()) {
                        const e = l.default.extname(s);
                        if (y.includes(e) || e == ".nupkg") yield yield n(r)
                    } else if (u.isDirectory() && t) {
                        yield n(yield* i(o(getFiles(r, t))))
                    }
                }
            })
        }
        async function signFiles() {
            var e, t;
            const r = a.getInput("folder", {
                required: true
            });
            const n = a.getInput("recursive") == "true";
            try {
                for (var i = o(getFiles(r, n)), s; s = await i.next(), !s.done;) {
                    const e = s.value;
                    await trySignFile(e)
                }
            } catch (t) {
                e = {
                    error: t
                }
            } finally {
                try {
                    if (s && !s.done && (t = i.return)) await t.call(i)
                } finally {
                    if (e) throw e.error
                }
            }
        }
        async function run() {
            try {
                if (await createCertificatePfx()) {
                    if (await addCertificateToStore()) await signFiles()
                }
            } catch (e) {
                a.setFailed(`Action failed with error: ${e}`)
            }
        }
        run()
    },
    622: function(e) {
        e.exports = require("path")
    },
    669: function(e) {
        e.exports = require("util")
    },
    747: function(e) {
        e.exports = require("fs")
    },
    765: function(e) {
        e.exports = require("process")
    }
});
