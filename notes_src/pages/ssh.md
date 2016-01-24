% SSH
% Viktor Qvarfordt
% 2012-08-18


## Automated SSH access, no password

Sometimes one needs to have an automated process connect to a remote
host via ssh. For this purpose I like to have a special key with no
passphrase, normally passphrases should be used.

Create the passphrase-less private and public key:

    $ ssh-keygen -t rsa -f ~/.ssh/id_rsa_nopass

Put the public key on remote:

    $ ssh-copy-id -i ~/.ssh/id_rsa_nopass.pub '-p 22 user@remote-host'

More info on this ssh keys:

- <http://mywiki.wooledge.org/SshKeys>
- <http://help.github.com/multiple-ssh-keys/>
- <http://www.linuxproblem.org/art_9.html>


## Configuring SSH client

See `man ssh_config`.

    $ cat ~/.ssh/config
    Host alias
        HostName example.com
        User user
        Port 44
        IdentityFile ~/.ssh/id_rsa_nopass

Instead of doing `ssh user@example.com:44 -i ~/.ssh/id_rsa_nopass` we
can now simply do `ssh alias`.

## Configuring SSH server

Require keys, but allow passwords from some hosts:
<http://blather.michaelwlucas.com/archives/818>

Want to run on port 22, but don't want the Middle East and Asia to
perform brute force authentication attempts? Use [this](LINK_MISSING)
tool to automatically sniff `auth.log` and add firewall rules for
misbehaving ips.


## Misc.

- SSH-agent: <http://www.ibm.com/developerworks/library/l-keyc2/>
- [Good practices for using ssh](http://lackof.org/taggart/hacking/ssh/)
- <http://mywiki.wooledge.org/CategorySsh>
