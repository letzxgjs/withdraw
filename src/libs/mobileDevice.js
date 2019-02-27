function adapt(designWidth) {
  var d = window.document.createElement("div");
  d.style.width = "1rem";
  d.style.display = "none";
  var head = window.document.getElementsByTagName("head")[0];
  head.appendChild(d);
  var defaultFontSize = parseFloat(
    window.getComputedStyle(d, null).getPropertyValue("width")
  );
  return 16 / defaultFontSize;
}

function mobileDevice() {
  let metaEl = document.querySelector('meta[name="viewport"]'); // 获取 meta
  // console.log(document.body.clientWidth);
  let screenWidth = document.body.clientWidth; // 计算屏幕的宽度
  let screenHeight = window.screen.height;
  let docEl = document.documentElement; // 文档元素
  let dpr, rem, scale, width;
  let userAgent = window.navigator.userAgent.toLowerCase(); // 浏览器标识

  // alert(adapt(screenWidth))
  // 其他浏览器正常显示效果
  dpr = 1;
  rem = ((screenWidth * dpr * 40) / 750) * adapt(screenWidth);
  scale = 1;
  width = screenWidth;

  // 显示当前缩放倍率
  docEl.setAttribute("data-dpr", dpr);
  
  // 设置根节点字体大小
  docEl.style.fontSize = rem + "px";

  // 设置全局变量
  window.dpr = dpr;
  window.rem = rem;
  window.remHeight = screenHeight / rem;
}

export default mobileDevice;
