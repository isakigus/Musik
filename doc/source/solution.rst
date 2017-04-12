Explicación de la solución
==========================

.. toctree::
   :maxdepth: 2

La solución consta de un aplicación Django para el backend y Angular y D3 para el frontend.

He utilizado python 3.5 pero puede correr en 2.7 también.

Para el testing de backend he utilizado unittest de Django y para el frontend Jasmine,
en la documentación se incluye un iframe con los test de frontend. Los test están en
   Music/app/scripts/tests_app.js

   `Jasmine tests <MusicID/docs/testing.html>`_

He utilidado github como respositorio y github pages para alojar esta ayuda.
He utilidado Travis CI para correr los test de manera automática y coverall para ver la covertura de código.

He documentado el proyecto con Sphinx, utilizando autodoc y manualmente.
Faltaria mejorar la documentacion de código de backend y crear la de frontend.

La base de datos y modelos la he generado con la funcionalidad de InspectDB

   `ver doc <https://docs.djangoproject.com/en/1.11/howto/legacy-databases/>`_

He utilizado dos Managers, en los modelos Artists y Tracks para realizar los consultas especificas para obtener los datos para las vistas de la tabla y del grafico
con consultas raw sql.

La filosofía seguida es la de Fat models, poner la lógica de negocio en los modelos
y reducir el código de las vistas lo máximo posible.

El páginador lo he implementado a mano.

No he utilizado serializadores para los modelos por no tener la app todas las funcionalidade de un API rest, me parece más sencillo.

La interfaz es intuitiva y dinámica, con animaciones y responsive.

Todas las funcionalidades pedidas, paginacion, busqueda (aunque solo de la página activa)
y ordenación de elementos por columna han sido incluidas (a través de un script de terceros,
MusicID/app/scripts/sorttable.js).

EL testing debería ampliarse y tanto en backend simulando casos de fallos de conexión de bbdd y red,
y en el frontend ampliando las verificaciones de estilos, etc.

Hay instrucciones paso paso de como hacer un deploy en un entorno de desarrollo,
para hacer el deploy en producción haria falta configurar un servidos de front ( nginx/apache)
y uno de back ( apache/gunicorn ...).

He disfrutado mucho haciendo la prueba.

Isaac


Resources:
----------

`Original test pdf <_static/Fullstackcodeassignment.pdf>`_

`Original database <_static/Chinook_Sqlite.sqlite>`_

