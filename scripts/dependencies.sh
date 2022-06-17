echo "Checking Node Version"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm -v | grep "0.38.0" &> /dev/null
if [ $? == 0 ]; then
 echo "NVM Installed"
else
 echo "Installing NVM"
 sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
fi

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

nvm use 16 | grep "N/A" &> /dev/null
if [ $? == 0 ]; then
 echo "Installing NVM 16"
 nvm install 16
 echo "NVM 16 ready"
else
 echo "NVM 16 ready"
fi

nvm use 16
yarn


