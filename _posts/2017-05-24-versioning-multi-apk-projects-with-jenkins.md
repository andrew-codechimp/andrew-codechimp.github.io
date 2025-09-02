---
layout: post
title:  "Versioning multi APK projects with Jenkins"
date:   2017-05-24 14:28:36 +0100
categories: android
---
I have used build numbers to version APK's for a while but with the advent of Android Wear 2 multi APK publishing has forced me to think of a creative solution to continue to use build numbers.

The example here is specifically for Android Wear but the principals could easily be adopted for other multi APK needs such as resource or min-sdk specific versions.  Likewise most CI platforms will expose build numbers in a similar way to Jenkins so a similar method could be used regardless of your CI platform.

The problem with multi APK publishing is that each version code must be higher than anything previous.

To solve this I decided to multiply my build numbers by 10 and then add a specific digit for the variant.  In the case of Android Wear 2 this is in both the Wear and Mobile app modules, for resource or min-sdk specific versions this would be in the Flavours section of your app build.gradle.
So for example say I have Mobile and Wear apps, that's 2 different versions I need.
If my build number is 27, for the mobile app I multiply by 10 and then add 1 to give me a version code of 271, for the Wear app I add 2 giving me a version code of 272.  For build 28 I get 281 and 282. 

This way I get nice blocks of version codes to easily group releases together and I get 9 potential variants (10 if I went for a 0 based increment)

For release tagging in Git I suffix a 0 onto the end of the build number for the tag version and title so it matches the range I've published.

I also suffix the version code onto the version name to give a complete version number, and change the archive name to have the version name suffixed as well.

Finally, I like to maintain manual versions for local ad-hoc builds so I check if the Jenkins environment variable is present and fallback to my project level version codes if not.

The Gist below shows the relevant sections of build.gradle files for a typical mobile and wear app along with my static manual version codes in gradle properties and the string mashing I do within Jenkins git publisher.

{% gist e05e0f508796e3e863e1fa6a1867a9b0 %}
