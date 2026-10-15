# Material Design Icons

The site uses [Astro Icon](https://www.astroicon.dev/) with the locally installed
`@iconify-json/mdi` collection. Browse names in the
[Material Design Icons catalogue](https://pictogrammers.com/library/mdi/), then
prefix the name with `mdi:` (for example, `mdi:battery`).

Icons render as SVG during the static build. Visitors do not download the full
icon collection or need JavaScript to display them.

## Astro components

Import `Icon` in the component's frontmatter:

```astro
---
import { Icon } from 'astro-icon/components';
---

<Icon name="mdi:battery" aria-hidden="true" /> Battery Notes
```

## Blog and portfolio content

Use an `.mdx` file to import components. Blog and portfolio collections both
accept `.md` and `.mdx`. Rename an existing file rather than keeping both versions.
Keep its existing YAML frontmatter, then add the import after the closing `---`:

```mdx
---
title: 'Battery Notes'
description: ''
category: 'ha-integrations'
---

import { Icon } from 'astro-icon/components';

<Icon name="mdi:battery" aria-hidden="true" /> Track battery replacements.
```

Plain `.md` files continue to work for content without components. Blog entries
also require `pubDate` in their frontmatter.

## Size, colour, and accessibility

Icons default to `1em`, inherit the surrounding text colour, and align with text
using the global `[data-icon]` style. Set `size` to override their dimensions:

```astro
<Icon name="mdi:home-assistant" size={32} aria-hidden="true" />
<Icon name="mdi:battery-alert" style="color: #b45309" title="Low battery" role="img" />
```

Use `aria-hidden="true"` when nearby text already explains the icon. For an icon
that conveys meaning on its own, supply a descriptive `title` and `role="img"`.
For an icon-only link or button, label the link or button itself:

```astro
<a href="https://github.com/andrew-codechimp" aria-label="GitHub profile">
  <Icon name="mdi:github" aria-hidden="true" />
</a>
```

See the [Astro Icon component reference](https://www.astroicon.dev/guides/components/)
for additional SVG attributes and options.
