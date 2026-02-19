import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private _currentToast = signal<ToastMessage | null>(null);
  public readonly currentToast = this._currentToast.asReadonly();

  show(message: string, type: ToastMessage['type'] = 'info', duration: number = 3000): void {
    this._currentToast.set({ message, type, duration });

    // Auto-hide
    setTimeout(() => {
      this.hide();
    }, duration);
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration || 5000);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  hide(): void {
    this._currentToast.set(null);
  }
}
