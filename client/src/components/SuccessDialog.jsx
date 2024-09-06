import { Link } from "react-router-dom";

const SuccessDialog = ({ text, img }) => {
  return (
    <div className="modal-box bg-base-300">
      <div className="modal-action">
        <form method="dialog">
          <button className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </button>
        </form>
      </div>
      <img src={img} alt="success" className="w-1/3 max-w-xs mx-auto" />

      <h3 className="font-bold text-xl text-center py-12">{text}</h3>
      <div className="w-full text-right">
        <Link to="/reports" className="link">
          See Reports
        </Link>
      </div>
    </div>
  );
};

export default SuccessDialog;
