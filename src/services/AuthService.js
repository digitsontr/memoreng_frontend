import config from '../configLoader'

class AuthService{
    login = async (email,password) =>{
        let status = 0
        let res;
        await fetch(`${config.baseUrl}/api/auth/createtoken`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            }),
          })
          .then((response) => {status = response.status; return response.json()})
          .then((result) => {
            res=result;
          })
          .catch((error) => {console.log("error", error)});

          return {status:status,response:res};
      };

    register = async (name,surname,email,username,password) =>{
        let status = ""
        let res = ""
        await fetch(`${config.baseUrl}/api/user/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": name,
                "surname": surname,
                "username": username,
                "email": email,
                "password": password  
            }),
          })
          .then((response) => {status = response.status; return response.json()})
          .then((result) => {
            res = result;
          })
          .catch((error) => {console.log("error", error)});
          return {status:status,response:res};
      };
      
    refreshToken = async (refToken) => {
      let res;
      await fetch(`${config.baseUrl}/api/auth/createtokenbyrefreshtoken`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "token": refToken,
            }),
          })
          .then((response) => {return response.json()})
          .then((result) => {
            res=result;
          })
          .catch((error) => {console.log("error", error)});

      return res;
    }

    createTokenByClient = async () => {
      let res;
      await fetch(`${config.baseUrl}/api/auth/createtokenbyclient`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "id": "SpaApp",
              "secret": "?Vj3N$:S5>zAJ-Nm5}&]:fB&-#JG82*J"
            }),
          })
          .then((response) => {return response.json()})
          .then((result) => {
            res=result;
          })
          .catch((error) => {console.log("error", error)});

      return res;
    }

    
}
export default AuthService;