---
title: RecycleView复用错乱常用解决办法
tags: 学习 编程
categories: Android
abbrlink: 88321c5b
date: 2020-04-11 19:38:23
top: 2
description: 记录RecycleView数据错乱的解决办法，常见的情况继续都覆盖了
---
# RecycleView复用错乱常用解决办法

1.当显示的数据是同步显示的，一般出现错乱都是因为逻辑问题，在recycleview中逻辑判断写if一定要写else
2.当显示的数据是异步的，比如加载网页图片，在图片下载成功以后再设置给imageview显示，如果显示错乱，可以在最开始给imageview设置一个tag，image.setTag(url)，在图片下载成功以后，调用image.getTag(),如果获取的tag和之前设置的tag相同，再进行显示。
3.如果是多布局，在使用的时候一定要用getItemViewType进行类型判断
4.如果插入数据和删除数据导致刷新错乱，在刷新完以后要调用adapter.notifyItemChanged(int posation)或者 adapter.notifyItemRangeChanged(posationStart, itemCount)，刷新position位置
5.当bindViewHolder没有调用导致错乱时，在给recycleview设置adapter之前调用adapter.setHasStableIds(true)，然后在adapter里面重写getItemId(int position)，返回position
6.关于变量的位置
ViewHolder中的控件都被存放在了RecyclerView的类里面，会出现数据错乱的问题





