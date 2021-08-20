exports.id = 150;
exports.ids = [150];
exports.modules = {

/***/ 4805:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Order; }
/* harmony export */ });
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(696);

class Order {
  static async checkout(id) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.post */ .Z.post('checkout/', {
        id
      });
      return true;
    } catch (e) {}
  }

  static async getUserOrders(SetOrders) {
    try {
      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.get */ .Z.get('user-orders/');
      SetOrders(data);
    } catch (e) {}
  }

  static async retrieveOrder(id, SetOrder) {
    try {
      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.get */ .Z.get(`order/${id}/`);
      SetOrder(data);
    } catch (e) {}
  }

  static async getAllOrders(SetOrders, p, deliveredFilter, sentFilter, processedFilter) {
    try {
      let filter = '';

      if (processedFilter) {
        filter = 'Orden Recivida';
      }

      if (sentFilter) {
        filter = 'Orden Enviada';
      }

      if (deliveredFilter) {
        filter = 'Orden Entregada';
      }

      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.get */ .Z.get(`admin-orders/?p=${p}&status=${filter}`);
      SetOrders(data);
    } catch (e) {}
  }

  static async updateOrder(content, id, SetOrders, page, deliveredFilter, sentFilter, processedFilter) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.patch */ .Z.patch(`order-admin/${id}/`, content);
      this.getAllOrders(SetOrders, page, deliveredFilter, sentFilter, processedFilter);
    } catch (e) {}
  }

  static async Factura(content) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.post */ .Z.post('factura/', content);
      return true;
    } catch (e) {}
  }

}

/***/ }),

/***/ 4453:
/***/ (function() {

/* (ignored) */

/***/ })

};
;