import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import useStorage from "../../hooks/useStorage";
import Widget from "@/components/Widget";
import { CldUploadButton, CldImage } from "next-cloudinary";
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/20/solid";

export default function Signup() {
  const { setItem } = useStorage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [imgid, setImgid] = useState("");
  const [warning, setWarning] = useState("");
  const inputRef = useRef(null);
  const [name, setName] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setWarning("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setWarning("");
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const reqData = {
      username: username,
      password: password,
      img: imgid,
      name: name,
    };
    console.log(reqData);
    if (
      reqData.username !== "" &&
      reqData.password !== "" &&
      reqData.name !== ""
    ) {
      fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data !== null && data.success) {
            console.log("Successfully Created User");
          }
        })
        .catch((error) => {
          console.error("Error fetching posts:", error);
        });
    }
  };

  const [childState, setChildState] = useState(0);
  const handleChildStateChange = () => {
    if (childState !== null) setChildState(childState + 1);
    else setChildState(0);
    //console.log(childState);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      inputRef.current.click();
    }
  };
  return (
    <>
      <div className="xl:ml-[370px] border-l border-r border-gray-200  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
        <div className="flex py-2 px-3 sticky top-0  bg-white border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
            Sign up
          </h2>
        </div>
        <div className="p-4">
          <form>
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Username:
              </span>
              <input
                type="text"
                name="userId"
                className="mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="account"
                onChange={handleUsernameChange}
                required
                onKeyDown={handleKeyDown}
              />
            </label>
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Name:
              </span>

              <input
                type="name"
                name="name"
                className="mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="name"
                onChange={handleNameChange}
                required
              />
            </label>
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Password:
              </span>

              <input
                type="password"
                name="password"
                className="mb-3 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                placeholder="password"
                onChange={handlePasswordChange}
                required
                onKeyDown={handleKeyDown}
              />
            </label>
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                User Image:
              </span>
              <CldUploadButton
                onUpload={(result, error, widget) => {
                  if (result.event === "success") {
                    setImgid(result.info.secure_url.split("upload/")[1]);
                  }
                }}
                uploadPreset="ml_unsigned"
              >
                <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
              </CldUploadButton>
            </label>

            <input
              type="button"
              className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 m-1"
              value="Sign up"
              onClick={handleSubmit}
              ref={inputRef}
            />
            <p className="text-red-500">{warning}</p>
            <Link href="/">
              <p id="autoclick" hidden>
                go to home page
              </p>
            </Link>
          </form>
        </div>
      </div>
      <Widget onStateChange={handleChildStateChange} checkFol={() => {}} />
    </>
  );
}
