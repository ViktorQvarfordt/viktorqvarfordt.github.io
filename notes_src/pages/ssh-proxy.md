# SSH Proxy: Tunnel traffic through SSH

_How to set up a ssh tunnel and how to use it as a proxy in a browser._


## Direct tunnel

Set up a tunnel to `host` on localhost's port 8080:

```
ssh -ND 8080 user@host
```

### Configure the browser to connect to this `SOCKS5` proxy.

**Google chrome:** Start a new browser session connected to the proxy (linux):

```
google-chrome --proxy-server=socks5://localhost:8080 --user-data-dir=/tmp/tmpuser
```

**Firefox:** `Edit -> Preferences -> Advanced -> Network -> Settings -> Manual proxy configuration`: Fill in SOCKS Host and port, leave the rest blank.


## Tunnel through several computers

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
