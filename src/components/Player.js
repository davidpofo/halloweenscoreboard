import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import Counter from './Counter'
import Icon from './Icon';
import Blink from './Blink'




class Player extends PureComponent {
    static propTypes = {
        changeScore: PropTypes.func,
        blink: PropTypes.bool,
        removePlayer: PropTypes.func,
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired,
        id: PropTypes.number,
        index: PropTypes.number,
        isHighScore: PropTypes.bool,
        isSecondHigh: PropTypes.bool,
        isThirdHigh: PropTypes.bool
    };
    render() {
        const {
            name,
            id,
            score,
            index,
            removePlayer,
            blink,
            changeScore
        } = this.props;

        return (
            <div className="player">
                {(this.props.blink) ?                 <span className="player-name highlight">
                <Icon isHighScore={this.props.isHighScore} isSecondHigh = {this.props.isSecondHigh} isThirdHigh = {this.props.isThirdHigh} />
                <Blink>{name}</Blink>
                <button className="remove-player" onClick={() => removePlayer(id)}> ✖</button>
             </span> :
                    <span className="player-name highlight">
                <Icon isHighScore={this.props.isHighScore} isSecondHigh = {this.props.isSecondHigh} isThirdHigh = {this.props.isThirdHigh} />
                {name}
                <button className="remove-player" onClick={() => removePlayer(id)}> ✖</button>
             </span>}


                <Counter score={score}
                         index={index}
                         changeScore={changeScore}/>
            </div>
        );
    }

}

export default Player