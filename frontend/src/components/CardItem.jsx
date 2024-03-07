import PropTypes from "prop-types";

function CardItem({task}) {
  console.log(task);
  // const taskData = Object.entries(task)

  return (
    <div className="shadow rounded-md border-b border-gray-300 hover:bg-gray-50">
      <div className="inline-flex h-full items-start px-4 pb-4 space-x-4">
          <li key={task.id} className="group relative p-3">
            <a href="#" className="text-sm font-medium">
              {task.name}
            </a>
            <button className="hidden absolute top-1 right-1 w-8 h-8 group-hover:grid place-content-center rounded-md hover:text-black hover:bg-gray-200">
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </li>
      </div>
    </div>
  );
}

CardItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,

  }),
};

export default CardItem;
