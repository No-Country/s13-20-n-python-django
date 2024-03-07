import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

function BoardItem({ board }) {
  const navigate = useNavigate();
  const { id, name, description } = board;

  return (
    <div
      className="card w-full md:w-56 bg-base-100 image-full shadow-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
      onClick={() => navigate(`/projects/boards/${id}/`)}>
      <figure>
        <img
          src={`https://picsum.photos/224/144?random=${id}`}
          alt="board image"
          className="w-full md:w-56 h-36"
        />
      </figure>
      <div className="card-body p-3">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

BoardItem.propTypes = {
  board: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default BoardItem;
