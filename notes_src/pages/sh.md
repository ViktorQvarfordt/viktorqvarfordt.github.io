# Shell stuff

Standalone process:

```
nohup ... >/dev/null 2>&1 &
```

Pipe search results to from `find`

    $ find -name "regex" -exec rm -iv {} \;

    $ find -name "regex" -print0 | xargs -0 rm -iv


List all manually installed packages:

    aptitude  --display-format '%p' search '?installed!?automatic' > ~/my_packages


sync

    rsync -v --partial --progress --human-readable --rsh="ssh -p <port>"

    rsync [OPTION...] SRC... rsync://[USER@]HOST[:PORT]/DEST
