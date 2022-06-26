export default class OrderDTO{
    constructor(user_id, order_detail, order_delivery_address, order_city,contact_no,order_payment_type,order_type,order_status) {
        this._user_id = user_id;
        this._order_detail = order_detail;
        this._order_delivery_address = order_delivery_address;
        this._order_city = order_city;
        this._contact_no = contact_no;
        this._order_payment_type = order_payment_type;
        this._order_type = order_type;
        this._order_status = order_status;
    }

    get user_id() {
        return this._user_id;
    }
    
    set user_id(value) {
        this._user_id = value;
    }

    get order_detail() {
        return this._order_detail;
    }
    
    set order_detail(value) {
        this._order_detail = value;
    }

    get order_delivery_address() {
        return this._order_delivery_address;
    }
    
    set order_delivery_address(value) {
        this._order_delivery_address = value;
    }

    get order_city() {
        return this._order_city;
    }
    
    set order_city(value) {
        this._order_city = value;
    }

    get contact_no() {
        return this._contact_no;
    }
    
    set contact_no(value) {
        this._contact_no = value;
    }

    get order_payment_type() {
        return this._order_payment_type;
    }
    
    set order_payment_type(value) {
        this._order_payment_type = value;
    }

    get order_type() {
        return this._order_type;
    }
    
    set order_type(value) {
        this._order_type = value;
    }

    get order_status() {
        return this._order_status;
    }
    
    set order_status(value) {
        this._order_status = value;
    }

    printOrderDTO() {
        console.log(
          'OrderDTO { user_id : ' +
            this._user_id +
            ' , order_city : ' +
            this.order_city +
            ' , contact_no : ' +
            this._contact_no +
            ' , order_detail : ' +
            this._order_detail +
            'order_delivery_address : ' +
            this._order_delivery_address +
            ' , order_payment_type : ' +
            this._order_payment_type +
            ' , order_type : ' +
            this._order_type +
            ' , order_status : ' +
            this._order_status +

            ' }',
        );
      }
}