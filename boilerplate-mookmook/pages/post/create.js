import React from "react";
import firebase from "firebase";
import {
  Offcanvas,
  Form,
  FormGroup,
  ToggleButton,
  InputGroup,
} from "react-bootstrap";
import { CirclePicker } from "react-color";
import ImageCrop from "./crop";
import Search from "./search";
import { Scrollbars } from "react-custom-scrollbars";

import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.scss";

class PostCreatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      imgurl: null,
      titleimg: null,
      type: "movie",
      colorhue: null,
    };
  }

  initFirebaseAuth() {
    // Listen to auth state changes.
    firebase.auth().onAuthStateChanged();
  }
  sortColors(color) {
    /* Get the hex value without hash symbol. */
    const hex = color.substring(1);

    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    /* Getting the Max and Min values for Chroma. */
    const max = Math.max.apply(Math, [r, g, b]);
    const min = Math.min.apply(Math, [r, g, b]);

    /* Variables for HSV value of hex color. */
    const chr = max - min;
    const hue = 0;
    const val = max;
    const sat = 0;

    if (val > 0) {
      sat = chr / val;
      if (sat > 0) {
        if (r == max) {
          hue = 60 * ((g - min - (b - min)) / chr);
          if (hue < 0) {
            hue += 360;
          }
        } else if (g == max) {
          hue = 120 + 60 * ((b - min - (r - min)) / chr);
        } else if (b == max) {
          hue = 240 + 60 * ((r - min - (g - min)) / chr);
        }
      }
    }
    /* Sort by Hue. */
    return hue;
  }
  getTime = () => {
    const today = new Date();

    const year = today.getFullYear(); // 년도
    const month = today.getMonth() + 1; // 월
    const date = today.getDate(); // 날짜
    const day = today.getDay(); // 요일
    switch (day) {
      case 0:
        day = "Mon";
        break;
      case 1:
        day = "Tue";
        break;
      case 2:
        day = "Wed";
        break;
      case 3:
        day = "Thu";
        break;
      case 4:
        day = "Fri";
        break;
      case 5:
        day = "Sat";
        break;
      case 6:
        day = "Sun";
        break;
    }
    return year + "/" + month + "/" + date + " " + day;
  };

  handleClick = async (data, icolor) => {
    const title = this.state.title;
    const imgurl = data;
    const titleimg = this.state.titleimg;
    const imgcolor = icolor;
    const type = this.state.type;
    const color = document.getElementsByClassName("circle-picker").value;
    const line = document.getElementById("line").value;
    const review = document.getElementById("review").value;
    const colorhue = this.sortColors(imgcolor);
    const datetime = this.getTime();

    if (!title || !imgurl || !imgcolor || !type || !color || !line || !review) {
      alert("모든 값을 입력해주세요.");
    } else {
      const db = firebase.firestore();
      const user = firebase.auth().currentUser;
      console.log(user);
      await db
        .collection(type)
        .add({
          displayName: user.displayName,
          userID: user.uid,
          imgcolor: imgcolor,
          type: type,
          title: title,
          imgurl: imgurl,
          titleimg: titleimg,
          color: color,
          colorhue: colorhue,
          line: line,
          review: review,
          uploadTime: datetime,
          likeArray: new Array(),
        })
        .then(() => {
          alert("등록되었습니다.");
          window.location.reload();
        });
    }
  };
  selectTitle = (title, titleimg) => {
    if (title.includes("<b>")) {
      const title = title.replace(/<b>/gi, "").replace(/<\/b>/gi, "");
    }
    this.setState({ title: title, titleimg: titleimg });
  };
  radioChange = (e) => {
    console.log(e);
    this.setState({ type: e.target.value });
  };

  handleColor = (e) => {
    if (document.getElementsByClassName("circle-picker").value) {
      const oldElement = document.querySelector(
        `[title='${document.getElementsByClassName("circle-picker").value}']`
      );
      while (oldElement.firstChild)
        oldElement.removeChild(oldElement.firstChild);
    }
    document.getElementsByClassName("circle-picker").value = e.hex;

    const selectedElement = document.querySelector(`[title='${e.hex}']`);
    const checked = document.createElement("i");
    checked.setAttribute("class", "bi bi-check");
    checked.setAttribute("style", "font-size: 28px; color: white;");
    selectedElement.appendChild(checked);
  };

  render() {
    const radios = [
      { type: "movie", value: "1" },
      { type: "book", value: "2" },
    ];

    return (
      <Offcanvas
        className={style["post-container"]}
        show={this.props.show}
        onHide={this.props.onHide}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className={style["post-header"]}>
            Post your review
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin="calc(100vh - 74px)"
          universal={true}
        >
          <Offcanvas.Body>
            <div className={style["post-component"]}>
              <p className={style["post-title"]}>Choose type</p>
              {radios.map((radio, idx) => (
                <ToggleButton
                  className={style.toggleButton}
                  key={idx}
                  id={`radio-${idx}`}
                  name="radio"
                  type="radio"
                  variant="outline-secondary"
                  value={radio.type}
                  checked={this.state.type === radio.type}
                  onChange={(e) => this.radioChange(e)}
                >
                  {radio.type}
                </ToggleButton>
              ))}
            </div>

            <div className={style["post-component"]}>
              <p className={style["post-title"]}>Write your review</p>
              <Form>
                <Form.Label>Title</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    id="title"
                    type="text"
                    value={this.state.title}
                    readOnly
                  />

                  <Search
                    type={this.state.type}
                    title={this.state.title}
                    selectTitle={this.selectTitle}
                  />
                </InputGroup>
                <br />

                <Form.Label htmlFor="exampleColorInput">Color</Form.Label>
                <CirclePicker
                  width="100%"
                  id="color"
                  value="#44336"
                  onChange={this.handleColor}
                />
                <br />

                <FormGroup>
                  <Form.Label>Famous line</Form.Label>
                  <Form.Control
                    id="line"
                    as="textarea"
                    rows={2}
                    style={{ width: "100%", resize: "none" }}
                  />
                </FormGroup>
                <br />

                <Form.Group>
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    id="review"
                    as="textarea"
                    rows={3}
                    style={{ width: "100%", resize: "none" }}
                  />
                </Form.Group>
                <br />
              </Form>
            </div>

            <ImageCrop handleClick={this.handleClick} />
          </Offcanvas.Body>
        </Scrollbars>
      </Offcanvas>
    );
  }
}

export default PostCreatePage;
