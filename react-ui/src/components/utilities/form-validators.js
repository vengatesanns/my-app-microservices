import validator from 'validator';

// Common Form Validators 
export default class FormValidator {

    constructor(obj) {
        this.controls = obj;
    }

    validation = (state) => {
        let form_validation = this.valid();
        Object.keys(this.controls).forEach(field => {
            if (!form_validation[field].isInvalid) {
                const field_value = state[field].toString();
                const args = field.args || [];
                this.controls[field].forEach(rule => {
                    const validation_method =
                        (typeof rule.method === 'string') ? validator[rule.method] : field.method;
                    if (validation_method(field_value, ...args, state) !== rule.validWhen) {
                        form_validation[field] = { isInvalid: true, message: rule.message }
                        form_validation.isValid = false;
                    }
                });
            }
        });
        return form_validation;
    }


    valid() {
        const validation = {};
        Object.keys(this.controls).forEach(key => {
            validation[key] = { isInvalid: false, message: '' }
        });
        return { isValid: true, ...validation };
    }

}