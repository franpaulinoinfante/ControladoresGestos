import {
  Directive,
  ElementRef,
} from '@angular/core';
import { GestureController, ToastController } from '@ionic/angular';

@Directive({
  selector: '[appGestureBox]',
  standalone: true   // ← AGREGAR ESTO
})
export class GestureDirective {

  private longPressTimeout: any;
  private tapCount = 0;
  private tapTimeout: any;

  constructor(
    private el: ElementRef,
    private gestureCtrl: GestureController,
    private toastCtrl: ToastController
  ) { }

  ngAfterViewInit() {
    const gesture = this.gestureCtrl.create({
      el: this.el.nativeElement,
      gestureName: 'custom-gesture',   // ← OBLIGATORIO
      threshold: 0,

      onStart: () => {
        this.longPressTimeout = setTimeout(() => {
          this.showToast('Presión Larga Detectada');
          this.tapCount = 0;
        }, 600);
      },

      onEnd: () => {
        clearTimeout(this.longPressTimeout);

        this.tapCount++;

        if (this.tapCount === 1) {
          this.tapTimeout = setTimeout(() => {
            this.tapCount = 0;
          }, 300);
        } else if (this.tapCount === 2) {
          clearTimeout(this.tapTimeout);
          this.tapCount = 0;
          this.showToast('Doble Toque Detectado');
        }
      }
    });

    gesture.enable();
  }


  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }
}
