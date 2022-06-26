export default class UserDTO{
    constructor(user_id, user_name, user_email, user_password) {
        this._user_id = user_id;
        this._user_name = user_name;
        this._user_email = user_email;
        this._user_password = user_password;
      }

      get user_id() {
        return this._user_id;
      }
    
      set user_id(value) {
        this._user_id = value;
      }
    
      get user_name() {
        return this._user_name;
      }
    
      set user_name(value) {
        this._user_name = value;
      }
    
      get user_email() {
        return this._user_email;
      }
    
      set user_email(value) {
        this._user_email = value;
      }
    
      get user_password() {
        return this._user_password;
      }
    
      set user_password(value) {
        this._user_password = value;
      }
    
      printUserDTO() {
        console.log(
          'UserDTO { user_id : ' +
            this._user_id +
            ' , user_name : ' +
            this._user_name +
            ' , user_email : ' +
            this._user_email +
            ' , user_passwor : ' +
            this._user_password +
            ' }',
        );
      }



}