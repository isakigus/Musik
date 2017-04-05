#!/usr/bin/env bash

cd docs/
rm -r html
mkdir -p html
sphinx-apidoc -o . music_store
sphinx-build -b html source html