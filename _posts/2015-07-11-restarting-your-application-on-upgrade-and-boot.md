---
layout: post
title:  "Restarting your application on upgrade and boot"
date:   2015-07-11 14:28:36 +0100
categories: android
---
I have an application which displays an ongoing notification and although it's well documented how to start something on boot it's less well known how to do so when your app is upgraded. So every time my app was upgraded users would have to manually start the app or wait for the next reboot. It's pretty simple to get code to fire on an upgrade, just use the MY_PACKAGE_REPLACED intent. I usually combine this with the BOOT_COMPLETED to fire the same receiver to set things up properly. It's also important to set your install location to internalOnly otherwise your external storage may not be mounted and the receiver won't fire. Here's the relevant manifest entry and a simple broadcast receiver to do it. 

### AndroidManifest.xml
```
<manifest android:installLocation="internalOnly" ...>

    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />

    <application ...>
       <receiver android:name=".OnStartReceiver">
            <intent-filter>
                <action android:name="android.intent.action.BOOT_COMPLETED" />
                <action android:name="android.intent.action.MY_PACKAGE_REPLACED" />
            </intent-filter>
        </receiver>
    </application>
</manifest>
```

If you only want to do something on upgrade then you can drop the RECEIVE_BOOT_COMPLETED permission.

### OnStartReceiver.java
```
package com.example.myapp

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class OnStartReceiver extends BroadcastReceiver {

    @Override
    public void onReceive(Context context, Intent intent) {

         //TODO - add your code here to start your notification/whatever
    }
}
```
