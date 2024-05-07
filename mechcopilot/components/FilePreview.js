import Image from 'next/image'

const FilePreview = ({ fileUrl, fileType }) => {
  switch (fileType) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return <Image src={fileUrl} alt="uploaded image" width="300" height="300" />;
    case 'pdf':
      return <embed src={fileUrl} type="application/pdf" width="100%" height="600px" />;
    default:
      return <p>Preview not available</p>;
  }
};

export default FilePreview;