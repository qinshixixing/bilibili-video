import React, {Component} from 'react';

class Download extends Component {
    render() {
        const data = this.props.data;
        let content;
        switch(data.code) {
            case '1':
                let href = 'http://www.jijidown.com';
                let size;
                switch (this.props.type) {
                    case 'audio':
                        href += data.mp3;
                        size = data.mp3lenght;
                        break;
                    case 'video':
                        href += data.mp4;
                        size = data.mp4lenght;
                        break;
                    default:
                        break;
                }
                content = (
                    <React.Fragment>
                        <a href={href} target='_blank'>下载</a>
                        <span>（文件大小：{(size/1048576).toFixed(2)}MB）</span>
                    </React.Fragment>
                );
                break;
            case '0':
                content = (
                    <span>队列中，为当前队列第{data.row}位</span>
                );
                break;
            case '-5':
                content = (
                    <span>上传时发生致命错误,无法完成上传指令！</span>
                );
                break;
            case '-3':
                content = (
                    <span>文件大小超出唧唧能承受的极限范围了！(300M)</span>
                );
                break;
            case '-2':
            case '-1':
                content = (
                    <span>解析出错，下载终止</span>
                );
                break;
            case '21':
                content = (
                    <span>单段视频下载中...</span>
                );
                break;
            case '22':
                content = (
                    <span>分段视频下载中...</span>
                );
                break;
            case '31':
                content = (
                    <span>视频转码中...</span>
                );
                break;
            case '41':
                content = (
                    <span>提取MP3文件中...</span>
                );
                break;
            case '51':
                content = (
                    <span>正在上传MP4文件...</span>
                );
                break;
            case '61':
                content = (
                    <span>正在上传MP3文件...</span>
                );
                break;
            default:
                content = (
                    <span>获取下载地址失败！</span>
                );
                break;
        }
        return content;
    }
}

export default Download;