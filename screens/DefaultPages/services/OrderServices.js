export default class OrderServices {

    baseUrl = 'https://066b-2402-d000-812c-fdf5-809e-e37-c792-6cce.in.ngrok.io';

    async placeOrder(orderDTO) {
        console.log('Callling placeOrder Action');
        console.log('props data ', orderDTO);

        var date = new Date().getDate();
        var month = new Date().getMonth()+1;
        var year = new Date().getFullYear();
        var fulldate = year+'/'+month+'/'+date
        
        var hours = new Date().getHours(); 
        var min = new Date().getMinutes();

        var time = hours+':'+min;
    
        return fetch(this.baseUrl + '/api/v1/orderRoute/placeOrder', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              id  : orderDTO._user_id,
            detail  : orderDTO._order_detail,
            address : orderDTO._order_delivery_address,
            city   : orderDTO._order_city,
            no : orderDTO._contact_no,
            paymenttype : orderDTO._order_payment_type,
            type : orderDTO._order_type,
            status : orderDTO._order_status,
            date:fulldate,
            time:time
          }),
        });
      }

      async searchStatus(user_id) {
        console.log('props data ', user_id);
        return fetch(this.baseUrl + '/api/v1/orderRoute/orderStatus', {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            id: user_id,
          },
        });
      }

}