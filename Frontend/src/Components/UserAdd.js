import React from "react";
import { useState, useEffect } from "react";
import Form from "./Form";
import ImageCropper from "./ImageCropper";

const UserAdd = () => {
  const [states, setStates] = useState([{ state: "uttar pradesh" }]);
  const [setState, setSeState] = useState();
  const [showInput, setShowInput] = useState(false);
  const [showDistrict, setShowDistrict] = useState(false);
  const [District, setDistrict] = useState();
  const [inDist, setInDist] = useState();
  const [blockar, setBlock] = useState();
  const [showBlock, setshowBlock] = useState(false);
  const [inBlock, setinBlock] = useState();
  //getting all the states
  const getallcity = async () => {
    const response = await fetch("http://localhost:3000/api/find", {
      method: "GET",
    });
    const json = await response.json();
    console.log(json);
    setStates(json);
  };
  //to get states before render
  useEffect(() => {
    getallcity();
  }, []);
  // to open district when state is clicked
  const openDistrict = async (state) => {
    var dis = await states.find((obj) => obj.state === state).district;

    setDistrict(dis);
    console.log(dis);
    setSeState(state);
    setShowDistrict(true);
    setShowInput(!showInput);
    setshowBlock(false);
  };
  const openBlock = async (disse) => {
    console.log("apne block is clicked");
    var dis = states
      .find((obj) => obj.state === setState)
      .district.find((obj) => obj.name === disse).block;
    console.log("Probably state is empty");
    console.log(blockar);
    setInDist(disse);
    setShowDistrict(false);
    setshowBlock(true);
    setBlock(dis);
  };
  const handleCreateUser = async (name, phoneNo, castType, position, image, date, address, fathername) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("casteType", castType);
    formData.append("phoneNo", phoneNo);
    formData.append("position", position);
    formData.append("image", image, "image.jpg");
    formData.append("date", date);
    formData.append("address", address);
    formData.append("fathername", fathername);
    console.log(name, phoneNo, castType, position, image, date, fathername);
    await fetch(
      `http://localhost:3000/user/state/${setState}/district/${inDist}/block/${inBlock}"`,
      {
        method: "POST",
        
        body: formData,
      }
    );
  };
  return (
    <>
      <div className="w-full">
        {showInput ? (
          <span className="font-merrisans text-blue-700 my-8  w-full ">
            {states.map((item) => {
              return (
                <div
                  onClick={() => openDistrict(item.state)}
                  key={item.state}
                  className="flex px-[8px] text-blue-700 my-8 py-[4px] bg-white border w-full flex-col"
                >
                  {item.state}
                </div>
              );
            })}
          </span>
        ) : (
          <span
            className="border-2 my-8 text-blue-700 w-full px-[8px] py-[16px]"
            onClick={() => {
              setShowInput(!showInput);
              setinBlock("");
            }}
          >
            {setState ? setState : "Selectb State"}
          </span>
        )}
        {showDistrict ? (
          <span className="font-merrisans text-green-700 my-8 w-full ">
            {District.map((item) => {
              return (
                <div
                  onClick={() => openBlock(item.name)}
                  key={item.name}
                  className="flex px-[8px] text-green-700 my-8 py-[4px] bg-white border w-full flex-col"
                >
                  {item.name}
                </div>
              );
            })}
          </span>
        ) : (
          <span
            className="border-2 text-green-700 my-8 px-[8px] py-[16px]"
            onClick={() => {
              setShowInput(!showInput);
              setinBlock("");
            }}
          >
            {inDist ? inDist : "Select District"}
          </span>
        )}
        {showBlock ? (
          <span className="font-merrisans text-red-800 my-8 w-full ">
            {blockar.map((item, index) => {
              return (
                <div
                  onClick={() => {
                    setinBlock(item.name);
                    setshowBlock(!showBlock);
                  }}
                  key={index}
                  className="flex px-[8px] text-red-800 my-8 py-[4px] bg-white border w-full flex-col"
                >
                  {item.name}
                </div>
              );
            })}
          </span>
        ) : (
          <span
            className="border-2 text-red-800 px-[8px] my-8 py-[16px]"
            onClick={() => {
              setShowInput(!showInput);
            }}
          >
            {inBlock ? inBlock : "NA"}
          </span>
        )}
      </div>
      <div>
        {inBlock ? <Form createuser={handleCreateUser} /> : "select Something"}
      </div>
    </>
  );
};

export default UserAdd;
