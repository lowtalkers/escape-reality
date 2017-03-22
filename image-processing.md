###Making the Spherical Images Smaller

We have very large image sizes because each 360 image is composed of many individual images stitched together.

Google just released [Guetzli](https://github.com/google/guetzli), a perceptual JPEG encoder that can make images about 30% smaller. I took our original 4K-ish sized spherical photos and ran through through Guetzli with the following results:

| Filename                              | Original Size           | Guetzli Size  | Decrease in Size | % Decrease |
| ------------------------------------- | -----------------------:| -------------:| ----------------:| ----------:|
| Mikkelers1_4096x20481480624773205.jpg | 4.2 MB                  |        2.6 MB | 1.6 MB           | 62%        |
