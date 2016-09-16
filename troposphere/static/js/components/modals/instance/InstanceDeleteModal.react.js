import React from "react";
import BootstrapModalMixin from "components/mixins/BootstrapModalMixin.react";
import Glyphicon from "components/common/Glyphicon.react";
import InstanceModel from "models/Instance";


export default React.createClass({
    displayName: "InstanceDeleteModal",

    mixins: [BootstrapModalMixin],

    propTypes: {
        instance: React.PropTypes.instanceOf(InstanceModel).isRequired,
        onConfirm: React.PropTypes.func.isRequired,
    },

    confirm: function() {
        this.hide();
        this.props.onConfirm();
    },

    renderBody: function() {
        var instance = this.props.instance;

        return (
        <div>
            <p className="alert alert-danger">
                <Glyphicon name="warning-sign" />
                <strong>WARNING</strong>
                {' Data will be'}
                <strong>{' lost.'}</strong>
            </p>
            <div>
                <p>
                    {"The following instance " +
                     "will be shut down and all data will be permanently lost:"}
                </p>
                <ul>
                    <li>
                        <strong>{instance.get("name") + " #" + instance.get("id")}</strong>
                    </li>
                </ul>
            </div>
            <p>
                <em>Note:</em>
                {" Your resource usage charts will not reflect changes until the " +
                 "instance is completely deleted and has disappeared " +
                 "from your list of instances."}
            </p>
        </div>
        );
    },

    render: function() {
        let instance = this.props.instance,
            disable = !instance && instance.get("id");

        return (
        <div className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        {this.renderCloseButton()}
                        <strong>Delete Instance</strong>
                    </div>
                    <div className="modal-body">
                        {this.renderBody()}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" onClick={this.hide}>
                            Cancel
                        </button>
                        <button disabled={disable}
                            type="button"
                            className="btn btn-primary"
                            onClick={this.confirm}>
                            Yes, delete this instance
                        </button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
});
