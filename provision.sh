#!/bin/sh

echo "
########################################################################
                      _     _             
 _ __  _ __ _____   _(_)___(_) ___  _ __  
| '_ \| '__/ _ \ \ / / / __| |/ _ \| '_ \ 
| |_) | | | (_) \ V /| \__ \ | (_) | | | |
| .__/|_|  \___/ \_/ |_|___/_|\___/|_| |_|
|_|                                       

Author: Andrew Duncan <ajduncan@gmail.com>, <Andrew-Duncan@utc.edu>
Project: tokamak
Experiment: sensor fusion

########################################################################
"


# Update and upgrade
echo "Updating system..."
apt-get update > /dev/null 2>&1
echo "Upgrading system packages..."
apt-get -y upgrade > /dev/null 2>&1

# Install system dependencies.
echo "Installing system dependencies: git, nodejs nodejs-dev npm mongodb..."
apt-get -y install git nodejs nodejs-dev npm mongodb > /dev/null 2>&1

# Make sure 'node' is linked to nodejs
if [ ! -f /usr/bin/node ];
then
	echo "Creating operating system symbolic links."
	ln -s /usr/bin/nodejs /usr/bin/node
fi

# Make sure we have bower and grunt installed using npm.
if [ -x /usr/bin/npm ];
then
	echo "Installing node dependencies."
	/usr/bin/npm install -g grunt-cli
	/usr/bin/npm install -g bower
fi

if [ ! -d /home/vagrant/mean ];
then
	echo "Installing mean.io stack..."
	cd /home/vagrant/
	sudo -u vagrant git clone http://github.com/linnovate/mean.git > /dev/null 2>&1
	cd /home/vagrant/mean
	sudo -u vagrant npm install > /dev/null 2>&1
fi

if [ -d /home/vagrant/mean ];
then
	echo "Running mean.io stack."
	cd /home/vagrant/mean
	sudo -u vagrant grunt &
fi

# Remove previous timestamp-started file.
if [ -f /home/vagrant/started ];
then
	echo "Clearing previous started file."
	rm /home/vagrant/started
fi

# Create started file with timestamp.
touch /home/vagrant/started
echo "Timestamp file created under /home/vagrant/started"

if [ -d /vagrant/simulation ];
then
	echo "
########################################################################
Running experiment...
"
	cd /vagrant
	# sudo -u vagrant cmd
	echo "

Experiment complete.
########################################################################
"
fi
