import { Component } from "react";
import { connect } from "react-redux";


class Username extends Component {
    render() {
        const { users, id } = this.props
        return (
            <p>{users[id].name}</p>
        )
    }
}

function mapStateToProps({ users }, props) {
    const { id } = props
    return {
        users,
        id
    }
}

export default connect(mapStateToProps)(Username);