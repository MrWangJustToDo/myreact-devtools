/* eslint-disable @typescript-eslint/no-require-imports */
let varId = 0;

export const getValidGlobalVarName = () => {
  let varName = `$my-react-var-${varId++}`;

  while (globalThis[varName]) {
    varName = `$my-react-var-${varId++}`;
  }

  return varName;
};

export const loadScript = (url: string) => {
  if (typeof window !== "undefined") {
    return new Promise<void>((resolve, reject) => {
      if (typeof document === "undefined") {
        reject(new Error("[@my-react-devtool/hook] document not found, current environment not support"));

        return;
      }

      const script = document.createElement("script");

      script.src = url;

      script.onload = () => resolve();

      script.onerror = reject;

      document.body.appendChild(script);
    });
  } else {
    return Promise.reject(new Error("[@my-react-devtool/hook] current environment not support"));
  }
};

export const loadIframe = (url: string, token: string) => {
  return new Promise<HTMLIFrameElement>((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("[@my-react-devtool/hook] document not found, current environment not support"));

      return;
    }

    const exist = document.getElementById(`my-react-devtool-bridge-${token}`);

    if (exist) {
      resolve(exist as HTMLIFrameElement);

      return;
    }

    const iframe = document.createElement("iframe");

    iframe.src = url;

    iframe.classList.add("my-react-devtool-bridge");

    iframe.id = `my-react-devtool-bridge-${token}`;

    iframe.style.display = "none";

    iframe.onload = () => resolve(iframe);

    iframe.onerror = reject;

    document.body.appendChild(iframe);
  });
};
