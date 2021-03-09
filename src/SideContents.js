import React from 'react';
import Contents from './contents';

class SideContents extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false
        }
    }
    componentDidMount() {
        const key = {
            headers: { 'X-API-KEY': '9b30e206-4b28-4453-91f5-5d39d40d15a3' },
        };
        return fetch('https://ponsuke.microcms.io/api/v1/side', key)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    loading: true,
                    data: responseJson.contents,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    renderContents(d) {
        console.log(d);
        return <Contents
            key={d.id}
            title={d.title}
            text={d.content}
            id="profile"
        />;
    }
    render() {
        if (this.state.loading) {
            return (
                <div id="side" >
                    {this.state.data.map(d => {
                        return this.renderContents(d)
                    })}
                </div>
            );
        } else {
            return (
                <div>
                    <p></p>
                </div>
            );
        }
    }
}

export default SideContents;