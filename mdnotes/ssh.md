# SSH


## SSH Proxy: Tunnel traffic through SSH

_How to set up a ssh tunnel and how to use it as a proxy in a browser._


### Direct tunnel

Set up a tunnel to `host` on localhost's port 8080:

```
ssh -ND 8080 user@host
```

#### Configure the browser to connect to this `SOCKS5` proxy.

**Google chrome:** Start a new browser session connected to the proxy (linux):

```
google-chrome --proxy-server=socks5://localhost:8080 --user-data-dir=/tmp/tmpuser
```

**Firefox:** `Edit -> Preferences -> Advanced -> Network -> Settings -> Manual proxy configuration`: Fill in SOCKS Host and port, leave the rest blank.


### Tunnel through several computers

We want to set up a tunnel from `host0` going through `host1`, `host2`, ..., `host(n-1)`, `hostn` (that is, `host0` will use the ip of `hostn` on the web).

On `hostk` for `k = 0, 1, ..., (n-2)` we run

```
ssh -N user@host(k+1) -L port:localhost:hostport
```

On `host(n-1)` we run (just like in case of a direct tunnel)

```
ssh -ND 8080 user@hostn
```

---

_Consult the man page of ssh for a description of the flags etc._



## Automated SSH access, no password

Create the passphrase-less private and public key:

    $ ssh-keygen -t rsa -f ~/.ssh/id_rsa_nopass

Put the public key on remote:

    $ ssh-copy-id -i ~/.ssh/id_rsa_nopass.pub '-p 22 user@remote-host'

More info on this ssh keys:

- http://mywiki.wooledge.org/SshKeys
- http://help.github.com/multiple-ssh-keys/
- http://www.linuxproblem.org/art_9.html



## Configuring SSH client

See `man ssh_config`.

    $ cat ~/.ssh/config
    Host alias
        HostName example.com
        User user
        Port 44
        IdentityFile ~/.ssh/id_rsa_nopass

Thus, `ssh user@example.com:44 -i ~/.ssh/id_rsa_nopass` is shortened to `ssh alias`.



## Configuring SSH server

Require keys, but allow passwords from some hosts: http://blather.michaelwlucas.com/archives/818



## Misc.

- SSH-agent: http://www.ibm.com/developerworks/library/l-keyc2/
- [Good practices for using ssh](http://lackof.org/taggart/hacking/ssh/)
- http://mywiki.wooledge.org/CategorySsh
