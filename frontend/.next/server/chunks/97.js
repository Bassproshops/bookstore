exports.id = 97;
exports.ids = [97];
exports.modules = {

/***/ 1097:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Category; }
/* harmony export */ });
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(696);

class Category {
  static async getCategories(SetCategories) {
    try {
      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.get */ .Z.get('categories/');
      SetCategories(data);
    } catch (e) {}
  }

  static async deleteCategory(SetCategories, slug) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.delete */ .Z.delete(`category/${slug}/`);
      this.getCategories(SetCategories);
      return true;
    } catch (e) {}
  }

  static async createCategory(content, SetCategories, SetNameError, SetSlugError) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.post */ .Z.post('category/', content);
      this.getCategories(SetCategories);
      SetNameError(false);
      SetSlugError(false);
      return true;
    } catch (e) {
      const prefix = e.response;

      if (prefix) {
        if (prefix.data.name) {
          SetNameError(prefix.data.name);
        }

        if (prefix.data.slug) {
          SetSlugError(prefix.data.slug);
        }
      }
    }
  }

  static async retrieveCategory(slug, SetCategory) {
    try {
      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.get */ .Z.get(`retr-category/${slug}/`);
      SetCategory(data);
    } catch (e) {}
  }

  static async updateCategory(content, slug, SetCategories, SetNameError, SetSlugError) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.patch */ .Z.patch(`category/${slug}/`, content);
      this.getCategories(SetCategories);
      SetNameError(false);
      SetSlugError(false);
      return true;
    } catch (e) {
      const prefix = e.response;

      if (prefix) {
        if (prefix.data.name) {
          SetNameError(prefix.data.name);
        }

        if (prefix.data.slug) {
          SetSlugError(prefix.data.slug);
        }
      }
    }
  }

}

/***/ })

};
;