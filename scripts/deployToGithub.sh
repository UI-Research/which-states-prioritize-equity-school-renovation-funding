#!/usr/bin/env bash

# copy build dir to 'docs' dir
rm -rf docs
cp -r build docs
git add *
git commit -m "deploying to github pages"
git push