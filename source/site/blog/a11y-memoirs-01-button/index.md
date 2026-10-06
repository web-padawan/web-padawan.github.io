---
title: A11y Memoirs, episode 1. The Story of Vaadin Button
description: How Vaadin Button evolved from wrapping a native button to an accessible web component, and the subtle NVDA issues we fixed along the way.
date: 2026-10-06
series: A11y Memoirs
cover: /blog/a11y-memoirs-01-button/cover.png
---

Recently, GitHub added highlighting for [accessibility statements](https://github.blog/changelog/2026-10-01-accessibility-statements-highlighted-on-repository-overview/) on the repository overview page. While adding [`ACCESSIBILITY.md`](https://github.com/vaadin/web-components/blob/main/ACCESSIBILITY.md) for Vaadin components, I realized that there's so much more than just technical facts. I've been working at Vaadin for many years, and accessibility support has been a recurring topic brought up by both my colleagues and our customers. And I do have a few stories to tell about it!

Today, I'm excited to share the first episode of my A11y Memoirs — a series of short blog posts covering challenges that we faced at Vaadin while developing a set of high-quality web components and making them accessible. For me, this journey started even before I joined the company, back when I was an external contributor.

One of the first components I ever [contributed to](https://github.com/vaadin/vaadin-button/pull/29), more than 9 years ago, was `<vaadin-button>`. It was a completely different time, both for the emerging web components ecosystem with its early adopters and for the browser landscape in general. So I'll take a step back and start with some historical background.

## Why not a plain old `<button>`?

Initial versions of Vaadin Elements, like Combo Box, Date Picker and Upload, were inspired by Material Design and used the `<paper-button>` Polymer element under the hood. This changed in 2017: while we were establishing a solid foundation for Vaadin Platform 10, our component set rapidly evolved to cover all basic needs.

Back then, styling components was a challenge due to `::part()` being just an early proposal and custom CSS properties not being able to cover all cases. Our team solved this by creating [ThemableMixin](https://github.com/vaadin/vaadin-themable-mixin) to inject CSS into components' shadow roots. Our two original Vaadin themes, Lumo and Material, were built on top of it.

Apart from styling consistency, there were other reasons for not using a `<button>`. Some of them were again related to browser limitations: Vaadin 10 supported Safari 9 and IE11, where CSS flexbox had a few known issues. In particular, [Flexbug #9](https://github.com/philipwalton/flexbugs#flexbug-9): it wasn't possible to make native `<button>` a flex container.

[Vaadin Button](https://vaadin.com/docs/latest/components/button) supports `prefix` and `suffix` slots for placing icons and other supplementary content, as well as several shadow DOM parts, [state attributes](https://cdn.vaadin.com/vaadin-web-components/25.3.0/elements/vaadin-button/#styling) and [variants](https://vaadin.com/docs/latest/components/button/styling). So the web component is here to stay, and for good reason. That said, Vaadin provides a Java API for the native `<button>` element, too.

## Wrapping a button

The original version of `vaadin-button` wrapped an internal clickable, absolutely positioned native `<button>`. This was a fairly common technique back in the day, when the [Polymer library](https://polymer-library.polymer-project.org/) was used to render templates in shadow DOM. There was also a shared [ControlStateMixin](https://github.com/vaadin/vaadin-control-state-mixin) used to handle focus, since [`delegatesFocus`](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus) and the [`:focus-visible`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible) pseudo-class were not yet implemented in browsers.

By the way, whenever I see a new web component library or design system, one of the first things I check is how they implemented their button component. And yes, some libraries still do wrap a `<button>` in different ways. It's not necessarily wrong now that shadow focus delegation is a thing. Years ago, it didn't work out for us.

As part of significant accessibility improvements in Vaadin 22, we re-implemented the button component to use `role="button"` on the host. Later on, its logic was moved to `ButtonMixin`, which is shared with a few other similar components. Our `vaadin-details` uses it internally, too — and I'll cover it in a dedicated A11y Memoirs episode!

## Tooltips and enabled state

If you inspect the DOM structure of `vaadin-button` in DevTools (another thing I regularly do when exploring new component libraries), you'll notice that it has a `tooltip` slot. This is a common API used in Vaadin for handling [tooltips](https://vaadin.com/docs/latest/components/tooltip) attached to different components, which is especially relevant for icon-only buttons.

While the tooltip itself was added in Vaadin 23.3, it shared a limitation with the native `title` attribute: it wasn't shown for [disabled](https://github.com/vaadin/flow-components/issues/4393) buttons. This was recognized as an accessibility problem and moved to a separate [enhancement ticket](https://github.com/vaadin/web-components/issues/4585). Making disabled buttons accessible was a highly requested feature from our customers, and it was eventually implemented by my colleagues in the Design System team.

In Vaadin 26, disabled buttons will be focusable and hoverable by default, which makes tooltips work and allows application authors to provide an explanation why a button is disabled. You can already enable this behavior in Vaadin 25 with the `window.Vaadin.featureFlags.accessibleDisabledButtons` [feature flag](https://vaadin.com/docs/latest/components/button#focus-hover).

## Other caveats

There are a few more a11y memories to share about `vaadin-button`. They illustrate the fact that proper accessibility isn't something you can just fix once: it has to be a continuous commitment from the team and requires attention to detail. This is what I appreciate the most about Vaadin's approach to UX and quality.

The first one is about CSS. Vaadin components use a [baseline alignment](https://vaadin.github.io/web-components/baseline.html) approach that relies on a `::before` pseudo-element with extra whitespace. This can cause unexpected announcements in some screen readers, such as NVDA. We fixed this by setting empty alternative text: `content: '\2003' / ''` — check out [Hiding content in CSS pseudo elements from screen readers](https://www.sitelint.com/blog/hide-content-in-css-pseudo-elements-from-screen-readers) for an explanation of this technique.

Another issue causing incorrect announcements involved the internal elements wrapping the `prefix` and `suffix` slots that I mentioned earlier. To mitigate this, we decided to set `aria-hidden` on [these elements](https://github.com/vaadin/web-components/pull/5049). We expect application developers to make sure nothing essential is lost, or provide a meaningful [accessible label](https://vaadin.com/docs/latest/components/button#aria-labels).

Finally, an issue discovered and fixed quite recently involved the `.vaadin-button-container` element, which again affected NVDA: in browse mode, key presses were not passed to the page. We [solved](https://github.com/vaadin/web-components/pull/12525) this in the latest releases of Vaadin 24 and 25 by setting `role="presentation"`. Lesson learned: nested DOM elements in button-like components should be avoided, or handled very carefully.

## Wrapping up

That's it for the first episode of A11y Memoirs, which turned out to be a bit longer than expected. I'd like to use this opportunity to share my passion for a11y and thank all my colleagues involved in the long process of designing, building and testing inclusive and accessible Vaadin components. Stay tuned for more!
