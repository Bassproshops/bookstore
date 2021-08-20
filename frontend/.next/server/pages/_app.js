(function() {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 3492:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Cart; }
/* harmony export */ });
/* harmony import */ var _axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(696);

class Cart {
  static async addToCart(content) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.post */ .Z.post('add-to-cart/', content);
      return true;
    } catch (e) {}
  }

  static async getCart(SetCart) {
    try {
      const {
        data
      } = await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.get */ .Z.get('cart/');
      SetCart(data);
    } catch (e) {}
  }

  static async updateCartItem(id, quantity, SetCart) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.patch */ .Z.patch(`cart-item/${id}/`, quantity);
      this.getCart(SetCart);
    } catch (e) {}
  }

  static async deleteCartItem(id, SetCart) {
    try {
      await _axios__WEBPACK_IMPORTED_MODULE_0__/* .default.delete */ .Z.delete(`cart-item/${id}/`);
      this.getCart(SetCart);
    } catch (e) {}
  }

}

/***/ }),

/***/ 5876:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ _app; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "framer-motion"
var external_framer_motion_ = __webpack_require__(762);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
// EXTERNAL MODULE: ./axios/UsersAxios.js
var UsersAxios = __webpack_require__(5113);
// EXTERNAL MODULE: ./axios/CartAxios.js
var CartAxios = __webpack_require__(3492);
// EXTERNAL MODULE: ./axios/CategoryAxios.js
var CategoryAxios = __webpack_require__(1097);
// EXTERNAL MODULE: ./node_modules/react-icons/fi/index.esm.js
var index_esm = __webpack_require__(6893);
// EXTERNAL MODULE: ./node_modules/react-icons/ai/index.esm.js
var ai_index_esm = __webpack_require__(8193);
;// CONCATENATED MODULE: ./helpers/components/Navbar.js













const Navbar = ({
  user,
  SetUser,
  cart,
  SetCart
}) => {
  const {
    0: burger,
    1: SetBurger
  } = (0,external_react_.useState)(false);
  const {
    0: categories,
    1: SetCategories
  } = (0,external_react_.useState)([]);
  const {
    0: searchText,
    1: SetSearchText
  } = (0,external_react_.useState)('');
  const router = (0,router_.useRouter)();
  (0,external_react_.useEffect)(() => {
    UsersAxios/* default.getUser */.Z.getUser(SetUser);
    CategoryAxios/* default.getCategories */.Z.getCategories(SetCategories);
    CartAxios/* default.getCart */.Z.getCart(SetCart);
    const body = document.querySelector('body');
    SetBurger(false);

    if (body) {
      body.style.overflowY = 'auto';
    }
  }, [router.asPath]);

  function handleBurger() {
    SetBurger(!burger);
    const body = document.querySelector('body');

    if (!burger) {
      body.style.overflowY = 'hidden';
    } else {
      body.style.overflowY = 'auto';
    }
  }

  function handleSearch(e) {
    e.preventDefault();

    if (searchText.trim() !== '') {
      router.push(`/buscar/${searchText.trim()}/`);
    }
  }

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
    className: "nav-container",
    children: [/*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.motion.div, {
      className: "navbar-search",
      initial: {
        y: -300,
        opacity: 0
      },
      animate: {
        y: 0,
        opacity: 1
      },
      transition: {
        duration: .6
      },
      exit: {
        y: -300,
        opacity: 0
      },
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("nav", {
        className: "navbar",
        children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
          className: "logo-cont",
          children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            href: "/",
            children: /*#__PURE__*/jsx_runtime_.jsx("img", {
              src: "/logo.png",
              alt: "Our Logo"
            })
          }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            href: "/",
            children: /*#__PURE__*/jsx_runtime_.jsx("h1", {
              className: "responsive-header",
              style: {
                opacity: 0
              },
              children: "Librer\xEDa Mar\xEDa Reyna de la Paz"
            })
          })]
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: burger ? "links burger-links-active" : "links",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
            className: "links-container",
            children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
              className: "dropdown",
              children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
                className: "nav-link dropdown-link",
                children: "Categor\xEDas"
              }), /*#__PURE__*/jsx_runtime_.jsx("ul", {
                children: categories.map(category => /*#__PURE__*/jsx_runtime_.jsx("li", {
                  onClick: () => router.push(`/categorias/${category.slug}/`),
                  children: category.name
                }, category.id))
              })]
            }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
              href: "/sobre-nosotros",
              children: /*#__PURE__*/jsx_runtime_.jsx("p", {
                className: "nav-link",
                children: "Sobre Nosotros"
              })
            }), user ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
              children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                href: "/carrito",
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
                  className: "nav-link carrito-link",
                  children: ["Carrito", /*#__PURE__*/jsx_runtime_.jsx("span", {
                    className: "cart-items-number",
                    children: cart.length > 9 ? '+9' : cart.length
                  })]
                })
              }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                href: "/perfil",
                children: /*#__PURE__*/jsx_runtime_.jsx("p", {
                  className: "nav-link",
                  children: "Perfil"
                })
              }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
                className: "nav-link align-svg",
                onClick: () => {
                  UsersAxios/* default.logout */.Z.logout(SetUser).then(resp => {
                    if (resp) {
                      router.push('/login');
                    }
                  });
                },
                children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                  className: "txt",
                  children: "Salir"
                }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                  className: "svg",
                  children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FiLogOut */.xqh, {
                    style: {
                      strokeWidth: '3px'
                    }
                  })
                })]
              })]
            }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
              children: [/*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                href: "/registro",
                children: /*#__PURE__*/jsx_runtime_.jsx("p", {
                  className: "nav-link",
                  children: "Registrate"
                })
              }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
                href: "/login",
                children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("p", {
                  className: "nav-link align-svg",
                  children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
                    className: "txt",
                    children: "Iniciar Sesi\xF3n"
                  }), /*#__PURE__*/jsx_runtime_.jsx("span", {
                    className: "svg",
                    children: /*#__PURE__*/jsx_runtime_.jsx(index_esm/* FiLogOut */.xqh, {
                      style: {
                        strokeWidth: '3px'
                      }
                    })
                  })]
                })
              })]
            })]
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("div", {
          className: "burger-container transition",
          onClick: handleBurger,
          children: /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: burger ? "burger burger-active transition" : "burger transition"
          })
        })]
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "search-bar-container",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "search-bar-wrapper",
        children: [/*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.motion.div, {
          initial: {
            x: -300,
            opacity: 0
          },
          animate: {
            x: 0,
            opacity: 1
          },
          transition: {
            duration: .7
          },
          exit: {
            x: 300,
            opacity: 0
          },
          children: /*#__PURE__*/jsx_runtime_.jsx("h1", {
            style: {
              opacity: 0
            },
            children: "Librer\xEDa Mar\xEDa Reyna de la Paz"
          })
        }), /*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.motion.div, {
          className: "motion-search",
          initial: {
            x: -300,
            opacity: 0
          },
          animate: {
            x: 0,
            opacity: 1
          },
          transition: {
            duration: .8
          },
          exit: {
            x: -300,
            opacity: 0
          },
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("form", {
            className: "search-bar-input",
            onSubmit: handleSearch,
            children: [/*#__PURE__*/jsx_runtime_.jsx("input", {
              value: searchText,
              type: "text",
              className: "search-bar",
              placeholder: "Buscar Productos...",
              onChange: e => SetSearchText(e.target.value)
            }), /*#__PURE__*/jsx_runtime_.jsx("button", {
              "aria-label": "search products",
              name: "search products",
              children: /*#__PURE__*/jsx_runtime_.jsx(ai_index_esm/* AiOutlineSearch */.RB5, {})
            })]
          })
        })]
      })
    })]
  });
};

/* harmony default export */ var components_Navbar = (Navbar);
;// CONCATENATED MODULE: external "next/head"
var head_namespaceObject = require("next/head");;
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
// EXTERNAL MODULE: ./node_modules/react-icons/hi/index.esm.js
var hi_index_esm = __webpack_require__(3854);
;// CONCATENATED MODULE: ./helpers/components/Footer.js






const Footer = () => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("footer", {
    children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "info",
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
        className: "logo-and-brand",
        children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
          src: "/favicon.svg",
          alt: "logo"
        }), /*#__PURE__*/jsx_runtime_.jsx("h3", {
          children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            href: "/",
            children: "Librer\xEDa Mar\xEDa Reyna de la Paz"
          })
        })]
      })
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "credits",
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("h4", {
        className: "align-svg",
        children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
          className: "svg",
          children: /*#__PURE__*/jsx_runtime_.jsx(hi_index_esm/* HiMail */.hBs, {})
        }), /*#__PURE__*/jsx_runtime_.jsx("span", {
          className: "txt",
          children: "asuntosmariareina@hotmail.com"
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx("h3", {
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
          href: "https://raulmirandawebdev.com",
          children: [/*#__PURE__*/jsx_runtime_.jsx("img", {
            src: "/raullogo.svg",
            alt: "raul logo"
          }), /*#__PURE__*/jsx_runtime_.jsx("small", {
            children: "Desarrollado por Ra\xFAl Miranda "
          })]
        })
      })]
    })]
  });
};

/* harmony default export */ var components_Footer = (Footer);
;// CONCATENATED MODULE: ./pages/_app.js





function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















function MyApp({
  Component,
  pageProps,
  router
}) {
  const {
    0: user,
    1: SetUser
  } = (0,external_react_.useState)(false);
  const {
    0: cart,
    1: SetCart
  } = (0,external_react_.useState)([]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
      children: [/*#__PURE__*/jsx_runtime_.jsx("title", {
        children: "Mar\xEDa Reyna de la Paz"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "description",
        content: "Mar\xEDa Reyna de la Paz, librer\xEDa y art\xEDculos religiosos"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "icon",
        href: "/favicon2.svg",
        type: "image/svg+xml"
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "description",
        content: "Librer\xEDa Mar\xEDa Reyna de la Paz, librer\xEDa y art\xEDculos religiosos."
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "keywords",
        content: "Jes\xFAs, libros, Virgen Mar\xEDa, religiosos, c\xE1tolico, mar\xEDa reina de la paz, librer\xEDa, librer\xEDa mar\xEDa reina de la paz, libreriamariareinadelapaz"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: true
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        href: "https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap",
        rel: "stylesheet"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "preconnect",
        href: "https://fonts.googleapis.com"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: true
      }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
        name: "viewport",
        content: "initial-scale=1.0, width=device-width"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        href: "https://fonts.googleapis.com/css2?family=Courgette&display=swap",
        rel: "stylesheet"
      }), /*#__PURE__*/jsx_runtime_.jsx("link", {
        rel: "apple-touch-icon",
        href: "/favicon.ico"
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(components_Navbar, {
      user: user,
      SetUser: SetUser,
      cart: cart,
      SetCart: SetCart
    }), /*#__PURE__*/jsx_runtime_.jsx(external_framer_motion_.AnimatePresence, {
      exitBeforeEnter: true,
      children: /*#__PURE__*/(0,external_react_.createElement)(Component, _objectSpread(_objectSpread({}, pageProps), {}, {
        user: user,
        key: router.route,
        SetUser: SetUser,
        cart: cart,
        SetCart: SetCart
      }))
    }), /*#__PURE__*/jsx_runtime_.jsx(components_Footer, {})]
  });
}

/* harmony default export */ var _app = (MyApp);

/***/ }),

/***/ 2376:
/***/ (function(module) {

"use strict";
module.exports = require("axios");;

/***/ }),

/***/ 762:
/***/ (function(module) {

"use strict";
module.exports = require("framer-motion");;

/***/ }),

/***/ 8417:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router-context.js");;

/***/ }),

/***/ 2238:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");;

/***/ }),

/***/ 6731:
/***/ (function(module) {

"use strict";
module.exports = require("next/router");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 5282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ }),

/***/ 4453:
/***/ (function() {

/* (ignored) */

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [999,664,127,193,206,696,113,97], function() { return __webpack_exec__(5876); });
module.exports = __webpack_exports__;

})();