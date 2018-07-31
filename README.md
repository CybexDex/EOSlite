- [欢迎使用柚子秘（EOSlite）](#%E6%AC%A2%E8%BF%8E%E4%BD%BF%E7%94%A8%E6%9F%9A%E5%AD%90%E7%A7%98%EF%BC%88eoslite%EF%BC%89)
    - [线上交易发送工具](#%E7%BA%BF%E4%B8%8A%E4%BA%A4%E6%98%93%E5%8F%91%E9%80%81%E5%B7%A5%E5%85%B7)
    - [离线签名工具](#%E7%A6%BB%E7%BA%BF%E7%AD%BE%E5%90%8D%E5%B7%A5%E5%85%B7)
    - [使用方法](#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
    - [转账](#%E8%BD%AC%E8%B4%A6)
    - [抵押功能](#%E6%8A%B5%E6%8A%BC%E5%8A%9F%E8%83%BD)
    - [投票功能](#%E6%8A%95%E7%A5%A8%E5%8A%9F%E8%83%BD)
        - [投票代理功能](#%E6%8A%95%E7%A5%A8%E4%BB%A3%E7%90%86%E5%8A%9F%E8%83%BD)
    - [买卖RAM功能](#%E4%B9%B0%E5%8D%96ram%E5%8A%9F%E8%83%BD)
    - [新帐户创建功能](#%E6%96%B0%E5%B8%90%E6%88%B7%E5%88%9B%E5%BB%BA%E5%8A%9F%E8%83%BD)
    - [更新权限功能与密钥生成功能](#%E6%9B%B4%E6%96%B0%E6%9D%83%E9%99%90%E5%8A%9F%E8%83%BD%E4%B8%8E%E5%AF%86%E9%92%A5%E7%94%9F%E6%88%90%E5%8A%9F%E8%83%BD)

# 欢迎使用柚子秘（EOSlite）

**EOSlite**是一款由Cybex开发的EOS多功能工具，是由线上交易发送工具和离线签名工具两部分组成，主要功能包括转账、投票、抵押/解抵押、RAM买卖，具有以下特点：
 
- **完全开源** ：全部基于开源技术开发，所有代码全部开源
- **使用方便** ：界面简洁布局清晰，使用流程简单
- **安全便捷** ：签名工具支持离线环境使用，并在保证私钥安全的前提下支持二维码等方式方便导入导出

-------------------

## 线上交易发送工具

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

以下会依照功能的常用程度，依序介绍转账、抵押、投票，新帐户创建，更新权限，密钥，购买RAM等功能

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



