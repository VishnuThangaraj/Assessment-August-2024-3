import React from "react";
import "./DataDisplay.css";

const DataDisplay = ({ postCode, postData }) => {
  return (
    <div id="data-display" className="px-5">
      {/* Side Data */}
      <div className="side-data">
        <div className="pincode">
          <b>PINCODE</b> : {postCode || "Invalid Post Code"}
        </div>
        <div className="message">
          <b>MESSAGE</b> :{" "}
          {postData ? postData.Message : "No Message Provided "}
        </div>
      </div>

      {/* Postcode Data */}
      <div className="main-display">
        <div className="postal-data">POSTAL DATA</div>
        <div className="my-flex-center display-inner">
          {postData && postData.PostOffice ? (
            postData.PostOffice.map((postal, index) => (
              <div key={`postal-${index}`} className="data-outer">
                <div className="post-content">
                  <b>Name</b> : {postal.Name}
                </div>
                <div className="post-content">
                  <b>Branch Type</b> : {postal.BranchType}
                </div>
                <div className="post-content">
                  <b>Delivery Status</b> : {postal.DeliveryStatus}
                </div>
                <div className="post-content">
                  <b>District</b> : {postal.District}
                </div>
                <div className="post-content">
                  <b>Division</b> : {postal.Division}
                </div>
              </div>
            ))
          ) : (
            <div className=" my-flex-center no-postal fa-fade">
              No Postal Data Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataDisplay;
