#!/bin/bash

if ! [ -z "$1" ]; then
  sed -i -e "s/\(<base href=\"\/\">\)/<base href=\"\/redux-examples\/\"\/>/g" $1
fi
