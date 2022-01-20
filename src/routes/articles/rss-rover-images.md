---
id: 1
slug: rss-rover-images
title: RSS Rover Images
date: "19th January 2022"
smallImage: /images/articles/rss-rover-images/imageGrid.png
largeImage: /images/articles/rss-rover-images/imageGrid_big.png
desc: The Why (and high-level How) of adding easily viewable rover images to Areo Browser.
keywords: AreoBrowser, mars, rover, perseverance, curiosity, ingenuity, 3D
timeToRead: 7
---

One of my goals for [Areo Browser](/projects/areo-browser) has always been to display rover imagery in context, on and around the 3D models I'm generating from the available DTMs.

The first part of this was added in the last big update - 3D rover paths which can be used to jump to the official NASA image site for any given sol.

Whilst this was a big step forwards in terms of displaying multiple cross-referenced datasets within the same 3D scene, a more accessible solution would be to parse the image data directly inside of [Areo Browser](/projects/areo-browser) itself, which would allow me to display the images alongside the rover paths in any number of potentially interesting ways.

![The path of the Curiosity Rover, displayed on top of a 3D model generated using HiRISE DTM ESP_040770_1755 in the current live version of AreoBrowser.](/images/articles/rss-rover-images/curiosityPath.png)

Luckily for me and anyone reading this, NASA provides separate RSS feeds for the [Perseverance](https://mars.nasa.gov/rss/api/?feed=raw_images&category=mars2020&feedtype=json), [Ingenuity](https://mars.nasa.gov/rss/api/?feed=raw_images&category=ingenuity&feedtype=json) and [Curiosity](https://mars.nasa.gov/rss/api/?feed=raw_images&category=msl&feedtype=json) mission imagery. There are [numerous](https://mars.nasa.gov/mars2020/multimedia/raw-images/) [excellent](https://rkinnett.github.io/roverpics/?mars2020&latest) sites that take advantage of these feeds to allow basic filtering and viewing of every individual image, and easy downloading of the associated data.

However, one thing that I hadn't seen available on the web, was a solution to the problem of how to actually view the image data in a more human-friendly way. 

For instance, images captured at the same location on the same day by the same instrument pointed in the same direction, one directly after the other, were still being displayed as multiple individual frames that would need to be individually viewed and downloaded, rather than as a single, easily playable animation.

![21 individual frames from Perseverance's Left Navcam, as shown on NASA's fantastic Raw Images site. Taken on Sol 148, there is a gap of ~14s between each frame, with the whole sequence covering ~4.5mins.](/images/articles/rss-rover-images/sequenceFrames.png)

So I decided that before attempting to display the image data in 3D, I would set about trying to use the RSS feeds to add the 2D rover imagery to [Areo Browser](/projects/areo-browser), in a way that was easily searchable, sortable, and (most importantly) viewable in logical ways, *and* that would still work on mobile.

Several months of lunchtimes and evenings later (and with a codebase now ~3x larger than before) I finally have something working vaguely well enough that I'm semi-comfortable releasing it as a rough alpha in the next few days.

In the rest of this post, I'll quickly cover roughly how it all works, and then I'll dive deeper into the ImageView types and currently missing/possible future features over the next few weeks.

## A Short Argument for Sharing All of your Metadata
Before I delve into the details, I have to say up front that the choice to share such a large and relatively complete set of metadata to the general public, in such an easily digestable format, alongside every single available rover image, is nothing short of phenomenal. And whilst the Curiosity feed has been extremely helpful during my work, the obvious extra effort that has gone into further standardising and generally improving upon the metadata structure for the Perseverance and Ingenuity missions should be massively applauded. 

All of the work I've done in ingesting, parsing and displaying the data from these missions, is based *solely* on the available RSS feeds - there are (currently) no additional external datasources whatsoever. 

My hope is that this site proves useful and engaging, but if nothing else I hope that it serves as an example of the kind of thing that can be created by those of us outside the organisations directly involved in a given mission, if we are provided with easy access to as much of the associated metadata as possible.

## Groups of Groups of Groups
The new features of [Areo Browser](/projects/areo-browser) are essentially an exercise in how the metadata from the RSS feeds can be used to sort thousands of images into subgroups, each of which can then be further combined again and again, into larger, more feature-rich groups, ready to be viewed within a UI specifically designed for that group's type.

![An example grouping of 368 images from the RSS feed, presented in a custom view that combines them into a single stitched panorama. These images are from Perseverance's Mastcam, and were taken on the 13th January 2022 (Sol 320).](/images/articles/rss-rover-images/mastcamMosaic.png)

Briefly, once the RSS data has been loaded into the app, each image entry within it is converted to a **BaseImage** type. This is the fundamental building block of every group within **Areo Browser's** rover image feature-set, and essentially matches what you see in any of the other apps mentioned above. 

From there, a recursive grouping function is called that takes this set of **BaseImages**, and checks whether they can be grouped again and again into more and more complex image types.

There are currently 6 of these image types in [Areo Browser](/projects/areo-browser), in addition to the **BaseImage**, presented here in roughly increasing order of complexity: 

* **DebayeredImage** - The *Raw* and *Debayered* versions of a single image.
* **Focus3DImage** - *Color* and *Depth* images (currently used only on MSL's MAHLI) that can be used to construct a 3D scene.
* **StereoImage** - The *Left* and *Right* views from the same image capture.
* **SequenceImage** - Multiple frames from the same instrument combined together.
* **FilterStackImage** - A specialised **SequenceImage**, where each frame represents a different focus level from the same instrument for a single view.
* **MosaicImage** - A group of subframes that can be combined into a grid mosaic or panoramic image.

This nested hierarchy approach allows me to create a complex view for any specific image type, whilst still having access to the data and functionality of images nested within.

For instance, the **MosaicImage** type can be constructed from **BaseImages**, **DebayeredImages**, **StereoImages**, or **FilterStackImages**, meaning that for any given mosaic, I also have all the information required to, let's say, switch their component images from their *Raw* to *Debayered* version, or from their *Left* to *Right* eye, wherever those sub-images are available.

There is of course a *lot* more to this, but I'll cover the details of each view further in a future post.

![All possible combinations of sub-images for a single MosaicImage, created using sub-frames from Perseverance's Navcam. The sub-images consist of the raw and debayered versions of the Left and Right Navcam instruments. Each of the 16 images that make up the mosaic have 4 possible viewing modes, combining a total of 64 individual images into one, single, easily viewable frame.](/images/articles/rss-rover-images/gridMosaicSubGroups.png)

## Wrong Groups? New Groups?!

Now, knowing exactly when the grouping described above should (and more importantly should *not*) happen has been an understandably tricky part of the process, and is something that I'm hoping *you* might be able to help me with improving!

If you notice images that are incorrectly being classified, or find certain images that you think would be useful to combine together into a specific existing (or even brand new) view type, please do [get in touch](mailto:hello@mattbrealey.com) and let me know! This is all *far* from finished, and the next step is to improve upon the initial groupings as much as possible.

I want to **massively** thank the people who tested various incarnations of this work for me - your feedback has been invaluable both in correcting some of the technical details, and in giving me the motivation to keep going. So thank you!

Now to finish the splash page and get this thing released 👍