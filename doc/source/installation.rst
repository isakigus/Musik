Installation
============

.. toctree::
   :maxdepth: 2
   :caption: Contents:

Pre requirements:

 **python(2.7|3.5)**

 **virtualenv**.

For production environment **nginx** and **gunicorn** could be used,or other wgsi servers.

Further another database could be use.

Steps:

- download zip

  wget https://github.com/isakigus/Musik/archive/master.zip

- unizp

  unzip master.zip

- install dependencies

  virtualenv sound

  sound/bin/pip install -r Musik-master/run_requirements

- start app ( test mode )

  sound/bin/python Musik-master/manage.py runserver 8999

- Open browser and enjoy

  `Musik app <http://127.0.0.1:8999>`_