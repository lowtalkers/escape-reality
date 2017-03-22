### Making the Spherical Images Smaller

We have very large image sizes because each 360° image is composed of [about 18 individual images](http://spherical.photography/360-panorama-creation.html) stitched together. Reducing file sizes by over 1 megabyte feel like a significant improvement on congested mobile networks and underpowered mobile devices.

Google just released [Guetzli](https://github.com/google/guetzli), a perceptual JPEG encoder that can make images about 30% smaller. I took our original 4K-ish sized spherical photos (4096x2048 pixels) and processed them with Guetzli with the following results:

| Filename                              | Original Size           | Guetzli Size  | Decrease in Size | % Decrease |
| ------------------------------------- | -----------------------:| -------------:| ----------------:| ----------:|
| Mikkelers1_4096x20481480624773205.jpg | 4.2 MB                  |        2.6 MB | 1.6 MB           | 38%        |
| IMG_7900-sfTrainStation_4096x20481480470178646.jpg | 4.9 MB | 3.6 MB | 1.3 MB | 27% | 
| IMG_7878-hayesValPark_4096x20481480470054798.jpg | 5.8 MB | 3.9 MB | 1.9 MB | 33% |
| IMG_7894-sfCityCenter_4096x20481480470133413.jpg | 4.9 MB | 3.7 MB | 1.2 MB | 24% |
| IMG_7877-niceSFstreet_4096x20481480469899430.jpg | 5.5 MB | 4.0 MB | 1.5 MB | 28% |

Processing takes a significant amount of time: the "Hayes Valley Park" image took about 24 minutes to finish on my dual core 2.8 GHz i7 laptop! I evaluated both the originals and the Guetzli-processed images at 100% view and really couldn't see any major differences in compression artifacts or degradation in details.

The originals were originally saved as progressive JPEGs because I thought the gradual reveal of images would be a better user experience. However, progressive display doesn't happen with texture mapping in A-Frame / ThreeJS, and the [decoding of progressive JPEGs is 10-200% slower](https://github.com/google/guetzli/issues/54) on underpowered mobile devices. Guetzli makes baseline JPEGs by default.

#### Testing Download Improvements on Cellular

Testing was done on an iPhone SE with 2-bar Verizon LTE network connectivity and no Wi-Fi. Only the image was tested, not the rest of the UI, which involves multiple network calls for the UI icons to Imgur and also loading of a very big JavaScript file for the Aframe-React app (1.6 MB `bundle.js` file).

| Filename | Time to Fully Display |
| -------- | ----------------:|
| https://s3.amazonaws.com/vrpics/Mikkelers1_4096x20481480624773205.orig.jpg | 6.05 sec |
| https://s3.amazonaws.com/vrpics/Mikkelers1_4096x20481480624773205.jpg | 3.63 sec |

We saved about 2.4 seconds for the image to download and decompress (using "faster for mobile" baseline JPEG instead of the original's progressive JPEG). This faster display is a big win for improved UI performance.
