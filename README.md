# iditarod

##Data

- adapted [route file](http://mushingtech.blogspot.com/2014/02/the-iditarod-track-file.html)
- [musher & times data](http://iditarod.com/race/2014/)

##Processing

```sh
node parse-csv.js
node get-photos.js
node get-times.js
node split-legs.js
node get-distances.js
node snap-waypoints.js
```