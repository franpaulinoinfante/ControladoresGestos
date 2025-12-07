# Controladores Gestos
Tarea 3 de Programción de Dispositivos Moviles

El desafío consiste en utilizar el GestureController de Ionic para implementar una lógica personalizada capaz de diferenciar dos eventos de entrada que no son gestos nativos simples: el Doble Toque (Double Tap) y la Presión Larga (Long Press), y notificar cada uno usando el componente <ion-toast>.


El éxito de esta implementación dependerá de dos pilares tecnológicos que usted debe dominar, como se indica en los criterios de evaluación: la implementación correcta de componentes Ionic (30%) y la lógica de los Gestos funcionando fluidamente (30%).


1. Herramientas Clave de Ionic

Para cumplir con este requisito, necesitará inyectar y utilizar dos componentes principales de Ionic:



GestureController: Esta es la herramienta fundamental, ya que permite definir gestos personalizados al registrar eventos de bajo nivel como onStart, onMove, y onEnd sobre un elemento del DOM. Esto le da el control necesario para medir tiempos y distancias.

ToastController: Este componente se utilizará para generar y presentar las notificaciones <ion-toast> en pantalla, mostrando un mensaje diferente para cada gesto detectado (Doble Toque y Presión Larga).


2. La Arquitectura Recomendada: Una Directiva Personalizada

Dado que el requisito pide crear una directiva o función que detecte estos gestos sobre un "recuadro", la mejor práctica en Angular/Ionic es crear una Directiva personalizada (@Directive). Esta directiva puede ser aplicada a cualquier elemento (su "recuadro", que podría ser un div o cualquier contenedor) y encapsulará toda la lógica de detección de gestos.


3. Lógica para la Detección de Gestos Avanzados

La implementación con GestureController requiere el uso de timers y umbrales (tiempos límite) para distinguir los gestos:


A. Detección de Presión Larga (Long Press)

La lógica se centra en medir la duración del contacto entre onStart (inicio del toque) y onEnd (fin del toque).



Inicio (onStart): Al detectar el toque inicial, se debe comenzar un temporizador (e.g., un setTimeout).

Umbral de Tiempo: Si el usuario mantiene el dedo sobre el recuadro por más tiempo que un umbral definido (por ejemplo, 500 a 1000 milisegundos), el gesto se clasifica como Long Press.

Fin (onEnd): Si el onEnd ocurre antes de que se cumpla el umbral de tiempo del Long Press, el temporizador se cancela, y se procede a la lógica del Tap o Doble Tap.


Resultado esperado: Al detectar el Long Press, se llama al ToastController para mostrar: <ion-toast> Presión Larga Detectada </ion-toast>


B. Detección de Doble Toque (Double Tap)

La lógica del Doble Toque se basa en la rápida secuencia de dos eventos Tap.



Primer Tap: Si se registra un onEnd (fin del toque) que no fue un Long Press, se activa un corto temporizador (e.g., 250 a 350 milisegundos). Este temporizador espera un posible segundo toque.

Segundo Tap: Si se registra un segundo onEnd (otro toque) antes de que expire el temporizador del primer tap, se confirma que es un Doble Toque.

Toque Simple: Si el temporizador expira sin que haya un segundo toque, se clasifica como un toque simple, el cual generalmente debe ser ignorado o tratado de forma separada en este reto para no interferir con la Presión Larga y el Doble Toque.


Resultado esperado: Al detectar el Doble Toque, se llama al ToastController para mostrar: <ion-toast> Doble Toque Detectado </ion-toast>