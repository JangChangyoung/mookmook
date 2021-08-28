/* eslint-disable react/sort-comp */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/state-in-constructor */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import Color, { Palette } from "color-thief-react";
import { Button, Form, ButtonGroup } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-crop/dist/ReactCrop.css";
import style from "./style.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

const Loading = () => <div>Loading...</div>;

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

  icolorpick = (e) => {
    this.setState({ icolor: e });
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

  onCropChange = (crop) => {
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
    const { crop, croppedImageUrl, croppedImageJPG, src, icolor } = this.state;
    console.log(this.state);

    return (
      <>
        <div className={style['post-component']}>
          <p className={style['post-title']}>Upload your File</p>
          
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label htmlFor="exampleFormControlFile1" className={style['upload-container']}>
              <i className="bi bi-file-earmark-plus"/>
                Upload
            </Form.Label>
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

          <Color src={croppedImageUrl} crossOrigin="anonymous" format="hex">
            {({ data, loading }) => {
              if (loading) return <Loading />;
              return (
                <>
                  Predominat color:
                  <br />
                  <Button
                    style={{
                      background: data,
                      borderColor: "#ffffff",
                      color: data,
                    }}
                    value={data}
                    onClick={() => this.icolorpick(data)}
                  >
                    {data}
                  </Button>
                </>
              );
            }}
          </Color>

          <Palette
            src={croppedImageUrl}
            crossOrigin="anonymous"
            format="hex"
            colorCount={4}
          >
            {({ data, loading }) => {
              if (loading) return <Loading />;

              return (
                <div>
                  Palette:
                  <ButtonGroup aria-label="Basic example">
                    {data &&
                      data.map((color, index) => (
                        <Button
                          style={{
                            background: color,
                            color,
                            borderColor: "#ffffff",
                          }}
                          key={index}
                          value={color}
                          onClick={() => this.icolorpick(color)}
                        >
                          {color}
                        </Button>
                      ))}
                  </ButtonGroup>
                </div>
              );
            }}
          </Palette>
        </div>
        
        <br />


        <Button
          className={style.submit}
          onClick={() => this.props.handleClick(croppedImageJPG, icolor)}
          as="input"
          type="submit"
          value="Submit"
        />
      </>
    );
  }
}

export default ImageCrop;
