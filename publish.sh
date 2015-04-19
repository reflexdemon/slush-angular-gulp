#!/bin/bash

gulp bump

git push --tags


npm publish
