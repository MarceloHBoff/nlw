import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';
import { Container } from './styles';

interface DropzoneProps {
  onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileUploaded }) => {
  const [selectedFileUri, setSelectedFileUri] = useState('');

  const onDrop = useCallback(
    acceptedFiles => {
      const fileUrl = URL.createObjectURL(acceptedFiles[0]);

      onFileUploaded(acceptedFiles[0]);

      setSelectedFileUri(fileUrl);
    },
    [onFileUploaded],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />
      {selectedFileUri ? (
        <img src={selectedFileUri} alt="Imagem do estabelecimento" />
      ) : (
        <p>
          <FiUpload />
          Imagem do estabelecimento
        </p>
      )}
    </Container>
  );
};

export default Dropzone;
