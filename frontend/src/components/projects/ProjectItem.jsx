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
  const { name, id } = project;

  return (
    <div className="group relative card w-full max-h-36 md:w-56 bg-base-100 image-full shadow-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
      <figure>
        <img
          src={`https://picsum.photos/224/144?random=${id}`}
          alt="board image"
          className="w-full md:w-56 h-36"
        />
      </figure>
      <div className="card-body p-3">
        <div className="dropdown dropdown-end absolute top-1 right-1">
          <div
            tabIndex={0}
            role="button"
            className="hidden w-8 h-8 group-hover:grid place-content-center rounded-md hover:text-black hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>Rename project</a>
            </li>
            <li>
              <a>Delete project</a>
            </li>
          </ul>
        </div>
        <h2 className="card-title" onClick={() => navigate(`/projects/${id}`)}>
          {name}
        </h2>
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
