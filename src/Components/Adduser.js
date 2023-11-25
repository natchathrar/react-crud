import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { UserCreateRequest, UserCreateSuccess, getUserByIdRequest, updateUserRequest, updateUserSuccess } from '../Redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader/Loader';

const Adduser = () => {
    const { userById, obj, loading } = useSelector((state) => state.reducer);
    console.log(obj);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: userById ? userById.name : '',
            age: userById ? userById.age : '',
            email: userById ? userById.email : '',
            phoneNo: userById ? userById.phoneNo : '',
            gender: userById ? userById.gender : '',
            qualification: userById ? userById.qualification : '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            age: Yup.string().required('Age is required'),
            phoneNo: Yup.string()
                .matches(/^\d{10}$/, 'Invalid phone number')
                .required('Mobile number is required'),
            gender: Yup.string().required('Gender is required'),
            qualification: Yup.string().required('Qualification is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const userData = {
                    age: values.age,
                    name: values.name,
                    email: values.email,
                    phoneNo: values.phoneNo,
                    gender: values.gender,
                    qualification: values.qualification,
                };

                if (id) {
                    const response = await dispatch(updateUserRequest({ _id: userById._id, ...userData }));
                    console.log(response);
                } else {
                    const response = await dispatch(UserCreateRequest({ ...userData }));
                    console.log(response);
                }

                resetForm();
            } catch (error) {
                console.error(error);
            }
        },
    });

    useEffect(() => {
        if (obj != null) {
            // Perform navigation here
            navigate('/'); // Assuming you have access to the history object
        }
    }, [obj]);
    useEffect(() => {
        if (id) {
            dispatch(getUserByIdRequest(id));
        }
    }, [dispatch, id]);



    useEffect(() => {
        if (userById) {
            formik.setValues({
                name: userById.name || '',
                age: userById.age || '',
                email: userById.email || '',
                phoneNo: userById.phoneNo || '',
                gender: userById.gender || '',
                qualification: userById.qualification || '',
            });
        }
    }, [userById]);
    return (
        <>
            <div className="container mb-4 mt-5">

                <form onSubmit={formik.handleSubmit}>
                    <div className="row jumbotron box8">
                        <div className="col-md-12 header-line">
                            <div className="col-sm-12 mb-3 mt-3">
                                <h2 className="text-center text-info ">User Registeration Form</h2>
                            </div>
                        </div>
                        <div className="col-sm-12 mb-2 mt-3">
                            <h3 style={{ color: "#00bcd4" }}>Personal Information</h3>
                        </div>
                        {loading ? (<div className=''>
                            <Loader />
                        </div>
                        ) :
                            (
                                <>
                                    <div className='col-sm-4 form-outline mt-2 mb-2'>
                                        <label htmlFor="name">Name<span className=" ms-1 redcolor">*</span></label>
                                        <input type="text" id="name" name="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                            className={`form-control   ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} />

                                        {formik.touched.name && formik.errors.name ? <div className="invalid-feedback">{formik.errors.name}</div> : null}
                                    </div>
                                    <div className='col-sm-4 form-group mt-2 mb-2'>
                                        <label htmlFor="email">Email<span className=" ms-1 redcolor">*</span></label>
                                        <input type="text" id="email" name="email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                            className={`form-control   ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} />

                                        {formik.touched.email && formik.errors.email ? <div className="invalid-feedback">{formik.errors.email}</div> : null}
                                    </div>


                                    <div className='col-sm-4 form-outline mt-2 mb-2'>
                                        <label htmlFor="phoneNo">Phone<span className=" ms-1 redcolor">*</span></label>
                                        <input type="number" id="phoneNo" name="phoneNo"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.phoneNo}
                                            className={`form-control   ${formik.touched.phoneNo && formik.errors.phoneNo ? 'is-invalid' : ''}`} />

                                        {formik.touched.phoneNo && formik.errors.phoneNo ? <div className="invalid-feedback">{formik.errors.phoneNo}</div> : null}
                                    </div>
                                    <div className='col-sm-4 form-outline mt-2 mb-2'>
                                        <label htmlFor="age">Age<span className=" ms-1 redcolor">*</span></label>
                                        <input type="number" id="age" name="age"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.age}
                                            className={`form-control   ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''}`} />

                                        {formik.touched.age && formik.errors.age ? <div className="invalid-feedback">{formik.errors.age}</div> : null}
                                    </div>
                                    <div className='col-sm-4 form-outline mt-2 mb-2'>
                                        <label htmlFor="qualification">Qualification<span className=" ms-1 redcolor">*</span></label>
                                        <input type="text" id="qualification" name="qualification"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.qualification}
                                            className={`form-control   ${formik.touched.qualification && formik.errors.qualification ? 'is-invalid' : ''}`} />

                                        {formik.touched.qualification && formik.errors.qualification ? <div className="invalid-feedback">{formik.errors.qualification}</div> : null}
                                    </div>
                                    <div className="col-sm-4 form-outline mt-2 mb-2">
                                        <label>Gender<span className=" ms-1 redcolor">*</span></label><br />
                                        <div className="form-check form-check-inline mt-2">
                                            <input className="form-check-input" type="radio" name="gender" id="male" value="male"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                checked={formik.values.gender === 'male'}
                                            />
                                            <label className="form-check-label" htmlFor="male">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="female" value="female"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                checked={formik.values.gender === 'female'}
                                            />
                                            <label className="form-check-label" htmlFor="female">Female</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" id="others" value="others"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                checked={formik.values.gender === 'others'}
                                            />
                                            <label className="form-check-label" htmlFor="others">others</label>
                                        </div>
                                        {formik.touched.gender && formik.errors.gender && <div className="text-danger">{formik.errors.gender}</div>}
                                    </div>

                                    <div className="p-4 justify content-end me-5 mt-2 text-end">
                                        <button className="btn btn-primary " type="submit" >Submit</button>
                                    </div>
                                </>
                            )}
                    </div>
                </form >
                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div >
        </>
    );
};

export default Adduser;
