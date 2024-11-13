// @ts-ignore
import { IDRegExFormat } from "./global.mjs";
// @ts-ignore
import { pathname, React, ReactDOM, ReactQrScanner, Swal } from "./imports.mjs";
const signupForm = $('#signup-form');
const studentIDInput = $('input#studentid');
const firstNameInput = $('input#first_name');
const middleInitialInput = $('input#middle_initial');
const lastNameInput = $('input#last_name');
const emailInput = $('input#email');
const scannerRoot = $("#qrscanner-root");
function updateInputForm(studentid, firstname, middleinitial, lastname, email) {
    studentIDInput.val(studentid);
    firstNameInput.val(firstname);
    middleInitialInput.val(middleinitial);
    lastNameInput.val(lastname);
    emailInput.val(email);
    signupForm.removeClass('tw-hidden');
    scannerRoot.addClass('tw-hidden');
}
function QrScanner() {
    const [scannedData, setScannedData] = React.useState([]);
    const paused = React.useMemo(() => !signupForm.hasClass('tw-hidden'), []);
    const regExFormat = [IDRegExFormat.studentName, IDRegExFormat.studentId];
    const format = 'qr_code';
    const reset = React.useCallback(() => setScannedData([]), []);
    const onResult = React.useCallback((fullname, studentid) => {
        // check first if exists
        // from path /api/get/student/check
        const url = new URL(pathname("/api/get/student/check"), window.location.origin);
        url.searchParams.append('student_id', studentid);
        fetch(url)
            .then(response => response.json())
            .then(({ data }) => {
            if (data) {
                // show exists data
                Swal.fire({
                    title: 'Student Already Registered',
                    text: `Student ID: ${studentid} \nFull Name: ${fullname}`,
                    icon: 'info',
                    confirmButtonText: 'Okay'
                });
            }
            else {
                const splitted = fullname.split(" ");
                let fname = "", mi = "", lname = "", email;
                let isFirstName = true;
                splitted.forEach((value) => {
                    if (value.includes('.')) {
                        mi = value.substring(0, value.length - 1);
                        isFirstName = false;
                    }
                    else if (isFirstName) {
                        fname += value + " ";
                    }
                    else {
                        lname = value + " ";
                    }
                });
                if (!lname) {
                    let fnamesplit = fname.split(" ");
                    lname = fnamesplit.pop() || "";
                    fname = fnamesplit.join(" ");
                }
                fname = fname.trim();
                mi = mi.trim();
                lname = lname.trim();
                email = [fname.split(" ").join(""), lname.split(" ").join("")].join("_").toLowerCase().replaceAll('ñ', 'n') + '@smccnasipit.edu.ph';
                updateInputForm(studentid, fname, mi, lname, email);
            }
        })
            .catch((e) => {
            // some toast
            Swal.fire({
                title: 'Server Failure',
                text: `Please Try Again.`,
                icon: 'error',
                timer: 3000,
                confirmButtonText: 'Okay'
            });
            console.log(e);
        });
    }, []);
    React.useEffect(() => {
        if (regExFormat.length === 0 || (regExFormat.length > 0 && scannedData.length === regExFormat.length && regExFormat.every((regex, index) => regex.test(scannedData[index])))) {
            onResult(...scannedData);
            setTimeout(() => reset(), 1000);
        }
    }, [scannedData, reset]);
    const handleScan = React.useCallback((result) => result?.[0]?.format === format && setScannedData(result?.[0]?.rawValue.split('\r\n')), []);
    return React.createElement('div', { className: "tw-mx-auto tw-max-w-[320px] tw-aspect-square tw-p-4 tw-rounded-lg " + (scannedData.length > 0 ? 'tw-bg-green-300' : 'tw-bg-gray-300') }, React.createElement(ReactQrScanner.Scanner, {
        onScan: handleScan,
        paused,
    }));
}
const root = ReactDOM.createRoot(scannerRoot.get(0));
root.render(React.createElement(QrScanner));
