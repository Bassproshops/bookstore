exports.id = 307;
exports.ids = [307];
exports.modules = {

/***/ 3307:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Product; }
/* harmony export */ });
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(696);

class Product {
  static async getProducts(SetProducts, page, stockFilter, SetPage, search = '') {
    try {
      const stock = stockFilter ? '0' : '';
      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.get */ .Z.get(`products-list/?p=${page}&stock=${stock}&search=${search}`);
      SetProducts(data);
    } catch (e) {
      if (e.response) {
        if (e.response.data) {
          if (e.response.data.detail === 'Página inválida.') {
            if (page !== 1) {
              SetPage(1);
            }
          }
        }
      }
    }
  }

  static async deleteProduct(SetProducts, slug, page, stockFilter, SetPage, search) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.delete */ .Z.delete(`product-admin/${slug}/`);
      this.getProducts(SetProducts, page, stockFilter, SetPage, search);
      return true;
    } catch (e) {}
  }

  static async createProduct(content, SetProducts, page, stockFilter, SetPage, SetNameError, SetSlugError, SetPriceError, SetCategoryError, SetStockError, SetDescriptionError, SetImageError, search) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.post */ .Z.post('product/', content, {
        'headers': {
          'Content-Type': 'multipart/form-data'
        }
      });
      this.getProducts(SetProducts, page, stockFilter, SetPage, search);
      SetNameError(false);
      SetSlugError(false);
      SetPriceError(false);
      SetCategoryError(false);
      SetStockError(false);
      SetDescriptionError(false);
      SetImageError(false);
      return true;
    } catch (e) {
      const prefix = e.response;

      if (prefix) {
        if (prefix.data) {
          if (prefix.data.name) {
            SetNameError(prefix.data.name);
          }

          if (prefix.data.slug) {
            SetSlugError(prefix.data.slug);
          }

          if (prefix.data.price) {
            SetPriceError(prefix.data.price);
          }

          if (prefix.data.category) {
            SetCategoryError(prefix.data.category);
          }

          if (prefix.data.stock) {
            SetStockError(prefix.data.stock);
          }

          if (prefix.data.description) {
            SetDescriptionError(prefix.data.description);
          }

          if (prefix.data.image) {
            SetImageError(prefix.data.image);
          }
        }
      }
    }
  }

  static async retrieveProduct(slug, SetProduct) {
    try {
      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.get */ .Z.get(`product/${slug}/`);
      SetProduct(data);
    } catch (e) {}
  }

  static async updateProduct(content, SetProducts, page, stockFilter, SetPage, SetNameError, SetSlugError, SetPriceError, SetCategoryError, SetStockError, SetDescriptionError, SetImageError, slug, search) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.patch */ .Z.patch(`product-admin/${slug}/`, content, {
        'headers': {
          'Content-Type': 'multipart/form-data'
        }
      });
      this.getProducts(SetProducts, page, stockFilter, SetPage, search);
      SetNameError(false);
      SetSlugError(false);
      SetPriceError(false);
      SetCategoryError(false);
      SetStockError(false);
      SetDescriptionError(false);
      SetImageError(false);
      return true;
    } catch (e) {
      const prefix = e.response;

      if (prefix) {
        if (prefix.data) {
          if (prefix.data.name) {
            SetNameError(prefix.data.name);
          }

          if (prefix.data.slug) {
            SetSlugError(prefix.data.slug);
          }

          if (prefix.data.price) {
            SetPriceError(prefix.data.price);
          }

          if (prefix.data.category) {
            SetCategoryError(prefix.data.category);
          }

          if (prefix.data.stock) {
            SetStockError(prefix.data.stock);
          }

          if (prefix.data.description) {
            SetDescriptionError(prefix.data.description);
          }

          if (prefix.data.image) {
            SetImageError(prefix.data.image);
          }
        }
      }
    }
  }

  static async listProducts(SetProducts, page, maxPrice = false, minPrice = false, search = false, ordering = '-popularity', dealFilter = false, category = false) {
    try {
      const s = search ? `&search=${search}` : '';
      const mx = maxPrice ? `&maxPrice=${maxPrice}` : '';
      const mp = minPrice ? `&minPrice=${minPrice}` : '';
      const df = dealFilter ? `&deal=True` : '';
      const ct = category ? `&category=${category}` : '';
      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.get */ .Z.get(`products/?p=${page}${s}${mx}${mp}${df}${ct}&ordering=${ordering}`);
      SetProducts(data);
    } catch (e) {}
  }

  static async increasePopularity(slug) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.patch */ .Z.patch(`pop/${slug}/`);
    } catch (e) {}
  }

  static async getTotal(SetTotal) {
    try {
      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.get */ .Z.get('total/');
      SetTotal(data);
    } catch (e) {}
  }

  static async getPopular(SetProducts) {
    try {
      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.get */ .Z.get('popular-products/');
      SetProducts(data);
    } catch (e) {}
  }

}

/***/ })

};
;