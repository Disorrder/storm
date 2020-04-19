(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["storm"] = factory();
	else
		root["storm"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ sync recursive":
/*!**************!*\
  !*** . sync ***!
  \**************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"./ sync recursive\";\n\n//# sourceURL=webpack://%5Bname%5D/._sync?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// import isEqual from \"./isEqual\";\r\n(function (factory) {\r\n    if ( true && typeof module.exports === \"object\") {\r\n        var v = factory(__webpack_require__(\"./ sync recursive\"), exports);\r\n        if (v !== undefined) module.exports = v;\r\n    }\r\n    else if (true) {\r\n        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\r\n    }\r\n})(function (require, exports) {\r\n    \"use strict\";\r\n    var _a, _b;\r\n    Object.defineProperty(exports, \"__esModule\", { value: true });\r\n    exports.VERSION = \"0.2.0\";\r\n    const STATE = Symbol(\"state\");\r\n    const SUBS = Symbol(\"subscriptions\");\r\n    class Store {\r\n        constructor() {\r\n            this[_a] = {};\r\n            this[_b] = [];\r\n            // Initialize state\r\n            const Class = this.constructor;\r\n            for (let k in Class.state) {\r\n                this[STATE][k] = Class.state[k]();\r\n            }\r\n        }\r\n        DEBUG_getState() { return this[STATE]; }\r\n        mutate(mutation) {\r\n            let shouldMutate = false;\r\n            // Check equality\r\n            const oldState = this[STATE];\r\n            for (let k in mutation) {\r\n                if (this.isEqual(oldState[k], mutation[k])) {\r\n                    delete mutation[k];\r\n                }\r\n                else {\r\n                    shouldMutate = true;\r\n                }\r\n            }\r\n            if (shouldMutate) {\r\n                this[STATE] = Object.assign(Object.assign({}, oldState), mutation);\r\n                this[SUBS].forEach(cb => cb(mutation, oldState));\r\n            }\r\n        }\r\n        isEqual(oldVal, newVal) {\r\n            return oldVal === newVal;\r\n            // return isEqual(oldVal, newVal);\r\n        }\r\n        subscribe(cb) {\r\n            this[SUBS].push(cb);\r\n        }\r\n        unsubscribe(cb) {\r\n            this[SUBS].splice(this[SUBS].indexOf(cb), 1);\r\n        }\r\n        unsubscribeAll() {\r\n            this[SUBS].length = 0;\r\n        }\r\n    }\r\n    exports.Store = Store;\r\n    _a = STATE, _b = SUBS;\r\n    Store.state = {};\r\n    Store.mutations = {};\r\n    Store.actions = {};\r\n    class SingleStore extends Store {\r\n        constructor() {\r\n            super();\r\n        }\r\n        static getInstance() {\r\n            if (this.instance)\r\n                return this.instance;\r\n            return this.instance = new this();\r\n        }\r\n    }\r\n    exports.SingleStore = SingleStore;\r\n    function state(target, key, descriptor) {\r\n        delete descriptor.value;\r\n        delete descriptor.writable;\r\n        const initializer = descriptor.initializer;\r\n        delete descriptor.initializer;\r\n        descriptor.get = function () {\r\n            return this[STATE][key];\r\n        };\r\n        descriptor.set = function (val) {\r\n            this.mutate({ [key]: val });\r\n        };\r\n        // Save initializer\r\n        const Class = target.constructor;\r\n        Class.state = Object.assign(Object.assign({}, Class.state), { [key]: initializer });\r\n    }\r\n    exports.state = state;\r\n    function Mutation(target, key, descriptor) {\r\n        const mutation = descriptor.value;\r\n        descriptor.value = function () {\r\n            this.mutate(mutation.call(this, ...arguments));\r\n        };\r\n        // Save value\r\n        const Class = target.constructor;\r\n        Class.mutations = Object.assign(Object.assign({}, Class.mutations), { [key]: descriptor.value });\r\n    }\r\n    exports.Mutation = Mutation;\r\n    // More semantic than functional\r\n    function Action(target, key, descriptor) {\r\n        const Class = target.constructor;\r\n        Class.actions = Object.assign(Object.assign({}, Class.actions), { [key]: descriptor.value });\r\n    }\r\n    exports.Action = Action;\r\n    function WIP_computed(target, key, descriptor) {\r\n        // TODO: look at MobX\r\n        console.warn(\"computed decorator is not implemented\");\r\n    }\r\n    exports.WIP_computed = WIP_computed;\r\n    // Creates new Store class without decorators\r\n    function createStore(options) {\r\n        class StoreModule extends Store {\r\n            constructor() {\r\n                super();\r\n                if (options.constructor)\r\n                    options.constructor.call(this);\r\n            }\r\n        }\r\n        for (let k in options.state) {\r\n            state(StoreModule.prototype, k, {\r\n                enumerable: true,\r\n                configurable: true,\r\n                initializer() { return options.state[k]; },\r\n            });\r\n        }\r\n        for (let k in options.mutations) {\r\n            Mutation(StoreModule.prototype, k, {\r\n                enumerable: true,\r\n                configurable: true,\r\n                value: options.mutations[k],\r\n            });\r\n        }\r\n        for (let k in options.actions) {\r\n            Action(StoreModule.prototype, k, {\r\n                enumerable: true,\r\n                configurable: true,\r\n                value: options.actions[k],\r\n            });\r\n        }\r\n        return StoreModule;\r\n    }\r\n    exports.createStore = createStore;\r\n});\r\n\n\n//# sourceURL=webpack://%5Bname%5D/./index.ts?");

/***/ })

/******/ });
});