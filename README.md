## What are Zoom Tabs?

Several years ago (in the days of Angular 1), I created a bunch of demonstration
UIs. In those UIs, I wanted a way to jump between different bits of information.
The obvious choice UI choice would be tabs. But I wanted to make the UI super
intuitive and so instead of having text to describe each tab, I wanted a
picture. I could use icons, but icons were too small to be easily recognized. I
wanted to use images.

With this in mind, I used my meager CSS skills to come up with a system where
each tab was represented by a thumbnail **of its content** but, when you clicked
on that, instead of just switching divs the way a tab component normally would,
the image itself zoomed out and, through a CSS animation, revealed the tab
content.

I thought the effect was pretty neat. But I use React now and I wanted to
recreate that UI component so I could use it in React. The underlying approach
uses CSS animations and transforms that are, presumably, hardware accelerated.
As a result, the fluidity of the animations has always been surprisingly good.
But is this really a viable UI concept or just a flashy component only useful
for demos? I don't really know. But I figured I'd publish it and see what other
people think.
