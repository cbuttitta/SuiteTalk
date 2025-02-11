import "./ApartmentSearch.css";
import { useState, useEffect } from "react";

function App() {
  document.title = "SuiteTalk";
  return (
    <div>
      <ApartmentSearchForm />
    </div>
  );
}

function ApartmentSearchForm() {
  const [inputValue, setInputValue] = useState("");
  const [showElement, setShowElement] = useState(false);
  const [activeListing, setActiveListing] = useState(0);
  const [inList, setInList] = useState(true);
  const [apartments, setApartments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/?query=apartments")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setApartments(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!apartments) return <p>No data to display.</p>;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowElement(event.target.value !== "");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted:", inputValue);
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
        setShowElement(false);
      } else {
        setInList(false);
      }
    }
  };

  return (
    <div className="centered-content">
      <h2 id="logo">SuiteTalk</h2>
      <p id="slogan">Find your Community!</p>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div>
          <input
            id="apartment-input"
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
              />
            </div>
          )}
          {!inList && (
            <div>
              <span style={{ color: "red" }}>Apartment not found</span>
            </div>
          )}
          <button id="submit-button" disabled={inputValue.length <= 5}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

function ListOptions({
  apartments,
  inputValue,
  activeListing,
  setInputValue,
  setShowElement,
}) {
  const filteredApartments = apartments.filter((apartment) =>
    apartment.toLowerCase().startsWith(inputValue.toLowerCase())
  );

  const handleSelect = (apartment) => {
    setInputValue(apartment);
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

export default App;
