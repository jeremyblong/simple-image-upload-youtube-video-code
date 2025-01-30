import React, { Fragment, useState } from 'react';
import Dropzone from 'react-dropzone';
import "./App.css";
import axios from "axios";

const App = () => {
  const [ state, setState ] = useState({
    acceptedFiles: []
  });

  const handleSubmission = async (e) => {
    e.preventDefault();

    const { acceptedFiles } = state;

    console.log("handleSubmission clicked/ran...");

    const config = {
      acceptedFiles
    };

    axios.post("http://localhost:8000/save/files", config).then((res) => {
      console.log("res", res.data);
    }).catch((err) => {
      console.log("err", err);
    })
  };

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const handleAcceptedFiles = async (files) => {

    for (let index = 0; index < files.length; index++) {
      const image = files[index];
      
      const base64Image = {
        ...image,
        base64: await toBase64(image)
      }

      console.log("base64Image", base64Image);

      setState(prevState => ({ ...prevState, acceptedFiles: [...prevState.acceptedFiles, base64Image] }))
    };
  }
  return (
    <Fragment>
      <div className='container'>
        <div className='row' style={{ marginTop: 50, marginBottom: 50 }}>
          <div className='col-md-12 col-lg-12 col-sm-12 text-center'>
            {/* Title & Subtitle */}
            <h2 className="upload-title">Upload Your Image</h2>
            <p className="upload-subtitle">Click below or drag and drop to upload an image.</p>

            <Dropzone onDrop={acceptedFiles => {
              handleAcceptedFiles(acceptedFiles);
            }}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <section>
                  <div 
                    {...getRootProps()} 
                    className={`dropzone ${isDragActive ? 'active' : ''}`}
                  >
                    <input {...getInputProps()} />
                    <p>Drag & drop files here, or click to upload</p>
                  </div>
                </section>
              )}
            </Dropzone>
            <hr />
            {typeof state.acceptedFiles !== "undefined" && state.acceptedFiles.length > 0 ? state.acceptedFiles.map((image, index) => {
              return <img style={{ width: 125, height: 125 }} src={image.base64} key={index} />
            }) : null}
            <hr />
            {/* Upload Button */}
            <button style={{ width: "100%" }} onClick={handleSubmission} className="upload-btn btn btn-primary">Upload File(s)</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
