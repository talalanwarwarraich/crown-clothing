import "./collection-preview.styles.scss";
import CollectionItem from "../collection-item/collecttion-item.component";

const CollectionPreview = ({ title, items }) => (
	<div className="collection-preview">
		<h1>{title.toUpperCase()}</h1>
		<div className="preview">
			{items
				.filter((item, idx) => idx < 4)
				.map(({ id, ...otherItemProps }, idx) => (
					<CollectionItem key={id} {...otherItemProps} />
				))}
		</div>
	</div>
);

export default CollectionPreview;
