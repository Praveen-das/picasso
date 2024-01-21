import './status.css'

function Status({ status }) {
    return <>
        <span id='status' className={`status_${status}`}>{status}</span>
    </>;
}

export default Status;
