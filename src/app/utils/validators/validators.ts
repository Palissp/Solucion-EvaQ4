import {AbstractControl, FormArray, FormControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {ErrorValidate} from "../interfaces/error.interface";



export function fromEcuador(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value: string = control.value;

    if(value == null) return null
    if (value.substring(0, 3).includes("09") || value.substring(0, 3).includes("+593")) {
      return null;
    }
    return { noFromEcuador: true };
  }
}

export function maxLength(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value.length > max ? { MaxLength: true } : null;

  }
}

  export function minLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
    return control.value.length < min ? {minLength: true} : null;
    }
  }
