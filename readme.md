[![Version 0.5b](https://img.shields.io/badge/version-0.5b-brightgreen.svg)](https://github.com/chimericdream/jquery-vertical-timeline)
[![GitHub issues](https://img.shields.io/github/issues/chimericdream/jquery-vertical-timeline.svg)](https://github.com/chimericdream/jquery-vertical-timeline/issues)
[![jQuery 1.6.4](https://img.shields.io/badge/jQuery-1.6.4-red.svg)](https://jquery.com/)

### jQuery Vertical Timelines

This plugin turns ordinary definition lists into smooth, interactive, vertical timelines.

#### Usage Instructions

Create your timeline using a standard `<dl>`, with the dates stored in the `<dt>` tags and any content associated with them stored in the following `<dd>` tag.

Example:
```html
<dl>
    <dt>1589-1591</dt>
    <dd><em>The Two Gentlemen of Verona</em></dd>
    <dt>1590-1594</dt>
    <dd><em>The Taming of the Shrew</em></dd>
    <dt>1590-1591</dt>
    <dd><em>Henry VI, Part 2</em></dd>
    <dt>1590-1591</dt>
    <dd><em>Henry VI, Part 3</em></dd>
    ...
</dl>
```

Next, simply initialize the timeline by calling the plugin. This will add style and functionality to the timeline.

```javascript
$('dl').verticalTimeline();
```

#### Demo

The demo uses the [timeline of plays by Shakespeare](https://jsfiddle.net/f8vq2x8f/) as described on Wikipedia.

#### Change Log

Version 0.5b (2011/10/21); Initial release
    Basic styling included
    Some items configurable