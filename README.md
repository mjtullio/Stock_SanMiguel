# Stock_SanMiguel
Proyecto final para el curso de Programación Web Avanzada de UTN.BA

# Integrantes Grupo
Tullio, Marcelo Javier
Postai, Daniela Estefanía

# Descripción del Proyecto
Se procedió a desarrollar un sistema para la gestión del stock de productos, pedidos a proveedores y pedidos de venta para una distribuidora local de nuestra ciudad.

# Tecnologias utilizadas
El sistema está desarrollado a nivel de Backend en NodeJS con el uso de la mayoría de módulos que se utilizaron a lo largo del curso.
A nivel de Frontend el sistema utiliza NodeJS, el framework Angular y la librería Angular Material.
El motor de bases de datos utilizado fue MariaDB

# Datos utiles
- El usuario de puebas es 36266304 con contraseña anca123
- Para agregar pedidos de proveedores tener en cuenta que si se agrega un pedido a proveedor, si ingresamos el proveedor 1 deberíamos de ingresar el id de producto 1 o 2, y si agregamos al proveedor 2, ingresar el id de producto 3 y 4; y así sucesivamente con los demás proveedores hasta el id proveedor nro 6.
- Cabe destacar que en el uso de los guardianes no pudimos encontrar solución en el redireccionado la raíz a la hora de agregar ya sea productos, pedido de proveedores o proveedores.
- Para levantar este proyecto se deben correr estos comandos: En la carpeta Backend: nodemon node dist y en la carpeta Frontend: ng serve. Y se debe de correr y ejecutar al menos una vez el script .sql que se encuentra en la raíz de este repositorio.