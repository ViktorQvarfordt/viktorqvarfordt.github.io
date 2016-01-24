# MPlayer

Reducing the quality of the file being played on the fly, useful when
playing a media file from a remote source over a slow network
connection:

    mplayer videofile.mkv -vfm ffmpeg -lavdopts lowres=3:fast:skiploopfilter=all:skipidct=all -framedrop -cache 8192

Resetting the brightness, hue etc. values. MPlayer doesn't reset these
values after restarting:

    xvattr -a XV_HUE -v 0
    xvattr -a XV_SATURATION -v 0
    xvattr -a XV_BRIGHTNESS -v 0
    xvattr -a XV_CONTRAST -v 0

Converting any (audio) format to wav:

    mplayer inputfile.foo -ao pcm:file="outputfile.wav"
