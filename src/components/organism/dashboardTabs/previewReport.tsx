import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import DiagnosticReport from "./report/DiagnosticReport";

const PreviewComponent = ({ showPreview, onClose, record, isTest }) => {
  const componentRef = useRef();
  const [pdfLoading, setPdfLoading] = useState(false);

  const exportPDF = async () => {
    setPdfLoading(true);
    const element = componentRef.current;

    // Try increasing the scale for a higher resolution. Be mindful of performance.
    const canvas = await html2canvas(element, {
      scale: 3, // Increased scale for higher resolution
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY,
      windowHeight: document.documentElement.scrollHeight,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    // A4 size in pixels at 300 DPI: 2480x3508 (for high quality print)
    // However, you may need to adjust these dimensions based on your specific needs and the actual DPI you're achieving.
    // Scaling the captured image to fit within the A4 dimensions
    let width = pdf.internal.pageSize.getWidth();
    let height = pdf.internal.pageSize.getHeight();
    let imgWidth = canvas.width;
    let imgHeight = canvas.height;

    // Scale image to fit A4 page
    let ratio = Math.min(width / imgWidth, height / imgHeight);
    let scaledWidth = imgWidth * ratio;
    let scaledHeight = imgHeight * ratio;

    pdf.addImage(imgData, "PNG", 0, 0, scaledWidth, scaledHeight);
    pdf.save("download.pdf");
    setPdfLoading(false);
  };

  return (
    showPreview && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full">
        <div className="bg-white rounded-lg p-6 w-full md:w-3/4 lg:w-100 max-h-[80vh] overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Preview</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="preview-content" ref={componentRef}>
            <DiagnosticReport report={record} isTest={isTest} />
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={exportPDF}
              disabled={pdfLoading}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mr-2 focus:outline-none"
            >
              {pdfLoading ? "Exporting..." : "Export PDF"}
            </button>
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default PreviewComponent;
