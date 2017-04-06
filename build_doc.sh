#!/usr/bin/env bash

rm -r docs
mkdir -p docs
sphinx-apidoc -o doc/source music_store
sphinx-build -b html doc/source docs
git add docs
