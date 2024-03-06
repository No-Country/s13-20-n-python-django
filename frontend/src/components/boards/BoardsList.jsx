import boardData from '../../data/boards.json'
// import projectData from '../../data/projects.json'
import { useLocation } from "react-router-dom";

import BoardItem from "./BoardItem";
// import PropTypes from 'prop-types'

function BoardsList() {
  // const project = projectData
  const location = useLocation();
  const project_id = parseInt(location.pathname.split('/')[2])
  return (
    <div className="p-4 w-full overflow-auto">
      <h1 className="text-2xl font-bold">Boards</h1>
      {/* board list */}
      <div className="">
        <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6">
        {boardData.filter(board => board.project === project_id)
        .map((board, index) => (
          <BoardItem key={index} board={board}/>
        ))}
        </div>
      </div>
    </div>
  );
}

// BoardsList.propTypes = {
//   project: PropTypes.shape({
//     name: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//   }.isRequired
//   )
// }

export default BoardsList;
