#!/usr/bin/env bash

npm run build
git add *
git commit -m "deploying to github pages"
git push origin main