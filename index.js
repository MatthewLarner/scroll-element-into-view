var targetElement,
    animationId;

function getTargetScrollLocation(target){
    var targetPosition = target.getBoundingClientRect(),
    x,
    y,
    differenceX,
    differenceY;

    x = targetPosition.left + window.scrollX - window.innerWidth / 2 + Math.min(targetPosition.width, window.innerWidth) / 2;
    y = targetPosition.top + window.scrollY - window.innerHeight / 2 + Math.min(targetPosition.height, window.innerHeight) / 2;
    x = Math.max(Math.min(x, document.body.clientWidth - window.innerWidth / 2), 0);
    y = Math.max(Math.min(y, document.body.clientHeight - window.innerHeight / 2), 0);
    differenceX = x - window.scrollX;
    differenceY = y - window.scrollY;

    return {
        x: x,
        y: y,
        differenceX: differenceX,
        differenceY: differenceY
    };
}

function scrollElementIntoView(element, animationTime, easingFunction){
    if (!element || targetElement === element) {
        return;
    }

    targetElement = element;
    animationTime = animationTime || 750;
    easingFunction = easingFunction || function linearEasing(curvePosition){
        return curvePosition;
    };

    var location = getTargetScrollLocation(element),
        endTime = Date.now() + animationTime;

    function run(){
        if(element !== targetElement) {
            cancelAnimationFrame(animationId);
            element = targetElement;
            endTime = Date.now() + animationTime;
            location = getTargetScrollLocation(element);
        }

        var currentTime = Date.now(),
            curvePosition = (animationTime - (endTime - currentTime)) / animationTime;

        var value = easingFunction(curvePosition);

        document.body.scrollLeft = location.x - (location.differenceX - location.differenceX * value);
        document.body.scrollTop = location.y - (location.differenceY - location.differenceY * value);

        if(curvePosition < 1){
            animationId = requestAnimationFrame(run);
        }
    }

    run();
}

module.exports = scrollElementIntoView;