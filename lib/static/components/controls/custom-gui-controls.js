'use strict';
import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {findIndex, map} from 'lodash';
import * as actions from '../../modules/actions';
import {Button} from 'semantic-ui-react';
import 'semantic-ui-css/components/button.min.css';

class CustomGuiControls extends Component {
    render() {
        const {customGui, actions} = this.props;

        const renderButtonGroup = ({sectionName, groupIndex, controls}) => {
            const onClickHandler = (event, {value}) => {
                const controlIndex = findIndex(controls, (control) => control.value === value);

                actions.runCustomGuiAction({sectionName, groupIndex, controlIndex});
            };

            return (
                <Button.Group key={sectionName}>
                    {map(controls, ({label, value, active}, i) => {
                        return (<Button
                            onClick={onClickHandler}
                            key={`${i}`}
                            value={value}
                            content={label}
                            active={Boolean(active)}
                        />);
                    })};
                </Button.Group>
            );
        };

        const customGuiControls = map(customGui, (sections, sectionName) => {
            return sections.map(({type, controls}, groupIndex) => {
                switch (type) {
                    case 'radiobutton': {
                        return renderButtonGroup({sectionName, groupIndex, controls});
                    }
                }
            });
        });

        return (
            <Fragment>
                {customGuiControls}
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({customGui: state.config.customGui}),
    (dispatch) => ({actions: bindActionCreators(actions, dispatch)})
)(CustomGuiControls);
