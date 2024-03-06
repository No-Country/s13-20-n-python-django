import boardData from '../../data/projects.json'
import BoardItem from "./BoardItem";
import PropTypes from 'prop-types'

function BoardsList() {
  return (
    <div className="p-4 w-full overflow-auto">
      <h1 className="text-2xl font-bold">My Boards</h1>
      {/* board list */}
      <div className="">
        <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6">
          {boardData.map((board, id) => (
            <BoardItem key={id} board={board} />
          ))}
        </div>
      </div>
    </div>
  );
}

BoardsList.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }.isRequired
  )
}

export default BoardsList;
