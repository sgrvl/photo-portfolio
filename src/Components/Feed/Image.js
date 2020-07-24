import React, { Component } from "react";
import "./Feed.sass";

class Image extends Component {
	render() {
		return <img src={this.props.src} alt="" />;
	}
}

export default Image;
