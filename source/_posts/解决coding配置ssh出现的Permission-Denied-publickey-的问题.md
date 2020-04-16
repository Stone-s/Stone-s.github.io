---
title: 解决coding配置ssh出现的Permission Denied (publickey)的问题
copyright: true
tags: 日常bug
categories: bug
description: 日常bug
abbrlink: f49de3a6
date: 2020-04-16 17:49:33
top:
---

这几天一直在用hexo搭建自己的个人博客，但是总觉得放在github上速度有点慢，在网上看见可以使用双部署策略，就是github上放一个，然后国内的代码托管网站放一个，国内好像大家都选coding吧，那我也选它，还没往上放的时候，我就觉得没那么就简单，果然出问题了，在配置ssh公钥的时候，按照网上教程的指示在gitBash中输入`ssh -T git@git.coding.net`(我找到的所有教程都是这个),一直显示

`git@git.coding.net: Permission denied (publickey).`

不应该啊，都是按教程走的，哪里出问题了，而且这个公钥是github上用的，明明没问题啊，从网上搜索相关的帖子，来回折腾，一下午也没解决问题，直到我看见Coding官网文档中的

![](D:\myblog\source\_posts\解决coding配置ssh出现的Permission-Denied-publickey的问题\QQ图片20200416194418.png)

好家伙，原来使用的指令一直错误的，应该使用`ssh -T git@e.coding.net`,醉辽醉辽，键入上述后，出现巴拉巴拉一串英语，然后输入`yes`，就行了，如图

![](D:\myblog\source\_posts\解决coding配置ssh出现的Permission-Denied-publickey的问题\2020-04-16.png)

就成功了。

另外，目前coding搭建个人博客的教程基本都不能用了，因为coding有一个大的改版，最新[官方教程](https://help.coding.net/docs/devops/cd/static-website-paas.html)。