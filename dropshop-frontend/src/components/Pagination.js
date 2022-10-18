import {Button} from "@mui/material";
import {NavLink} from "react-router-dom";

const Pagination = ({postPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i);

    }
    return (
        <div>
        <ul className="pagination">
            {pageNumbers.map(number => (
                <li key={number} className="pageButton">
                    <Button onClick={() => paginate(number)} component={NavLink} to="#" className="pageButton">
                        {number}
                    </Button>
                </li>
            ))}
        </ul>
        </div>
    )
}

export default Pagination