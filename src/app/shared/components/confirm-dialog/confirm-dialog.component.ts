import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [DialogModule, ButtonModule],
  template: `
    <p-dialog
      [header]="data.title"
      [(visible)]="visible"
      [modal]="true"
      [style]="{ width: '400px' }"
      [closable]="false"
    >
      <p>{{ data.message }}</p>
      <ng-template pTemplate="footer">
        <p-button
          [label]="data.cancelText || 'Cancelar'"
          [text]="true"
          (onClick)="onCancel()"
        />
        <p-button
          [label]="data.confirmText || 'Confirmar'"
          severity="danger"
          (onClick)="onConfirm()"
        />
      </ng-template>
    </p-dialog>
  `,
})
export class ConfirmDialogComponent {
  data: ConfirmDialogData = { title: '', message: '' };
  visible = false;

  private resolveCallback?: (result: boolean) => void;

  open(dialogData: ConfirmDialogData): Promise<boolean> {
    this.data = dialogData;
    this.visible = true;
    return new Promise<boolean>((resolve) => {
      this.resolveCallback = resolve;
    });
  }

  onConfirm(): void {
    this.visible = false;
    this.resolveCallback?.(true);
  }

  onCancel(): void {
    this.visible = false;
    this.resolveCallback?.(false);
  }
}
