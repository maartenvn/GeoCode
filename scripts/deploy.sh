# Abort on errors
set -e

# Build
yarn build --mode demo

# Navigate into the build output directory
cd dist

git init
git add -A
git commit -m "[Github Pages] Deploy"

git push -f git@github.ugent.be:GeoCode/Frontend.git master:gh-pages
cd -