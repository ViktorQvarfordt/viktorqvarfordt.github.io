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


## Colors

```
purple \033[95m
blue   \033[94m
green  \033[92m
yellow \033[93m
red    \033[91m
end    \033[0m
```

https://gist.github.com/vratiu/9780109
