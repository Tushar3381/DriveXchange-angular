import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {

  message = '';
  type: 'success' | 'error' = 'success';

  show(msg: string, type: 'success' | 'error' = 'success') {
    this.message = msg;
    this.type = type;

    setTimeout(() => {
      this.message = '';
    }, 3000);
  }
}
