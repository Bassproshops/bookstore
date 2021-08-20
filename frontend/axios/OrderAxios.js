import axios from './axios';

export default class Order {
    static async checkout(id) {
        try {
            await axios.post('checkout/', { id });
            return true;
        } catch (e) {
        }
    }

    static async getUserOrders(SetOrders) {
        try {
            const  {data}  = await axios.get('user-orders/');
            SetOrders(data);
        } catch (e) {

        }
    }

    static async retrieveOrder(id, SetOrder) {
        try {
            const { data } = await axios.get(`order/${id}/`);
            SetOrder(data);
        } catch (e) {

        }
    }

    static async getAllOrders(SetOrders, p, deliveredFilter, sentFilter, processedFilter) {
        try {
            let filter = '';
            if(processedFilter){
                filter = 'Orden Recivida';
            }
            if(sentFilter){
                filter = 'Orden Enviada';
            }
            if(deliveredFilter){
                filter = 'Orden Entregada';
            }
            
            const { data } = await axios.get(`admin-orders/?p=${p}&status=${filter}`);
            SetOrders(data);
        } catch (e) {

        }
    }

    static async updateOrder(content, id, SetOrders, page, deliveredFilter, sentFilter, processedFilter) {
        try {
            await axios.patch(`order-admin/${id}/`, content);
            this.getAllOrders(SetOrders, page, deliveredFilter, sentFilter, processedFilter);
        } catch (e) {

        }
    }


    static async Factura(content){
        try{
            await axios.post('factura/', content);
            return true;
        }catch(e){

        }
    }

}