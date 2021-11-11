import { Component } from "react";
import { connect } from "react-redux";


class AvatarURL extends Component {
    render() {
        const { users, id } = this.props
        return (
            <img src={users[id].avatarURL} alt="avtar Here" width="90px" height="90px"/>
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

export default connect(mapStateToProps)(AvatarURL);