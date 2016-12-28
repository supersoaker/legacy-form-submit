// IE 8 without jQuery
(function (w, d) {

    var addListener = function (el, event, handler) {
        if (el.addEventListener) {
            el.addEventListener(event, handler, false);
        } else {
            el.attachEvent('on' + event, handler);
        }
    };

    var parseJson = function (json) {
        if(w.JSON) {
            return JSON.parse(json);
        } else
        if (json.trim().lastIndexOf('{', 0) === 0) {
            return eval('(' + json + ')');
        } else {
            throw new Error();
        }
    };

    window.submitFormIntoFrame = function (formSelector, url, handlerCb) {
        /** @var HTMLFormElement form */
        var form = d.querySelectorAll(formSelector)[0];

        var iFrame = d.createElement('IFRAME');

        var id = 'temporary-iframe-' + +new Date();

        var apiOrigin = url.match(/^.+\:\/\/[^\/]+/)[0];

        form.target = id;
        form.method = 'post';
        form.enctype = 'multipart/form-data';
        form.action = url;

        // Handle all postMessages
        addListener(w, 'message', function (e) {
            if (e.origin === apiOrigin &&
                e.source == iFrame.contentWindow
            ) {
                try {
                    handlerCb(parseJson(e.data));
                } catch (e) {
                    console.error('No Valid JSON from ' + url);
                    console.error(e);
                    handlerCb({
                        status: 'failure',
                        message: 'Server error.'
                    });
                }
                iFrame.parentNode.removeChild(iFrame);
            }
        });

        addListener(form, 'submit', function () {
            iFrame.name = id;
            iFrame.style.display = 'none';
            d.body.appendChild(iFrame);
        });
    };
})(window, document);
