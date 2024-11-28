// @ts-nocheck
// import * as ReactPDF from "react-pdf";
import { default as React } from "react";
export { default as clsx } from "clsx";
export { default as ReactDOM } from "react-dom";
export { default as ReactDOMServer } from "react-dom/server";
export * as ReactQrScanner from "react-qr-scanner";
export { default as Swal } from "sweetalert2";
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
function usePageData(setLoading = (bool) => { }) {
    const [PAGE_DATA, setPAGE_DATA] = React.useState();
    React.useEffect(() => {
        setLoading && setLoading(true);
        window.fetchPageData().then(setPAGE_DATA).catch(console.log).finally(() => setLoading && setLoading(false));
    }, []);
    return React.useMemo(() => PAGE_DATA || {}, [PAGE_DATA]);
}
const pathname = window.pathname;
export { generateRandomHex, pathname, React, usePageData };
