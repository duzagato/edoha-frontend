import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Cross-field validator: holderName and holderPhone must be provided together.
 */
export function holderPairValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const name = group.get('holderName')?.value?.trim() ?? '';
        const phone = group.get('holderPhone')?.value?.trim() ?? '';
        const hasName = name.length > 0;
        const hasPhone = phone.length > 0;

        if (hasName !== hasPhone) {
            return { holderPairRequired: true };
        }
        return null;
    };
}