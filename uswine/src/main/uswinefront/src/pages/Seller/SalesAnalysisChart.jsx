import { jwtDecode } from 'jwt-decode';
import '../../css/seller/SalesAnalysisChart.css';
import '../../css/seller/calendar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import AuthApi from '../../AuthApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import EventDateFormat from '../../function/EventDateFormat';

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, LineElement, Title, Tooltip, Legend);

function SalesAnalysisChart() {
    const token = localStorage.getItem('token') || '';
    if (token == '') {
        alert('로그인이 필요한 서비스 입니다.');
        window.history.back();
        return <></>;
    } else {
        const userinfo = jwtDecode(token);
        if (userinfo.role != 'ROLE_SELLER') {
            alert('권한이 없습니다.');
            window.history.back();
            return <></>;
        } else {
            return <SalesAnalysisChartComponent userinfo={userinfo} />;
        }
    }
}

function SalesAnalysisChartComponent({ userinfo }) {
    const [value, onChange] = useState(new Date());

    let [chartCheck, setChartCheck] = useState(0);
    let [wineChartCheck, setWineChartCheck] = useState(0);
    let [stockAndCount, setStockAndCount] = useState(0);
    let [wineTransactionCheck, setWineTransactionCheck] = useState(0);

    let [startDate, setStartDate] = useState('시작 날짜');
    let [endDate, setEndDate] = useState('종료 날짜');
    let [startDateType, setStartDateType] = useState(null);
    let [endDateType, setEndDateType] = useState(null);

    let [calanderState, setCalanderState] = useState(3);

    let [chartlabel, setChartlabel] = useState([]);
    let [chartData, setChartData] = useState([]);
    let [wineChartlabel, setWineChartlabel] = useState([]);
    let [wineTransactionlabel, setWineTransactionlabel] = useState([]);
    let [wineTransactionData, setWineTransactionData] = useState([]);
    let [wineChartStockData, setWineChartStockData] = useState([]);
    let [wineChartCountData, setWineChartCountData] = useState([]);
    let [wineInfoChartStockData, setWineInfoChartStockData] = useState([]);
    let [wineInfoChartCountData, setWineInfoChartCountData] = useState([]);

    useEffect(() => {
        const date = new Date();
        if (chartCheck != 4) {
            AuthApi('/api/seller/chart/price', {
                today: date,
                check: chartCheck,
                useremail: userinfo.username,
            }).then((data) => {
                const sortKeys = Object.keys(data).sort(
                    (a, b) => new Date(a.replace(' KST', '')).getTime() - new Date(b.replace(' KST', '')).getTime()
                );
                let newlabel = [];
                let newdata = [];

                sortKeys.forEach((key) => {
                    if (chartCheck === 0) {
                        newlabel.push(key.substring(key.lastIndexOf(' ') + 1));
                    } else if (chartCheck === 1) {
                        newlabel.push(key.substring(4, 7));
                    } else if (chartCheck === 2) {
                        newlabel.push(key.substring(8, 10));
                    } else if (chartCheck === 3) {
                        newlabel.push(key.substring(11, 13));
                    }

                    newdata.push(data[key]);
                });

                setChartlabel(newlabel);
                setChartData(newdata);
            });
        }
    }, [chartCheck]);

    let options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    let wineoptions = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    let labels = chartlabel; //x축 기준
    let winelabels = wineChartlabel;
    let transactionlabels = wineTransactionlabel;

    let data = {
        labels,
        datasets: [
            {
                data: chartData,
                borderColor: '#ff8888',
                backgroundColor: '#ff8888',
            },
        ],
    };

    let wine = {
        labels: winelabels,
        datasets: [
            {
                label: '개인 와인',
                data: stockAndCount === 0 ? wineChartStockData : wineChartCountData, //실제 그려지는 데이터(Y축 숫자)
                borderColor: '#ff8888', //그래프 선 color
                backgroundColor: '#ff8888',
            },
            {
                label: 'MD 와인',
                data: stockAndCount === 0 ? wineInfoChartStockData : wineInfoChartCountData, //실제 그려지는 데이터(Y축 숫자)
                borderColor: '#BCE29E', //그래프 선 color
                backgroundColor: '#BCE29E',
            },
        ],
    };

    let transaction = {
        labels: transactionlabels,
        datasets: [
            {
                data: wineTransactionData,
                borderColor: '#ff8888', //그래프 선 color
                backgroundColor: '#ff8888',
            },
        ],
    };

    useEffect(() => {
        const lastDayOfValue = new Date(value.getFullYear(), value.getMonth() + 1, 0);
        if (calanderState === 0) {
            setStartDate(EventDateFormat(lastDayOfValue).substring(0, 5));
            setStartDateType(lastDayOfValue);
        } else if (calanderState === 1) {
            setEndDate(EventDateFormat(lastDayOfValue).substring(0, 5));
            setEndDateType(lastDayOfValue);
        }
        setCalanderState(3);
    }, [value]);

    useEffect(() => {
        if (startDateType != null && endDateType != null) {
            if (endDateType < startDateType) {
                alert('종료 기간이 시작 기간 짧습니다. 기간을 재설정해주세요.');
                setEndDate('종료 날짜');
                setEndDateType(null);
            } else {
                AuthApi('/api/seller/chart/price', {
                    startDate: startDateType,
                    endDate: endDateType,
                    check: chartCheck,
                    useremail: userinfo.username,
                }).then((data) => {
                    const sortKeys = Object.keys(data).sort(
                        (a, b) => new Date(a.replace(' KST', '')).getTime() - new Date(b.replace(' KST', '')).getTime()
                    );
                    let newlabel = [];
                    let newdata = [];

                    sortKeys.forEach((key) => {
                        newlabel.push(key.substring(4, 7));
                        newdata.push(data[key]);
                    });

                    setChartlabel(newlabel);
                    setChartData(newdata);
                });
            }
        }
    }, [startDateType, endDateType]);

    useEffect(() => {
        const date = new Date();
        AuthApi('/api/seller/chart/wine', {
            today: date,
            check: wineChartCheck,
            useremail: userinfo.username,
        }).then((data) => {
            const sortKeys = Object.keys(data.stock).sort(
                (a, b) => new Date(a.replace(' KST', '')).getTime() - new Date(b.replace(' KST', '')).getTime()
            );
            const sortInfokeys = Object.keys(data.infoStock).sort(
                (a, b) => new Date(a.replace(' KST', '')).getTime() - new Date(b.replace(' KST', '')).getTime()
            );

            let newlabel = [];
            let newStockData = [];
            let newCountData = [];
            let newInfoStockData = [];
            let newInfoCountData = [];

            sortKeys.forEach((key) => {
                if (wineChartCheck === 0) {
                    newlabel.push(key.substring(key.lastIndexOf(' ') + 1));
                } else if (wineChartCheck === 1) {
                    newlabel.push(key.substring(4, 7));
                }

                newStockData.push(data.stock[key]);
                newCountData.push(data.count[key]);
            });

            sortKeys.forEach((key) => {
                newInfoStockData.push(data.infoStock[key]);
                newInfoCountData.push(data.infoCount[key]);
            });

            setWineChartlabel(newlabel);
            setWineChartStockData(newStockData);
            setWineChartCountData(newCountData);
            setWineInfoChartStockData(newInfoStockData);
            setWineInfoChartCountData(newInfoCountData);
        });
    }, [wineChartCheck]);

    useEffect(() => {
        const date = new Date();
        AuthApi('/api/seller/chart/transaction', {
            today: date,
            useremail: userinfo.username,
            check: wineTransactionCheck,
        }).then((data) => {
            console.log(data);
            const sortKeys = Object.keys(data).sort(
                (a, b) => new Date(a.replace(' KST', '')).getTime() - new Date(b.replace(' KST', '')).getTime()
            );
            let newlabel = [];
            let newdata = [];

            sortKeys.forEach((key) => {
                if (wineTransactionCheck === 0) {
                    newlabel.push(key.substring(key.lastIndexOf(' ') + 1));
                } else if (wineTransactionCheck === 1) {
                    newlabel.push(key.substring(4, 7));
                }
                newdata.push(data[key]);
            });

            setWineTransactionlabel(newlabel);
            setWineTransactionData(newdata);
        });
    }, [wineTransactionCheck]);
    return (
        <div className="seller_sales_analysis_container">
            <div className="sales_analysis_container">
                <div className="sales_analysis_stick_graphs">
                    <WineRegist userinfo={userinfo} />
                </div>
            </div>
            {/* 와인 그래프 */}
            <div className="sales_analysis_container">
                <p style={{ color: '#888', fontSize: '15px' }}>
                    사용자 설정을 제외한 나머지 항목은 오늘 날을 기준으로 그래프를 보여줍니다.( 5년, 12개월 )
                </p>
                <div className="sales_analysis_sell_line_graph">
                    <div className="sales_analysis_info_wine_graph">
                        <p style={{ fontSize: '18px' }}>판매 등록 와인</p>
                        <hr />
                        <div className="wine_graph_setting_btn_container">
                            <div>
                                <button
                                    className={stockAndCount == 0 ? 'chartbtnClick' : null}
                                    onClick={() => setStockAndCount(0)}
                                >
                                    와인 재고
                                </button>
                                <button
                                    className={stockAndCount == 1 ? 'chartbtnClick' : null}
                                    onClick={() => setStockAndCount(1)}
                                >
                                    와인 개수
                                </button>
                            </div>
                            <div className="wine_graph_setting_btn">
                                <button
                                    className={wineChartCheck === 0 ? 'chartbtnClick' : null}
                                    onClick={() => setWineChartCheck(0)}
                                >
                                    년도별
                                </button>
                                <button
                                    className={wineChartCheck === 1 ? 'chartbtnClick' : null}
                                    onClick={() => setWineChartCheck(1)}
                                >
                                    월별
                                </button>
                            </div>
                        </div>
                        <div className="sales_analysis_line_graph">
                            <Line className="sales_analysis_line_sub_chart" options={wineoptions} data={wine} />
                        </div>
                    </div>
                    <div className="sales_analysis_sell_wine_graph">
                        <p style={{ fontSize: '18px' }}>와인 거래량</p>
                        <hr />
                        <div className="wine_graph_setting_btn_container">
                            <div className="wine_graph_setting_btn">
                                <button
                                    className={wineTransactionCheck === 0 ? 'chartbtnClick' : null}
                                    onClick={() => setWineTransactionCheck(0)}
                                >
                                    년도별
                                </button>
                                <button
                                    className={wineTransactionCheck === 1 ? 'chartbtnClick' : null}
                                    onClick={() => setWineTransactionCheck(1)}
                                >
                                    월별
                                </button>
                            </div>
                        </div>
                        <Line className="sales_analysis_line_sub_chart" options={options} data={transaction} />
                    </div>
                </div>
            </div>
            {/* 수익 그래프 */}
            <div className="sales_analysis_container">
                <div className="sales_analysis_line_graph_container">
                    <div className="sales_analysis_setting_info_title">
                        <p style={{ fontSize: '18px' }}>판매 수익 금액</p>
                    </div>
                    <div className="sales_analysis_line_setting">
                        <div>
                            사용자 설정을 제외한 나머지 항목은 오늘 날을 기준으로 그래프를 보여줍니다.( 5년, 12개월,
                            30일, 24시간 )
                        </div>
                        <div>
                            <button
                                className={chartCheck === 0 ? 'chartbtnClick' : null}
                                onClick={() => setChartCheck(0)}
                            >
                                년도별
                            </button>
                            <button
                                className={chartCheck === 1 ? 'chartbtnClick' : null}
                                onClick={() => setChartCheck(1)}
                            >
                                월별
                            </button>
                            <button
                                className={chartCheck === 2 ? 'chartbtnClick' : null}
                                onClick={() => setChartCheck(2)}
                            >
                                일별
                            </button>
                            <button
                                className={chartCheck === 3 ? 'chartbtnClick' : null}
                                onClick={() => setChartCheck(3)}
                            >
                                시간별
                            </button>
                            <button
                                className={chartCheck === 4 ? 'chartbtnClick' : null}
                                onClick={() => {
                                    setChartCheck(4);
                                    setStartDate('시작 날짜');
                                    setEndDate('종료 날짜');
                                    setStartDateType(null);
                                    setEndDateType(null);
                                    setChartlabel([]);
                                    setChartData([]);
                                }}
                            >
                                사용자 설정
                            </button>
                        </div>
                    </div>
                    {chartCheck === 4 ? (
                        <div className="sales_analysis_line_detail_setting">
                            <div>
                                <div
                                    className="calander_start_container_toggle"
                                    onClick={() => (calanderState === 0 ? setCalanderState(3) : setCalanderState(0))}
                                >
                                    {startDate}
                                    <span>
                                        {calanderState === 0 ? (
                                            <FontAwesomeIcon icon={faCaretUp} />
                                        ) : (
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        )}
                                    </span>
                                </div>
                                <div
                                    className="calander_end_container_toggle"
                                    onClick={() => (calanderState === 1 ? setCalanderState(3) : setCalanderState(1))}
                                >
                                    {endDate}
                                    <span>
                                        {calanderState === 1 ? (
                                            <FontAwesomeIcon icon={faCaretUp} />
                                        ) : (
                                            <FontAwesomeIcon icon={faCaretDown} />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ) : null}

                    {calanderState === 0 || calanderState === 1 ? (
                        <div className="calander_container">
                            <Calendar onChange={onChange} value={value} minDetail="year" maxDetail="year"></Calendar>
                        </div>
                    ) : null}
                    <div className="sales_analysis_line_graph">
                        <Line className="sales_analysis_line_chart" options={options} data={data} />
                    </div>
                </div>
            </div>
        </div>
    );
}

const WineRegist = ({ userinfo }) => {
    //countWineRegistrations
    let [individual, setindividual] = useState(0);
    let [md, setmd] = useState(0);
    let [individualStock, setindividualStock] = useState(0);
    let [mdStock, setmdStock] = useState(0);
    // countWineTransactions
    let [totalTransactions, setTotalTransactions] = useState(0);
    let [individualTranscation, setIndividualTransaction] = useState(0);
    let [MDTransaction, setMDTransaction] = useState(0);
    // getRateOfReturn
    let [total, setTotal] = useState(0);
    let [money, setMoney] = useState(0);
    let [withdraw, setWithdraw] = useState(0);

    const countWineRegistrations = () => {
        AuthApi('/api/seller/chart/countWineReg', {
            useremail: userinfo.username,
        })
            .then((res) => {
                setindividual(res.individual);
                setmd(res.MD);
                setindividualStock(res.individualStock);
                setmdStock(res.MDStock);
            })
            .catch((error) => console.error(error));
    };

    const countWineTransactions = () => {
        AuthApi('/api/seller/chart/countTransaction', {
            useremail: userinfo.username,
        })
            .then((res) => {
                setMDTransaction(res.MDTransaction);
                setIndividualTransaction(res.individualTransaction);
                setTotalTransactions(res.individualTransaction + res.MDTransaction);
            })
            .catch((error) => console.error(error));
    };

    const revenue = () => {
        AuthApi('/api/seller/chart/revenue', {
            useremail: userinfo.username,
        })
            .then((res) => {
                setTotal(res.total);
                setMoney(res.money);
                setWithdraw(res.withdraw);
            })
            .catch((error) => console.error(error));
    };

    useEffect(() => {
        countWineRegistrations();
        countWineTransactions();
        revenue();
    }, []);

    // wineRegistrations
    const wineRegistLabels = ['등록와인 수', '재고 수'];
    const wineRegistData = {
        labels: wineRegistLabels,
        datasets: [
            {
                label: 'MD 와인',
                data: [md, mdStock],
                backgroundColor: '#95BDFF',
                borderColor: 'black',
            },
            {
                label: '개인 와인',
                data: [individual, individualStock],
                backgroundColor: '#FF8888',
                borderColor: 'black',
            },
        ],
    };

    const wineRegistOptions = {
        responsive: true,
        aspectRatio: 1,
        plugins: {
            legend: {
                position: 'top',
            },
            datalabels: {
                color: 'black',
                font: {
                    weight: 'bold',
                },
            },
        },
    };
    // Transaction
    const transactionLabels = [''];
    const transactionData = {
        labels: transactionLabels,
        datasets: [
            {
                label: '전체 와인',
                data: [totalTransactions],
                backgroundColor: '#BCE29E',
                borderColor: 'black',
            },
            {
                label: 'MD 와인',
                data: [MDTransaction],
                backgroundColor: '#95BDFF',
                borderColor: 'black',
            },
            {
                label: '개인 와인',
                data: [individualTranscation],
                backgroundColor: '#FF8888',
                borderColor: 'black',
            },
        ],
    };

    const transactionOptions = {
        responsive: true,
        aspectRatio: 1,
        plugins: {
            legend: {
                position: 'top',
            },
            datalabels: {
                color: 'black',
                font: {
                    weight: 'bold',
                },
            },
        },
    };

    return (
        <div className="sales_analysis_stick_graph">
            <div id="WineRegistrationsChart">
                <p style={{ fontSize: '18px' }}>와인 등록 수</p>
                <hr />
                <Bar data={wineRegistData} options={wineRegistOptions} />
            </div>
            <div id="WineTransactionsChart">
                <p style={{ fontSize: '18px' }}>거래 수량</p>
                <hr />
                <Bar data={transactionData} options={transactionOptions} />
            </div>
            <div className="price">
                <p style={{ fontSize: '18px' }}>수익</p>
                <hr />
                <div id="user_priceChart">
                    <div id="word">
                        <div id="allPrice">
                            <span>총 금액</span>
                            <span
                                style={{
                                    width: '45%',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                &#8361; {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </span>
                        </div>
                        <div id="allmoney">
                            <span>현재 잔액</span>

                            <span
                                style={{
                                    width: '45%',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                &#8361; {money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </span>
                        </div>
                        <div id="allwithdraw">
                            <span>출금 금액</span>
                            <span
                                style={{
                                    width: '45%',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                &#8361; {withdraw.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesAnalysisChart;
