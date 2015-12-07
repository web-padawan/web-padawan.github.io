---
layout: post
title:  "Front-end Job Interview: CSS questions"
date:   2015-12-07 14:21:00
categories: juniorship
---
This article is my attempt to cover some of the [Frontend Dev Interview questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions).
Its main purpose is to understand certain things and to be able to explain them later: it's likely that I'll have such an opportunity in the short term.
My other goals are to strengthen knowledge of Markdown syntax, and to improve my level of English proficiency.
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
+ Finally, there is **a third option** - to use a combination of both methods, such as you can see [here](https://github.com/CSSSR/csssr-project-template/blob/master/app/styles/base/optimize.styl).

I have already used both [reset.css](https://github.com/shannonmoeller/reset-css) and [normalize.css](https://github.com/JohnAlbin/normalize-scss) in my projects.
They both can be installed as bower packages and imported via SCSS.
But, if I had to start a new project now, I'd rather choose the third option, since it seems to be reasonable.
In the end, it all depends on the project requirements.

*See also: [CSS: reset or normalize?](https://the-pastry-box-project.net/oli-studholme/2013-june-3)*

#### 3. Describe Floats and how they work.

+ Floated elements are sent as far to the right or left (depending on which value is applied) of the parent element.
+ Block level elements, unless they are floated (or positioned) themselves, act as if the floated element is not there.
+ Inline elements (e. g., the text inside the paragraph) flow around the floated element.
+ Floated elements can affect their parent element: when it only contains floated elements, its height would collapse to nothing.
+ The most common methods to prevent collapsing are setting an ```overflow``` property on parent element, and using ```::after``` pseudo-element.

*See also: [All About Floats](https://css-tricks.com/all-about-floats)*
