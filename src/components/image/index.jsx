import React, {Component, Fragment} from "react";
import './image.css'

class Image extends Component {
    state = {
        profileImg: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'
    }

    imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({profileImg: reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    render() {
        const {profileImg} = this.state
        return (
            <Fragment>
                        <div className="img-holder">
                            <img src={profileImg} alt="" id="img" className="img"/>
                        </div>
                        <input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler}/>
                        <div className="label">
                            <label className="image-upload" htmlFor="input">
                                <i className="material-icons">Choose Image</i>
                            </label>
                        </div>

            </Fragment>
        )
    }
}

export default Image