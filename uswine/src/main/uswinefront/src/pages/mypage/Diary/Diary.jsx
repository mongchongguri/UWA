import { Row, Col, Button, Container, ProgressBar, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../../../css/mypage/diary.css';
import { jwtDecode } from 'jwt-decode';
import DiaryModal from './DiaryModal';
import AuthApi from '../../../AuthApi';
// import { formatDate } from '@fullcalendar/core';
import DateFormat from '../../../function/DateFormat';
import { FaPlus } from 'react-icons/fa6';
import { IoMdTime } from 'react-icons/io';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

export default function Diary() {
    const token = localStorage.getItem('token');
    const email = jwtDecode(token).username;
    const nickname = jwtDecode(token).nickname;
    // let email = 'abc@example.com';
    // let nickname = 'nickname';
    let [modalShow, setModalShow] = useState(false);
    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [id, setId] = useState('');
    let now = new Date();
    const formateDate = DateFormat(now);
    let [diaryList, setDiaryList] = useState([]);
    let [diaryOne, setDiaryOne] = useState('');
    let [today, setToday] = useState(formateDate);
    const [events, setEvents] = useState([]);
    let [percent, setPercent] = useState('');
    const [loding, setLoding] = useState(true);

    // 일기 보기
    let contentShow = (id) => {
        setModalShow(true);
        AuthApi('/api/mypage/diary/one', {
            id: id,
        }).then((data) => {
            setDiaryOne(data);
        });
    };

    // 일기 쓰기
    let write = () => {
        setDiaryOne({ title: '', content: '' });
        setModalShow(true);
    };

    // 캘린더 이벤트 리스트
    const eventShow = (data) => {
        const fEvents = [];
        for (let event of data) {
            const [year, month, day, hour, minute] = event.diarydate.split(/[.: ]/);
            fEvents.push({
                title: event.title,
                date: new Date(`20${year}`, month - 1, day),
                // date: new Date(event.diarydate),
            });
        }
        setEvents(fEvents);
    };

    // 일기 지정날짜 작성
    const handleDateClick = (info) => {
        setLoding(true);
        setToday(DateFormat(info.dateStr));
    };

    // 캘린더 리스트 불러오기
    useEffect(() => {
        AuthApi('/api/mypage/diary/all', {
            email: email,
        }).then((data) => {
            eventShow(data);
        });
    }, [modalShow]);

    // 일기 리스트 불러오기
    useEffect(() => {
        AuthApi('/api/mypage/diary/List', {
            email: email,
            diarydate: today,
        }).then((data) => {
            setDiaryList(data);
        });
    }, [modalShow, today]);

    //로딩 화면 만들기

    const getEmotion = async () => {
        const data = await AuthApi('/api/mypage/diary/analysis', {
            email: email,
            diarydate: today,
        });
        console.log(loding);
        setPercent(0);
        setLoding(false); //로딩 완료
        setTimeout(() => {
            setPercent(data);
        }, 100);
    };

    // 감성 가져오기
    useEffect(() => {
        getEmotion();
    }, [modalShow, today]);

    // 화면
    return (
        <>
            <div className="diary_container">
                <div className="diary_component">
                    <Container fluid>
                        <Row>
                            <Col>
                                <div className="calendar">
                                    <FullCalendar
                                        plugins={[dayGridPlugin, interactionPlugin]}
                                        initialView="dayGridMonth"
                                        // editable={true}
                                        dayMaxEvents={true}
                                        selectable={true}
                                        events={events}
                                        dateClick={handleDateClick}
                                        height={500}
                                        displayEventTime={false}
                                    />
                                </div>
                            </Col>
                            <Col>
                                <h2 className="diary_title">Diary</h2>
                                {diaryList !== undefined ? (
                                    diaryList.map((diary, index) => {
                                        return (
                                            <div className="diary_button">
                                                <div className="d-grid gap-2">
                                                    <Button
                                                        variant="primary"
                                                        size="lg"
                                                        onClick={() => {
                                                            contentShow(diary.id);
                                                        }}
                                                    >
                                                        <div className="icon">
                                                            <FontAwesomeIcon icon={faCalendar} />
                                                        </div>
                                                        <div className="diary_contentTitles">{diary.title}</div>
                                                        <div className="icon">
                                                            <IoMdTime />
                                                        </div>
                                                        <div className="diary_contentTime">
                                                            {diary.diarydate.split(' ')[1]}
                                                        </div>
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div>
                                        <h4>오늘의 일기를 적어보세요!</h4>
                                    </div>
                                )}
                                {/* <Button variant="secondary" size="lg">
                                    삭제
                                </Button> */}
                                {today.split(' ')[0] == formateDate.split(' ')[0] ? (
                                    <div className="d-grid gap-2">
                                        <Button
                                            variant="outline-primary"
                                            size="lg"
                                            onClick={() => {
                                                write();
                                            }}
                                        >
                                            <div className="add_button">
                                                <FaPlus />
                                            </div>
                                        </Button>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                                <DiaryModal
                                    nickname={nickname}
                                    email={email}
                                    diaryOne={diaryOne}
                                    show={modalShow}
                                    date={today}
                                    onHide={() => setModalShow(false)}
                                />
                            </Col>
                        </Row>
                    </Container>
                </div>

                <div className="diary_component2">
                    <div className="EmotionTitle">
                        <h2>오늘의 당신의 상태는?</h2>
                    </div>
                    <div className="EmotionDescription">
                        {loding ? ( //로딩이 참이면, 로딩 페이지로
                            <Loding />
                        ) : (
                            <div>
                                <EmotionBar percent={percent} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

function EmotionBar(props) {
    return props.percent < 0 ? (
        <ProgressBar striped variant="danger" animated now={props.percent * -1} label={`${props.percent}%`} />
    ) : (
        <ProgressBar animated now={props.percent} label={`${props.percent}%`} />
    );
}

function WineCard() {
    return (
        <Card style={{ width: 'auto' }}>
            <Card.Img
                height={30}
                variant="top"
                src="http://www.naracellar.com/data/editor/2002/20200228112104_738245cbd87528fcb171c22f10edfdca_bit9.png"
            />
            <Card.Body>
                <Card.Title>춫현 와인</Card.Title>
                <Card.Text>네놈을 바라보니 마구니가 가득한 듯 하구나 이 와인을 먹어보거라</Card.Text>
                <Button variant="secondary">상세보기</Button>
            </Card.Body>
        </Card>
    );
}

function Loding() {
    return (
        <div className="loading-spinner">
            <p>Loading...</p>
        </div>
    );
}
