import { useRef, useState } from "react";

const ViewCardModal = ({ isOpen, hasCloseBtn = true, onClose, children }) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef(null);
  return (
    <dialog id="view_card_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">{taskId}</h3>
        {/* <p>{task.description}</p> */}
      </div>
    </dialog>
  );
};

export default ViewCardModal;
