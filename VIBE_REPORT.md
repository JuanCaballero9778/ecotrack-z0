# Vibe Report — EcoTrack: Reflexiones sobre el Vibe Coding

## 1. Configuración de las reglas del agente (.cursorrules)
Para arrancar este proyecto, lo primero que hice fue configurar el archivo `.cursorrules` en Cursor. Más que un simple archivo de texto, lo sentí como redactar el contrato de trabajo para un desarrollador senior que iba a trabajar conmigo. Le marqué reglas muy claras:
- Definí que debía usar tecnologías modernas (Next.js, Tailwind, TypeScript) priorizando código modular y limpio.
- Le prohibí explícitamente usar librerías pesadas innecesarias o colgarse de APIs externas para la lógica de cálculo.
- Le di autonomía técnica, dándole permiso para correr comandos en la terminal (`npm install`), estructurar carpetas y solucionar errores por su cuenta.

Esta configuración previa me ahorró tener que corregirle el estilo o la estructura a la IA en cada mensaje; ya sabía exactamente qué tipo de arquitectura esperaba ver en el proyecto.

## 2. Dificultades encontradas al delegar el código a la IA
La mayor dificultad no estuvo en la programación pura, sino en la integración de las herramientas. Al principio intenté usar Replit como entorno de nube, pero me topé con bloqueos de tokens y límites de plataforma que me obligaron a cambiar de estrategia sobre la marcha. Ahí aprendí que el *Vibe Coding* también exige adaptabilidad: tuve que trasladar el flujo hacia **v0** para resolver de forma impecable la interfaz visual y luego traer esa base a mi entorno local.

A nivel mental, lo más difícil fue resistir el impulso de meterme a arreglar código a mano cada vez que algo fallaba. Cuando el agente proponía una solución que no encajaba del todo, tenía que frenar, volver al prompt y explicarle el error con más contexto en lugar de "tocar el archivo por atrás". Romper ese hábito de programador tradicional toma práctica.

## 3. Pasar de "escribir código" a "orquestar una visión"
Esta experiencia cambia por completo la perspectiva de lo que significa desarrollar software. Dejas de sufrir por la sintaxis, por si olvidaste un punto y coma, o por cómo acomodar un contenedor en CSS. Tu rol pasa a ser el de un director de orquesta o un arquitecto de producto: te concentras en definir qué quieres lograr, cómo debe comportarse el sistema, qué experiencia de usuario buscas y cómo fluyen los datos.

La velocidad con la que pasas de una idea abstracta en tu cabeza a tener un producto funcional (MVP) desplegado en la nube es brutal. En lugar de gastar horas escribiendo la estructura base (*boilerplate*), el tiempo se invierte en validar la visión, refinar el diseño y asegurar que la herramienta realmente resuelva el problema planteado, que al final del día es de lo que trata la ingeniería moderna con inteligencia artificial.