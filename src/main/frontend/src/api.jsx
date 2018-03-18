import axios from "axios/index";


var instance = axios.create({
    baseURL: window.location.href.split(':')[0] + '://' + window.location.href.split('/')[2] + '/rest/'
});

export const initData = () => instance.get('bnkseek/all');

export const initAdditional = () => instance.get('bnkseek/additional');

export const findByNewnum = (newnum) => instance.get('bnkseek/findByNewnum/' + newnum);

export const addItem = (newEntityValues) => instance.post('bnkseek/add/', newEntityValues);

export const updateItem = (id, updatedFields) => instance.post('bnkseek/update/' + id, updatedFields);

export const deleteItem = (id) => instance.delete('bnkseek/delete/' + id);