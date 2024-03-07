import PropTypes from "prop-types";
import { useGetBoardQuery } from "../../services/boardSlice";
import { useLocation } from "react-router-dom";
import BoardSorter from "./BoardSorter";

function BoardDetails() {
  const location = useLocation();
  const projectId = parseInt(location.pathname.split("/")[3]);
  const { data, isError, isLoading } = useGetBoardQuery(projectId);

  console.log(data, isError, isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <main className="flex-1 overflow-hidden">
        <div className="flex flex-col h-full">
          <h1 className="text-2xl mt-4 ms-6 font-bold">{data.name} {" >"} Lists</h1>
          <div className="shrink-0 flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">{data.list_set.name}</h1>
          </div>

          <div className="flex-1 overflow-x-auto">
            {isLoading || isError ? (
              <div>Loading...</div>
            ) : (
              <>
                <BoardSorter data={data} />
              </>
            )}
          </div>
        </div>
      </main>
    );
  }
}

BoardDetails.propTypes = {
  project: PropTypes.shape(
    {
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }.isRequired
  ),
};

export default BoardDetails;
