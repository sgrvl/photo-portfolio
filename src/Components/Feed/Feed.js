import React, { Component } from "react";
import Image from "./Image/Image";
import InfiniteScroll from "react-infinite-scroll-component";

class Feed extends Component {
	state = {
		clicked: "",
		index: "",
		imgArr: [],
		imgArrLoad: [],
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
		const images = this.importAll(
			require.context("../../img", false, /\.(jpg)$/)
		);
		const imgArr = [];
		Object.keys(images).map((image) => imgArr.push(image));
		imgArr.map((image, index) => {
			sessionStorage.setItem(index, require(`../../img/${image}`));
			return null;
		});

		const imgArrLoad = imgArr.splice(0, 24);
		this.setState({ imgArr: imgArr, imgArrLoad: imgArrLoad });
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

	fetchMoreImages = () => {
		setTimeout(() => {
			const imgArr = this.state.imgArr;
			const imgArrLoad = this.state.imgArrLoad.concat(imgArr.splice(0, 24));

			this.setState({ imgArr: imgArr, imgArrLoad: imgArrLoad });
		}, 2000);
	};

	render() {
		return (
			<div className="Feed" id="Feed">
				<div className={this.state.open ? "Zoom" : "Zoom-Not"}>
					<div>
						<button onClick={this.handleButtonClick}>X</button>
						<button id="left" onClick={this.handleLeft}>
							&#8592;
						</button>
						<button id="right" onClick={this.handleRight}>
							&#8594;
						</button>
						<div>{`${this.state.index + 1}/${sessionStorage.length - 1}`}</div>
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
				<InfiniteScroll
					className="Feed-grid"
					style={{ overflow: "hidden" }}
					dataLength={this.state.imgArrLoad.length}
					next={this.fetchMoreImages}
					hasMore={this.state.imgArr.length !== 0}
					scrollThreshold="95%"
					loader={
						<div className="Img-Loader-Wrap">
							<div className="Img-Loader" />
						</div>
					}
					endMessage={<h4>Fin</h4>}
				>
					{this.state.imgArrLoad.map((image, index) => {
						return (
							<div className="Feed-img-wrap">
								<img
									onClick={(e) => this.handleClick(e, index)}
									className="Feed-img"
									src={sessionStorage.getItem(index)}
									alt={image}
									key={index}
								/>
							</div>
						);
					})}
				</InfiniteScroll>
			</div>
		);
	}
}

export default Feed;
