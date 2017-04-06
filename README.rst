.. image:: https://travis-ci.org/isakigus/Musik.svg?branch=master
   :target: https://travis-ci.org/isakigus/Musik

.. image:: https://coveralls.io/repos/github/isakigus/Musik/badge.svg?branch=master
   :target: https://coveralls.io/github/isakigus/Musik?branch=master


Welcome to MusiK project!
=========================

**Installation**

Pre requiriemts:

 **python(2.7|3.5)**

 **virtualenv**.

For production enviroment **nginx** and **gunicorn** could be used,or other wgsi servers
Further another databse could be use.

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


**Features:**

Release 1.0:

- A complete music genres list
- See the average song length by artist for each genre
- Look up all the genere songs!

**App documentation**

`Musik site <http://isakigus.github.io/Musik>`_


Enjoy the groove!

*ID 2017*