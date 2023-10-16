import { ChangeEvent, useState } from "react";
import { ListingsType } from "../../types/mongoTypes";
// Redux
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

function Contact({ listing }: { listing: ListingsType }) {
  const { currentUser } = useAppSelector((state) => state.user);
  const [contact, setContact] = useState(false);
  const [message, setMessage] = useState("");
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  return (
    <>
      {currentUser && listing.user._id !== currentUser._id && !contact && (
        <button
          onClick={() => setContact(true)}
          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 p-3"
        >
          Contact landlord
        </button>
      )}
      {contact ? (
        <div className="flex flex-col gap-2">
          <p>
            Contact{" "}
            <span className="font-semibold">{listing.user.username}</span> for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows={2}
            value={message}
            onChange={onChange}
            placeholder="Enter your message here..."
            className="w-full border p-3 rounded-lg"
          ></textarea>

          <Link
            to={`mailto:${listing.user.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            Send Message
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default Contact;
