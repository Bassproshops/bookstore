import axios from './axios';

export default class Users {

    static async login(content, SetUser, SetError) {
        try {
            const { data } = await axios.post('login/', content);
            this.getUser(SetUser);
            return true;
        } catch (e) {
            SetError(e.response.data.error)
            this.getUser(SetUser);

        }
    }

    static async register(content, SetUser, SetEmailError, SetPasswordError, SetEstadoError, SetCalleError, SetColoniaError, SetExteriorNumberError, SetInteriorNumberError, SetPostalCodeError, SetNameError) {
        try {
            await axios.post('register/', content);
            this.getUser(SetUser);
            return true;
        } catch (e) {
            const prefix = e.response;
            if (e.response.data.email) {
                SetEmailError(e.response.data.email)
            }

            if (e.response.data.password) {
                SetPasswordError(e.response.data.password)
            }

            if (e.response.data.estado) {
                SetEstadoError(e.response.data.estado)
            }

            if (e.response.data.calle) {
                SetCalleError(e.response.data.calle)
            }

            if (e.response.data.colonia) {
                SetColoniaError(e.response.data.colonia)
            }

            if (e.response.data.exterior_number) {
                SetExteriorNumberError(e.response.data.exterior_number)
            }

            if (e.response.data.interior_number) {
                SetInteriorNumberError(e.response.data.interior_number)
            }

            if (e.response.data.postalcode) {
                SetPostalCodeError(e.response.data.postalcode)
            }

            if (e.response.data.nombre) {
                SetNameError(e.response.data.nombre);
            }

            this.getUser(SetUser);

        }
    }

    static async getUser(SetUser) {
        try {
            const { data } = await axios.post('profile/');
            SetUser(data);

        } catch (e) {
            SetUser(false);

        }
    }

    static async logout(SetUser) {
        try {
            await axios.post('logout/');
            SetUser(false);
            return true;
        } catch (e) {
            this.getUser(SetUser);

        }
    }

    static async updateUser(content, SetUser, user, SetEstadoError, SetCalleError, SetColoniaError, SetExteriorNumberError, SetInteriorNumberError, SetPostalCodeError, SetNameError) {
        try {
            await axios.patch(`user/${user.id}/`, content);
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
                SetEstadoError(e.response.data.estado)
            }

            if (e.response.data.calle) {
                SetCalleError(e.response.data.calle)
            }

            if (e.response.data.colonia) {
                SetColoniaError(e.response.data.colonia)
            }

            if (e.response.data.exterior_number) {
                SetExteriorNumberError(e.response.data.exterior_number)
            }

            if (e.response.data.interior_number) {
                SetInteriorNumberError(e.response.data.interior_number)
            }

            if (e.response.data.postalcode) {
                SetPostalCodeError(e.response.data.postalcode)
            }

            if (e.response.data.nombre) {
                SetNameError(e.response.data.nombre);
            }

            this.getUser(SetUser);

        }
    }
}