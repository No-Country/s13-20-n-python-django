import placeholder from "../../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

function ProjectItem({ project }) {

  const navigate = useNavigate();
  const { name, imageUrl, id } = project

  return (
    <div
      className="card w-full md:w-56 bg-base-100 shadow-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
      onClick={() => navigate(`/projects/${id}`)}
    >
      <figure>
        <img
          src={imageUrl || placeholder}
          alt="board image"
          className="w-full md:w-56 h-36"
        />
      </figure>
      <div className="card-body p-3">
        <h2 className="card-title">{name}</h2>
      </div>
    </div>
  );
}

ProjectItem.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
    id: PropTypes.number.isRequired,
  }).isRequired,
  
}

export default ProjectItem;
