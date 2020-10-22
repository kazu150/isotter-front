import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { unsetError } from '../actions'

class ErrorHandler extends React.Component {
    render(){
        return(
            <Fragment>
                {this.props.errorStatus && (
                    <div className="ui negative message" onClick={this.props.unsetError}>
                        <div className="header">エラー！（エラーコード：（redux使ったときにエラーコードの取得ができない………））</div>
                        <p>{this.props.errorStatus.toString()}（クリックでメッセージを閉じる）</p>
                    </div>
                )}
                {this.props.result && (
                    <div className="ui success message" onClick={this.props.clickResultMessage}>
                        <div className="header">サクセス！</div>
                        <p>{this.props.result}（クリックでメッセージを閉じる）</p>
                    </div>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorStatus: state.error.errorStatus
    }
}

export default connect(
    mapStateToProps,
    { unsetError }
)(ErrorHandler);