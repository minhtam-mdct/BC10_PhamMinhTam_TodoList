import { API_URL } from "./constant.js";

export default class ListToDo{
    callApi(uri, method, data){
        return axios({
            url: "https://60bc9ad6b8ab37001759f4e1.mockapi.io/api/" + uri,
            method,
            data,
        });
    }
}