import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { createPresinedURL } from '../apis/request';

const Container = styled.div`
    display: flex;
    justify-content: center;
    header {
        width: 100%;
        height: 38px;
        padding: 0 15px;
        line-height: 38px;
        font-size: 16px;
        font-weight: 600;
        #upload_pop_close {
            float: right;
            cursor: pointer;
        }
    }
    #upload_pop_wrapper {
        height: auto;
        background-color: #fff;
        align-self: center;
        header {
            color: white;
            background-color: lightskyblue;
        }
        main#have_border_line {
            border: dashed 2px lightskyblue;
            margin: 30px 60px;
            height: 334px;
        }
        main {
            width: 720px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            p {
                font-size: 20px;
                font-weight: 600;
            }
            span {
                font-size: 17px;
            }
        }
        #upload_button {
            width: 200px;
            height: 43px;
            border-radius: 4px;
            color: white;
            background-color: lightskyblue;
            text-align: center;
            line-height: 43px;
            font-size: 18px;
            font-weight: 600;
            margin: 0 auto;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            margin-bottom: 30px;
        }
    }
`;

type Props = {};

export default function InputForm({}: Props) {
    const [fileInfo, setFileInfo] = useState<File | null>(null);
    const fileCheck = useCallback((type) => {
        const filetype = type.split('/')[1];
        const extArr = ['jpg', 'jpeg', 'png', 'tif', 'tiff'];
        return extArr.includes(filetype);
    }, []);
    const onSelectFile = useCallback((e) => {
        if (fileCheck(e.target.files[0].type)) {
            console.log(e.target.files[0]);
            setFileInfo(e.target.files[0]);
        } else {
            alert('jpeg, png, tiff 파일만 업로드 가능합니다.');
        }
    }, []);
    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (fileInfo) {
                createPresinedURL(fileInfo);
                setFileInfo(null);
            }
        },
        [fileInfo]
    );

    return (
        <Container>
            <div id="upload_pop_wrapper">
                <header>Upload Files</header>
                <main id="have_border_line">
                    {!fileInfo ? (
                        <>
                            <p>Select File Here</p>
                            <label htmlFor="fileUpload">
                                <div id="upload_button">SELECT</div>
                            </label>
                            <span>
                                <b>Browse Image to Upload</b>
                            </span>
                            <span>Files Supported : JPEG, PNG, TIFF</span>
                        </>
                    ) : (
                        <form encType="multipart/form-data" onSubmit={onSubmit}>
                            <p>{fileInfo?.name}</p>
                            <label>
                                <div id="upload_button">
                                    UPLOAD
                                    <input type="submit" hidden />
                                </div>
                            </label>
                        </form>
                    )}
                </main>
                <input type="file" accept="image/jpeg,image/png,image/tiff" id="fileUpload" hidden onChange={onSelectFile} />
            </div>
        </Container>
    );
}
