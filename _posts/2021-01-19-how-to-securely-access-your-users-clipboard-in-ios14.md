---
layout: post
title:  "How To Securely Access Your User’s Clipboard in iOS 14"
date:   2021-01-19 15:00:36 +0100
categories: swiftui iosdev
---
![Header Image](/assets/2021-01-19-how-to-securely-access-your-users-clipboard-in-ios14/header.jpeg)

With the introduction of iOS 14, Apple has given users new insight into what apps are doing. One key feature involves the often-overlooked pasteboard (or as most know it, the clipboard). Previously, any app could inspect the pasteboard contents whenever they wanted. Usually, this was for automatically extracting links or phone numbers, but it left the gates open for more malicious snooping.

Now, whenever an app inspects the value of the pasteboard, the user is notified by a temporary popup telling them that they have potentially given important information to this app.

![Demo Image](/assets/2021-01-19-how-to-securely-access-your-users-clipboard-in-ios14/demo.gif)

This led to some high-profile apps being called out for what seemed like unreasonable behaviour, forcing them to quickly explain why they were snooping on the pasteboard in the first place. In many cases, they quickly removed pasteboard inspection.

iOS has always had the ability to determine the content type on the pasteboard so you could quickly determine if you wanted to dig further. Checking content type alone won’t trigger the security popup, but it is triggered when digging deeper into the content— particularly string values.

To allow legitimate pasteboard inspection, Apple has provided a new API to help apps determine whether that string is worth digging into and triggering that popup.

This article will explain how to use this feature and also some unexpected limitations. To help you explore whilst learning this new API, I’ve created a very simple SwiftUI application that uses all the options of the API. To set up the sample, create a new SwiftUI application in Xcode, calling it whatever you like, and paste the code below into the `ContentView.swift` file:

{% gist 40938ba1a9166216e472c92a1a5172a7 %}

The main body of the code is simple if you are familiar with SwiftUI. It creates a button and a text view. The button will look at the pasteboard, conditionally get the contents, and display them in the text view. The piece we’ll concentrate on is the inspectPasteboard function, breaking it down section by section. If you aren’t using SwiftUI, don’t worry. The pasteboard methods work with UIKit as well, but for this example, getting something on the screen is easier with SwiftUI.

Starting at the top, we have:

```
if !UIPasteboard.general.hasStrings { return }
```

This is not new. hasStrings is a very convenient method to determine the type of data in the pasteboard. For our example, we are only interested in textual data, so immediately exit if no strings are present.

The next part is new:

```
UIPasteboard.general.detectPatterns(for: [UIPasteboard.DetectionPattern.probableWebURL, UIPasteboard.DetectionPattern.number, UIPasteboard.DetectionPattern.probableWebSearch], completionHandler: {result in ...
```

Now we get into the new bits introduced with iOS 14. `detectPatterns` allows us to go beyond basic type checking and have some probability that the string will contain something useful. If we inspect it, we will probably be adding useful functionality to our app.

The `for` parameter takes a set of `DetectionPatterns`. There are currently three possible patterns you can use. For this example, we will check all three. But in real-world use cases, we’d probably only be checking one of these. We will cover each in turn, explaining what they check and some typical use cases. First, however, we need to talk about how that `completionHandler` works.

Within that completion handler, we have:

```
switch result {
case .success(let detectedPatterns):
  ...
case .failure(let error):
  ...
}
```

That `.success` result does not mean we’ve found a match to our provided patterns. It just means that the pattern detection has completed. The `detectedPatterns` value contains a set of matched patterns, so we need to check that. The `.failure` result would be set if the `detectPatterns` method encountered an issue accessing the pasteboard — something I’ve never seen happen, but you should gracefully accept that you are unable to look at the pasteboard right now.

Finally, we get to the interesting part: those three `if` statements checking in turn if the detected patterns contain one we are interested in and we can act upon it. It’s at this point that we know we likely have a value we want to read and call that `UIPasteboard.general.string` method that will trigger the user popup.

Apple has not documented the exact criteria of each of these patterns, but I will explain how they work. It is highly likely that Apple will refine these over time and possibly add additional patterns to further prevent apps from accessing the pasteboard unnecessarily.

---

# DetectionPattern.probableWebURL
This is probably the most frequently used of the patterns. It determines if the string contains a URL we may want to extract and use. It’s important to note that this will be matched if the string has a URL anywhere within it, so you will have to manipulate the string further yourself if you want to extract the actual URL portion.

The obvious use case is for “read it later”-style apps to take a URL from another app and offer to parse or save it.

This is probably the safest pattern. You are most likely to find something you can actually use when you access the pasteboard value. Things get a little vaguer with the remaining patterns.

# DetectionPattern.number
This pattern seems to match a lot of numeric use cases. As well as a simple whole number, numbers with decimal places, and numbers with currency symbols, it also matches strings that start with a number and formulas (1+2, etc.).

Whilst this broad matching may be useful for spreadsheet-/calculator-style applications, you will get a false positive if you are, for example, creating a sales tax calculator and the user had a numbered list item in the pasteboard. Until you call that popup producing `UIPasteboard.general.string`, you won’t know if you can truly handle the value.

# DetectionPattern.probableWebSearch
This is the broadest pattern of them all. It seems to match anything we have in the pasteboard as long as it’s text. I have copied whole paragraphs in and this pattern still matches. It is worth noting that it also produces a positive match for URLs and numbers, so if you are acting on multiple patterns, always handle this last.

I don’t have a particular use case for this one. It’s so broad that I would be hitting the pasteboard value (and thereby showing the popup) regardless.

---

## Conclusion
Whilst the new detection patterns won’t stop the popup, they will help your app determine if it’s going to be useful to inspect the pasteboard. Seeing this popup less frequently as a user gives reassurance that your app isn’t overreaching on the data it collects, though it’s probably worth explaining why you are reading the pasteboard when you have to.

I feel this is the first step in the pasteboard pattern sets. Watch out for changes in the future as Apple refines these further, which will be both good for you as an app developer and for user privacy.


