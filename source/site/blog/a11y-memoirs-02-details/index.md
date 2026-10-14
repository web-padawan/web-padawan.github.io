---
title: A11y Memoirs, episode 2. The Devil is in the Details
description: The story of Vaadin Details and Accordion, from shadow DOM roots and an external accessibility audit to one line of code that fixed an NVDA issue.
date: 2026-10-14
series: A11y Memoirs
cover: /blog/a11y-memoirs-02-details/cover.png
---

Welcome back to A11y Memoirs! This series is based on my personal experience of building accessible components for the Vaadin design system. If you have never heard of Vaadin, I recommend our [web components](https://github.com/vaadin/web-components) library on GitHub as a starting point. Recently, we added an accessibility statement to it — do check it out!

In the [previous episode](https://iamkulykov.com/blog/a11y-memoirs-01-button/), I shared the story of `vaadin-button`, showcasing how a seemingly trivial component can be tricky in terms of accessibility. In today's article, you'll learn how one line of code can introduce (or fix) a confusing screen reader issue, and why it's important to pay attention to subtle details.

Yes, pun intended: this article covers the `vaadin-details` custom element, its long misadventures and its relationship to `vaadin-accordion`. As the creator of both, I take responsibility for some unintended accessibility caveats. On the positive side, this story illustrates our unwavering commitment to getting accessibility right.

## Historical background

In early 2019, our team put significant effort into delivering a whole batch of new components in Vaadin 13 major release. Back in the day, we didn't use feature flags and shipped new features in regular major releases, polishing them over time based on feedback. This also meant that breaking changes were almost inevitable.

For many years, we used the [Polymer](https://polymer-library.polymer-project.org/) library to build custom elements and followed its philosophy. In particular, HTML templates of our components were rendered in shadow DOM, with its well-known [accessibility limitations](https://alice.pages.igalia.com/blog/how-shadow-dom-and-accessibility-are-in-conflict/) among other implications. Over time, we learned how to get around them — more on that later.

The original `vaadin-details` rendered [everything](https://github.com/vaadin/vaadin-details/blob/fe64c58b3c27446e93bd750c581647ae665e1dc8/src/vaadin-details.html#L37-L56) in its shadow DOM: an element with `role="button"` and `tabindex`, wrapped in a parent with `role="heading"`. As for accordion, the `vaadin-accordion-panel` simply extended `vaadin-details`, inheriting its template, styles and ARIA semantics, which were not entirely correct.

There were good parts, too (pun intended again). Both components were designed with a forward-thinking mindset and tailored for the upcoming [CSS Shadow Parts](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Shadow_parts). Exposing summary, toggle and content elements using the `part` attribute made them stylable with `::part()` once it [finally landed](https://dev.to/webpadawan/css-shadow-parts-are-coming-mi5) in evergreen browsers.

{% codepen https://codepen.io/web-padawan/pen/yLyPKJP default-tab=result,css %}

Later in 2019, I worked on a set of prototypes based on the [Lit](https://lit.dev) library, which was gaining traction as a Polymer replacement, and explored options for building the [next generation of Vaadin web components](https://dev.to/webpadawan/the-next-generation-of-vaadin-web-components-34k6). Both `vaadin-details` and `vaadin-accordion` elements were part of this experiment, and we even published a few alpha releases.

The Lit migration eventually took 5 years and deserves its own story. But the early prototypes were not lost: I showcased them as `expansion-panel` and `fancy-accordion` in my [API Viewer](https://dev.to/webpadawan/api-viewer-document-your-web-components-api-p8j) project. I even received an email praising both as "actually pretty nice" and asking to use them under a permissive license.

## Vaadin accessibility audit

Back to the topic of accessibility: as I mentioned in the previous episode, it has been repeatedly brought up by my colleagues at Vaadin — most notably, our designers. In 2020, we arranged an accessibility kick-off meeting to outline the problems we aimed to solve and to identify product needs, opportunities and pain points.

What we needed the most was manual testing: the only way to identify the vast majority of accessibility issues in existing components. While we could perform this ourselves and had some internal expertise regarding the WCAG and WAI-ARIA standards, we lacked experience with the most popular assistive technologies.

Soon it became clear that an external review would guide us in the right direction, so we decided to conduct a third-party audit. I then reached out to [Vadim Makeev](https://pepelsbey.dev), whose Web Standards podcast in Russian I had [joined](https://youtu.be/yAopxUNaoAs) earlier, and he recommended [TetraLogical](https://tetralogical.com) — a company that needs no introduction in the a11y community.

Our collaboration with TetraLogical turned out to be a great success. They filed detailed, thorough [issues](https://github.com/vaadin/web-components/issues?q=is%3Aissue+author%3ATetraLogicalHelpdesk), suggested specific fixes and reviewed our prototypes. This resulted in a major overhaul of our components' DOM structure and substantial a11y fixes that landed in Vaadin 22, which I will cover in the next A11y Memoirs episode.

## ARIA and DOM restructuring

At first, we focused on delivering a11y fixes to field components by moving interactive elements from shadow to light DOM, fixing focus handling and ID references. In contrast, details and accordion had relatively few problems — for example, keyboard navigation already worked well. That said, two issues still needed attention.

The [first one](https://github.com/vaadin/web-components/issues/152) only affected one combination: NVDA with Chrome. When toggling the details, the `aria-expanded` attribute was correctly updated, but the screen reader didn't announce the new state. The auditors suspected that the browser lost track of the focused element inside shadow DOM — keep this one in mind, I'll get back to it.

The [second one](https://github.com/vaadin/web-components/issues/90) was about heading levels: an element with `role="heading"` and no `aria-level` is announced as a level 2 heading. Placing `vaadin-details` under an `<h3>` would break the page heading structure. In fact, only `vaadin-accordion-panel` ever needed the heading element, whereas a standalone `vaadin-details` did not.

In Vaadin 24, I [re-implemented](https://github.com/vaadin/web-components/pull/5093) the structure of both components, introducing a separate `vaadin-details-summary` element that reused most of the button logic via `ButtonMixin`. The element with `role="heading"` was removed completely — see [Why `<details>` is Not an Accordion](https://daverupert.com/2019/12/why-details-is-not-an-accordion/) by Dave Rupert for more context.

As for `vaadin-accordion`, the same change decoupled `vaadin-accordion-panel` from `vaadin-details`, which also fixed a long-standing [issue](https://github.com/vaadin/web-components/issues/412) with details styles leaking to accordion panels. Now, `role="heading"` is set on the `vaadin-accordion-heading` element, and the panel content gets `role="region"` linked with `aria-labelledby`.

In the previous episode I mentioned that wrapping a `<button>` in shadow DOM is not necessarily wrong. And `vaadin-accordion-heading` does exactly that: it renders a `<button>` in its shadow DOM and uses [`delegatesFocus`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus) option supported in all major browsers, including Safari 15 (which is a minimal baseline for Vaadin 24). A heading must not be a button itself, so in this case wrapping is the right choice.

## The devil is in the details

Moving the summary to light DOM was expected to resolve screen reader issues. It did improve focus handling, but toggling still wasn't announced in NVDA browse mode. Bugs like this, which only affect a certain screen reader, can be hard to investigate. Indeed, the devil is in the details — and this time, quite literally.

In NVDA browse mode, pressing <kbd>Enter</kbd> doesn't send a key event to the page. Instead, NVDA finds the innermost accessible node at the virtual cursor and runs its default action. Our `vaadin-details-summary` sets `role="button"` on the host and wraps slotted text with `<div part="content">` in shadow DOM. When the cursor lands on that generic element, the action does nothing — so the details don't toggle.

Sounds familiar? Yes, it's exactly the same problem that we fixed for the internal `vaadin-button` container element in the previous episode. Once the root cause was clear, I realized that [the same fix](https://github.com/vaadin/web-components/pull/12971) with `role="presentation"` would resolve the `vaadin-details-summary` case as well. So in the latest Vaadin releases, NVDA, JAWS and VoiceOver all correctly announce the expanded and collapsed states.

The other issue, about `aria-level` in accordion panels, was also [fixed](https://github.com/vaadin/web-components/pull/12133) quite recently: we added a new `headingLevel` property to the `vaadin-accordion` element to make the level configurable. With that, both components are now screen reader friendly. There is another minor detail remaining, though — again related to shadow DOM.

Remember the `<button>` used by the accordion heading? Due to the shadow DOM boundary, it can't use `aria-controls` pointing to the panel. Luckily, this can be [fixed](https://github.com/vaadin/web-components/issues/13065) using [`ariaControlsElements`](https://developer.mozilla.org/en-US/docs/Web/API/Element/ariaControlsElements) property for attribute reflection, part of the [AOM](https://wicg.github.io/aom/aria-reflection-explainer.html). That said, screen reader support for `aria-controls` attribute itself is [quite limited](https://heydonworks.com/article/aria-controls-is-poop/).

## Wrapping up

That's it for the second episode of my A11y Memoirs. I hope you learned something from it — personally, I wish I had known all of this much earlier. Mastering accessibility truly requires continuous effort, and being fully committed is an important part of my career as an engineer. I will make sure to share more lessons learned next time!
