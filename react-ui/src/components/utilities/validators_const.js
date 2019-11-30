


const Validators = {
    'required': {
        'method': 'isEmpty', validWhen: false
    }
}




function CustomFormControl(validators, regExArgs, message) {
    return { ...validators, message };
}

export { Validators, CustomFormControl }