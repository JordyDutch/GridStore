# Build Grid Preview

This is the prompt I have used for the AI agent

```
Here are the detailed instructions on how to build your own grid preview for the grid templates.

I want you to build your own grid preview for the blank grid templates like "Artist Showcase, Photographer, etc...".
But not by loading an iframe of universaleverything.io. But by building your own visual grid system from the JSON file you have retrieved from IPFS. You can do this by using the function `decodeDataSourceWIthHash` from erc725.js on raw values like this one:  @templates/templates.ts:21-22

So you should fetch the JSON file of the grid data and then build your own UI according to the layout described by the JSON file. A grid layout JSON file that youn will retrieve will look like that. Use this as a base: @GridTemplate.jsonc

Basically the grid preview that you will create can have either 2 columns, 3 columns or 4 columns at most, defined by the property `gridColumns`. @GridTemplate.jsonc:5-6

The grid preview should basically look something like this inage in the UI:
@grid-layout-example.png
```
