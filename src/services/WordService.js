import config from '../configLoader'

class WordService{
    getAllWord = async (accessToken) =>{
        let status = 0
        let res;
        await fetch(`${config.baseUrl}/api/english`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + accessToken
            },
          })
          .then((response) => {status = response.status; return response.json()})
          .then((result) => {
            res=result;
          })
          .catch((error) => {console.log("error", error)});

          return {status:status,response:res};
      };
      getAllWordTop = async (topNumber) =>{
        let status = 0
        let res;
        let token;
        if(localStorage.getItem("tokens")){
          token = JSON.parse(localStorage.getItem("tokens")).accessToken
        }else{
          token = localStorage.getItem("tokenByClient")
        }
        await fetch(`${config.baseUrl}/api/english?&$top=${topNumber}&rand=true` , {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            },
          })
          .then((response) => {status = response.status; return response.json()})
          .then((result) => {
            res=result;
          })
          .catch((error) => {console.log("error", error)});

          return {status:status,response:res};
      };

      getWordleWord = async (topNumber) =>{
        let status = 0
        let res;
        let token;
        if(localStorage.getItem("tokens")){
          token = JSON.parse(localStorage.getItem("tokens")).accessToken
        }else{
          token = localStorage.getItem("tokenByClient")
        }
        await fetch(`${config.baseUrl}/api/english?$filter=length(word) eq 5&top=${topNumber}&rand=true` , {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            },
          })
          .then((response) => {status = response.status; return response.json()})
          .then((result) => {
            res=result;
          })
          .catch((error) => {console.log("error", error)});

          return {status:status,response:res};
      };

}
export default WordService;