import { useLocation } from "react-router-dom";
import { useGetProjectQuery } from "../../services/projectSlice";

import BoardItem from "./BoardItem";
import AddBoard from "./AddBoard";

function BoardsList() {
  const location = useLocation();
  const projectId = parseInt(location.pathname.split("/")[2]);

  const { data, isLoading, isError } = useGetProjectQuery(projectId);

  return (
    <div className="p-4 w-full overflow-auto">
      {isLoading || isError ? (
        <div>Loading...</div>
      ) : !data.project_board.length < 1 ? (
        <>
          <h1 className="text-2xl font-bold">{data.name} Boards</h1>
          <div className="">
            <div className="flex flex-col items-center md:flex-row md:flex-wrap gap-6 py-6">
              {data.project_board.map((board) => (
                <BoardItem key={board.id} board={board} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div>No boards for this project</div>
      )}
      <AddBoard projectId={projectId} />
    </div>
  );
}

export default BoardsList;
