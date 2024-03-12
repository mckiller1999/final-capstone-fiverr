import { ACCESS_TOKEN, ACCESS_TOKEN_CYBER, USERLOGIN, getStorage, getStorageJson } from "../util/config";
import axios from "axios";
import { history } from "../index";
import { UserLogin } from "../redux/reducer/userReducer";
import { useSelector } from "react-redux";
import { notify } from "../constants/alert";
import { useFormik } from 'formik';
import { Rate } from "antd";
import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import InputFileUpload from "./UpLoadFile";

const AddComment = () => {
    const jobDetail = useSelector((state: any) => state?.jobDetailReducer?.jobDetail);
    const userLogin: UserLogin = getStorageJson(USERLOGIN);
    const date = new Date().toLocaleDateString();
    const [vote, setVote] = useState(Number);
    const addComment = async (input: any) => {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            try {
                const tokenCyber = ACCESS_TOKEN_CYBER;
                const token = getStorage(ACCESS_TOKEN);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const res = await axios({
                    headers: {
                        tokenCybersoft: ` ${tokenCyber}`,
                        token: `${token}`,
                    },
                    url: `https://fiverrnew.cybersoft.edu.vn/api/binh-luan`,
                    method: "POST",
                    data: {
                        id: 0,
                        maCongViec: jobDetail[0].congViec.id,
                        maNguoiBinhLuan: userLogin.user.id,
                        ngayBinhLuan: date,
                        noiDung: input.comment,
                        saoBinhLuan: vote,
                    },
                });
                notify('success', 'Upload comment successfully');
            } catch (error) {
                notify('error', 'Upload comment Fail')
            }
        } else {
            history.push("/login")
        }
    };
    const formik = useFormik({
        initialValues: {
            comment: '',
        },
        onSubmit: values => {
            addComment(values)
        },
    });

    return (
        <div className="w-11/12 mx-auto">
            <Card className="p-3" variant="outlined">
                <form onSubmit={formik.handleSubmit}>
                    <div className="flex justify-center align-midle">
                        <div className="text-center">
                            <Rate onChange={(value) => { setVote(value) }} className="mb-4"/>
                            <InputFileUpload/>
                        </div>
                        <TextField
                            sx={{ width: "80%" }}
                            className="form-control"
                            label="Comment"
                            type="text"
                            name="comment"
                            required
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.comment}
                            error={formik.touched.comment && Boolean(formik.errors.comment)}
                            helperText={formik.touched.comment && formik.errors.comment}
                            size="small"
                            multiline
                            rows={2}
                        ></TextField>
                    </div>
                    <div className="mx-5 pr-5 mt-2 text-end">
                        <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddComment;


