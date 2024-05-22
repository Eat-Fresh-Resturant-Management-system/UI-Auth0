import React, { useState, useEffect } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";

export const GetToken = () => {

  const [state, setState] = useState({
    showResult: false,
    apiMessage: "",
    error: null,
  });

  const {
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    const callApi = async () => {
      try {
        const token = await getAccessTokenSilently();
        localStorage.setItem("Token", token);
      } catch (error) {
        setState({
          ...state,
          error: error.message,
        });
      }
    };

    callApi();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts




  return (
    <>
      <div className="mb-5">
       
      </div>
    </>
  );
};

export default withAuthenticationRequired(GetToken, {
  onRedirecting: () => <Loading />,
});
