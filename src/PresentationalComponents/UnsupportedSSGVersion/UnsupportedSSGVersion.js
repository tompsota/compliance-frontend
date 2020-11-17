import React from 'react';
import propTypes from 'prop-types';
import { Popover, Tooltip } from '@patternfly/react-core';
import { ExclamationTriangleIcon, QuestionCircleIcon } from '@patternfly/react-icons';

const WarningWithPopup = ({ children }) => {
    const headerContent = 'Unsupported SSG versions';
    const bodyContent = 'This system is running an unsupported version of the SCAP Security Guide (SSG).' +
        'This information is based on the last report uploaded for this system to the Compliance service.';
    const footerContent = <a href="#">Supported SSG versions</a>;

    return <Popover { ...{ headerContent, bodyContent, footerContent } }>
        { children }
    </Popover>;
};

WarningWithPopup.propTypes = {
    children: propTypes.node
};;

const WarningWithTooltip = ({ children, content }) => (
    <Tooltip content={ content } position='bottom'>
        { children }
    </Tooltip>
);

WarningWithTooltip.propTypes = {
    content: propTypes.string,
    children: propTypes.node
};;

const TooltipOrPopover = ({ variant, children, tooltipProps }) => (
    variant === 'tooltip' ? <WarningWithTooltip { ...tooltipProps }>
        { children }
    </WarningWithTooltip> : <WarningWithPopup>{ children }</WarningWithPopup>
);

TooltipOrPopover.propTypes = {
    children: propTypes.node,
    variant: propTypes.string,
    tooltipProps: propTypes.object
};

const UnsupportedSSGVersion = ({
    children, showWarningIcon = true, showHelpIcon = false, style, tooltipText
}) => {
    const tooltipProps = {
        content: <div>{ tooltipText }</div>
    };
    const variant = tooltipText ? 'tooltip' : 'popover';
    const iconProps = {
        variant,
        tooltipProps
    };
    const defaultStyle = {
        ...!tooltipText ? {
            cursor: 'pointer'
        } : {}
    };

    return <span style={ { ...style, display: 'inline-block' } }>
        { showWarningIcon && <TooltipOrPopover { ...iconProps }>
            <ExclamationTriangleIcon
                className='ins-u-warning'
                style={ {
                    ...defaultStyle,
                    marginRight: '.25em'
                } }
            />
        </TooltipOrPopover> }

        { children }

        { showHelpIcon &&  <TooltipOrPopover { ...iconProps }>
            <QuestionCircleIcon
                style={ {
                    ...defaultStyle,
                    marginLeft: '.25em'
                } }
            />
        </TooltipOrPopover> }
    </span>;
};

UnsupportedSSGVersion.propTypes = {
    showWarningIcon: propTypes.bool,
    showHelpIcon: propTypes.bool,
    style: propTypes.object,
    tooltipText: propTypes.string,
    children: propTypes.node
};

export default UnsupportedSSGVersion;