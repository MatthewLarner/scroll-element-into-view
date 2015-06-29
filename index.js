var targetElement,
    animationId;

function getTargetScrollLocation(target){
    var targetPosition = target.getBoundingClientRect(),
    parentPosition,
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

function scrollToElement(element, time, easingCurve){
    var location = element.getBoundingClientRect(),
        startTime = Date.now(),
        endTime = Date.now() + time;
        time = time || 750;

    targetElement = element;

    function run(){
        if(element !== targetElement) {
            cancelAnimationFrame(animationId);
            element = targetElement;
            endTime = Date.now() + time;
            location = getTargetScrollLocation(element);
        }

        var currentTime = Date.now(),
                curvePosition = (time - (endTime - currentTime)) / time;

        var timeValue = 1 / time * (now - startTime),
            value = easingCurve(curvePosition);

            document.body.scrollLeft = location.x - (location.differenceX - location.differenceX * value);
            document.body.scrollTop = location.y - (location.differenceY - location.differenceY * value);

        if(timeValue < 1){
            animationId = requestAnimationFrame(run);
        }
    }

    run();
}

module.exports = scrollToElement