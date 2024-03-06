import ListItem from "../ListItem";
import listData from '../../data/list.json'
import PropTypes from 'prop-types'

function Board() {

  
  return (
    <main className="flex-1 overflow-hidden">

      <div className="flex flex-col h-full">

        <div className="shrink-0 flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold">{name}</h1>
        </div>

        <div className="flex-1 overflow-x-auto">

          <div className="inline-flex h-full items-start px-4 pb-4 space-x-4">
            {listData.map((list, id) => (
              <ListItem key={id} list={list} />
            ))}

            <div className="w-72">
              <button className="flex items-center w-full hover:bg-white/20 p-2 text-sm font-medium rounded-md border-2">
                +<span className="ml-1">Add another list</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}

Board.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }.isRequired
  )
}

export default Board;