let ws = new WebSocket("wss://192.168.3.102"),
    imgChuncks = [],
    audioChuncks = [],
    img = null;
    //如何处理二进制数据，默认是Blob
    ws.binaryType = 'arraybuffer',
    ws.onmessage = function(evt) { 
        if(evt.data.byteLength === undefined) {
            //收到的base64图片
            imgChuncks.push(evt.data);
        }else{
            //收到的音频二进制pcm数据
            audioChuncks.push(new Float32Array(evt.data));
        }
        //缓存2帧的数据后开始播放
        if(!img && audioChuncks.length > 2){
            myplay();
        }
    };
    //创建播放音频视频函数
    function myplay(){
        //创建img标签来播放base64图片
        img = new Image();
        document.body.appendChild(img);
        //创建播放音频对象
        let    myBuffer = audioCtx.createBuffer(1, 2048, audioCtx.sampleRate),
               source = audioCtx.createBufferSource(),
               recorder = audioCtx.createScriptProcessor(2048, 1, 1);
           source.connect(recorder);
           recorder.connect(audioCtx.destination);
           recorder.onaudioprocess = function(ev){
               //修改img的src达到视频的效果
               img.src = imgChuncks.shift();
               //播放audioChuncks里面真正的二进制数据
            ev.outputBuffer.copyToChannel(audioChuncks.shift() || new Float32Array(2048), 0, 0);
        };
    }
    let video = document.querySelector('video'),
        start = document.querySelector('.start'),
        stop = document.querySelector('.stop'),
        canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
        interval = null,
        mediaDevices = null;
    //点击开始
    start.onclick = function(){
        //获取音频视频流数据
        mediaDevices = navigator.mediaDevices.getUserMedia({audio: true,video: { width: 320, height: 240 }});
        mediaDevices.then(stream => {
            //视频流转换到video标签播放
            video.srcObject = stream;
            video.play();
            //音频流转换到AudioNode做数据采集
            let source = audioCtx.createMediaStreamSource(stream);
            recorder = audioCtx.createScriptProcessor(2048, 1, 1);
            source.connect(recorder);
            recorder.connect(audioCtx.destination);
            recorder.onaudioprocess = function(ev){
                //采集单声道数据
                let inputBuffer = ev.inputBuffer.getChannelData(0);
                //将视频画面转换成base64发送
                ws.send(canvas.toDataURL('image/jpeg'));
                //发送音频pcm数据
                ws.send(inputBuffer.buffer);
            };
        });
    };
    video.onplay = function(){
        //将video绘制到canvas上
        interval = setInterval(function(){
            ctx.drawImage(video, 0, 0);
        },30);
    };