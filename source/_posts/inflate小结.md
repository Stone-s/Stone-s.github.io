---
title: inflate小结
tags: 学习 编程 物协
categories: Android
abbrlink: afa9af88
date: 2020-04-11 19:32:34
description: 布局错乱？深入了解inflate,杜绝错乱
---

# Inflate小结

### inflate 的两个调用方法

### 1. 使用View中的静态方法View.inflate()
public static View inflate(Context context, @LayoutRes int resource, ViewGroup root) 
### 2.使用LayoutInflater中的inflate()方法，在LayoutInflater类中有几个重载方法
public View inflate(@LayoutRes int resource, @Nullable ViewGroup root)  
public View inflate(XmlPullParser parser, @Nullable ViewGroup root)  
public View inflate(@LayoutRes int resource, @Nullable ViewGroup root, boolean attachToRoot)  
public View inflate(XmlPullParser parser, @Nullable ViewGroup root, boolean attachToRoot) 

> 其实，如果查看过这几个方法的调用过程我们就会发现这几个方法不管调用的是哪一个，最终调用的都是 inflate(XmlPullParser parser, @Nullable ViewGroup root, boolean attachToRoot)这个方法

### 所以重点关注一下inflate三个参数的方法重载

    inflate(int resource, ViewGroup root, boolean attachToRoot)

1. 如果root为null，attachToRoot将失去作用，设置任何值都没有意义。
2. 如果root不为null，attachToRoot设为true，则会给加载的布局文件的指定一个父布局，即root。
3. 如果root不为null，attachToRoot设为false，则会将布局文件最外层的所有layout属性进行设置，当该view被添加到父view当中时，这些layout属性会自动生效。
4. 在不设置attachToRoot参数的情况下，如果root不为null，attachToRoot参数默认为true。


 其中第2中情况下，如果我又加了一句 addView（）就会抛出下列异常
``` java
java.lang.IllegalStateException: The specified child already has a parent. You must call removeView() on the child's parent first.
```
这是因为当第三个参数为true时，会自动将第一个参数所指定的View添加到第二个参数所指定的View中，不需要再手动添加。
###两个参数的方法
我们看一下源码就可以知道
``` java
public View inflate(@LayoutRes int resource, @Nullable ViewGroup root) {
        return inflate(resource, root, root != null);
    }
```
1.如果root为null，那么参数就为 `null` `false` 等同于1所述情况。
2.root不为null，等同于2所述情况。
注意：
Fragment的onCreateView()，该方法返回Fragment的UI布局，需要注意的是inflate()的第三个参数是false，因为在Fragment内部实现中，会把该布局添加到container中，如果设为true，那么就会重复做两次添加，则会抛出上述异常。





