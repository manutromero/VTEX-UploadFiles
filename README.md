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


## Backup.

Al ejecutar el comando `npm run backup` en la terminal debes proporcionar el **token** y el **account** de la cuenta  a la que quieres desplegar.

![token-vtex](https://user-images.githubusercontent.com/7321696/175425543-b33f1f04-7e94-44de-8d77-bbc12716996c.png)

Recuerda que este dato puedes sacarlos de las cookies del ambiente myvtex.com 

![cookie](https://user-images.githubusercontent.com/7321696/175425688-12a5bee0-f1c5-4ddb-bf57-c6d00b0324c6.png)



Luego solo debes pegarlo en la terminar 

![image](https://user-images.githubusercontent.com/7321696/175425801-e076ac60-1af0-48bb-8887-490646ff01bc.png)

El siguiente paso es escribir el nombre de la cuenta a la que deseas desplegar. 

![image](https://user-images.githubusercontent.com/7321696/175425925-32a8c6a4-9dd3-4e0d-b319-c389af3449be.png)


## Despliegue.

Al ejecutar el comando `npm run deployer` en la terminal debes proporcionar el **token** y el **account** exactamente igual que en el paso anterior.



</br>
</br>
</br>
</br>




Con este repositorio ya tienes automatizados los despliegues a checkout legacy de VTEX. Disfruta del tiempo libre :) 


