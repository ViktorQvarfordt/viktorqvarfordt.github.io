# Image manipulation


## Lossless rotation

Lossless rotation of `foo.jpg` 90 deg clocwise.

```
exiftran -9 -i foo.jpg
```

Flags:

```
-i  Enable in-place editing of the images.
-9  Rotate by 90 degrees clockwise.
-1  Rotate by 180 degrees clockwise.
-2  Rotate by 270 degrees clockwise.
-a  Automatic (using exif orientation tag).
```
