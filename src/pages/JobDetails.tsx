import {useParams} from "react-router-dom";
export default function JobsDetails() {
    let { id } = useParams();
    return (
        <div>
            <h1>Job Details</h1>
{id}
        </div>
    )}