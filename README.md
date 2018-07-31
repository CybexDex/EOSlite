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
1.  将红框内的信息复制到柚子秘的交易报头
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

<font color=#FF0000> 一个帐户可投票的数量等于已抵押的带宽加CPU, 投票前须确认已抵押足够数量的EOS </font>

