console.log("Hello world! ~by nextjs-chrome-extension");

const script = document.createElement('script')

script.src = chrome.runtime.getURL('bundle/hook.js')

script.onload = () => {
  script.remove()
}

;(document.head || document.documentElement).appendChild(script)
