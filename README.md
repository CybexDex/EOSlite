
# Welcome to use EOSlite

**EOSlite** is a multi-functional tool developed by Cybex, consisting of online transfer tool and offline signature tool, including transfer, account creation, updating permission, voting, stake / unstake EOS and selling / purchasing of RAM. The major features of EOSlite are:
 
- **Completely open-source** ：Fully built upon open-source technology and all codes are open to the public 
- **Ease of use** ：Simplified UI and easy to use
- **Safe and convenient** ：Offer signature tool that supports offline usage and QR code scanning to easily import and export private keys while ensuring security 

-------------------

## Online Transfer Broadcast Tool

Visit https://tools-eos.cybex.io/ to send transaction, which will also be available on WeChat Mini-Program


## Offline Signature Tool

The offline signature tool is a Mac/Windows client. We suggest to use the tool in a fully offline environment to ensure security of your private keys. Please make sure NOT TO connect to Internet when running offline signature tool on your computer to avoid theft by malicious programs or Trojan virus, or any losses caused by tampered transaction messages. 

## Use Guidance
- Download the latest EOSlite Client at  https://github.com/NebulaCybexDEX/EOSlite/releases
- Install EOSlite on your offline computer
- Visit https://tools-eos.cybex.io/ on your internet-connected computer and copy transaction header. 
- Paste the transaction header into the EOSlite Client on your offline computer, then choose the function you are going to use (detailed process described below).
- Click the button of ‘Generate Transaction’, copy the signed transaction message and paste into the box at https://tools-eos.cybex.io/ on your internet-connected computer to send out the transaction
- Click ‘Send Transaction’. It will generate a piece of transaction hash when the transaction is broadcast successfully, and you can click it to check the transaction status at EOS blockchain browser like eosflare.io.

The detailed process of all functions are introduced below at an order of usage frequency, including transfer, stake, vote and purchase of RAM.

## Transfer

1. Connect to https://tools-eos.cybex.io/
2. Copy the information in the red box to the field of ‘Transaction Header’
   ![transfer1.png](https://s33.postimg.cc/5j67bkmfz/transfer1.png)
   Copy the transaction header
   ![transfer2.png](https://s33.postimg.cc/up75iqntr/transfer2.png)
1. Put in the basic information of the transaction
![transfer3.png](https://s8.postimg.cc/mjfgko9hx/transfer3.png)
1. Click the button of ‘Generate Transaction’ and it will generate the signed text as shown in the red box below
![transfer4.png](https://s8.postimg.cc/ruud5eqfp/transfer4.png)
1. EOSlite will copy this text and you just go back to https://tools-eos.cybex.io/, paste the text and click ‘Send Transaction’ to finish the process
![transfer5.png](https://s8.postimg.cc/kev3jpi6t/transfer5.png)
Once the transaction is sent, there will be a transaction ID prompt below and you can click to go back to EOS browser.
1. You can also check the transfer information and status at EOS blockchain browser like eosflare.io
![transfer6.png](https://s8.postimg.cc/bwlnfdr3p/transfer6.png)

## Stake 

1. Connect to https://tools-eos.cybex.io/ and fill out the field of ‘Transaction Header’
1.	Put in all information. When you have 100 EOS in your account, then you can stake at most 100 EOS for NET and CPU.
![delegate.png](https://s8.postimg.cc/8pr3vv1jp/delegate.png)
1. Once the transaction generated, copy the information to https://tools-eos.cybex.io/ to send the transaction.

## Vote

The number of available votes equals that of staked bandwidth plus CPU, please check you have staked enough EOS before voting.
1. Connect to https://tools-eos.cybex.io/ and fill out the field of ‘Transaction Header’
2. Put in the account name of the BP candidate node that you want to select, such as EOSCYBEX, EOS Gravity, EOS Cannon, then click to generate transaction
![vote.png](https://s8.postimg.cc/68fcorx4l/vote.png)
1. Copy the information to https://tools-eos.cybex.io/ to finish voting.

### Proxy Voting 
EOSlite supports proxy voting. You can delegate your votes to the trusted and capable agent to make the best decision for you, such as eoscybexiobp.
![vote_proxy.png](https://s8.postimg.cc/g70bavw5x/vote_proxy.png)

## Purchase RAM
You can choose to use EOS balance or RAM bytes to buy and sell RAM.

-If you put in the number of EOS, you can buy the equivalent number of RAM.
![buy_ram.png](https://s8.postimg.cc/5k6i5qiyd/buy_ram.png)

-If you put in RAM bytes, you can buy the bytes you need (1KB=1024B，1MB=1024*1024B).
![buy_ram2.png](https://s8.postimg.cc/5k6i5t3jp/buy_ram2.png)

-If you want to sell RAM, you are selling bytes to EOS system account. 
![sell_ram.png](https://s8.postimg.cc/hyta66ks5/sell_ram.png)

## Create new account

You can create a new EOS account for your friend offline by EOSlite:
1. Copy the information from https://tools-eos.cybex.io/ and paste into the field of transaction header.
1. Put in the information of your account and the account to be created.
![create_account.png](https://s8.postimg.cc/g8a94dav9/create_account.png)
1. Click to generate transaction and copy the information to https://tools-eos.cybex.io/ to send out the transaction, then the process of creating new account is finished.

## Update Permissions and Generate Private Keys

If you are worried that you are giving away your private keys to anyone else unconsciously or leaving private keys unchanged for long time, you can update your owner key and active key at any time you want. Update private keys regularly, which is a good way to shield your wealth. 
1. Generate new public/private keys under the column of “Generate Private Keys”
1. 2.	Copy the information from https://tools-eos.cybex.io/ and paste into the field of transaction header under the column of “Update Permissions”
![update_and_renew.png](https://s8.postimg.cc/egha9k6yt/update_and_renew.png)
1. Put in the private key and account name of the original account, then put in the updated public key.
1. Click to generate transaction and copy the information to https://tools-eos.cybex.io/ to send out the transaction, then the process of updating your public/private keys is finished.

The code of EOSlite is open to public on Github of Cybex, join our telegram community to exchange views:
https://t.me/CYBEXEnglish



