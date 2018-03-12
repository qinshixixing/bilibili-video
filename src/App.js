import React, {Component} from 'react';
import { Row } from 'antd';
import axios from 'axios';
import './App.css';
import logo from './logo.svg';
import SearchVideo from './SearchVideo';
import VideoDetail from './VideoDetail';

class App extends Component {
    constructor(props) {
        super(props);
        this.element = null;
        this.state = {
            videoData: null,
            containerStyle: {
                position: 'static'
            }
        };
        this.search = this.search.bind(this);
        this.setFooterPosition = this.setFooterPosition.bind(this);
    }

    async search(value) {
        const pattern = /^[0-9]+$/;
        if (pattern.test(value)) {
            this.setState({
                videoData: 'request'
            });
            const response = await axios({
                method: 'get',
                url: `//www.jijidown.com/Api/AvToCid/${value}`
            });
            if (response.status === 200) {
                const data = response.data;
                if (data.list && data.list.length > 0) {
                    const requestList = data.list.map(async (item) => {
                        const response = await axios({
                            method: 'post',
                            url: '//www.jijidown.com/ashx/mp3file.ashx',
                            params: {
                                av: item.AV,
                                cid: item.CID
                            }
                        });
                        if (response.status === 200 && response.data) {
                            Object.assign(item, response.data);
                        }
                    });
                    await Promise.all(requestList);
                }
            }
            else {
                response.data = 'error';
            }
            this.setState({
                videoData: response.data
            }, this.setFooterPosition);
        }
    }

    setFooterPosition() {
        let position = null;
        if (this.element.offsetHeight > document.documentElement.offsetHeight) {
            position = 'relative';
        }
        else {
            position = 'static';
        }
        if (this.state.containerStyle.position !== position) {
            this.setState({
                containerStyle: {
                    position
                }
            });
        }
    }

    render() {
        return (
            <div className='main' style={this.state.containerStyle} ref={(element) => {this.element = element;}}>
                <Row>
                    <img src={logo} alt='bilibili-logo' className='logo'/>
                </Row>
                <Row className='search-row'>
                    <SearchVideo search={this.search}/>
                </Row>
                <Row className='video-detail'>
                    <VideoDetail data={this.state.videoData}/>
                </Row>
                <Row className='footer'>
                    © 2018 qinshixixing.space - Powered by qinshixixing
                </Row>
            </div>
        );
    }
}

export default App;
