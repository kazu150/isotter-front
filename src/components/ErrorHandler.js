import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { unsetError, unsetResult } from '../actions'

class ErrorHandler extends React.Component {

    render(){
        return(
            <Fragment>
                {this.props.errorStatus && (
                    <div className="ui negative message" onClick={this.props.unsetError}>
                        <div className="header">エラー！（エラーコード：{this.props.errorCode}）</div>
                        <p>{this.props.errorStatus.toString()}（クリックでメッセージを閉じる）</p>
                    </div>
                )}
                {this.props.resultStatus && (
                    <div className="ui success message" onClick={this.props.unsetResult}>
                        <div className="header">サクセス！</div>
                        <p>{this.props.resultStatus.toString()}（クリックでメッセージを閉じる）</p>
                    </div>
                )}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        errorCode: state.error.errorCode,
        errorStatus: state.error.errorStatus,
        resultStatus: state.error.resultStatus
    }
}

export default connect(
    mapStateToProps,
    { unsetError, unsetResult }
)(ErrorHandler);