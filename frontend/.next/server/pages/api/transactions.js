"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/transactions";
exports.ids = ["pages/api/transactions"];
exports.modules = {

/***/ "(api)/./pages/api/transactions.ts":
/*!***********************************!*\
  !*** ./pages/api/transactions.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\nconst BACKEND_URL = \"http://localhost:8000/transactions/\";\nconst getTransactions = async ()=>{};\nfunction handler(req, res) {\n    if (req.method !== \"GET\") {\n        res.status(405).end();\n        return;\n    }\n    const transactiopns = fetch(BACKEND_URL, {\n        method: \"GET\",\n        headers: {\n            \"Content-Type\": \"application/json\"\n        }\n    }).then((res)=>{\n        console.log(res);\n        return res.json();\n    });\n    res.status(200).json(transactiopns);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvdHJhbnNhY3Rpb25zLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFFQSxNQUFNQSxXQUFXLEdBQUcscUNBQXFDO0FBRXpELE1BQU1DLGVBQWUsR0FBRyxVQUFZLEVBQ25DO0FBRWMsU0FBU0MsT0FBTyxDQUFDQyxHQUFtQixFQUFFQyxHQUFvQixFQUFFO0lBQ3ZFLElBQUlELEdBQUcsQ0FBQ0UsTUFBTSxLQUFLLEtBQUssRUFBRTtRQUN0QkQsR0FBRyxDQUFDRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUNDLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLE9BQU87S0FDVjtJQUVELE1BQU1DLGFBQWEsR0FBb0JDLEtBQUssQ0FBQ1QsV0FBVyxFQUFFO1FBQ3RESyxNQUFNLEVBQUUsS0FBSztRQUNiSyxPQUFPLEVBQUU7WUFDTCxjQUFjLEVBQUUsa0JBQWtCO1NBQ3JDO0tBQ0osQ0FBQyxDQUFDQyxJQUFJLENBQUNQLENBQUFBLEdBQUcsR0FBSTtRQUNYUSxPQUFPLENBQUNDLEdBQUcsQ0FBQ1QsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBT0EsR0FBRyxDQUFDVSxJQUFJLEVBQUUsQ0FBQztLQUNyQixDQUFDO0lBRUZWLEdBQUcsQ0FBQ0UsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDUSxJQUFJLENBQUNOLGFBQWEsQ0FBQyxDQUFDO0NBQ3ZDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9wYWdlcy9hcGkvdHJhbnNhY3Rpb25zLnRzPzUyOGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XG5cbmNvbnN0IEJBQ0tFTkRfVVJMID0gXCJodHRwOi8vbG9jYWxob3N0OjgwMDAvdHJhbnNhY3Rpb25zL1wiO1xuXG5jb25zdCBnZXRUcmFuc2FjdGlvbnMgPSBhc3luYyAoKSA9PiB7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGhhbmRsZXIocmVxOiBOZXh0QXBpUmVxdWVzdCwgcmVzOiBOZXh0QXBpUmVzcG9uc2UpIHtcbiAgICBpZiAocmVxLm1ldGhvZCAhPT0gXCJHRVRcIikge1xuICAgICAgICByZXMuc3RhdHVzKDQwNSkuZW5kKCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2FjdGlvcG5zOiBQcm9taXNlPG9iamVjdD4gPSBmZXRjaChCQUNLRU5EX1VSTCwge1xuICAgICAgICBtZXRob2Q6IFwiR0VUXCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgIH0sXG4gICAgfSkudGhlbihyZXMgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KVxuXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24odHJhbnNhY3Rpb3Bucyk7XG59Il0sIm5hbWVzIjpbIkJBQ0tFTkRfVVJMIiwiZ2V0VHJhbnNhY3Rpb25zIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsInN0YXR1cyIsImVuZCIsInRyYW5zYWN0aW9wbnMiLCJmZXRjaCIsImhlYWRlcnMiLCJ0aGVuIiwiY29uc29sZSIsImxvZyIsImpzb24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/transactions.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/transactions.ts"));
module.exports = __webpack_exports__;

})();