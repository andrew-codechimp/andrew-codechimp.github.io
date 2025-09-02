---
layout: post
title:  "Multiple Complications in watchOS 7"
date:   2020-12-03 15:00:36 +0100
categories: swiftui iosdev
---
![Header Image](/assets/2020-12-03-multiple-complications-in-watchos7/header.jpeg)

With watchOS 7, you can now add multiple complications to your app, exposing different types of views onto your data. Whilst the demo at WWDC 2020 showed how to add multiple complications, it did not detail how to handle interacting with them. For a good user experience when a complication is tapped, you want to open your app in a state that’s relevant to that particular complication.

This article will show you how to add different complications, update them when their descriptions change, and also respond to a particular complication type being tapped.

For our example, we’ll create a simple tabbed watch app showing the headline of three publications. You will be able to add any of these publications to a watch face, and when tapped, it will open the app with the correct tab showing.

We will just create one complication family for this example — a `graphicRectangular,` which is great for text. So when testing, ensure that you are using a watch face that allows this complication. Infograph Modular will be fine and is my preferred test watch face, as it allows several different complication families. Once you’ve added one family, it’s just rinse-and-repeat to support as many families as you want.

Here’s our app in action:

![Demo Image](/assets/2020-12-03-multiple-complications-in-watchos7/demo.gif)

Throughout this article, I will call out the relevant code you will need to add to an existing watch app project.

---

# Setting Up the Watch App
Before we get to the complications, we need to create the actual watch app.

For this example, we will create a simple static data model shared between the app and the complications:

{% gist 83f267cb9f807602d31a799db72d2b70 %}

To view this in the app, we’ll reutilise the default `ContentView` provided by a new watch app template, just adding a publication state variable and displaying the properties:

{% gist b43decdfd79dc0569f790d914f8858d4 %}

For the tabs, we will reuse this single `ContentView` and use the new SwiftUI app lifecycle to add tabs, passing in the publication to make them distinct. In your `App.swift` file, change the `WindowGroup` to add the tabs with an `@state` variable to maintain the currently selected tab. The tag modifiers of each `ContentView` are important. These are what map the `selectedTab` state to each view:

{% gist fe19e90ba685a89c1ae76fae3d46d27e %}

That’s all you need for the app at the moment. You’ll have three views you can swipe through, each showing their publication name and latest headline.

---

# Creating the Complications
If you’ve created basic complications, you’ll know `ComplicationController` is where all the magic happens to expose your complications. Most of this is boilerplate. The only part we’ll change is the actual information displayed on the complication. We’ll also register our different complication types for each of the tabs.

The `getLocalizableSampleTemplate` function is what will get presented on the preview for adding a new complication. It’s important to note that this is cached and so cannot be updated to show real complication data. The complication descriptors are what we use to give uniqueness to each complication (which we will handle soon), so this template just shows placeholder text for the publication and the latest headline:

{% gist 3d94c6516085452dcd67ed24efebc36f %}

The `createTemplate` function is very simple. We’ll get the publication for the identifier selected for this complication and display the publication name and latest headline:

{% gist d2c01a2a1a72ee46a7183375fab4f7cb %}

Nothing new so far. The important element added with watchOS 7 is the `getComplicationDescriptors` function. This allows us to describe what complications we are making available:

{% gist d7e731b697a274bd6a7b229156db13d3 %}

What we are doing here is creating descriptors for our tabs of data. The `displayName` is what’s used when editing a watch face to describe the particular complication instance. The `Dictionary` and `NSUserActivity` are how we identify the complication type the user has tapped on when we re-enter our app, which we’ll get into next.

It’s important to note that there is a limit to the number of descriptors you can add. Though not documented, it appears that the limit is currently ten for third-party apps.

---

# Responding to Complication Taps
Back to our app code. We need to know when a complication is tapped. This is achieved by registering for onContinueUserActivity events for your activity type you specified when creating the descriptors:

{% gist 5d5b3a24bfa74dfd4f62fdbba273ebcc %}

Here, we are adding `onContinueUserActivity` to our `NavigationView` and changing the `selectedTab` state variable to the ID passed in the `userActivity`, which will change our tab view to the relevant tab.

# Updating Complication Descriptions
Whilst not necessary in this example, if your complications change, you will want to update the descriptors and probably the timeline for existing complications. For this, we’ll use the new `scenePhase` change to detect when our app goes into the background and notify watchOS that we have changed things:

{% gist e5be043529e8feb89705946693a01122 %}

---

# Wrapping Up
Although this is a simple example, I hope the techniques described here allow you to add multiple-complication support to your watch apps, allowing users to choose data that’s most relevant to them and display it on their watch faces.

A full example project is available on [GitHub](https://github.com/andrew-codechimp/Multi-Complication-Example).