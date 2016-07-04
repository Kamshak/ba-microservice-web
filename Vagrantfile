$script = <<SCRIPT
  curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
  apt-get install -y nodejs build-essential
  npm install -g npm@latest
  npm install -g gulp bower node-gyp

  su vagrant
  cd /vagrant
  npm install && bower install
  gulp serve
SCRIPT

Vagrant.configure("2") do |config|
  # Settings for the VM
  config.vm.box = "ubuntu/trusty64"
  config.vm.hostname = "web-service.box"
  config.vm.network :private_network, ip: "192.168.10.12"

  # Development environment using gulp live-reload
  config.vm.provision "shell", privileged:true, inline: $script
end
