import { AbstractControl }  from "@angular/forms";

export class Validations {

    static validateDropdown(control: AbstractControl){
        const { value } = control;
       return value?.id === null? { isNull: true }: null
    }
}