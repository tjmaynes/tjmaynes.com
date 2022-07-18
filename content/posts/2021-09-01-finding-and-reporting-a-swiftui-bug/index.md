+++
title = "Finding and Reporting a SwiftUI bug"
description = "There is a bug in SwiftUI 2.0, that occurs in iOS versions 14.5 and up, where your NavigationLink logic will start to redirect in an unexpected way when you have more than two NavigationLinks in the same SwiftUI view."
date = "2021-09-01 16:05:24"

[taxonomies]
tags=["swift", "bug reporting", "automated testing"]

[extra]
author = "tjmaynes"
+++
![swiftui bug](swiftui-bug.jpg)

**TL;DR**: There is a bug in SwiftUI 2.0, that occurs in iOS versions 14.5 and up, where your NavigationLink logic will start to redirect in an unexpected way when you have more than two NavigationLinks in the same SwiftUI view.

# Introduction
Recently, my pair and I were tasked with building a user onboarding experience in our internal iOS application. The requirements for this experience included enabling the user to navigate back and forth, and due to API calls, double popping (back to parent's parent view).

Since a majority of the UI development in our iOS application is built using SwiftUI, we thought that we could easily use SwiftUI's programmable [NavigationLinks](https://developer.apple.com/documentation/swiftui/navigationlink) to build this experience out.

In this blog post, I'm going to document how to reproduce a bug my pair and I found in SwiftUI 2.0, where having more than two NavigationLinks (a common workflow) will break navigation logic in iOS 14.5+, and how to report this bug to Apple.

***BTW** if you'd like to follow along with code by your side, I've made the source code for this project available on [GitHub](https://github.com/tjmaynes/gists/tree/main/swift/swiftui-navigation-links-bug).*

# The Setup

To reproduce this bug, let's begin by following [red-green-refactor](https://www.codecademy.com/articles/tdd-red-green-refactor) and writing our first failing XCUITest test in Xcode, as seen below:

```swift
import XCTest

class AwesomeAppUITests: XCTestCase {

  func test_whenUserTapsThroughMoreThanTwoScreens_itShouldTakeThemToLastScreen() {
    let app = XCUIApplication()
    app.launch()

    XCTAssertTrue(app.staticTexts["First screen"].exists)
    app.buttons["Tap me!"].tap()

    XCTAssertTrue(app.staticTexts["Second screen"].exists)
    app.buttons["Tap me, again!"].tap()

    XCTAssertTrue(app.staticTexts["Third screen"].exists)
    app.buttons["One more time..."].tap()

    XCTAssertTrue(app.staticTexts["Final screen"].exists)
  }
}
```

In our UI test we expect to be able to tap through four different screens ("First screen", "Second screen", "Third screen" and "Final screen"). After running the UI test, we expect to see our UI test fail because we have not implemented the code to make this UI test pass. Now that we're red we can move on to writing our implementation code to make our UI test green.

## Enter NavigationLinks

We decided to use SwiftUI [NavigationLinks](https://www.hackingwithswift.com/quick-start/swiftui/how-to-use-programmatic-navigation-in-swiftui) because it enables developers to programmatically navigate between multiple SwiftUI views. There are multiple ways to use NavigationLinks including:
- using a NavigationLink like a button (non-programmatically)
- using NavigationLink's `isActive` to programmatically control one navigation link
- using NavigationLink's `tag` and `selection` to programmatically control more than one navigation link

For our particular use-case it makes sense for us to make our UI tests pass by using the `tag` and `selection` feature of `NavigationLinks`. So, we start writing our implementation.

First, we added a new `Scene` for our AwesomeApp to load on startup.

```swift
@main
struct AwesomeApp: App {
  var body: some Scene {
    WindowGroup {
      MainView()
    }    
  }
}
```

Next, in a file called `ContentView.swift`, we'll create a reusable View called `ButtonView`, which contains a Text title and a tappable button, so that the user can to navigate to the different screens.

```swift
import SwiftUI

struct ButtonView: View {
  let message: String
  let buttonTitle: String
  let onTap: () -> Void

  var body: some View {
    VStack {
      Text(message).padding()

      Button(action: { onTap() }) {
        Text(buttonTitle)
      }
    }
  }
}
```

Next, we created our `ContentView`, which will be responsible for orchestrating the navigation flow between `ButtonViews` via `NavigationLink`. To accomplish this, we setup a `State` variable called `selection` that we'll update as the user taps through each screen (thus updating state to show the next view) and then assigned each `NavigationView` a `tag` so when `selection` is updated SwiftUI should redirect the user to the correct `NavigationLink` destination based on it's tag.

```swift
...

struct ContentView: View {
  @State private var selection: String?

  var body: some View {
    NavigationView {
      VStack {
        ButtonView(
          message: "First screen",
          buttonTitle: "Tap me!",
          onTap: { self.selection = "view-2" }
        )

        NavigationLink(
          destination: ButtonView(
            message: "Second screen",
            buttonTitle: "Tap me, again!",
            onTap: { self.selection = "view-3" }
          ),
          tag: "view-2",
          selection: self.$selection
        ) { EmptyView() }

        NavigationLink(
          destination: ButtonView(
            message: "Third screen",
            buttonTitle: "One more time...",
            onTap: { self.selection = "view-4" }
          ),
          tag: "view-3",
          selection: self.$selection
        ) { EmptyView() }

        NavigationLink(
          destination: Text("Final screen"),
          tag: "view-4",
          selection: self.$selection
        ) { EmptyView() }
      }
    }
  }
}
```

We should be in a good place now to run our UI tests. As seen in the below gif.

![passing ui tests](passing-14.4.gif)

We find that our UI Test is passing, and after a sanity checking by opening the app in the simulator and seeing everything work accordingly, we're ready now to push to pipeline. Eventually, we find that everything passed in our pipeline! So, we're done here...*right*?

# The Bug

![Surprised Pikachu Face](surprised-pikachu-face.jpg)

We let out Project Manager know our story was ready to be QA'd and that they could download the latest iOS QA build from [AppCenter](https://appcenter.ms/). Less than five minutes later, we get a message from Product saying the story was getting `restarted` (our backlog is in [Pivotal Tracker](https://www.pivotaltracker.com/)) because the experience didn't work. Our PM even included a screen-recording of what they experienced and as you'll guess, it wasn't the same experience we were seeing locally in our iOS simulator.

After going back and forth with our PM we discover that our PM is running the latest iOS version (currently iOS 14.7.1), so we download the latest version of Xcode (due to client constraints we were unable to do this on client machines easily), and ran the app on an iOS 14.5 simulator. **And like magic** we were able to reproduce the bug and see our UI tests do not pass either! Below is a screen-capture of the failure occurring in an iOS 14.5 simulator:

![failing ui tests](failing-14.5.gif)

We even get a bug report from Apple in the console window:

![xcode bug report screenshot](xcode-bug-report-screenshot.jpg)

We were able to turn the bug "on and off", when we commented out the third `NavigationLink`, which means that in order to control the flow of multiple views in SwiftUI, and support iOS devices 14.5 and higher, we'd need to break out our `NavigationLinks` into subviews.

## Opening a bug report

To disclose our bug to Apple, let's first sign into Apple's [Feedback Assistant](https://feedbackassistant.apple.com/) portal. Next, in the top-left corner, we'll tap the "New Post" icon. Next, we'll choose "Developer Tools" from the predefined list of "Feedback starting points". After this, we'll have a new "Feedback form" to fill out.

For us we'll input the following for our Feedback form:
- A "descriptive title" for this bug will be "SwiftUI - Unable to use more than two NavigationLinks in the same SwiftUI View".
- The "area" we are seeing this issue is in the "SwiftUI Framework".
- We are reporting "Incorrect/Unexpected Behavior" from the SwiftUI Framework

Next, we'll add a helpful description. Helpful descriptions come in many shapes and sizes, so it's best to have some structure to help assist an Apple Developer on the issue you report. Below is an example format you can follow:

```markdown
# Expected behavior:
I should be able to...
# Unexpected behavior:
It is doing this instead...
# Reproducible steps:
1. Step 1
2. Step 2
```

*Try to put yourself in the Apple support teams' shoes...what all would you need to reproduce the bug?*

For us, let's include the following as our helpful description to the Apple support team:

```
Reproducible builds:
The bug exists in iOS 14.5+ simulators and devices.

Expected behavior:
I should be able to programmatically control the flow of multiple NavigationLinks destinations (within the same View) using `selection` and `tag`.

Unexpected behavior:
When a third NavigationLink is added to a SwiftUI View, the second NavigationLink will redirect back to the NavigationView root and not to the third NavigationLink destination.

Notes:

I've included a SwiftUI test that should fail (thus reproducing) the bug when running the XCUITest suite in an iOS 14.5 simulator. This XCUITest suite passes when running in an iOS 14.3 simulator.

--- ApplicationTest.swift
import XCTest

class AwesomeAppUITests: XCTestCase {

  func test_whenUserTapsThroughMoreThanTwoScreens_itShouldTakeThemToLastScreen() {
    let app = XCUIApplication()
    app.launch()

    XCTAssertTrue(app.staticTexts["First screen"].exists)
    app.buttons["Tap me!"].tap()

    XCTAssertTrue(app.staticTexts["Second screen"].exists)
    app.buttons["Tap me, again!"].tap()

    XCTAssertTrue(app.staticTexts["Third screen"].exists)
    app.buttons["One more time..."].tap()

    XCTAssertTrue(app.staticTexts["Final screen"].exists)
  }
}
---

--- ContentView.swift
import SwiftUI

struct ButtonView: View {
  let message: String
  let buttonTitle: String
  let onTap: () -> Void

  var body: some View {
    VStack {
      Text(message).padding()

      Button(action: { onTap() }) {
        Text(buttonTitle)
      }
    }
  }
}

struct ContentView: View {
  @State private var selection: String?

  var body: some View {
    NavigationView {
      VStack {
        ButtonView(
          message: "First screen",
          buttonTitle: "Tap me!",
          onTap: { self.selection = "view-2" }
        )

        NavigationLink(
          destination: ButtonView(
            message: "Second screen",
            buttonTitle: "Tap me, again!",
            onTap: { self.selection = "view-3" }
          ),
          tag: "view-2",
          selection: self.$selection
        ) { EmptyView() }

        NavigationLink(
          destination: ButtonView(
            message: "Third screen",
            buttonTitle: "One more time...",
            onTap: { self.selection = "view-4" }
          ),
          tag: "view-3",
          selection: self.$selection
        ) { EmptyView() }

        NavigationLink(
          destination: Text("Final screen"),
          tag: "view-4",
          selection: self.$selection
        ) { EmptyView() }
      }
    }
  }
}
---
```

This description includes expected and unexpected behavior, notes and some reproducible Swift test cases and code. Finally, let's upload our video recordings (the animated gifs) to the Feedback form too.

You can find the bug I reported in the OpenRadar portal [here](https://openradar.appspot.com/radar?id=5059954041946112).

# Conclusion

If you happen to come across a bug in SwiftUI, or in any standard library and/or dependency you rely on, try to take the time to document the bug in a blog post. This helps grow a deeper understanding of your toolchain, improves your communication skills and you may be helping another lone wanderer with the same problem they are facing. Also, reporting the bug in the appropriate issue tracking portal would be extremely helpful too.
