# VTEX-UploadFiles

En este repositorio permite subir archivos de manera masiva al portal del checkout de vtex.  /admin/portal, Tambien permite descargar todos los archivos de /admin/portal para que quede como backups.



![admin-portal-vtex](https://user-images.githubusercontent.com/7321696/175423763-8bc75730-f33c-4539-a916-6cd9392d8b30.png)

## Crear carpeta dist

Se debe crear una carpeta `/dist` en la raíz del proyecto y dentro de esta se deben copiar los archivos checkout6-custom.js y  checkout6-custom.css se deben llamar iguales a los que soporta VTEX para que sean leidos por VTEX.

## Ejecutar los comandos

Luego solo es abrir la terminal y ejecutar los siguientes comandos según la necesidad. 

 1. `npm run backup` para descargar todos los archivos de `/admin/portal` hacia la carpeta local del repo `/backup`
 2. `npm run deployer` para subir los archivos de la carpeta `/dist`
            hacia la carpeta `/admin/portal` de VTEX.




Con este repositorio ya tienes automatizados los despliegues a checkout legacy de VTEX, ya puedes disfrutar del tiempo libre :) 

