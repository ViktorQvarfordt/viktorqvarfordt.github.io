# NPM


## Global install without sudo

Make a directory for global installations:

    $ mkdir ~/.npm-global

Configure npm to use the new directory path:

    npm config set prefix '~/.npm-global'

Add the folowing line to  `~/.bashrc` or `~/.profile`:

    export PATH=~/.npm-global/bin:$PATH

Restart terminal or enable new settings with:

    source ~/.profile

Test: Download a package globally without using sudo:

    npm install -g jshint
