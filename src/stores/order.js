import React from 'react';
import {observable, action, computed} from 'mobx';

export default class {
    constructor(rootStore) {
        this.rootStore = rootStore;
    }
    
    @observable formData = {
        name: {
            label: 'Your name',
            value: '',
            type: 'text',
            validator: val => /^[aA-zZ]{2,}$/.test(val),
            errorText: 'Латинские символы, не менее 2',
            valid: null
        },
        Email: {
            label: 'Email',
            value: '',
            type: 'email',
            validator: val => /^.+@.+$/.test(val),
            errorText: 'Введите корректный email',
            valid: null
        },
        Phone: {
            label: 'Phone',
            value: '',
            type: 'tel',
            validator: val => /^[0-9]{7,15}$/.test(val),
            errorText: 'Введите корректный номер телефона',
            valid: null
        }
    }

    @observable lastOrderCache

    @action addOrderCache = (total) => {
        this.lastOrderCache = total;
    }

    @computed get formValid() {
        return Object.values(this.formData).every(field => field.valid);
    }

    @computed get data() {
        let data = {};

        for(let name in this.formData) {
            data[name] = this.formData[name].value;
        }

        return data;
    }

    @observable showModal = false;

    @action show = () => {
        this.showModal = true;
    }

    @action hide = () => {
        this.showModal = false;
    }

    @action changeFormData = (name, value) => {
        let field = this.formData[name];
        field.value = value;
        field.valid = field.validator(field.value);
    }
}