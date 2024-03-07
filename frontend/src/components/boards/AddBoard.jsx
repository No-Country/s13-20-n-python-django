import plus from "../../assets/plus-symbol.jpg";

const AddBoard = () => {
  return (
    <>
      <div className="card w-full md:w-56 bg-base-100 image-full shadow-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer">
        <figure>
          <img src={plus} alt="board image" className="w-full md:w-56 h-36" />
        </figure>
        <div
          className="card-body p-3"
          onClick={() => document.getElementById("add_board_modal").showModal()}
        >
          <h2 className="card-title">Add a new board</h2>
        </div>
      </div>

      {/* Modal */}
      <dialog
        id="add_board_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Add new board</h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-primary w-full"
          />
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <button className="btn btn-primary">Add board</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AddBoard;
