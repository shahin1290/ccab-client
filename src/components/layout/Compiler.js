import React, { Component } from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Pusher from "pusher-js";
import pushid from "pushid";
import axios from "axios";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";

import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/css/css";
import "codemirror/mode/javascript/javascript";
import { Row, Col, Container } from "react-bootstrap";

class Compiler extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      html: "",
      css: "",
      js: "",
    };

    this.pusher = new Pusher("18160601861a89d7f8f7", {
      cluster: "eu",
      forceTLS: true,
    });

    this.channel = this.pusher.subscribe("editor");
  }

  componentDidUpdate() {
    this.runCode();
  }

  componentDidMount() {
    this.setState({
      id: pushid(),
    });

    this.channel.bind("text-update", (data) => {
      const { id } = this.state;
      if (data.id === id) return;

      this.setState({
        html: data.html,
        css: data.css,
        js: data.js,
      });
    });
  }

  syncUpdates = () => {
    const data = { ...this.state };

    axios
      .post("https://ccab-api.onrender.com/update-editor", data)
      .catch(console.error);
  };

  runCode = () => {
    const { html, css, js } = this.state;

    const iframe = this.refs.iframe;
    const document = iframe.contentDocument;
    const documentContents = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script type="text/javascript">
          ${js}
        </script>
      </body>
      </html>
    `;

    document.open();
    document.write(documentContents);
    document.close();
  };

  render() {
    const { html, js, css } = this.state;
    const codeMirrorOptions = {
      theme: "material",
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
    };

    return (
      <Container>
        <div className="text-center mt-2 mb-5">
          <div className="title">Javascript Playground</div>
          <div className="sub-title">
            Simplest javascript playground with real-time result view.
          </div>
        </div>
        <Row className="shadow p-3 mb-5 bg-white rounded">
          <Col md={6} className="playground">
            <div className="code-editor html-code">
              <div className="editor-header">HTML</div>
              <CodeMirror
                value={html}
                options={{
                  mode: "htmlmixed",
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, html) => {
                  this.setState({ html }, () => this.syncUpdates());
                }}
              />
            </div>
            <div className="code-editor css-code">
              <div className="editor-header">CSS</div>
              <CodeMirror
                value={css}
                options={{
                  mode: "css",
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, css) => {
                  this.setState({ css }, () => this.syncUpdates());
                }}
              />
            </div>
            <div className="code-editor js-code">
              <div className="editor-header">JavaScript</div>
              <CodeMirror
                value={js}
                options={{
                  mode: "javascript",
                  ...codeMirrorOptions,
                }}
                onBeforeChange={(editor, data, js) => {
                  this.setState({ js }, () => this.syncUpdates());
                }}
              />
            </div>
          </Col>
          <Col md={6} className="result">
            <div className="sub-title text-center">Result View</div>
            <iframe title="result" className="iframe" ref="iframe" />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Compiler;
