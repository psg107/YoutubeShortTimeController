
(function() {
    const CUSTOM_METER_ID = 'custom-progress-bar';

    waitElement('#shorts-player > div.html5-video-container > video').then(() => {

        //init
        const videoContainer = document.querySelector('#shorts-player > div.html5-video-container');
        const video = document.querySelector("#shorts-player > div.html5-video-container > video");
        
        //remove
        var progressBar = document.querySelector(`#${CUSTOM_METER_ID}`);
        if (progressBar != null) {
            progressBar.remove();
        }

        //create new progressBar
        let controller = document.createElement('meter');
        controller.id = CUSTOM_METER_ID;
        controller.style.width = '100%';
        controller.style.height = '20px';
        controller.style.position = 'absolute';
        controller.style.bottom = '-5px';
        controller.style.cursor = 'pointer'
        controller.min = 0;

        videoContainer.style.height = '100%';
        videoContainer.appendChild(controller);

        //events
        video.addEventListener('timeupdate', (e) => {
            var duration = video.duration;
            var currentTime = video.currentTime;

            controller.max = isNaN(duration) ? 0 : duration;
            controller.value = isNaN(duration) ? 0 : currentTime;
        });
        controller.addEventListener('mouseup', (e) => {
            var rect = e.target.getBoundingClientRect();

            var x = e.clientX - rect.left;
            var width = rect.width;

            var percent = x / width;
            var maxTime = controller.max;

            var time = maxTime * percent;

            video.currentTime = time;
        });
        controller.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
})();

/**
 * 
 * @param {*} selector 
 * @returns 
 */
function waitElement(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve();
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve();
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}