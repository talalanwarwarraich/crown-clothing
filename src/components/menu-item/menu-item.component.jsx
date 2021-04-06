import "./menu-item.styles.scss";
import { withRouter } from "react-router-dom";

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
	const routeToItem = () => {
		history.push(`${match.url}${linkUrl}`);
	};

	return (
		<div className={`${size} menu-item`} onClick={routeToItem}>
			<div
				className="background-image"
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			></div>
			<div className="content">
				<h1 className="title">{title.toUpperCase()}</h1>
				<span className="subtitle">Shop Now</span>
			</div>
		</div>
	);
};

export default withRouter(MenuItem);
