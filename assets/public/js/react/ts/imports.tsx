// @ts-nocheck
// import * as ReactPDF from "https://esm.sh/react-pdf@9.1.0";
import { default as React } from "https://esm.sh/react@18.3.1";
export * as ReactQrScanner from "https://esm.sh/@yudiel/react-qr-scanner@2.0.8";
export { default as clsx } from "https://esm.sh/clsx@2.1.1";
export { default as ReactDOM } from "https://esm.sh/react-dom@18.3.1/client";
export { default as ReactDOMServer } from "https://esm.sh/react-dom@18.3.1/server";
export { default as Swal } from "https://esm.sh/sweetalert2@11.12.4";

// ReactPDF.pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs',
//   import.meta.url,
// ).toString()

function generateRandomHex(length = 24) {
  let result = '';
  const characters = '0123456789abcdef';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

function usePageData(setLoading = (bool) => {}) {
  const [PAGE_DATA, setPAGE_DATA] = React.useState();
  React.useEffect(() => {
    setLoading && setLoading(true);
    window.fetchPageData().then(setPAGE_DATA).catch(console.log).finally(() => setLoading && setLoading(false));
  }, [])
  return React.useMemo(() => PAGE_DATA || {}, [PAGE_DATA]);
}

const pathname = window.pathname;

export { generateRandomHex, pathname, React, usePageData };

