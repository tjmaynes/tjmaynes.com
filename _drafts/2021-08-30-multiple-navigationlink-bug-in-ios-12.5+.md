---
layout: post
title: "Multiple NavigationLink bug in iOS 12.5+"
author: tjmaynes
date: 2021-08-30 16:05:24
image: /public/images/posts/2021-08-30-multiple-navigationlink-bug-in-ios-12.5+/background.jpg
published: true 
---
TL;DR: There is a bug in SwiftUI 2.0 that only occurs on devices, and not in the simulator, where your NavigationLink logic will start to redirect in an unexpected way when you use more than two NavigationLinks in the same SwiftUI view.

# Introduction
Recently, my pair and I were tasked with building a user onboarding experience in our internal iOS application. The requirements for this experience included enabling the user to navigate back and forth, and due to API calls, double popping (back to parent's parent view). Since a majority of the UI development in our iOS application is built using SwiftUI, we thought that we could easily use SwiftUI's programmable NavigationLinks to build this experience out.

We began by writing a series of UI tests using XCUITests. Following [red-green-refactor](https://www.codecademy.com/articles/tdd-red-green-refactor), we wrote a failing UI test for our happy path, as seen below:

```swift
import XCTest

class AwesomeAppUITests: XCTestCase {
  func test_whenUserTapsThroughMoreThanTwoScreens_itShouldTakeThemToLastScreen() {
    let app = XCUIApplication()
    app.launch()

    XCTAssertTrue(app.staticTexts["View 0"].exists)
    app.buttons["Tap me!"].tap()

    XCTAssertTrue(app.staticTexts["View 1"].exists)
    app.buttons["Tap me, again!"].tap()

    XCTAssertTrue(app.staticTexts["View 2"].exists)
    app.buttons["One more time..."].tap()

    XCTAssertTrue(app.staticTexts["Can't get here from iOS 12.5+ device!"].exists)
  }
}
```

With our test suite currently failing, we now could move on to writing our implementation code to make our UI test pass.

We decided to use [NavigationLinks](https://www.hackingwithswift.com/quick-start/swiftui/how-to-use-programmatic-navigation-in-swiftui) because it enables developers to programmatically navigate between multiple SwiftUI views. There are multple ways to use NavigationLinks including:
- using a NavigationLink like a button (non-programmatically)
- using NavigationLink's `isActive` to programmatically control one navigation link
- using NavigationLink's `tag` and `selection` to programmatically control more than two navigation links

For our particular usecase it makes sense for us to make our UI tests pass by using the `tag` and `selection` feature of `NavigationLinks`. So, we start writing our implementation.

First, we added a new scene for our AwesomeApp to load on startup.

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

Next, in a file called `MainView.swift`, we created a reusable View called `ContentView`, which contains a Text title and a tappable button, so that the user can to navigate to the different screens.

```swift
import SwiftUI

struct ContentView: View {
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

Next, we created our `MainView`, which will be responsible for orchestrating the navigation flow between `ContentViews` via `NavigationLink`. To accomplish this, we setup a `State` variable called `selection` that we'll update as the user taps through each screen (thus updating state to show the next view) and then assigned each `NavigationView` a `tag` so when `selection` changes it would redirect to the correct `NavigationLink` based on it's tag.

```swift
...

struct MainView: View {
  @State private var selection: String?

  var body: some View {
    NavigationView {
      VStack {
        ContentView(
          message: "View 0",
          buttonTitle: "Tap me!",
          onTap: { self.selection = "view-1" }
        )

        NavigationLink(
          destination: ContentView(
            message: "View 1",
            buttonTitle: "Tap me, again!",
            onTap: { self.selection = "view-2" }
          ),
          tag: "view-1",
          selection: self.$selection
        ) { EmptyView() }

        NavigationLink(
          destination: ContentView(
            message: "View 2",
            buttonTitle: "One more time...",
            onTap: { self.selection = "view-3" }
          ),
          tag: "view-2",
          selection: self.$selection
        ) { EmptyView() }

        NavigationLink(
          destination: Text("Can't get here from device!"),
          tag: "view-3",
          selection: self.$selection
        ) { EmptyView() }
      }
    }
  }
}
```

*Note*: 
