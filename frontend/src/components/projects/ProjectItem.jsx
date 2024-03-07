import placeholder from "../../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function ProjectItem({ project }) {
  const navigate = useNavigate();
  const { name, imageUrl, id } = project;

  return (
    <div
      className="card w-full image-full md:w-56 bg-base-100 shadow-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
      onClick={() => navigate(`/projects/${id}`)}
    >
      <div
        className="w-full md:w-56 h-36 rounded-box"
        style={{ backgroundColor: getRandomColor() }}
      ></div>
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
};

export default ProjectItem;
