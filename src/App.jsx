import React, { useEffect, useState, Suspense, lazy } from "react";
import { useSnackbar } from "notistack";
import Loader from "./components/Loader/Loader";
import axios from "axios";
import "./App.css";

const apiURL = "https://api.postalpincode.in/pincode";

// Lazy components
const DataDisplay = lazy(() => import("./components/DataDisplay/DataDisplay"));
const SearchForm = lazy(() => import("./components/SearchForm/SearchForm"));

const App = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [postCode, setPostCode] = useState(null);
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Notification
  const showNotification = (message, type) => {
    enqueueSnackbar(message, {
      variant: type,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  };

  // Fetch Data from API
  const fetchData = async () => {
    if (!postCode) return;

    setLoading(true);

    try {
      const response = await axios.get(`${apiURL}/${postCode}`);

      if (response.status === 200) {
        setPostData(response.data[0]);
      } else {
        setPostData({
          message: " No records found",
        });
      }
    } catch (error) {
      showNotification("Failed to Fetch Data from API", "error");
      setPostData(null);
      setSubmitted(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (submitted) {
      fetchData();
    }
  }, [submitted]);

  const handleSubmit = (code) => {
    setPostCode(code);
    setSubmitted(true);
  };

  return (
    <div>
      <div className="body-title text-light">POSTCODE EXPLORER</div>
      <Suspense fallback={<Loader />}>
        {!submitted && (
          <SearchForm onSubmit={handleSubmit} notification={showNotification} />
        )}
      </Suspense>

      {loading && <Loader />}

      <Suspense fallback={<Loader />}>
        {postData && <DataDisplay postCode={postCode} postData={postData} />}
      </Suspense>
    </div>
  );
};

export default App;
