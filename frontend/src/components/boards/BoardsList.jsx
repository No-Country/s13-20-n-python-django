import { useLocation } from "react-router-dom";
import { useGetProjectQuery } from "../../services/projectSlice";

import BoardItem from "./BoardItem";
import AddBoard from "./AddBoard";

function BoardsList() {
  const location = useLocation();
  const project_id = parseInt(location.pathname.split("/")[2]);

  const { data, isLoading, isError } = useGetProjectQuery(project_id);
  // console.log(data, isLoading, isError);

  return (
    <div className='p-4 w-full overflow-auto'>
      <h1 className='text-2xl font-bold'>Boards</h1>
      {/* board list */}
      <div className=''>
        <div className='flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6'>
          {isLoading || isError ? (
            <div>Loading...</div>
          ) : !data.project_board.length < 1 ? (
            data.project_board.map((board, index) => (
              <BoardItem key={index} board={board} />
            ))
          ) : (
            <div>No boards for this project</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BoardsList;
