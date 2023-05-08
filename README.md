<h1>Chat App Documentation</h1>

<h3>Setting up Expo</h3>
<ol>
  <li>
    Make sure your version of node is 16.xx.xx(expo only supports 16)
    You may have to use "nvm install 16.19.0" in your terminal then "nvm use 19.19.0" to make sure the correct version of node is used. IOS users need "nvm alias default 16.19.0" as their third command.
  </li>
  <li>
    Install expo and expo CLI with "npm install -g expo-cli"
  </li>
  <li>
    Create an Expo account <a href="https://expo.dev/">here.</a> login to your Expo account in your terminal by using the command "expo login". Running "expo whoami" will show you who is currently logged in.
  </li>
  <li>
    Create an Expo project by typing "npx create-expo-app hello-world --template" into your terminal. change the hello-world part to whatever you want to name your project. If you get asked to install the "create-expo-app" package say yes. Hit enter to choose "Blank" to create your template.
  </li>
  <li>
    Once inside your project directory start Expo with "npm start" or "expo start". You will see a QR code as well as other options. If you have expo install on your smart phone you can see and launch your project from the list of projects or scan the QR code from your terminal.
  </li>
</ol>

<h3>Andriod Studio</h3>
<ol>
  <li>
    Set up an emulator to test app features on different platforms by downloading <a href="https://developer.android.com/studio">Andriod Studio</a>
  </li>
  <li>
   Once it is downloaded go through the installation process and click the Custom setup. Make sure the "Andriod Virtual Device" is checked and add a file path. Finish the license agreements and click finish.
  </li>
  <li>
    On the welcome screen use the more actions button to pull down more options and select SDK Manager. When the modal opens, select "Show Package Details" from the bottom-right.
  </li>
  <li>
    Check which Android SDK Platform is installed and make sure the corresponding "Google Play System Image" is installed.
  </li>
  <li>
    Once applied find the "SDK Tools" tab above and check if "Android SDK Build-Tools is installed. If not, install it now.
     Windows Users: 
      <ul>
        <li>
          AMD CPUs enable and install "Android Emulator Hypervisor Driver for AMD processors (installer)"
        </li>
        <li>
          Intel CPUs enable and install "Intel x86 Emulator Accelerator (HAXM installer)"
        </li>
      </ul>
      MacOS Users:
        <ul>
          <li>
            Copy the path next to "Andriod SDK Locaion"
          </li>
          <li>
            check what shell your terminal is using
          </li>
          <li>
            Locate and open your \~/.bash\_profile or \~/.bashrc file (or \~/.zshrc if you have a zsh terminal instead of bash). 
          </li>
          <li>
            Add the default stored location of ANDROID_SDK on your system by adding the following to your \~/.bash\_profile or \~/.bashrc file (or \~/.zshrc if you have zsh terminal instead of bash):
            "export ANDROID_SDK=/Users/myuser/Library/Android/sdk"
            Note: This path will be different depending on your device.
          </li>
          <li>
            Add the location for the tools you’ll need to interact with the Android device by adding Platform-Tools (located as a sub-directory of ANDROID_SDK on your system).
            "export PATH=$ANDROID_SDK/platform-tools:$PATH"
            save and close.
          </li>
        </ul>
  </li>
  <li>
   Back in the Andriod Device Studio selected "More Actions" again but this time select "Virtual Device Manager". Select "Create Virtual Device". Which ever one you pick make sure that the Google play store icon is next to it and then hit next.
  </li>
  <li>
    Once in the "System Image" page click on the "Recommended" tab and select a system that includes the google play store and the same API level as the system image you downloaded earlier.
  </li>
  <li>
    In the configuration page that will pop up select "Show Advanced Settings" and scroll down to "Memory and Storage". Adjust the values of the internal storage and SD card to 4069 MB each.
  </li>
  <li>
    You should see your device in your device manager and when you click the Play button it will start your device.
  </li>
</ol>
