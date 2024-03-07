import ListItem from "../ListItem";
import PropTypes from "prop-types";
import { useGetBoardQuery } from "../../services/boardSlice";
import { useLocation } from "react-router-dom";

function BoardDetails() {
  const location = useLocation();
  const project_id = parseInt(location.pathname.split("/")[3]);
  const { data, isError, isLoading } = useGetBoardQuery(project_id);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <main className="flex-1 overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="shrink-0 flex justify-between items-center p-4">
            <h1 className="text-2xl font-bold">{data.list_set.name}</h1>
          </div>

          <div className="flex-1 overflow-x-auto">
            {isLoading || isError ? (
              <div>Loading...</div>
            ) : (
              <div className="inline-flex h-full items-start px-4 pb-4 space-x-4">
                {data.list_set.map((list) => {
                  return <ListItem key={list.id} list={list} />;
                })}
              </div>
            )}

            <div className="w-72">
              <button className="flex items-center w-full hover:bg-white/20 p-2 text-sm font-medium rounded-md border-2">
                +<span className="ml-1">Add another list</span>
              </button>
            </div>
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
