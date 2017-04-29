# Git


## Branches

http://stackoverflow.com/questions/2003505/how-to-delete-a-git-branch-both-locally-and-remotely

Delete remote tracking branc `origin/feature`

```
git branch -dr origin/feature
```


## GitHub PR

```
git remote add <username> <URL>
git fetch <username>
git co -b <pull-request-branch> <username>/<pull-request-branch>
```

### Merge pull request (merge commit)

Takes

```
a--b [master]
    \
     c--d [feature]
```

to

```
a--b------e [master] [feature]
    \    /
     c--d
```


### Squash and merge

Takes

```
a--b [master]
    \
     c--d [feature]
```

to

```
a--b--e [master] [feature]
```
where `e` is `c` and `d` squashed to one commit. This marks the PR as 'Merged'.


### Rebase and merge

Takes

```
a--b [master]
    \
     c--d [feature]
```

to

```
a--b--c'--d' [master]
    \--c--d  [feature]
```
where `c'` and `d'` are the same commits as `c` and `d` but with new SHA. The branch `[feature]` can now safely be removed. This marks the PR as 'Merged'.


## From command line

Github marks a PR as 'Merged' only if the commits in the PR are found on master. There is no support for rebasing from commandline and marking as 'Merged'.



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


## Submodules

- <https://git.wiki.kernel.org/index.php/GitSubmoduleTutorial>
- <http://book.git-scm.com/5_submodules.html>

_Adding submodule to superproject (note, no trailing slash):_

    $ git submodule add host:path/to/repo.git local/path/repo

_Cloning projects with submodule:_ `--recursive`

_Pull submodules after clone:_

    $ git submodule update --init --recursive

_Removal of submodule:_

1. Delete the relevant line from the `.gitmodules` file.
2. Delete the relevant section from `.git/config`.
3. Run `git rm --cached path_to_submodule` (no trailing slash).
4. Commit and delete the now untracked submodule files.


## Misc.

- http://git-scm.com/book/
- http://www.youtube.com/watch?v=ZDR433b0HJY
- [Using hooks](http://toroid.org/ams/git-website-howto)


## Send mail on push

Put the following 2 files in `.git/hooks/`; [`post-receive`](https://github.com/git-multimail/git-multimail/blob/master/git-multimail/post-receive.example) and [`git_multimail.py`](https://github.com/git-multimail/git-multimail/blob/master/git-multimail/git_multimail.py), and update `.git/config` with

```
[multimailhook]
    mailingList = "foo@example.com,bar@example.com"
```
