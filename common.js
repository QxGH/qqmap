// var audioUrl = 'https://cdn.xingchen.cn/f64b2319-a8a4-4d10-849c-fad4d6f9c678/Town_of_Windmill.mp3'
var audioUrl = 'https://lz-tx.oss-cn-hangzhou.aliyuncs.com/wxapp/liangzhu_map/music/99907.mp3'
var audioEl = document.getElementById('audioPlayer')

function stopPropagation(e) {
  window.event.stopPropagation();
}

/**
 * audio
 */
function audioPlayHandle() {
  hideMarkerInfoWindow()
  let audioEl = document.getElementById('audioPlayer')
  let audioSrc = $('#audioPlayer').src
  if (audioSrc && audioEl.paused) {
    audioPlay()
  } else {
    $('#audioPlayer').attr('src', audioUrl);
    audioEl.addEventListener("canplay", function () {
      audioPlay()
    });
  }
}

function audioPauseHandle() {
  audioEl.pause()
  audioEl.removeEventListener("canplay", function () {
    audioPlay()
  });
}

function audioStop() {
  audioPauseHandle();
  $('#audioPlayer').attr('src', '');
}

function audioPlay() {
  audioEl.play()
}

$(function () {
  // wx.config({
  //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  //   appId: '', // 必填，公众号的唯一标识
  //   timestamp: '', // 必填，生成签名的时间戳
  //   nonceStr: '', // 必填，生成签名的随机串
  //   signature: '',// 必填，签名，见附录1
  //   jsApiList: [] // 必填，需要使用的JS接口列表，所有JS接口列表 例如:previewImage图片预览，openLocation 定位等
  // });
  // wx.ready(function () {
  //   // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
  //   wx.hideMenuItems({
  //     menuList: ['menuItem:favorite', 'menuItem:share:facebook',
  //       'menuItem:copyUrl', 'menuItem:readMode',
  //       'menuItem:openWithQQBrowser',
  //       'menuItem:openWithSafari', 'menuItem:share:email']
  //     // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
  //   });
  // });
})