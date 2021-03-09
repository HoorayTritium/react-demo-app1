import React from 'react';
import Contents from './contents';

class MainContents extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            param: {}
        }
    }

    componentDidMount() {
        //URLパラメータを文字列で取得(?含む)
        let urlParamStr = window.location.search
        if (urlParamStr) {
            //?を除去
            urlParamStr = urlParamStr.substring(1)
            let params = {}
            //urlパラメータをオブジェクトにまとめる
            urlParamStr.split('&').forEach(param => {
                const temp = param.split('=')
                //pramsオブジェクトにパラメータを追加
                params = {
                    ...params,
                    [temp[0]]: temp[1]
                }
            })
            let tmp = this.state;
            this.setState({
                ...tmp,
                param: params
            })
        }

        // 記事を取得
        const key = {
            headers: { 'X-API-KEY': '9b30e206-4b28-4453-91f5-5d39d40d15a3' },
        };
        return fetch('https://ponsuke.microcms.io/api/v1/diary', key)
            .then((response) => response.json())
            .then((responseJson) => {
                let tmp = this.state;
                this.setState({
                    ...tmp,
                    loading: true,
                    data: responseJson.contents,
                });
                console.log(responseJson)
            })
            .catch((error) => {
                console.error(error);
            });
    }
    renderContents(i, c = "") {
        return <Contents
            key={i.id}
            title={i.title}
            text={i.main}
            date={i.updatedAt}
            class={c + " maincontent"}
            img={i.thumbnail.url}
        />;
    }

    render() {
        if (this.state.loading) {
            let p = this.state.param.p;
            console.log(this.state)
            let hoge = "";
            if (Math.sign(p)) hoge = "articleList";

            return (
                <div id="main" >
                    {this.state.data.map(d => {
                        return this.renderContents(d, hoge)
                    })}
                </div>
            );
        } else {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            );
        }
    }
}

export default MainContents;