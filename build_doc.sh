#!/usr/bin/env bash

rm -r docs/html
mkdir -p docs/html
sphinx-apidoc -o docs/source music_store
sphinx-build -b html docs/source docs/html
git add docs