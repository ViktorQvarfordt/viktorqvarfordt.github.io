# Git


## Fancy log

```
git log --graph --pretty=tformat:"%C(6)%an: %C(7)%s%n%C(2)%h%C(7): %C(5)%t%C(1)%d %C(3)% ar %C(4)%ad%n" --abbrev=5 --date=short --all
```

Or use `gitg`.



## Push to non-bare repo

On the receiving repo, set

```
$ git config receive.denyCurrentBranch ignore
```

then

```
$ git push /path/to/receiving-repo master:master
```

Finally, on the receiving repo

```
$ git reset --hard
```

See [this](https://github.com/englishtown/stash-hook-mirror/wiki/Mirror-To-Non-Bare-Remote-Repo) for something more elaborate.



## Misc.

- http://git-scm.com/book/
- http://www.youtube.com/watch?v=ZDR433b0HJY
