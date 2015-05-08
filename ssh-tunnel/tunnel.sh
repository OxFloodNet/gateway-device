#!/bin/bash
# Name: tunnel.sh
# Purpose: Script to launch autossh with options
# Usage: Copy into /etc/tunnel/tunnel.sh
# 		 Make sure permissions are tight: $ sudo chmod -R 700 /etc/tunnel
#		 Set autossh@<remotehost> to your remote system where the tunnel will open up
# 		 Don't forget to su as autossh user and run ssh once manually. This will add host key to /home/autossh/.ssh/known_hosts
# 		 Also don't forget to set tunnel listener port (2222) to something unique

set +e
# Always assume initial connection will be successful
export AUTOSSH_GATETIME=0
# Disable echo service, relying on SSH exiting itself
export AUTOSSH_PORT=0
# become autossh user with shell /bin/sh
# run autossh with verbose mode on
# -f drop into background
# -M 0 to turn off echo port
# -q (ssh option - Quiet mode)
# -N (ssh option - Do not execute a remote command.  This is useful for just forwarding ports )
# Options - set keepalives for firewalls which eat sessions:
# -o "ServerAliveInterval 60" 
# -o "ServerAliveCountMax 3"
# -R Set up a remote tunnel
#    <remote port to expose>:localhost:<local port to map>
# autossh@<remotehost> - be sure to remove <remotehost> and set a real remote hostname/ip
su -s /bin/sh autossh -c 'autossh -vv -M 0 -q -f -N -o "ServerAliveInterval 60" -o "ServerAliveCountMax 3" -R 2222:127.0.0.1:22 autossh@<remotehost>'
