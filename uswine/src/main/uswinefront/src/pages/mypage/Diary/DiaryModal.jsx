import { Button, Form, Modal } from 'react-bootstrap';
import DiaryEditor from './DiaryEditor';
import AuthApi from '../../../AuthApi';
import { jwtDecode } from 'jwt-decode';
import { useRef, useState, useEffect } from 'react';
import MarkUp from '../../../function/MarkUp';
import React, { useRef as useRefReact } from 'react';

function DiaryModal(props) {
    let [title, setTitle] = useState();

    const childComponentRef = useRef();

    useEffect(() => {
        // 자식 함수 호출 전에 유효성 검사
        if (childComponentRef.current && childComponentRef.current.handlerSubmit) {
            // handlerSubmit 함수 호출
            childComponentRef.current.childFunction();
        }
    }, [childComponentRef]);

    const callChildFunction = () => {
        // 자식 함수 호출 전에 유효성 검사
        console.log('자식 함수가 호출되었습니다.1');
        if (childComponentRef.current && childComponentRef.current.childFunction) {
            childComponentRef.current.childFunction();
        }
    };

    const deleteDiary = (id) => {
        const userDel = window.confirm('정말 삭제 하시겠습니까?');

        if (userDel) {
            AuthApi('/api/mypage/diary/deleteD', {
                id: id,
            }).then((data) => {
                console.log(data);
                if (data === 1) {
                    alert('삭제 되었습니다.');
                    props.onHide();
                } else {
                    alert('삭제 실패했습니다.');
                }
            });
        }
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
                <Modal.Title>오늘의 일기</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="diaryContent">
                    <Form.Group className="mb-3">
                        <Form.Label>제목</Form.Label>
                        {props.diaryOne.title == '' ? (
                            <Form.Control
                                className="diary-editor-title"
                                type="text"
                                autoFocus
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        ) : (
                            <div>{props.diaryOne.title}</div>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>내용</Form.Label>
                        {props.diaryOne.content == '' ? (
                            <div className="diary-editor">
                                <DiaryEditor
                                    ref={childComponentRef}
                                    title={title}
                                    nickname={props.nickname}
                                    email={props.email}
                                    date={props.date}
                                    hide={props.onHide}
                                />
                            </div>
                        ) : (
                            <MarkUp MakrDownData={props.diaryOne.content} />
                            // <Form.Control as="textarea" rows={3} value={props.content} />
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    취소
                </Button>
                {props.diaryOne.content == '' && props.diaryOne.title == '' ? (
                    <Button id="diaryModal_btn" variant="primary" onClick={callChildFunction}>
                        저장
                    </Button>
                ) : (
                    <Button id="diaryModal_btn" variant="primary" onClick={() => deleteDiary(props.diaryOne.id)}>
                        삭제
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
}

export default DiaryModal;
