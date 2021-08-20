import axios from './axios';

export default class Category {

    static async getCategories(SetCategories) {
        try {
            const { data } = await axios.get('categories/')
            SetCategories(data);
        } catch (e) {

        }
    }

    static async deleteCategory(SetCategories, slug) {
        try {
            await axios.delete(`category/${slug}/`);
            this.getCategories(SetCategories);
            return true;
        } catch (e) {

        }
    }

    static async createCategory(content, SetCategories, SetNameError, SetSlugError) {
        try {
            await axios.post('category/', content);
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
                    SetSlugError(prefix.data.slug)
                }
            }
        }
    }

    static async retrieveCategory(slug, SetCategory) {
        try {
            const { data } = await axios.get(`retr-category/${slug}/`);
            SetCategory(data);
        } catch (e) {

        }
    }

    static async updateCategory(content, slug, SetCategories, SetNameError, SetSlugError) {
        try {
            await axios.patch(`category/${slug}/`, content);
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
                    SetSlugError(prefix.data.slug)
                }
            }
        }
    }
}