# IDRD Laboratorio - Frontend

Interfaz web desarrollada en Angular para la gestión de materiales, proyectos y asignaciones del laboratorio IDRD.

---

## Requisitos

- Node.js 22+
- npm
- Angular CLI (`npm install -g @angular/cli`)

---

## Configuración inicial

### 1. Clonar el repositorio e instalar dependencias

```bash
npm install
```

### 2. Variables de entorno

Asegúrate de configurar la URL de la API del backend en el archivo de entorno correspondientes dentro de `src/environments/`:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

---

## Ejecución en desarrollo

Para iniciar el servidor de desarrollo local:

```bash
npm start
# o usando Angular CLI directamente:
ng serve
```

Una vez iniciado, abre tu navegador e ingresa a:

```
http://localhost:4200
```

La aplicación se recargará automáticamente si realizas cambios en los archivos fuente.

---

## Comandos útiles

### Compilar para producción

```bash
npm run build
```
Los archivos compilados se generarán en la carpeta `dist/`.

---

## Despliegue con el entorno global (Opcional)

Si deseas ejecutar este frontend junto con el backend y la base de datos de manera unificada mediante Docker, consulta la guía en el proyecto **`idrd-docker`**.