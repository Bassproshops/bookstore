exports.id = 696;
exports.ids = [696];
exports.modules = {

/***/ 696:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_env__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8785);


const Axios = axios__WEBPACK_IMPORTED_MODULE_0___default().create({
  baseURL: _helpers_env__WEBPACK_IMPORTED_MODULE_1__/* .baseURL */ .v2 + '/api/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json'
  },
  withCredentials: true
});
/* harmony default export */ __webpack_exports__["Z"] = (Axios);

/***/ }),

/***/ 8785:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "v2": function() { return /* binding */ baseURL; },
/* harmony export */   "xx": function() { return /* binding */ estados; },
/* harmony export */   "Np": function() { return /* binding */ strKey; }
/* harmony export */ });
// export const baseURL = 'http://192.168.1.81:8000';
const baseURL = 'http://test.grizzlytechstore.com';
const estados = ['Aguascalientes', 'Baja California', 'Baja California Sur', 'Campeche', 'Chiapas', 'Chihuahua', 'Coahuila', 'Colima', 'Ciudad de México', 'Durango', 'Guanajuato', 'Guerrero', 'Hidalgo', 'Jalisco', 'Estado de Mexico', 'Michoacan', 'Morelos', 'Nayarit', 'Nuevo Leon', 'Oaxaca', 'Puebla', 'Queretaro', 'Quintana Roo', 'San Luis Potosi', 'Sinaloa', 'Sonora', 'Tabasco', 'Tamaulipas', 'Tlaxcala', 'Veracruz', 'Yucatan', 'Zacatecas'];
const strKey = 'pk_test_51IuiHqKwNak06cqU4Pw0vQboguxM9AWUucA0TsiA8qNLC554kS2FNgCv2wQ9ZQA4KipJMgiCUbmqVIUz5rJ1YEV700bp8RJiG9';

/***/ })

};
;