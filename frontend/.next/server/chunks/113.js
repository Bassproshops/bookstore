exports.id = 113;
exports.ids = [113];
exports.modules = {

/***/ 5113:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Users; }
/* harmony export */ });
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(696);

class Users {
  static async login(content, SetUser, SetError) {
    try {
      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.post */ .Z.post('login/', content);
      this.getUser(SetUser);
      return true;
    } catch (e) {
      SetError(e.response.data.error);
      this.getUser(SetUser);
    }
  }

  static async register(content, SetUser, SetEmailError, SetPasswordError, SetEstadoError, SetCalleError, SetColoniaError, SetExteriorNumberError, SetInteriorNumberError, SetPostalCodeError, SetNameError) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.post */ .Z.post('register/', content);
      this.getUser(SetUser);
      return true;
    } catch (e) {
      const prefix = e.response;

      if (e.response.data.email) {
        SetEmailError(e.response.data.email);
      }

      if (e.response.data.password) {
        SetPasswordError(e.response.data.password);
      }

      if (e.response.data.estado) {
        SetEstadoError(e.response.data.estado);
      }

      if (e.response.data.calle) {
        SetCalleError(e.response.data.calle);
      }

      if (e.response.data.colonia) {
        SetColoniaError(e.response.data.colonia);
      }

      if (e.response.data.exterior_number) {
        SetExteriorNumberError(e.response.data.exterior_number);
      }

      if (e.response.data.interior_number) {
        SetInteriorNumberError(e.response.data.interior_number);
      }

      if (e.response.data.postalcode) {
        SetPostalCodeError(e.response.data.postalcode);
      }

      if (e.response.data.nombre) {
        SetNameError(e.response.data.nombre);
      }

      this.getUser(SetUser);
    }
  }

  static async getUser(SetUser) {
    try {
      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.post */ .Z.post('profile/');
      SetUser(data);
    } catch (e) {
      SetUser(false);
    }
  }

  static async logout(SetUser) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.post */ .Z.post('logout/');
      SetUser(false);
      return true;
    } catch (e) {
      this.getUser(SetUser);
    }
  }

  static async updateUser(content, SetUser, user, SetEstadoError, SetCalleError, SetColoniaError, SetExteriorNumberError, SetInteriorNumberError, SetPostalCodeError, SetNameError) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.patch */ .Z.patch(`user/${user.id}/`, content);
      this.getUser(SetUser);
      SetEstadoError(false);
      SetCalleError(false);
      SetColoniaError(false);
      SetExteriorNumberError(false);
      SetInteriorNumberError(false);
      SetPostalCodeError(false);
      return true;
    } catch (e) {
      if (e.response.data.estado) {
        SetEstadoError(e.response.data.estado);
      }

      if (e.response.data.calle) {
        SetCalleError(e.response.data.calle);
      }

      if (e.response.data.colonia) {
        SetColoniaError(e.response.data.colonia);
      }

      if (e.response.data.exterior_number) {
        SetExteriorNumberError(e.response.data.exterior_number);
      }

      if (e.response.data.interior_number) {
        SetInteriorNumberError(e.response.data.interior_number);
      }

      if (e.response.data.postalcode) {
        SetPostalCodeError(e.response.data.postalcode);
      }

      if (e.response.data.nombre) {
        SetNameError(e.response.data.nombre);
      }

      this.getUser(SetUser);
    }
  }

}

/***/ })

};
;