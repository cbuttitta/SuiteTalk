import { useState, useEffect } from "react";
import axios from "axios";

function ApartmentSearchForm({setApartmentName}) {
  const [inputValue, setInputValue] = useState("");
  const [showElement, setShowElement] = useState(false);
  const [activeListing, setActiveListing] = useState(0);
  const [inList, setInList] = useState(true);
  const [apartments, setApartments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/apartments")
      .then((response) => setApartments(response.data))
      .catch((error) => setError(error));
  }, []);
  if (!apartments) return <p>Error getting data: {error}</p>;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowElement(event.target.value !== "");
  };

  const changeActive = (event) => {
    const filteredApartments = apartments.filter((apartment) =>
      apartment.toLowerCase().startsWith(inputValue.toLowerCase())
    );

    if (filteredApartments.length !== 0) {
      setInList(true);
    }

    if (event.key === "ArrowDown") {
      setActiveListing((prev) => (prev + 1) % filteredApartments.length);
    }

    if (event.key === "ArrowUp") {
      setActiveListing(
        (prev) =>
          (prev - 1 + filteredApartments.length) % filteredApartments.length
      );
    }

    if (event.key === "Enter") {
      event.preventDefault();
      if (filteredApartments.length > 0) {
        const selectedApartment = filteredApartments[activeListing];
        setInputValue(selectedApartment);
        setApartmentName(selectedApartment);
        setShowElement(false);
      } else {
        setInList(false);
      }
    }
  };

  return (
        <div>
          <input
            className="value-input"
            type="text"
            placeholder="Apartment Name"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={changeActive}
          />
          {showElement && (
            <div>
              <ListOptions
                apartments={apartments}
                inputValue={inputValue}
                activeListing={activeListing}
                setInputValue={setInputValue}
                setShowElement={setShowElement}
                setApartmentName={setApartmentName}
              />
            </div>
          )}
          {!inList && (
            <div>
              <span style={{ color: "red" }}>Apartment not found</span>
            </div>
          )}
          </div>
  );
}
function ListOptions({
  apartments,
  inputValue,
  activeListing,
  setInputValue,
  setShowElement,
  setApartmentName
}) {
  const filteredApartments = apartments.filter((apartment) =>
    apartment.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const handleSelect = (apartment) => {
    setInputValue(apartment);
    setApartmentName(apartment);
    setShowElement(false);
  };

  const listItems = filteredApartments.map((apartment, index) => (
    <div
      key={apartment}
      className={`apartment-list-item ${
        index === activeListing ? "active" : ""
      }`}
      onClick={() => handleSelect(apartment)}
      style={{ cursor: "pointer" }}
    >
      <BoldText text={apartment} highlightLength={inputValue.length} />
    </div>
  ));

  return <div id="apartment-list">{listItems}</div>;
}

function BoldText({ text, highlightLength }) {
  const firstPart = text.slice(0, highlightLength);
  const remainingPart = text.slice(highlightLength);

  return (
    <span>
      <span style={{ fontWeight: "bold" }}>{firstPart}</span>
      <span>{remainingPart}</span>
    </span>
  );
}

export default ApartmentSearchForm;
