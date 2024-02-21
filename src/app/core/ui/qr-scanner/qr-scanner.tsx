import { useEffect, useState } from "react";
import "./qr-scanner.scss";
import { Html5QrcodeScanner } from "html5-qrcode";

/* eslint-disable-next-line */
export interface QrScannerProps {}

export function QrScanner() {
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
    let html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 550, height: 550 } },
      false
    );

    const onScanSuccess = (decodedText: string, decodedResult: any) => {
      console.log(`Code matched = ${decodedText}`, decodedResult);
      setScanResult(decodedText);
      html5QrcodeScanner.clear();
    };
    const onScanFailure = (error: any) => {
      // console.warn(`Code scan error = ${error}`);
    };

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return (
    <div className="qr-scanner">
      {scanResult ? (
        <div>Success: Value is {scanResult}</div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default QrScanner;
