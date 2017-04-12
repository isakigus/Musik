How to build docs
=================

Pre requirements:

 **python 3.5**

 **sphinx >=1.4**

save following content into /usr/bin/sphinx3-build

.. code-block:: python

    #!/usr/bin/python3
    # -*- coding: utf-8 -*-
    """
    Same as /usr/bin/sphinx-build but with different
    interpreter
    """

    import sys

    if __name__ == '__main__':
        from sphinx import main, make_main
        if sys.argv[1:2] == ['-M']:
            sys.exit(make_main(sys.argv))
        else:
            sys.exit(main(sys.argv))


run build documents script:

     ./build_docs.sh