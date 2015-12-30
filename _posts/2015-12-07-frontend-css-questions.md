---
layout: post
title:  "Front-end Job Interview: CSS questions"
date:   2015-12-07 14:21:00
categories: juniorship
---
This article is my attempt to cover some of the [Frontend Dev Interview questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions).
Its main purpose is to understand certain things and to be able to explain them later.
My other goals are to strengthen knowledge of Markdown syntax, and to improve my level of English proficiency.
Finally, my article is an attempt to encourage novice frontend developers to raise their skills and to read more.
I hope you'll find something new here - at least, a few useful links for reading and meditation.

#### 1. What is the difference between classes and ID's in CSS?

There are couple of things, the main ones are as follows:

+ ID's are unique. You can only attach one ID to an element, and your page mustn't have several elements with same ID's.
+ Classes are not unique. The same class can be used (actually, it should be used) on multiple elements, and every element can have multiple classes.
+ ID's have much higher specificity than classes, and therefore are rarely used because such strong rules are difficult to override.

*See also: [The Difference Between ID and Class](https://css-tricks.com/the-difference-between-id-and-class)*

#### 2. What's the difference between "resetting" and "normalizing" CSS? Which would you choose, and why?

+ **Resetting CSS** is typically used to remove all built-in browser styles.
  + This can be useful if you are going to define all styles for a separate independent block, as suggested by BEM mehodology.
+ **Normalizing CSS** allows you to preserve some useful defaults and to fix several common display bugs.
  + This can be suitable if your project includes "base rules" layer, as it is described by SMACSS and MCSS.
+ **Sanitizing CSS** allows you to render elements consistently and to style with today’s best practices out-of-the-box.
  + This can be useful if you focus on current trends, without care of older browsers bugs.

I have already used both [reset.css](https://github.com/shannonmoeller/reset-css) and [normalize.css](https://github.com/JohnAlbin/normalize-scss) in my projects.
They both can be installed as bower packages and imported via SCSS. I also suggest paying attention to [sanitize.css](https://github.com/10up/sanitize.css).
Eventually, I decided to put together the advantages of these approaches. The result can be found in my [frontend project template](https://github.com/web-padawan/skystart/blob/master/sass/helpers/_optimize.scss).

*See also: [CSS: reset or normalize?](https://the-pastry-box-project.net/oli-studholme/2013-june-3)*

#### 3. Describe Floats and how they work.

+ Floated elements are pushed to the right or left of the parent element, depending on which value is applied.
+ Block level elements, unless they are floated (or positioned) themselves, act as if the floated element is not there.
+ Inline elements (e. g., the text inside the paragraph) flow around the floated element.
+ Floated elements can affect their parent element: when it only contains floated elements, its height would collapse to nothing.
+ The most common methods to prevent collapsing are setting an ```overflow``` property on parent element, and using ```::after``` pseudo-element.

*See also: [All About Floats](https://css-tricks.com/all-about-floats)*
