import React, { useState,useEffect } from "react";
import html2canvas from "html2canvas";
import bgimage from "../Images/bhotiya-transformed.jpeg";
const Table = (data) => {
  console.log(data.data.name);
  const [img, setImg] = useState(null);
  useEffect(() => {
    const imageData = data.data.image.data; // your binary data
    const blob = new Blob([new Uint8Array(imageData)], { type: "image/*" }); // create a Blob object from binary data
    const imageUrl = URL.createObjectURL(blob); // create a URL for the Blob object
  
    setImg(imageUrl);

    console.log(data.name)
    
  }, [data])
  
  const downloadTable = async () => {
    console.log(data.data.image.data);
 
    const tableElement = document.getElementById("card-container");
    html2canvas(tableElement, {
      useCORS: true,
      scale: 2,

      quality: 1,
    }).then((canvas) => {
      const pngData = canvas.toDataURL("image/jpeg");
      const downloadLink = document.createElement("a");
      downloadLink.setAttribute("href", pngData);
      downloadLink.setAttribute("download", `table.jpeg`);
      downloadLink.click();
    });
  };
  
  return (
    <>
      <div id="card-container" className="h-[40rem] w-[65rem]">
        <div
          style={{ backgroundImage: `url(${bgimage})` }}
          className="mx-2 bg-contain bg-center  h-[40rem] w-[65rem] relative"
        >
          <div className="absolute top-[180px] left-[60px]">
            {img && ( 
            <img className="object-cover h-52 w-44 p-2 border-2" src={img} alt="renderimgae" />
            )}
           
          </div>
          <span className="absolute bottom-[200px] left-[90px] text-3xl font-semibold text-red-600 ">{data.data.position} </span>
       
          <span className="absolute top-[280px] left-[300px] text-3xl font-semibold">
            {data.data.name} S/o {data.data.fathername}
          </span>
       
          <span className="absolute top-[210px] right-[60px] text-3xl font-semibold text-red-600">
            JBBS No.
         </span>
          <span className="absolute top-[170px] right-[60px] text-3xl font-semibold">
            JBB{data.data.idNO}
         </span>
          <span className="absolute bottom-[110px] left-[60px] text-3xl font-semibold text-red-600">
            Phone No
         </span>
          <span className="absolute bottom-[70px] left-[60px] text-3xl font-semibold underline underline-offset-8">
          {data.data.phoneNo}
         </span>
          <span className="absolute bottom-[210px] left-[300px] text-3xl font-semibold text-red-600">
            Joining Date
         </span>
          <span className="absolute bottom-[170px] left-[300px] text-3xl font-semibold">
            {data.data.jodate}
         </span>
        
         <span className="absolute bottom-[210px] left-[530px] text-3xl font-semibold text-red-600">
            Address
         </span>
          <span className="absolute bottom-[170px] left-[530px] text-3xl font-semibold">
            {data.data.address}
         </span>
        </div>
      </div>
      <button  className="px-[16px] py-[8px] border text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-lg"
        onClick={() => downloadTable()}> Download Card</button>
    </>
  );
};

export default Table;
