---
title: Android 事件分发
copyright: true
abbrlink: 851e1f11
date: 2020-05-22 13:30:47
tags:  学习 Android
categories: Android
top: 3
description: 
---

## 1.事件分发顺序

 	基本会遵从 Activity --> ViewGroup --> View 的顺序进行事件分发。

​	也就是一个点击事件发生后，事件先传到`Activity`、再传到`ViewGroup`、最终再传到 `View`。

## 2.事件分发涉及的三个重要方法

- **dispatchTouchEvent() **

  分发点击事件，当前点击事件能够传递给当前View时，调用该方法。

- **onTouchEvent()**

  处理点击事件，在dispatchTouchEvent内部调用。

- **onInterceptTouchEvent()**

  用来判断是否拦截某个事件，若当前View拦截了某个事件，则该方法不会再被调用，该方法只存在ViewGroup中，普通的View中没有这个方法。

  上面的三个方法之间的关系可以用下面的伪代码表示：

  ```java
      public boolean dispatchTouchEvent(MotionEvent ev) {
          boolean consume = false;//事件是否被消费
          //调用onInterceptTouchEvent判断是否拦截事件
          if (onInterceptTouchEvent(ev)){
              //如果拦截则调用自身的onTouchEvent方法
              consume = onTouchEvent(ev);
          }else{
              //不拦截调用子View的dispatchTouchEvent方法
              consume = child.dispatchTouchEvent(ev);
          }
          //返回值表示事件是否被消费，true事件终止，false调用父View的onTouchEvent方法
          return consume;
      }
  ```

## 3.Touch时间的传递层级

如果给一个控件注册了touch事件，每次点击它的时候都会触发一系列的ACTION_DOWN，ACTION_MOVE，ACTION_UP等事件。这里需要注意，如果你在执行ACTION_DOWN的时候返回了false，后面一系列其它的action就不会再得到执行了。简单的说，就是当dispatchTouchEvent在进行事件分发的时候，只有前一个action返回true，才会触发后一个action。


### 4.总结：

```java 
public boolean dispatchTouchEvent(MotionEvent event) {
    if (mOnTouchListener != null && (mViewFlags & ENABLED_MASK) == ENABLED &&
            mOnTouchListener.onTouch(this, event)) {
        return true;
    }
    return onTouchEvent(event);
}
```

dispatchTouchEvent返回值的意义跟onTouch返回值的区别，两者返回true的时候ACTION都会传递到ACTION_DOWN，其中onTouch返回true的时候由于不会执行到onTouchEvent所以不会执行到onClick，dispatchTouchEvent返回值为true对会不会执行onClick没有影响；onTouch返回false的时候执行onTouchEvent，如果此时该控件是可点击的就发执行onClick,而dispatchTouchEvent返回false就停止ACTION传递。