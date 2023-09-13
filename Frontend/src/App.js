import { useState } from "react";
import "./App.css";
import Cardform from "./Components/Cardform";
import Table from "./Components/Table";
import UserAdd from "./Components/UserAdd";

function App() {
  const [file, setFile] = useState(null);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const [exadata, setexdata] = useState(null);
  const setData = (data) => {
    setexdata(data);
  };
  return (
    <>
      <span className="mx-auto text-black text-xl my-5 mb-11 font-bold">
        Adding the Dropdown
      </span>
      <UserAdd  className="mt-7" />
      <Cardform setData={setData} />
      <button
        className="px-[16px] py-[8px] border text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-lg"
        onClick={()=>{setexdata(null)}}
      >
        Reset
      </button>
      {exadata && (exadata.map((item,index)=>{ return <Table key={index} data={item} />}))}
    </>
  );
}

export default App;
