# plebe_js

> little experimentation of moving particles background in JS

## Usage

``` js
$('#my-plebe-world').plebe();
```

``` html
<div class="plb-world"
     id="my-plebe-world"
     data-layers-amount="7"
     data-width="100%"
     data-height="100%"
     data-particles-per-layer="4"
     data-max-blur-intensity="0"
     data-opacity-variation="0.9"
     data-size-variation="0.4"
     data-rotation-variation="360"
     data-animated-particles="true"
     data-follow-mouse="true">
        <div class="plb-particle">
                <img src="img/circle.svg"/>
        </div>
        <div class="plb-particle">
                <img src="img/polygon.svg"/>
        </div>
        <div class="plb-particle">
                <img src="img/rectangle.svg"/>
        </div>
</div>
```
