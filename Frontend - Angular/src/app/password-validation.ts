import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('password').value; // to get value in input tag
       let confirmPassword = AC.get('cpassword').value; // to get value in input tag
        if(confirmPassword != password) {
            AC.get('cpassword').setErrors( {MatchPassword: true} )
        } else {
            return null
        }
    }
}