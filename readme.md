## Setup

### Installations

1. Please Install the following:

- Ganache - from https://trufflesuite.com/ganache/
- nodeJS - from https://nodejs.org/en/
- Metamask Extension - Search on google for your browser.

2. Run the following commands in the specified directory relative to project path.

```bash
  root_folder --> npm install -g truffle          //Install truffle
  root_folder --> npm install                     //Install server dependencies
  root_folder --> cd bc_security                  //This is the client folder
  bc_security --> npm install                     //Install client dependencies
```

### Ganache setup

1. Launch Ganache.
2. Click on Quickstart.
3. Go to the contracts tab & click "LINK TRUFFLE PROJECTS".
4. Click on "Add Project", then navigate to the project directory under bc_security/src and Open "truffle-config.js".
5. Go to the "CHAIN" tab in Ganache and make sure that "Petersburg" is the selected HARDFORK.
6. Click "SAVE AND RESTART".

7. Run the following commands to deploy the solidity smart contracts.

```bash
  root_folder --> cd bc_security
  bc_security --> cd src
  src --> truffle migrate
```

8. Navigate to the contracts tab in Ganache. The EHR contract should now have an address and be marked as deployed.
9. Click on the EHR contract in Ganache.
10. Copy the contract address.
11. Navigate to, and open '/bc*security/src/settings.js', and paste the copied contract address into the exported \_settings* variable.

### Metmask setup

1. Setup your own personal wallet in Metamask (won't be used).
2. CLick on the "Ethereum Mainnet" Drop down then click "Add Network"
3. Specify the following settings:
   - Networks Name: ganache_net &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//can be anything
   - RPC Server: HTTP://127.0.0.1:7545 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//Default
   - CHAIN ID: 1337 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//Might give a warning but ignore it
   - Currency Symbol: ETH
4. Having created your network and connected to it, Next click the top right icon with the image.
5. Click on Import account &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//Will return to this later
6. Open the Ganache window, and navigate to the ACCOUNTS tab.
7. Click on the key icon next to any of the accounts, and copy the private key of that user.
8. Now go back to metamask and input this private key into the Import account window from (5).
9. You should now have your account set up.
10. When you start the server or perform the first transaction, you might be prompted to connect to the website. You should do so using the account that we just imported, it should be the only one with ETH in it.
11. You can add more accounts by repeating the process described above from (4) to (10)

### Running servers

1. Run the following command to run the backend (government hosted) server:

```bash
  root_folder --> npm run server
```

2. Run the following commands to start the client server.

```bash
  root_folder --> cd bc_security
  bc_security --> npm start
```

### Finalizing

You should now be ready to test out everything inside our project.

### Notes:

- The predefined backend hospital usernames, passwords, and AES keys are available inside '/DB.js'. These should be used when submitting or viewing any record to perform authorized encryption/decryption requests with the backend server.
- For the view pages, it takes some time for the React state to update properly, so please make sure to click multiple times to get the records output correctly.
