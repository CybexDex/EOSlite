
# Welcome to use EOSlite

**EOSlite** is a multi-functional tool developed by Cybex, consisting of online transfer tool and offline signature tool, including transfer, account creation, updating permission, voting, stake / unstake EOS and selling / purchasing of RAM. The major features of EOSlite are:
 
- **Completely open-source** ：Fully built upon open-source technology and all codes are open to the public 
- **Ease of use** ：Simplified UI and easy to use
- **Safe and convenient** ：Offer signature tool that supports offline usage and QR code scanning to easily import and export private keys while ensuring security 

-------------------

## Online Transfer Broadcast Tool

访问域名 https://tools-eos.cybex.io/ 即可在开启的页面进行交易发送，未来还将提供微信小程序版本

每次EOS工具集的使用流程，首先需要通过线上交易发送工具生成交易报头，报头包含访问EOS区块链节点返回的最新有效签名信息，将报头导入离线签名工具后就可以生成经过用户私钥签名的正式交易报文，将该报文导回至线上交易发送工具进行发送，发送成功后会生成一串EOS区块链分配的交易ID，点击该ID会默认跳转至eosmonitor.io（一个EOS区块链浏览器）查询该笔交易的详情

## 离线签名工具

离线签名工具是一个Mac或Windows应用程序，可以运行在大部分安装苹果OSX或微软Windows操作系统的电脑上，由于使用过程需要保证私钥安全，建议完全离线使用，即使用过程中运行离线签名工具的电脑不要接入互联网，从而预防私钥被恶意程序、木马盗取，或者生成的交易报文被篡改造成用户的损失。

## 使用方法
- 在 https://github.com/NebulaCybexDEX/EOSlite/releases 中找到最新版EOSlite客户端并下载
- 在离线电脑上安装EOSlite客户端
- 在联网电脑上访问 https://tools-eos.cybex.io/ ，复制交易报头
- 将交易报头粘贴在离线电脑EOSlite客户端中，根据自己需要选择需要进行的操作，输入交易内容和私钥
- 点击生成交易，将已签名的交易体复制，粘贴在联网电脑 https://tools-eos.cybex.io/ 中的发送交易框
- 点击发送交易，交易发布成功会生成交易哈希，点击即跳转到eosflare区块链浏览器查看交易状态

The functions below are introduced at an order of usage frequency, including transfer, stake, vote and purchase RAM.

## 转账

1.  连上https://tools-eos.cybex.io/
2.  将红框内的信息复制到柚子秘的交易报头
   ![image.png](https://s8.postimg.cc/j68bn4ezp/image.png)
   填入复制信息
   ![image.png](https://s8.postimg.cc/7wflrxhlh/image.png)
1. 填入基本转账信息
![image.png](https://s8.postimg.cc/oy8fu4z2d/image.png)
1. 按下生成交易，下方红框中会产生一个已签名文本
![image.png](https://s8.postimg.cc/5t56ks539/image.png)
1.  柚子秘会帮你复制到剪贴板，只需要再回到https://tools-eos.cybex.io/ ，在框框中粘贴，按下发送交易即完成
![image.png](https://s8.postimg.cc/lfwfxq3b9/image.png)
发送交易成功后，下方会出现交易ID，点击后跳转到EOS浏览器
1. 在区块浏览器可以看到自己的转账信息与状态，CYBEX官方为您挑选我们认为最好用的EOS区块链浏览器eosflare
![image.png](https://s8.postimg.cc/79gp2nd2d/image.png)

## 抵押功能

1. 与上述转账功能步骤相同，从https://tools-eos.cybex.io/ 复制信息后填入交易报头（header）
1. 填入所有相关信息，假设你的帐户余额有100个EOS，那么你可以抵押的网路带宽（NET) 和CPU的总量最多为100个EOS。
![image.png](https://s8.postimg.cc/809f87a85/image.png)
1. 生成交易后，复制信息贴到https://tools-eos.cybex.io/ ，发送交易即可

## 投票功能

<span style="color: red;"> 一个帐户可投票的数量等于已抵押的带宽加CPU, 投票前须确认已抵押足够数量的EOS </span>
1. 与上述转账功能步骤相同，从https://tools-eos.cybex.io/ 复制信息后填入交易报头（header）
2. 填入您想投票的BP候选人的节点帐户名，比如小编填入了EOSCYBEX, 引力区，佳能区的节点帐户名，点击生成交易
![image.png](https://s8.postimg.cc/42qqwycx1/image.png)
1. 将复制好的信息，贴上到https://tools-eos.cybex.io/ 发送交易即完成投票

### 投票代理功能
柚子秘提供代理功能，如果你没有时间投票可以把你的票交给你信任且有能力的代理人，代理人会替你做出最好的选择，比如eoscybexiobp
![image.png](https://s8.postimg.cc/cma4ub0kl/image.png)

## 买卖RAM功能
不再重复叙述上述流程，在买卖RAM的板块中，分为输入EOS数量购买，输入RAM字节购买，及卖出功能

-输入EOS购买，即购买与输入EOS数量等值的RAM
![ram1.png](https://s8.postimg.cc/y8p5bsh9x/ram1.png)

-输入RAM字节购买，即购买需要的内存字节（1B=1字节，1KB=1024字节，1MB=1024*1024字节）
![ram2.png](https://s8.postimg.cc/ee33pp4n9/ram2.png)

-卖出RAM，即卖给EOS系统帐户需卖出的内存字节
![ram3.png](https://s8.postimg.cc/prpn0e7at/ram3.png)

## 新帐户创建功能

通过柚子秘这个小工具你可以为你的好友离线创造一个新的EOS帐户，步骤如下
1. 与上述已提到功能相同，从https://tools-eos.cybex.io/ 里复制信息后填入交易报头（header）
1. 填入创建者帐户及被创建帐户信息
![image.png](https://s8.postimg.cc/prpn0jk79/image.png)
1. 点击生成交易，将复制好的信息，贴上到https://tools-eos.cybex.io/ 发送交易，即完成新账户的创建

## 更新权限功能与密钥生成功能

如果担心自己的私钥长时间没有更换或是不小心被第三者看到，通过柚子秘你可以随时更换你的owner key及active key，定期的更新密钥是保护自己资产安全的好习惯，步骤如下
1. 到“密钥生成”栏下，产生新的公私钥对
1. 在“更新权限”栏下，与上述已提到功能相同，从https://tools-eos.cybex.io/ 里复制信息后填入交易报头（header）
![active_key.png](https://s8.postimg.cc/nbntmm23p/active_key.png)
1. 填入原有帐户的私钥和帐户名，最后填入要更新的公钥
1. 点击生成交易，将复制好的信息，贴上到https://tools-eos.cybex.io/ 发送交易，即完成更新自己对应的公私钥对

柚子秘的代码皆开源于CYBEX的Github上，欢迎社区的大家与我们交流，可以进入我们CYBEX telegram 社群  
https://t.me/CYBEXChinese



