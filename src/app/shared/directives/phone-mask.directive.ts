import { Directive, HostListener, Self } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * Directive that formats a phone input field as (DDD) XXXXX-XXXX while typing.
 * Strips all non-digit characters before propagating the value to the form control.
 * Apply to any <input> inside a reactive or template-driven form.
 *
 * Usage:
 *   <input pInputText formControlName="phone" appPhoneMask />
 */
@Directive({
  selector: '[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective {
  constructor(@Self() private readonly ngControl: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const digits = input.value.replace(/\D/g, '').slice(0, 11);
    input.value = this.format(digits);
    this.ngControl.control?.setValue(digits, { emitEvent: true });
  }

  @HostListener('blur')
  onBlur(): void {
    const currentValue = this.ngControl.control?.value ?? '';
    const digits = String(currentValue).replace(/\D/g, '').slice(0, 11);
    const control = this.ngControl.control;
    if (control) {
      control.setValue(digits, { emitEvent: false });
    }
  }

  private format(digits: string): string {
    if (digits.length === 0) return '';
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
}
