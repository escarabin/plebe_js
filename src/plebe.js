/**
 * Created by Emmanuel SCARABIN on 28/02/16.
 */

$.fn.plebe = function() {
    var world = $(this);
    var deepness = 2;

    // Get world dimensions via [data-width] & [data-height] or get window dimensions if attr is set to 100%
    var worldHeight = world.attr('data-height').replace('100%', window.innerHeight);
    var worldWidth = world.attr('data-width').replace('100%', window.innerWidth);

    var particleTemplates = world.find('.plb-particle');
    var layersAmount = world.attr('data-layers-amount');
    var particlesPerLayer = world.attr('data-particles-per-layer');
    var blurMaxIntensity = world.attr('data-max-blur-intensity');
    var opacityVariation = world.attr('data-opacity-variation');
    var sizeVariation = world.attr('data-size-variation');
    var rotationVariation = world.attr('data-rotation-variation');
    var startingLevel = Math.floor((layersAmount / 2) * -1);
    var animatedParticles = world.attr('data-animated-particles');

    // Get world offset coordinates
    var worldOffset = $(this).parent().offset();

    // Store center's coordinates
    var worldCenterX = worldOffset.left + worldWidth / 2;
    var worldCenterY = worldOffset.top + worldHeight / 2;

    // Set world CSS dimensions
    world.css('width', worldWidth).css('height', worldHeight);

    // Create layers regarding (layersAmount) var
    for (var l = startingLevel; l < (layersAmount / 2); l++) {
        // Create the layer div with custom id
        var layerDiv = $("<div>", {class: 'plb-layer', 'data-layer-position': l});

        // Apply blur to layer if (blurMaxIntensity) is set
        if (blurMaxIntensity != 0) {
            layerDiv.css({
                '-webkit-filter': 'blur(' + Math.abs(blurMaxIntensity * l) + 'px)',
                '-moz-filter': 'blur(' + Math.abs(blurMaxIntensity * l) + 'px)',
                '-o-filter': 'blur(' + Math.abs(blurMaxIntensity * l) + 'px)',
                '-ms-filter': 'blur(' + Math.abs(blurMaxIntensity * l) + 'px)',
                'filter': 'blur(' + Math.abs(blurMaxIntensity * l) + 'px)'
            });
        }

        // Apply opacity css attribute if (opacityVariation) is set
        if (opacityVariation != 0) {
            layerDiv.css('opacity', 1 + (l * (opacityVariation / (layersAmount / 2))));
        }

        world.append(layerDiv);

        // Duplicate particles inside current layer regarding the (particlesPerLayer) var
        for (var p = 0; p < particlesPerLayer; p++) {
            // Select a random particle template to append inside layer
            var particleTemplateId = Math.floor(Math.random() * particleTemplates.length);
            var particle = $(particleTemplates[particleTemplateId]);

            // Create random position coordinates
            var leftOffset = Math.floor(Math.random() * worldWidth);
            var topOffset = Math.floor(Math.random() * worldHeight);

            var newParticle = particle.clone().css('left', leftOffset).css('top', topOffset);
            var particleTransformCSSAttr = '';

            // Apply transform rotation css attribute if (rotationVariation) is set
            if (rotationVariation != 0) {
                var randomRotation = Math.random() * rotationVariation;
                particleTransformCSSAttr += 'rotate(' + (randomRotation * l) + 'deg)';
            }

            // Apply transform scale css attribute if (sizeVariation) is set
            if (sizeVariation != 0) {
                if (sizeVariation * l < 0) {
                    particleTransformCSSAttr += ' scale(' + 0.4 + ')';
                }
                else {
                    particleTransformCSSAttr += ' scale(' + (sizeVariation * l) + ')';
                }
            }

            // Apply CSS transformation to new particle
            newParticle.css({
                '-webkit-transform': particleTransformCSSAttr,
                '-moz-transform': particleTransformCSSAttr,
                '-o-transform': particleTransformCSSAttr,
                '-ms-transform': particleTransformCSSAttr,
                'transform': particleTransformCSSAttr
            });

            if (animatedParticles == "true") {
                // Apply animation delay randomness to particles
                newParticle.find('img').addClass('animated').css({
                    '-webkit-animation-delay': Math.random() * 5 + 's',
                    '-moz-animation-delay': Math.random() * 5 + 's',
                    '-o-animation-delay': Math.random() * 5 + 's',
                    '-ms-animation-delay': Math.random() * 5 + 's',
                    'animation-delay': Math.random() * 5 + 's'
                });
            }

            newParticle.appendTo(layerDiv);
        }
    }

    // Remove initial particle templates
    particleTemplates.remove();

    // Handle mouse moves inside the world
    world.mousemove(function(e) {
        var mouseX = e.pageX - worldCenterX;
        var mouseY = e.pageY - worldCenterY;

        // Loop through different world's layers
        for (var l = startingLevel; l < layersAmount / 2; l++) {
            var layer = $('.plb-layer[data-layer-position=' + l + ']');
            var movementStrength = (l / layersAmount) * (deepness + 1);

            layer.css('top', mouseY * movementStrength).css('left', mouseX * movementStrength);
        }
    });

    // Handle window resizing
    $(window).resize(function() {

    });
};
