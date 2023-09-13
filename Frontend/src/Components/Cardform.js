import React, { useState } from "react";
import { Formik, Field, Form, useField, ErrorMessage } from "formik";
import * as Yup from "yup";

const Cardform = (props) => {
  const handlesubmited = async (phoneNo) => {
    const response = await fetch(`http://localhost:3000/user/phoneNo/${phoneNo}`,{
        method: 'GET',
        
    })
    const json = await response.json();
    console.log(json);
    props.setData(json)
  }
  return (
    <div>
      <div className="flex items-center mt-10">
        <Formik
          initialValues={{ phoneNo: "" }}
          validationSchema={Yup.object({
            phoneNo: Yup.string()
              .matches(/^[0-9]+$/, "Must be only digits")
              .min(10, "Must be exactly 10 digits")
              .max(10, "Must be exactly 10 digits")
              .required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              handlesubmited(values.phoneNo)
          
              console.log("on submit for Phone No");
              alert(JSON.stringify(values, null, 2));
              console.log(values.name);
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="flex flex-col">
            <Field
              className="border border-gray-300 p-2 mb-2"
              name="phoneNo"
              type="tel"
              placeholder="Type Number"
            />
            <ErrorMessage
              name="phoneNo"
              className="text-red-500 text-xs italic"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-r-lg focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Cardform;
