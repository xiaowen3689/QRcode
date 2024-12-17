document.addEventListener('DOMContentLoaded', async () => {
  // 添加加载状态
  document.body.classList.add('loading');

  // 获取当前标签页URL和标题
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url;
  const title = tab.title;

  // 更新网站名称
  const siteNameEl = document.getElementById('siteName');
  siteNameEl.textContent = title;
  // 添加完整标题提示
  siteNameEl.title = title;

  // 设置favicon
  const favicon = document.getElementById('favicon');
  // 添加加载错误处理
  favicon.onerror = () => {
    favicon.src = 'images/default-favicon.png';
  };
  favicon.src = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;

  // 生成二维码
  const qr = new QRCode(document.getElementById('qrcode'), {
    text: url,
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  // 移除加载状态
  document.body.classList.remove('loading');
}); 