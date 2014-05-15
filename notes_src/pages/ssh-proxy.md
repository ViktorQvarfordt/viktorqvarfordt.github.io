# SSH Proxy: Tunnel traffic through SSH

This is an outline of how to set up an ssh tunnel that can be used with a web browser. The first section covers the most common use case, while the second section outlines how to set up a tunnel through multiple computers.


## Tunnel through one computer

Set up the tunnel to `host` on localhost port 8080:

```
$ ssh -ND 8080 user@host
```

Configure the browser to connect to this `SOCKS5` proxy.

**Firefox:** Edit -> Preferences -> Advanced -> Network -> Settings -> Manual proxy configuration: Fill in SOCKS Host and port, leave the rest blank.

**Google chrome:** (on linux)

```
$ google-chrome --proxy-server=socks5://localhost:8080 --user-data-dir=/tmp/tmpuser
```

The last argument ensures we get a clean browser session.


## Tunnel through several computers

Assume `desktop` wants to access the web through a tunnel going through `host1` and `host2` (that is, `desktop` will use the ip of `host2` on the web).

```
desktop -> host1 -> host2 -> internet
```

On `desktop` (and every host in the tunnel-chain, except the next-to-last host) we run

```
$ ssh -N user@host1 -L 8080:localhost:8080
```

On `host1` (the "next-to-last" machine) we run (just like in case of a direct tunnel)

```
$ ssh -ND 8080 user@host2
```

---

_Consult the man page of ssh for a description of the flags etc._
