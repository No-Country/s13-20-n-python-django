import { PropTypes } from "prop-types";
import ProjectItem from "./ProjectItem";

function Project({ project }) {
	if (!project) {
		// Added guard clause
		return <div>No project provided</div>; // Added a simple fallback
	}

	return (
		<>
			<ProjectItem project={project} />
		</>
	);
}

Project.propTypes = {
	project: PropTypes.shape({
		name: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		project_board: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.number.isRequired,
				name: PropTypes.string.isRequired,
			})
		),
	}),
};

export default Project;
