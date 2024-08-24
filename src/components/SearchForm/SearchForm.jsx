import React, { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import "./SearchForm.css";

const SearchForm = ({ notification, onSubmit }) => {
  const [postCode, setPostCode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (postCode.length === 6) {
      onSubmit(postCode);
    } else {
      notification("Please enter a 6-digit postcode.", "error");
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setPostCode(value);
    }
  };

  return (
    <div id="search_form">
      <div className="form-holder">
        <form onSubmit={handleSubmit}>
          <div className="form-group my-flex-center">
            <input
              type="text"
              name="postcode"
              id="postcode"
              placeholder="Enter the PostCode ..."
              value={postCode}
              onChange={handleChange}
              maxLength={6}
            />
          </div>
          <div className="form-group my-flex-row pt-4">
            <button type="submit" className="btn btn-success px-4 py-2">
              <IconSearch stroke={2} />
              &nbsp;Find
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchForm;
