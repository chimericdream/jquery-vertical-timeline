jQuery Vertical Timelines

This plugin turns ordinary definition lists into smooth, interactive, vertical timelines.

Description
Version: 0.5b
Author: Bill Parrott
Tested with jQuery: 1.6.4
Last Updated: 2011/10/21
Download Link: https://github.com/chimericdream/jquery-vertical-timeline

Usage Instructions
Create your timeline using a standard <dl>, with the dates stored in the <dt> tags and any content associated with them stored in the following <dd> tag.

Example:
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
                
Next, simply initialize the timeline by calling the plugin. This will add style and functionality to the timeline.
$('dl').verticalTimeline();
                
Demo
The included demo uses the timeline of Plays by Shakespeare as described on Wikipedia.

Change Log
Version 0.5b (2011/10/21); Initial release
    Basic styling included
    Some items configurable