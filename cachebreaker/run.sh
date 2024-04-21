#!/bin/sh

python3 cachebreaker/cachebreaker.py
git add index.html
git commit -m "update cache" --no-verify
