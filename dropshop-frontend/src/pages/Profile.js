import React, {useEffect, useState} from 'react';
import '../Profile.css';
import {getUser} from "../api/userApi";
import AddBalance from "../components/forms/AddBalance";
import {useSelector} from "react-redux";
import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Profile = () => {
    const user = useSelector(state => state.user.user)
    const [creditCard, setCreditCard] = useState([])
    const [loading, setLoading] = useState([]);
    const [addValue, setAddValue] = useState([])
    const [balance, setBalance] = useState([])
    const {t} = useTranslation('profilePage');

    useEffect(() => {
        fetchData()
    }, []);

    function fetchData() {
        getUser(user.username)
            .then(({data}) => {

                setCreditCard(data.cards)
                setBalance(data.balance)
            })
            .catch((error) => console.log(error)).finally(() => setLoading(false))
    }


    return (
        <div className="page-content page-container" id="page-content">
            <div className="padding">
                <div className="row container d-flex justify-content-center">
                    <div className="col-xl-6 col-md-12">
                        <div className="card user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-4 bg-c-lite-green user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="m-b-25">
                                            <img src="https://img.icons8.com/bubbles/100/000000/user.png"
                                                 className="img-radius" alt="User-Profile-Image">
                                            </img>
                                        </div>
                                        <h6 className="f-w-600">{user.username}</h6>
                                        <p>{user.roles}</p>
                                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">{t('information')}</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">{t('balance')}</p>
                                                <h6 className="text-muted f-w-400">{balance + " Eur"}</h6>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">{t('card')}</p>
                                                <select className="profile-cards-list">
                                                    {creditCard.map((card) =>
                                                        <option value={card.name}>{card.number}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">{t('functions')}</h6>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">{t('addCard')}</p>
                                                <div className="checkout-button-cart">
                                                    <Button color="success" component={NavLink} to="/card">{t('addCard')}</Button>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <p className="m-b-10 f-w-600">{t('addBalance')}</p>
                                                <AddBalance
                                                    creditCards={creditCard}
                                                    balanceValue={setAddValue}
                                                    balance={addValue}
                                                    fetchData={fetchData}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;