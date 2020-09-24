#!/bin/bash
#Author: Samuel Mast
#Date: 9/22/2020
cd /var/log
cp syslog /home
cd /
cd /home
egrep -i "error" syslog | sudo tee error_log_check.txt
echo "hello" | mail -s "errorlog" sama9843@colorado.edu -A error_log_check.txt

