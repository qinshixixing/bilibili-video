import React, {Component} from 'react';
import { Table } from 'antd';
import Download from './Download';

class VideoDetail extends Component {
    render() {
        const data = this.props.data;
        let content;
        switch (typeof data) {
            case 'object':
                if (data === null) {
                    content = null;
                }
                else {
                    switch (data.code) {
                        case 0:
                            const columns = [
                                {
                                    title: '序号',
                                    dataIndex: 'P'
                                },
                                {
                                    title: '标题',
                                    dataIndex: 'Title'
                                },
                                {
                                    title: '音频下载',
                                    render: (text, record) => (
                                        <Download type='audio' data={record}/>
                                    )
                                },
                                {
                                    title: '视频下载',
                                    render: (text, record) => (
                                        <Download type='video' data={record}/>
                                    )
                                }
                            ];
                            content = (
                                <React.Fragment>
                                    <div className='video-title'>{data.title}</div>
                                    <div className='video-msg'>
                                        <span>av号：{data.av}</span>
                                        <span>up主：{data.up}</span>
                                    </div>
                                    <div className='video-desc'>
                                        {data.desc}
                                    </div>
                                    <Table columns={columns} dataSource={data.list} rowKey='CID'/>
                                </React.Fragment>
                            );
                            break;
                        case -1:
                            content = (
                                <div className='video-title'>获取CID失败，视频不存在</div>
                            );
                            break;
                        case -2:
                            content = (
                                <div className='video-title'>请求参数错误</div>
                            );
                            break;
                        default:
                            content = (
                                <div className='video-title'>获取视频信息失败</div>
                            );
                            break;
                    }
                }
                break;
            case 'string':
                if (data === 'request') {
                    content = (
                        <div className='video-title'>正在获取视频信息...</div>
                    );
                }
                else {
                    content = (
                        <div className='video-title'>获取视频信息失败</div>
                    );
                }
                break;
            default:
                content = (
                    <div className='video-title'>获取视频信息失败</div>
                );
                break;
        }
        return content;
    }
}

export default VideoDetail;