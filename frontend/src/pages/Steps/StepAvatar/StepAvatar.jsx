import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import styles from './StepAvatar.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setAvatar } from '../../../store/activateSlice';
import { activate } from '../../../http';
import { setAuth } from '../../../store/authSlice';

const StepAvatar = ({ onNext }) => {
    const dispatch = useDispatch();
    const { name, avatar } = useSelector((state) => state.activate);
    const [image, setImage] = useState('/images/monkey-avatar.png');
    function captureImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result);
            dispatch(setAvatar(reader.result));
        };
    }
    async function submit() {
        try {
            const { data } = await activate({ name, avatar });
            if (data.auth) {
                dispatch(setAuth(data));
            }
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    const fileInputStyle = {
        display:'none'
    };

    const avatarWrapperStyle = {
        width: '110px',
        height: '110px',
        border: '6px solid #0077ff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    };
    const avatarContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    };



    return (
        <>
            <Card title={`Okay, ${name}`} icon="monkey-emoji">
                <p className={styles.subHeading}>How’s this photo?</p>

                <div style={avatarContainerStyle}>
                    <div  style={avatarWrapperStyle}>
                        <img
                            className={styles.avatarImage}
                            src={image}
                            alt="avatar"
                        />
                    </div>
                </div>
                <div>
                    <input
                        onChange={captureImage}
                        id="avatarInputt"
                        type="file"
                        // className={styles.avatarInput}
                        // style={display:"none"}
                        style={fileInputStyle}
                    />
                    <label className={styles.avatarLabel} htmlFor="avatarInputt">
                        Choose a different photo
                    </label>
                </div>
                <div>
                    <Button onClick={submit} text="Next" />
                </div>
            </Card>
        </>
    );
};

export default StepAvatar;