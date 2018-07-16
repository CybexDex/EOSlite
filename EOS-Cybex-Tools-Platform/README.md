# 欢迎使用柚子秘（EOSlite）

**EOSlite**是一款由Cybex出品的EOS工具集，由线上交易发送工具和离线签名工具组成，主要功能包括转账、投票、抵押/解抵押、RAM买卖，具有以下特点：
 
- **完全开源** ：全部基于开源技术开发，所有代码全部开源
- **使用方便** ：界面简洁布局清晰，使用流程简单
- **安全便捷** ：签名工具支持离线环境使用，并在保证私钥安全的前提下支持二维码等方式方便导入导出

-------------------

## 线上交易发送工具

> 访问域名即可在开启的页面进行交易发送，未来还将提供微信小程序版本

每次EOS工具集的使用流程，首先需要通过线上交易发送工具生成交易报头，报头包含访问EOS区块链节点返回的最新有效签名信息，将报头导入离线签名工具后就可以生成经过用户私钥签名的正式交易报文，将该报文导回至线上交易发送工具进行发送，发送成功后会生成一串EOS区块链分配的交易ID，点击该ID会默认跳转至eosmonitor.io（一个EOS区块链浏览器）查询该笔交易的详情

## 离线签名工具

离线签名工具是一个Mac或Windows应用程序，可以运行在大部分安装苹果OSX或微软Windows操作系统的电脑上，由于使用过程需要保证私钥安全，建议完全离线使用，即使用过程中运行离线签名工具的电脑不要接入互联网，从而预防私钥被恶意程序、木马盗取，或者生成的交易报文被篡改造成用户的损失。

离线签名工具的使用流程为：
- 将线上交易发送工具生成的最新交易报头导入到离线签名工具中
- 输入用户的私钥
- 输入用户的私钥
- 点击生成将会生成私钥签名后的交易报文
- 将报文导出至线上交易发送工具后继续流程

### How to build
You should install npm and git at first, then open Terminal on your mac and run follow commands:

git clone {{ GIT_PULL_ADDRESS }}
cd {{ PROJECT_NAME }}
npm install
cd Eostools
npm install
npm run build

Then you can find the built client named "EOSLite.dmg" under Eostools/build