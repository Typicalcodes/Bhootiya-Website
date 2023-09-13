import React, { useState } from "react";
import { Formik, Field, Form, useField, ErrorMessage } from "formik";
import * as Yup from "yup";
import ImageCropper from "./ImageCropper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MySelect = ({ label, ...props }) => {
  const currentDate = new Date();

  // Format the date to be used as the initial value in the date field
  const formattedDate = currentDate.toISOString().substr(0, 10);

  const [field, meta] = useField(props);
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

const Form2 = (props) => {
  const currentDate = new Date();

  // Format the date to be used as the initial value in the date field
  const formattedDate = currentDate.toISOString().substr(0, 10);

  const [newimage, setNewImage] = useState(null);
  const imagecropeed = (image) => {
    setNewImage(image);
    console.log(image);
  };
  const handleprop = (name, phoneNo, castType, position, newimage,date, address, fathername) => {
    props.createuser(name, phoneNo, castType, position, newimage,date, address, fathername);
  };
  return (
    <div>
      <div className="flex gap-x-3">
        <span className=" text-amber-400 text-2xl">Select the Image</span>
        <ImageCropper imagecropeed={imagecropeed} />
      </div>
      <div className="mt-2 text-amber-400 text-2xl">
        <Formik
          initialValues={{
            name: "",
            fathername:"",
            phoneNo: "",
            castType: "",
            position: "",
            date: formattedDate,
            address: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            address: Yup.string()
              .min(10, "Must be more than 10 characters or more")
              .required("Required"),
            fathername: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            phoneNo: Yup.string()
              .matches(/^[0-9]+$/, "Must be only digits")
              .min(10, "Must be exactly 10 digits")
              .max(10, "Must be exactly 10 digits")
              .required("Required"),
            castType: Yup.string()
              // specify the set of valid values for job type
              // @see http://bit.ly/yup-mixed-oneOf
              .oneOf(["Jamd", "Jsl"], "Invalid Job Type"),
            position: Yup.string()
              // specify the set of valid values for job type
              // @see http://bit.ly/yup-mixed-oneOf
              .oneOf(["सचिव", "मुखिया", "कर्मचारी"], "Invalid Job Type"),
          })}
          onSubmit={(values, { setSubmitting }) => {
         
            handleprop(
              values.name,
              values.phoneNo,
              values.castType,
              values.position,
              newimage,
              values.date,
              values.address,
              values.fathername
            );
            setTimeout(() => {
              console.log("on submit is clicked really");
              alert(JSON.stringify(values, null, 2));
             // console.log(values.name, values.image,values.date,values.fathername);
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="gap-y-2 flex flex-col">
            <div className="space-x-4">
              <label className="" htmlFor="name">
                Name
              </label>
              <Field
                className="border border-gray-300"
                name="name"
                type="name"
              />
              <ErrorMessage name="name" />
            </div>
            <div className="space-x-4">
              <label className="" htmlFor="fathername">
              Father Name
              </label>
              <Field
                className="border border-gray-300"
                name="fathername"
                type="fathername"
              />
              <ErrorMessage name="fathername" />
            </div>
            <div className="space-x-4">
              <label htmlFor="phoneNo">Phone No</label>
              <Field
                className="border border-gray-300"
                name="phoneNo"
                type="tel"
              />
              <ErrorMessage name="phoneNo" />
            </div>

            <div className="space-x-4">
              <MySelect
                className="border mr-4 border-gray-300"
                label="CastType"
                name="castType"
              >
                <option value="">Select a job type</option>
                <option value="Jamd">Jamd</option>
                <option value="Jsl">Jsl</option>
              </MySelect>
            </div>
            <div className="space-x-4">
            <label htmfor="date">Joining Date:</label>
            <Field id="date" name="date" type="date" />
            </div>
            <div className="space-x-4">
            <label htmfor="address">Address</label>
            <Field id="address" className="border border-gray-300" name="address" type="address" />
            <ErrorMessage name="address" />
            </div>
            <div className="space-x-4">
              <MySelect
                className="border mr-4 border-gray-300"
                label="Position"
                name="position"
              >
                <option value="">Select a job type</option>
                <option value="सचिव">सचिव</option>
                <option value="मुखिया">मुखिया</option>
                <option value="कर्मचारी">कर्मचारी</option>
              </MySelect>
            </div>

            <button
              className="px-[16px] py-[8px] border text-white font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-lg"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Form2;
