---
layout: post
title:  "Reference project level debug.keystore within Gradle build"
date:   2015-05-09 14:28:36 +0100
categories: android
---
Every time you build/deploy to your device from a different machine, or just install a shared debug apk you'll have to uninstall/reinstall the app due to the debug certificate changing. It's also essential to use the same debug certificate if you're associating certificates against cloud API's, many Google services require this.

One option is to make sure everyone's keystore is the same by distributing the debug.keystore and everyone copying it to their ~/.android/ folder. If you work across multiple teams this becomes impossible, and it's an extra step in on-boarding new members of the project even if you are only one team.

Since the debug.keystore is not confidential my preference is to add it to source control and then reference that specific keystore within my build files.  I do it at project root level so that I don't have to duplicate the keystore between mobile and wear apps.

This small gist shows how you should configure your signingConfigs section to use this keystore.

{% gist 996af8edd4f93f3038b3552eeff5dbb9 %}