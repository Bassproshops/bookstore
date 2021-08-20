import axios from './axios';

export default class Cart{
    
    static async addToCart(content){
        try{
            await axios.post('add-to-cart/', content);
            return true;
        }catch(e){

        }
    }

    static async getCart(SetCart){
        try{
            const {data} = await axios.get('cart/');
            SetCart(data);
        }catch(e){

        }
    }

    static async updateCartItem(id, quantity, SetCart){
        try{
            await axios.patch(`cart-item/${id}/`, quantity);
            this.getCart(SetCart);
        }catch(e){

        }
    }

    static async deleteCartItem(id, SetCart){
        try{
            await axios.delete(`cart-item/${id}/`);
            this.getCart(SetCart);
        }catch(e){

        }
    }
}