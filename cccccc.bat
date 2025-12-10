# Clear everything
#rm -rf node_modules package-lock.json
#npm cache clean --force
#npm install

# Android clean
cd android
./gradlew clean
#./gradlew cleanBuildCache
cd ..

# Rebuild
npm run android