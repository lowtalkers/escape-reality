###Making the Spherical Images Smaller

We have very large image sizes because each 360° image is composed of many individual images stitched together.

Google just released [Guetzli](https://github.com/google/guetzli), a perceptual JPEG encoder that can make images about 30% smaller. I took our original 4K-ish sized spherical photos and ran through through Guetzli with the following results:

| Filename                              | Original Size           | Guetzli Size  | Decrease in Size | % Decrease |
| ------------------------------------- | -----------------------:| -------------:| ----------------:| ----------:|
| Mikkelers1_4096x20481480624773205.jpg | 4.2 MB                  |        2.6 MB | 1.6 MB           | 38%        |
| IMG_7900-sfTrainStation_4096x20481480470178646.jpg | 4.9 MB | 3.6 MB | 1.3 MB | 27% | 

Processing the images takes a significant amount of time, sometimes more than 10 minutes per images.
