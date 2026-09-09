# Vibe Report — EcoTrack: Reflexiones sobre el Vibe Coding

## 1. Configuración de las reglas del agente (.cursorrules)
Para arrancar este proyecto, lo primero que hice fue armar el archivo `.cursorrules` en Cursor. Más que un simple archivo de configuración, lo sentí como redactar las directrices de trabajo para un desarrollador senior que se sumaba a mi equipo. Le dejé las reglas bien claras desde el inicio:
- Establecí el uso de tecnologías modernas como Next.js, Tailwind y TypeScript, priorizando siempre un código limpio y modular.
- Le prohibí explícitamente cargar librerías pesadas innecesarias o depender de APIs externas para la lógica de cálculo.
- Le otorgué autonomía técnica total para ejecutar comandos en la terminal (`npm install`), estructurar directorios y resolver errores por cuenta propia.

Hacer esto desde el principio me salvó de tener que corregirle el estilo o la estructura a la IA en cada mensaje; el agente ya sabía exactamente qué nivel de arquitectura esperaba ver en el proyecto.

## 2. Dificultades encontradas al delegar el código a la IA
La mayor traba no vino por el lado de la programación, sino por la infraestructura. Al principio mi idea era usar Replit, pero me topé con bloqueos de tokens y límites de plataforma que me obligaron a cambiar de plan sobre la marcha. Ahí comprobé que el *Vibe Coding* también te exige ser flexible: tuve que migrar el flujo hacia **v0** para resolver la parte visual de forma impecable y luego sincronizarlo todo con el entorno local.

A nivel mental, lo que más me costó fue aguantar las ganas de meterme a arreglar código a mano cada vez que algo fallaba. Cuando el agente proponía una solución que no me convencía del todo, tenía que parar, respirar, volver al prompt y explicarle el error con mejor contexto en lugar de "tocar el archivo por atrás". Romper con ese vicio de programador tradicional de querer resolverlo todo escribiendo uno mismo toma su práctica.

## 3. Pasar de "escribir código" a "orquestar una visión"
Vivir este proceso cambia por completo la perspectiva sobre el desarrollo de software. Pues tu olvidas de sufrir por la sintaxis, de buscar dónde faltaba un punto y coma o de pelearte con las clases de CSS. Tu rol pasa a ser el de un director de orquesta o un arquitecto de producto: te concentras en definir qué quieres lograr, cómo debe comportarse el sistema, qué experiencia de usuario buscas y cómo fluye la información.

La velocidad con la que saltas de una idea abstracta en la cabeza a tener un MVP funcional y desplegado en la nube es tremenda. En lugar de quemar horas escribiendo la base repetitiva de un proyecto (*boilerplate*), inviertes el tiempo en validar la visión, afinar los detalles y verificar que la herramienta realmente resuelva el problema planteado. De eso trata al final la ingeniería moderna asistida por inteligencia artificial.