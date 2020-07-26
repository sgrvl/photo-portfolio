import React, { Component } from "react";
import Image from "./Image/Image";

class Feed extends Component {
	state = {
		clicked: "",
		index: "",
		imgArr: [],
		open: false,
	};

	importAll(r) {
		let images = {};
		r.keys().map((item) => (images[item.replace("./", "")] = r(item)));
		return images;
	}

	handleClick(e, index) {
		console.log(sessionStorage.getItem(index));
		this.setState({
			clicked: e.target.alt,
			index: index,
			open: !this.state.open,
		});
	}

	handleButtonClick = () => {
		this.setState({ open: !this.state.open });
		console.log(this.state.open);
	};

	componentDidMount() {
		console.log(Math.random());
		const images = this.importAll(
			require.context("../../img", false, /\.(jpg)$/)
		);
		const imgArr = [];
		Object.keys(images).map((image) => imgArr.push(image));
		imgArr
			.sort(() => Math.random() - 0.5)
			.map((image, index) => {
				sessionStorage.setItem(index, require(`../../img/${image}`));
				return null;
			});
		this.setState({ imgArr: imgArr });
	}

	handleRight = () => {
		this.setState({
			index:
				this.state.index === sessionStorage.length - 1
					? 0
					: this.state.index + 1,
		});
	};

	handleLeft = () => {
		if (this.state.index !== 0) {
			this.setState({ index: this.state.index - 1 });
		}
	};

	render() {
		return (
			<div className="Feed">
				<div className={this.state.open ? "Zoom" : "Zoom-Not"}>
					<div>
						<button onClick={this.handleButtonClick}>X</button>
						<button id="left" onClick={this.handleLeft}>
							&#8592;
						</button>
						<button id="right" onClick={this.handleRight}>
							&#8594;
						</button>
						<div>{`${this.state.index + 1}/${sessionStorage.length}`}</div>
					</div>
					<Image
						src={
							this.state.index !== ""
								? `${sessionStorage.getItem(this.state.index)}`
								: null
						}
						open={this.state.open}
					/>
				</div>

				<div className="Feed-grid">
					{this.state.imgArr.map((image, index) => {
						return (
							<div className="Feed-img-wrap" key={index}>
								<img
									onClick={(e) => this.handleClick(e, index)}
									className="Feed-img"
									src={sessionStorage.getItem(index)}
									alt={image}
								/>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Feed;

//<img src={`${process.env.PUBLIC_URL}/img/IMG_0125.jpg`} alt="" />
//D:\Users\Simon\Desktop\Web\React\photo-portfolio\src\img
