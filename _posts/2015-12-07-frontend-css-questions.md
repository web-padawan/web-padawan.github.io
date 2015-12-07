---
layout: post
title:  "Front-end Job Interview: CSS questions"
date:   2015-12-07 14:21:00
categories: juniorship
---
This article is my attempt to cover some of the [Frontend Dev Interview questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions).
Its main purpose is to understand certain things and to be able to explain them late: it's likely that I'll have such an opportunity in the short term.
My other goals are to strengthen knowledge of Markdown syntax, and to improve my level of English proficiency.
I hope you'll find something new here - at least, a few useful links  for reading and meditation.

##### What is the difference between classes and ID's in CSS?

There are couple of things, the main ones are as follows:

+ ID's are unique. You can only attach one ID to an element, and your page mustn't have several elements with same ID's.
+ Classes are not unique. The same class can be used (actually, it should be used) on multiple elements, and every element can have multiple classes.
+ ID's have much higher specificity than classes, and therefore are rarely used because such CSS rules are difficult to override.

See also: [The Difference Between ID and Class](https://css-tricks.com/the-difference-between-id-and-class)
