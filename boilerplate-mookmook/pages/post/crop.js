/* eslint-disable no-plusplus */
/* eslint-disable valid-typeof */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
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

  onCropChange = (crop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop, icolor: null });
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

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          return console.error("Canvas is empty");
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

  icolorpick = (e) => {
    console.log('icolor: ',this.state.icolor)
    if (this.state.icolor) {
      const oldElement = document.querySelector(`[value='${this.state.icolor}']`);
      console.log('oldElement', oldElement)
      if (oldElement.innerHTML !== null) oldElement.innerHTML = '';
    }

    if (e) {
      const selectedElement = document.querySelector(`[value='${e}']`);
      console.log(selectedElement)
      selectedElement.innerHTML = '<i class="bi bi-check" style="font-size: 30px; margin-bottom: -1px; color: white;"></i>';  
    }
    this.setState({ icolor: e });
  };

  render() {
    const { crop, croppedImageUrl, croppedImageJPG, src, icolor } = this.state;

    return (
      <>
        <div className={style['post-component']}>
          <p className={style['post-title']}>Upload your File</p>

          <Form>
            <Form.Group>
            { src 
              ? <>
                  <Form.Label>Uploaded image</Form.Label>
                  <ReactCrop
                    src={src}
                    crop={crop}
                    ruleOfThirds
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                  <br />
                </>
              : <>
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
                </>
            }
          </Form.Group>
          <br />

          {croppedImageUrl && (
            <>
              {/* <Form.Group>
                <Form.Label>Cropped image</Form.Label>
                <br />
                <img
                  className="croppedImg"
                  alt="Crop"
                  style={{ maxWidth: "100%" }}
                  src={croppedImageUrl}
                />
              </Form.Group>
              <br /> */}

              <Form.Group>
                <Form.Label>Extracted color</Form.Label>
                <br/>
                <ButtonGroup>
                  <Color src={croppedImageUrl} crossOrigin="anonymous" format="hex">
                    {({ data, loading }) => {
                      return(
                        loading
                          ? <div>loading...</div>
                          : data===undefined
                            ? ''
                            : <Button
                                id="primary-color"
                                style={{
                                  background: data,
                                  color: data,
                                  borderColor: "transparent",
                                  width: "80px",
                                  height: "30px",
                                  marginRight: "5px"
                                }}
                                key={data}
                                value={data}
                                onClick={() => this.icolorpick(data)}
                              >
                                {data}
                              </Button>
                          // : <ExtractedColor data={data}/>
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
                      let uniqueArr = [...new Set(data)];
                      // const mostColorElement = document.getElementById('primary-color');
                      // if(mostColorElement !== null) {
                      //   const mostColor = mostColorElement.value;
                      //   const duplicateIndex = uniqueArr.indexOf(mostColor);
                      //   if (duplicateIndex !== -1) {
                      //     uniqueArr.splice(duplicateIndex);
                      //   }
                      // }
                      // console.log(uniqueArr)

                      // console.log(mostColorElement)
                      // if (mostColorElement !== null) {
                      //   const mostColor = mostColorElement.value;
                      //   console.log('똑같나?', mostColor, typeof(mostColor))

                      //   const duplicateIndex = uniqueArr.indexOf(mostColor);
                      //   console.log('중복인덱스', duplicateIndex)
                      //   if (duplicateIndex !== -1) {
                      //     console.log('중복!')
                      //     uniqueArr.splice(duplicateIndex, 1);
                      //   }
                      // }
                      // console.log()
                      // console.log(uniqueArr)

                      return(                  
                        loading
                          ? <div>loading...</div>
                          : <>
                              {data 
                                ? uniqueArr.map((color, index) => (
                                  <Button
                                    style={{
                                      background: color,
                                      color,
                                      borderColor: "transparent",
                                      width: "80px",
                                      height: "30px",
                                      marginRight: "5px"
                                    }}
                                    key={index}
                                    value={color}
                                    onClick={() => this.icolorpick(color)}
                                  >
                                    {color}
                                  </Button>
                                ))
                              : 'No color'
                              }
                            </>
                      );
                    }}
                  </Palette>
                </ButtonGroup>
              </Form.Group>
            </>
          )}
          </Form>
        </div>
        
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
