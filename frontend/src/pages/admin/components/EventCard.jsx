import { compareAsc, format } from "date-fns";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useDeleteEventByIdMutation } from "../../../redux/api/eventApiSlice";
import { toast } from "react-toastify";

export const EventCard = ({ event, setEvents }) => {
  const [deleteEvent, { isLoading, isError, error }] =
    useDeleteEventByIdMutation();

  const handleDelete = async (adminId) => {
    try {
      const res = await deleteEvent(adminId).unwrap();
      //   console.log(res);
      setEvents((prev) => prev.filter((item) => item._id !== adminId));
      toast.success(res.message);
    } catch (err) {
      //   console.log(err);
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("An error occurred while deleting the admin.");
      }
    }
  };
  return (
    <div className="card bg-white-100 w-full shadow-xl rounded-lg">
      <figure>
        <img src={event.image} alt={event.title} className="w-full h-[250px]" />
      </figure>
      <div className="card-body flex flex-col gap-4 px-4 py-2">
        <div className="flex justify-between items-center">
          <span className="text-xl font-semibold truncate w-4/6">
            {event.title}
          </span>
          <span className="text-slate-600">
            {format(event.date, "dd-MM-yyy")}
          </span>
        </div>
        <p className="text-slate-700">{event?.description}</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center text-slate-600 text-sm">
            <FaLocationDot size={16} />
            <span>{event.location}</span>
          </div>
          <div className="flex gap-2 items-center">
            <Link
              to={`/admin/events/eventForm/${event._id}`}
              className="p-2 bg-green-600 hover:bg-green-800 text-white text-sm rounded"
            >
              Update
            </Link>
            <Link
              className="p-2 bg-red-600 hover:bg-red-800 text-white text-sm rounded"
              onClick={() => handleDelete(event._id)}
            >
              Delete
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
