import axios from "axios/index";

var instance = axios.create({
    baseURL: 'http://localhost:8090/rest/'
});

export const initData = () => instance.get('bnkseek/all');

export const deleteItem = (id) => instance.delete('bnkseek/delete/' + id);