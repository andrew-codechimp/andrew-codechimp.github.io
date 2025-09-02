---
layout: post
title:  "Unified versioning of android wear and mobile apps"
date:   2015-06-09 14:28:36 +0100
categories: android
---
Having to update both mobile and wear version numbers & codes soon becomes a pain when you're releasing frequently and it's easy to forget.
I dug into Gradle a little and found you can have project level variables so I placed the version numbers in the project level and both the wear and mobile build files reference this.

### gradle.properties (project level)
```
...
VERSION_NAME=1.0.0
VERSION_CODE=1
build.gradle (module level)

android {
    defaultConfig {
        versionName project.VERSION_NAME
        versionCode Integer.parseInt(project.VERSION_CODE)
        ...
    }
...
```