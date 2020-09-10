import React, { Fragment } from 'react';

const ErrorHandler = props => (
    <Fragment>
        {props.error && (
            <div className="ui negative message" onClick={props.clickErrorMessage}>
                <div className="header">エラー！（エラーコード：{props.error.status}）</div>
                <p>{props.error.message}（クリックでメッセージを閉じる）</p>
            </div>
        )}
        {props.result && (
            <div className="ui success message" onClick={props.clickResultMessage}>
                <div className="header">サクセス！</div>
                <p>{props.result}（クリックでメッセージを閉じる）</p>
            </div>
        )}
    </Fragment>
)


export default ErrorHandler;