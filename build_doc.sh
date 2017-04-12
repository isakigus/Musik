#!/usr/bin/env bash

rm -r docs
mkdir -p docs
sphinx-apidoc -o doc/source music_store
sphinx3-build -b html doc/source docs
cp -r app docs/_static/app
git add docs


