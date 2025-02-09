import "./App.css";
import { useState } from "react";

const apartments = [
  "The Edge",
  "University Walk",
  "University Crossing",
  "The Mill",
  "University Village",
];

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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowElement(event.target.value !== ""); // Show element if input is not empty
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', inputValue);
  };

  const changeActive = (event) => {
    const filteredApartments = apartments.filter((apartment) =>
      apartment.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    
    if (filteredApartments.length !== 0) {
      setInList(true);
    }

    if (event.key === "ArrowDown") {
      setActiveListing((prev) => (prev + 1) % filteredApartments.length); // Wrap around to the top
    }

    if (event.key === "ArrowUp") {
      setActiveListing(
        (prev) =>
          (prev - 1 + filteredApartments.length) % filteredApartments.length // Wrap around to the bottom
      );
    }

    if (event.key === "Enter") {
      console.log(filteredApartments.length, inputValue);
      event.preventDefault();
      if (filteredApartments.length > 0) {
        const selectedApartment = filteredApartments[activeListing];
        setInputValue(selectedApartment); // Set input value to selected apartment
        setShowElement(false); // Hide the dropdown after selection
      } else {
        setInList(false);
      }
    }
  };

  return (
    <div className="centered-content">
      <h2 id="logo">SuiteTalk</h2>
      <p id="slogan">Find your Community!</p>
      <form 
      onSubmit={handleSubmit}
      autoComplete="off">
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
          <span id="login-option">or <a href="/login">login</a></span>
        </div>
      </form>
    </div>
  );
}

function ListOptions({ inputValue, activeListing, setInputValue, setShowElement }) {
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
      className={`apartment-list-item ${index === activeListing ? "active" : ""}`}
      onClick={() => handleSelect(apartment)} // Handle click event
      style={{ cursor: "pointer" }} // Make it clear it's clickable
    >
      <BoldText text={apartment} highlightLength={inputValue.length} />
    </div>
  ));

  return <div id="apartment-list">{listItems}</div>;
}

/**
 * Renders a text with a specified number of characters highlighted in bold.
 * @param {Object} props - The properties object.
 * @param {string} props.text - The text to be displayed.
 * @param {number} props.highlightLength - The number of characters to be highlighted in bold.
 */
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
