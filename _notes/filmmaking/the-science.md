# The Science

## Basic Terminology

An image can be thought of as a 2D matrix. If we think about colors , we can extrapolate this idea seeing this image as a 3D matrix where the additional dimensions are used to provide color data.

We’ll call each square in a 2D matrix, a pixel. One pixel represents the intensity of a given color. For example a red pixel means 0 of green, 0 of blue, and a maximum of red.

Each color intensity requires a certain amount of bits, this quantity is known as bit-depth. 8-bits =&gt; \(0 to 255\), let’s say we have a color depth of 24 \(8 \* 3\) bits and we can also infer that that we could use 2 to the power of 24 different colors.

Another property we can see while working with images and video is the aspect ratio which simply describes the proportional relationship between width and height of an image or pixel.

## Digital Camera Sensors

A digital camera uses an array of millions of tiny light cavities or “photosites” to record an image. When you press your camera’s shutter button and the exposure begins, each of these is uncovered to collect photons and store those as an electrical signal. Once the exposure finishes, the camera closes each of these photosites, and then tries to assess how many photons fell into each cavity by measuring the strength of the electrical signal. The signals are then quantified as digital values, with a precision that is determined by the bit depth. The resulting precision may then be reduced again depending on which file format is being recorded \(0 - 255 for an 8-bit JPEG file\).

The above illustration would only create a grayscale image since there is not filter for the image sensor to understand the difference between red, green, and blue. As a result, the camera has to approximate the other two primary colors in order to have full color at every pixel. The most common type of color filter array is called a “bayer array”, shown below.

A bayer array consists of alternating rows of red-green green-blue filters. Notice how the bayer array contains twice as many green as red or blue sensors. Each primary color does not receive an equal fraction of the total area because the human eye is more sensitive to green light than both red and blue light.

### Bayer Demosaicing

Bayer “demosaicing” is the process of translating this Bayer Array of primary colors into a final image whcih ontains full color information at each pixel. How is this possibe if the camera is unable to directly measure full color? One way of understanding this is to instead think of each 2x2 array of red, green, and blue as a single full color cavity.

This would work fine, however most cameras take additional steps to extract even more image information than this color array. If the camera treated all of the colors in each 2x2 array as having landed in the same place, then it would only be able to achieve half the resolution in both the horizontal and vertical directions. On the other hand, if a camera computed the color using several overlapping 2x2 arrays, then is could achieve a higher resolution than would be possible with a single set of 2x2 arrays. The following combination of overlapping 2x2 arrays could be used to extract more image information.

Note how we did not calculate image information at the very edges of the array, since we assumed the image continued in each direction. If these were actually the edges of the cavity array, then calculations here would be less accurate, since there are no longer pixels on all sides \(typically negligible\).

Other demosaicing algorithms exist which can extract slightly more resolution, produce images which are less noisey, or adapt to best approximate the image at each location.

### Demosaicing Artifacts

Images with small-scale detail near the resolujtion limit of the digital sensor can sometimes trick the demosaicing algorithm. The most common artifact is moire \(pronounced “more-ay”\), which may appear as repeating patterns, color artifacts or pixels arranged in an unrealistic maze-like pattern.

Notice the moire effect in the magnified images below.

However, even with a theoretically perfect sensor that could capture and distinguish all colors at each photosite, moiré and other artifacts could still appear. This is an unavoidable consequence of any system that samples an otherwise continuous signal at discrete intervals or locations. For this reason, virtually every photographic digital sensor incorporates something called an optical low-pass filter \(OLPF\) or an anti-aliasing \(AA\) filter. This is typically a thin layer directly in front of the sensor, and works by effectively blurring any potentially problematic details that are finer than the resolution of the sensor.

### Microlens Array

Real-world camera sensors do not actually have photosites which cover the entire surface of the sensor. In fact, they may cover just half the total area in order to accommodate other electronics. Each cavity is shown with little peaks between them to direct the photons to one cavity or the other. Digital cameras contain “microlenses” above each photosite to enhance their light-gathering ability. These lenses are analogous to funnels which direct photons into the photosite where the photons would have otherwise been unused

**Links**:

* [http://www.cambridgeincolour.com/tutorials/camera-sensors.htm](http://www.cambridgeincolour.com/tutorials/camera-sensors.htm)

## Understanding Image

Image noise is the digital equivalent of film grain for analogue cameras. Alternatively, one can think of it as analogous to the subtle background hiss you may hear from your audio system at full volume. For digital images, this noise appears as random spections on an otherwise smooth surface and can significantly degrade image quality.

Some noise can increase the sharpness of an image. Noise increases with the sensitivity setting in the camera, length of the exposure, temperature, and even varies amongst camera models.

#### Signal to Noise Ratio

Some degree of noise is always present in any electronic device that transmits or receives a “signal”. For televisions this signal is the broadcast data transmitted over cable or received at the antenna. For digital cameras, the signal is the light which hits the camera sensor. Even though noise is unavoidable, it can become so small relative to the signal that it appears to be non-existant. The signal to noise ratio \(SNR\) is a useful and universal way of comparing the relative amounts of signal and noise for any electronic system.

The more SNR, the more apparent noise becomes.

#### Terminalogy: ISO Speed

A camera’s ISO speed is a standard which describes it’s absolutely sensitivity to light. ISO settings are usually listed as factors of 2, such as 50, 100, 200 and can have a wide range of values. High numbers represent greater sensitivity and the ratio of two ISO numbers represents their relative sensitivity, meaning a photo at ISO 200 will take half as long to reach the same level of exposure as one taken at ISO 100.

#### Types of Noise

* Fixed Pattern Noise
  * Long Exposure, Low ISO Speed
  * Hot Pixels
  * Generally appears in long exposures, exhurberated by higher temperatures.
* Random Noise
  * Short Exposure, High ISO Speed
  * Characterized by intensity and color fluctuations above and below the actual image intensity.
  * There will always be random noise at any exposure speed and it is most influenced by ISO speed.
* Banding Noise
  * Susceptible camera, Brightened shadows
  * Camera-dependent
  * Noise which is introduced by the camera when it reads data from the digital sensor.
  * Banding noise is most visible at high ISO speeds and in the shadows, or when an image has been excessively brightened.
  * Banding noise can also increase for certain white balances, depending on camera model.

