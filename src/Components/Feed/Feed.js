import React, { Component } from "react";

class Feed extends Component {
	importAll(r) {
		let images = {};
		r.keys().map((item) => (images[item.replace("./", "")] = r(item)));
		return images;
	}

	render() {
		const images = this.importAll(
			require.context("../../img", false, /\.(jpg)$/)
		);

		return (
			<div>
				{Object.keys(images).map((image, index) => {
					return (
						<div key={index}>
							<img src={require(`../../img/${image}`)} alt={image} />
						</div>
					);
				})}
			</div>
		);
	}
}

export default Feed;

//<img src={`${process.env.PUBLIC_URL}/img/IMG_0125.jpg`} alt="" />
//D:\Users\Simon\Desktop\Web\React\photo-portfolio\src\img
