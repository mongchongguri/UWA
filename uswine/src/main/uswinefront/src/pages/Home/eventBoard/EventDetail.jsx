import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AuthApi from '../../../AuthApi';
import MarkUp from '../../../function/MarkUp';
import EventDateFormat from '../../../function/EventDateFormat';

const EventDetail = () => {
    let { id } = useParams();

    let [title, setTitle] = useState('');
    let [content, setContent] = useState('');
    let [nickname, setNickname] = useState('');
    let [writeDate, setWriteDate] = useState('');
    let [endDate, setEndDate] = useState('');

    useEffect(() => {
        AuthApi('/api/admin/event/detail', {
            id: id,
        })
            .then((res) => {
                setTitle(res.title);
                setContent(res.content);
                setNickname(res.nickname);
                setWriteDate(EventDateFormat(res.writeDate));
                setEndDate(EventDateFormat(res.endDate));
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="free_detail_container">
            <div className="board_details_container">
                <div className="board_detail_title">{title}</div>
                <div className="board_detail_info_container">
                    <div>{nickname}</div>
                    <div>시작일:&nbsp;{writeDate}</div>
                    <div>마감일:&nbsp; {endDate}</div>
                </div>
                <div className="board_detail_content">
                    <MarkUp MakrDownData={content} />
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
