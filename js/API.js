const API_KEY = 'https://randomuser.me/api?results=50';

export class API {
  static fetchUsers() { 
    return new Promise(function(resolve, reject) {
      const data = fetch(API_KEY)
      const json = data.then((res) => res.json())

      json.then(resolve(json)).catch(reject("Hata"));
    })
  }
}