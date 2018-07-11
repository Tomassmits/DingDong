## Installing the client on a Raspbian RPi
Install node and npm (although it's probably best to [manually install npm and node](#issues-with-npm)).:
```
sudo apt install nodejs npm pigpio
```
In the `Client` directory, install npm dependencies. Be sure to grab some coffee after you've started this because if it runs (see Notes below), it will take quite some time to complete:
```
npm install
```

## Running the client
By default, the client is configured to mock all GPIO. You can simply run the client by calling:
```
node index.js
```
If you want the client to use GPIO, run it with root privileges (with `sudo`, for example) so it can access GPIO.





# Notes


## Issues with npm
After running into an error with npm ("npm ERR! Error: Method Not Allowed"):

Check out wich ARM is in your RPi by calling:
```
cat /proc/cpuinfo | grep ARMv[0-9]
```

I installed the latest version of node and npm on the RPi by hand (check out https://nodejs.org/dist/latest-v6.x/ for the latest version) :
```
cd /tmp/
wget https://nodejs.org/dist/latest-v6.x/node-v6.14.3-linux-armv6l.tar.gz
tar xf node-v6.14.3-linux-armv6l.tar.gz
cd node-v6.14.3-linux-armv6l
sudo cp -R * /usr/local/

export PATH=$PATH:/usr/local/bin
```
Note that the above block uses the ARMv **6**. You will probably use 6 for the RPi Zero, and 7 for the RPi 3B+. No idea what other models use, but the above mentioned cat of cpuinfo will tell you which version your device is running.
