# scroll-element-into-view

Scroll an element into view with animation time and custom easing functions

## Usage

```javascript
var scrollElementIntoView = require('scroll-element-into-view');
scrollElementIntoView(element);
```

## Timing and easing functions

You can pass in an animation time and an easing function that takes a value between 0 and 1 representing a percentage of the animation time left and should return a transformed value between 0 and 1.

```javascript
scrollElementIntoView(element, 1500, function(value){
    return Math.pow(value, 4);
})
```

Defaults are set to 750ms and a linear easing function.
