import React, { useRef } from 'react';
import { useScreenshot, createFileName } from 'use-react-screenshot';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import '../App.css';
import BarChart from './d3/BarChart';

function Download() {
  const ref = useRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });


  // Func to download screenshot as JPEG
  const downloadImage = (image, { name = "image", extension = "jpeg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };


  // Func to download screenshot to PDF
  const downloadPdf = (ref, img) => {
    html2canvas(ref).then(function (canvas) {
      const imgData = canvas.toDataURL(img)

      const pdf = new jsPDF({
        format: 'a4'
      })

      // Sizing the img to be 100% width of PDF
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      console.log('pdfWidth', pdfWidth);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 20, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  }


  // Func to invoke the download
  const downloadScreenshot = async (extention) => {
    const screenShot = await takeScreenShot(ref.current);
    if (extention === 'jpeg') {
      return await takeScreenShot(ref.current).then(downloadImage);
    }
    return await downloadPdf(ref.current, screenShot);
  }



  return (
    <div className="download">
      <div className="image" ref={ref} >
        <h1>use-react-screenshot || jsPDF || html2canvas</h1>
        <BarChart />
      </div>
      <div className="screenshot">
        <button onClick={() => downloadScreenshot('jpeg')}>
          Download as jpg
        </button>
        <button onClick={() => downloadScreenshot('pdf')}>Download PDF</button>
      </div >
    </div>
  );
}
export default Download;