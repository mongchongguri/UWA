import React, { useEffect, useState } from 'react';
import '../../../css/home/home.css';
import '../../../css/mypage/favorite.css';
import { faAngleUp, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import AuthApi from '../../../AuthApi';
import { jwtDecode } from 'jwt-decode';
function Favorite() {
    let [wineList, setWineList] = useState([]);

    let [totalPage, setTotalPage] = useState('');
    let [currentPage, setCurrentPage] = useState(1);
    let [totalWine, setTotalWine] = useState('');
    let [check, setCheck] = useState(0);
    let [type, setType] = useState('');

    const token = localStorage.getItem('token') || '';
    let userinfo = null;
    if (token != '') {
        userinfo = jwtDecode(token);
    }

    function prevAnimation() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
            var wineContainer = document.querySelector('.wine_list_current');
            var PrevwineContainer = document.querySelector('.wine_list_prev');
            var NextwineContainer = document.querySelector('.wine_list_next');
            wineContainer.classList.remove('right');
            PrevwineContainer.classList.remove('right');
            NextwineContainer.classList.remove('right');

            wineContainer.classList.add('slide_animation');
            PrevwineContainer.classList.add('slide_animation');
            NextwineContainer.classList.add('slide_animation');

            wineContainer.classList.add('left');
            PrevwineContainer.classList.add('left');
            NextwineContainer.classList.add('left');

            setTimeout(() => {
                wineContainer.classList.remove('slide_animation');
                PrevwineContainer.classList.remove('slide_animation');
                NextwineContainer.classList.remove('slide_animation');

                wineContainer.classList.remove('left');
                PrevwineContainer.classList.remove('left');
                NextwineContainer.classList.remove('left');
            }, 500);
        }
    }
    function nextAnimation() {
        setCurrentPage(parseInt(currentPage, 10) + 1);
        var wineContainer = document.querySelector('.wine_list_current');
        var PrevwineContainer = document.querySelector('.wine_list_prev');
        var NextwineContainer = document.querySelector('.wine_list_next');

        wineContainer.classList.remove('left');
        PrevwineContainer.classList.remove('left');
        NextwineContainer.classList.remove('left');

        wineContainer.classList.add('slide_animation');
        PrevwineContainer.classList.add('slide_animation');
        NextwineContainer.classList.add('slide_animation');

        wineContainer.classList.add('right');
        PrevwineContainer.classList.add('right');
        NextwineContainer.classList.add('right');

        setTimeout(() => {
            wineContainer.classList.remove('slide_animation');
            PrevwineContainer.classList.remove('slide_animation');
            NextwineContainer.classList.remove('slide_animation');

            wineContainer.classList.remove('right');
            PrevwineContainer.classList.remove('right');
            NextwineContainer.classList.remove('right');
        }, 500);
    }

    useEffect(() => {
        AuthApi('/api/mypage/favorite/getList', {
            page: currentPage - 1,
            email: userinfo.username,
            document: check,
        }).then((data) => {
            console.log(data);
            setWineList(data.wineList);
            setTotalWine(data.totalPage);
            setTotalPage(Math.ceil(data.totalPage / 8));
            setType(data.type);
        });
    }, [currentPage, check]);

    return (
        <div className="favorite_container">
            {/* <div className="tag_container">


            </div> */}
            <div className="favorite_wine_container">
                <div>
                    <div className="total_wine_count">
                        <button
                            className={type == 'mongo' ? 'favorite_wine_button' : 'favorite_wine_button_null'}
                            onClick={() => {
                                setCheck(0);
                            }}
                        >
                            전체 와인 선택
                        </button>
                        <button
                            className={type == 'sell' ? 'favorite_wine_button' : 'favorite_wine_button_null'}
                            onClick={() => {
                                setCheck(1);
                            }}
                        >
                            판매자 와인 선택
                        </button>
                        ( {totalWine} 병 ){' '}
                    </div>
                    {type == 'mongo' ? <HomeWine wineList={wineList} /> : <OnSaleWine wineList={wineList} />}
                </div>
            </div>
            <div className="page_controller">
                <div
                    className="page_up"
                    onClick={() => {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        });
                    }}
                >
                    <FontAwesomeIcon icon={faAngleUp} size="2x" opacity="0.5" />
                </div>
                <div className="prev_page" onClick={prevAnimation}>
                    <FontAwesomeIcon icon={faAngleLeft} size="2x" opacity="0.5" />
                </div>
                <div className="page_box">
                    <input
                        className="page_input"
                        type="number"
                        defaultValue={currentPage}
                        key={currentPage}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                const page = e.target.value;
                                if (page >= 1 && page <= totalPage) {
                                    document.querySelector('.page_box').classList.remove('error_page');
                                    document.querySelector('.page_input').classList.remove('error_page');
                                    setCurrentPage(page);
                                } else {
                                    document.querySelector('.page_box').classList.add('error_page');
                                    document.querySelector('.page_input').classList.add('error_page');
                                    alert('없는 페이지 입니다.');
                                }
                            }
                        }}
                    />
                    &nbsp;/ &nbsp;{totalPage}
                </div>
                <div className="next_page" onClick={nextAnimation}>
                    <FontAwesomeIcon icon={faAngleRight} size="2x" opacity="0.5" />
                </div>
            </div>
        </div>
    );
}

function OnSaleWine({ wineList }) {
    let navigate = useNavigate();
    return (
        <>
            <div className="wine_view">
                <ul className="wine_list_prev">
                    {wineList.map(function (wine, i) {
                        return (
                            <li key={i}>
                                <div className="wine_list_card">
                                    <div className="wine_names">
                                        <span className="wine_name">{wine.wineName}</span>
                                        <hr></hr>
                                        <span className="wine_name_en">{wine.wineNameEn}</span>
                                    </div>

                                    <img src={wine.wineImageURL} alt="" />

                                    <div className="wine_info">
                                        <span>
                                            <b>{wine.wineType}</b> | {wine.wineRegion}
                                        </span>
                                    </div>
                                    <div className="wine_seller_info">
                                        <p>{wine.nickname}</p>
                                        <p>{wine.sellMoney} 원</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="wine_view">
                <ul className="wine_list_current">
                    {wineList != null
                        ? wineList.map(function (wine, i) {
                              console.log(wine);
                              return (
                                  <li key={i} onClick={() => navigate(`/onsale/${wine.stock}/${wine.mongoId}`)}>
                                      <div className="wine_list_card">
                                          <div className="wine_names">
                                              <span className="wine_name">{wine.wineName}</span>
                                              <hr></hr>
                                              <span className="wine_name_en">{wine.wineNameEn}</span>
                                          </div>

                                          <img src={wine.wineImageURL} alt="" />

                                          <div className="wine_info">
                                              <span>
                                                  <b>{wine.wineType}</b> | {wine.wineRegion}
                                              </span>
                                          </div>
                                          <div className="wine_seller_info">
                                              <p>{wine.nickname}</p>
                                              <p>{wine.sellMoney} 원</p>
                                          </div>
                                      </div>
                                  </li>
                              );
                          })
                        : null}
                </ul>
            </div>
            <div className="wine_view">
                <ul className="wine_list_next">
                    {wineList.map(function (wine, i) {
                        return (
                            <li key={i}>
                                <div className="wine_list_card">
                                    <div className="wine_names">
                                        <span className="wine_name">{wine.wineName}</span>
                                        <hr></hr>
                                        <span className="wine_name_en">{wine.wineNameEn}</span>
                                    </div>

                                    <img src={wine.wineImageURL} alt="" />

                                    <div className="wine_info">
                                        <span>
                                            <b>{wine.wineType}</b> | {wine.wineRegion}
                                        </span>
                                    </div>
                                    <div className="wine_seller_info">
                                        <p>{wine.nickname}</p>
                                        <p>{wine.sellMoney} 원</p>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

function HomeWine({ wineList }) {
    let navigate = useNavigate();

    function wineDetailsNav(Id) {
        navigate(`/wine/${Id}`);
    }
    return (
        <>
            <div className="wine_view">
                <ul className="wine_list_prev" style={{ paddingRight: '1px' }}>
                    {wineList.map(function (wine, i) {
                        return (
                            <li key={i}>
                                <div className="wine_list_card">
                                    <div className="wine_names">
                                        <span className="wine_name">{wine.wine_name}</span>
                                        <hr></hr>
                                        <span className="wine_name_en">{wine.wine_name_en}</span>
                                    </div>

                                    <img src={wine.wine_image} alt="" />

                                    <div className="wine_info">
                                        <span>
                                            <b>{wine.wine_info[0]}</b> | {wine.wine_info[1]} | {wine.wine_info[2]}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="wine_view">
                <ul className="wine_list_current">
                    {wineList.map(function (wine, i) {
                        return (
                            <li
                                key={i}
                                onClick={() => {
                                    wineDetailsNav(wine.id);
                                }}
                            >
                                <div className="wine_list_card">
                                    <div className="wine_names">
                                        <span className="wine_name">{wine.wine_name}</span>
                                        <hr></hr>
                                        <span className="wine_name_en">{wine.wine_name_en}</span>
                                    </div>

                                    <img src={wine.wine_image} alt="" />

                                    <div className="wine_info">
                                        <span>
                                            <b>{wine.wine_info[0]}</b> | {wine.wine_info[1]} | {wine.wine_info[2]}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="wine_view">
                <ul className="wine_list_next">
                    {wineList.map(function (wine, i) {
                        return (
                            <li key={i}>
                                <div className="wine_list_card">
                                    <div className="wine_names">
                                        <span className="wine_name">{wine.wine_name}</span>
                                        <hr></hr>
                                        <span className="wine_name_en">{wine.wine_name_en}</span>
                                    </div>

                                    <img src={wine.wine_image} alt="" />

                                    <div className="wine_info">
                                        <span>
                                            <b>{wine.wine_info[0]}</b> | {wine.wine_info[1]} | {wine.wine_info[2]}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

export default Favorite;
