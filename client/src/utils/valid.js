
export const validRegister = (userRgister) => {
    const { name, account, password, cf_password } = userRgister;
    const errors = []

    if(!name){
        errors.push("Please add your name.")
    } else if(name.length > 20){
        errors.push("Your name is up to 20 chars long.")
    }

    if(!account){
        errors.push("Please add your email.")
    } else if(!validEmail(account)){
        errors.push("Email is incorrect.")
    }

    if(password.length < 6){
        errors.push("Password must be at least 6 chars.")
    }else if(password !== cf_password){
        errors.push("Confirm password did not match.")
    }

    return { 
        errMsg: errors,
        errLength: errors.length
    }
    
}

export function validEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}