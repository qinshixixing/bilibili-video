import React, {Component} from 'react';
import { Form, Input } from 'antd';

const { Item: FormItem } = Form;
const { Search } = Input;

class SearchBar extends Component {
    render() {
        const { getFieldDecorator, getFieldError, isFieldTouched } = this.props.form;
        const error = isFieldTouched('search') && getFieldError('search');
        const searchConfig = {
            id: 'search',
            options: {
                rules: [{
                    pattern: /^[0-9]+$/,
                    message: '请输入数字！'
                }]
            },
            content: (<Search placeholder='请输入要下载视频的av号，比如：170001' enterButton='搜索' size='large' onSearch={this.props.search} className='search'/>),
        };
        return (
            <Form>
                <FormItem validateStatus={error ? 'error' : ''} help={error || ''}>
                    {getFieldDecorator(searchConfig.id, searchConfig.options)(searchConfig.content)}
                </FormItem>
            </Form>
        );
    }
}

const SearchVideo = Form.create()(SearchBar);

export default SearchVideo;