"use client";

import React from "react";
import { toast } from "react-hot-toast";

export default function DiagnosisForm({ type }: { type: string }) {
  const [photo, setPhoto] = React.useState<File>();
  const [photoUrl, setPhotoUrl] = React.useState();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [diagnosis, setDiagnosis] = React.useState<string>("");
  const fileref = React.useRef(null);
  const DEV = `http://127.0.0.1:8000/${type}`;
  const PROD = `https://fp-analitika-bisnis.up.railway.app/${type}`;

  React.useEffect(() => {
    if (!photo || photo === undefined) {
      setPhotoUrl(undefined);
      return;
    }
    console.log("did we get here");
    const objectUrl = URL.createObjectURL(photo);
    setPhotoUrl(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  const removePhoto = () => {
    setPhoto(undefined);
  };

  const changePhoto = (e) => {
    console.log(e.currentTarget.files);
    if (e.currentTarget.files) {
      setPhoto(e.currentTarget.files[0]);
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const loading = toast.loading("Loading..");
    console.log(photo);
    const formData = new FormData();
    formData.append("file", photo);

    const requestOptions = {
      method: "POST",
      //headers: { 'Content-Type': 'multipart/form-data' }, // DO NOT INCLUDE HEADERS
      body: formData,
    };
    fetch(PROD, requestOptions)
      .then((response) => response.json())
      .then(function (response) {
        console.log("response");
        console.log(response);
        setDiagnosis(response.diagnosis[0]);
        toast.success("Success", {
          id: loading,
        });
        setIsLoading(false);
      });
  };
  return (
    <section className="bg-white rounded-md shadow p-4 w-full sm:w-1/2">
      <h2 className="mb-4 font-semibold font-sans">X-Ray Image File</h2>
      {photoUrl ? (
        <div className="flex justify-center flex-col items-center">
          {diagnosis && (
            <p className="mb-2">
              Diagnosis Result:{" "}
              <span className="font-semibold">{diagnosis}</span>
            </p>
          )}
          <div className="relative w-72">
            <img src={photoUrl} alt="Thumb" />
          </div>
          <div className="w-full flex justify-center mt-2 gap-x-4">
            {diagnosis ? (
              <button
                className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:scale-105"
                onClick={() => {
                  setDiagnosis("");
                  setPhotoUrl(undefined);
                  setPhoto(undefined);
                }}
              >
                Try Again
              </button>
            ) : (
              <>
                <button
                  className="py-2 px-4 bg-red-500 text-white rounded-md transition hover:scale-105"
                  onClick={() => removePhoto()}
                  disabled={isLoading}
                >
                  Remove X-Ray
                </button>
                <button
                  className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:scale-105"
                  onClick={() => handleSubmit()}
                  disabled={isLoading}
                >
                  Check X-Ray
                </button>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={changePhoto}
              ref={fileref}
            />
          </label>
        </div>
      )}
    </section>
  );
}
