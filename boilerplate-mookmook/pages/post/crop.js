/* eslint-disable react/state-in-constructor */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import { Button, Form } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-crop/dist/ReactCrop.css";

class ImageCrop extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    src: null, // origin image file
    crop: {
      unit: "%",
      width: 30,
      aspect: 4 / 3,
    },
  };

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          // reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl); // 이전의 BLob Url 사용 메모리 해제
        this.fileUrl = window.URL.createObjectURL(blob); // Blob 객체를 url로 생성

        this.fileJPG = canvas.toDataURL("image/jpeg");

        resolve({
          croppedImageJPG: this.fileJPG,
          croppedImageUrl: this.fileUrl,
        });
      }, "image/jpeg");
    });
  }

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const { croppedImageJPG, croppedImageUrl } = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageJPG, croppedImageUrl });
    }
  }

  render() {
    const { crop, croppedImageUrl, croppedImageJPG, src } = this.state;

    return (
      <>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label htmlFor="exampleFormControlFile1">File Submit</Form.Label>
          <Form.Control
            type="file"
            id="exampleFormControlFile1"
            accept="image/*"
            onChange={this.onSelectFile}
          />
        </Form.Group>

        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            ruleOfThirds
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
        )}
        {croppedImageUrl && (
          <img
            className="croppedImg"
            alt="Crop"
            style={{ maxWidth: "100%" }}
            src={croppedImageUrl}
          />
        )}
        <br />
        <br />
        <Button
          className="confirm"
          onClick={() => this.props.handleClick(croppedImageJPG)}
          as="input"
          type="submit"
          value="Submit"
        />
      </>
    );
  }
}

export default ImageCrop;
