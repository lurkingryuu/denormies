const EventCard = ({ name, date, venue, type }) => {
    return (
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">{name}</h2>
        <p className="text-gray-600 mb-2">{date.toLocaleDateString()}</p>
        <p className="text-gray-600 mb-2">{venue}</p>
        <p className="text-gray-600">{type}</p>
      </div>
    );
  };
  
  export default EventCard;