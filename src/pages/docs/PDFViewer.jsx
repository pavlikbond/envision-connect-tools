import React from "react";

const PDFViewer = () => {
  const url = "https://public-client-guide.s3.us-west-1.amazonaws.com/Envision+Connect+2+Client+Guide+v1.3.pdf";

  return (
    <object data={url} type="application/pdf" className="flex-[3] w-full h-full">
      <embed src={url} type="application/pdf" />
      <p>
        This browser does not support PDFs. Please download the PDF to view it: <a href={url}>Download PDF</a>.
      </p>
    </object>
  );
};

export default PDFViewer;
