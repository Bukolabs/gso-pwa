import { useEffect, useState } from "react";
import "./qr-scanner.scss";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router";
import { removePrefix } from "@core/utility/string.helper";

/* eslint-disable-next-line */
export interface QrScannerProps {}

export function QrScanner() {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState("");

  useEffect(() => {
    const html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 550, height: 550 } },
      false
    );

    const onScanSuccess = (decodedText: string, decodedResult: any) => {
      console.log(`Code matched = ${decodedText}`, decodedResult);
      setScanResult(decodedText);
      const prCodeMatch = "PRCODE-";
      const poCodeMatch = "POCODE-";

      html5QrcodeScanner.clear().then((x) => {
        console.log("CLEAR", { x });
      });

      console.log("SUCCESS SCAN");
      if (decodedText.indexOf(prCodeMatch) >= 0) {
        const code = removePrefix(prCodeMatch, decodedText);
        navigate(`request/${code}/scan`);
      } else if (decodedText.indexOf(poCodeMatch) >= 0) {
        const code = removePrefix(poCodeMatch, decodedText);
        navigate(`order/${code}/scan`);
      }
    };

    html5QrcodeScanner.render(onScanSuccess, undefined);

    return () => {
      html5QrcodeScanner
        .clear()
        .then((x) => {
          console.log("CLEAR", { x });
        })
        .catch((error) => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
    };
  }, [navigate]);

  return (
    <div className="qr-scanner">
      {scanResult ? (
        <div>Success: The Value is {scanResult}</div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
}

export default QrScanner;
