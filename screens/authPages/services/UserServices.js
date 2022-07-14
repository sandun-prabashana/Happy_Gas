export default class UserServices {
    
    baseUrl = 'https://066b-2402-d000-812c-fdf5-809e-e37-c792-6cce.in.ngrok.io';


    async signUp(userDTO) {
      console.log('Callling SignUp Action');
      console.log('props data ', userDTO);
      console.log('props data ', userDTO.user_name);
      console.log('props data ', userDTO._user_name);
  
      return fetch(this.baseUrl + '/api/v1/userRoute/signupUser', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id  : userDTO._user_id,
          name  : userDTO._user_name,
          email : userDTO._user_email,
          pwd   : userDTO._user_password,
        }),
      });
    }
  


    async signIn(user_id, user_password) {
      console.log('props data ', user_id, user_password);
      return fetch(this.baseUrl + '/api/v1/userRoute/signInUser', {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          id: user_id,
          password: user_password,
        },
      });
    }
  }
  