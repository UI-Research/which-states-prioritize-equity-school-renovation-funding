#!/usr/bin/env bash

# copy build dir to 'docs' dir
npm run build
git add *
git commit -m "deploying to github pages"
git push origin main