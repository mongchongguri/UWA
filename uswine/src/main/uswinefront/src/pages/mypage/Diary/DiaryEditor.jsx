import ReactQuill, { Quill } from 'react-quill';
import { ImageResize } from 'quill-image-resize-module-ts';
import { useMemo, useRef, useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import AuthApi from '../../../AuthApi';
import DateFormat from '../../../function/DateFormat';
import AwsUpload from '../../../function/AWSs3';

function DiaryEditor(props, ref) {
    // const childRef = useRef();

    // 부모로부터 받은 ref를 자식 엘리먼트에 연결
    useImperativeHandle(ref, () => ({
        childFunction: () => {
            console.log('자식 함수가 호출되었습니다.2');
            handlerSubmit();
            console.log('자식 함수가 호출되었습니다.3');
        },
    }));

    const quillRef = useRef(null);
    const [content, setContent] = useState('');

    Quill.register('modules/ImageResize', ImageResize);

    const imageHandler = async () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.addEventListener('change', async () => {
            const file = input.files?.[0];
            console.log(file);
            try {
                const upload = AwsUpload('diary', file);
                const IMG_URL = await upload.promise().then((res) => res.Location);
                const editor = quillRef.current.getEditor();
                const range = editor.getSelection();

                editor.insertEmbed(range.index, 'image', IMG_URL);
            } catch (error) {
                console.log(error);
            }
        });
    };

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, false] }],
                    [{ align: [] }],
                    [{ size: ['small', false, 'large', 'huge'] }],
                    ['bold', 'underline', 'italic', 'strike', 'blockquote', 'image'],
                    [{ list: 'ordered' }, { list: 'bullet' }, 'link', { indent: '-1' }, { indent: '+1' }],
                    [
                        {
                            color: [],
                        },
                        { background: [] },
                    ],
                    ['clean'],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
            ImageResize: {
                parchment: Quill.import('parchment'),
                modules: ['Resize', 'DisplaySize'],
            },
        };
    }, []);

    const handlerSubmit = async () => {
        console.log('자식 함수가 호출되었습니다.2');
        const date = new Date();
        const formateDate = DateFormat(date);
        console.log(props)
        AuthApi('/api/mypage/diary/insertD', {
            nickname: props.nickname,
            email: props.email,
            title: props.title,
            content: content,
            diarydate: props.date,
        }).then((data) => {
            console.log(data);
            if (data === 1) {
                alert('일기가 등록되었습니다.');
                props.hide();
            } else {
                alert('일기 등록에 실패했습니다.');
                props.hide();
            }
        });
        // return props.onHide;
    };

    return (
        <>
            <div>
                {/* <label htmlFor="title">제목</label> */}
                {/* <input id="title" type="text" onChange={handleTitleChange} /> */}
                <br></br>
                {/* <label htmlFor="date">날짜</label> */}
                {/* <input id="date" type="date" /> */}
                <ReactQuill
                    ref={quillRef}
                    style={{ width: '754px', height: '300px' }}
                    modules={modules}
                    onChange={setContent}
                />
            </div>
            {/* <button style={{ marginTop: '50px' }} onClick={handlerSubmit}>
                제출
            </button> */}
        </>
    );
}

export default forwardRef(DiaryEditor);
