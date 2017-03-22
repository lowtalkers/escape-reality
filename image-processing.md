### Making the Spherical Images Smaller

We have very large image sizes because each 360° image is composed of [about 18 individual images](http://spherical.photography/360-panorama-creation.html) stitched together. Reducing file sizes by over 1 megabyte feel like a significant improvement on congested mobile networks and underpowered mobile devices.

Google just released [Guetzli](https://github.com/google/guetzli), a perceptual JPEG encoder that can make images about 30% smaller. I took our original 4K-ish sized spherical photos and ran through through Guetzli with the following results:

| Filename                              | Original Size           | Guetzli Size  | Decrease in Size | % Decrease |
| ------------------------------------- | -----------------------:| -------------:| ----------------:| ----------:|
| Mikkelers1_4096x20481480624773205.jpg | 4.2 MB                  |        2.6 MB | 1.6 MB           | 38%        |
| IMG_7900-sfTrainStation_4096x20481480470178646.jpg | 4.9 MB | 3.6 MB | 1.3 MB | 27% | 
| IMG_7878-hayesValPark_4096x20481480470054798.jpg | 5.8 MB | 3.9 MB | 1.9 MB | 33% |
| IMG_7894-sfCityCenter_4096x20481480470133413.jpg | 4.9 MB | 3.7 MB | 1.2 MB | 24% |

Processing the images takes a significant amount of time, sometimes more than 10 minutes per image. (The "Hayes Valley Park" image took about 24 minutes to process on my dual core 2.8 GHz i7 laptop!). I evaluated both the originals and the Guetzli-processed images at 100% view and really couldn't see any major differences or degradation in quality.

The originals were originally saved as progressive JPEGs because I thought the gradual reveal of images would be a better user experience. However, progressive display doesn't happen with texture mapping in A-Frame / ThreeJS, and the [decoding of progressive JPEGs is 10-200% slower](https://github.com/google/guetzli/issues/54), and it's worse on underpowered mobile devices. Guetzli makes baseline JPEGs by default.
