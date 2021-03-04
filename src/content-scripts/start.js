// 注入到当前页面的js文件 ,

// window.location.href ="/studyApp/setViewTime?_enctoken=acc331d0aa08defa602ccbf01d20270f&xkid=3114722"
browser.runtime.onMessage.addListener(request => {
  console.log('request', request);
  // window.location.href = request.videoUrl;
  switch (request.type) {
    /**
     * 读取当前页所有的 tab页
     */
    case 3:
      const videoArray = document.getElementsByClassName('leveltwo');
      let max = 0;
      const arr = Array.from(videoArray).map(i => {
        const input = i.innerHTML.match(/value="(.+?)"/);
        max = Math.max(max, Number(input?input[1] : ""))
        if (input) {
          const a = i.children[0].children[2].children[0];
          // a.target = "_blank";  // 是否在当前页打开
          return {
            tabId: request.tabId,
            // tabId: 3,
            a: a,
            max:Number(input[1]),
          };
        }
      }).filter(i => i!==undefined&&i.max===max);
      console.log('max', max)
      console.log('arr', arr)

      return openTab(request, arr);

    case 2:
      console.log('request.type', request.type);

      const videoBtn = document.getElementById('iframe').contentWindow.document.getElementsByClassName('ans-attach-online ans-insertvideo-online')[0]
        .contentWindow.document.getElementsByClassName('vjs-big-play-button')[0];
      const video = document.getElementById('iframe').contentWindow.document.getElementsByClassName('ans-attach-online ans-insertvideo-online')[0]
        .contentWindow.document.getElementById('video_html5_api');
      console.log('video', video)
      video.preload = true;
      video.pause = () => {
      };
      console.log('video.pause', video.pause);

      videoBtn.click();
      video.pause = () => {
      };


      const progress = document.getElementById('iframe').contentWindow.document.getElementsByClassName('ans-attach-online ans-insertvideo-online')[0]
        .contentWindow.document.getElementsByClassName('vjs-play-progress vjs-slider-bar')[0];

      let currentTime = 0.000;
      const handler = setInterval(() => {
        console.log(Number.parseFloat(progress.style.width));

        if (currentTime === Number.parseFloat(progress.style.width)) {
          const videoBtn = document.getElementById('iframe').contentWindow.document.getElementsByClassName('ans-attach-online ans-insertvideo-online')[0]
            .contentWindow.document.getElementsByClassName('vjs-big-play-button')[0];
          const video = document.getElementById('iframe').contentWindow.document.getElementsByClassName('ans-attach-online ans-insertvideo-online')[0]
            .contentWindow.document.getElementById('video_html5_api');
          console.log('video', video)
          video.preload = true;
          video.pause = () => {
          };
          console.log('video.pause', video.pause);

          videoBtn.click();
          video.pause = () => {
          };
        }
        currentTime = Number.parseFloat(progress.style.width);

        if (Number.parseFloat(progress.style.width) >= 100) {
          window.history.back();
          clearInterval(handler);
        }
      }, 1000)


      //监听无效
      // video.addEventListener('ended',()=>{
      //   console.log("播放结束");
      //   // window.opener=null;
      //   // window.open('','_self');
      //   // window.close();
      //   window.history.back()
      //   return Promise.resolve({type: request.type,});
      // });

      break;
    default:
      break;
  }

});

// 打开需要学习的视屏文件
function openTab (request, arr) {
  // for (let i = 0; i < arr.length; i++) {
  //     arr[i].a.click();
  // }
  arr[0].a.click(); // 只打开一个资源

  return Promise.resolve({type: request.type,});

}




