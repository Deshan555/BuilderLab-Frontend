import $ from "jquery";
import React, { Component, createRef } from "react";
import ReactDOM from "react-dom";
// import "./styles.css";

window.jQuery = $;
window.$ = $;

require("jquery-ui-sortable");
require("formBuilder");

class FormBuilder extends Component {
  fb = createRef();

  componentDidMount() {
    const { formData } = this.props;
    this.initializeFormBuilder(formData);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.formData !== this.props.formData) {
      this.initializeFormBuilder(this.props.formData);
    }
  }

  initializeFormBuilder(formData) {
    if (formData && Array.isArray(formData)) {
      $(this.fb.current).formBuilder({ formData });
    } else {
      console.error('Invalid form data:', formData);
    }
  }

  render() {
    return <div id="fb-editor" ref={this.fb} />;
  }
}

export default FormBuilder;
