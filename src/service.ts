import validator from 'validator'
export function validatePassword(password: string) {
    if (validator.isStrongPassword(password, { 
        minLength: 8, minLowercase: 1, 
        minUppercase: 1, minNumbers: 1, minSymbols: 1 
    })) { 
        return true 
    } else { 
        return false
    } 
}