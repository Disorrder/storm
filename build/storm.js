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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: version, Store, state, Mutation, Action, WIP_computed, createStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"version\", function() { return version; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Store\", function() { return Store; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"state\", function() { return state; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Mutation\", function() { return Mutation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Action\", function() { return Action; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WIP_computed\", function() { return WIP_computed; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createStore\", function() { return createStore; });\n// import isEqual from \"./isEqual\";\nconst version = \"0.2.0\";\nconst STATE = Symbol(\"state\");\nconst SUBS = Symbol(\"subscriptions\");\nclass Store {\n  constructor() {\n    this[STATE] = {};\n    this[SUBS] = []; // Initialize state\n\n    const Class = this.constructor;\n\n    for (let k in Class.state) {\n      this[STATE][k] = Class.state[k]();\n    }\n  }\n\n  mutate(mutation) {\n    let shouldMutate = false; // Check equality\n\n    const oldState = this[STATE];\n\n    for (let k in mutation) {\n      if (this.isEqual(oldState[k], mutation[k])) {\n        delete mutation[k];\n      } else {\n        shouldMutate = true;\n      }\n    }\n\n    if (shouldMutate) {\n      this[STATE] = { ...oldState,\n        ...mutation\n      };\n      this[SUBS].forEach(cb => cb(mutation, oldState));\n    }\n  }\n\n  isEqual(oldVal, newVal) {\n    return oldVal === newVal; // return isEqual(oldVal, newVal);\n  }\n\n  DEBUG_getState() {\n    return this[STATE];\n  }\n\n  subscribe(cb) {\n    this[SUBS].push(cb);\n  }\n\n  unsubscribe(cb) {\n    this[SUBS].splice(this[SUBS].indexOf(cb), 1);\n  }\n\n  unsubscribeAll() {\n    this[SUBS].length = 0;\n  }\n\n}\nStore.state = {};\nStore.mutations = {};\nStore.actions = {};\nfunction state(target, name, descriptor) {\n  delete descriptor.value;\n  delete descriptor.writable;\n  const initializer = descriptor.initializer;\n  delete descriptor.initializer;\n\n  descriptor.get = function () {\n    return this[STATE][name];\n  };\n\n  descriptor.set = function (val) {\n    this.mutate({\n      [name]: val\n    });\n  }; // Save initializer\n\n\n  const Class = target.constructor;\n  const Parent = Class.__proto__;\n  if (!Class.state) Class.state = { ...Parent.state\n  };\n  if (initializer) Class.state[name] = initializer;\n}\nfunction Mutation(target, name, descriptor) {\n  const mutation = descriptor.value;\n\n  descriptor.value = function () {\n    this.mutate(mutation.call(this, ...arguments));\n  }; // Save value\n\n\n  const Class = target.constructor;\n  const Parent = Class.__proto__;\n  if (!Class.mutations) Class.mutations = { ...Parent.mutations\n  };\n  Class.mutations[name] = descriptor.value;\n} // More semantic than functional\n\nfunction Action(target, name, descriptor) {\n  // Save value\n  const Class = target.constructor;\n  const Parent = Class.__proto__;\n  if (!Class.actions) Class.actions = { ...Parent.actions\n  };\n  Class.actions[name] = descriptor.value;\n}\nfunction WIP_computed(target, name, descriptor) {\n  // TODO: look at MobX\n  console.warn(\"computed decorator is not implemented\");\n} // Creates new Store class without decorators\n\nfunction createStore(options) {\n  class StoreModule extends Store {\n    constructor() {\n      super();\n      if (options.constructor) options.constructor.call(this);\n    }\n\n  }\n\n  for (let k in options.state) {\n    state(StoreModule.prototype, k, {\n      enumerable: true,\n      configurable: true,\n\n      initializer() {\n        return options.state[k];\n      }\n\n    });\n  }\n\n  for (let k in options.mutations) {\n    Mutation(StoreModule.prototype, k, {\n      enumerable: true,\n      configurable: true,\n      value: options.mutations[k]\n    });\n  }\n\n  for (let k in options.actions) {\n    Action(StoreModule.prototype, k, {\n      enumerable: true,\n      configurable: true,\n      value: options.actions[k]\n    });\n  }\n\n  return StoreModule;\n}\n\n//# sourceURL=webpack://%5Bname%5D/./index.js?");

/***/ })

/******/ });
});