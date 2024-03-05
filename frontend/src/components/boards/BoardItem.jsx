import placeholder from "../../assets/placeholder.png";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

function BoardItem({ board }) {
  
  const navigate = useNavigate();

  const { name, description } = board

  return (
    <div 
      className="card w-full md:w-56 bg-base-100 shadow-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
      onClick={() => navigate("/projects/boards/1/")}
      >
      <figure>
        <img
          src={placeholder} // Need to add description instead of placeholder image
          alt="board image"
          className="w-full md:w-56 h-36"
        />
      </figure>
      <div className="card-body p-3">
        <h2 className="card-title">{name}</h2>
        <p className="">{description}</p>
      </div>
    </div>
  );
}

BoardItem.propTypes = { board: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      project: PropTypes.number.isRequired,
  }).isRequired
};

export default BoardItem;
