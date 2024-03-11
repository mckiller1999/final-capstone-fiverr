import * as React from 'react';
import Popover from '@mui/material/Popover';
import { ACCESS_TOKEN, ACCESS_TOKEN_CYBER, USERLOGIN, getStorage, getStorageJson } from "../util/config";
import axios from "axios";
import { UserLogin } from "../redux/reducer/userReducer";
import { useSelector } from "react-redux";
import { notify } from "../constants/alert";
import { useFormik } from 'formik';
import { Rate } from "antd";
import { Button, Card, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import InputFileUpload from "./UpLoadFile";
import { Edit } from '@mui/icons-material';

type TEditButton = {
    idComment: any
};
export default function ButtonEditPopover({ idComment }: TEditButton) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const jobDetail = useSelector((state: any) => state?.jobDetailReducer?.jobDetail);
    const userLogin: UserLogin = getStorageJson(USERLOGIN);
    const date = new Date().toLocaleDateString();
    const [vote, setVote] = useState(Number);
    const addComment = async (input: any) => {
        try {
            const tokenCyber = ACCESS_TOKEN_CYBER;
            const token = getStorage(ACCESS_TOKEN);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const res = await axios({
                headers: {
                    tokenCybersoft: ` ${tokenCyber}`,
                    token: `${token}`,
                },
                url: `https://fiverrnew.cybersoft.edu.vn/api/binh-luan/${idComment}`,
                method: "PUT",
                data: {
                    maCongViec: jobDetail[0].congViec.id,
                    maNguoiBinhLuan: userLogin.user.id,
                    ngayBinhLuan: date,
                    noiDung: input.comment,
                    saoBinhLuan: vote,
                },
            });
            notify('success', 'Upload comment successfully');
        } catch (error) {
            console.log(error);
            
            notify('error', 'Upload comment Fail')
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
        <div>
            <IconButton aria-label='edit' size='small' className='mr-0' onClick={handleClick}>
                <Edit fontSize='small' />
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div className="w-3/4 mx-auto">
                    <Card className="p-5" variant="outlined">
                        <form onSubmit={formik.handleSubmit} className="mt-3">
                            <div className="flex justify-center align-midle">
                                <div className="inline text-center">
                                    <Rate onChange={(value) => { setVote(value) }} className="mb-4" />
                                    <InputFileUpload />
                                </div>
                                <TextField
                                    sx={{ width: "75%" }}
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
                            <div className="mx-5 pr-5 mt-5 text-end">
                                <Button variant="contained" type="submit" endIcon={<SendIcon />}>
                                    Send
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </Popover>
        </div>
    );
}